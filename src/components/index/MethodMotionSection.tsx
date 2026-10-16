import { useState, useEffect, useRef, type CSSProperties, type ReactNode, type KeyboardEvent, type MouseEvent } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Subtitles,
  Sparkles,
  Calendar,
  Laptop,
  ArrowRight,
  Smartphone,
  Eye,
  AlertTriangle,
  FileSpreadsheet,
  MousePointerClick,
  Layers,
  Check,
  Mic,
  Lightbulb,
  TrendingUp,
  Maximize,
  Minimize,
  ChevronDown,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { trackConversionEvent } from "@/lib/analytics";
import voiceover from "@/data/motionVoiceover.json";

/* ──────────────────────────────────────────────────────────
   TIMELINE : générée avec la voix off (scripts/generate_motion_voiceover.py)
   La piste audio est l'horloge unique : animations, sous-titres et
   barre de progression en dérivent → synchro parfaite.
   ────────────────────────────────────────────────────────── */
interface Cue {
  start: number;
  end: number;
  text: string;
}
interface Scene {
  id: number;
  speaker: "narrator" | "oumar";
  title: string;
  shortTitle?: string;
  start: number;
  end: number;
  cues: Cue[];
}

const SCENES = voiceover.scenes as Scene[];
const TOTAL = voiceover.total as number;
const AUDIO_SRC = "/audio/ramsin-motion.mp3";

const fmt = (sec: number) => {
  const s = Math.max(0, Math.floor(sec));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
};

const VALUE_PILLARS = [
  { icon: AlertTriangle, title: "1. Fin du bricolage manuel", text: "Arrêtez de compenser des outils mal adaptés avec du temps perdu" },
  { icon: Layers, title: "2. Cadrage avant tout", text: "Comprendre et prioriser votre besoin réel avant d'écrire une ligne de code" },
  { icon: TrendingUp, title: "3. Solutions sur-mesure", text: "Sites web convertissants, applications web et mobile pensées pour vos équipes" },
  { icon: Eye, title: "4. Zéro boîte noire", text: "Visibilité continue, validations à chaque étape et code source 100% à votre nom" },
];

/* ──────────────────────────────────────────────────────────
   ANIMATIONS (CSS) — cinéma, calmes, nobles, progressives
   Palette : Vert forêt (#071816), Citron (#C7F36B), Ivoire (#F8FAFC)
   ────────────────────────────────────────────────────────── */
const MOTION_CSS = `
@keyframes rm-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
@keyframes rm-pop{0%{opacity:0;transform:scale(.78)}70%{transform:scale(1.03)}100%{opacity:1;transform:scale(1)}}
@keyframes rm-up{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}
@keyframes rm-fade{from{opacity:0}to{opacity:1}}
@keyframes rm-left{from{opacity:0;transform:translateX(-36px)}to{opacity:1;transform:none}}
@keyframes rm-right{from{opacity:0;transform:translateX(36px)}to{opacity:1;transform:none}}
@keyframes rm-ring{0%{transform:scale(.92);opacity:.4}100%{transform:scale(1.55);opacity:0}}
@keyframes rm-bar{0%,100%{transform:scaleY(.25)}50%{transform:scaleY(1)}}
@keyframes rm-wipe{0%{transform:translateX(-101%)}50%{transform:translateX(0)}100%{transform:translateX(101%)}}
@keyframes rm-zoom{from{transform:scale(1)}to{transform:scale(1.025)}}
.rm-paused *{animation-play-state:paused!important}
@media (prefers-reduced-motion: reduce){.rm-stage *{animation:none!important;opacity:1!important;transform:none!important;filter:none!important;stroke-dashoffset:0!important}}
`;

const EASE = "cubic-bezier(.2,.8,.2,1)";
const A = (name: string, delay = 0, dur = 0.5) => `${name} ${dur}s ${Math.max(0, delay)}s both ${EASE}`;
const LOOP = (name: string, dur = 3, delay = 0) => `${name} ${dur}s ${Math.max(0, delay)}s infinite ease-in-out`;
const st = (...anims: string[]): CSSProperties => ({ animation: anims.join(", ") });
const at = (cs: number[], i: number, off = 0) => Math.max(0, (cs[i] ?? 0) + off);
const LIME = "#C7F36B";
const FOREST_CARD = "rgba(10,34,30,0.85)";

interface SceneProps {
  /** début de chaque phrase, en secondes depuis le début de la scène */
  cs: number[];
}

const Card = ({ children, style, className = "" }: { children: ReactNode; style?: CSSProperties; className?: string }) => (
  <div
    className={`rounded-2xl border border-white/15 backdrop-blur px-3.5 py-3 text-xs sm:text-sm font-semibold text-slate-100 shadow-lg ${className}`}
    style={{ background: FOREST_CARD, ...style }}
  >
    {children}
  </div>
);

const Pill = ({ children, style, accent = false }: { children: ReactNode; style?: CSSProperties; accent?: boolean }) => (
  <span
    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold ${
      accent ? "text-[#102a24]" : "text-white border border-white/20 bg-white/10"
    }`}
    style={{ ...(accent ? { background: LIME } : {}), ...style }}
  >
    {children}
  </span>
);

/* ──────────────────────────────────────────────────────────
   SCÈNE 1 — L'accroche
   « Votre entreprise évolue. Mais est-ce que vos outils évoluent avec elle ? »
   ────────────────────────────────────────────────────────── */
const SceneHook = ({ cs }: SceneProps) => (
  <div className="relative w-full max-w-2xl flex flex-col items-center justify-center text-center">
    <div className="relative w-full h-28 sm:h-36 flex items-center justify-center mb-4">
      <div
        className="absolute w-48 sm:w-64 h-16 sm:h-20 rounded-xl border border-white/10 bg-white/[0.04] p-2 text-left -translate-y-4 -translate-x-12 opacity-40"
        style={st(A("rm-left", at(cs, 0), 0.5))}
      >
        <div className="h-2 w-1/3 rounded bg-white/20 mb-1.5" />
        <div className="h-1.5 w-2/3 rounded bg-white/10" />
      </div>
      <div
        className="absolute w-52 sm:w-72 h-20 sm:h-24 rounded-xl border border-white/15 bg-white/[0.06] p-2.5 text-left translate-y-2 translate-x-8 opacity-70"
        style={st(A("rm-right", at(cs, 0, 0.2), 0.5))}
      >
        <div className="h-2 w-1/2 rounded bg-[#C7F36B]/40 mb-1.5" />
        <div className="h-1.5 w-3/4 rounded bg-white/15" />
      </div>
      <div
        className="relative z-10 w-56 sm:w-80 rounded-xl border border-[#C7F36B]/40 bg-[#071816]/90 p-3 shadow-2xl"
        style={st(A("rm-pop", at(cs, 0, 0.4), 0.6))}
      >
        <div className="flex items-center gap-1.5 mb-1.5">
          <span className="w-2 h-2 rounded-full bg-red-400" />
          <span className="w-2 h-2 rounded-full bg-amber-400" />
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="text-[10px] text-slate-300 ml-1 font-mono">outils_metier.app</span>
        </div>
        <div className="h-2.5 w-2/3 rounded bg-white/30" />
      </div>
    </div>

    <div
      className="px-6 py-4 rounded-2xl border border-white/20 bg-[#071816]/95 backdrop-blur-md shadow-2xl"
      style={st(A("rm-up", at(cs, 0, 0.7), 0.6))}
    >
      <h3 className="text-base sm:text-2xl font-black text-white tracking-tight uppercase">
        Votre activité avance.
        <span className="block text-[#C7F36B] mt-0.5">Vos outils suivent-ils ?</span>
      </h3>
    </div>
  </div>
);

/* ──────────────────────────────────────────────────────────
   SCÈNE 2 — Reconnaître le problème
   1. Trop de manuel (Excel) · 2. Pas assez de demandes (Site) · 3. Toujours pas concrétisé (App)
   ────────────────────────────────────────────────────────── */
const SceneRecognizeProblem = ({ cs }: SceneProps) => {
  const cards = [
    {
      icon: FileSpreadsheet,
      title: "Fichiers Excel partout",
      tag: "Trop de manuel",
      desc: "Données copiées-collées, ressaisies quotidiennes",
      delay: at(cs, 0),
    },
    {
      icon: MousePointerClick,
      title: "Site qui ne convertit pas",
      tag: "Pas assez de demandes",
      desc: "Des visites mais un formulaire souvent vide",
      delay: at(cs, 1),
    },
    {
      icon: Lightbulb,
      title: "Idée d'application bloquée",
      tag: "Pas concrétisé",
      desc: "L'ambition est là, mais les étapes manquent",
      delay: at(cs, 2),
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-3xl">
      {cards.map((c) => (
        <div
          key={c.title}
          className="rounded-2xl border border-white/15 bg-white/[0.06] p-3.5 sm:p-4 flex flex-col justify-between"
          style={st(A("rm-up", c.delay, 0.55))}
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <c.icon className="w-5 h-5 text-[#C7F36B]" />
              <span className="text-[10px] font-bold text-amber-300 bg-amber-400/15 border border-amber-300/30 px-2 py-0.5 rounded-full">
                {c.tag}
              </span>
            </div>
            <h4 className="text-xs sm:text-sm font-extrabold text-white mb-1">{c.title}</h4>
            <p className="text-[11px] text-slate-300 leading-snug">{c.desc}</p>
          </div>
          <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-slate-400">
            <span>Friction</span>
            <span className="text-rose-300">Temps perdu</span>
          </div>
        </div>
      ))}
    </div>
  );
};

/* ──────────────────────────────────────────────────────────
   SCÈNE 3 — Faire ressentir le coût du problème
   « Alors, vos équipes compensent... »
   ────────────────────────────────────────────────────────── */
const SceneCostOfProblem = ({ cs }: SceneProps) => (
  <div className="flex flex-col items-center gap-4 sm:gap-6 w-full max-w-2xl text-center">
    <div className="flex flex-wrap items-center justify-center gap-2" style={st(A("rm-pop", at(cs, 0), 0.55))}>
      {["Copier des données", "Ressaisir les e-mails", "Relancer manuellement", "Compenser les outils"].map((t, idx) => (
        <span
          key={t}
          className="px-3 py-1.5 rounded-xl border border-rose-400/30 bg-rose-500/10 text-xs font-semibold text-rose-200"
          style={st(A("rm-pop", at(cs, 0, idx * 0.4), 0.4))}
        >
          {t}
        </span>
      ))}
    </div>

    <div
      className="p-5 sm:p-7 rounded-3xl border-2 border-[#C7F36B] shadow-2xl space-y-2"
      style={{ background: "rgba(7,24,22,0.95)", ...st(A("rm-up", at(cs, 1), 0.6)) }}
    >
      <span className="text-[11px] font-mono text-[#C7F36B] tracking-wider uppercase block">Constat clé</span>
      <h3 className="text-base sm:text-2xl font-black text-white tracking-tight uppercase leading-snug">
        Ce qui vous ralentit ne devrait pas être votre outil.
      </h3>
      <p className="text-xs text-slate-300">Ce temps perdu devrait être consacré à vos clients et à votre croissance.</p>
    </div>
  </div>
);

/* ──────────────────────────────────────────────────────────
   SCÈNE 4 — Introduire RAMSIN et Oumar Sidibé
   « Je suis Oumar Sidibé, fondateur de RAMSIN... »
   ────────────────────────────────────────────────────────── */
const SceneMeetOumar = ({ cs }: SceneProps) => (
  <div className="flex flex-col items-center justify-center gap-5 w-full max-w-2xl text-center">
    <div className="space-y-2" style={st(A("rm-pop", at(cs, 0), 0.6))}>
      <div className="inline-block px-4 py-1.5 rounded-full border border-[#C7F36B]/40 bg-[#C7F36B]/15 text-[#C7F36B] font-mono text-xs font-bold">
        Fondateur & Développeur
      </div>
      <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tight">Oumar Sidibé</h3>
      <p className="text-xs sm:text-sm text-slate-300 font-medium">Fondateur de RAMSIN</p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 w-full" style={st(A("rm-up", at(cs, 1), 0.6))}>
      <Card className="text-center !p-3">
        <Laptop className="w-5 h-5 text-[#C7F36B] mx-auto mb-1.5" />
        <span className="block text-white text-xs sm:text-sm font-extrabold">Sites Web</span>
        <span className="text-[10px] text-slate-300">Orientés conversion</span>
      </Card>
      <Card className="text-center !p-3">
        <Layers className="w-5 h-5 text-[#C7F36B] mx-auto mb-1.5" />
        <span className="block text-white text-xs sm:text-sm font-extrabold">Applications Web</span>
        <span className="text-[10px] text-slate-300">Opérations simplifiées</span>
      </Card>
      <Card className="text-center !p-3">
        <Smartphone className="w-5 h-5 text-[#C7F36B] mx-auto mb-1.5" />
        <span className="block text-white text-xs sm:text-sm font-extrabold">Applications Mobiles</span>
        <span className="text-[10px] text-slate-300">Expérience fluide</span>
      </Card>
    </div>

    <p className="text-xs text-slate-300 italic" style={st(A("rm-fade", at(cs, 1, 1), 0.5))}>
      Transformer vos besoins métier en solutions concrètes, sans intermédiaire.
    </p>
  </div>
);

/* ──────────────────────────────────────────────────────────
   SCÈNE 5 — La méthode : partir du vrai besoin
   COMPRENDRE → PRIORISER → CONCEVOIR
   ────────────────────────────────────────────────────────── */
const SceneMethod = ({ cs }: SceneProps) => {
  const steps = [
    { step: "01", label: "Comprendre", sub: "Ce qui bloque & qui l'utilise" },
    { step: "02", label: "Prioriser", sub: "L'essentiel avant le superflu" },
    { step: "03", label: "Concevoir", sub: "Périmètre, étapes & budget" },
  ];

  return (
    <div className="flex flex-col items-center gap-4 sm:gap-6 w-full max-w-3xl">
      <Pill accent style={st(A("rm-pop", at(cs, 0), 0.5))}>
        <Sparkles className="w-3.5 h-3.5" /> La démarche RAMSIN
      </Pill>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
        {steps.map((s, idx) => (
          <div
            key={s.label}
            className="rounded-2xl border border-white/15 bg-white/[0.06] p-4 text-center relative"
            style={st(A("rm-up", at(cs, 0, idx * 0.5), 0.55))}
          >
            <span className="text-xs font-mono font-bold text-[#C7F36B] block mb-1">ÉTAPE {s.step}</span>
            <div className="text-base sm:text-lg font-black text-white">{s.label}</div>
            <div className="text-[11px] text-slate-300 mt-1">{s.sub}</div>
          </div>
        ))}
      </div>

      <div
        className="w-full px-4 py-3 rounded-xl border border-white/15 bg-black/30 flex items-center justify-between text-xs text-slate-200"
        style={st(A("rm-fade", at(cs, 1), 0.5))}
      >
        <span className="flex items-center gap-2">
          <Check className="w-4 h-4 text-[#C7F36B]" /> Un plan concret défini avant de lancer le moindre développement
        </span>
        <span className="font-mono text-[#C7F36B] text-[11px] hidden sm:inline">0 surprise</span>
      </div>
    </div>
  );
};

/* ──────────────────────────────────────────────────────────
   SCÈNE 6 — Montrer les solutions, pas simplement les promettre
   ATTIRER · SIMPLIFIER · CONCRÉTISER
   ────────────────────────────────────────────────────────── */
const SceneSolutions = ({ cs }: SceneProps) => {
  const solutions = [
    {
      action: "ATTIRER",
      type: "Site Web",
      result: "Transforme les visiteurs en demandes qualifiées",
      delay: at(cs, 0),
    },
    {
      action: "SIMPLIFIER",
      type: "Application Web",
      result: "Remplace les fichiers dispersés par un outil structuré",
      delay: at(cs, 1),
    },
    {
      action: "CONCRÉTISER",
      type: "Application Mobile",
      result: "Un parcours intuitif entre les mains de vos utilisateurs",
      delay: at(cs, 2),
    },
  ];

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-3xl">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
        {solutions.map((sol) => (
          <div
            key={sol.action}
            className="rounded-2xl border border-white/15 bg-white/[0.06] p-4 text-left flex flex-col justify-between"
            style={st(A("rm-up", sol.delay, 0.55))}
          >
            <div>
              <span className="text-[10px] font-mono font-black text-[#C7F36B] tracking-widest block mb-1">
                {sol.action}
              </span>
              <h4 className="text-sm sm:text-base font-extrabold text-white mb-1.5">{sol.type}</h4>
              <p className="text-[11px] text-slate-300 leading-snug">{sol.result}</p>
            </div>
            <div className="mt-3 pt-2 border-t border-white/10 flex items-center gap-1.5 text-[10px] text-[#C7F36B] font-bold">
              <Check className="w-3.5 h-3.5" /> Solution sur-mesure
            </div>
          </div>
        ))}
      </div>

      <div
        className="px-6 py-2.5 rounded-full border border-white/20 bg-white/10 text-xs sm:text-sm font-extrabold text-white tracking-wide"
        style={st(A("rm-pop", at(cs, 2, 0.8), 0.5))}
      >
        ATTIRER · SIMPLIFIER · CONCRÉTISER
      </div>
    </div>
  );
};

/* ──────────────────────────────────────────────────────────
   SCÈNE 7 — Rassurer sur la réalisation
   VOUS VISUALISEZ · VOUS VALIDEZ · VOUS GARDEZ LA MAÎTRISE
   ────────────────────────────────────────────────────────── */
const SceneReassurance = ({ cs }: SceneProps) => {
  const steps = [
    { title: "VOUS VISUALISEZ", desc: "Le produit prend forme sous vos yeux avec des démos régulières" },
    { title: "VOUS VALIDEZ", desc: "Chaque étape et fonctionnalité est testée avec vous avant déploiement" },
    { title: "VOUS GARDEZ LA MAÎTRISE", desc: "Code source à votre nom, aucun abonnement captif, visibilité 100%" },
  ];

  return (
    <div className="flex flex-col items-center gap-4 sm:gap-6 w-full max-w-3xl">
      <Pill accent style={st(A("rm-pop", at(cs, 0), 0.5))}>
        <Eye className="w-3.5 h-3.5" /> Réalisation sans boîte noire
      </Pill>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
        {steps.map((stItem, idx) => (
          <div
            key={stItem.title}
            className="rounded-2xl border border-white/15 bg-white/[0.06] p-4 text-center"
            style={st(A("rm-up", at(cs, 0, idx * 0.6), 0.55))}
          >
            <span className="w-6 h-6 mx-auto rounded-full bg-[#C7F36B] text-[#102a24] flex items-center justify-center font-bold text-xs mb-2">
              ✓
            </span>
            <div className="text-xs sm:text-sm font-black text-white tracking-wide mb-1">{stItem.title}</div>
            <p className="text-[11px] text-slate-300 leading-snug">{stItem.desc}</p>
          </div>
        ))}
      </div>

      <div
        className="px-6 py-2.5 rounded-xl border border-white/15 bg-black/30 text-xs text-slate-300 text-center"
        style={st(A("rm-fade", at(cs, 1), 0.5))}
      >
        De la visibilité sur ce qui est construit et ce qui sera livré.
      </div>
    </div>
  );
};

/* ──────────────────────────────────────────────────────────
   SCÈNE 8 — Transformer l'intérêt en prise de contact
   « Vous n'avez pas besoin d'avoir toutes les réponses... »
   ────────────────────────────────────────────────────────── */
const SceneCallToAction = ({ cs }: SceneProps) => (
  <div className="flex flex-col items-center gap-4 text-center max-w-xl mx-auto">
    <div className="space-y-1" style={st(A("rm-pop", at(cs, 0), 0.5))}>
      <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tight">RAMSIN</h3>
      <p className="text-xs sm:text-sm text-[#C7F36B] font-semibold">
        Des outils numériques conçus pour faire avancer votre activité.
      </p>
    </div>

    <p className="text-xs sm:text-sm text-slate-200" style={st(A("rm-up", at(cs, 1), 0.5))}>
      Vous avez juste besoin d'expliquer ce qui vous ralentit ou ce que vous voulez créer.
    </p>

    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2" style={st(A("rm-up", at(cs, 2), 0.6))}>
      <Button asChild size="lg" variant="lime" className="gap-2 font-black text-sm px-7 py-6 rounded-xl shadow-xl hover:scale-105 transition-all">
        <Link
          to="/contact?tunnel=booking#reservation-calendrier"
          state={{ scrollToBooking: true }}
          onClick={() => trackConversionEvent("click_booking_calendly", { source: "method_motion_scene8" })}
        >
          <Calendar className="w-4 h-4" /> Parler de mon projet (30 min)
        </Link>
      </Button>
      <Button asChild variant="outline" size="lg" className="font-semibold text-xs text-white border-white/30 bg-white/10 hover:bg-white/20">
        <Link
          to="/contact?tunnel=form#formulaire-contact"
          state={{ scrollToForm: true }}
          onClick={() => trackConversionEvent("click_switch_to_written_form", { source: "method_motion_scene8" })}
        >
          Je préfère décrire mon besoin par écrit →
        </Link>
      </Button>
    </div>

    <div className="text-[11px] text-slate-300 pt-1 flex items-center justify-center gap-3" style={st(A("rm-fade", at(cs, 3), 0.5))}>
      <span>30 minutes</span>
      <span>•</span>
      <span className="text-[#C7F36B]">Gratuit</span>
      <span>•</span>
      <span>Sans engagement</span>
    </div>
  </div>
);

const SceneVisual = ({ id, cs }: { id: number; cs: number[] }) => {
  switch (id) {
    case 1: return <SceneHook cs={cs} />;
    case 2: return <SceneRecognizeProblem cs={cs} />;
    case 3: return <SceneCostOfProblem cs={cs} />;
    case 4: return <SceneMeetOumar cs={cs} />;
    case 5: return <SceneMethod cs={cs} />;
    case 6: return <SceneSolutions cs={cs} />;
    case 7: return <SceneReassurance cs={cs} />;
    default: return <SceneCallToAction cs={cs} />;
  }
};

/* ── Sous-titre karaoké ──────────────────────────────────── */
const Caption = ({ cue, t }: { cue: Cue; t: number }) => {
  const words = cue.text.split(" ");
  const total = cue.text.length || 1;
  const p = Math.min(1, Math.max(0, (t - cue.start) / Math.max(0.3, (cue.end - cue.start) * 0.94)));
  let acc = 0;
  return (
    <p className="text-sm sm:text-base md:text-lg font-bold leading-relaxed tracking-tight text-slate-100">
      {words.map((w, i) => {
        const center = (acc + w.length / 2) / total;
        acc += w.length + 1;
        const lit = center <= p;
        return (
          <span key={i} className="transition-colors duration-150" style={{ color: lit ? "#FFFFFF" : "rgba(203,213,225,.42)" }}>
            {w}{" "}
          </span>
        );
      })}
    </p>
  );
};

/* ──────────────────────────────────────────────────────────
   COMPOSANT PRINCIPAL — LECTEUR CINÉMA HAUT DE GAMME
   Sans bandeau Mac OS, timeline vidéo continue continue
   ────────────────────────────────────────────────────────── */
type Status = "idle" | "playing" | "paused" | "ended";

export interface MethodMotionSectionProps {
  embedded?: boolean;
}

export const MethodMotionSection = ({ embedded = false }: MethodMotionSectionProps) => {
  const { ref, isVisible } = useScrollAnimation();
  const [status, setStatus] = useState<Status>("idle");
  const [t, setT] = useState(0);
  const [runKey, setRunKey] = useState(0);
  const [voiceOn, setVoiceOn] = useState(true);
  const [showSubtitles, setShowSubtitles] = useState(true);
  const [showTranscript, setShowTranscript] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [hoverTime, setHoverTime] = useState<number | null>(null);

  const audioRef = useRef<HTMLAudioElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<Status>("idle");
  const fb = useRef({ on: false, base: 0, started: 0 });

  useEffect(() => {
    statusRef.current = status;
  }, [status]);

  const readTime = () => {
    const a = audioRef.current;
    if (!fb.current.on && a) return a.currentTime;
    return fb.current.base + (performance.now() - fb.current.started) / 1000;
  };

  const startFallback = (from: number) => {
    fb.current = { on: true, base: from, started: performance.now() };
  };

  useEffect(() => {
    if (status !== "playing") return;
    let raf = 0;
    const tick = () => {
      const cur = readTime();
      if (fb.current.on && cur >= TOTAL) {
        setT(TOTAL);
        setStatus("ended");
        return;
      }
      setT((prev) => (Math.abs(cur - prev) > 0.03 ? cur : prev));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [status]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.muted = !voiceOn;
  }, [voiceOn]);

  useEffect(() => {
    const el = playerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && statusRef.current === "playing") doPause();
      },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener("fullscreenchange", handleFsChange);
    return () => document.removeEventListener("fullscreenchange", handleFsChange);
  }, []);

  useEffect(() => {
    const a = audioRef.current;
    return () => {
      a?.pause();
    };
  }, []);

  const playFrom = (time?: number) => {
    const a = audioRef.current;
    if (!a) return;
    if (typeof time === "number") {
      const bounded = Math.max(0, Math.min(TOTAL, time));
      a.currentTime = bounded;
      setT(bounded);
      setRunKey((k) => k + 1);
    }
    const from = typeof time === "number" ? time : a.currentTime;
    if (fb.current.on) fb.current = { on: true, base: from, started: performance.now() };
    a.muted = !voiceOn;
    const p = a.play();
    setStatus("playing");
    if (p && typeof p.catch === "function") p.catch(() => startFallback(from));
  };

  function doPause() {
    const a = audioRef.current;
    if (fb.current.on) fb.current.base = readTime();
    a?.pause();
    setStatus("paused");
  }

  const handlePlay = () => {
    if (status === "paused") {
      trackConversionEvent("watch_method_motion", { action: "resume", time: Math.round(t) });
      playFrom();
      return;
    }
    trackConversionEvent("watch_method_motion", { action: status === "ended" ? "replay" : "play", time: 0 });
    playFrom(0);
  };

  const handleScrubberChange = (newTime: number) => {
    const bounded = Math.max(0, Math.min(TOTAL, newTime));
    trackConversionEvent("watch_method_motion", { action: "scrub", time: Math.round(bounded) });
    playFrom(bounded);
  };

  const toggleFullscreen = async () => {
    const el = playerRef.current;
    if (!el) return;
    try {
      if (!document.fullscreenElement) {
        await el.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch {
      // Ignorer si bloqué par permission
    }
  };

  const toggleVoice = () => {
    trackConversionEvent("watch_method_motion", { action: voiceOn ? "voice_off" : "voice_on" });
    setVoiceOn((v) => !v);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.target instanceof HTMLElement && ["BUTTON", "A", "INPUT"].includes(e.target.tagName) && e.key === " ") return;
    if (e.key === " " || e.key === "k") {
      e.preventDefault();
      status === "playing" ? doPause() : handlePlay();
    } else if (e.key === "ArrowRight") {
      handleScrubberChange(Math.min(TOTAL, t + 5));
    } else if (e.key === "ArrowLeft") {
      handleScrubberChange(Math.max(0, t - 5));
    } else if (e.key === "m") {
      toggleVoice();
    } else if (e.key === "f") {
      toggleFullscreen();
    }
  };

  let sceneIdx = SCENES.findIndex((s) => t < s.end);
  if (sceneIdx < 0) sceneIdx = SCENES.length - 1;
  const scene = SCENES[sceneIdx];
  const cs = scene.cues.map((c) => c.start - scene.start);
  const sceneDur = scene.end - scene.start;

  const cueNow = [...scene.cues].reverse().find((c) => t >= c.start - 0.05);
  const showCue = cueNow && t < cueNow.end + 0.6 ? cueNow : undefined;

  const playerMarkup = (
    <div
      ref={playerRef}
      className="relative max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-[0_20px_70px_-15px_rgba(0,0,0,0.8),0_0_45px_rgba(199,243,107,0.12)] border border-white/15 bg-[#071816] outline-none focus-visible:ring-2 focus-visible:ring-primary/60 group"
      tabIndex={0}
      role="region"
      aria-label="Vidéo motion design RAMSIN : Et si vos outils travaillaient enfin pour vous ? Espace : lecture/pause, flèches : avancer/reculer de 5s, M : son, F : plein écran."
      onKeyDown={onKeyDown}
    >
          <audio
            ref={audioRef}
            src={AUDIO_SRC}
            preload={isVisible ? "auto" : "none"}
            onEnded={() => {
              setT(TOTAL);
              setStatus("ended");
              trackConversionEvent("watch_method_motion", { action: "complete", duration: TOTAL });
            }}
            onError={() => {
              if (statusRef.current === "playing") startFallback(t);
            }}
          />

          {/* Écran vidéo principal (ratio 16:9 cinématographique) */}
          <div className={`rm-stage relative w-full aspect-[4/3] sm:aspect-video bg-[#071816] overflow-hidden select-none ${status === "playing" ? "" : "rm-paused"}`}>
            {status === "idle" ? (
              <div className="relative w-full h-full flex flex-col items-center justify-center text-center p-6 sm:p-12">
                <img
                  src="/images/method-motion-poster.jpg"
                  alt="Aperçu du motion design RAMSIN : Et si vos outils travaillaient enfin pour vous ?"
                  className="absolute inset-0 w-full h-full object-cover opacity-25 filter saturate-150"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071816] via-[#071816]/75 to-[#071816]/40" />

                {/* Grand bouton de lecture central avec onde lumineuse */}
                <div className="relative z-10 space-y-5 max-w-xl">
                  <div className="relative inline-block mx-auto">
                    <span className="absolute -inset-4 rounded-full border-2 border-[#C7F36B]/40 animate-ping opacity-40 pointer-events-none" />
                    <Button
                      size="lg"
                      variant="lime"
                      onClick={handlePlay}
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-full p-0 flex items-center justify-center shadow-[0_0_50px_rgba(199,243,107,0.5)] hover:scale-110 active:scale-95 transition-all cursor-pointer"
                      aria-label="Lancer la vidéo"
                    >
                      <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-current translate-x-1" />
                    </Button>
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="text-xl sm:text-3xl font-black text-white tracking-tight">
                      Regarder le film ({fmt(TOTAL)})
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-md mx-auto">
                      Découvrez comment transformer vos tâches répétitives et votre présence en ligne en véritables leviers de croissance.
                    </p>
                  </div>

                  <div className="flex items-center justify-center gap-3 text-[11px] font-mono text-slate-400">
                    <span>16:9 Haute Définition</span>
                    <span>•</span>
                    <span>Voix naturelles françaises</span>
                    <span>•</span>
                    <span>Sous-titres synchronisés</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative w-full h-full flex flex-col text-white">
                <div className="absolute inset-0 bg-gradient-to-br from-[#051412] via-[#08201b] to-[#04100e]" />
                <div
                  className="absolute inset-0 opacity-[0.06]"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                  }}
                />
                <div className="absolute -top-24 -right-16 w-80 h-80 rounded-full blur-3xl bg-[#C7F36B]/10 pointer-events-none" />

                {/* Transition discrète entre scènes */}
                <div key={`w-${scene.id}-${runKey}`} className="absolute inset-0 z-20 pointer-events-none overflow-hidden" aria-hidden="true">
                  <div className="h-full w-full" style={{ background: LIME, animation: "rm-wipe .5s ease-in-out both" }} />
                </div>

                {/* Badge discret haut gauche : titre du passage en cours */}
                <div className="relative z-10 flex items-center justify-between p-3 sm:p-5">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-black/40 border border-white/10 backdrop-blur-md text-[11px] sm:text-xs text-white">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C7F36B]" />
                    <span className="font-bold">{scene.shortTitle || scene.title}</span>
                  </div>

                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-black/40 border border-white/10 backdrop-blur-md text-[11px] text-slate-300">
                    <Mic className="w-3 h-3 text-[#C7F36B]" />
                    <span>{scene.speaker === "oumar" ? "Oumar Sidibé" : "Voix off"}</span>
                  </div>
                </div>

                {/* Visuel animé central */}
                <div className="relative z-10 flex-1 min-h-0 flex items-center justify-center px-4 sm:px-8 pb-3">
                  <div
                    key={`${scene.id}-${runKey}`}
                    className="w-full h-full flex items-center justify-center"
                    style={{ animation: `rm-zoom ${sceneDur}s linear both` }}
                  >
                    <SceneVisual id={scene.id} cs={cs} />
                  </div>
                </div>

                {/* Sous-titres karaoké flottants au-dessus de la barre de contrôle */}
                <div className="relative z-10 px-4 sm:px-8 pb-16 sm:pb-20 min-h-[56px] flex items-end justify-center pointer-events-none">
                  {showSubtitles && showCue && (
                    <div className="w-full max-w-2xl bg-[#071816]/92 backdrop-blur-md px-4 py-2 rounded-xl border border-white/15 text-center shadow-2xl">
                      <Caption cue={showCue} t={t} />
                    </div>
                  )}
                </div>

                {/* Écran de fin de vidéo */}
                {status === "ended" && (
                  <div className="absolute inset-0 z-30 bg-[#051412]/94 backdrop-blur-md flex flex-col items-center justify-center gap-4 p-6 text-center">
                    <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                      Et si vos outils travaillaient enfin pour vous ?
                    </h3>
                    <p className="text-sm text-slate-300 max-w-md">
                      Échangez directement avec Oumar Sidibé : 30 minutes offertes pour qualifier votre projet sans engagement.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                      <Button asChild variant="lime" size="lg" className="gap-2 font-black text-sm px-6 py-5 rounded-xl shadow-xl">
                        <Link
                          to="/contact?tunnel=booking#reservation-calendrier"
                          state={{ scrollToBooking: true }}
                          onClick={() => trackConversionEvent("click_booking_calendly", { source: "method_motion_end" })}
                        >
                          <Calendar className="w-4 h-4" /> Parler de mon projet (30 min)
                        </Link>
                      </Button>
                      <Button asChild variant="outline" size="lg" className="font-semibold text-xs text-white border-white/40 hover:bg-white/10">
                        <Link
                          to="/contact?tunnel=form#formulaire-contact"
                          state={{ scrollToForm: true }}
                          onClick={() => trackConversionEvent("click_switch_to_written_form", { source: "method_motion_end" })}
                        >
                          Décrire mon besoin par écrit
                        </Link>
                      </Button>
                      <Button variant="ghost" size="lg" onClick={handlePlay} className="gap-2 text-white hover:bg-white/10">
                        <RotateCcw className="w-4 h-4" /> Revoir
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* ──────────────────────────────────────────────────────────
             BARRE DE CONTRÔLES CINÉMA MODERNE (FLOTTANTE EN BAS DU LECTEUR)
             Véritable Scrubber de temps continu (comme YouTube/Vimeo)
             ────────────────────────────────────────────────────────── */}
          <div className="p-3 sm:p-4 bg-gradient-to-t from-black/95 via-black/85 to-black/60 border-t border-white/10 space-y-2.5">
            {/* Scrubber de timeline continue (choix direct du temps) */}
            <div className="relative group/timeline py-1 cursor-pointer">
              {/* Tooltip de prévisualisation du temps au survol */}
              {hoverTime !== null && (
                <div
                  className="absolute -top-7 -translate-x-1/2 px-2 py-0.5 rounded bg-black/90 border border-white/20 text-[10px] font-mono font-bold text-[#C7F36B] pointer-events-none z-30"
                  style={{ left: `${(hoverTime / TOTAL) * 100}%` }}
                >
                  {fmt(hoverTime)}
                </div>
              )}

              {/* Barre de progression continue */}
              <div
                className="relative h-1.5 sm:h-2 rounded-full bg-white/20 group-hover/timeline:h-2.5 transition-all overflow-hidden"
                onClick={(e: MouseEvent<HTMLDivElement>) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
                  handleScrubberChange(pct * TOTAL);
                }}
                onMouseMove={(e: MouseEvent<HTMLDivElement>) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
                  setHoverTime(pct * TOTAL);
                }}
                onMouseLeave={() => setHoverTime(null)}
              >
                {/* Remplissage de lecture */}
                <div
                  className="h-full bg-[#C7F36B] transition-[width] duration-75 relative rounded-full"
                  style={{ width: `${Math.min(100, (t / TOTAL) * 100)}%` }}
                />
              </div>

              {/* Slider invisible accessible pour glisser le curseur avec précision */}
              <input
                type="range"
                min={0}
                max={TOTAL}
                step={0.1}
                value={Math.min(t, TOTAL)}
                onChange={(e) => handleScrubberChange(parseFloat(e.target.value))}
                aria-label="Position de lecture dans la vidéo"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>

            {/* Rangée de boutons de commande */}
            <div className="flex items-center justify-between gap-3 text-xs text-white">
              {/* Gauche : Play/Pause, Recommencer, Temps précis */}
              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  onClick={status === "playing" ? doPause : handlePlay}
                  className="w-8 h-8 rounded-lg bg-[#C7F36B] text-[#102a24] hover:bg-[#b8ea55] flex items-center justify-center font-bold cursor-pointer transition-transform active:scale-95"
                  aria-label={status === "playing" ? "Pause" : "Lecture"}
                  title={status === "playing" ? "Mettre en pause (Espace)" : "Lire (Espace)"}
                >
                  {status === "playing" ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current translate-x-0.5" />}
                </button>

                <button
                  onClick={() => handleScrubberChange(0)}
                  className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 cursor-pointer transition-colors"
                  title="Recommencer depuis le début"
                  aria-label="Recommencer"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                <span className="font-mono text-xs text-slate-300 tabular-nums">
                  <span className="text-white font-bold">{fmt(Math.min(t, TOTAL))}</span>
                  <span className="text-slate-500 mx-1">/</span>
                  <span>{fmt(TOTAL)}</span>
                </span>
              </div>

              {/* Droite : Son, Sous-titres, Plein écran, Transcription */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                <button
                  onClick={toggleVoice}
                  className={`px-2.5 py-1 rounded-lg border text-xs flex items-center gap-1 cursor-pointer transition-colors ${
                    voiceOn ? "bg-[#C7F36B]/15 border-[#C7F36B]/40 text-[#C7F36B]" : "border-white/15 text-slate-400 hover:text-white"
                  }`}
                  title={voiceOn ? "Couper le son (M)" : "Activer le son (M)"}
                  aria-label={voiceOn ? "Couper le son" : "Activer le son"}
                >
                  {voiceOn ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                  <span className="hidden sm:inline">{voiceOn ? "Son" : "Muet"}</span>
                </button>

                <button
                  onClick={() => setShowSubtitles(!showSubtitles)}
                  className={`px-2.5 py-1 rounded-lg border text-xs flex items-center gap-1 cursor-pointer transition-colors ${
                    showSubtitles ? "bg-[#C7F36B]/15 border-[#C7F36B]/40 text-[#C7F36B]" : "border-white/15 text-slate-400 hover:text-white"
                  }`}
                  title="Sous-titres"
                  aria-label="Sous-titres"
                >
                  <Subtitles className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Sous-titres</span>
                </button>

                <button
                  onClick={toggleFullscreen}
                  className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 cursor-pointer transition-colors"
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

  const transcriptMarkup = (
    <>
      {/* 4. TRANSCRIPTION ACCESSIBLE DÉPLIABLE */}
      <div className="max-w-4xl mx-auto mt-4 text-center">
        <button
          onClick={() => setShowTranscript(!showTranscript)}
          className="text-xs font-semibold text-muted-foreground hover:text-primary transition-colors cursor-pointer inline-flex items-center gap-1.5 py-1"
        >
          {showTranscript ? "Masquer la transcription intégrale" : "Lire la transcription intégrale du film →"}
        </button>
      </div>

      {showTranscript && (
        <div className="max-w-4xl mx-auto mt-4 p-6 sm:p-8 rounded-3xl bg-card glass-card border border-border/80 space-y-5 text-left">
          <div className="flex items-center justify-between border-b border-border/60 pb-4">
            <div>
              <h3 className="text-lg font-bold text-foreground">Transcription intégrale ({fmt(TOTAL)})</h3>
              <p className="text-xs text-muted-foreground">Le texte complet de la vidéo : Oumar Sidibé & Voix off.</p>
            </div>
            <Badge variant="secondary" className="text-xs">Accessible</Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {SCENES.map((sc) => (
              <div
                key={sc.id}
                className="p-3.5 rounded-xl border border-border/70 bg-secondary/20 text-left space-y-1"
              >
                <div className="flex items-center justify-between text-xs font-bold text-primary">
                  <span>{sc.id}. {sc.shortTitle || sc.title}</span>
                  <span className="font-mono text-muted-foreground">{fmt(sc.start)}</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">{sc.speaker === "oumar" ? "Oumar Sidibé" : "Voix off"} :</strong> {sc.cues.map((c) => c.text).join(" ")}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );

  if (embedded) {
    return (
      <div className="w-full max-w-4xl mx-auto space-y-3 pt-2 text-center">
        <style>{MOTION_CSS}</style>

        {/* Badge & Titre discret du film dans le Hero */}
        <div className="space-y-1.5 mb-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-bold tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            Film de présentation ({fmt(TOTAL)}) · « Et si vos outils travaillaient enfin pour vous ? »
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto">
            Découvrez en 1 min 22 comment RAMSIN transforme vos freins opérationnels en solutions web et mobiles concrètes.
          </p>
        </div>

        {playerMarkup}
        {transcriptMarkup}
      </div>
    );
  }

  return (
    <section className="pt-6 pb-14 md:pt-10 md:pb-20 bg-gradient-to-b from-background via-secondary/25 to-background border-b border-border/60 relative overflow-hidden">
      <style>{MOTION_CSS}</style>

      {/* Halo d'ambiance vert forêt */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-[#123A35]/15 rounded-full blur-[150px] pointer-events-none -z-10" />

      <div className="container mx-auto px-4">
        {/* 1. EN-TÊTE D'ACCUEIL DU SITE (Premier impact) */}
        <div ref={ref} className={`text-center max-w-3xl mx-auto mb-8 space-y-4 scroll-fade-up ${isVisible ? "is-visible" : ""}`}>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#123A35]/20 bg-[#C7F36B]/30 text-[#123A35] text-xs font-bold tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-[#123A35]" />
            Transformation Numérique · Film de marque ({fmt(TOTAL)})
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-foreground leading-[1.1]">
            Et si vos outils
            <span className="block gradient-text mt-1">travaillaient enfin pour vous ?</span>
          </h2>

          <p className="text-muted-foreground text-sm sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Votre activité avance. Vos outils doivent suivre. Découvrez en {fmt(TOTAL)} comment RAMSIN transforme vos freins opérationnels en solutions web et mobiles concrètes.
          </p>
        </div>

        {playerMarkup}

        {/* 3. 4 PILIERS DE VALEUR CLÉS (Non cliquables pour ne pas couper le film) */}
        <div className="max-w-4xl mx-auto mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {VALUE_PILLARS.map((p, i) => (
            <div
              key={p.title}
              className="p-4 rounded-2xl border border-border/80 bg-card/60 backdrop-blur space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 rounded-xl bg-[#123A35] text-[#C7F36B] flex items-center justify-center">
                  <p.icon className="w-4 h-4" />
                </span>
                <span className="text-[10px] font-mono font-bold text-muted-foreground">0{i + 1}</span>
              </div>
              <div className="text-xs sm:text-sm font-extrabold text-foreground">{p.title}</div>
              <div className="text-[11px] text-muted-foreground leading-snug">{p.text}</div>
            </div>
          ))}
        </div>

        {transcriptMarkup}

        {/* 5. APPEL À L'ACTION SOUS LA VIDÉO */}
        <div className="mt-8 text-center max-w-xl mx-auto space-y-3">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg" variant="lime" className="gap-2 font-black px-7 shadow-lg hover:scale-105 transition-all">
              <Link
                to="/contact?tunnel=booking#reservation-calendrier"
                state={{ scrollToBooking: true }}
                onClick={() => trackConversionEvent("click_booking_calendly", { source: "method_motion_hero" })}
              >
                <Calendar className="w-4 h-4" /> Parler de mon projet avec Oumar Sidibé (30 min)
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="font-semibold text-xs">
              <Link
                to="/contact?tunnel=form#formulaire-contact"
                state={{ scrollToForm: true }}
                onClick={() => trackConversionEvent("click_switch_to_written_form", { source: "method_motion_hero" })}
              >
                Décrire mon besoin par écrit →
              </Link>
            </Button>
          </div>
          <p className="text-xs text-muted-foreground font-medium">30 minutes offertes · Échange direct sans engagement · Réponse sous 24h ouvrées.</p>

          {/* Indicateur de défilement vers le reste du site */}
          <div className="pt-4 flex flex-col items-center gap-1 opacity-70 hover:opacity-100 transition-opacity">
            <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">Découvrir le détail de l'expertise</span>
            <ChevronDown className="w-4 h-4 animate-bounce text-muted-foreground" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MethodMotionSection;
