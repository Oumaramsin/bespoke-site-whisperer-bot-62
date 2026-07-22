import { useState, useEffect } from "react";
import { ArrowRight, X } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export const AnnouncementTicker = () => {
  const [isVisible, setIsVisible] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

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

  const handleReservationClick = () => {
    if (location.pathname === "/") {
      const el = document.getElementById("reservation-calendrier");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    // Navigation React Router SPA instantanée sans rechargement ni # dans l'URL
    navigate("/contact", { state: { scrollToBooking: true } });
  };

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-blue-500/10 via-emerald-500/10 to-blue-500/10 dark:from-slate-900 dark:via-blue-950 dark:to-slate-900 text-foreground dark:text-white text-xs sm:text-sm py-2.5 px-4 border-b border-primary/20 dark:border-blue-500/20 relative z-50 transition-all">
      <div className="container mx-auto flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 max-w-full overflow-hidden truncate mx-auto text-center">
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-extrabold text-emerald-700 dark:text-emerald-400 hidden sm:inline">Créneaux Disponibles :</span>
          <span className="text-foreground/90 dark:text-slate-200 truncate font-medium">
            Sessions de cadrage offertes (30 min) ouvertes pour la semaine
          </span>
          <button
            onClick={handleReservationClick}
            className="ml-2 underline font-extrabold text-primary hover:text-primary/80 dark:text-sky-400 dark:hover:text-white inline-flex items-center gap-1 cursor-pointer shrink-0 transition-colors"
          >
            Réserver en 30s <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <button
          onClick={handleDismiss}
          className="text-muted-foreground hover:text-foreground dark:text-slate-400 dark:hover:text-white p-1 rounded-md transition-colors shrink-0"
          aria-label="Fermer le bandeau d'actualité"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

export default AnnouncementTicker;
