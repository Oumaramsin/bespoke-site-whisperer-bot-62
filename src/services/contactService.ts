/**
 * Envoi du formulaire de contact vers la fonction serveur /api/contact.
 * Aucune clé API n'est manipulée côté navigateur : l'appel à Resend se fait côté serveur.

 */
import { describeChannel, getAttribution } from "@/lib/attribution";

interface SendContactParams {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  serviceType: string;
  timeline?: string;
  /** Fourchette de budget choisie par le prospect (clé de BUDGET_OPTIONS) */
  budget?: string;
  /** Budget prêt, en cours de financement ou pas encore (clé de FUNDING_OPTIONS) */
  funding?: string;
  /** Facultatif : déduit du type de prestation par le serveur */
  subject?: string;
  message: string;
  website?: string;
}

// Convertisseurs des identifiants techniques vers des libellés élégants en français
export const formatServiceType = (key?: string) => {
  const map: Record<string, string> = {
    "web-app": "Application Web & SaaS Métier Sur-Mesure",
    "mobile-app": "Application Mobile iOS & Android (React Native)",
    "site-vitrine": "Site Web Haute Conversion & E-Commerce",
    "architecture-si": "Architecture des SI & Urbanisation",
    "mega-hopex": "Expertise & Administration MEGA HOPEX V5",
    "po-agile": "Product Ownership SI, Cadrage & DAT",
    "pilotage-equipe": "Pilotage d'Équipe & Facilitation Agile",
    formation: "Formation & Transfert de Compétences",
    transformation: "Conseil en Transformation Digitale",
    autre: "Autre demande / Conseil sur-mesure",
  };
  return map[key || ""] || key || "Non précisé";
};

/** Fourchettes de budget du formulaire (mêmes clés que BUDGET_LABELS dans api/contact.ts) */
export const BUDGET_OPTIONS: { value: string; label: string }[] = [
  { value: "lt-3k", label: "Moins de 3 000 €" },
  { value: "3-6k", label: "3 000 à 6 000 €" },
  { value: "6-10k", label: "6 000 à 10 000 €" },
  { value: "10-20k", label: "10 000 à 20 000 €" },
  { value: "gt-20k", label: "Plus de 20 000 €" },
  { value: "unknown", label: "Je ne sais pas encore" },
];

/** Budget prêt ou non (mêmes clés que FUNDING_LABELS dans api/contact.ts) */
export const FUNDING_OPTIONS: { value: string; label: string }[] = [
  { value: "ready", label: "Oui, il est réservé" },
  { value: "in-progress", label: "Financement en cours (banque, prêt d'honneur…)" },
  { value: "not-yet", label: "Pas encore" },
];

/** Date de lancement souhaitée (mêmes clés que TIMELINE_LABELS dans api/contact.ts) */
export const TIMELINE_OPTIONS: { value: string; label: string }[] = [
  { value: "asap", label: "Dès que possible" },
  { value: "1-month", label: "D'ici 1 mois" },
  { value: "3-months", label: "Sous 3 mois" },
  { value: "flexible", label: "Pas de date précise" },
];

export const formatTimeline = (key?: string) => {
  const map: Record<string, string> = {
    asap: "Dès que possible (Urgent)",
    "1-month": "D'ici 1 mois",
    "3-months": "Sous 3 mois",
    flexible: "Flexible / En réflexion",
  };
  return map[key || ""] || key || "Non précisé";
};

/**
 * Transmet la demande au serveur. Lève une erreur si l'e-mail n'a pas pu être envoyé.
 */
export const sendContactRequest = async (params: SendContactParams) => {
  const res = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    // Provenance de la visite (canal, campagne, mot-clé…) affichée dans l'email reçu
    body: JSON.stringify({ ...params, attribution: { channel: describeChannel(), ...getAttribution() } }),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body?.error || `HTTP ${res.status}`);
  }
};
