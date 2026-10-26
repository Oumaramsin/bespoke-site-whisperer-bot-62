/**
 * Pages d'offre : une page dédiée par prestation, avec son propre titre, sa description, son H1 et ses données
 * structurées. Elles répondent aux recherches précises (« création application mobile », « développeur SaaS »…)
 * et servent de pages d'atterrissage aux annonces Google Ads.
 */
import type { Project } from "./projects";
import { OFFER_LINKS, type OfferId } from "./offerRoutes";

export interface OfferFaq {
  q: string;
  a: string;
}

export interface OfferDeliverable {
  title: string;
  text: string;
}

export interface OfferStep {
  title: string;
  text: string;
}

export interface Offer {
  id: OfferId;
  path: string;
  shortTitle: string;
  pole: Project["pole"];
  /** Valeur de ?service= sur la page Contact */
  serviceParam: "web" | "si";
  /** <title> de la page (60 caractères maximum) */
  seoTitle: string;
  /** meta description (160 caractères maximum) */
  seoDescription: string;
  kicker: string;
  h1: string;
  lead: string;
  /** Trois points courts dans le bandeau d'en-tête */
  highlights: string[];
  audience: string[];
  deliverables: OfferDeliverable[];
  stack: string;
  /** Étapes propres à l'offre ; sans cette liste, la page affiche la méthode web standard (MethodSteps) */
  steps?: OfferStep[];
  faq: OfferFaq[];
  /** Guides liés (slugs de src/data/guides.ts) */
  relatedGuides: string[];
  schema: { name: string; serviceType: string };
}

const link = (id: OfferId) => OFFER_LINKS.find((o) => o.id === id)!;

export const OFFERS: Offer[] = [
  {
    ...link("application-mobile"),
    pole: "web",
    serviceParam: "web",
    seoTitle: "Création d'application mobile iOS & Android | RAMSIN",
    seoDescription:
      "Développeur d'application mobile iOS & Android (React Native), Paris et Île-de-France. De l'idée aux stores, code cédé à 100 %. 30 min de cadrage offertes.",
    kicker: "Application mobile iOS & Android",
    h1: "Créez votre application mobile, publiée sur l'App Store et Google Play",
    lead:
      "Vous avez une idée d'application, un service à mettre dans la poche de vos clients ou un outil pour vos équipes sur le terrain ? RAMSIN conçoit et développe votre application iOS et Android avec une seule base de code (React Native), la publie sur les stores et vous en cède l'intégralité.",
    highlights: ["Une seule base de code pour iOS & Android", "Publication sur les stores incluse", "Code source et comptes à votre nom"],
    audience: [
      "Porteurs de projet qui lancent un service mobile : réservation, livraison, marketplace, communauté",
      "Commerces et marques qui veulent fidéliser leurs clients avec une application à leur nom",
      "Entreprises qui équipent leurs équipes terrain : saisie, suivi, photos, fonctionnement hors-ligne",
      "Startups qui ont besoin d'une première version solide pour convaincre utilisateurs et investisseurs",
    ],
    deliverables: [
      {
        title: "Une application iOS et Android",
        text: "Une seule base de code React Native pour les deux plateformes : moins coûteuse à développer et à faire évoluer que deux applications natives, avec une expérience fluide.",
      },
      {
        title: "La publication sur les stores",
        text: "Nous préparons et publions votre application sur l'App Store et Google Play, puis nous gérons les exigences d'Apple et de Google à chaque mise à jour.",
      },
      {
        title: "Les fonctions du téléphone",
        text: "Notifications push, caméra, géolocalisation, paiement intégré, fonctionnement hors-ligne et synchronisation : selon ce que votre usage demande.",
      },
      {
        title: "Un back-office et une API",
        text: "Pour administrer vos contenus, vos utilisateurs et vos commandes : tableau de bord web, API sécurisée (Node.js, PostgreSQL) et comptes à votre nom.",
      },
      {
        title: "La pleine propriété",
        text: "Code source, comptes développeur Apple et Google, hébergement et nom de domaine sont cédés à 100 %, sans abonnement captif.",
      },
      {
        title: "Garantie et suivi après lancement",
        text: "30 jours de garantie inclus, puis hébergement, maintenance, mises à jour sur les stores et évolutions si vous le souhaitez.",
      },
    ],
    stack: "React Native, Expo, TypeScript, Node.js, PostgreSQL, notifications push, Stripe",
    faq: [
      {
        q: "Faut-il une application native ou React Native ?",
        a: "Pour la grande majorité des projets, React Native donne une application fluide et une seule base de code pour iOS et Android, donc des délais et un budget réduits. Le natif pur se justifie pour des besoins très spécifiques (3D, traitement vidéo lourd). Nous en parlons au cadrage.",
      },
      {
        q: "Combien de temps pour mettre une application sur les stores ?",
        a: "Après le cadrage, nous fixons un calendrier précis. Vous testez une nouvelle version chaque semaine sur votre téléphone. La validation par Apple et Google prend ensuite de quelques heures à quelques jours.",
      },
      {
        q: "Dois-je créer les comptes Apple et Google moi-même ?",
        a: "Nous les créons avec vous, à votre nom : vous restez propriétaire de votre application sur les stores. Nous gérons ensuite les publications.",
      },
      {
        q: "Et si je n'ai pas de cahier des charges ?",
        a: "C'est le cas de la plupart de nos clients. L'échange de 30 minutes offert sert à poser le périmètre : fonctionnalités prioritaires, étapes, calendrier. Vous repartez avec un plan clair.",
      },
      {
        q: "Que se passe-t-il après la mise en ligne ?",
        a: "30 jours de garantie sont inclus. Ensuite, nous pouvons assurer l'hébergement, la maintenance, les mises à jour sur les stores et les évolutions. Votre groupe WhatsApp reste ouvert.",
      },
    ],
    relatedGuides: ["cahier-des-charges-application", "application-native-react-native-ou-web"],
    schema: { name: "Création d'application mobile iOS & Android", serviceType: "Développement d'applications mobiles" },
  },
  {
    ...link("application-web"),
    pole: "web",
    serviceParam: "web",
    seoTitle: "Développement d'application web & SaaS sur-mesure | RAMSIN",
    seoDescription:
      "Application web, SaaS, portail client ou outil métier sur-mesure (Next.js, Node.js). Code cédé à 100 %, démos chaque semaine. Paris, Île-de-France et à distance.",
    kicker: "Application web & logiciel SaaS",
    h1: "Une application web sur-mesure qui fait tourner votre activité",
    lead:
      "Portail client, espace membres, tableau de bord de gestion, logiciel SaaS vendu par abonnement ou outil interne qui remplace vos fichiers Excel : nous concevons des applications web rapides, sécurisées et pensées pour vos utilisateurs, avec Next.js et TypeScript.",
    highlights: ["Accessible partout, sans installation", "Comptes, rôles et données sécurisés", "Code documenté et cédé à 100 %"],
    audience: [
      "Entreprises qui veulent remplacer des tableurs et des échanges d'e-mails par un outil fiable",
      "Fondateurs qui lancent un logiciel en ligne (SaaS) vendu par abonnement",
      "Organisations qui ont besoin d'un portail ou d'un espace client sécurisé",
      "Équipes qui veulent automatiser un flux métier : devis, suivi, exports, relances",
    ],
    deliverables: [
      {
        title: "Une application rapide, accessible partout",
        text: "Ordinateur, tablette, téléphone : une interface claire qui charge instantanément, sans rien installer.",
      },
      {
        title: "Comptes, rôles et sécurité",
        text: "Authentification sécurisée, gestion des rôles (administrateur, client, collaborateur) et protection de vos données.",
      },
      {
        title: "L'automatisation de vos flux",
        text: "Exports, notifications, relances, génération de documents, connexion à vos outils existants : tout ce qui vous fait perdre du temps aujourd'hui.",
      },
      {
        title: "Paiements et abonnements",
        text: "Intégration Stripe pour les paiements ponctuels ou récurrents, factures et gestion des abonnements.",
      },
      {
        title: "Un code propre, documenté et cédé",
        text: "Next.js, TypeScript, Node.js, PostgreSQL : des technologies pérennes, un dépôt à votre nom et une documentation pour reprendre le projet à tout moment.",
      },
      {
        title: "Hébergement et maintenance",
        text: "Mise en ligne sur une infrastructure moderne (Vercel, AWS ou votre serveur), surveillance, sauvegardes et évolutions.",
      },
    ],
    stack: "Next.js 15, React, TypeScript, Node.js, PostgreSQL, Prisma, Stripe",
    faq: [
      {
        q: "Application web ou logiciel à installer ?",
        a: "Une application web se met à jour pour tout le monde en même temps, s'utilise depuis n'importe quel appareil et ne demande aucune installation. C'est le bon choix dans la quasi-totalité des cas métier.",
      },
      {
        q: "Pouvez-vous reprendre un outil existant ?",
        a: "Oui, après un audit du code et de l'hébergement. Nous vous disons franchement s'il vaut mieux le faire évoluer ou le reconstruire.",
      },
      {
        q: "Mes données sont-elles en sécurité ?",
        a: "Chiffrement des échanges, authentification robuste, sauvegardes régulières et hébergement en Europe sur demande. Les bonnes pratiques sont appliquées dès la conception.",
      },
      {
        q: "Comment se passe la mise en ligne ?",
        a: "Nous déployons sur votre compte d'hébergement, configurons le nom de domaine et le certificat SSL, puis nous vous formons à l'administration de l'outil.",
      },
      {
        q: "Et si je n'ai pas de cahier des charges ?",
        a: "L'échange de 30 minutes offert sert justement à poser le périmètre d'une première version utile, les étapes et le calendrier. Vous validez ensuite des écrans, jamais du code.",
      },
    ],
    relatedGuides: ["cahier-des-charges-application", "application-native-react-native-ou-web"],
    schema: { name: "Développement d'application web & SaaS sur-mesure", serviceType: "Développement d'applications web" },
  },
  {
    ...link("site-ecommerce"),
    pole: "web",
    serviceParam: "web",
    seoTitle: "Création de site internet & e-commerce sur-mesure | RAMSIN",
    seoDescription:
      "Site vitrine ou boutique en ligne sur-mesure (Next.js, Stripe) : rapide, bien référencé, à votre nom. Paris, Val-de-Marne, Île-de-France. 30 min offertes.",
    kicker: "Site vitrine & boutique en ligne",
    h1: "Un site internet qui transforme vos visiteurs en clients",
    lead:
      "Un site vitrine qui génère des demandes de devis ou une boutique en ligne qui vend : nous concevons des sites sur-mesure, rapides, bien référencés et pensés pour convertir, sans abonnement captif ni thème générique.",
    highlights: ["Conçu pour convertir", "Rapide et bien référencé", "Nom de domaine et hébergement à votre nom"],
    audience: [
      "Artisans, commerçants, restaurateurs et indépendants qui veulent être trouvés et contactés",
      "Marques qui lancent une boutique en ligne avec paiement par carte et PayPal",
      "Entreprises dont le site actuel est lent, daté ou n'apporte aucune demande",
      "Créateurs qui veulent une image premium et un site qui leur appartient",
    ],
    deliverables: [
      {
        title: "Un site pensé pour convertir",
        text: "Structure, textes et appels à l'action travaillés pour que le visiteur comprenne votre offre en quelques secondes et vous contacte.",
      },
      {
        title: "Rapide et bien référencé",
        text: "Chargement instantané et SEO technique soigné dès la conception (balises, données structurées, sitemap, pages dédiées) : les bases pour remonter sur Google.",
      },
      {
        title: "Une boutique en ligne complète",
        text: "Catalogue, variantes, configurateur si besoin, paiement Stripe et PayPal, suivi de commande et e-mails automatiques.",
      },
      {
        title: "Une administration simple",
        text: "Vous modifiez vos contenus et vos produits vous-même, après une formation incluse à la livraison.",
      },
      {
        title: "Un design sur-mesure, responsive",
        text: "Une identité à vous, lisible sur téléphone, tablette et ordinateur, sans thème acheté ni abonnement à une plateforme.",
      },
      {
        title: "Site cédé, hébergement assuré",
        text: "Nom de domaine, hébergement, certificat SSL et e-mails professionnels à votre nom ; maintenance et évolutions si vous le souhaitez.",
      },
    ],
    stack: "Next.js, React, Tailwind CSS, Stripe Checkout, PayPal, Vercel",
    faq: [
      {
        q: "Pourquoi un site sur-mesure plutôt que Wix ou Shopify ?",
        a: "Un site sur-mesure est plus rapide, mieux référencé et entièrement à vous : pas d'abonnement mensuel à une plateforme, pas de limites de thème, et il évolue librement. Pour un simple test, une plateforme peut suffire : nous vous le dirons.",
      },
      {
        q: "Mon site sera-t-il bien référencé sur Google ?",
        a: "Le site est construit avec les bonnes bases techniques : vitesse, balises, données structurées, sitemap, pages dédiées. Le référencement se travaille ensuite avec des contenus réguliers et une fiche Google Business ; nous vous guidons.",
      },
      {
        q: "Puis-je modifier mon site moi-même ?",
        a: "Oui. Une formation est incluse à la livraison, et vous gardez la main sur vos textes, vos images et vos produits.",
      },
      {
        q: "Combien de temps faut-il ?",
        a: "Un site vitrine se livre en quelques semaines, une boutique un peu plus selon le catalogue et les options. Le calendrier précis est fixé au cadrage, puis vous suivez l'avancement chaque semaine.",
      },
    ],
    relatedGuides: ["site-vitrine-ou-boutique-en-ligne", "cahier-des-charges-application"],
    schema: { name: "Création de site internet & e-commerce", serviceType: "Conception de sites web et boutiques en ligne" },
  },
];

export const getOffer = (id: OfferId): Offer => OFFERS.find((o) => o.id === id)!;
