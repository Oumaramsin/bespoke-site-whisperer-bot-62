import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
          // Nettoie l'URL pour supprimer l'ancre # de la barre d'adresse du navigateur
          window.history.replaceState(null, "", pathname);
        }, 150);
        return;
      }
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
