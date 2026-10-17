import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  HeartHandshake,
  Building2,
  Smartphone,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Lock,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useCountUp } from "@/hooks/useCountUp";
import { trackConversionEvent } from "@/lib/analytics";
import MethodMotionSection from "@/components/index/MethodMotionSection";

const AnimatedKPI = ({
  value,
  label,
  sublabel,
  suffix = "",
}: {
  value: number;
  label: string;
  sublabel?: string;
  suffix?: string;
}) => {
  const { ref, displayValue } = useCountUp({
    end: value,
    duration: 2000,
    suffix,
  });
  return (
    <div className="relative p-4 sm:p-5 rounded-2xl bg-white/90 backdrop-blur-md border border-emerald-500/20 hover:border-emerald-500/60 text-center space-y-1.5 hover-lift shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)] hover:shadow-xl hover:shadow-emerald-950/5 transition-all overflow-hidden group">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-transparent via-[#C7F36B] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <span
        ref={ref}
        aria-label={`${value}${suffix} ${label}`}
        className="text-2xl sm:text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-[#123A35] via-[#1a4f48] to-[#047857] block tracking-tight"
      >
        {displayValue}
      </span>
      <span className="text-xs sm:text-sm text-foreground font-extrabold block">
        {label}
      </span>
      {sublabel && (
        <span className="text-[11px] text-muted-foreground font-medium block">
          {sublabel}
        </span>
      )}
    </div>
  );
};

const TextKPI = ({
  value,
  label,
  sublabel,
}: {
  value: string;
  label: string;
  sublabel?: string;
}) => (
  <div className="relative p-4 sm:p-5 rounded-2xl bg-white/90 backdrop-blur-md border border-emerald-500/20 hover:border-emerald-500/60 text-center space-y-1.5 hover-lift shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)] hover:shadow-xl hover:shadow-emerald-950/5 transition-all overflow-hidden group">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-transparent via-[#C7F36B] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    <span className="text-2xl sm:text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-[#123A35] via-[#1a4f48] to-[#047857] block tracking-tight">
      {value}
    </span>
    <span className="text-xs sm:text-sm text-foreground font-extrabold block">
      {label}
    </span>
    {sublabel && (
      <span className="text-[11px] text-muted-foreground font-medium block">
        {sublabel}
      </span>
    )}
  </div>
);

const HeroSection = () => {
  const navigate = useNavigate();

  const scrollToReservation = () => {
    trackConversionEvent("click_booking_calendly", { source: "hero_banner" });
    const el = document.getElementById("reservation-calendrier");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/contact", { state: { scrollToBooking: true } });
    }
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-16 md:pb-24">
      {/* Dot grid pattern de fond */}
      <div className="absolute inset-0 dot-grid-pattern -z-10 pointer-events-none" />

      {/* Halo lumineux subtil */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[520px] bg-gradient-to-b from-[#123A35]/10 via-[#C7F36B]/5 to-transparent -z-10 pointer-events-none" />

      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto space-y-10 text-center">
          
          {/* 1. BADGES D'ACCÈS & STATUT */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card border-emerald-500/30 text-emerald-800 text-xs font-semibold shadow-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Disponible pour missions SI & projets web
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary/80 text-muted-foreground text-xs font-medium border border-border/60">
              <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
              <span>Basés à Fresnes (94) · Interventions Paris & Remote</span>
            </div>
          </div>

          {/* 2. ACCROCHE STRATÉGIQUE & PROMESSE CENTRALE */}
          <div className="space-y-4 max-w-4xl mx-auto">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-primary block">
              Architecture SI (MEGA HOPEX) · Développement Web & Mobile
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.22]">
              Des décisions SI plus claires.
              <span className="block mt-2 sm:mt-2.5 pb-2 gradient-text">
                Des solutions numériques adaptées à vos enjeux.
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground font-normal max-w-3xl mx-auto leading-relaxed pt-2">
              RAMSIN accompagne les organisations et dirigeants sur deux expertises complémentaires :{" "}
              <strong>structurer durablement leur système d’information</strong> et{" "}
              <strong>concevoir des applications numériques sur-mesure</strong> créatrices de valeur.
            </p>
          </div>

          {/* 2.5 LECTEUR CINÉMA MOTION DESIGN : Démonstration vivante & problème client */}
          <div className="pt-1 pb-2">
            <MethodMotionSection embedded />
          </div>

          {/* 3. DÉCISION IMMÉDIATE : LES DEUX PARCOURS COMMERCIAUX */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left pt-2">
            
            {/* PARCOURS A : ARCHITECTURE SI & MEGA HOPEX */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-[#123A35]/25 hover:border-[#123A35] transition-all hover-lift flex flex-col justify-between relative group hover:shadow-[0_20px_50px_-12px_rgba(18,58,53,0.2)] overflow-hidden">
              {/* Ligne d'accent lumineuse supérieure */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#123A35] via-[#1c554e] to-[#0a2320]" />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#123A35] to-[#081a17] text-[#C7F36B] flex items-center justify-center shrink-0 shadow-md shadow-[#123A35]/25">
                    <Building2 className="w-5 h-5 shrink-0" />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#123A35]/10 text-[#123A35] border border-[#123A35]/15">
                    Pour DSI & Dir. Transformation
                  </span>
                </div>

                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                    Architecture SI & MEGA HOPEX
                  </h2>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                    Cartographie applicative, urbanisation du SI, gouvernance des référentiels et accompagnement spécialisé sous MEGA HOPEX V5.
                  </p>
                </div>

                <ul className="space-y-2 text-xs sm:text-sm text-foreground/90 pt-1">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#123A35] shrink-0 mt-0.5" />
                    <span>Livrables tangibles : cartographies, matrices d'impact, roadmap</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#123A35] shrink-0 mt-0.5" />
                    <span>Certification MEGA HOPEX & retours d'expérience grands comptes</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#123A35] shrink-0 mt-0.5" />
                    <span>Aide à la décision stratégique & autonomisation de vos équipes</span>
                  </li>
                </ul>
              </div>

              <div className="pt-6 mt-4 border-t border-border/50 flex flex-col items-center gap-2.5">
                <Button
                  asChild
                  size="lg"
                  className="w-full bg-[#123A35] hover:bg-[#0a221f] text-white font-bold rounded-xl gap-2 shadow-md hover:shadow-lg transition-all"
                >
                  <Link
                    to="/contact?service=si"
                    onClick={() => trackConversionEvent("select_pole", { pole: "si", source: "hero_card" })}
                  >
                    Échanger sur votre besoin SI <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
                <Link
                  to="/services?pole=si"
                  className="text-xs font-semibold text-muted-foreground hover:text-[#123A35] transition-colors pt-1"
                >
                  Découvrir les livrables & la méthode SI →
                </Link>
              </div>
            </div>

            {/* PARCOURS B : DÉVELOPPEMENT WEB & APPLICATIONS SUR-MESURE */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-emerald-500/25 hover:border-emerald-600 transition-all hover-lift flex flex-col justify-between relative group hover:shadow-[0_20px_50px_-12px_rgba(16,185,129,0.2)] overflow-hidden">
              {/* Ligne d'accent lumineuse supérieure */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-600 via-[#C7F36B] to-teal-500" />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#C7F36B] to-[#9ee83a] text-[#071816] flex items-center justify-center shrink-0 shadow-md shadow-[#C7F36B]/30">
                    <Smartphone className="w-5 h-5 shrink-0" />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-800 border border-emerald-500/25">
                    Pour Porteurs de Projet & Entreprises
                  </span>
                </div>

                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                    Web & Applications Sur-Mesure
                  </h2>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                    Conception et réalisation d’applications web, mobiles (iOS & Android) et plateformes métier pensées pour vos utilisateurs et votre rentabilité.
                  </p>
                </div>

                <ul className="space-y-2 text-xs sm:text-sm text-foreground/90 pt-1">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <span><strong>Propriété intégrale de votre projet</strong> : code source et comptes cédés sans abonnement captif</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <span>Méthode agile transparente : cadrage, démo continue, mise en prod</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <span>Technologies modernes pérennes : Next.js, React Native, TypeScript</span>
                  </li>
                </ul>
              </div>

              <div className="pt-6 mt-4 border-t border-border/50 flex flex-col items-center gap-2.5">
                <Button
                  asChild
                  size="lg"
                  variant="lime"
                  className="w-full rounded-xl gap-2 font-extrabold text-sm sm:text-base shadow-md hover:shadow-lg transition-all"
                >
                  <Link
                    to="/contact?service=web"
                    onClick={() => trackConversionEvent("select_pole", { pole: "web", source: "hero_card" })}
                  >
                    Échanger sur votre projet Web / Mobile <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
                <Link
                  to="/services?pole=web"
                  className="text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors pt-1"
                >
                  Découvrir la méthode & les garanties web →
                </Link>
              </div>
            </div>

          </div>

          {/* 4. CONCIERGE & CADRAGE EXPERT (Bandeau Haute Définition) */}
          <div className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#0c2621]/95 via-[#081a17]/95 to-[#051411]/95 border-2 border-[#C7F36B]/30 text-white shadow-[0_20px_50px_-12px_rgba(18,58,53,0.35),0_0_35px_rgba(199,243,107,0.12)] overflow-hidden">
            {/* Halos lumineux d'ambiance */}
            <div className="absolute -top-16 -right-16 w-56 h-56 bg-[#C7F36B]/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6 text-center lg:text-left">
              {/* En-tête : Badge pulse + Titre + Promesse */}
              <div className="space-y-2 max-w-xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C7F36B]/15 border border-[#C7F36B]/30 text-[#C7F36B] text-xs font-mono font-bold tracking-wide">
                  <span className="w-2 h-2 rounded-full bg-[#C7F36B] animate-ping" />
                  <span>Échange Direct avec l'Architecte Senior</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                  Besoin d'un premier avis d'expert sur votre projet ?
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  30 minutes offertes pour évaluer la faisabilité technique, le budget prévisionnel et la feuille de route, sans engagement commercial.
                </p>
              </div>

              {/* Actions & Téléphone : Deux vrais boutons de prestige */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 w-full lg:w-auto justify-center">
                <Button
                  onClick={scrollToReservation}
                  size="lg"
                  variant="lime"
                  className="rounded-xl px-5 py-3 font-extrabold text-xs sm:text-sm shadow-[0_0_25px_rgba(199,243,107,0.4)] hover:shadow-[0_0_35px_rgba(199,243,107,0.6)] hover:scale-105 transition-all gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-[#071816]" />
                  <span>Planifier mes 30 min (Offert)</span>
                  <ArrowRight className="w-4 h-4 text-[#071816]" />
                </Button>

                <div className="hidden sm:flex items-center justify-center">
                  <span className="text-[11px] font-mono uppercase font-bold text-slate-400 px-1">ou</span>
                </div>

                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="rounded-xl px-5 py-3 font-bold text-xs sm:text-sm text-white border-white/20 bg-white/5 hover:bg-white/15 hover:border-white/40 transition-all gap-2"
                >
                  <Link
                    to="/contact?tunnel=form#formulaire-contact"
                    state={{ scrollToForm: true }}
                    onClick={() => trackConversionEvent("click_switch_to_written_form", { source: "hero_banner" })}
                  >
                    <Mail className="w-4 h-4 text-[#C7F36B]" />
                    <span>Transmettre par écrit</span>
                  </Link>
                </Button>
              </div>
            </div>

            {/* Barre de réassurance inférieure dans le cadre */}
            <div className="relative z-10 mt-5 pt-4 border-t border-white/10 flex flex-wrap items-center justify-center lg:justify-between gap-3 text-[11px] text-slate-300">
              <div className="flex items-center gap-4">
                <span className="inline-flex items-center gap-1.5 text-emerald-300 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C7F36B]" /> Diagnostic 100% gratuit
                </span>
                <span className="hidden sm:inline opacity-30">•</span>
                <span className="inline-flex items-center gap-1.5 text-slate-300">
                  <Lock className="w-3.5 h-3.5 text-[#C7F36B]" /> Confidentialité garantie
                </span>
              </div>

              <a
                href="tel:+33761518890"
                onClick={() => trackConversionEvent("click_phone")}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 hover:bg-white/15 border border-white/15 text-white font-mono font-bold transition-all text-[11px]"
              >
                <Phone className="w-3 h-3 text-[#C7F36B]" />
                <span>Ligne directe : +33 (0)7 61 51 88 90</span>
              </a>
            </div>
          </div>

          {/* 5. CHIFFRES CLÉS & PREUVES CONCRÈTES VÉRIFIABLES */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pt-6 border-t border-border/60">
            <AnimatedKPI
              value={7}
              label="Années d'Expérience SI"
              sublabel="En DSI & Grands Comptes"
              suffix="+"
            />
            <TextKPI
              value="V5 Certifiée"
              label="Expertise MEGA HOPEX"
              sublabel="Cartographie & Référentiels"
            />
            <TextKPI
              value="Cédé à 100%"
              label="Propriété de Vos Livrables"
              sublabel="Code source & comptes remis"
            />
            <TextKPI
              value="Bac+5"
              label="Diplôme Expert SI"
              sublabel="Master 2 MIAGE & Ingénierie"
            />
          </div>

          {/* 6. ENGAGEMENTS DE RÉASSURANCE CLIENT */}
          <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-10 text-xs sm:text-sm text-muted-foreground pt-2 font-medium">
            <span className="flex items-center gap-2">
              <HeartHandshake className="w-4 h-4 text-primary" /> Échange
              initial 30 min offert & sans engagement
            </span>
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-primary" /> Explications
              en langage clair & sans jargon
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Réponse assurée sous
              24h ouvrées
            </span>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
