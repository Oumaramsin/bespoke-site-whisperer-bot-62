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
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useCountUp } from "@/hooks/useCountUp";

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
    <div className="p-4 sm:p-5 rounded-2xl glass-card text-center space-y-1 hover-lift">
      <span
        ref={ref}
        aria-label={`${value}${suffix} ${label}`}
        className="text-2xl sm:text-3xl font-black text-blue-600 dark:text-blue-400 block tracking-tight"
      >
        {displayValue}
      </span>
      <span className="text-xs sm:text-sm text-foreground font-bold block">
        {label}
      </span>
      {sublabel && (
        <span className="text-[11px] text-muted-foreground block">
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
  <div className="p-4 sm:p-5 rounded-2xl glass-card text-center space-y-1 hover-lift">
    <span className="text-2xl sm:text-3xl font-black text-blue-600 dark:text-blue-400 block tracking-tight">
      {value}
    </span>
    <span className="text-xs sm:text-sm text-foreground font-bold block">
      {label}
    </span>
    {sublabel && (
      <span className="text-[11px] text-muted-foreground block">
        {sublabel}
      </span>
    )}
  </div>
);

const HeroSection = () => {
  const navigate = useNavigate();

  const scrollToReservation = () => {
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
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[520px] bg-gradient-to-b from-blue-500/10 via-indigo-500/5 to-transparent -z-10 pointer-events-none" />

      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto space-y-10 text-center">
          
          {/* 1. BADGES D'ACCÈS & STATUT */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-xs font-semibold shadow-xs">
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
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.15]">
              Des décisions SI plus claires.
              <span className="block mt-2 gradient-text">
                Des solutions numériques adaptées à vos enjeux.
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground font-normal max-w-3xl mx-auto leading-relaxed pt-2">
              RAMSIN accompagne les organisations et dirigeants sur deux expertises complémentaires :{" "}
              <strong>structurer durablement leur système d’information</strong> et{" "}
              <strong>concevoir des applications numériques sur-mesure</strong> créatrices de valeur.
            </p>
          </div>

          {/* 3. DÉCISION IMMÉDIATE : LES DEUX PARCOURS COMMERCIAUX */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left pt-2">
            
            {/* PARCOURS A : ARCHITECTURE SI & MEGA HOPEX */}
            <div className="p-6 sm:p-8 rounded-2xl glass-card border border-blue-500/30 hover:border-blue-500/60 transition-all hover-lift flex flex-col justify-between relative group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-700 dark:text-blue-300">
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
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                    <span>Livrables tangibles : cartographies, matrices d'impact, roadmap</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                    <span>Certification MEGA HOPEX & retours d'expérience grands comptes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                    <span>Aide à la décision stratégique & autonomisation de vos équipes</span>
                  </li>
                </ul>
              </div>

              <div className="pt-6 mt-4 border-t border-border/50 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <Button
                  asChild
                  size="lg"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl gap-2 shadow-md hover:shadow-lg transition-all"
                >
                  <Link to="/contact?service=si">
                    Échanger sur une mission SI <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* PARCOURS B : DÉVELOPPEMENT WEB & APPLICATIONS SUR-MESURE */}
            <div className="p-6 sm:p-8 rounded-2xl glass-card border border-emerald-500/30 hover:border-emerald-500/60 transition-all hover-lift flex flex-col justify-between relative group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                    <Smartphone className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">
                    Pour PME, Dirigeants & Startups
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
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>100% Code Propriétaire</strong> remis sans dépendance ni abonnement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span>Méthode agile transparente : cadrage, démo continue, mise en prod</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span>Technologies modernes pérennes : Next.js, React Native, TypeScript</span>
                  </li>
                </ul>
              </div>

              <div className="pt-6 mt-4 border-t border-border/50 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <Button
                  asChild
                  size="lg"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl gap-2 shadow-md hover:shadow-lg transition-all"
                >
                  <Link to="/contact?service=web">
                    Présenter mon projet web / mobile <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>

          </div>

          {/* 4. BANDEAU DE CONTACT DIRECT MULTICANIMAL */}
          <div className="p-4 sm:p-5 rounded-2xl bg-secondary/50 border border-border/80 flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2 text-foreground font-semibold">
              <Calendar className="w-4 h-4 text-primary" />
              <span>Besoin d'un premier avis d'expert ?</span>
            </div>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-muted-foreground">
              <button
                onClick={scrollToReservation}
                className="text-primary font-bold hover:underline inline-flex items-center gap-1 cursor-pointer"
              >
                Réserver un créneau de 30 min (Gratuit) →
              </button>

              <span className="hidden sm:inline text-border">|</span>

              <a
                href="tel:+33761518890"
                className="hover:text-foreground font-medium inline-flex items-center gap-1.5 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-primary" /> +33 (0)7 61 51 88 90
              </a>

              <span className="hidden sm:inline text-border">|</span>

              <a
                href="mailto:contact@ramsin.fr"
                className="hover:text-foreground font-medium inline-flex items-center gap-1.5 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-primary" /> contact@ramsin.fr
              </a>
            </div>
          </div>

          {/* 5. CHIFFRES CLÉS & PREUVES CONCRÈTES VÉRIFIABLES */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pt-6 border-t border-border/60">
            <AnimatedKPI
              value={7}
              label="Années d'Expérience SI"
              sublabel="Covéa, La Banque Postale"
              suffix="+"
            />
            <TextKPI
              value="V5 Certifiée"
              label="Expertise MEGA HOPEX"
              sublabel="Architecture & Référentiels"
            />
            <AnimatedKPI
              value={100}
              label="Code 100% Propriétaire"
              sublabel="Liberté & Sérénité totale"
              suffix="%"
            />
            <TextKPI
              value="Full-Stack"
              label="Web & Mobile Réactifs"
              sublabel="Next.js, React Native, Node"
            />
          </div>

          {/* 6. ENGAGEMENTS DE RÉASSURANCE CLIENT */}
          <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-10 text-xs sm:text-sm text-muted-foreground pt-2 font-medium">
            <span className="flex items-center gap-2">
              <HeartHandshake className="w-4 h-4 text-blue-600" /> Échange
              initial 30 min offert
            </span>
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-600" /> Explications
              100% en langage clair
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Réponse sous
              24h ouvrées
            </span>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
