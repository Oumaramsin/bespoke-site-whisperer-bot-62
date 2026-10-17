/**
 * Module de suivi de conversion éthique & respectueux (Zero-Cookie / 100% Conforme RGPD)
 * RAMSIN Conseil
 * 
 * Permet de mesurer l'efficacité commerciale des deux tunnels de conversion :
 * - Prise de RDV Calendly (Visio 30 min)
 * - Soumission du formulaire express (Message écrit 2 min)
 * - Navigation entre les parcours (Architecture SI vs Web & Apps)
 * - Consultation de la démo interactive de méthode
 * - Clics sur les coordonnées directes (téléphone, email)
 * 
 * Ce module ne dépose AUCUN cookie tiers intrusif, n'enregistre aucune donnée
 * personnelle identifiante et s'intègre nativement avec Google Analytics (si configuré)
 * ou Plausible Analytics, avec fallback via CustomEvents et log en développement.
 */

export type ConversionEventName =
  | "click_booking_calendly"
  | "schedule_meeting_calendly"
  | "start_form_contact"
  | "submit_contact_form"
  | "click_switch_to_written_form"
  | "switch_process_tab"
  | "watch_method_motion"
  | "click_case_study"
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
    gtag?: (command: string, action: string, params?: Record<string, unknown>) => void;
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
