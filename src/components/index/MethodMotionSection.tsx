import { useState, useEffect, useRef, type KeyboardEvent, type MouseEvent } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Subtitles,
  Sparkles,
  Calendar,
  Eye,
  Check,
  Mic,
  Maximize,
  Minimize,
  ChevronDown,
  HelpCircle,
  Clock,
  Code2,
  Wallet,
  ArrowRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { trackConversionEvent } from "@/lib/analytics";
import voiceoverV2 from "@/data/motionVoiceover.json";
import voiceoverV3 from "@/data/motionVoiceoverV3.json";

/* ──────────────────────────────────────────────────────────
   TIMELINE : Synchronisée avec le film Master 1080p V3 (77.0 s)
   & conservation intégrale de l'Édition V2 (81.3 s)
   Voix off unique : Remy HD (+9% dynamique) — Mixage broadcast -16 LUFS
   ────────────────────────────────────────────────────────── */
interface Cue {
  start: number;
  end: number;
  text: string;
}

interface Scene {
  id: number;
  key: string;
  speaker: string;
  title: string;
  start: number;
  end: number;
  cues: Cue[];
}

type EditionKey = "v3" | "v2";

const FILM_EDITIONS: Record<
  EditionKey,
  {
    key: EditionKey;
    badge: string;
    label: string;
    subtitle: string;
    videoSrc: string;
    posterSrc: string;
    vttSrc: string;
    scenes: Scene[];
    total: number;
  }
> = {
  v3: {
    key: "v3",
    badge: "Nouvelle Édition Studio 3D",
    label: "Édition Projet Web & Mobile (V3)",
    subtitle: "De votre idée à votre site ou application en ligne, en direct avec Oumar Sidibé",
    videoSrc: "/videos/ramsin-motion-v3-1080p.mp4",
    posterSrc: "/videos/cover_v3_1080p.png",
    vttSrc: "/videos/subtitles-v3.vtt",
    scenes: voiceoverV3.scenes as Scene[],
    total: (voiceoverV3.total as number) || 85.2,
  },
  v2: {
    key: "v2",
    badge: "Édition Originale Conservée",
    label: "Édition Classique (V2)",
    subtitle: "Présentation synthétique de l'accompagnement RAMSIN Conseil",
    videoSrc: "/videos/ramsin-motion-1080p.mp4",
    posterSrc: "/videos/cover_1080p.png",
    vttSrc: "/videos/subtitles.vtt",
    scenes: voiceoverV2.scenes as Scene[],
    total: (voiceoverV2.total as number) || 81.3,
  },
};

const fmt = (sec: number) => {
  const s = Math.max(0, Math.floor(sec));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
};

const VALUE_PILLARS = [
  {
    icon: HelpCircle,
    title: "1. Pas de cahier des charges requis",
    text: "Venez simplement avec votre idée : site vitrine, boutique en ligne ou application mobile.",
  },
  {
    icon: Mic,
    title: "2. Groupe WhatsApp dédié avec Oumar",
    text: "Échangez en direct dès le premier jour avec Oumar Sidibé, sans intermédiaire ni jargon.",
  },
  {
    icon: Eye,
    title: "3. Lien de test & retours en direct",
    text: "Testez votre projet sur votre téléphone chaque semaine et partagez les retours de vos testeurs.",
  },
  {
    icon: Code2,
    title: "4. 100 % propriétaire & Hébergement inclus",
    text: "Tout vous appartient à 100 % et RAMSIN assure l'hébergement ainsi que la maintenance technique.",
  },
];

type Status = "idle" | "playing" | "paused" | "ended";

export interface MethodMotionSectionProps {
  embedded?: boolean;
}

export const MethodMotionSection = ({ embedded = false }: MethodMotionSectionProps) => {
  const { ref, isVisible } = useScrollAnimation();
  const [editionKey, setEditionKey] = useState<EditionKey>("v3");
  const activeEdition = FILM_EDITIONS[editionKey];
  const SCENES = activeEdition.scenes;
  const TOTAL = activeEdition.total;
  const VIDEO_SRC = activeEdition.videoSrc;
  const POSTER_SRC = activeEdition.posterSrc;
  const VTT_SRC = activeEdition.vttSrc;

  const [status, setStatus] = useState<Status>("idle");
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(TOTAL);
  const [isMuted, setIsMuted] = useState(false);
  const [showSubtitles, setShowSubtitles] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [hoverTime, setHoverTime] = useState<number | null>(null);
  const [showControls, setShowControls] = useState(true);

  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const hideControlsTimeout = useRef<number | null>(null);

  const handleSelectEdition = (nextKey: EditionKey) => {
    if (nextKey === editionKey) return;
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setEditionKey(nextKey);
    setStatus("idle");
    setCurrentTime(0);
    setDuration(FILM_EDITIONS[nextKey].total);
    trackConversionEvent("watch_method_motion", { action: `switch_edition_${nextKey}` });
  };

  // Synchronisation du temps de lecture
  const onTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const onLoadedMetadata = () => {
    if (videoRef.current && videoRef.current.duration) {
      setDuration(videoRef.current.duration);
    }
  };

  // Gestion des contrôles auto-masquants pendant la lecture
  const resetControlsTimer = () => {
    setShowControls(true);
    if (hideControlsTimeout.current) {
      window.clearTimeout(hideControlsTimeout.current);
    }
    if (status === "playing") {
      hideControlsTimeout.current = window.setTimeout(() => {
        setShowControls(false);
      }, 3500);
    }
  };

  useEffect(() => {
    resetControlsTimer();
    return () => {
      if (hideControlsTimeout.current) window.clearTimeout(hideControlsTimeout.current);
    };
  }, [status]);

  // Pause automatique si la vidéo sort de l'écran
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && videoRef.current && !videoRef.current.paused) {
          videoRef.current.pause();
          setStatus("paused");
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Détection du plein écran natif
  useEffect(() => {
    const handleFsChange = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", handleFsChange);
    return () => document.removeEventListener("fullscreenchange", handleFsChange);
  }, []);

  // Actions de lecture
  const handlePlay = () => {
    const v = videoRef.current;
    if (!v) return;

    if (status === "ended") {
      v.currentTime = 0;
      setCurrentTime(0);
    }

    trackConversionEvent("watch_method_motion", {
      action: status === "paused" ? "resume" : status === "ended" ? "replay" : "play",
      time: Math.round(v.currentTime),
    });

    v.play()
      .then(() => setStatus("playing"))
      .catch(() => {
        // En cas de blocage autoplay, démarrer en muet
        v.muted = true;
        setIsMuted(true);
        v.play().then(() => setStatus("playing"));
      });
  };

  const handlePause = () => {
    const v = videoRef.current;
    if (v) {
      v.pause();
      setStatus("paused");
    }
  };

  const togglePlay = () => {
    if (status === "playing") handlePause();
    else handlePlay();
  };

  const seekTo = (seconds: number) => {
    const v = videoRef.current;
    if (!v) return;
    const bounded = Math.max(0, Math.min(duration, seconds));
    v.currentTime = bounded;
    setCurrentTime(bounded);
    trackConversionEvent("watch_method_motion", { action: "scrub", time: Math.round(bounded) });
    if (v.paused && status !== "idle") {
      v.play().then(() => setStatus("playing"));
    }
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !isMuted;
    setIsMuted(!isMuted);
    trackConversionEvent("watch_method_motion", { action: !isMuted ? "mute" : "unmute" });
  };

  const toggleSubtitles = () => {
    const v = videoRef.current;
    if (!v) return;
    const next = !showSubtitles;
    setShowSubtitles(next);

    // Contrôle du track WebVTT natif
    if (v.textTracks && v.textTracks[0]) {
      v.textTracks[0].mode = next ? "showing" : "hidden";
    }

    trackConversionEvent("watch_method_motion", { action: next ? "subtitles_on" : "subtitles_off" });
  };

  const toggleFullscreen = async () => {
    const el = containerRef.current;
    if (!el) return;
    try {
      if (!document.fullscreenElement) {
        await el.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch {
      // Ignorer si la permission est refusée
    }
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.target instanceof HTMLElement && ["BUTTON", "A", "INPUT"].includes(e.target.tagName) && e.key === " ") return;
    if (e.key === " " || e.key === "k") {
      e.preventDefault();
      togglePlay();
    } else if (e.key === "ArrowRight") {
      seekTo(currentTime + 5);
    } else if (e.key === "ArrowLeft") {
      seekTo(currentTime - 5);
    } else if (e.key === "m") {
      toggleMute();
    } else if (e.key === "c") {
      toggleSubtitles();
    } else if (e.key === "f") {
      toggleFullscreen();
    }
  };

  // Trouver la scène active
  const activeScene = SCENES.find((s) => currentTime >= s.start && currentTime < s.end) ?? SCENES[0];

  const playerMarkup = (
    <div
      ref={containerRef}
      onMouseMove={resetControlsTimer}
      onTouchStart={resetControlsTimer}
      onKeyDown={onKeyDown}
      tabIndex={0}
      role="region"
      aria-label="Film RAMSIN : De l'idée au projet concret sans stress. Espace : lecture/pause, flèches : avancer/reculer de 5 s, M : son, C : sous-titres, F : plein écran."
      className="relative max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-[0_25px_80px_-15px_rgba(0,0,0,0.85),0_0_50px_rgba(199,243,107,0.18)] border border-white/15 bg-[#071816] outline-none focus-visible:ring-2 focus-visible:ring-[#C7F36B]/60 group select-none"
    >
      {/* ── Élément Vidéo HTML5 1080p ── */}
      <div className="relative w-full aspect-video bg-black overflow-hidden flex items-center justify-center">
        <video
          key={editionKey}
          ref={videoRef}
          src={VIDEO_SRC}
          poster={POSTER_SRC}
          preload={isVisible ? "auto" : "metadata"}
          playsInline
          onTimeUpdate={onTimeUpdate}
          onLoadedMetadata={onLoadedMetadata}
          onEnded={() => {
            setStatus("ended");
            trackConversionEvent("watch_method_motion", { action: "complete", duration: Math.round(duration), edition: editionKey });
          }}
          onClick={togglePlay}
          className="w-full h-full object-cover cursor-pointer"
        >
          <track kind="subtitles" src={VTT_SRC} srcLang="fr" label="Français" default={false} />
        </video>

        {/* ── Overlay Écran d'accueil (Idle) ── */}
        {status === "idle" && (
          <div
            onClick={handlePlay}
            className="absolute inset-0 bg-gradient-to-t from-[#071816]/95 via-[#071816]/65 to-transparent flex flex-col items-center justify-center p-6 text-center cursor-pointer transition-opacity duration-300"
          >
            <div className="relative inline-block mb-3 sm:mb-5 group-hover:scale-105 transition-transform duration-300">
              <span className="absolute -inset-3 sm:-inset-5 rounded-full border-2 border-[#C7F36B]/40 animate-ping opacity-60 pointer-events-none" />
              <button
                type="button"
                className="w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-[#C7F36B] text-[#071816] p-0 flex items-center justify-center shadow-[0_0_55px_rgba(199,243,107,0.6)] cursor-pointer hover:bg-[#d6ff7d] active:scale-95 transition-all"
                aria-label="Lancer le film publicitaire"
              >
                <Play className="w-7 h-7 sm:w-11 sm:h-11 fill-current translate-x-0.5 sm:translate-x-1" />
              </button>
            </div>

            <div className="space-y-1 sm:space-y-2 max-w-xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#C7F36B]/20 border border-[#C7F36B]/40 text-[#C7F36B] text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider mb-1">
                <Sparkles className="w-3 h-3 text-[#C7F36B]" /> {activeEdition.badge} ({fmt(TOTAL)})
              </div>
              <h3 className="text-lg sm:text-3xl font-black text-white tracking-tight leading-snug">
                Vous avez un projet web ou mobile ?
                <span className="block text-[#C7F36B]">Découvrez la méthode RAMSIN en images.</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto hidden sm:block">
                Zéro jargon technique, un groupe WhatsApp dédié avec Oumar Sidibé, et vous testez votre projet en direct chaque semaine.
              </p>
            </div>
          </div>
        )}

        {/* ── Overlay Écran de Fin (Ended) ── */}
        {status === "ended" && (
          <div className="absolute inset-0 z-30 bg-[#051412]/95 backdrop-blur-md flex flex-col items-center justify-center gap-4 sm:gap-6 p-6 sm:p-8 text-center animate-fade-in">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C7F36B]/20 border border-[#C7F36B]/40 text-[#C7F36B] text-xs font-bold font-mono uppercase tracking-wider">
              <Check className="w-3.5 h-3.5" /> Du premier échange au produit en production
            </div>

            <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tight max-w-lg">
              Donnez vie à votre projet dès aujourd'hui.
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 max-w-md leading-relaxed">
              30 minutes offertes avec <strong>Oumar Sidibé</strong> pour clarifier votre besoin, définir vos priorités et structurer votre projet, sans aucun engagement.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2 w-full max-w-md justify-center">
              <Button asChild variant="lime" size="lg" className="w-full sm:w-auto gap-2 font-black text-xs sm:text-sm px-6 py-4 rounded-xl shadow-xl hover:scale-105 transition-all">
                <Link
                  to="/contact?tunnel=booking#reservation-calendrier"
                  state={{ scrollToBooking: true }}
                  onClick={() => trackConversionEvent("click_booking_calendly", { source: "method_motion_end" })}
                >
                  <Calendar className="w-4 h-4" /> Réserver mon échange offert (30 min)
                </Link>
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={handlePlay}
                className="w-full sm:w-auto gap-2 text-white border-white/30 bg-white/5 hover:bg-white/15 font-semibold text-xs py-4 rounded-xl"
              >
                <RotateCcw className="w-4 h-4" /> Revoir la vidéo
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* ── Barre de Contrôles RAMSIN ── */}
      <div
        className={`p-3 sm:p-4 bg-gradient-to-t from-black via-black/95 to-black/80 border-t border-white/10 space-y-2.5 transition-opacity duration-300 ${
          showControls || status !== "playing" ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Timeline Interactive & Marqueurs de Chapitres */}
        <div className="relative group/timeline py-1.5 cursor-pointer">
          {/* Tooltip de survol */}
          {hoverTime !== null && (
            <div
              className="absolute -top-8 -translate-x-1/2 px-2.5 py-1 rounded-lg bg-black/95 border border-[#C7F36B]/40 text-[10px] font-mono font-bold text-[#C7F36B] pointer-events-none z-30 whitespace-nowrap shadow-xl"
              style={{ left: `${Math.min(95, Math.max(5, (hoverTime / duration) * 100))}%` }}
            >
              {fmt(hoverTime)} · {(SCENES.find((s) => hoverTime < s.end) ?? SCENES[SCENES.length - 1]).title}
            </div>
          )}

          <div
            onClick={(e: MouseEvent<HTMLDivElement>) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const clickPercent = (e.clientX - rect.left) / rect.width;
              seekTo(Math.max(0, Math.min(1, clickPercent)) * duration);
            }}
            onMouseMove={(e: MouseEvent<HTMLDivElement>) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const movePercent = (e.clientX - rect.left) / rect.width;
              setHoverTime(Math.max(0, Math.min(1, movePercent)) * duration);
            }}
            onMouseLeave={() => setHoverTime(null)}
            className="relative h-2 rounded-full bg-white/20 group-hover/timeline:h-3 transition-all overflow-hidden"
          >
            {/* Barre de progression remplie */}
            <div
              className="h-full bg-gradient-to-r from-emerald-400 to-[#C7F36B] transition-[width] duration-75 relative rounded-full"
              style={{ width: `${Math.min(100, (currentTime / duration) * 100)}%` }}
            />

            {/* Séparateurs de chapitres */}
            {SCENES.slice(1).map((s) => (
              <span
                key={s.key}
                className="absolute top-0 bottom-0 w-[2px] bg-black/70 pointer-events-none"
                style={{ left: `${(s.start / duration) * 100}%` }}
                title={s.title}
              />
            ))}
          </div>
        </div>

        {/* Boutons d'actions & Infos */}
        <div className="flex items-center justify-between gap-3 text-xs text-white">
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Play / Pause */}
            <button
              type="button"
              onClick={togglePlay}
              className="w-9 h-9 rounded-xl bg-[#C7F36B] text-[#071816] hover:bg-[#d4ff78] flex items-center justify-center font-bold cursor-pointer transition-transform active:scale-95 shadow-md"
              aria-label={status === "playing" ? "Pause" : "Lecture"}
              title={status === "playing" ? "Pause (Espace / K)" : "Lecture (Espace / K)"}
            >
              {status === "playing" ? (
                <Pause className="w-4 h-4 fill-current" />
              ) : (
                <Play className="w-4 h-4 fill-current translate-x-0.5" />
              )}
            </button>

            {/* Recommencer */}
            <button
              type="button"
              onClick={() => seekTo(0)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 cursor-pointer transition-colors"
              title="Recommencer depuis le début"
              aria-label="Recommencer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Compteur temporel + chapitre actif */}
            <span className="font-mono text-xs text-slate-300 tabular-nums">
              <span className="text-white font-bold">{fmt(currentTime)}</span>
              <span className="text-slate-500 mx-1">/</span>
              <span>{fmt(duration)}</span>
            </span>

            {activeScene && (
              <span className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] font-medium text-slate-300 truncate max-w-[230px]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C7F36B]" />
                {activeScene.title}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Son / Mute */}
            <button
              type="button"
              onClick={toggleMute}
              className={`px-2.5 py-1.5 rounded-lg border text-xs flex items-center gap-1.5 cursor-pointer transition-colors ${
                !isMuted ? "bg-[#C7F36B]/15 border-[#C7F36B]/40 text-[#C7F36B]" : "border-white/15 text-slate-400 hover:text-white"
              }`}
              title={!isMuted ? "Couper le son (M)" : "Activer le son (M)"}
              aria-label={!isMuted ? "Couper le son" : "Activer le son"}
            >
              {!isMuted ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{!isMuted ? "Son" : "Muet"}</span>
            </button>

            {/* Sous-titres */}
            <button
              type="button"
              onClick={toggleSubtitles}
              className={`px-2.5 py-1.5 rounded-lg border text-xs flex items-center gap-1.5 cursor-pointer transition-colors ${
                showSubtitles ? "bg-[#C7F36B]/15 border-[#C7F36B]/40 text-[#C7F36B]" : "border-white/15 text-slate-400 hover:text-white"
              }`}
              title={showSubtitles ? "Masquer les sous-titres (C)" : "Afficher les sous-titres (C)"}
              aria-label={showSubtitles ? "Masquer les sous-titres" : "Afficher les sous-titres"}
              aria-pressed={showSubtitles}
            >
              <Subtitles className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sous-titres</span>
            </button>

            {/* Plein écran */}
            <button
              type="button"
              onClick={toggleFullscreen}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 cursor-pointer transition-colors"
              title="Plein écran (F)"
              aria-label="Plein écran"
            >
              {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const editionAndChaptersMarkup = (
    <div className="max-w-4xl mx-auto mt-3 flex flex-col sm:flex-row items-center justify-between gap-2.5 px-1">
      {/* Chapitres rapides cliquables */}
      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5">
        {SCENES.map((sc) => {
          const isCurrent = activeScene?.key === sc.key && status !== "idle";
          return (
            <button
              key={sc.key}
              type="button"
              onClick={() => seekTo(sc.start)}
              className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer border ${
                isCurrent
                  ? "bg-[#123A35] text-[#C7F36B] border-[#123A35] shadow-sm"
                  : "bg-secondary/60 hover:bg-secondary text-muted-foreground hover:text-foreground border-border/70"
              }`}
              title={`Aller au chapitre ${sc.title} (${fmt(sc.start)})`}
            >
              {sc.title}
            </button>
          );
        })}
      </div>

      {/* Sélecteur d'édition V3 / V2 (garde V2 accessible à tout moment) */}
      <div className="inline-flex items-center gap-1 p-1 rounded-full border border-border/80 bg-secondary/50 text-[11px] shrink-0">
        {(["v3", "v2"] as EditionKey[]).map((k) => {
          const ed = FILM_EDITIONS[k];
          const selected = editionKey === k;
          return (
            <button
              key={k}
              type="button"
              onClick={() => handleSelectEdition(k)}
              className={`px-2.5 py-1 rounded-full font-bold transition-all cursor-pointer ${
                selected
                  ? "bg-[#123A35] text-[#C7F36B] shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              title={ed.subtitle}
            >
              {k === "v3" ? "Film V3 · Studio 3D" : "Film V2 · Classique"}
            </button>
          );
        })}
      </div>
    </div>
  );

  const transcriptMarkup = (
    <>
      <div className="max-w-4xl mx-auto mt-3 text-center">
        <button
          type="button"
          onClick={() => setShowTranscript(!showTranscript)}
          className="text-xs font-semibold text-muted-foreground hover:text-primary transition-colors cursor-pointer inline-flex items-center gap-1.5 py-1"
        >
          {showTranscript ? "Masquer la transcription intégrale" : "Lire la transcription intégrale du film →"}
        </button>
      </div>

      {showTranscript && (
        <div className="max-w-4xl mx-auto mt-4 p-6 sm:p-8 rounded-3xl bg-card glass-card border border-border/80 space-y-5 text-left animate-fade-in">
          <div className="flex items-center justify-between border-b border-border/60 pb-4">
            <div>
              <h3 className="text-lg font-bold text-foreground">
                Transcription intégrale — {activeEdition.label} ({fmt(TOTAL)})
              </h3>
              <p className="text-xs text-muted-foreground">Le texte complet du film publicitaire RAMSIN (Voix off : Remy HD).</p>
            </div>
            <Badge variant="secondary" className="text-xs">Sous-titres &amp; Accessibilité</Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {SCENES.map((sc) => (
              <div key={sc.key} className="p-3.5 rounded-xl border border-border/70 bg-secondary/20 text-left space-y-1">
                <div className="flex items-center justify-between text-xs font-bold text-primary">
                  <span>{sc.title}</span>
                  <span className="font-mono text-muted-foreground">{fmt(sc.start)}</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {sc.cues.map((cu) => cu.text).join(" ")}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );

  // Vue imbriquée (HeroSection)
  if (embedded) {
    return (
      <div className="w-full max-w-4xl mx-auto space-y-3 pt-2 text-center">
        <div className="space-y-1.5 mb-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-bold tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            Film de présentation ({fmt(TOTAL)}) · « De l'idée au projet concret sans stress »
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto">
            Vous avez un projet web ou mobile mais ne savez pas par où commencer ? Découvrez étape par étape la méthode RAMSIN.
          </p>
        </div>
        {playerMarkup}
        {editionAndChaptersMarkup}
        {transcriptMarkup}
      </div>
    );
  }

  // Vue pleine page / section autonome
  return (
    <section className="pt-6 pb-14 md:pt-10 md:pb-20 bg-gradient-to-b from-background via-secondary/25 to-background border-b border-border/60 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-[#123A35]/15 rounded-full blur-[150px] pointer-events-none -z-10" />

      <div className="container mx-auto px-4">
        <div ref={ref} className={`text-center max-w-3xl mx-auto mb-8 space-y-4 scroll-fade-up ${isVisible ? "is-visible" : ""}`}>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#123A35]/20 bg-[#C7F36B]/30 text-[#123A35] text-xs font-bold tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-[#123A35]" />
            Création Web &amp; Applications Sur-Mesure · Film ({fmt(TOTAL)})
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-foreground leading-[1.1]">
            Vous avez une idée de projet.
            <span className="block gradient-text mt-1">Donnons-lui vie ensemble.</span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Pas de cahier des charges de 50 pages, un groupe WhatsApp dédié avec Oumar Sidibé et votre hébergement clé en main.
          </p>
        </div>

        {playerMarkup}
        {editionAndChaptersMarkup}

        {/* 4 Piliers de réassurance */}
        <div className="max-w-4xl mx-auto mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {VALUE_PILLARS.map((pl, i) => (
            <div key={pl.title} className="p-4 rounded-2xl border border-border/80 bg-card/60 backdrop-blur space-y-1.5 text-left">
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 rounded-xl bg-[#123A35] text-[#C7F36B] flex items-center justify-center">
                  <pl.icon className="w-4 h-4" />
                </span>
                <span className="text-[10px] font-mono font-bold text-muted-foreground">0{i + 1}</span>
              </div>
              <div className="text-xs sm:text-sm font-extrabold text-foreground">{pl.title}</div>
              <div className="text-[11px] text-muted-foreground leading-snug">{pl.text}</div>
            </div>
          ))}
        </div>

        {transcriptMarkup}

        {/* Call to action de contact */}
        <div className="mt-8 text-center max-w-xl mx-auto space-y-3">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg" variant="lime" className="gap-2 font-black px-7 shadow-lg hover:scale-105 transition-all">
              <Link
                to="/contact?tunnel=booking#reservation-calendrier"
                state={{ scrollToBooking: true }}
                onClick={() => trackConversionEvent("click_booking_calendly", { source: "method_motion_hero" })}
              >
                <Calendar className="w-4 h-4" /> Parler de mon idée avec Oumar Sidibé (30 min)
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="font-semibold text-xs">
              <Link
                to="/contact?tunnel=form#formulaire-contact"
                state={{ scrollToForm: true }}
                onClick={() => trackConversionEvent("click_switch_to_written_form", { source: "method_motion_hero" })}
              >
                Décrire mon projet par écrit →
              </Link>
            </Button>
          </div>
          <p className="text-xs text-muted-foreground font-medium">
            30 minutes offertes · Échange direct sans engagement commercial · Réponse sous 24h ouvrées.
          </p>
          <div className="pt-4 flex flex-col items-center gap-1 opacity-70 hover:opacity-100 transition-opacity">
            <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">Découvrir les expertises &amp; réalisations</span>
            <ChevronDown className="w-4 h-4 animate-bounce text-muted-foreground" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MethodMotionSection;
