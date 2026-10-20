/**
 * Suivi des conversions — RAMSIN Conseil
 *
 * Permet de mesurer l'efficacité commerciale des deux tunnels de conversion :
 * - Prise de RDV Calendly (Visio 30 min)
 * - Soumission du formulaire express (Message écrit 2 min)
 * - Navigation entre les parcours (Architecture SI vs Web & Apps)
 * - Consultation de la démo interactive de méthode
 * - Clics sur les coordonnées directes (téléphone, email)
 *
 * Les événements partent vers Google Analytics / Google Ads uniquement si le visiteur a accepté les cookies
 * (gtag n'est chargé qu'après son accord, voir googleTag.ts) ; les trois conversions principales
 * (RDV Calendly, formulaire, téléphone) sont en plus remontées comme conversions Google Ads.
 */
import { sendAdsConversion } from "./googleTag";

export type ConversionEventName =
  | "click_booking_calendly"
  | "schedule_meeting_calendly"
  | "start_form_contact"
  | "submit_contact_form"
  | "click_switch_to_written_form"
  | "switch_process_tab"
  | "switch_projects_tab"
  | "watch_method_motion"
  | "click_case_study"
  | "click_case_study_cta"
  | "click_phone"
  | "copy_email"
  | "select_pole";

export interface ConversionEventParams {
  category?: string;
  label?: string;
  value?: number;
  pole?: "web" | "si" | "all";
  serviceType?: string;
  sceneId?: number;
  destination?: string;
  [key: string]: string | number | boolean | undefined;
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
    plausible?: (eventName: string, options?: { props?: Record<string, unknown> }) => void;
  }
}

export const trackConversionEvent = (
  eventName: ConversionEventName,
  params: ConversionEventParams = {}
): void => {
  try {
    const timestamp = new Date().toISOString();
    const payload = {
      ...params,
      page: typeof window !== "undefined" ? window.location.pathname : "",
      timestamp,
    };

    // 1. Google Analytics (gtag) si configuré
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", eventName, payload);
      sendAdsConversion(eventName);
    }

    // 2. Plausible Analytics si configuré
    if (typeof window !== "undefined" && typeof window.plausible === "function") {
      window.plausible(eventName, { props: payload });
    }

    // 3. Custom DOM Event pour intégrations custom
    if (typeof window !== "undefined" && typeof window.dispatchEvent === "function") {
      const customEvent = new CustomEvent("ramsin:conversion", {
        detail: {
          event: eventName,
          payload,
        },
      });
      window.dispatchEvent(customEvent);
    }

    // 4. Événement enregistré silencieusement
  } catch {
    // Silencieux en production
  }
};

/** Tous les liens tel: du site (en-tête, pied de page, pages) comptent comme une conversion « appel ». */
export const trackPhoneClicks = () => {
  document.addEventListener(
    "click",
    (event) => {
      const link = (event.target as Element | null)?.closest?.('a[href^="tel:"]');
      if (link) trackConversionEvent("click_phone", { destination: link.getAttribute("href") ?? "" });
    },
    { capture: true }
  );
};
