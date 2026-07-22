import { useState, useEffect } from "react";
import { Calendar, ArrowRight, X } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

export const MobileStickyCTA = () => {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 350 && !dismissed) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [dismissed]);

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

  // Ne pas afficher si le visiteur est déjà sur la page Contact ou a fermé le bouton
  if (!visible || dismissed || location.pathname === "/contact") return null;

  return (
    <div className="fixed bottom-5 right-5 md:bottom-8 md:right-8 z-40 animate-fade-in">
      <div className="relative flex items-center gap-3 p-2.5 sm:p-3 pl-4 sm:pl-5 rounded-full bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white shadow-2xl border-2 border-emerald-500/40 hover:border-emerald-400 backdrop-blur-xl hover:scale-105 transition-all group glow-shadow-emerald">
        {/* Badge indicateur vert clignotant */}
        <span className="relative flex h-3 w-3 shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
        </span>

        <button
          onClick={handleReservationClick}
          className="flex items-center gap-2.5 text-xs sm:text-sm font-extrabold pr-1 text-white tracking-tight cursor-pointer"
        >
          <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 shrink-0 group-hover:scale-110 transition-transform" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-emerald-200">
            Session 30 min Offerte
          </span>
          <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 group-hover:translate-x-1 transition-transform" />
        </button>

        <button
          onClick={() => setDismissed(true)}
          className="p-1 sm:p-1.5 rounded-full hover:bg-white/10 transition-colors text-slate-400 hover:text-white shrink-0 cursor-pointer border-l border-white/10 pl-2"
          aria-label="Fermer le bouton flottant"
          title="Fermer"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

export default MobileStickyCTA;
