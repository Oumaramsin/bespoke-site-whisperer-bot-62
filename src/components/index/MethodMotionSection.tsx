import { useState, useEffect, useRef, type KeyboardEvent, type MouseEvent } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Sparkles,
  Calendar,
  Eye,
  Check,
  Mic,
  Maximize,
  Minimize,
  ChevronDown,
  HelpCircle,
  Code2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { trackConversionEvent } from "@/lib/analytics";

/* ──────────────────────────────────────────────────────────
   LECTEUR VIDÉO DE PRÉSENTATION RAMSIN (Master 1080p)
   Motion design V4.2 « L'idée qui dort » — voix Remy, -16 LUFS
   Les sous-titres sont incrustés dans la vidéo : pas de piste VTT ni de bouton dédié.
   ────────────────────────────────────────────────────────── */
const VIDEO_SRC = "/videos/ramsin-motion-v4-1080p.mp4";
const POSTER_SRC = "/videos/cover_v4_1080p.png";
const DEFAULT_DURATION = 87.2;

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

  const [status, setStatus] = useState<Status>("idle");
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(DEFAULT_DURATION);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [hoverTime, setHoverTime] = useState<number | null>(null);
  const [showControls, setShowControls] = useState(true);
  const [isHoveringControls, setIsHoveringControls] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const hideControlsTimeout = useRef<number | null>(null);

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
    if (status === "playing" && !isHoveringControls) {
      hideControlsTimeout.current = window.setTimeout(() => {
        setShowControls(false);
      }, 3500);
    }
  };

  const handleMouseEnterContainer = () => {
    resetControlsTimer();
  };

  const handleMouseLeaveContainer = () => {
    setIsHoveringControls(false);
    if (status === "playing") {
      if (hideControlsTimeout.current) window.clearTimeout(hideControlsTimeout.current);
      hideControlsTimeout.current = window.setTimeout(() => {
        setShowControls(false);
      }, 1200);
    }
  };

  useEffect(() => {
    resetControlsTimer();
    return () => {
      if (hideControlsTimeout.current) window.clearTimeout(hideControlsTimeout.current);
    };
  }, [status, isHoveringControls]);

  // Pause automatique si la vidéo sort de l'écran (hors mode plein écran)
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && !document.fullscreenElement && videoRef.current && !videoRef.current.paused) {
          videoRef.current.pause();
          setStatus("paused");
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Détection du plein écran natif (standard + WebKit)
  useEffect(() => {
    const handleFsChange = () => {
      const doc = document as Document & { webkitFullscreenElement?: Element | null };
      const active = Boolean(doc.fullscreenElement || doc.webkitFullscreenElement);
      setIsFullscreen(active);
      setShowControls(true);
    };
    document.addEventListener("fullscreenchange", handleFsChange);
    document.addEventListener("webkitfullscreenchange", handleFsChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFsChange);
      document.removeEventListener("webkitfullscreenchange", handleFsChange);
    };
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
    resetControlsTimer();
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

  const toggleFullscreen = async () => {
    const el = containerRef.current as (HTMLDivElement & { webkitRequestFullscreen?: () => Promise<void> }) | null;
    const v = videoRef.current as (HTMLVideoElement & { webkitEnterFullscreen?: () => void }) | null;
    const doc = document as Document & {
      webkitFullscreenElement?: Element | null;
      webkitExitFullscreen?: () => Promise<void>;
    };
    if (!el) return;
    try {
      if (!doc.fullscreenElement && !doc.webkitFullscreenElement) {
        if (el.requestFullscreen) {
          await el.requestFullscreen();
        } else if (el.webkitRequestFullscreen) {
          await el.webkitRequestFullscreen();
        } else if (v?.webkitEnterFullscreen) {
          v.webkitEnterFullscreen();
        }
      } else {
        if (doc.exitFullscreen) {
          await doc.exitFullscreen();
        } else if (doc.webkitExitFullscreen) {
          await doc.webkitExitFullscreen();
        }
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
      e.preventDefault();
      seekTo(currentTime + 5);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      seekTo(currentTime - 5);
    } else if (e.key === "m") {
      toggleMute();
    } else if (e.key === "f") {
      toggleFullscreen();
    }
  };

  const playerMarkup = (
    <div
      ref={containerRef}
      onMouseMove={resetControlsTimer}
      onTouchStart={resetControlsTimer}
      onMouseEnter={handleMouseEnterContainer}
      onMouseLeave={handleMouseLeaveContainer}
      onKeyDown={onKeyDown}
      tabIndex={0}
      role="region"
      aria-label="Présentation vidéo RAMSIN : L'idée qui dort. Espace : lecture/pause, flèches : avancer/reculer de 5 s, M : son, F : plein écran."
      className={`relative mx-auto overflow-hidden bg-black outline-none focus-visible:ring-2 focus-visible:ring-[#C7F36B]/60 group select-none flex items-center justify-center ${
        isFullscreen
          ? "w-screen h-screen max-w-none rounded-none border-0"
          : "max-w-4xl w-full aspect-video rounded-3xl shadow-[0_25px_80px_-15px_rgba(0,0,0,0.85),0_0_50px_rgba(199,243,107,0.18)] border border-white/15"
      }`}
    >
      {/* ── Vidéo HTML5 1080p (occupe toujours 100% du cadre) ── */}
      <video
        ref={videoRef}
        src={VIDEO_SRC}
        poster={POSTER_SRC}
        preload="metadata"
        playsInline
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={onLoadedMetadata}
        onEnded={() => {
          setStatus("ended");
          trackConversionEvent("watch_method_motion", { action: "complete", duration: Math.round(duration) });
        }}
        onClick={togglePlay}
        onDoubleClick={toggleFullscreen}
        className={`w-full h-full cursor-pointer ${isFullscreen ? "object-contain" : "object-cover"}`}
      />

      {/* ── Overlay Écran d'accueil (Idle) ── */}
      {status === "idle" && (
        <div
          onClick={handlePlay}
          className="absolute inset-0 z-20 bg-gradient-to-t from-[#071816]/95 via-[#071816]/65 to-transparent flex flex-col items-center justify-center p-6 text-center cursor-pointer transition-opacity duration-300"
        >
          <div className="relative inline-block mb-3 sm:mb-5 group-hover:scale-105 transition-transform duration-300">
            <span className="absolute -inset-3 sm:-inset-5 rounded-full border-2 border-[#C7F36B]/40 animate-ping opacity-60 pointer-events-none" />
            <button
              type="button"
              className="w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-[#C7F36B] text-[#071816] p-0 flex items-center justify-center shadow-[0_0_55px_rgba(199,243,107,0.6)] cursor-pointer hover:bg-[#d6ff7d] active:scale-95 transition-all"
              aria-label="Lancer la vidéo de présentation"
            >
              <Play className="w-7 h-7 sm:w-11 sm:h-11 fill-current translate-x-0.5 sm:translate-x-1" />
            </button>
          </div>

          <div className="space-y-1 sm:space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#C7F36B]/20 border border-[#C7F36B]/40 text-[#C7F36B] text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-3 h-3 text-[#C7F36B]" /> Présentation en vidéo ({fmt(duration)})
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

      {/* ── Barre de Contrôles RAMSIN (Overlay directement superposé au bas de la vidéo) ── */}
      {status !== "idle" && status !== "ended" && (
        <div
          onMouseEnter={() => setIsHoveringControls(true)}
          onMouseLeave={() => setIsHoveringControls(false)}
          className={`absolute bottom-0 inset-x-0 z-30 p-3 sm:p-5 bg-gradient-to-t from-black/95 via-black/75 to-transparent space-y-2 sm:space-y-2.5 transition-opacity duration-300 ${
            showControls || status !== "playing" || isHoveringControls
              ? "opacity-100"
              : "opacity-0 pointer-events-none"
          }`}
        >
          {/* Timeline Interactive */}
          <div className="relative group/timeline py-1.5 cursor-pointer">
            {/* Tooltip de survol (temps uniquement) */}
            {hoverTime !== null && (
              <div
                className="absolute -top-8 -translate-x-1/2 px-2.5 py-1 rounded-lg bg-black/95 border border-[#C7F36B]/40 text-[10px] font-mono font-bold text-[#C7F36B] pointer-events-none z-30 whitespace-nowrap shadow-xl"
                style={{ left: `${Math.min(95, Math.max(5, (hoverTime / duration) * 100))}%` }}
              >
                {fmt(hoverTime)}
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

              {/* Compteur temporel */}
              <span className="font-mono text-xs text-slate-300 tabular-nums">
                <span className="text-white font-bold">{fmt(currentTime)}</span>
                <span className="text-slate-500 mx-1">/</span>
                <span>{fmt(duration)}</span>
              </span>
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

              {/* Plein écran / Quitter le plein écran */}
              <button
                type="button"
                onClick={toggleFullscreen}
                className={`px-2.5 py-1.5 rounded-lg border text-xs flex items-center gap-1.5 cursor-pointer transition-colors ${
                  isFullscreen
                    ? "bg-white/15 border-white/30 text-white hover:bg-white/25"
                    : "border-white/15 text-slate-300 hover:text-white hover:bg-white/10"
                }`}
                title={isFullscreen ? "Quitter le plein écran (F / Échap)" : "Plein écran (F)"}
                aria-label={isFullscreen ? "Quitter le plein écran" : "Plein écran"}
              >
                {isFullscreen ? (
                  <>
                    <Minimize className="w-4 h-4" />
                    <span className="hidden sm:inline">Quitter le plein écran</span>
                  </>
                ) : (
                  <>
                    <Maximize className="w-4 h-4" />
                    <span className="hidden sm:inline">Plein écran</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // Vue imbriquée (HeroSection)
  if (embedded) {
    return (
      <div className="w-full max-w-4xl mx-auto space-y-3 sm:space-y-4 pt-1 sm:pt-2 text-center">
        <div className="max-w-2xl mx-auto space-y-2 px-2">
          {/* Question d'accroche valorisée avec point d'attention */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-950 text-xs sm:text-sm font-bold tracking-tight shadow-xs">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#123A35]" />
            </span>
            <span>Vous avez un projet web ou mobile mais ne savez pas par où commencer&nbsp;?</span>
          </div>

          {/* Titre d'invitation percutant avec dégradé prestige RAMSIN */}
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-foreground tracking-tight leading-snug">
            Découvrez étape par étape la <span className="gradient-text">méthode RAMSIN</span>.
          </h2>
        </div>

        {playerMarkup}
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
            Création Web &amp; Applications Sur-Mesure · Présentation vidéo ({fmt(duration)})
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

