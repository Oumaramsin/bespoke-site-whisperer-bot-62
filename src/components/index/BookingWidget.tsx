import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Calendar as CalendarIcon, Clock, ShieldCheck, Zap } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { trackConversionEvent } from "@/lib/analytics";
import { CALENDLY_PAGE_URL, mountCalendly } from "@/lib/calendly";

/**
 * Agenda Calendly chargé à la demande : il pèse ~3 Mo (scripts, Stripe, cookies tiers).
 * Il se charge quand le visiteur, après avoir interagi avec la page, arrive près de l'agenda
 * (ou clique sur « Afficher les créneaux »), jamais au simple chargement de la page.
 */
export const BookingWidget = ({ autoLoad = false }: { autoLoad?: boolean }) => {
  const { ref: widgetRef, isVisible: widgetVisible } = useScrollAnimation();
  const sectionRef = useRef<HTMLElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(autoLoad);

  useEffect(() => {
    if (autoLoad) setOpen(true);
  }, [autoLoad]);

  // Ouverture automatique : interaction réelle + agenda proche de l'écran
  useEffect(() => {
    if (open) return;
    let interacted = false;
    let near = false;
    const tryOpen = () => {
      if (interacted && near) setOpen(true);
    };
    const onInteract = () => {
      interacted = true;
      tryOpen();
    };
    const events = ["pointerdown", "keydown", "wheel", "touchstart"] as const;
    events.forEach((e) => window.addEventListener(e, onInteract, { passive: true, once: true }));
    const observer = new IntersectionObserver(
      ([entry]) => {
        near = entry.isIntersecting;
        tryOpen();
      },
      { rootMargin: "400px 0px" }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      events.forEach((e) => window.removeEventListener(e, onInteract));
      observer.disconnect();
    };
  }, [open]);

  // Chargement du script officiel puis initialisation de l'agenda (provenance utm_* incluse, voir lib/calendly).
  // Les rendez-vous confirmés sont suivis une seule fois pour tout le site, dans BookingDialog.
  useEffect(() => {
    if (!open || !calendarRef.current) return;
    mountCalendly(calendarRef.current).catch(() => undefined);
  }, [open]);

  return (
    <section ref={sectionRef} id="reservation-calendrier" className="pt-0 pb-2 bg-gradient-to-b from-background via-primary/5 to-background border-t border-border/60">
      <div className="container mx-auto px-4">
        <div ref={widgetRef} className={`max-w-4xl mx-auto text-center mb-2 space-y-1 scroll-fade-up ${widgetVisible ? "is-visible" : ""}`}>
          <Badge variant="outline" className="px-2.5 py-0 text-[11px] border-primary/30 text-primary font-semibold">
            <CalendarIcon className="w-3 h-3 mr-1 inline" /> Prise de rendez-vous en ligne
          </Badge>
          <h2 className="text-xl md:text-3xl font-extrabold tracking-tight">
            Réservez vos 30 minutes offertes
          </h2>
          <p className="text-muted-foreground text-xs sm:text-sm max-w-2xl mx-auto">
            Choisissez le créneau qui vous convient. Échange direct avec votre interlocuteur technique, sans engagement commercial et sans jargon.
          </p>
        </div>

        <Card className="max-w-4xl mx-auto border-2 border-primary/30 shadow-xl bg-card glass-card overflow-hidden">
          <CardHeader className="text-center border-b border-border/60 pb-2 pt-2.5 bg-muted/20">
            <CardTitle className="text-base sm:text-lg font-bold flex items-center justify-center gap-2">
              <Clock className="w-4 h-4 text-primary" /> Choisissez votre créneau
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground mt-0.5 max-w-xl mx-auto">
              Échangez directement avec RAMSIN Conseil sur vos besoins web, applicatifs ou d'architecture SI.
            </CardDescription>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-1 text-[11px] font-semibold text-muted-foreground">
              <span className="flex items-center gap-1 text-emerald-700">
                <ShieldCheck className="w-3 h-3" /> Échange Sans Engagement
              </span>
              <span className="flex items-center gap-1 text-primary">
                <Zap className="w-3 h-3" /> Invitation Google Meet / Teams Automatique
              </span>
            </div>
          </CardHeader>

          <CardContent className="p-0 sm:p-2">
            {/* Widget Officiel Calendly Encastré avec Script Dynamique */}
            <div className="w-full overflow-hidden rounded-b-xl">
              {open ? (
                <div ref={calendarRef} className="w-full rounded-b-xl" style={{ minWidth: "320px", height: "700px" }} />
              ) : (
                <div className="flex flex-col items-center justify-center gap-4 text-center px-6 py-14" style={{ minHeight: "320px" }}>
                  <span className="w-14 h-14 rounded-2xl bg-[#C7F36B] text-[#123A35] flex items-center justify-center">
                    <CalendarIcon className="w-7 h-7" />
                  </span>
                  <p className="text-sm sm:text-base font-semibold text-foreground max-w-sm">
                    Choisissez directement votre créneau de 30 minutes dans l'agenda d'Oumar.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setOpen(true);
                      trackConversionEvent("click_booking_calendly", { source: "booking_widget_open" });
                    }}
                    className="inline-flex items-center gap-2 rounded-xl bg-[#123A35] hover:bg-[#0c2621] text-white font-bold px-6 py-3 cursor-pointer transition-colors"
                  >
                    <CalendarIcon className="w-4 h-4" /> Afficher les créneaux disponibles
                  </button>
                </div>
              )}
            </div>

            {/* Lien direct de secours si bloqueur de cookies / script tiers */}
            <div className="py-2.5 px-4 bg-muted/30 border-t border-border/60 text-center text-xs text-muted-foreground flex flex-wrap items-center justify-center gap-2">
              <span>Un souci de chargement du calendrier ?</span>
              <a
                href={CALENDLY_PAGE_URL}
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
