/**
 * Présence Google de RAMSIN Conseil (fiche Google Business Profile).
 *
 * La fiche existe (https://share.google/9KPQb5OKClwO7crgm) mais n'a encore ni avis ni photos.
 * Les deux liens restent donc vides et rien ne s'affiche sur le site : les renseigner quand
 * les premiers avis et les photos (dossier fiche-google/) seront publiés sur la fiche.
 *   - GOOGLE_BUSINESS_URL : lien « Partager la fiche » (celui ci-dessus)
 *   - GOOGLE_REVIEW_URL  : lien « Demander des avis » de la fiche (https://g.page/r/.../review)
 * Même nom, même téléphone et même ville que sur le site : Google recoupe les trois.
 * Mode d'emploi complet : docs/confiance-fiche-google-et-avis.md
 */
export const GOOGLE_BUSINESS_URL: string = "";
export const GOOGLE_REVIEW_URL: string = "";

/**
 * Note et nombre d'avis affichés sur les pages d'offre et l'accueil (badge « Avis Google »).
 * À recopier tels qu'ils apparaissent sur la fiche, sans arrondir vers le haut, et à mettre à jour à chaque nouvel avis.
 * Le badge reste masqué tant que GOOGLE_BUSINESS_URL est vide ou qu'il n'y a aucun avis.
 */
export const GOOGLE_REVIEW_COUNT: number = 0;
export const GOOGLE_RATING: number = 0;
