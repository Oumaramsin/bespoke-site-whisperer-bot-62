# Lot confiance : avis clients et fiche Google

Deux éléments dépendent de vous. Ce document dit quoi fournir et où chaque élément se branche dans le site.

## 1. Avis clients (accueil et page de l'étude de cas)

Règle : un avis publié doit avoir été écrit, ou relu et validé par écrit, par la personne citée. Les trois textes actuels
de `src/data/testimonials.ts` sont des brouillons rédigés à leur place : ils restent masqués (`published: false`).

Message à envoyer (WhatsApp ou e-mail) à Dabari, Maison HamdiWaShukri et L'Éclat du Chef :

> Bonjour [Prénom], j'espère que tout va bien de votre côté. Je mets à jour le site de RAMSIN et j'aimerais y afficher
> quelques avis de clients. Accepteriez-vous d'écrire deux ou trois phrases sur notre collaboration (ce que vous attendiez,
> ce qui vous a plu, ce que ça a changé pour vous) ? Je publierais votre avis avec votre prénom, votre nom et le nom de
> [entreprise], à côté de la page qui présente votre projet. Si vous préférez rester anonyme, dites-le-moi.
> Merci d'avance ! Oumar

Quand un avis arrive :

1. Garder le message reçu (e-mail ou capture WhatsApp) comme preuve d'accord.
2. Dans `src/data/testimonials.ts`, coller le texte tel quel dans `quote`, renseigner `name`, `role` et `company`,
   vérifier `projectId`, puis passer `published` à `true`.
3. La section « Ce que disent nos clients » apparaît sur l'accueil et la citation s'affiche sur la page du projet.
   Pas d'étoiles ni de note : le site n'affiche que les mots du client.

## 2. Fiche Google Business Profile

À créer sur https://business.google.com avec le compte Google de RAMSIN (celui qui gère déjà la Search Console).
Saisir exactement les mêmes informations que sur le site :

- Nom : RAMSIN Conseil
- Catégorie principale : la plus proche de « Consultant en informatique » ; catégories secondaires : « Société de
  développement de logiciels » et « Concepteur de sites web »
- Type : entreprise sans vitrine (ne pas afficher l'adresse si c'est un domicile) ; zone desservie : Fresnes, Paris,
  Île-de-France
- Téléphone : 07 61 51 88 90 · Site : https://www.ramsin.fr · E-mail : contact@ramsin.fr
- Horaires : lundi à vendredi, 9 h à 19 h
- Services (sans prix) : Architecture SI et MEGA HOPEX, Application web sur-mesure, Application mobile iOS et Android,
  Site e-commerce, Hébergement et maintenance
- Logo : `public/apple-touch-icon.png` · Photo de couverture : `public/og-image.jpg`
- Validation : Google envoie un code (téléphone, vidéo ou courrier), parfois sous quelques jours

Description à coller (moins de 750 caractères) :

> RAMSIN Conseil accompagne les DSI et les porteurs de projet à Fresnes, Paris et en Île-de-France. Architecture des
> systèmes d'information et expertise MEGA HOPEX V5 (cartographie applicative, urbanisation, gouvernance des référentiels)
> pour les grandes entreprises. Conception et développement d'applications web, mobiles (iOS et Android) et e-commerce
> sur-mesure pour les entrepreneurs et les PME : vous êtes propriétaire du code, des comptes et des données, sans abonnement
> captif. Un interlocuteur unique, architecte SI certifié MEGA HOPEX V5 avec 7 ans d'expérience en DSI (Covéa, La Banque
> Postale, Société Générale). Premier échange de 30 minutes offert.

Une fois la fiche validée :

1. Dans la fiche, « Demander des avis » donne un lien court (`https://g.page/r/.../review`) : le coller dans
   `GOOGLE_REVIEW_URL` (`src/data/company.ts`). Le lien « Laisser un avis Google » apparaît alors dans le pied de page.
2. « Partager la fiche » donne l'URL de la fiche : la coller dans `GOOGLE_BUSINESS_URL` (même fichier) et dans le bloc
   JSON-LD de `index.html` (champ `sameAs`).
3. Envoyer le lien d'avis aux mêmes clients. Un avis Google peut ensuite être repris sur le site, avec « Avis Google »
   dans le champ `source`.
