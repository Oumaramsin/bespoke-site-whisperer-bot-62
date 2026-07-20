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
}

export const PROJECTS_DATA: Project[] = [
  {
    id: "dabari",
    title: "Dabari - Plateforme Traiteur Africain & Transport GP",
    clientCompany: "Dabari (Plateforme Web)",
    period: "2024 - 2025",
    category: "fullstack",
    categoryLabel: "Plateforme Fullstack Next.js",
    summary: "Plateforme web centralisée connectant la diaspora aux traiteurs africains de proximité et au transport collaboratif de colis (GP Colis).",
    context: "Digitaliser et sécuriser l'accès à la cuisine africaine artisanale et l'envoi de colis au pays par voyageurs GP Colis.",
    problem: "Les réservations de traiteurs et le transport de colis reposaient sur des groupes informels, avec un risque élevé d'erreurs et de perte de temps.",
    solution: "Création d'une plateforme web moderne réunissant les traiteurs et voyageurs GP avec gestion d'espaces sécurisés et tableaux de bord.",
    impact: "Une expérience 100% sécurisée, des devis instantanés et des heures de gestion manuelle économisées chaque semaine.",
    targetAudience: "Diaspora Africaine, Chefs & Traiteurs Indépendants, Voyageurs GP Colis",
    features: [
      "Module Traiteur : Recherche par spécialité culinaire, fiches traiteurs, menus et devis en ligne",
      "Module GP Colis : Publication de trajets (€/kg), demandes de réservation de kilos et suivi des statuts",
      "Authentification & Sessions : Connexion Email/SMS et jetons JWT sécurisés",
      "Dashboards Utilisateur & Prestataire : Suivi des commandes et notifications en temps réel"
    ],
    tasks: [
      "Architecture Frontend moderne avec Next.js 16 (React App Router)",
      "Développement de l'API REST Backend Node.js / Express en TypeScript",
      "Modélisation de la base PostgreSQL relationnelle avec Prisma ORM",
      "Conteneurisation intégrale avec Docker Compose"
    ],
    tags: ["Dabari", "Next.js 16", "React", "TypeScript", "Node.js", "Express", "PostgreSQL", "Prisma ORM", "Docker", "JWT"],
    stack: ["Next.js 16", "TypeScript", "Node.js", "PostgreSQL", "Prisma", "Docker"],
    featured: true
  },
  {
    id: "maison-hamdiwashukri",
    title: "Maison HamdiWaShukri - E-Commerce Luxe & Sur-Mesure",
    clientCompany: "Maison HamdiWaShukri",
    period: "2024 - 2025",
    category: "fullstack",
    categoryLabel: "E-Commerce Luxe Fullstack",
    summary: "Plateforme e-commerce haut de gamme d'artisanat traditionnel avec configurateur sur-mesure et paiements sécurisés.",
    context: "Allier l'authenticité de l'artisanat à une expérience d'achat de luxe avec paiement Stripe/PayPal et atelier sur-mesure.",
    problem: "Prise de mensurations complexe par messages informels, entraînant des erreurs de confection et des retards d'atelier.",
    solution: "Développement d'un configurateur sur-mesure en ligne calculant automatiquement les mensurations et majorations avec tunnel de vente Stripe/PayPal.",
    impact: "Annulation complète des erreurs de saisie, gain de temps massif et hausse directe des ventes en ligne à l'international.",
    targetAudience: "Clients B2C, Artisans & Équipe Admin",
    features: [
      "Configurateur Sur-Mesure : Saisie des mensurations (épaule, poitrine...) et calcul automatique d'atelier",
      "Double Passerelle de Paiement : Carte Bancaire via Stripe et PayPal Express Checkout",
      "Espace Client Privilège : Suivi en temps réel de l'état des commandes (En Confection, Expédié, Livré)",
      "Panel Administration : Gestion du catalogue, variantes, stocks et images HD"
    ],
    tasks: [
      "Développement Frontend Next.js 15 (React 19) avec TypeScript",
      "Backend REST API Node.js / Express écrit en TypeScript",
      "Intégration des SDK Stripe Elements et PayPal Express Checkout",
      "Déploiement conteneurisé Docker Compose"
    ],
    tags: ["Next.js 15", "React 19", "TypeScript", "Node.js", "Express", "PostgreSQL", "Prisma", "Stripe API", "PayPal API", "Docker"],
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
    problem: "Site ancien peu attractif entraînant la perte de nombreux prospects et une gestion des devis par téléphone chronophage.",
    solution: "Création d'une vitrine moderne au design Noir & Or avec formulaire de devis automatique connecté à l'email du gérant et modales PDF.",
    impact: "+35% de demandes de devis qualifiées dès le premier mois et 0% de tracas technique pour le gérant.",
    targetAudience: "Particuliers & Entreprises",
    features: [
      "Design épuré et responsive aux nuances Or / Noir / Blanc",
      "Système de Modale Interactive pour consulter et télécharger les menus PDF",
      "Galerie photos avec visionneuse Lightbox interactive",
      "Formulaire de Devis interactif connecté par API à la boîte email du gérant"
    ],
    tasks: [
      "Développement Frontend HTML5 / CSS3 Vanilla & JavaScript Natif",
      "Intégration de l'API Formspree pour la transmission sécurisée des devis sur l'email du gérant",
      "Hébergement sur GitHub Pages relié au nom de domaine officiel"
    ],
    tags: ["HTML5", "CSS3 Vanilla", "JavaScript Vanilla", "Formspree API", "GitHub Pages", "Lead Generation"],
    stack: ["HTML5", "CSS3", "JavaScript", "Formspree", "GitHub Pages"],
    featured: true
  },
  {
    id: "covea-hopex-v5",
    title: "Mission d'Architecture & Cartographie MEGA HOPEX V5",
    clientCompany: "COVEA",
    period: "Juin 2023 - Présent",
    category: "mega-hopex",
    categoryLabel: "MEGA HOPEX & Cartographie SI",
    summary: "Gestion du référentiel cartographique SI, contrôle qualité de la documentation d'architecture et accompagnement des architectes.",
    context: "Accompagner la DSI Covéa dans la gouvernance et l'enrichissement de la cartographie SI sur la plateforme MEGA HOPEX V5.",
    problem: "Referentiel applicatif complexe avec risque de doublons de logiciels et manque de visibilité transverse.",
    solution: "Enrichissement du référentiel MEGA HOPEX V5, documentation des flux et élimination des incohérences.",
    impact: "Vision claire des applications pour la DSI, réduction des coûts informatiques et zéro faille de documentation.",
    features: [
      "Cartographie des applications, flux applicatifs et socles technologiques",
      "Reporting régulier sur la qualité et la complétude du référentiel",
      "Gestion et résolution des incohérences cartographiques sur MEGA HOPEX V5"
    ],
    tasks: [
      "Amélioration de la documentation transverse sur les différents périmètres du SI",
      "Échanges réguliers avec les architectes fonctionnels et solutions"
    ],
    tags: ["MEGA HOPEX V5", "Cartographie Applicative", "Flux Applicatifs", "Qualité Référentiel", "DSI Covéa"],
    stack: ["MEGA HOPEX V5", "Cartographie SI", "UML", "Gouvernance SI"],
    featured: false
  },
  {
    id: "lbp-architecture-solution",
    title: "Cadrage d'Architecture Solution & Crédit Immobilier",
    clientCompany: "La Banque Postale (via Marte)",
    period: "Septembre 2022 - Mai 2023",
    category: "architecture-si",
    categoryLabel: "Architecture Solution & Cadrage",
    summary: "Cadrage d'architecture pour les projets de transformation digitale et cartographie des processus métiers sur le Crédit Immobilier.",
    context: "Cadrer les évolutions du SI Banque Détail / Crédit et faire valider les Dossiers d'Architecture Applicative et Technique (DAT).",
    problem: "Complexité d'intégration des projets de transformation au sein d'un SI bancaire hautement sécurisé.",
    solution: "Rédaction des DAT et passage réussi devant le comite Design Authority pour garantir la robustesse.",
    impact: "Projets bancaires validés dans les temps avec conformité totale aux normes de sécurité et de robustesse.",
    features: [
      "Rédaction des Dossiers d'Architecture Applicative et Technique (DAT)",
      "Soutenance et passage en Design Authority",
      "Cartographie des processus métiers et flux Crédit Immobilier"
    ],
    tasks: [
      "Cadrage de projets de transformation digitale et analyses d'impacts",
      "Passage en Design Authority pour validation des architectures"
    ],
    tags: ["Dossier d'Architecture (DAT)", "Design Authority", "Transformation Digitale", "Squads Agile"],
    stack: ["Architecture Solution", "DAT", "Design Authority", "MEGA HOPEX"],
    featured: false
  }
];
