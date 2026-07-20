import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, Clock, MessageSquare, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
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

  return (
    <section className="py-16 md:py-20 bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 dark:from-slate-950 dark:via-blue-950/60 dark:to-slate-950 text-white border-y border-blue-900/30 dark:border-border/40 relative overflow-hidden">
      {/* Halo lumineux d'arrière-plan */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/15 dark:bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 dark:bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div ref={ref} className={`container mx-auto px-4 relative z-10 text-center max-w-4xl mx-auto space-y-6 scroll-fade-up ${isVisible ? "is-visible" : ""}`}>
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-semibold backdrop-blur-xs text-blue-200">
          <Clock className="w-3.5 h-3.5 text-emerald-400" /> Réponse sous 24h ouvrées garantie
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
          {title}
        </h2>

        <p className="text-blue-100/90 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>

        <div className="flex flex-wrap justify-center items-center gap-4 pt-4">
          <Button asChild size="lg" className="gap-2.5 px-8 py-6 text-base font-semibold bg-emerald-500 hover:bg-emerald-600 text-white shadow-xl hover:scale-[1.02] transition-all rounded-xl">
            <Link to="/contact">
              Réserver mon échange gratuit <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-6 text-xs sm:text-sm text-blue-200/80 pt-4 font-medium">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Sans engagement
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" /> 100% en langage clair
          </span>
          <span className="flex items-center gap-1.5">
            <MessageSquare className="w-4 h-4 text-emerald-400" /> Conseils personnalisés
          </span>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
