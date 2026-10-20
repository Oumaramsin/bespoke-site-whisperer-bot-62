/**
 * Choix du visiteur sur les cookies Google (bandeau CookieConsent), conservé 6 mois comme le recommande la CNIL.
 */
export type ConsentChoice = "granted" | "denied";

const STORAGE_KEY = "ramsin_cookie_consent";
const VALIDITY_MS = 182 * 24 * 60 * 60 * 1000;

/** Événement émis par le lien « Gestion des cookies » pour rouvrir le bandeau. */
export const OPEN_CONSENT_EVENT = "ramsin:open-consent";

export const getConsent = (): ConsentChoice | null => {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null");
    if (!stored || Date.now() - stored.date > VALIDITY_MS) return null;
    return stored.choice === "granted" || stored.choice === "denied" ? stored.choice : null;
  } catch {
    return null;
  }
};

export const saveConsent = (choice: ConsentChoice) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ choice, date: Date.now() }));
  } catch {
    // Stockage indisponible : le bandeau sera simplement reproposé à la prochaine visite
  }
};

export const openConsentBanner = () => window.dispatchEvent(new Event(OPEN_CONSENT_EVENT));
