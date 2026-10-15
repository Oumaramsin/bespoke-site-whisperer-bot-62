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
}

export const PROJECTS_DATA: Project[] = [
  {
    id: "covea-hopex-v5",
    title: "Gouvernance & Cartographie SI du Référentiel MEGA HOPEX",
    clientCompany: "COVEA (Assurances MAAF, MMA, GMF)",
    period: "Juin 2023 - Présent",
    category: "mega-hopex",
    categoryLabel: "Architecture SI & MEGA HOPEX",
    pole: "si",
    summary: "Pilotage et fiabilisation de la cartographie du Système d'Information transverse sur la plateforme MEGA HOPEX V5 au sein d'un grand groupe d'assurance.",
    context: "La DSI du groupe Covéa gère un patrimoine de plusieurs centaines d'applications métiers critiques pour les marques MAAF, MMA et GMF.",
    problem: "Référentiel cartographique complexe avec risques de doublons logiciels, flux inter-applicatifs non documentés et manque de visibilité transverse pour les arbitrages de transformation.",
    ramsinRole: "Consultant Architecte SI & Référent MEGA HOPEX V5, intégré aux équipes d'urbanisation de la DSI.",
    solution: "Refonte et enrichissement continu de la cartographie (applications, flux, socles technologiques), contrôle qualité hebdomadaire et automatisation de la gouvernance des métamodèles.",
    impact: "Réduction drastique des doublons applicatifs, documentation transverse 100% à jour pour les comités d'architecture et visibilité totale pour la direction.",
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
    logo: "/logos/covea.png"
  },
  {
    id: "dabari",
    title: "Dabari - Plateforme Web & Mobile Traiteur Africain & Fret GP",
    clientCompany: "Dabari (Plateforme Commerciale)",
    period: "2024 - 2026",
    category: "fullstack",
    categoryLabel: "Plateforme Web & Mobile",
    pole: "web",
    summary: "Conception intégrale d'une marketplace web & mobile connectant la diaspora africaine aux traiteurs de proximité et au transport collaboratif de colis (GP Express).",
    context: "Digitaliser et sécuriser les commandes de restauration africaine authentique et les envois de bagages internationaux vers l'Afrique de l'Ouest.",
    problem: "Prise de commande informelle par réseaux sociaux entraînant des erreurs récurrentes, des retards d'expédition et une absence totale de traçabilité.",
    ramsinRole: "Lead Développeur Full-Stack & Architecte Solution (Cadrage, UI/UX, Backend Express, Frontend Next.js 15 et Mobile React Native Expo).",
    solution: "Plateforme tout-en-un avec devis automatisés, validation d'adresses BAN/Nominatim, timeline de suivi GP en 5 étapes, système d'alertes emails et gestion des retards de vol.",
    impact: "100% des transactions sécurisées, génération instantanée de devis et plusieurs heures de gestion manuelle économisées chaque semaine pour les traiteurs.",
    targetAudience: "Diaspora Africaine, Traiteurs Indépendants, Voyageurs & Expéditeurs GP",
    deliverables: [
      "Application Web Next.js 15 (App Router, Tailwind CSS, TypeScript)",
      "Application Mobile native iOS & Android (React Native, Expo SDK 54)",
      "Serveur REST Express TypeScript avec ORM Prisma et PostgreSQL",
      "Système de notifications transactionnelles par emails (Resend)",
      "Code source 100% remis sans dépendance"
    ],
    tasks: [
      "Cadrage fonctionnel et modélisation de la base de données relationnelle (11 tables)",
      "Développement de l'API REST avec sécurité JWT et contrôle RBAC",
      "Déploiement conteneurisé Docker et infrastructure cloud haute disponibilité"
    ],
    tags: ["Next.js 15", "React Native", "TypeScript", "Node.js", "PostgreSQL", "Prisma", "Docker"],
    stack: ["Next.js 15", "React Native / Expo", "Node.js Express", "PostgreSQL Prisma", "Docker"],
    featured: true
  },
  {
    id: "lbp-architecture-solution",
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
    impact: "Projets validés dans les temps impartis par le comité de sécurité bancaire, sans surcoût d'intégration ni dette technique.",
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
    logo: "/logos/banque-postale.png"
  },
  {
    id: "maison-hamdiwashukri",
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
    impact: "Zéro erreur de coupe enregistrée à l'atelier, réduction de 80% du temps de traitement des commandes et accélération des ventes à l'international.",
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
      "Remise du code source 100% propriétaire au gérant"
    ],
    tags: ["Next.js 15", "React 19", "TypeScript", "Stripe Checkout", "PayPal API", "PostgreSQL"],
    stack: ["Next.js 15", "React 19", "TypeScript", "Stripe", "PayPal", "PostgreSQL"],
    featured: false
  },
  {
    id: "leclat-du-chef",
    title: "L'Éclat du Chef - Vitrine Traiteur & Lead Generation",
    clientCompany: "L'Éclat du Chef (Île-de-France)",
    period: "2024",
    category: "ecommerce-web",
    categoryLabel: "Site Web Haute Conversion",
    pole: "web",
    summary: "Conception et mise en ligne du site vitrine d'un traiteur événementiel haut de gamme (mariages, séminaires, buffets d'entreprise).",
    context: "Professionnaliser l'image de marque et automatiser la réception des demandes de devis d'événements privés et corporatifs.",
    problem: "Site vieillissant et non adapté aux smartphones, entraînant la perte de prospects qualifiés et une surcharge d'appels téléphoniques.",
    ramsinRole: "Concepteur & Développeur Web (Refonte graphique, intégration SEO locale et formulaire de devis dynamique).",
    solution: "Site vitrine moderne Noir & Or avec consultation des menus, galerie photos haute résolution et formulaire de devis connecté directement à l'email du chef.",
    impact: "+35% de demandes de devis qualifiées reçues dès le premier mois d'exploitation et sérénité totale pour le dirigeant.",
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
    stack: ["HTML5", "CSS3 Modern", "JavaScript ES6+", "Formulaire API", "Hébergement Cloud"],
    featured: false,
    logo: "/logos/eclat-du-chef.png"
  }
];
