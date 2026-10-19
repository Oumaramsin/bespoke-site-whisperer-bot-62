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
  metric?: {
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
}

export const PROJECTS_DATA: Project[] = [
  {
    id: "dabari",
    client: "Dabari",
    headline: "Une marketplace web & mobile qui sécurise les commandes de la diaspora",
    results: [
      "-80 % de litiges de commande",
      "Devis calculés automatiquement en temps réel",
      "Suivi des envois GP en 5 étapes",
    ],
    imageBg: "#f8fafd",
    title: "Dabari - Plateforme Web & Mobile Traiteur & GP",
    clientCompany: "Dabari Marketplace",
    period: "2024 - 2026",
    category: "fullstack",
    categoryLabel: "Plateforme Web & Mobile",
    pole: "web",
    summary: "Conception intégrale d'une marketplace web & mobile connectant la diaspora africaine aux traiteurs de proximité et au transport collaboratif GP.",
    context: "Digitaliser et sécuriser les commandes de restauration africaine authentique et les envois de bagages internationaux vers l'Afrique de l'Ouest.",
    problem: "Prise de commande informelle par réseaux sociaux entraînant des erreurs récurrentes, des retards d'expédition et une absence totale de traçabilité.",
    ramsinRole: "Lead Développeur Full-Stack & Architecte Solution (Cadrage, UI/UX, Backend Express, Frontend Next.js 15 et Mobile React Native Expo).",
    solution: "Plateforme tout-en-un avec devis automatisés, validation d'adresses, timeline de suivi en 5 étapes et paiements Stripe sécurisés.",
    impact: "Sécurisation des paiements, génération instantanée de devis et gain de temps substantiel sur la gestion manuelle des commandes.",
    shortProblem: "Commandes et devis gérés par messagerie informelle sans traçabilité ni paiement sécurisé.",
    shortSolution: "Marketplace Next.js 15 & application mobile Expo avec calcul de devis temps réel et Stripe.",
    shortImpact: "-80 % de litiges de commande, suivi GP en 5 étapes et environ 6 h de gestion manuelle gagnées par semaine.",
    metric: {
      value: "-80%",
      label: "de litiges de commande"
    },
    targetAudience: "Diaspora Africaine, Traiteurs Indépendants, Voyageurs GP",
    deliverables: [
      "Application Web Next.js 15 (App Router, Tailwind CSS, TypeScript)",
      "Application Mobile native iOS & Android (React Native, Expo SDK 54)",
      "Serveur REST Express TypeScript avec ORM Prisma et PostgreSQL",
      "Système de notifications transactionnelles par emails (Resend)",
      "Cession intégrale du code source et documentation technique"
    ],
    tasks: [
      "Cadrage fonctionnel et modélisation de la base de données relationnelle (11 tables)",
      "Développement de l'API REST avec sécurité JWT et contrôle RBAC",
      "Déploiement conteneurisé Docker et infrastructure cloud haute disponibilité"
    ],
    tags: ["Next.js 15", "React Native", "TypeScript", "Node.js", "PostgreSQL", "Prisma", "Docker"],
    stack: ["Next.js 15", "React Native / Expo", "Node.js", "PostgreSQL Prisma", "Docker"],
    featured: true,
    image: "/images/projects/dabari.webp"
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
    categoryLabel: "E-Commerce Sur-Mesure",
    pole: "web",
    summary: "Création d'une boutique e-commerce haut de gamme d'artisanat traditionnel avec configurateur de mensurations sur-mesure et double passerelle de paiement.",
    context: "Digitaliser les ventes d'une maison d'artisanat d'art à destination d'une clientèle internationale exigeante.",
    problem: "Prise de mensurations manuelle par messagerie provoquant des erreurs de confection à l'atelier et freinant l'expansion des ventes.",
    ramsinRole: "Développeur Full-Stack & Designer UX/UI (Conception du configurateur, intégration Stripe/PayPal et espace client sécurisé).",
    solution: "Développement d'un configurateur interactif calculant automatiquement les proportions d'atelier, adossé à une boutique Next.js 15 haute performance.",
    impact: "Automatisation du calcul des mensurations d'atelier, suppression des échanges manuels par messagerie et simplification du parcours d'achat international.",
    shortProblem: "Prise de mensurations manuelle par chat avec risque élevé d'erreurs de coupe à l'atelier.",
    shortSolution: "Configurateur interactif de mensurations, boutique Next.js 15 luxe et paiement Stripe / PayPal.",
    shortImpact: "100% des mensurations calculées sans friction et expansion des commandes à l'international.",
    metric: {
      value: "100%",
      label: "mensurations automatisées"
    },
    targetAudience: "Clients B2C Luxe, Artisans Couturiers, Gestionnaires",
    deliverables: [
      "Configurateur interactif de mensurations avec calcul d'atelier automatique",
      "Tunnel d'achat sécurisé par Carte Bancaire (Stripe) et PayPal",
      "Espace client avec timeline de suivi de confection en direct",
      "Panneau d'administration complet pour les stocks, commandes et factures"
    ],
    tasks: [
      "Design épuré et responsive aux standards du luxe",
      "Optimisation des Core Web Vitals pour un chargement sous 1 seconde",
      "Cession intégrale du code source et formation à l'administration"
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
      "x3 demandes de devis pré-qualifiées",
      "Demandes complètes (date, convives, menu) reçues par email",
      "Référencement local en Île-de-France",
    ],
    imageBg: "#09090b",
    imagePosition: "left top",
    title: "L'Éclat du Chef - Vitrine Traiteur & Devis Express",
    clientCompany: "L'Éclat du Chef (Île-de-France)",
    period: "2024",
    category: "ecommerce-web",
    categoryLabel: "Site Vitrine & Devis Express",
    pole: "web",
    summary: "Conception et mise en ligne du site vitrine d'un traiteur événementiel haut de gamme (mariages, séminaires, buffets d'entreprise).",
    context: "Professionnaliser l'image de marque et automatiser la réception des demandes de devis d'événements privés et corporatifs.",
    problem: "Site vieillissant et non adapté aux smartphones, entraînant la perte de prospects qualifiés et une surcharge d'appels téléphoniques.",
    ramsinRole: "Concepteur & Développeur Web (Refonte graphique, intégration SEO locale et formulaire de devis dynamique).",
    solution: "Site vitrine moderne Noir & Or avec consultation des menus, galerie photos haute résolution et simulateur de devis connecté directement à l'email du chef.",
    impact: "Réception de demandes de devis complètes et pré-qualifiées directement par email, éliminant les pertes de contacts de l'ancien site.",
    shortProblem: "Site obsolète sur mobile et absence de tunnel de pré-qualification pour les devis traiteur.",
    shortSolution: "Site vitrine haute conversion Noir & Or avec simulateur d'estimation et envoi d'email instantané.",
    shortImpact: "Demandes de devis 100% complètes (date, convives, menu) reçues directement par email.",
    metric: {
      value: "x3",
      label: "devis pré-qualifiés reçus"
    },
    targetAudience: "Entreprises, Organisateurs de Mariages, Particuliers",
    deliverables: [
      "Site vitrine ultra-rapide optimisé mobile, tablette et desktop",
      "Formulaire de demande de devis événementiel qualifiant (nombre d'invités, date, menu)",
      "Visionneuse interactive des réalisations et menus téléchargeables",
      "Référencement SEO local (Google Maps et recherche traiteur Île-de-France)"
    ],
    tasks: [
      "Optimisation des temps de chargement pour un affichage instantané",
      "Configuration du nom de domaine professionnel et des boîtes e-mails",
      "Mise en place des balises de suivi et conformité RGPD"
    ],
    tags: ["Développement Web", "SEO Local", "Lead Generation", "Haute Performance", "Responsive"],
    stack: ["HTML5 / Modern JS", "Tailwind CSS", "API Devis Express", "SEO Local", "Hébergement Cloud"],
    featured: true,
    logo: "/logos/eclat-du-chef.png",
    image: "/images/projects/eclat-du-chef.webp"
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
    categoryLabel: "Cartographie & Gouvernance SI",
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
    metric: {
      value: "100%",
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
    categoryLabel: "Architecture Solution & DAT",
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
    metric: {
      value: "100%",
      label: "DAT validés"
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
    logo: "/logos/banque-postale.png",
    image: "/images/projects/lbp-preview.webp"
  }
];
