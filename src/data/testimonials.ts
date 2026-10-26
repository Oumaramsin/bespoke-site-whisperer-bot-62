/**
 * Avis clients : section « Ce que disent nos clients » (accueil) et citation sur la page de l'étude de cas.
 *
 * RÈGLE : un avis n'est publié (published: true) que s'il a été écrit, ou relu et validé par écrit,
 * par la personne citée. Publier un texte qu'elle n'a pas rédigé est un faux avis (pratique commerciale trompeuse).
 * Les trois entrées ci-dessous sont des brouillons rédigés à sa place : elles restent masquées.
 *
 * Pour publier un avis reçu (mode d'emploi : docs/confiance-fiche-google-et-avis.md) :
 *   1. coller ses mots tels quels dans « quote », renseigner « name » (prénom + nom), « role » et « company » ;
 *   2. vérifier « projectId » (id de src/data/projects.ts) pour relier l'avis à son étude de cas ;
 *   3. passer « published » à true. Pas d'étoiles ni de note : seuls les mots du client sont affichés.
 */
export interface Testimonial {
  /** true seulement avec l'accord écrit du client (conservé : e-mail ou capture WhatsApp) */
  published: boolean;
  quote: string;
  /** Prénom et nom de la personne qui témoigne (vide = anonyme) */
  name?: string;
  role: string;
  company: string;
  /** Étude de cas liée (id de src/data/projects.ts) : lien « Lire l'étude de cas » et citation sur la page du projet */
  projectId?: string;
  /** Portrait, carré, 160 px minimum (ex. /images/testimonials/prenom-nom.webp) */
  photo?: string;
  /** D'où vient l'avis, affiché à côté du nom (ex. « Avis Google ») */
  source?: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    // Brouillon à remplacer par les mots du client
    published: false,
    quote:
      "RAMSIN Conseil a su traduire nos besoins en un site vitrine élégant et ultra-efficace. Les demandes de devis arrivent directement sur notre boîte e-mail. Tout nous a été expliqué simplement et la formation m'a rendu 100% autonome.",
    name: "",
    role: "Gérant",
    company: "L'Éclat du Chef",
    projectId: "leclat-du-chef",
  },
  {
    // Brouillon à remplacer par les mots du client
    published: false,
    quote:
      "Le configurateur sur-mesure et le paiement Stripe/PayPal fonctionnent à la perfection. RAMSIN est d'une grande rigueur, très pédagogue et réactif. Un vrai plaisir de collaborer en toute confiance.",
    name: "",
    role: "Équipe Projet",
    company: "Maison HamdiWaShukri",
    projectId: "maison-hamdiwashukri",
  },
  {
    // Brouillon ; mission à préciser (Covéa ? La Banque Postale ?) pour relier l'avis à son étude de cas via projectId
    published: false,
    quote:
      "Excellente maîtrise de la plateforme MEGA HOPEX V5 et de la cartographie des flux applicatifs. RAMSIN Conseil sécurise les documentations et apporte une vision claire et structurée auprès des équipes.",
    name: "",
    role: "Responsable DSI",
    company: "Projets Cartographie SI",
  },
];

/** Les avis affichables : écrits ou validés par les clients */
export const PUBLISHED_TESTIMONIALS = TESTIMONIALS.filter((t) => t.published);

/** L'avis publié du client d'une étude de cas, s'il existe */
export const getTestimonialForProject = (projectId: string) =>
  PUBLISHED_TESTIMONIALS.find((t) => t.projectId === projectId);
