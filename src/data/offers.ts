/**
 * Pages d'offre : une page dédiée par prestation, avec son propre titre, sa description, son H1 et ses données
 * structurées. Elles répondent aux recherches précises (« création application mobile », « développeur SaaS »…)
 * et servent de pages d'atterrissage aux annonces Google Ads.
 */
import type { Project } from "./projects";
import { OFFER_LINKS, type OfferId } from "./offerRoutes";
import { describeTiers } from "./pricing";

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
  /** Délais annoncés sous l'accroche (démarrage, première version, mise en ligne) */
  timing?: string;
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
  /** Études de cas montrées sur la page : seulement des projets du même type que l'offre */
  relatedProjects: string[];
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
      "Création d'application mobile iOS et Android, de l'idée à la publication sur les stores. Code à votre nom. Paris, Île-de-France. 30 min offertes.",
    kicker: "Application mobile iOS & Android",
    h1: "Créez votre application mobile, publiée sur l'App Store et Google Play",
    lead:
      "Vous avez une idée d'application, un service à mettre dans la poche de vos clients ou un outil pour vos équipes sur le terrain ? RAMSIN conçoit et développe votre application iOS et Android avec une seule base de code (React Native), la publie sur les stores et vous en cède l'intégralité.",
    timing:
      "Date de démarrage et date de mise en ligne écrites dans le devis. Une première version à tester sur votre téléphone dès la première semaine, mise en ligne en 4 à 8 semaines selon le projet.",
    highlights: ["Chaque étape payée après test", "Publication sur les stores incluse", "Code et comptes à votre nom"],
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
        title: "Un espace d'administration",
        text: "Pour gérer vos contenus, vos utilisateurs et vos commandes depuis un tableau de bord, avec des comptes à votre nom.",
      },
      {
        title: "La pleine propriété",
        text: "Code source, comptes développeur Apple et Google, hébergement et nom de domaine sont cédés à 100 %, sans abonnement captif.",
      },
      {
        title: "Garantie et suivi après lancement",
        text: "30 jours de corrections offertes, puis une maintenance mensuelle à prix fixe, sans engagement : mises à jour iOS et Android, exigences des stores, bugs corrigés sous 2 jours ouvrés.",
      },
    ],
    stack: "React Native, Expo, TypeScript, Node.js, PostgreSQL, notifications push, Stripe",
    faq: [
      {
        q: "Combien coûte une application mobile ?",
        a: `Cela dépend de la taille du projet. Ordres de prix habituels : ${describeTiers("application-mobile")}. Le prix ferme est écrit dans le devis envoyé sous 48 h, et rien n'est ajouté sans votre accord écrit. Vous payez par étapes, chacune seulement après l'avoir testée.`,
      },
      {
        q: "Vous préparez un rendez-vous avec votre banque ?",
        a: "Le devis ferme, envoyé sous 48 h, détaille le prix, les étapes et la date de mise en ligne : vous pouvez le joindre à votre dossier de financement. Une première version à tester est prête dès la première semaine après le démarrage.",
      },
      {
        q: "Que reste-t-il à payer après la mise en ligne ?",
        a: "Les comptes sont à votre nom et vous les payez directement : compte développeur Apple (99 € par an) et Google Play (25 $ une seule fois), plus l'hébergement selon l'usage de l'application. La maintenance mensuelle est facultative, sans engagement, et son prix est écrit dans le devis.",
      },
      {
        q: "Et si vous n'êtes plus disponible en cours de projet ?",
        a: "Vous n'êtes jamais bloqué. Chaque semaine, le code et une notice de reprise sont déposés sur votre propre compte, pas sur le nôtre : un autre développeur peut reprendre le projet à partir de là. Vous n'avez payé que les étapes testées, et vous pouvez arrêter à tout moment en gardant ce qui est payé.",
      },
      {
        q: "Faut-il une application native ou React Native ?",
        a: "Pour la grande majorité des projets, React Native donne une application fluide et une seule base de code pour iOS et Android, donc des délais et un budget réduits. Le natif pur se justifie pour des besoins très spécifiques (3D, traitement vidéo lourd). Nous en parlons au cadrage.",
      },
      {
        q: "Combien de temps pour mettre une application sur les stores ?",
        a: "En général 4 à 8 semaines selon le projet, à partir de la date de démarrage écrite dans le devis. Vous testez une première version dès la première semaine, puis une nouvelle chaque semaine. La date de mise en ligne est écrite dans le devis ; la validation par Apple et Google prend ensuite de quelques heures à quelques jours.",
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
        a: "30 jours de corrections sont offerts. Ensuite, vous pouvez prendre une maintenance mensuelle à prix fixe, sans engagement : mises à jour iOS et Android, exigences des stores, bugs corrigés sous 2 jours ouvrés. Son prix est écrit dans le devis. Votre groupe WhatsApp reste ouvert.",
      },
    ],
    relatedGuides: ["cahier-des-charges-application", "application-native-react-native-ou-web"],
    relatedProjects: ["dabari"],
    schema: { name: "Création d'application mobile iOS & Android", serviceType: "Développement d'applications mobiles" },
  },
  {
    ...link("application-web"),
    pole: "web",
    serviceParam: "web",
    seoTitle: "Développement d'application web sur-mesure | RAMSIN",
    seoDescription:
      "Application web, SaaS, portail client ou outil métier sur-mesure. Code à votre nom, une version à tester chaque semaine. Paris et à distance.",
    kicker: "Application web & logiciel SaaS",
    h1: "Une application web sur-mesure qui fait tourner votre activité",
    lead:
      "Portail client, espace membres, tableau de bord de gestion, logiciel SaaS vendu par abonnement ou outil interne qui remplace vos fichiers Excel : nous concevons des applications web rapides, sécurisées et pensées pour vos utilisateurs, avec Next.js et TypeScript.",
    timing:
      "Date de démarrage et date de mise en ligne écrites dans le devis. Une première version à tester dès la première semaine, mise en ligne en 4 à 8 semaines selon le projet.",
    highlights: ["Chaque étape payée après test", "Comptes, rôles et données sécurisés", "Code documenté et à votre nom"],
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
        text: "Des technologies répandues et durables, un code à votre nom et une documentation pour reprendre le projet à tout moment.",
      },
      {
        title: "Hébergement et maintenance",
        text: "Mise en ligne sur une infrastructure moderne (Vercel, AWS ou votre serveur), surveillance, sauvegardes et évolutions.",
      },
    ],
    stack: "Next.js 15, React, TypeScript, Node.js, PostgreSQL, Prisma, Stripe",
    faq: [
      {
        q: "Combien coûte une application web ?",
        a: `Cela dépend de la taille du projet. Ordres de prix habituels : ${describeTiers("application-web")}. Le prix ferme est écrit dans le devis envoyé sous 48 h, et rien n'est ajouté sans votre accord écrit. Vous payez par étapes, chacune seulement après l'avoir testée.`,
      },
      {
        q: "Vous préparez un rendez-vous avec votre banque ?",
        a: "Le devis ferme, envoyé sous 48 h, détaille le prix, les étapes et la date de mise en ligne : vous pouvez le joindre à votre dossier de financement. Une première version à tester est prête dès la première semaine après le démarrage.",
      },
      {
        q: "Que reste-t-il à payer après la mise en ligne ?",
        a: "L'hébergement et le nom de domaine sont à votre nom et vous les payez directement, selon l'usage de l'application ; si vous encaissez en ligne, Stripe prélève ses frais sur chaque paiement. La maintenance mensuelle est facultative, sans engagement, et son prix est écrit dans le devis.",
      },
      {
        q: "Et si vous n'êtes plus disponible en cours de projet ?",
        a: "Vous n'êtes jamais bloqué. Chaque semaine, le code et une notice de reprise sont déposés sur votre propre compte, pas sur le nôtre : un autre développeur peut reprendre le projet à partir de là. Vous n'avez payé que les étapes testées, et vous pouvez arrêter à tout moment en gardant ce qui est payé.",
      },
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
    relatedProjects: ["dabari", "maison-hamdiwashukri"],
    schema: { name: "Développement d'application web & SaaS sur-mesure", serviceType: "Développement d'applications web" },
  },
  {
    ...link("site-ecommerce"),
    pole: "web",
    serviceParam: "web",
    seoTitle: "Création de site internet et e-commerce | RAMSIN",
    seoDescription:
      "Site vitrine ou boutique en ligne sur-mesure : rapide, bien référencé et à votre nom. Paris, Val-de-Marne et Île-de-France. 30 min de cadrage offertes.",
    kicker: "Site vitrine & boutique en ligne",
    h1: "Un site internet qui transforme vos visiteurs en clients",
    lead:
      "Un site vitrine qui génère des demandes de devis ou une boutique en ligne qui vend : nous concevons des sites sur-mesure, rapides, bien référencés et pensés pour convertir, sans abonnement captif ni thème générique.",
    timing:
      "Date de démarrage et date de mise en ligne écrites dans le devis. Une première version à tester dès la première semaine, mise en ligne en 2 à 4 semaines pour une boutique, souvent moins pour un site vitrine.",
    highlights: ["Chaque étape payée après test", "Rapide et bien référencé", "Domaine, hébergement et code à votre nom"],
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
        q: "Combien coûte une boutique en ligne ?",
        a: `Cela dépend de la taille du projet. Ordres de prix habituels : ${describeTiers("site-ecommerce")}. Le prix ferme est écrit dans le devis envoyé sous 48 h, et vous payez par étapes, chacune seulement après l'avoir testée. Si une boutique Shopify suffit à votre projet, nous vous le disons dès le premier échange.`,
      },
      {
        q: "Vous préparez un rendez-vous avec votre banque ?",
        a: "Le devis ferme, envoyé sous 48 h, détaille le prix, les étapes et la date de mise en ligne : vous pouvez le joindre à votre dossier de financement. Une première version à tester est prête dès la première semaine après le démarrage.",
      },
      {
        q: "Que reste-t-il à payer après la mise en ligne ?",
        a: "Le nom de domaine et l'hébergement sont à votre nom et vous les payez directement ; Stripe et PayPal prélèvent leurs frais sur chaque vente, sans abonnement à une plateforme. La maintenance mensuelle est facultative, sans engagement, et son prix est écrit dans le devis.",
      },
      {
        q: "Et si vous n'êtes plus disponible en cours de projet ?",
        a: "Vous n'êtes jamais bloqué. Chaque semaine, le code et une notice de reprise sont déposés sur votre propre compte, pas sur le nôtre : un autre développeur peut reprendre le projet à partir de là. Vous n'avez payé que les étapes testées, et vous pouvez arrêter à tout moment en gardant ce qui est payé.",
      },
      {
        q: "Pourquoi un site sur-mesure plutôt que Wix ou Shopify ?",
        a: "Shopify convient pour démarrer vite avec un catalogue simple : un abonnement mensuel (à partir de 27 € par mois), des frais sur chaque paiement et des applications payantes pour aller plus loin. Le sur-mesure devient intéressant quand Shopify bloque ou coûte cher chaque mois : produits personnalisés ou configurateur, parcours de commande particulier, connexion à vos outils, ou envie de ne plus payer d'abonnement à une plateforme. Si Shopify suffit à votre projet, nous vous le disons dès le premier échange.",
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
        a: "Une boutique en ligne se met en ligne en 2 à 4 semaines à partir de la date de démarrage écrite dans le devis, un site vitrine souvent plus vite. Vous testez une première version dès la première semaine, puis chaque semaine, et la date de mise en ligne est écrite dans le devis.",
      },
    ],
    relatedGuides: ["site-vitrine-ou-boutique-en-ligne", "cahier-des-charges-application"],
    relatedProjects: ["maison-hamdiwashukri", "leclat-du-chef"],
    schema: { name: "Création de site internet & e-commerce", serviceType: "Conception de sites web et boutiques en ligne" },
  },
];

export const getOffer = (id: OfferId): Offer => OFFERS.find((o) => o.id === id)!;
