import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getConsent, OPEN_CONSENT_EVENT, saveConsent, type ConsentChoice } from "@/lib/consent";
import { clearGoogleCookies, isGoogleTagConfigured, loadGoogleTag } from "@/lib/googleTag";

/**
 * Bandeau cookies : Google Analytics / Google Ads ne sont chargés qu'après « Accepter ».
 * « Refuser » est aussi simple qu'« Accepter » (exigence CNIL) ; le choix est modifiable via « Gestion des cookies ».
 * Affiché seulement côté navigateur (après le montage) : le HTML pré-rendu ne le contient pas.
 */
export const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!isGoogleTagConfigured) return;
    const consent = getConsent();
    if (consent === "granted") loadGoogleTag();
    if (consent === null) setVisible(true);

    const open = () => setVisible(true);
    window.addEventListener(OPEN_CONSENT_EVENT, open);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, open);
  }, []);

  if (!visible) return null;

  const choose = (choice: ConsentChoice) => {
    const previous = getConsent();
    saveConsent(choice);
    setVisible(false);
    if (choice === "granted") {
      loadGoogleTag();
    } else if (previous === "granted") {
      // Retrait du consentement : on efface les cookies Google et on recharge sans le tag
      clearGoogleCookies();
      window.location.reload();
    }
  };

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Gestion des cookies"
      className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-xl rounded-2xl border border-border bg-white p-4 shadow-2xl sm:p-5"
    >
      <p className="text-sm text-foreground leading-relaxed">
        Avec votre accord, nous utilisons des cookies Google (Analytics et Ads) pour savoir d'où viennent nos visiteurs et mesurer
        l'efficacité de nos annonces. Rien n'est déposé si vous refusez.{" "}
        <Link to="/confidentialite" className="font-semibold text-primary underline-offset-2 hover:underline">
          En savoir plus
        </Link>
      </p>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => choose("denied")}
          className="rounded-xl border-2 border-[#123A35] px-4 py-2.5 text-sm font-bold text-[#123A35] transition-colors hover:bg-[#123A35]/5"
        >
          Refuser
        </button>
        <button
          type="button"
          onClick={() => choose("granted")}
          className="rounded-xl border-2 border-[#123A35] bg-[#123A35] px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#0c2621]"
        >
          Accepter
        </button>
      </div>
    </div>
  );
};

export default CookieConsent;
