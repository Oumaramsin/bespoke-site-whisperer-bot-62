/**
 * Provenance du visiteur (paramètres UTM, gclid Google Ads, page d'arrivée, site référent).
 * Mémorisée pour la durée de l'onglet (sessionStorage, rien n'est envoyé à un tiers) puis jointe :
 * - aux demandes du formulaire de contact (visible dans l'email reçu),
 * - à l'agenda Calendly (paramètres utm_* visibles dans le détail de chaque rendez-vous).
 */
export interface Attribution {
  source?: string;
  medium?: string;
  campaign?: string;
  term?: string;
  content?: string;
  gclid?: string;
  landingPage?: string;
  referrer?: string;
}

const STORAGE_KEY = "ramsin_attribution";
const MAX_LENGTH = 200;

const URL_PARAMS: Record<string, keyof Attribution> = {
  utm_source: "source",
  utm_medium: "medium",
  utm_campaign: "campaign",
  utm_term: "term",
  utm_content: "content",
  gclid: "gclid",
};

/** À appeler au chargement : une arrivée par une annonce remplace la provenance déjà mémorisée. */
export const captureAttribution = () => {
  try {
    const params = new URLSearchParams(window.location.search);
    const fromUrl: Attribution = {};
    for (const [param, key] of Object.entries(URL_PARAMS)) {
      const value = params.get(param);
      if (value) fromUrl[key] = value.slice(0, MAX_LENGTH);
    }
    const fromCampaign = Object.keys(fromUrl).length > 0;
    if (!fromCampaign && sessionStorage.getItem(STORAGE_KEY)) return;

    let referrer: string | undefined;
    if (document.referrer) {
      const url = new URL(document.referrer);
      if (url.host !== window.location.host) referrer = url.host;
    }

    const attribution: Attribution = { ...fromUrl, landingPage: window.location.pathname, referrer };
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(attribution));
  } catch {
    // Stockage indisponible (navigation privée stricte) : la provenance n'est simplement pas mémorisée
  }
};

export const getAttribution = (): Attribution => {
  try {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? "{}");
  } catch {
    return {};
  }
};

/** Canal lisible : utm_source en priorité, sinon « google / cpc » si gclid, sinon le site référent, sinon « direct ». */
export const describeChannel = (attribution: Attribution = getAttribution()) => {
  if (attribution.source) return [attribution.source, attribution.medium].filter(Boolean).join(" / ");
  if (attribution.gclid) return "google / cpc";
  if (attribution.referrer) return `${attribution.referrer} / referral`;
  return "direct";
};

/** Paramètres utm_* à ajouter à l'URL Calendly (Calendly les enregistre avec le rendez-vous). */
export const calendlyUtmParams = (attribution: Attribution = getAttribution()) => {
  const params = new URLSearchParams();
  const [source, medium] = describeChannel(attribution).split(" / ");
  params.set("utm_source", source);
  if (medium) params.set("utm_medium", medium);
  if (attribution.campaign) params.set("utm_campaign", attribution.campaign);
  if (attribution.term) params.set("utm_term", attribution.term);
  if (attribution.content) params.set("utm_content", attribution.content);
  return params.toString();
};
