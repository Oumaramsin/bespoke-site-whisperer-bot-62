import { useState, useEffect } from "react";
import { Calendar, ArrowRight, X } from "lucide-react";
import { useLocation } from "react-router-dom";
import { openBooking } from "@/lib/calendly";

/** Bouton flottant (après un premier défilement) : ouvre la fenêtre de réservation, sans changer de page */
export const MobileStickyCTA = () => {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const location = useLocation();

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

  // Ne pas afficher si le visiteur est déjà sur la page Contact ou a fermé le bouton
  if (!visible || dismissed || location.pathname === "/contact") return null;

  return (
    <div className="fixed bottom-5 right-5 md:bottom-8 md:right-8 z-40 animate-fade-in">
      <div className="relative flex items-center gap-3 p-2.5 sm:p-3 pl-4 sm:pl-5 rounded-full bg-gradient-to-r from-[#071816] via-[#123A35] to-[#0a2622] text-white shadow-2xl border-2 border-[#C7F36B]/60 hover:border-[#C7F36B] backdrop-blur-xl hover:scale-105 transition-all group">
        {/* Badge indicateur vert clignotant */}
        <span className="relative flex h-3 w-3 shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C7F36B] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-[#C7F36B]"></span>
        </span>

        <button
          onClick={() => openBooking("sticky_mobile")}
          className="flex items-center gap-2.5 text-xs sm:text-sm font-extrabold pr-1 text-white tracking-tight cursor-pointer"
        >
          <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-[#C7F36B] shrink-0 group-hover:scale-110 transition-transform" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-[#C7F36B]">
            Réserver 30 min offertes
          </span>
          <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C7F36B] group-hover:translate-x-1 transition-transform" />
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
