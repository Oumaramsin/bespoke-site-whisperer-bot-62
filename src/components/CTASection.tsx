import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, Clock, MessageSquare, CheckCircle2, FileText } from "lucide-react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { trackConversionEvent } from "@/lib/analytics";

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
    trackConversionEvent("click_booking_calendly", { source: "cta_section" });
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
    <section className="py-20 md:py-28 bg-gradient-to-r from-[#123A35]/10 via-background to-[#C7F36B]/15 border-y border-border/60 relative overflow-hidden">
      {/* Halos lumineux d'arrière-plan */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#123A35]/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#C7F36B]/20 rounded-full blur-3xl pointer-events-none -z-10" />

      <div ref={ref} className={`container mx-auto px-4 relative z-10 text-center max-w-4xl mx-auto space-y-8 scroll-fade-up ${isVisible ? "is-visible" : ""}`}>
        {/* Badge réassurance sous 24h */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/80 border border-border/80 text-xs sm:text-sm font-bold text-foreground shadow-xs backdrop-blur-md">
          <Clock className="w-4 h-4 text-emerald-700 shrink-0" />
          <span>Réponse assurée sous 24h ouvrées</span>
        </div>

        {/* Titre Principal Aéré */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15]">
          {title}
        </h2>

        {/* Subtitle Aéré */}
        <p className="text-muted-foreground text-base sm:text-xl max-w-2xl mx-auto leading-relaxed font-medium">
          {subtitle}
        </p>

        {/* Boutons d'action : Double Tunnel de Conversion */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
          <Button
            size="lg"
            variant="lime"
            onClick={handleBookingClick}
            className="gap-3 px-7 py-6 text-base font-extrabold shadow-xl hover:scale-[1.03] transition-all rounded-2xl cursor-pointer"
          >
            Réserver un échange de cadrage (30 min) <ArrowRight className="w-5 h-5" />
          </Button>

          <Button
            asChild
            size="lg"
            variant="outline"
            className="gap-2.5 px-6 py-6 text-base font-bold rounded-2xl glass-card hover:bg-secondary/80 border-border/80 shadow-md transition-all cursor-pointer"
          >
            <Link
              to="/contact?tunnel=form#formulaire-contact"
              state={{ scrollToForm: true }}
              onClick={() =>
                trackConversionEvent("click_switch_to_written_form", {
                  source: "cta_section",
                })
              }
            >
              <FileText className="w-4 h-4 text-primary" />
              Transmettre mon besoin par écrit
            </Link>
          </Button>
        </div>

        {/* Capsules translucides de réassurance */}
        <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 pt-4 text-xs sm:text-sm font-semibold">
          <span className="flex items-center gap-2 bg-card/90 border border-border/80 px-4 py-2 rounded-full backdrop-blur-md text-foreground shadow-sm">
            <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" /> Sans engagement
          </span>
          <span className="flex items-center gap-2 bg-card/90 border border-border/80 px-4 py-2 rounded-full backdrop-blur-md text-foreground shadow-sm">
            <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" /> Échange sans jargon
          </span>
          <span className="flex items-center gap-2 bg-card/90 border border-border/80 px-4 py-2 rounded-full backdrop-blur-md text-foreground shadow-sm">
            <MessageSquare className="w-4 h-4 text-emerald-700 shrink-0" /> Conseils pragmatiques
          </span>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
