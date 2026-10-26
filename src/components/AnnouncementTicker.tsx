import { useState, useEffect } from "react";
import { ArrowRight, X } from "lucide-react";
import { openBooking } from "@/lib/calendly";

/** Bandeau du haut : texte court qui tient sur une ligne, même sur mobile, et ouvre la fenêtre de réservation */
export const AnnouncementTicker = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const closed = localStorage.getItem("ramsin_ticker_dismissed");
    if (closed === "true") {
      setIsVisible(false);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem("ramsin_ticker_dismissed", "true");
  };

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-[#123A35]/10 via-[#C7F36B]/15 to-[#123A35]/10 text-foreground text-xs sm:text-sm py-2 px-4 border-b border-[#123A35]/15 relative z-50 transition-all">
      <div className="container mx-auto flex items-center justify-between gap-2">
        <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-0.5 mx-auto text-center min-w-0">
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-extrabold text-[#123A35] hidden sm:inline">Créneaux disponibles cette semaine :</span>
          <span className="text-foreground/90 font-medium">30 min de cadrage offertes</span>
          <button
            type="button"
            onClick={() => openBooking("ticker")}
            className="underline font-extrabold text-[#123A35] hover:text-[#0c2724] inline-flex items-center gap-1 cursor-pointer shrink-0 transition-colors"
          >
            Réserver <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <button
          onClick={handleDismiss}
          className="text-muted-foreground hover:text-foreground p-1 rounded-md transition-colors shrink-0"
          aria-label="Fermer le bandeau d'actualité"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

export default AnnouncementTicker;
