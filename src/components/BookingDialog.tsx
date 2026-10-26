import { useCallback, useEffect, useState } from "react";
import { ExternalLink, Phone } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CALENDLY_PAGE_URL, OPEN_BOOKING_EVENT, mountCalendly } from "@/lib/calendly";
import { trackConversionEvent } from "@/lib/analytics";

/**
 * Fenêtre de réservation : l'agenda Calendly s'ouvre par-dessus la page courante depuis n'importe quel bouton
 * « Réserver 30 min offertes » (openBooking), sans défilement ni changement de page. Montée une seule fois dans App.
 */
export const BookingDialog = () => {
  const [open, setOpen] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    // Rendez-vous confirmé, dans cette fenêtre ou dans l'agenda intégré à la page : une seule écoute pour tout le site
    const onMessage = (event: MessageEvent) => {
      if (event.data?.event === "calendly.event_scheduled") {
        trackConversionEvent("schedule_meeting_calendly", { serviceType: "calendly_30min" });
      }
    };
    window.addEventListener(OPEN_BOOKING_EVENT, onOpen);
    window.addEventListener("message", onMessage);
    return () => {
      window.removeEventListener(OPEN_BOOKING_EVENT, onOpen);
      window.removeEventListener("message", onMessage);
    };
  }, []);

  // Le contenu de la fenêtre est monté dans un portail, un rendu après l'ouverture : on attend donc l'élément lui-même
  // (ref de rappel) plutôt qu'un effet sur `open`, qui s'exécuterait avant que le bloc n'existe.
  const calendarRef = useCallback((element: HTMLDivElement | null) => {
    if (!element) return;
    setFailed(false);
    mountCalendly(element).catch(() => setFailed(true));
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-[calc(100%-1.5rem)] max-w-3xl gap-0 overflow-hidden rounded-2xl p-0">
        <DialogHeader className="space-y-1 px-5 pb-3 pt-5 text-left sm:px-6">
          <DialogTitle className="text-lg font-extrabold sm:text-xl">Réservez vos 30 minutes offertes</DialogTitle>
          <DialogDescription className="text-sm">
            Échange direct avec RAMSIN, en visio ou par téléphone, sans engagement. Choisissez le créneau qui vous convient.
          </DialogDescription>
        </DialogHeader>

        {/* L'agenda remplit ce bloc ; le script Calendly n'est chargé qu'à l'ouverture */}
        <div ref={calendarRef} className="w-full bg-white" style={{ height: "min(680px, 72vh)", minWidth: "320px" }} />

        {failed && (
          <p className="px-5 pb-3 text-sm font-medium text-rose-600">
            Le calendrier n'a pas pu se charger (bloqueur de scripts ?) : ouvrez-le directement sur Calendly ci-dessous.
          </p>
        )}

        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 border-t border-border/60 bg-muted/30 px-5 py-3 text-xs text-muted-foreground">
          <a
            href={CALENDLY_PAGE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-bold text-primary hover:underline"
          >
            Ouvrir sur Calendly <ExternalLink className="h-3 w-3" />
          </a>
          <span className="hidden sm:inline">•</span>
          <a href="tel:+33761518890" className="inline-flex items-center gap-1 font-bold text-foreground hover:underline">
            <Phone className="h-3 w-3" /> +33 (0)7 61 51 88 90
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingDialog;
