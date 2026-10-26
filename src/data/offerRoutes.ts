/**
 * Adresses des pages d'offre (une URL par prestation, alignée sur les groupes d'annonces Google Ads).
 * Fichier volontairement minuscule : il est chargé dans le bundle principal (routes, pied de page),
 * le contenu complet des pages reste dans src/data/offers.ts (chargé à la demande).
 */
export type OfferId = "application-mobile" | "application-web" | "site-ecommerce";

export interface OfferLink {
  id: OfferId;
  path: string;
  /** Libellé court pour les menus et liens */
  shortTitle: string;
}

export const OFFER_LINKS: OfferLink[] = [
  { id: "application-mobile", path: "/creation-application-mobile", shortTitle: "Création d'application mobile" },
  { id: "application-web", path: "/developpement-application-web", shortTitle: "Application web & SaaS" },
  { id: "site-ecommerce", path: "/creation-site-internet-ecommerce", shortTitle: "Site internet & e-commerce" },
];

export const offerPath = (id: OfferId) => OFFER_LINKS.find((o) => o.id === id)!.path;
