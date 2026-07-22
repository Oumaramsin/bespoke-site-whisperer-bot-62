import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, Clock, MessageSquare, CheckCircle2 } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface CTASectionProps {
  title?: string;
  subtitle?: string;
}

export const CTASection = ({
  title = "Prêt à donner vie à votre projet ?",
  subtitle = "Réservez votre premier échange gratuit de 30 minutes sans aucun engagement pour discuter de vos besoins en langage clair.",
}: CTASectionProps) => {
  const { ref, isVisible } = useScrollAnimation();
  const navigate = useNavigate();
  const location = useLocation();

  const handleBookingClick = () => {
    if (location.pathname === "/") {
      const el = document.getElementById("reservation-calendrier");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    navigate("/contact", { state: { scrollToBooking: true } });
  };

  return (
    <section className="py-20 md:py-28 bg-gradient-to-r from-primary/10 via-primary/5 to-emerald-500/10 dark:from-slate-950 dark:via-blue-950/80 dark:to-slate-950 border-y border-primary/20 dark:border-border/40 relative overflow-hidden">
      {/* Halos lumineux d'arrière-plan */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/15 dark:bg-blue-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-500/15 dark:bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div ref={ref} className={`container mx-auto px-4 relative z-10 text-center max-w-4xl mx-auto space-y-8 scroll-fade-up ${isVisible ? "is-visible" : ""}`}>
        {/* Badge réassurance sous 24h */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 dark:bg-white/10 border border-emerald-500/30 dark:border-white/20 text-xs sm:text-sm font-bold text-emerald-700 dark:text-emerald-300 shadow-sm backdrop-blur-md">
          <Clock className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>Réponse sous 24h ouvrées garantie</span>
        </div>

        {/* Titre Principal Aéré */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground dark:text-white leading-[1.15]">
          {title}
        </h2>

        {/* Subtitle Aéré */}
        <p className="text-muted-foreground dark:text-blue-100/90 text-base sm:text-xl max-w-2xl mx-auto leading-relaxed font-medium">
          {subtitle}
        </p>

        {/* Bouton d'action principal */}
        <div className="pt-2">
          <Button
            size="lg"
            onClick={handleBookingClick}
            className="gap-3 px-8 py-6 text-base font-extrabold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xl hover:scale-[1.03] transition-all rounded-2xl cursor-pointer glow-shadow-emerald animate-pulse-glow"
          >
            Réserver mon échange gratuit <ArrowRight className="w-5 h-5" />
          </Button>
        </div>

        {/* Capsules translucides de réassurance */}
        <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 pt-4 text-xs sm:text-sm font-semibold">
          <span className="flex items-center gap-2 bg-card/80 dark:bg-white/10 border border-border/80 dark:border-white/15 px-4 py-2 rounded-full backdrop-blur-md text-foreground dark:text-slate-100 shadow-sm">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" /> Sans engagement
          </span>
          <span className="flex items-center gap-2 bg-card/80 dark:bg-white/10 border border-border/80 dark:border-white/15 px-4 py-2 rounded-full backdrop-blur-md text-foreground dark:text-slate-100 shadow-sm">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" /> 100% en langage clair
          </span>
          <span className="flex items-center gap-2 bg-card/80 dark:bg-white/10 border border-border/80 dark:border-white/15 px-4 py-2 rounded-full backdrop-blur-md text-foreground dark:text-slate-100 shadow-sm">
            <MessageSquare className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" /> Conseils personnalisés
          </span>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
