/**
 * Envoi du formulaire de contact vers la fonction serveur /api/contact.
 * Aucune clé API n'est manipulée côté navigateur : l'appel à Resend se fait côté serveur.
 */

interface SendContactParams {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  serviceType: string;
  timeline?: string;
  subject: string;
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
    body: JSON.stringify(params),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body?.error || `HTTP ${res.status}`);
  }
};
