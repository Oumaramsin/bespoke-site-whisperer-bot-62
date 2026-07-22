import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  HeartHandshake,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useCountUp } from "@/hooks/useCountUp";

const AnimatedKPI = ({
  value,
  label,
  suffix = "",
}: {
  value: number;
  label: string;
  suffix?: string;
}) => {
  const { ref, displayValue } = useCountUp({
    end: value,
    duration: 2200,
    suffix,
  });
  return (
    <div className="p-5 rounded-2xl glass-card text-center space-y-1 hover-lift">
      <span
        ref={ref}
        className="text-2xl sm:text-3xl font-black text-blue-600 dark:text-blue-400 block tracking-tight"
      >
        {displayValue}
      </span>
      <span className="text-xs sm:text-sm text-muted-foreground font-semibold block">
        {label}
      </span>
    </div>
  );
};

const TextKPI = ({ value, label }: { value: string; label: string }) => (
  <div className="p-5 rounded-2xl glass-card text-center space-y-1 hover-lift">
    <span className="text-2xl sm:text-3xl font-black text-blue-600 dark:text-blue-400 block tracking-tight">
      {value}
    </span>
    <span className="text-xs sm:text-sm text-muted-foreground font-semibold block">
      {label}
    </span>
  </div>
);

const HeroSection = () => {
  const scrollToReservation = () => {
    const el = document.getElementById("reservation-calendrier");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24">
      {/* Dot grid pattern */}
      <div className="absolute inset-0 dot-grid-pattern -z-10 pointer-events-none" />

      {/* Halo lumineux d'arrière-plan ultra-rapide sans surcharge GPU */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[450px] bg-gradient-to-b from-blue-500/10 via-indigo-500/5 to-transparent -z-10 pointer-events-none" />

      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Badge statut de confiance */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-card border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-xs sm:text-sm font-semibold shadow-xs scroll-fade-up is-visible">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            Disponible pour vos projets web & missions d'Architecture SI
          </div>

          {/* Titre Principal */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.1]">
              Multipliez Votre Visibilité &
              <span className="block mt-2 gradient-text">
                Développez Votre Chiffre d'Affaires
              </span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground font-normal max-w-3xl mx-auto leading-relaxed pt-2">
              Sites web haute conversion, applications sur-mesure et conseil en
              architecture SI : nous concevons des solutions digitales clés en
              main pensées pour <strong>attirer plus de clients</strong> et{" "}
              <strong>accélérer la croissance de votre entreprise</strong>.
            </p>
          </div>

          {/* Boutons d'Action Principaux */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Button
              size="lg"
              onClick={scrollToReservation}
              className="gap-2.5 px-8 py-6 text-base font-semibold glow-shadow hover:scale-[1.02] transition-all rounded-xl cursor-pointer animate-pulse-glow"
            >
              Réserver un échange de 30 min (Gratuit){" "}
              <ArrowRight className="h-5 w-5" />
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="px-8 py-6 text-base font-semibold border-border/80 hover:bg-secondary rounded-xl hover-lift"
            >
              <Link to="/projects">Découvrir les réalisations ↓</Link>
            </Button>
          </div>

          {/* Cartes des KPIs / Chiffres clés animés */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-10 border-t border-border/60">
            <AnimatedKPI value={7} label="Années d'Expérience SI" suffix="+" />
            <TextKPI value="V5 Certifiée" label="Expertise MEGA HOPEX" />
            <AnimatedKPI
              value={100}
              label="Missions & Projets Réussis"
              suffix="%"
            />
            <TextKPI value="Full-Stack" label="Applications Web" />
          </div>

          {/* Éléments de Réassurance Client */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-xs sm:text-sm text-muted-foreground pt-4 font-medium">
            <span className="flex items-center gap-2">
              <HeartHandshake className="w-4 h-4 text-blue-600" /> Échange
              offert de 30 min
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
