/**
 * Fourchettes de prix affichées sur le site, hors taxes (clients professionnels).
 * Le prix dépend de la taille du projet : on affiche des ordres de prix par type de projet, jamais un prix unique,
 * et le prix ferme est fixé dans le devis. Maintenance et missions SI restent sur devis.
 * Ces montants doivent rester ceux réellement pratiqués : aucun prix d'appel fictif.
 */
import type { OfferId } from "./offerRoutes";

export interface PriceTier {
  name: string;
  /** Montant bas de la fourchette ; absent pour « moins de … » */
  min?: number;
  /** Montant haut de la fourchette ; absent pour « … et plus » (gros projets chiffrés sur devis) */
  max?: number;
  /** Ce que contient ce type de projet, pour que le visiteur s'y retrouve */
  examples: string;
  /** Repris dans l'en-tête de la page d'offre à la place de l'étendue complète des prix */
  headline?: boolean;
}

// Une application commence le plus souvent par une première version (MVP), enrichie ensuite :
// on met en avant ces deux paliers plutôt que l'étendue complète, qui faisait peur.
const APP_MVP = { min: 4000, max: 8000, headline: true };
const APP_COMPLETE = { min: 8000, max: 15000, headline: true };
const APP_PLATFORM = { min: 15000 };

export const PRICE_TIERS: Record<OfferId, PriceTier[]> = {
  "application-mobile": [
    {
      name: "Première version (MVP)",
      ...APP_MVP,
      examples:
        "L'essentiel pour lancer et tester votre idée : quelques écrans, vos contenus, un formulaire ou une prise de rendez-vous, sans paiement en ligne.",
    },
    {
      name: "Application complète",
      ...APP_COMPLETE,
      examples: "Comptes utilisateurs, paiement en ligne, notifications et espace d'administration.",
    },
    {
      name: "Plateforme sur mesure",
      ...APP_PLATFORM,
      examples: "Plusieurs profils (clients, prestataires, administrateurs), place de marché, connexions à d'autres outils.",
    },
  ],
  "application-web": [
    {
      name: "Première version (MVP)",
      ...APP_MVP,
      examples: "L'essentiel pour tester votre idée ou remplacer un fichier Excel : quelques écrans, saisie, suivi, exports.",
    },
    {
      name: "Application complète",
      ...APP_COMPLETE,
      examples: "Comptes et rôles, paiement ou abonnement, tableau de bord et espace d'administration.",
    },
    {
      name: "Plateforme ou logiciel SaaS sur mesure",
      ...APP_PLATFORM,
      examples: "Plusieurs types d'utilisateurs, abonnements, automatisations et connexions à vos outils.",
    },
  ],
  "site-ecommerce": [
    {
      name: "Site vitrine",
      max: 2000,
      examples: "Quelques pages pour présenter votre activité et recevoir des demandes de contact ou de devis.",
    },
    {
      name: "Boutique en ligne essentielle",
      min: 3500,
      max: 5000,
      examples: "Catalogue, paiement par carte et PayPal, suivi des commandes et e-mails automatiques.",
    },
    {
      name: "Boutique avancée",
      min: 5000,
      max: 12000,
      examples: "Configurateur produit, grand catalogue, plusieurs langues ou connexion à votre gestion de stock.",
    },
  ],
};

/** Phrase affichée sous les fourchettes quand l'offre commence par une première version */
export const PRICE_NOTES: Partial<Record<OfferId, string>> = {
  "application-mobile":
    "La plupart des applications commencent par une première version, puis s'enrichissent avec les premiers clients. La suite fait l'objet d'un nouveau devis : vous ne la payez que si vous la voulez.",
  "application-web":
    "La plupart des applications commencent par une première version, puis s'enrichissent avec les premiers utilisateurs. La suite fait l'objet d'un nouveau devis : vous ne la payez que si vous la voulez.",
};

const formatAmount = (amount: number) => String(amount).replace(/\B(?=(\d{3})+(?!\d))/g, " ");

/** « 4 000 – 8 000 € HT », « 15 000 € HT et plus », « Moins de 2 000 € HT » */
export const formatTier = ({ min, max }: Pick<PriceTier, "min" | "max">) => {
  if (min === undefined) return `Moins de ${formatAmount(max ?? 0)} € HT`;
  if (max === undefined) return `${formatAmount(min)} € HT et plus`;
  return `${formatAmount(min)} – ${formatAmount(max)} € HT`;
};

/** Étendue des prix d'une offre, du plus petit au plus gros projet : « de 4 000 à 15 000 € HT et plus » */
export const formatSpan = (id: OfferId) => {
  const tiers = PRICE_TIERS[id];
  const first = tiers[0];
  const last = tiers[tiers.length - 1];
  const low = first.min === undefined ? `moins de ${formatAmount(first.max ?? 0)} €` : `${formatAmount(first.min)} €`;
  return last.max === undefined
    ? `de ${low} à ${formatAmount(last.min ?? 0)} € HT et plus`
    : `de ${low} à ${formatAmount(last.max)} € HT`;
};

/** Paliers repris dans l'en-tête de la page d'offre ; vide si l'offre affiche l'étendue complète */
export const headlineTiers = (id: OfferId) => PRICE_TIERS[id].filter((tier) => tier.headline);

export const lowerFirst = (text: string) => text.charAt(0).toLowerCase() + text.slice(1);

/** Phrase de FAQ : « première version (MVP) : 4 000 – 8 000 € HT ; … » */
export const describeTiers = (id: OfferId) =>
  PRICE_TIERS[id].map((tier) => `${lowerFirst(tier.name)} : ${formatTier(tier)}`).join(" ; ");
