/**
 * Google tag (Google Analytics 4 et Google Ads), chargé uniquement après accord du visiteur (bandeau cookies).
 *
 * Configuration par variables d'environnement Vite (à définir dans Vercel, puis redéployer) :
 * - VITE_GA4_ID                     ID de mesure Google Analytics 4 (G-XXXXXXXXXX)
 * - VITE_GOOGLE_ADS_ID              ID du compte Google Ads (AW-XXXXXXXXXX)
 * - VITE_GOOGLE_ADS_LABEL_BOOKING   libellé de la conversion « Rendez-vous Calendly réservé »
 * - VITE_GOOGLE_ADS_LABEL_FORM      libellé de la conversion « Formulaire de contact envoyé »
 * - VITE_GOOGLE_ADS_LABEL_PHONE     libellé de la conversion « Clic sur le téléphone »
 * Sans VITE_GA4_ID ni VITE_GOOGLE_ADS_ID, rien n'est chargé et aucun bandeau n'est affiché.
 */
import type { ConversionEventName } from "./analytics";

const GA4_ID = import.meta.env.VITE_GA4_ID;
const ADS_ID = import.meta.env.VITE_GOOGLE_ADS_ID;

const ADS_CONVERSION_LABELS: Partial<Record<ConversionEventName, string | undefined>> = {
  schedule_meeting_calendly: import.meta.env.VITE_GOOGLE_ADS_LABEL_BOOKING,
  submit_contact_form: import.meta.env.VITE_GOOGLE_ADS_LABEL_FORM,
  click_phone: import.meta.env.VITE_GOOGLE_ADS_LABEL_PHONE,
};

export const isGoogleTagConfigured = Boolean(GA4_ID || ADS_ID);

let loaded = false;

export const loadGoogleTag = () => {
  if (loaded || !isGoogleTagConfigured) return;
  loaded = true;

  window.dataLayer = window.dataLayer || [];
  // gtag.js attend l'objet `arguments` lui-même, pas un tableau
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };

  // Consent Mode v2 : le tag n'est chargé qu'après « Accepter », le consentement est donc accordé
  window.gtag("consent", "default", {
    ad_storage: "granted",
    ad_user_data: "granted",
    ad_personalization: "granted",
    analytics_storage: "granted",
  });
  window.gtag("js", new Date());
  if (GA4_ID) window.gtag("config", GA4_ID);
  if (ADS_ID) window.gtag("config", ADS_ID);

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID ?? ADS_ID}`;
  document.head.appendChild(script);
};

/** Envoie la conversion Google Ads associée à l'événement, si son libellé est configuré. */
export const sendAdsConversion = (eventName: ConversionEventName) => {
  const label = ADS_CONVERSION_LABELS[eventName];
  if (!ADS_ID || !label || typeof window.gtag !== "function") return;
  window.gtag("event", "conversion", { send_to: `${ADS_ID}/${label}` });
};

/** Supprime les cookies Google déjà déposés (retrait du consentement). */
export const clearGoogleCookies = () => {
  const hostParts = window.location.hostname.split(".");
  const domains = hostParts.map((_, i) => hostParts.slice(i).join(".")).filter((d) => d.includes("."));
  document.cookie.split(";").forEach((cookie) => {
    const name = cookie.split("=")[0].trim();
    if (!/^(_ga|_gid|_gcl|_gac)/.test(name)) return;
    const expire = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    document.cookie = expire;
    domains.forEach((domain) => (document.cookie = `${expire}; domain=.${domain}`));
  });
};
