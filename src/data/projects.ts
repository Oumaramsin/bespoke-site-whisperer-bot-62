export interface Project {
  id: string;
  title: string;
  clientCompany: string;
  period: string;
  category: "fullstack" | "ecommerce-web" | "mega-hopex" | "architecture-si";
  categoryLabel: string;
  pole: "si" | "web";
  summary: string;
  context: string;
  problem: string;
  ramsinRole: string;
  solution: string;
  impact: string;
  targetAudience?: string;
  deliverables: string[];
  tasks: string[];
  tags: string[];
  stack: string[];
  featured?: boolean;
  logo?: string;
  image?: string;
  /** Fait vérifiable mis en avant sur la carte (ce qui a été livré), jamais un résultat chiffré que l'on ne peut pas prouver */
  highlight?: {
    value: string;
    label: string;
  };
  shortProblem?: string;
  shortSolution?: string;
  shortImpact?: string;
  /** Nom court affiché sur les cartes (ex. « Dabari ») */
  client: string;
  /** Promesse orientée résultat, lisible en une ligne */
  headline: string;
  /** Trois résultats clés, du plus parlant au plus technique */
  results: string[];
  /** Visuel d'illustration (livrables clients confidentiels) plutôt qu'une capture réelle */
  imageIllustrative?: boolean;
  /** Couleur de fond derrière la capture */
  imageBg?: string;
  /** Point d'ancrage de la capture recadrée (object-position CSS), « top » par défaut */
  imagePosition?: string;
  /** Adresse du projet en ligne, que le visiteur peut vérifier lui-même (seulement si le site est public) */
  liveUrl?: string;
}

/** « https://www.dabari.fr » → « dabari.fr » */
export const liveHost = (url: string) => new URL(url).hostname.replace(/^www\./, "");

export const PROJECTS_DATA: Project[] = [
  {
    id: "dabari",
    client: "Dabari",
    headline: "Une marketplace web & mobile qui sécurise les commandes de la diaspora",
    results: [
      "Application web, iOS et Android livrées",
      "Devis calculés automatiquement en temps réel",
      "Suivi des envois GP en 5 étapes",
    ],
    imageBg: "#f8fafd",
    title: "Dabari - Plateforme Web & Mobile Traiteur & GP",
    clientCompany: "Dabari Marketplace",
    period: "2024 - 2026",
    category: "fullstack",
    categoryLabel: "Plateforme web & mobile",
    pole: "web",
    summary: "Conception intégrale d'une marketplace web & mobile connectant la diaspora africaine aux traiteurs de proximité et au transport collaboratif GP.",
    context: "Digitaliser et sécuriser les commandes de restauration africaine authentique et les envois de bagages internationaux vers l'Afrique de l'Ouest.",
    problem: "Prise de commande informelle par réseaux sociaux entraînant des erreurs récurrentes, des retards d'expédition et une absence totale de traçabilité.",
    ramsinRole: "Conception et développement de bout en bout : cadrage, design, site web, application mobile et serveur.",
    solution: "Une plateforme unique : devis calculés automatiquement, adresses vérifiées, suivi des envois en 5 étapes et paiement en ligne sécurisé.",
    impact: "Paiements sécurisés, devis générés instantanément et gestion des commandes centralisée, sans échanges manuels.",
    shortProblem: "Commandes et devis gérés par messagerie informelle sans traçabilité ni paiement sécurisé.",
    shortSolution: "Un site et une application mobile qui calculent les devis en temps réel et encaissent les paiements en ligne.",
    shortImpact: "Paiements sécurisés, devis calculés automatiquement et suivi des envois GP en 5 étapes.",
    highlight: {
      value: "Web, iOS & Android",
      label: "livrés, code cédé"
    },
    targetAudience: "Diaspora africaine, traiteurs indépendants, voyageurs GP",
    deliverables: [
      "Le site web de la plateforme",
      "L'application mobile pour iPhone et Android",
      "Le serveur et la base de données qui font tourner les deux",
      "Les e-mails automatiques de confirmation et de suivi",
      "Le code source et sa documentation, cédés au client"
    ],
    tasks: [
      "Cadrage des besoins et conception de la base de données",
      "Comptes utilisateurs sécurisés, avec des droits adaptés à chaque profil",
      "Mise en ligne sur une infrastructure fiable, facile à faire évoluer"
    ],
    tags: ["Next.js 15", "React Native", "TypeScript", "Node.js", "PostgreSQL", "Prisma", "Docker"],
    stack: ["Next.js 15", "React Native / Expo", "Node.js", "PostgreSQL Prisma", "Docker"],
    featured: true,
    image: "/images/projects/dabari.webp",
    liveUrl: "https://www.dabari.fr"
  },
  {
    id: "maison-hamdiwashukri",
    client: "Maison HamdiWaShukri",
    headline: "Une boutique de luxe qui calcule les mesures sur-mesure à la place de l'atelier",
    results: [
      "100 % des mensurations calculées automatiquement",
      "Paiement par carte (Stripe) et PayPal",
      "Suivi de confection en direct pour chaque client",
    ],
    imageBg: "#f9f9f9",
    title: "Maison HamdiWaShukri - E-Commerce Luxe & Sur-Mesure",
    clientCompany: "Maison HamdiWaShukri",
    period: "2024 - 2025",
    category: "fullstack",
    categoryLabel: "E-commerce sur-mesure",
    pole: "web",
    summary: "Création d'une boutique e-commerce haut de gamme d'artisanat traditionnel avec configurateur de mensurations sur-mesure et double passerelle de paiement.",
    context: "Digitaliser les ventes d'une maison d'artisanat d'art à destination d'une clientèle internationale exigeante.",
    problem: "Prise de mensurations manuelle par messagerie provoquant des erreurs de confection à l'atelier et freinant l'expansion des ventes.",
    ramsinRole: "Design et développement complet : configurateur de mesures, paiement en ligne et espace client.",
    solution: "Un configurateur qui calcule automatiquement les mesures pour l'atelier, intégré à une boutique en ligne rapide.",
    impact: "Automatisation du calcul des mensurations d'atelier, suppression des échanges manuels par messagerie et simplification du parcours d'achat international.",
    shortProblem: "Prise de mensurations manuelle par chat avec risque élevé d'erreurs de coupe à l'atelier.",
    shortSolution: "Un configurateur de mesures, une boutique en ligne et le paiement par carte ou PayPal.",
    shortImpact: "100 % des mensurations calculées automatiquement et un parcours d'achat simplifié pour la clientèle internationale.",
    highlight: {
      value: "Mensurations",
      label: "calculées automatiquement"
    },
    targetAudience: "Clientèle haut de gamme, couturiers de l'atelier, gestionnaires",
    deliverables: [
      "Un configurateur qui calcule les mesures pour l'atelier",
      "Le paiement sécurisé par carte bancaire ou PayPal",
      "Un espace client pour suivre la confection en direct",
      "Un espace de gestion des stocks, des commandes et des factures"
    ],
    tasks: [
      "Un design épuré, adapté au téléphone comme à l'ordinateur",
      "Des pages qui s'affichent en moins d'une seconde",
      "Le code source cédé et une formation pour gérer la boutique"
    ],
    tags: ["Next.js 15", "React 19", "TypeScript", "Stripe Checkout", "PayPal API", "PostgreSQL"],
    stack: ["Next.js 15", "React 19", "TypeScript", "Stripe", "PayPal", "PostgreSQL"],
    featured: true,
    image: "/images/projects/hamdiwashukri.webp"
  },
  {
    id: "leclat-du-chef",
    client: "L'Éclat du Chef",
    headline: "Un site vitrine qui transforme les visiteurs en demandes qualifiées",
    results: [
      "Site vitrine rapide, optimisé mobile",
      "Demandes complètes (date, convives, menu) reçues par email",
      "Référencement local en Île-de-France",
    ],
    imageBg: "#09090b",
    imagePosition: "left top",
    title: "L'Éclat du Chef - Vitrine Traiteur & Devis Express",
    clientCompany: "L'Éclat du Chef (Île-de-France)",
    period: "2024",
    category: "ecommerce-web",
    categoryLabel: "Site vitrine & devis express",
    pole: "web",
    summary: "Conception et mise en ligne du site vitrine d'un traiteur événementiel haut de gamme (mariages, séminaires, buffets d'entreprise).",
    context: "Professionnaliser l'image de marque et automatiser la réception des demandes de devis d'événements privés et corporatifs.",
    problem: "Site vieillissant et non adapté aux smartphones, entraînant la perte de prospects qualifiés et une surcharge d'appels téléphoniques.",
    ramsinRole: "Conception et développement du site : nouveau design, référencement local et formulaire de devis.",
    solution: "Un site vitrine noir et or avec les menus, une galerie photo et un formulaire de devis qui arrive directement dans la boîte mail du chef.",
    impact: "Réception de demandes de devis complètes et pré-qualifiées directement par e-mail, sans ressaisie ni relance.",
    shortProblem: "Un site dépassé sur mobile et aucun moyen de recevoir des demandes de devis complètes.",
    shortSolution: "Un site vitrine noir et or avec estimation de devis, envoyée aussitôt par e-mail.",
    shortImpact: "Des demandes de devis complètes (date, convives, menu) reçues directement par e-mail.",
    highlight: {
      value: "Devis qualifiés",
      label: "reçus directement par e-mail"
    },
    targetAudience: "Entreprises, organisateurs de mariages, particuliers",
    deliverables: [
      "Un site rapide, adapté au téléphone, à la tablette et à l'ordinateur",
      "Un formulaire de devis qui demande la date, le nombre d'invités et le menu",
      "Une galerie des réalisations et des menus à télécharger",
      "Un référencement local, sur Google Maps et les recherches « traiteur Île-de-France »"
    ],
    tasks: [
      "Des pages qui s'affichent tout de suite",
      "Le nom de domaine et les adresses e-mail professionnelles",
      "La mesure d'audience et la mise en conformité RGPD"
    ],
    tags: ["Développement Web", "SEO Local", "Lead Generation", "Haute Performance", "Responsive"],
    stack: ["HTML5 / Modern JS", "Tailwind CSS", "API Devis Express", "SEO Local", "Hébergement Cloud"],
    featured: true,
    logo: "/logos/eclat-du-chef.webp",
    image: "/images/projects/eclat-du-chef.webp",
    liveUrl: "https://www.leclatduchef.fr"
  },
  {
    id: "covea-hopex-v5",
    client: "Covéa",
    headline: "Une cartographie SI fiable pour arbitrer la transformation d'un grand groupe d'assurance",
    results: [
      "Référentiel fiabilisé et validé en comités d'architecture",
      "Doublons et flux obsolètes assainis",
      "Contrôle qualité hebdomadaire du référentiel",
    ],
    imageIllustrative: true,
    imageBg: "#f1f5f9",
    title: "Gouvernance & Cartographie SI MEGA HOPEX",
    clientCompany: "COVEA (MAAF, MMA, GMF)",
    period: "Juin 2023 - Présent",
    category: "mega-hopex",
    categoryLabel: "Cartographie & gouvernance SI",
    pole: "si",
    summary: "Pilotage et fiabilisation de la cartographie du Système d'Information transverse sur la plateforme MEGA HOPEX V5 au sein d'un grand groupe d'assurance.",
    context: "La DSI du groupe Covéa gère un patrimoine de plusieurs centaines d'applications métiers critiques pour les marques MAAF, MMA et GMF.",
    problem: "Référentiel cartographique complexe avec risques de doublons logiciels, flux inter-applicatifs non documentés et manque de visibilité transverse pour les arbitrages de transformation.",
    ramsinRole: "Consultant Architecte SI & Référent MEGA HOPEX V5, intégré aux équipes d'urbanisation de la DSI.",
    solution: "Refonte et enrichissement continu de la cartographie (applications, flux, socles technologiques), contrôle qualité hebdomadaire et automatisation de la gouvernance des métamodèles.",
    impact: "Cartographie transverse fiabilisée et validée en comités d'architecture, élimination des redondances et meilleure lisibilité pour les arbitrages de la DSI.",
    shortProblem: "Patrimoine de centaines d'applications avec doublons logiciels et flux inter-applicatifs non tracés.",
    shortSolution: "Gouvernance et cartographie applicative sous MEGA HOPEX V5 avec contrôle qualité hebdomadaire.",
    shortImpact: "Cartographies fiabilisées, arbitrage d'architecture éclairé et flux redondants assainis.",
    highlight: {
      value: "HOPEX V5",
      label: "référentiel fiabilisé"
    },
    deliverables: [
      "Cartographie applicative interactive et diagrammes de flux d'échanges",
      "Rapports hebdomadaires de complétude et qualité du référentiel SI",
      "Documentation d'architecture standardisée pour les architectes solutions",
      "Assainissement des métamodèles et élimination des flux obsolètes"
    ],
    tasks: [
      "Collaboration étroite avec les architectes de domaine et responsables d'applications",
      "Contrôle qualité rigoureux et résolution des anomalies cartographiques",
      "Accompagnement méthodologique des équipes sur les bonnes pratiques HOPEX V5"
    ],
    tags: ["MEGA HOPEX V5", "Cartographie SI", "Urbanisation", "Gouvernance Données", "UML"],
    stack: ["MEGA HOPEX V5", "Métamodélisation", "Cartographie SI", "Gouvernance d'Entreprise"],
    featured: true,
    logo: "/logos/covea.png",
    image: "/images/projects/covea-preview.webp"
  },
  {
    id: "lbp-architecture-solution",
    client: "La Banque Postale",
    headline: "Des dossiers d'architecture validés pour moderniser le crédit immobilier",
    results: [
      "DAT validés en Design Authority",
      "Flux avec le SI historique sécurisés",
      "Calendrier projet respecté",
    ],
    imageIllustrative: true,
    imageBg: "#ffffff",
    title: "Cadrage d'Architecture Solution & Crédit Immobilier",
    clientCompany: "La Banque Postale (via Marte)",
    period: "Septembre 2022 - Mai 2023",
    category: "architecture-si",
    categoryLabel: "Architecture solution & DAT",
    pole: "si",
    summary: "Cadrage d'architecture applicative et technique pour les projets de transformation digitale du Crédit Immobilier au sein d'un SI bancaire régulé.",
    context: "Moderniser le parcours d'octroi de crédit immobilier pour les particuliers tout en respectant les normes strictes de conformité bancaire et de sécurité.",
    problem: "Forte complexité d'interfaçage avec le SI bancaire historique (legacy) et risque de blocage lors des comités de validation d'architecture (Design Authority).",
    ramsinRole: "Consultant Architecte Solution, responsable de la rédaction et de la soutenance des Dossiers d'Architecture Technique (DAT).",
    solution: "Analyses d'impacts rigoureuses, modélisation des processus d'échange et formalisation des DAT avec validation réussie auprès des instances de gouvernance bancaire.",
    impact: "Dossiers d'Architecture Technique validés en Design Authority, sécurisation des flux bancaires et respect du calendrier projet.",
    shortProblem: "Interfaçage complexe avec le SI bancaire legacy et risques d'arbitrage négatif en comité d'architecture.",
    shortSolution: "Dossiers d'Architecture Technique (DAT) complets et analyse de conformité réglementaire.",
    shortImpact: "Validation sans réserve en Design Authority et sécurisation des flux d'octroi de crédit.",
    highlight: {
      value: "DAT validés",
      label: "en Design Authority"
    },
    deliverables: [
      "Dossiers d'Architecture Applicative et Technique (DAT) complets et validés",
      "Matrices d'impacts adhérence projets / stratégie SI globale",
      "Cartographie des processus métiers du crédit immobilier",
      "Plans d'intégration des API bancaires sécurisées"
    ],
    tasks: [
      "Soutenance technique devant les instances décisionnelles et Design Authority",
      "Coordination technique avec les Squads de développement Agile",
      "Alignement avec les référentiels de sécurité et de conformité bancaire"
    ],
    tags: ["Architecture Solution", "Banque & Finance", "DAT", "Design Authority", "Agile"],
    stack: ["Dossier d'Architecture DAT", "Architecture Solution", "MEGA HOPEX", "Design Authority"],
    featured: true,
    logo: "/logos/banque-postale.webp",
    image: "/images/projects/lbp-preview.webp"
  }
];
