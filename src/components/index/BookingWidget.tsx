import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Calendar as CalendarIcon, Clock, ShieldCheck, Zap } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { trackConversionEvent } from "@/lib/analytics";

export const BookingWidget = () => {
  const { ref: widgetRef, isVisible: widgetVisible } = useScrollAnimation();

  useEffect(() => {
    // Écoute des événements Calendly (prise de rendez-vous confirmée)
    const handleCalendlyMessage = (e: MessageEvent) => {
      if (e.data && e.data.event) {
        if (e.data.event === "calendly.event_scheduled") {
          trackConversionEvent("schedule_meeting_calendly", {
            serviceType: "calendly_30min",
          });
        }
      }
    };
    window.addEventListener("message", handleCalendlyMessage);

    // Chargement du script officiel Calendly
    const head = document.querySelector("head");
    const script = document.createElement("script");
    script.setAttribute("src", "https://assets.calendly.com/assets/external/widget.js");
    script.setAttribute("async", "true");
    head?.appendChild(script);

    return () => {
      // Nettoyage au démontage
      window.removeEventListener("message", handleCalendlyMessage);
      head?.removeChild(script);
    };
  }, []);

  return (
    <section id="reservation-calendrier" className="pt-0 pb-2 bg-gradient-to-b from-background via-primary/5 to-background border-t border-border/60">
      <div className="container mx-auto px-4">
        <div ref={widgetRef} className={`max-w-4xl mx-auto text-center mb-2 space-y-1 scroll-fade-up ${widgetVisible ? "is-visible" : ""}`}>
          <Badge variant="outline" className="px-2.5 py-0 text-[11px] border-primary/30 text-primary font-semibold">
            <CalendarIcon className="w-3 h-3 mr-1 inline" /> Calendrier Synchro &amp; Instantané
          </Badge>
          <h2 className="text-xl md:text-3xl font-extrabold tracking-tight">
            Réservez Votre Échange Offert de 30 Min
          </h2>
          <p className="text-muted-foreground text-xs sm:text-sm max-w-2xl mx-auto">
            Choisissez la date et l'horaire de votre choix. C'est 100% gratuit, sans engagement et en langage clair.
          </p>
        </div>

        <Card className="max-w-4xl mx-auto border-2 border-primary/30 shadow-xl bg-card glass-card overflow-hidden">
          <CardHeader className="text-center border-b border-border/60 pb-2 pt-2.5 bg-muted/20">
            <CardTitle className="text-base sm:text-lg font-bold flex items-center justify-center gap-2">
              <Clock className="w-4 h-4 text-primary" /> Session de Cadrage Offerte (30 min)
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground mt-0.5 max-w-xl mx-auto">
              Échangez directement avec RAMSIN Conseil sur vos besoins web, applicatifs ou d'architecture SI.
            </CardDescription>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-1 text-[11px] font-semibold text-muted-foreground">
              <span className="flex items-center gap-1 text-emerald-700">
                <ShieldCheck className="w-3 h-3" /> 100% Sans Engagement
              </span>
              <span className="flex items-center gap-1 text-primary">
                <Zap className="w-3 h-3" /> Invitation Google Meet / Teams Automatique
              </span>
            </div>
          </CardHeader>

          <CardContent className="p-0 sm:p-2">
            {/* Widget Officiel Calendly Encastré avec Script Dynamique */}
            <div className="w-full overflow-hidden rounded-b-xl">
              <div
                className="calendly-inline-widget w-full rounded-b-xl"
                data-url="https://calendly.com/contact-ramsin/30min?hide_landing_page_details=1&hide_gdpr_banner=1&primary_color=123a35&locale=fr"
                style={{ minWidth: "320px", height: "700px" }}
              />
            </div>

            {/* Lien direct de secours si bloqueur de cookies / script tiers */}
            <div className="py-2.5 px-4 bg-muted/30 border-t border-border/60 text-center text-xs text-muted-foreground flex flex-wrap items-center justify-center gap-2">
              <span>Un souci de chargement du calendrier ?</span>
              <a
                href="https://calendly.com/contact-ramsin/30min"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackConversionEvent("click_booking_calendly", { destination: "external" })}
                className="font-bold text-primary hover:underline inline-flex items-center gap-1"
              >
                Ouvrir directement sur Calendly →
              </a>
              <span className="hidden sm:inline">•</span>
              <span>
                ou contactez-nous au{" "}
                <a
                  href="tel:+33761518890"
                  onClick={() => trackConversionEvent("click_phone")}
                  className="font-bold text-foreground hover:underline"
                >
                  +33 (0)7 61 51 88 90
                </a>
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Entrée de contact alternative : formulaire express 2 min */}
        <div className="max-w-xl mx-auto mt-6 text-center p-4 rounded-2xl bg-secondary/40 border border-border/80 text-xs sm:text-sm">
          <p className="text-muted-foreground font-medium">
            Vous préférez formaliser votre demande par écrit avant d'échanger ?
          </p>
          <Link
            to="/contact?tunnel=form#formulaire-contact"
            state={{ scrollToForm: true }}
            onClick={() => trackConversionEvent("click_switch_to_written_form", { source: "booking_widget" })}
            className="mt-1.5 inline-flex items-center gap-1.5 font-bold text-primary hover:underline text-sm"
          >
            Décrire votre besoin en 2 minutes via notre formulaire express →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BookingWidget;
