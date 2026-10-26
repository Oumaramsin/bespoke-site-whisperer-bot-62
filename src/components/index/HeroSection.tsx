import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  CheckCircle2,
  Building2,
  Smartphone,
  Mail,
  MapPin,
  Calendar,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useCountUp } from "@/hooks/useCountUp";
import { trackConversionEvent } from "@/lib/analytics";
import { openBooking } from "@/lib/calendly";
import MethodMotionSection from "@/components/index/MethodMotionSection";

/** Logos du premier écran (ordinateur) : mêmes fichiers que la section « Ils nous font confiance » */
const TRUST_LOGOS = [
  { name: "Covéa", src: "/logos/covea.png" },
  { name: "La Banque Postale", src: "/logos/banque-postale.webp" },
  { name: "Société Générale", src: "/logos/societe-generale.png" },
];

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
  // Tous les boutons « Réserver » ouvrent l'agenda par-dessus la page (BookingDialog), sans défilement
  const book = (source: string) => openBooking(source);

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

            {/* Localisation masquée sur mobile pour que le bouton principal reste dans le premier écran */}
            <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary/80 text-muted-foreground text-xs font-medium border border-border/60">
              <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
              <span>Basés à Fresnes (94) · Interventions Paris & Remote</span>
            </div>
          </div>

          {/* 2. ACCROCHE STRATÉGIQUE & PROMESSE CENTRALE */}
          <div className="space-y-4 max-w-4xl mx-auto">
            {/* Accroche alignée sur la vidéo de présentation (cible : porteurs de projet web, mobile, e-commerce) ;
                l'architecture SI reste présente dans l'intro et dans la carte dédiée juste en dessous */}
            <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-primary block">
              Applications web, mobiles & e-commerce sur-mesure
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.22]">
              De l’idée à l’application en ligne.
              <span className="block mt-2 sm:mt-2.5 pb-2 gradient-text">
                Conçue avec vous, livrée à votre nom.
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground font-normal max-w-3xl mx-auto leading-relaxed pt-2">
              Une idée d’application, de boutique en ligne ou de plateforme ? RAMSIN la transforme en{" "}
              <strong>un vrai produit, prêt pour vos clients</strong>, et vous en cède{" "}
              <strong>l’intégralité : code, comptes, données</strong>. Pour les DSI : architecture SI et MEGA HOPEX V5.
            </p>

            {/* 2.1 ACTION PRINCIPALE : visible dès le premier écran, y compris sur mobile */}
            <div className="pt-3 sm:pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button
                onClick={() => book("hero_top")}
                size="lg"
                variant="lime"
                className="w-full sm:w-auto rounded-xl px-7 py-6 font-extrabold text-sm sm:text-base gap-2 shadow-[0_8px_30px_-8px_rgba(18,58,53,0.45)] hover:shadow-[0_12px_35px_-8px_rgba(18,58,53,0.55)] transition-all cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-[#071816]" />
                Réserver 30 min offertes
                <ArrowRight className="w-4 h-4 text-[#071816]" />
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full sm:w-auto rounded-xl px-6 py-6 font-bold text-sm sm:text-base gap-2 border-2 border-[#123A35]/25 hover:border-[#123A35] hover:bg-[#123A35]/5 transition-all"
              >
                <Link
                  to="/contact?tunnel=form#formulaire-contact"
                  state={{ scrollToForm: true }}
                  onClick={() => trackConversionEvent("click_switch_to_written_form", { source: "hero_top" })}
                >
                  <Mail className="w-4 h-4 text-[#123A35]" />
                  Décrire mon projet par écrit
                </Link>
              </Button>
            </div>
            <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[11px] sm:text-xs text-muted-foreground font-medium">
              <li className="inline-flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Sans engagement</li>
              <li className="inline-flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Réponse sous 24 h ouvrées</li>
              <li className="inline-flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Code cédé à 100 %</li>
            </ul>

            {/* Preuve immédiate (ordinateur) : les grands comptes servis, en gris discret, sans attendre la section dédiée */}
            <div className="hidden md:flex items-center justify-center gap-6 pt-5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Ils nous ont fait confiance</span>
              <ul className="flex items-center gap-5">
                {TRUST_LOGOS.map((logo) => (
                  <li key={logo.name} className="w-28 h-8 flex items-center justify-center">
                    <img
                      src={logo.src}
                      alt={logo.name}
                      loading="lazy"
                      decoding="async"
                      className="max-h-8 max-w-full object-contain opacity-60 grayscale transition hover:opacity-100 hover:grayscale-0"
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 2.5 LECTEUR CINÉMA MOTION DESIGN : Démonstration vivante & problème client */}
          <div className="pt-1 pb-2">
            <MethodMotionSection embedded />
          </div>

          {/* Blocs sous la vidéo : mise en page calculée à l'approche (premier affichage plus rapide) */}
          <div className="cv-auto space-y-10">
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
                      Pour DSI & directions de transformation
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
                    size="lg"
                    onClick={() => {
                      trackConversionEvent("select_pole", { pole: "si", source: "hero_card" });
                      book("hero_card_si");
                    }}
                    className="w-full bg-[#123A35] hover:bg-[#0a221f] text-white font-bold rounded-xl gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
                  >
                    Réserver 30 min offertes <ArrowRight className="w-4 h-4" />
                  </Button>
                  <Link
                    to="/services?pole=si"
                    className="text-xs font-semibold text-muted-foreground hover:text-[#123A35] transition-colors pt-1"
                  >
                    Découvrir les livrables & la méthode SI →
                  </Link>
                </div>
              </div>

              {/* PARCOURS B : DÉVELOPPEMENT WEB & APPLICATIONS SUR-MESURE (affiché en premier sur mobile) */}
              <div className="order-first md:order-none p-6 sm:p-8 rounded-3xl bg-white border-2 border-emerald-500/25 hover:border-emerald-600 transition-all hover-lift flex flex-col justify-between relative group hover:shadow-[0_20px_50px_-12px_rgba(16,185,129,0.2)] overflow-hidden">
                {/* Ligne d'accent lumineuse supérieure */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-600 via-[#C7F36B] to-teal-500" />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#C7F36B] to-[#9ee83a] text-[#071816] flex items-center justify-center shrink-0 shadow-md shadow-[#C7F36B]/30">
                      <Smartphone className="w-5 h-5 shrink-0" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-800 border border-emerald-500/25">
                      Pour porteurs de projet & entreprises
                    </span>
                  </div>

                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                      Web & applications sur-mesure
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
                    size="lg"
                    variant="lime"
                    onClick={() => {
                      trackConversionEvent("select_pole", { pole: "web", source: "hero_card" });
                      book("hero_card_web");
                    }}
                    className="w-full rounded-xl gap-2 font-extrabold text-sm sm:text-base shadow-md hover:shadow-lg transition-all cursor-pointer"
                  >
                    Réserver 30 min offertes <ArrowRight className="w-4 h-4" />
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

            {/* 5. CHIFFRES CLÉS & PREUVES CONCRÈTES VÉRIFIABLES */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pt-6 border-t border-border/60">
              <AnimatedKPI
                value={7}
                label="Années d'expérience SI"
                sublabel="En DSI & grands comptes"
                suffix="+"
              />
              <TextKPI
                value="V5 certifiée"
                label="Expertise MEGA HOPEX"
                sublabel="Cartographie & référentiels"
              />
              <TextKPI
                value="Cédé à 100 %"
                label="Propriété de vos livrables"
                sublabel="Code source & comptes remis"
              />
              <TextKPI
                value="Bac+5"
                label="Diplôme d'expert SI"
                sublabel="Master 2 MIAGE & ingénierie"
              />
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
