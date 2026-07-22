export interface Project {
  id: string;
  title: string;
  clientCompany: string;
  period: string;
  category: "fullstack" | "ecommerce-web" | "mega-hopex" | "architecture-si";
  categoryLabel: string;
  summary: string;
  context: string;
  problem?: string;
  solution?: string;
  impact?: string;
  targetAudience?: string;
  features: string[];
  tasks: string[];
  tags: string[];
  stack: string[];
  featured?: boolean;
  logo?: string;
}

export const PROJECTS_DATA: Project[] = [
  {
    id: "dabari",
    title: "Dabari - Plateforme Traiteur Africain & Transport GP",
    clientCompany: "Dabari (Plateforme Web)",
    period: "2024 - 2025",
    category: "fullstack",
    categoryLabel: "Plateforme Full-Stack",
    summary: "Plateforme web centralisée connectant la diaspora aux traiteurs africains de proximité et au transport collaboratif de colis (GP Colis).",
    context: "Digitaliser et sécuriser l'accès à la cuisine africaine artisanale et l'envoi de colis au pays par voyageurs GP Colis.",
    problem: "Réservations et envois de colis gérés par messages informels, avec risques d'erreurs et perte de temps considérable.",
    solution: "Plateforme tout-en-un avec espaces sécurisés traiteurs et voyageurs, devis instantanés et tableaux de bord de suivi.",
    impact: "Expérience 100% sécurisée, devis instantanés et des heures de gestion manuelle économisées chaque semaine.",
    targetAudience: "Diaspora Africaine, Chefs & Traiteurs Indépendants, Voyageurs GP Colis",
    features: [
      "Recherche de traiteurs par spécialité culinaire avec menus et demande de devis en ligne",
      "Module GP Colis : publication de trajets, réservation de kilos et suivi des statuts en temps réel",
      "Connexion sécurisée par email/SMS avec espace client personnalisé",
      "Tableaux de bord complets pour les prestataires avec notifications automatiques"
    ],
    tasks: [
      "Application web moderne avec interface fluide et rapide",
      "Serveur sécurisé avec gestion des comptes et des données",
      "Base de données relationnelle robuste et sauvegardée",
      "Infrastructure conteneurisée pour garantir la fiabilité"
    ],
    tags: ["Next.js 16", "React", "TypeScript", "Node.js", "PostgreSQL", "Prisma", "Docker"],
    stack: ["Next.js 16", "TypeScript", "Node.js", "PostgreSQL", "Prisma", "Docker"],
    featured: true
  },
  {
    id: "maison-hamdiwashukri",
    title: "Maison HamdiWaShukri - E-Commerce Luxe & Sur-Mesure",
    clientCompany: "Maison HamdiWaShukri",
    period: "2024 - 2025",
    category: "fullstack",
    categoryLabel: "E-Commerce Luxe",
    summary: "Plateforme e-commerce haut de gamme d'artisanat traditionnel avec configurateur sur-mesure et paiements sécurisés.",
    context: "Allier l'authenticité de l'artisanat à une expérience d'achat de luxe avec paiement Stripe/PayPal et atelier sur-mesure.",
    problem: "Prise de mensurations par messages informels entraînant des erreurs de confection et des retards d'atelier.",
    solution: "Configurateur sur-mesure en ligne calculant automatiquement les mensurations avec tunnel de vente sécurisé.",
    impact: "Zéro erreur de saisie, gain de temps massif et hausse directe des ventes en ligne à l'international.",
    targetAudience: "Clients B2C, Artisans & Équipe Admin",
    features: [
      "Configurateur sur-mesure : saisie des mensurations avec calcul automatique pour l'atelier",
      "Double paiement sécurisé par Carte Bancaire (Stripe) et PayPal",
      "Espace client privilège avec suivi en temps réel des commandes (En Confection → Expédié → Livré)",
      "Panel d'administration pour gérer le catalogue, les variantes, stocks et images"
    ],
    tasks: [
      "Boutique en ligne moderne avec navigation fluide et rapide",
      "Intégration des paiements sécurisés Stripe et PayPal",
      "Espace d'administration complet pour la gestion quotidienne",
      "Déploiement sécurisé et hébergement professionnel"
    ],
    tags: ["Next.js 15", "React 19", "TypeScript", "Stripe", "PayPal", "PostgreSQL", "Docker"],
    stack: ["Next.js 15", "React 19", "TypeScript", "Stripe", "PayPal", "PostgreSQL", "Docker"],
    featured: true
  },
  {
    id: "leclat-du-chef",
    title: "L'Éclat du Chef - Vitrine Digitale & Lead Generation Traiteur",
    clientCompany: "L'Éclat du Chef (Île-de-France)",
    period: "2024",
    category: "ecommerce-web",
    categoryLabel: "Site Web & Lead Generation",
    summary: "Conception et réalisation du site web vitrine haut de gamme pour un traiteur événementiel (mariages, séminaires, buffets).",
    context: "Créer une vitrine digitale élégante et optimiser la captation de devis qualifiés en ligne avec consultation de menus PDF.",
    problem: "Site ancien peu attractif causant la perte de prospects et une gestion des devis par téléphone très chronophage.",
    solution: "Vitrine moderne au design Noir & Or avec formulaire de devis automatique connecté à l'email du gérant.",
    impact: "+35% de demandes de devis qualifiées dès le premier mois et 0% de tracas technique pour le gérant.",
    targetAudience: "Particuliers & Entreprises",
    features: [
      "Design épuré et responsive aux nuances Or / Noir / Blanc",
      "Consultation et téléchargement des menus PDF directement depuis le site",
      "Galerie photos avec visionneuse interactive",
      "Formulaire de demande de devis envoyé directement dans la boîte email du gérant"
    ],
    tasks: [
      "Site web vitrine optimisé pour mobile, tablette et ordinateur",
      "Formulaire de contact intelligent connecté à l'email professionnel",
      "Hébergement fiable relié au nom de domaine officiel"
    ],
    tags: ["HTML5", "CSS3", "JavaScript", "Formulaire API", "GitHub Pages"],
    stack: ["HTML5", "CSS3", "JavaScript", "Formspree", "GitHub Pages"],
    featured: true,
    logo: "/logos/eclat-du-chef.png"
  },
  {
    id: "covea-hopex-v5",
    title: "Mission d'Architecture & Cartographie SI chez COVEA",
    clientCompany: "COVEA",
    period: "Juin 2023 - Présent",
    category: "mega-hopex",
    categoryLabel: "Cartographie SI & MEGA HOPEX",
    summary: "Gestion du référentiel cartographique SI, contrôle qualité de la documentation d'architecture et accompagnement des architectes.",
    context: "Accompagner la DSI Covéa dans la gouvernance et l'enrichissement de la cartographie SI sur la plateforme MEGA HOPEX V5.",
    problem: "Référentiel applicatif complexe avec risque de doublons de logiciels et manque de visibilité transverse sur le SI.",
    solution: "Enrichissement du référentiel, documentation des flux applicatifs et élimination des incohérences.",
    impact: "Vision claire des applications pour la DSI, réduction des coûts informatiques et zéro faille de documentation.",
    features: [
      "Cartographie complète des applications, flux et socles technologiques",
      "Reporting régulier sur la qualité et la complétude du référentiel SI",
      "Résolution des incohérences et doublons dans la cartographie"
    ],
    tasks: [
      "Amélioration de la documentation transverse sur les différents périmètres du SI",
      "Collaboration étroite avec les architectes fonctionnels et solutions"
    ],
    tags: ["MEGA HOPEX V5", "Cartographie SI", "Qualité Référentiel", "Gouvernance SI"],
    stack: ["MEGA HOPEX V5", "Cartographie SI", "UML", "Gouvernance SI"],
    featured: false,
    logo: "/logos/covea.png"
  },
  {
    id: "lbp-architecture-solution",
    title: "Cadrage d'Architecture Solution & Crédit Immobilier",
    clientCompany: "La Banque Postale (via Marte)",
    period: "Septembre 2022 - Mai 2023",
    category: "architecture-si",
    categoryLabel: "Architecture Solution & Cadrage",
    summary: "Cadrage d'architecture pour les projets de transformation digitale et cartographie des processus métiers sur le Crédit Immobilier.",
    context: "Cadrer les évolutions du SI Banque Détail / Crédit et faire valider les Dossiers d'Architecture auprès du comité de validation.",
    problem: "Complexité d'intégration des projets de transformation au sein d'un SI bancaire hautement sécurisé.",
    solution: "Rédaction des dossiers d'architecture et passage réussi devant le comité de validation pour garantir la robustesse.",
    impact: "Projets bancaires validés dans les temps avec conformité totale aux normes de sécurité et de robustesse.",
    features: [
      "Rédaction des Dossiers d'Architecture Applicative et Technique",
      "Passage et soutenance devant le comité de validation",
      "Cartographie des processus métiers et flux du Crédit Immobilier"
    ],
    tasks: [
      "Cadrage de projets de transformation digitale avec analyses d'impacts",
      "Validation des architectures auprès des instances décisionnelles"
    ],
    tags: ["Architecture Solution", "Transformation Digitale", "Dossier d'Architecture", "Agile"],
    stack: ["Architecture Solution", "DAT", "Design Authority", "MEGA HOPEX"],
    featured: false,
    logo: "/logos/banque-postale.png"
  }
];
