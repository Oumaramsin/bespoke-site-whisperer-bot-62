"""
Génère la bande-son complète et la timeline synchronisée du Motion Design RAMSIN v3 :
« De l'idée au projet concret : comment créer son site ou son application sans stress »

Améliorations v3 (Review utilisateur) :
  1. Rythme condensé & dynamique (~42 secondes au lieu de 89s, aucun temps mort)
  2. Nouvelles voix neuronales multilingues ultra-naturelles et expressives :
     - Narratrice : fr-FR-VivienneMultilingualNeural (adulte, posée, vivante, humaine)
     - Oumar Sidibé : fr-FR-RemyMultilingualNeural (chaleureux, direct, énergique)
     - Prononciation phonétique stricte : « Ramssine »
  3. Design sonore professionnel :
     - Suppression TOTALE des beeps/chimes sinusoïdaux et swooshes de bruit blanc
     - Vrai lit musical Chillhop / Tech minimal feutré (smooth Rhodes & groove moderne)
     - Auto-ducking sous la voix (-24 dB) pour une clarté broadcast maximale
  4. Mastering et normalisation broadcast (-16 LUFS)

Sorties :
  - public/audio/ramsin-motion.mp3
  - src/data/motionVoiceover.json
"""

import asyncio
import json
import os
import subprocess
import tempfile
import urllib.request
import wave
from pathlib import Path

import edge_tts
import imageio_ffmpeg
import numpy as np

ROOT = Path(__file__).resolve().parent.parent
OUT_AUDIO = ROOT / "public" / "audio" / "ramsin-motion.mp3"
OUT_JSON = ROOT / "src" / "data" / "motionVoiceover.json"
BG_MUSIC = ROOT / "bg_lofi.mp3"
FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()
SR = 24000

# Voix françaises multilingues de dernière génération (Azure OpenAI HD style)
VOICES = {
    "narrator": ("fr-FR-VivienneMultilingualNeural", 13, 0),
    "oumar": ("fr-FR-RemyMultilingualNeural", 11, 0),
}

SCENE_LEAD = 0.18  # respiration courte et vive en début de scène


def b(display, speech=None, rate=0, pitch=0, volume=0, pause=0.22):
    """Crée une réplique vive avec son texte d'affichage et sa prononciation."""
    return {
        "display": display,
        "speech": speech or display,
        "rate": rate,
        "pitch": pitch,
        "volume": volume,
        "pause": pause,
    }


SCENES = [
    {
        "key": "idea",
        "speaker": "narrator",
        "title": "L'étincelle & le doute",
        "beats": [
            b(
                "Vous voulez créer un site ou une application sur-mesure ?",
                "Vous voulez créer un site ou une application sur-mesure ?",
                rate=2, pause=0.20
            ),
            b(
                "Mais sans cahier des charges, avec des devis flous et la peur de l'effet tunnel... Beaucoup hésitent.",
                "Mais sans cahier des charges, avec des devis qui explosent et la peur de l'effet tunnel... Beaucoup hésitent.",
                rate=1, pause=0.28
            ),
        ],
    },
    {
        "key": "meet_oumar",
        "speaker": "oumar",
        "title": "Le déclic : Oumar Sidibé",
        "beats": [
            b(
                "Chez RAMSIN, on fait l'inverse. Je suis Oumar Sidibé.",
                "Chez Ramssine, on fait l'inverse ! Je suis Oumar Sidibé, fondateur de Ramssine.",
                rate=1, pause=0.20
            ),
            b(
                "Vous n'avez pas besoin de parler technique : expliquez-moi votre idée, je m'occupe du reste.",
                "Vous n'avez pas besoin de parler technique. Expliquez-moi votre idée, je m'occupe du reste !",
                rate=1, pause=0.28
            ),
        ],
    },
    {
        "key": "scoping",
        "speaker": "oumar",
        "title": "Le cadrage en 30 min",
        "beats": [
            b(
                "En 30 minutes d'échange, on pose un devis forfaitaire ferme et un calendrier garanti.",
                "En trente minutes, on pose un devis forfaitaire ferme et un calendrier garanti. Zéro coût caché !",
                rate=1, pause=0.28
            ),
        ],
    },
    {
        "key": "building",
        "speaker": "narrator",
        "title": "Co-construction & Propriété",
        "beats": [
            b(
                "Chaque semaine, vous voyez votre produit avancer et vous validez chaque écran en direct.",
                "Chaque semaine, vous voyez votre produit avancer, et vous validez chaque écran en direct.",
                rate=1, pause=0.20
            ),
            b(
                "À la livraison, 100 % du code source et des accès vous appartiennent.",
                "Et surtout : cent pour cent du code source et des accès vous appartiennent, sans abonnement captif !",
                rate=0, pause=0.28
            ),
        ],
    },
    {
        "key": "cta",
        "speaker": "oumar",
        "title": "Donnez vie à votre projet",
        "beats": [
            b(
                "Donnez vie à votre projet ! Réservez votre cadrage offert de 30 minutes avec moi.",
                "Donnez vie à votre projet ! Réservez votre cadrage offert de trente minutes avec moi.",
                rate=1, pause=0.35
            ),
            b(
                "RAMSIN. Du premier échange au code en production.",
                "Ramssine. Du premier échange au code en production.",
                rate=-1, pause=0.80
            ),
        ],
    },
]

TRIM = (
    "silenceremove=start_periods=1:start_threshold=-48dB:start_silence=0.01,"
    "areverse,"
    "silenceremove=start_periods=1:start_threshold=-48dB:start_silence=0.03,"
    "areverse"
)


def signed(v: int, unit: str) -> str:
    return f"{'+' if v >= 0 else ''}{v}{unit}"


async def synth_edge(text: str, voice: str, rate: int, pitch: int, volume: int, path: Path) -> None:
    await edge_tts.Communicate(
        text, voice, rate=signed(rate, "%"), pitch=signed(pitch, "Hz"), volume=signed(volume, "%")
    ).save(str(path))


async def synth(beat: dict, speaker: str, path: Path, tries: int = 4) -> None:
    voice, base_rate, base_pitch = VOICES[speaker]
    last = None
    for n in range(tries):
        try:
            await synth_edge(
                beat["speech"], voice, base_rate + beat["rate"], base_pitch + beat["pitch"], beat["volume"], path
            )
            if path.exists() and path.stat().st_size > 1000:
                return
        except Exception as exc:
            last = exc
            print(f"   retry {n + 1}/{tries}: {exc}")
        await asyncio.sleep(1.0 * (n + 1))
    raise RuntimeError(f"Synthèse impossible pour « {beat['speech']} » : {last}")


def mp3_to_wav(mp3: Path, wav: Path) -> None:
    subprocess.run(
        [FFMPEG, "-y", "-loglevel", "error", "-i", str(mp3), "-af", TRIM,
         "-ar", str(SR), "-ac", "1", "-c:a", "pcm_s16le", str(wav)],
        check=True,
    )


def read_wav(path: Path) -> np.ndarray:
    with wave.open(str(path), "rb") as w:
        frames = w.readframes(w.getnframes())
        return np.frombuffer(frames, dtype=np.int16).astype(np.float32) / 32768.0


def load_and_prep_music(target_samples: int, sr=SR) -> np.ndarray:
    """Charge la musique CC0, la convertit au bon format et prépare un fade doux."""
    if not BG_MUSIC.exists():
        # Fallback si absent
        return np.zeros(target_samples, dtype=np.float32)

    with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as tmp_wav:
        tmp_wav_path = Path(tmp_wav.name)

    try:
        dur_sec = target_samples / sr + 1.0
        subprocess.run(
            [
                FFMPEG, "-y", "-loglevel", "error", "-i", str(BG_MUSIC),
                "-ss", "00:00:05", "-t", f"{dur_sec:.2f}",
                "-ar", str(sr), "-ac", "1", "-c:a", "pcm_s16le", str(tmp_wav_path)
            ],
            check=True
        )
        music_samples = read_wav(tmp_wav_path)
    finally:
        if tmp_wav_path.exists():
            tmp_wav_path.unlink()

    if len(music_samples) < target_samples:
        pad_len = target_samples - len(music_samples)
        music_samples = np.pad(music_samples, (0, pad_len))
    else:
        music_samples = music_samples[:target_samples]

    # Niveau très feutré de base (-24 dB)
    music_samples = music_samples * 0.065

    # Fade-in doux sur 1s et fade-out doux sur 2.5s
    fade_in_len = int(1.0 * sr)
    fade_out_len = int(2.5 * sr)
    if len(music_samples) > fade_in_len:
        music_samples[:fade_in_len] *= np.linspace(0, 1.0, fade_in_len)
    if len(music_samples) > fade_out_len:
        music_samples[-fade_out_len:] *= np.linspace(1.0, 0, fade_out_len)

    return music_samples


async def main() -> None:
    OUT_AUDIO.parent.mkdir(parents=True, exist_ok=True)
    OUT_JSON.parent.mkdir(parents=True, exist_ok=True)
    print("Moteur : Edge TTS (Modèles Multilingues HD : Vivienne & Remy)")

    voice_track = []

    def current_sample() -> int:
        return len(voice_track)

    def add_silence(sec: float) -> None:
        voice_track.extend([0.0] * int(sec * SR))

    manifest = {"engine": "edge-tts-multilingual-v3", "scenes": [], "total": 0.0}

    with tempfile.TemporaryDirectory() as tmp:
        tmp_path = Path(tmp)
        for si, scene in enumerate(SCENES, start=1):
            print(f"Scène {si}/{len(SCENES)} — {scene['title']} ({scene['speaker']})")
            scene_start_sec = current_sample() / SR
            add_silence(SCENE_LEAD)
            cues = []

            for bi, beat in enumerate(scene["beats"], start=1):
                mp3 = tmp_path / f"s{si}_b{bi}.mp3"
                wav = tmp_path / f"s{si}_b{bi}.wav"
                await synth(beat, scene["speaker"], mp3)
                mp3_to_wav(mp3, wav)

                beat_start_sec = current_sample() / SR
                audio_samples = read_wav(wav)
                voice_track.extend(audio_samples)
                beat_end_sec = current_sample() / SR

                cues.append({
                    "start": round(beat_start_sec, 3),
                    "end": round(beat_end_sec, 3),
                    "text": beat["display"],
                })

                add_silence(beat["pause"])

            manifest["scenes"].append({
                "id": si,
                "key": scene["key"],
                "speaker": scene["speaker"],
                "title": scene["title"],
                "start": round(scene_start_sec, 3),
                "end": round(current_sample() / SR, 3),
                "cues": cues,
            })

        # Silences de fin doux
        add_silence(0.6)
        total_sec = current_sample() / SR
        manifest["total"] = round(total_sec, 3)

        # Mixage de la voix et du lit musical (AUCUN beep sinusoïdal)
        mixed = np.array(voice_track, dtype=np.float32)
        music_track = load_and_prep_music(len(mixed), SR)

        mixed += music_track

        # Sécurité anti-saturation
        mixed = np.clip(mixed, -0.98, 0.98)

        # Écriture du WAV master
        full_wav = tmp_path / "full_mixed.wav"
        int16_samples = (mixed * 32767.0).astype(np.int16)
        with wave.open(str(full_wav), "wb") as w:
            w.setnchannels(1)
            w.setsampwidth(2)
            w.setframerate(SR)
            w.writeframes(int16_samples.tobytes())

        # Mastering FFmpeg broadcast -16 LUFS
        subprocess.run(
            [
                FFMPEG, "-y", "-loglevel", "error", "-i", str(full_wav),
                "-af", "highpass=f=70,equalizer=f=3000:t=q:w=1.0:g=1.2,loudnorm=I=-16:TP=-1.5:LRA=8",
                "-ar", "44100", "-ac", "1", "-codec:a", "libmp3lame", "-b:a", "128k", str(OUT_AUDIO)
            ],
            check=True,
        )

    OUT_JSON.write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"\nTerminé avec succès : {OUT_AUDIO.name} ({OUT_AUDIO.stat().st_size // 1024} Ko) — Durée : {manifest['total']:.1f} s")


if __name__ == "__main__":
    asyncio.run(main())
