import { useState, useEffect } from "react";
import { Calendar, ArrowRight, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

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
      <div className="relative flex items-center gap-2.5 md:gap-3.5 p-2 md:p-3 pl-4 md:pl-6 rounded-full bg-primary text-primary-foreground shadow-2xl border-2 border-white/30 hover:scale-105 transition-all">
        <Link
          to="/contact"
          className="flex items-center gap-2.5 md:gap-3 text-xs sm:text-sm md:text-base font-black pr-1 text-primary-foreground tracking-tight"
        >
          <Calendar className="w-4 h-4 md:w-5 md:h-5 text-emerald-400 shrink-0" />
          <span>30 min offertes</span>
          <ArrowRight className="w-3.5 h-3.5 md:w-4.5 md:h-4.5" />
        </Link>

        <button
          onClick={() => setDismissed(true)}
          className="p-1 md:p-1.5 rounded-full hover:bg-white/20 transition-colors text-primary-foreground/80 shrink-0 cursor-pointer"
          aria-label="Fermer le bouton flottant"
          title="Fermer"
        >
          <X className="w-3.5 h-3.5 md:w-4 md:h-4" />
        </button>
      </div>
    </div>
  );
};

export default MobileStickyCTA;
