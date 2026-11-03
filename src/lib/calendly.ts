/**
 * Agenda Calendly : constantes, chargement du script officiel et ouverture de la fenêtre de réservation
 * depuis n'importe quel bouton « Réserver 30 min offertes » du site (le composant BookingDialog écoute l'événement).
 */
import { calendlyUtmParams } from "./attribution";
import { trackConversionEvent } from "./analytics";
import { OFFER_LINKS, type OfferId } from "@/data/offerRoutes";

export const CALENDLY_PAGE_URL = "https://calendly.com/contact-ramsin/30min";
const CALENDLY_EMBED_URL = `${CALENDLY_PAGE_URL}?hide_landing_page_details=1&hide_gdpr_banner=1&primary_color=123a35&locale=fr`;
const CALENDLY_SCRIPT = "https://assets.calendly.com/assets/external/widget.js";

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: {
        url: string;
        parentElement: HTMLElement;
        prefill?: { customAnswers?: Record<string, string> };
      }) => void;
    };
  }
}

/** URL d'intégration avec la provenance de la visite (utm_*), que Calendly enregistre avec le rendez-vous */
export const calendlyEmbedUrl = () => `${CALENDLY_EMBED_URL}&${calendlyUtmParams()}`;

/**
 * Type de projet pré-rempli dans la première question du rendez-vous (« Votre projet », champ texte côté Calendly),
 * pour que l'invitation reçue dise de quoi on va parler. Le visiteur peut le corriger avant de confirmer.
 */
const PROJECT_LABELS: Record<OfferId | "si", string> = {
  "application-mobile": "Application mobile",
  "application-web": "Application web ou logiciel métier",
  "site-ecommerce": "Site internet ou boutique en ligne",
  si: "Architecture SI / MEGA HOPEX",
};
const PROJECT_KEY = "ramsin_projet";

/** Retient le type de projet de la page consultée, pour un rendez-vous pris plus tard depuis une autre page (Contact) */
export const rememberProject = (project: keyof typeof PROJECT_LABELS) => {
  try {
    sessionStorage.setItem(PROJECT_KEY, project);
  } catch {
    // Stockage indisponible (navigation privée) : le champ restera simplement vide
  }
};

const currentProjectLabel = () => {
  const offer = OFFER_LINKS.find((o) => window.location.pathname.startsWith(o.path));
  if (offer) return PROJECT_LABELS[offer.id];
  try {
    const stored = sessionStorage.getItem(PROJECT_KEY) as keyof typeof PROJECT_LABELS | null;
    return stored ? PROJECT_LABELS[stored] : undefined;
  } catch {
    return undefined;
  }
};

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
  const project = currentProjectLabel();
  window.Calendly?.initInlineWidget({
    url: calendlyEmbedUrl(),
    parentElement,
    ...(project && { prefill: { customAnswers: { a1: project } } }),
  });
};

export const OPEN_BOOKING_EVENT = "ramsin:open-booking";

/** Ouvre la fenêtre de réservation (voir BookingDialog) et enregistre le clic avec sa provenance dans la page */
export const openBooking = (source: string) => {
  trackConversionEvent("click_booking_calendly", { source });
  // Boutons du pôle SI (accueil, services) : pas de page d'offre dédiée, la provenance du clic suffit
  if (/(^|_)si(_|$)/.test(source)) rememberProject("si");
  window.dispatchEvent(new CustomEvent(OPEN_BOOKING_EVENT, { detail: { source } }));
};
