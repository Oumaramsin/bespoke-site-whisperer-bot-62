/**
 * Agenda Calendly : constantes, chargement du script officiel et ouverture de la fenêtre de réservation
 * depuis n'importe quel bouton « Réserver 30 min offertes » du site (le composant BookingDialog écoute l'événement).
 */
import { calendlyUtmParams } from "./attribution";
import { trackConversionEvent } from "./analytics";

export const CALENDLY_PAGE_URL = "https://calendly.com/contact-ramsin/30min";
const CALENDLY_EMBED_URL = `${CALENDLY_PAGE_URL}?hide_landing_page_details=1&hide_gdpr_banner=1&primary_color=123a35&locale=fr`;
const CALENDLY_SCRIPT = "https://assets.calendly.com/assets/external/widget.js";

declare global {
  interface Window {
    Calendly?: { initInlineWidget: (options: { url: string; parentElement: HTMLElement }) => void };
  }
}

/** URL d'intégration avec la provenance de la visite (utm_*), que Calendly enregistre avec le rendez-vous */
export const calendlyEmbedUrl = () => `${CALENDLY_EMBED_URL}&${calendlyUtmParams()}`;

let scriptPromise: Promise<void> | null = null;

/** Charge le script Calendly une seule fois (il pèse plusieurs Mo : jamais au chargement de la page) */
export const loadCalendlyScript = (): Promise<void> => {
  if (window.Calendly) return Promise.resolve();
  if (!scriptPromise) {
    scriptPromise = new Promise((resolve, reject) => {
      let script = document.querySelector<HTMLScriptElement>(`script[src="${CALENDLY_SCRIPT}"]`);
      if (!script) {
        script = document.createElement("script");
        script.src = CALENDLY_SCRIPT;
        script.async = true;
        document.head.appendChild(script);
      }
      script.addEventListener("load", () => resolve(), { once: true });
      script.addEventListener(
        "error",
        () => {
          scriptPromise = null;
          reject(new Error("Calendly : script non chargé"));
        },
        { once: true }
      );
    });
  }
  return scriptPromise;
};

/** Affiche l'agenda dans l'élément donné */
export const mountCalendly = async (parentElement: HTMLElement) => {
  await loadCalendlyScript();
  window.Calendly?.initInlineWidget({ url: calendlyEmbedUrl(), parentElement });
};

export const OPEN_BOOKING_EVENT = "ramsin:open-booking";

/** Ouvre la fenêtre de réservation (voir BookingDialog) et enregistre le clic avec sa provenance dans la page */
export const openBooking = (source: string) => {
  trackConversionEvent("click_booking_calendly", { source });
  window.dispatchEvent(new CustomEvent(OPEN_BOOKING_EVENT, { detail: { source } }));
};
