import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { smoothScrollTo } from "@/lib/smoothScroll";

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.slice(1));
      // Page chargée à la demande : l'ancre n'existe pas encore, on remonte en haut puis on attend qu'elle apparaisse
      if (!document.getElementById(id)) window.scrollTo({ top: 0, left: 0, behavior: "instant" });

      let tries = 0;
      let timer = 0;
      const attempt = () => {
        const element = document.getElementById(id);
        if (element) {
          smoothScrollTo(element);
          // Nettoie l'URL pour supprimer l'ancre # de la barre d'adresse du navigateur
          window.history.replaceState(null, "", pathname);
          return;
        }
        if (++tries < 20) timer = window.setTimeout(attempt, 100);
      };
      timer = window.setTimeout(attempt, 150);
      return () => window.clearTimeout(timer);
    }

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant"
    });
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
