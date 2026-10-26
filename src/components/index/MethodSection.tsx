import { Link } from "react-router-dom";
import { ArrowRight, Calendar, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import MethodSteps from "@/components/projects/MethodSteps";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { openBooking } from "@/lib/calendly";
import { trackConversionEvent } from "@/lib/analytics";

/**
 * Bande sombre de l'accueil : la méthode en 4 étapes (la même que dans la vidéo).
 * Remplace l'ancienne section « Deux expertises », qui répétait les deux cartes de pôle déjà présentes dans le hero.
 */
export const MethodSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="relative overflow-hidden py-16 md:py-24 bg-gradient-to-br from-[#071816] via-[#0e2f2a] to-[#071816] text-white">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle,rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#C7F36B]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div
        ref={ref}
        className={`container mx-auto px-4 max-w-6xl relative z-10 space-y-10 scroll-fade-up ${isVisible ? "is-visible" : ""}`}
      >
        <div className="max-w-2xl space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#C7F36B]">Comment ça se passe</span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">Votre projet en 4 étapes</h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Un seul interlocuteur du premier échange à la mise en ligne, et vous voyez votre produit avancer chaque semaine.
          </p>
        </div>

        <MethodSteps dark />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 pt-6 border-t border-white/10">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-300">
            <span className="inline-flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#C7F36B]" /> Garantie 30 jours après le lancement
            </span>
            <span className="inline-flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#C7F36B]" /> Aucun abonnement captif
            </span>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Button variant="lime" size="lg" className="rounded-xl gap-2 font-extrabold cursor-pointer" onClick={() => openBooking("home_method")}>
              <Calendar className="w-4 h-4" /> Réserver 30 min offertes
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-xl gap-2 bg-transparent text-white border-white/30 hover:bg-white/10 hover:text-white"
            >
              <Link
                to="/contact?tunnel=form"
                onClick={() => trackConversionEvent("click_switch_to_written_form", { source: "home_method" })}
              >
                Décrire mon projet par écrit <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MethodSection;
