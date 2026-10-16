"""
Génère la bande-son et la timeline du motion design RAMSIN :
« Et si vos outils travaillaient enfin pour vous ? » (Durée cible : ~1 min 30 s)

Voix :
  - Narratrice : fr-FR-VivienneMultilingualNeural (chaleureuse, posée, affirmée)
  - Oumar Sidibé : fr-FR-RemyMultilingualNeural (très humaine, naturelle, expressive, sans effet robotique)

Sorties :
  - public/audio/ramsin-motion.mp3
  - src/data/motionVoiceover.json
"""

import asyncio
import json
import subprocess
import tempfile
import wave
from pathlib import Path

import edge_tts
import imageio_ffmpeg

ROOT = Path(__file__).resolve().parent.parent
OUT_AUDIO = ROOT / "public" / "audio" / "ramsin-motion.mp3"
OUT_JSON = ROOT / "src" / "data" / "motionVoiceover.json"
FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()

VOICES = {
    "narrator": ("fr-FR-VivienneMultilingualNeural", "-4%", "+0Hz"),
    "oumar": ("fr-FR-RemyMultilingualNeural", "-2%", "+0Hz"),
}

LEAD = 0.48  # respiration d'entrée de scène (laisse les visuels s'installer)
GAP = 0.38   # pause naturelle et humaine entre deux phrases
TAIL = 0.52  # pause de fin de scène (permet d'intégrer le message fort)
SR = 24000

SCENES = [
    {
        "id": 1,
        "speaker": "narrator",
        "title": "L'accroche",
        "shortTitle": "L'accroche",
        "lines": [
            ("Votre entreprise évolue. Mais est-ce que vos outils évoluent avec elle ?", None),
        ],
    },
    {
        "id": 2,
        "speaker": "narrator",
        "title": "Reconnaître le problème",
        "shortTitle": "Le problème",
        "lines": [
            ("Des fichiers Excel partout. Des tâches répétées.", None),
            ("Un site qui reçoit des visites, mais génère trop peu de demandes.", None),
            ("Une idée d'application qui n'avance pas.", None),
        ],
    },
    {
        "id": 3,
        "speaker": "narrator",
        "title": "Le coût du problème",
        "shortTitle": "Le coût réel",
        "lines": [
            ("Alors, vos équipes compensent. Elles copient, ressaisissent, relancent. Jour après jour.", None),
            ("Et ce temps-là, elles ne le consacrent pas à vos clients ni à votre croissance.", None),
        ],
    },
    {
        "id": 4,
        "speaker": "oumar",
        "title": "Oumar Sidibé · Fondateur",
        "shortTitle": "Oumar Sidibé",
        "lines": [
            ("Je suis Oumar Sidibé, fondateur de RAMSIN.", None),
            ("J'aide les entreprises à transformer leurs besoins métier en solutions web et mobiles concrètes.", None),
        ],
    },
    {
        "id": 5,
        "speaker": "narrator",
        "title": "La méthode : partir du vrai besoin",
        "shortTitle": "La méthode",
        "lines": [
            ("On commence par comprendre ce qui bloque, qui utilise la solution et ce qu'il faut vraiment améliorer.", None),
            ("Puis on définit les priorités, le périmètre, les étapes et le budget avant de développer.", None),
        ],
    },
    {
        "id": 6,
        "speaker": "narrator",
        "title": "Des solutions concrètes",
        "shortTitle": "Les solutions",
        "lines": [
            ("Nous concevons un site pensé pour transformer les visiteurs en demandes,", None),
            ("une application web pour simplifier vos opérations,", None),
            ("ou une application mobile adaptée à vos utilisateurs.", None),
        ],
    },
    {
        "id": 7,
        "speaker": "narrator",
        "title": "Rassurer sur la réalisation",
        "shortTitle": "La réalisation",
        "lines": [
            ("Vous voyez le produit prendre forme. Vous validez les étapes, vous testez la solution", None),
            ("et vous gardez de la visibilité sur ce qui est construit et ce qui sera livré.", None),
        ],
    },
    {
        "id": 8,
        "speaker": "oumar",
        "title": "Passer à l'action",
        "shortTitle": "Passer à l'action",
        "lines": [
            ("Vous n'avez pas besoin d'avoir toutes les réponses, ni un cahier des charges parfait.", None),
            ("Vous avez juste besoin d'expliquer ce qui vous ralentit ou ce que vous voulez créer.", None),
            (
                "Parlons-en lors d'un premier échange de 30 minutes, gratuit et sans engagement.",
                "Parlons-en lors d'un premier échange de trente minutes, gratuit et sans engagement.",
            ),
            ("RAMSIN. Des outils numériques conçus pour faire avancer votre activité.", None),
        ],
    },
]

TRIM = (
    "silenceremove=start_periods=1:start_threshold=-48dB:start_silence=0.02,"
    "areverse,"
    "silenceremove=start_periods=1:start_threshold=-48dB:start_silence=0.04,"
    "areverse"
)


async def synth(text: str, voice: str, rate: str, pitch: str, path: Path, tries: int = 5) -> None:
    last = None
    for n in range(tries):
        try:
            await edge_tts.Communicate(text, voice, rate=rate, pitch=pitch).save(str(path))
            if path.exists() and path.stat().st_size > 1000:
                return
        except Exception as exc:
            last = exc
            print(f"   retry {n + 1}/{tries}: {exc}")
        await asyncio.sleep(1.5 * (n + 1))
    raise RuntimeError(f"Synthèse impossible pour « {text} » : {last}")


def mp3_to_wav(mp3: Path, wav: Path) -> None:
    subprocess.run(
        [FFMPEG, "-y", "-loglevel", "error", "-i", str(mp3), "-af", TRIM,
         "-ar", str(SR), "-ac", "1", "-c:a", "pcm_s16le", str(wav)],
        check=True,
    )


def read_wav(path: Path) -> bytes:
    with wave.open(str(path), "rb") as w:
        return w.readframes(w.getnframes())


async def main() -> None:
    OUT_AUDIO.parent.mkdir(parents=True, exist_ok=True)
    OUT_JSON.parent.mkdir(parents=True, exist_ok=True)

    pcm = bytearray()

    def now() -> float:
        return len(pcm) / 2 / SR

    def silence(sec: float) -> None:
        pcm.extend(b"\x00\x00" * int(sec * SR))

    manifest = {"scenes": [], "total": 0.0}

    with tempfile.TemporaryDirectory() as tmp:
        tmp_path = Path(tmp)
        for si, scene in enumerate(SCENES, start=1):
            voice, rate, pitch = VOICES[scene["speaker"]]
            print(f"Scène {si}/{len(SCENES)} — {scene['title']} ({voice})")
            scene_start = now()
            silence(LEAD)
            cues = []
            n_lines = len(scene["lines"])
            for li, (display, speech) in enumerate(scene["lines"], start=1):
                mp3 = tmp_path / f"s{si}_l{li}.mp3"
                wav = tmp_path / f"s{si}_l{li}.wav"
                await synth(speech or display, voice, rate, pitch, mp3)
                mp3_to_wav(mp3, wav)
                start = now()
                pcm.extend(read_wav(wav))
                end = now()
                cues.append({"start": round(start, 3), "end": round(end, 3), "text": display})
                silence(TAIL if li == n_lines else GAP)

            manifest["scenes"].append(
                {
                    "id": si,
                    "speaker": scene["speaker"],
                    "title": scene["title"],
                    "shortTitle": scene.get("shortTitle", scene["title"]),
                    "start": round(scene_start, 3),
                    "end": round(now(), 3),
                    "cues": cues,
                }
            )

        full_wav = tmp_path / "full.wav"
        with wave.open(str(full_wav), "wb") as w:
            w.setnchannels(1)
            w.setsampwidth(2)
            w.setframerate(SR)
            w.writeframes(bytes(pcm))

        # Encodage final : normalisation volume (-16 LUFS)
        subprocess.run(
            [FFMPEG, "-y", "-loglevel", "error", "-i", str(full_wav),
             "-af", "loudnorm=I=-16:TP=-1.5:LRA=9", "-ar", "44100", "-ac", "1",
             "-codec:a", "libmp3lame", "-b:a", "96k", str(OUT_AUDIO)],
            check=True,
        )

    manifest["total"] = round(now(), 3)
    OUT_JSON.write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"\nOK : {OUT_AUDIO.name} ({OUT_AUDIO.stat().st_size // 1024} Ko) — durée {manifest['total']:.1f} s")


if __name__ == "__main__":
    asyncio.run(main())
