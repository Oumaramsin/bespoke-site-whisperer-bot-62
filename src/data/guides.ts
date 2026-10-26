/**
 * Guides pratiques (/guides/<slug>) : des réponses aux questions que se posent les porteurs de projet et les DSI
 * avant de nous contacter. Chaque guide renvoie vers l'offre correspondante et vers le cadrage de 30 min.
 * Pas de prix dans les guides : le budget se discute au cadrage.
 */
import { OFFER_LINKS, type OfferId } from "./offerRoutes";

export interface GuideSection {
  heading: string;
  paragraphs?: string[];
  list?: string[];
  /** Paragraphes placés après la liste */
  after?: string[];
}

export interface Guide {
  slug: string;
  /** Prestation vers laquelle le guide renvoie : page d'offre, ou le pôle SI de la page Services */
  related: { path: string; label: string };
  /** Titre de l'article (H1) */
  title: string;
  /** <title> de la page (60 caractères maximum) */
  seoTitle: string;
  /** meta description (160 caractères maximum) */
  description: string;
  kicker: string;
  readingMinutes: number;
  /** Dates ISO (AAAA-MM-JJ) */
  datePublished: string;
  dateModified: string;
  intro: string;
  sections: GuideSection[];
  conclusion: string;
  cta: { title: string; text: string };
}

const offerRef = (id: OfferId) => {
  const offer = OFFER_LINKS.find((o) => o.id === id)!;
  return { path: offer.path, label: offer.shortTitle };
};

export const GUIDES: Guide[] = [
  {
    slug: "cahier-des-charges-application",
    related: offerRef("application-mobile"),
    title: "Cahier des charges d'une application : le modèle simple (et ce que vous pouvez sauter)",
    seoTitle: "Cahier des charges d'application : le modèle simple | RAMSIN",
    description:
      "Pas besoin de 40 pages : les 7 questions qui remplacent un cahier des charges d'application, et ce que vous pouvez laisser au développeur.",
    kicker: "Guide · Lancer un projet",
    readingMinutes: 5,
    datePublished: "2026-10-26",
    dateModified: "2026-10-26",
    intro:
      "Beaucoup de porteurs de projet repoussent leur application parce qu'ils pensent devoir d'abord rédiger un cahier des charges complet. Bonne nouvelle : pour démarrer avec un prestataire sérieux, une page claire vaut mieux qu'un document de 40 pages que personne ne lira jusqu'au bout. Voici ce qui compte vraiment.",
    sections: [
      {
        heading: "Pourquoi le gros cahier des charges fait perdre du temps",
        paragraphs: [
          "Un cahier des charges détaillé fige des choix avant d'avoir vu un seul écran. Or les meilleures décisions se prennent en regardant une première version sur son téléphone : on se rend compte qu'un menu est inutile, qu'une étape manque, qu'un libellé n'est pas clair.",
          "Il crée aussi un faux sentiment de précision : des pages de spécifications ne garantissent ni le budget ni le délai si les priorités ne sont pas posées. Ce qui sécurise un projet, c'est un périmètre de départ réduit et des démonstrations régulières.",
        ],
      },
      {
        heading: "Les 7 questions qui remplacent le cahier des charges",
        list: [
          "Qui utilisera l'application, et dans quelle situation ? Vos clients, vos équipes, les deux ; au bureau, en déplacement, sans réseau…",
          "Quel problème concret elle résout, en une phrase.",
          "Quelle est l'action principale qu'un utilisateur doit pouvoir faire dès la première version ?",
          "Quelles données elle manipule : produits, commandes, rendez-vous, documents, photos…",
          "Y a-t-il des paiements, des abonnements, des factures ?",
          "Avec quels outils existants elle doit communiquer : comptabilité, CRM, agenda, logiciel de caisse…",
          "Quelle échéance compte vraiment : lancement d'activité, salon, saison, levée de fonds ?",
        ],
        after: [
          "Si vous savez répondre à ces sept questions, vous êtes prêt pour un échange de cadrage. Le reste se construit ensemble.",
        ],
      },
      {
        heading: "Décrivez des écrans, pas des fonctions",
        paragraphs: [
          "« Gestion des utilisateurs » ne dit rien. « Un client crée un compte avec son e-mail, voit ses commandes passées et peut en refaire une en deux clics » dit tout. Racontez le parcours de quelqu'un qui utilise votre application, écran après écran.",
          "Un croquis au stylo, une photo de tableau blanc ou une capture d'une application que vous aimez suffisent. Vous n'avez pas besoin de maquettes propres : elles seront faites avec vous pendant le cadrage.",
        ],
      },
      {
        heading: "Ce qu'il faut absolument préciser",
        list: [
          "Les rôles : qui voit quoi, qui peut modifier quoi.",
          "Les données sensibles (santé, paiement, mineurs) : elles imposent des précautions dès la conception.",
          "Les volumes attendus : dix utilisateurs par jour ou dix mille, ce n'est pas la même architecture.",
          "Les contraintes de marque : logo, couleurs, ton, langues.",
          "Ce qui existe déjà : un site, une base clients, un fichier Excel qui fait office d'outil.",
        ],
      },
      {
        heading: "Ce que vous pouvez laisser au prestataire",
        paragraphs: [
          "Le choix des technologies, l'hébergement, la sécurité, la publication sur les stores, la conformité RGPD de base : c'est son métier. Un bon prestataire vous explique ses choix en langage clair et vous les cède (code source, comptes, documentation) sans abonnement captif.",
          "En revanche, exigez de pouvoir tester régulièrement. Une démonstration chaque semaine sur votre téléphone en dit plus que n'importe quel compte rendu.",
        ],
      },
      {
        heading: "Le piège du « tout dans la première version »",
        paragraphs: [
          "La tentation est de vouloir, dès le lancement, la messagerie, les notifications, le programme de fidélité et l'espace partenaires. Résultat : un projet plus long, plus cher, et des fonctionnalités que personne n'utilise.",
          "Listez tout ce que vous imaginez, puis entourez les trois choses sans lesquelles l'application n'a pas de sens. C'est votre première version. Le reste viendra, nourri par les retours de vos premiers utilisateurs.",
        ],
      },
      {
        heading: "Le modèle à copier",
        list: [
          "Mon projet en une phrase",
          "Pour qui, dans quelle situation",
          "Les 3 actions indispensables de la première version",
          "Les données et les paiements",
          "Les outils à connecter",
          "Ce qui existe déjà",
          "Mon échéance, et pourquoi",
          "Mes questions",
        ],
        after: [
          "Une page, parfois deux. C'est exactement ce dont nous avons besoin pour vous donner un plan clair à l'issue de l'échange de 30 minutes.",
        ],
      },
    ],
    conclusion:
      "Un cahier des charges n'est pas un préalable, c'est un résultat : il se construit pendant le cadrage, écran par écran, avec quelqu'un qui connaît les deux côtés. Venez avec vos réponses aux sept questions, nous nous chargeons du reste.",
    cta: {
      title: "Vous avez une idée d'application ?",
      text: "Apportez vos réponses aux sept questions : en 30 minutes, vous repartez avec un périmètre de première version, les étapes et un calendrier.",
    },
  },
  {
    slug: "application-native-react-native-ou-web",
    related: offerRef("application-mobile"),
    title: "Application native, React Native ou application web : comment choisir ?",
    seoTitle: "Native, React Native ou application web ? | RAMSIN",
    description:
      "Application web, React Native ou natif iOS et Android : les critères concrets (stores, notifications, hors-ligne, maintenance) pour choisir la bonne approche.",
    kicker: "Guide · Choisir la bonne technologie",
    readingMinutes: 5,
    datePublished: "2026-10-26",
    dateModified: "2026-10-26",
    intro:
      "« Il me faut une appli » peut vouloir dire trois choses très différentes. Selon ce que vos utilisateurs doivent faire, la bonne réponse n'est pas la même, et elle change fortement le budget, les délais et la maintenance. Voici comment trancher, sans jargon.",
    sections: [
      {
        heading: "Les trois options en une phrase",
        list: [
          "Application web : un site qui se comporte comme une application, utilisable depuis n'importe quel navigateur, sans installation ni passage par les stores.",
          "React Native : une vraie application installée depuis l'App Store et Google Play, développée une seule fois pour iOS et Android.",
          "Natif pur : deux applications distinctes, l'une en Swift pour iPhone, l'autre en Kotlin pour Android, chacune avec son propre code.",
        ],
      },
      {
        heading: "Quand une application web suffit",
        list: [
          "Vos utilisateurs sont surtout sur ordinateur ou arrivent par un lien : portail client, outil de gestion, tableau de bord.",
          "Vous voulez tester une idée rapidement et la faire évoluer chaque semaine sans revalidation par les stores.",
          "Personne n'a besoin de l'application sans réseau ni de notifications fiables sur l'écran verrouillé.",
          "Vous devez surtout être trouvé sur Google : une application web est indexable, une application de store ne l'est pas.",
        ],
        after: [
          "Une application web bien faite s'ajoute à l'écran d'accueil du téléphone et se charge instantanément. Pour la majorité des outils métier et des portails, c'est le choix le plus rapide et le plus économique.",
        ],
      },
      {
        heading: "Quand il faut une vraie application sur les stores",
        list: [
          "Les notifications sont au cœur du service : rappels, suivi de commande, messagerie.",
          "L'application utilise la caméra, la géolocalisation en continu, le Bluetooth ou le paiement sans contact.",
          "Elle doit fonctionner sans réseau, sur le terrain, et se synchroniser ensuite.",
          "La présence sur l'App Store et Google Play fait partie de la crédibilité du service, ou vos clients iront la chercher là.",
        ],
      },
      {
        heading: "React Native : une base de code, deux stores",
        paragraphs: [
          "React Native permet d'écrire l'application une seule fois et de la publier sur iOS et Android. Pour l'utilisateur, elle se comporte comme une application native : mêmes gestes, mêmes performances pour l'immense majorité des usages, accès aux fonctions du téléphone.",
          "Pour vous, cela signifie un seul projet à financer et à maintenir, une seule équipe, et des mises à jour simultanées sur les deux plateformes. C'est pour cette raison que la plupart des applications que nous réalisons reposent sur React Native, souvent avec un back-office web qui partage la même logique.",
        ],
      },
      {
        heading: "Quand le natif pur se justifie",
        paragraphs: [
          "Jeux 3D, traitement vidéo ou audio lourd, réalité augmentée, intégrations très spécifiques à une plateforme : dans ces cas, écrire deux applications natives reste pertinent. Ce sont des cas rares pour une entreprise de services ou un commerce.",
          "Si un prestataire vous propose d'emblée deux développements natifs pour une application de réservation ou de fidélité, demandez-lui pourquoi.",
        ],
      },
      {
        heading: "Le coût caché : la maintenance",
        paragraphs: [
          "Une application ne s'arrête pas à la mise en ligne. Apple et Google publient de nouvelles versions chaque année, exigent des mises à jour et retirent les applications qui ne suivent pas. Chaque base de code supplémentaire double ce travail.",
          "Avant de choisir, demandez qui s'occupera des mises à jour, de l'hébergement du serveur et des publications sur les stores, et à quel rythme. Une application que vous possédez (code source et comptes à votre nom) vous laisse libre de confier cette maintenance à qui vous voulez.",
        ],
      },
      {
        heading: "Notre recommandation selon le projet",
        list: [
          "Outil interne, portail client, tableau de bord : application web.",
          "Service grand public avec notifications, réservation, livraison, communauté : React Native, avec un back-office web.",
          "Commerce ou marque qui veut une application de fidélité : React Native, souvent reliée à la boutique en ligne existante.",
          "Projet reposant sur la 3D, la vidéo en temps réel ou du matériel spécifique : natif, après étude.",
        ],
      },
    ],
    conclusion:
      "Le bon choix dépend de vos utilisateurs, pas de la mode. Décrivez-nous ce qu'ils doivent pouvoir faire : nous vous dirons franchement si une application web suffit ou s'il faut passer par les stores, et avec quelle technologie.",
    cta: {
      title: "Vous hésitez entre application web et application mobile ?",
      text: "30 minutes suffisent pour trancher ensemble, en fonction de vos utilisateurs et de votre calendrier.",
    },
  },
  {
    slug: "site-vitrine-ou-boutique-en-ligne",
    related: offerRef("site-ecommerce"),
    title: "Site vitrine ou boutique en ligne : par quoi commencer quand on lance son activité ?",
    seoTitle: "Site vitrine ou boutique en ligne : que choisir ? | RAMSIN",
    description:
      "Site vitrine qui apporte des demandes ou boutique qui vend : comment choisir au lancement, et les 5 éléments d'un site qui convertit.",
    kicker: "Guide · Lancer son activité en ligne",
    readingMinutes: 5,
    datePublished: "2026-10-26",
    dateModified: "2026-10-26",
    intro:
      "Au lancement d'une activité, le site internet arrive vite dans la liste. Mais quel site ? Une vitrine qui présente votre offre et fait venir des demandes, ou une boutique qui encaisse directement ? La réponse tient à une question simple, et elle évite de dépenser au mauvais endroit.",
    sections: [
      {
        heading: "La question à se poser : vendre en ligne, ou obtenir des demandes ?",
        paragraphs: [
          "Si vos clients achètent après un échange (devis, rendez-vous, conseil), votre site doit avant tout provoquer cet échange : c'est un site vitrine orienté conversion. Artisans, consultants, traiteurs, professions libérales : la vente se conclut au téléphone ou sur place.",
          "Si vos clients peuvent acheter seuls, à toute heure, un produit défini (vêtements, objets, formations en ligne, abonnements), une boutique en ligne devient le cœur de votre activité. Beaucoup d'activités commencent d'ailleurs par une vitrine, puis ajoutent la vente en ligne une fois la demande confirmée.",
        ],
      },
      {
        heading: "Les 5 éléments d'un site vitrine qui convertit",
        list: [
          "Une promesse claire en haut de page : qui vous aidez, à quoi, où. Le visiteur doit comprendre en cinq secondes.",
          "Des preuves : réalisations, photos réelles, avis, chiffres. Elles comptent plus que les adjectifs.",
          "Un appel à l'action visible partout : demander un devis, réserver, appeler. Sur mobile, sans avoir à défiler.",
          "Une page par prestation : Google et vos visiteurs cherchent « création d'application mobile », pas « nos services ».",
          "Un formulaire court. Chaque champ en trop fait perdre des demandes.",
        ],
      },
      {
        heading: "Quand passer à la boutique en ligne",
        paragraphs: [
          "Quand vous recevez déjà des commandes par message ou par téléphone pour des produits identifiés, quand vous voulez vendre hors de votre zone, ou quand la prise de commande vous prend trop de temps : c'est le signal.",
          "Une boutique sur-mesure va au-delà du panier : configurateur de produit, prise de mensurations, suivi de fabrication, paiement par carte et PayPal, e-mails automatiques. C'est ce que nous avons construit pour Maison HamdiWaShukri, où le site calcule lui-même les mesures d'atelier à la place de l'équipe.",
        ],
      },
      {
        heading: "Sur-mesure ou plateforme (Wix, Shopify, WordPress) ? Honnêtement",
        paragraphs: [
          "Une plateforme convient pour tester une idée en quelques jours avec un budget minimal, à condition d'accepter ses limites : abonnement mensuel, thème générique, vitesse moyenne, dépendance à l'éditeur et difficulté à en sortir ensuite.",
          "Un site sur-mesure se justifie dès que le site doit être votre principal apporteur de clients : il est plus rapide, mieux référencé, entièrement à vous (code, hébergement, nom de domaine), et il évolue sans contrainte. Si une plateforme suffit à votre stade, nous vous le dirons.",
        ],
      },
      {
        heading: "Les bases du référencement dès le premier jour",
        list: [
          "Un titre et une description uniques par page, qui reprennent les mots que tapent vos clients.",
          "Une page dédiée pour chaque prestation et, si vous êtes local, la ville ou le département dans les textes.",
          "Une fiche Google Business Profile complète (adresse, horaires, photos) et des avis clients réguliers.",
          "Un site rapide sur mobile : Google mesure la vitesse, et vos visiteurs n'attendent pas.",
          "Des contenus utiles publiés régulièrement : un guide, une réponse aux questions que l'on vous pose, une réalisation commentée.",
        ],
      },
      {
        heading: "Ce qui se passe après la mise en ligne",
        paragraphs: [
          "Un site vit : nom de domaine et certificat à renouveler, mises à jour de sécurité, sauvegardes, ajout de pages quand l'offre évolue. Prévoyez qui s'en occupe avant de signer.",
          "Et mesurez : d'où viennent les visiteurs, lesquels demandent un devis, lesquels appellent. Sans cette mesure, impossible de savoir si le site travaille pour vous.",
        ],
      },
    ],
    conclusion:
      "Commencez par ce qui déclenche une vente chez vous : une demande ou un achat. Faites un site clair, rapide et à votre nom, mesurez, puis ajoutez la vente en ligne quand la demande est là.",
    cta: {
      title: "Vous lancez votre activité ?",
      text: "Décrivez-nous comment vos clients achètent aujourd'hui : nous vous dirons si un site vitrine, une boutique ou les deux vous feront gagner des clients, et par quoi commencer.",
    },
  },
  {
    slug: "cartographie-applicative-par-ou-commencer",
    related: { path: "/services#architecture-si", label: "Architecture SI & MEGA HOPEX" },
    title: "Cartographie applicative : à quoi elle sert et par où commencer",
    seoTitle: "Cartographie applicative : par où commencer | RAMSIN",
    description:
      "À quoi sert une cartographie applicative, les trois niveaux à modéliser, par où commencer et comment faire vivre le référentiel (MEGA HOPEX).",
    kicker: "Guide · Architecture SI",
    readingMinutes: 6,
    datePublished: "2026-10-26",
    dateModified: "2026-10-26",
    intro:
      "Peu de DSI peuvent répondre vite à la question « si on remplace cette application, qu'est-ce qui casse ? ». La cartographie applicative sert précisément à cela : voir le patrimoine, ses flux et ses dépendances, pour décider sur des faits. Encore faut-il commencer au bon endroit et ne pas s'enliser.",
    sections: [
      {
        heading: "Ce qu'une cartographie permet de décider",
        list: [
          "Évaluer l'impact d'une évolution ou d'un remplacement avant de l'engager.",
          "Repérer les doublons fonctionnels et prioriser une rationalisation du portefeuille.",
          "Préparer une trajectoire (de l'existant vers la cible) et la défendre en comité d'architecture.",
          "Répondre aux exigences de sécurité et de conformité avec un inventaire fiable.",
          "Objectiver la dette technique auprès de la direction générale, avec des chiffres.",
        ],
      },
      {
        heading: "Les trois niveaux à modéliser",
        paragraphs: [
          "Le niveau fonctionnel décrit ce que fait le SI pour le métier : capacités, processus, zones. Le niveau applicatif liste les applications, leurs modules et surtout les flux qui les relient. Le niveau technique rattache les applications à leurs serveurs, bases de données, middlewares et hébergements.",
          "L'erreur classique est de vouloir les trois à la perfection dès le départ. Une cartographie utile commence par le niveau applicatif et les flux, car c'est là que se jouent les analyses d'impact.",
        ],
      },
      {
        heading: "Par où commencer : le périmètre qui fait mal",
        paragraphs: [
          "Choisissez le domaine où un projet est imminent ou un incident récent : la migration d'un cœur de métier, un outil en fin de support, une fusion. La cartographie y rend service immédiatement, ce qui facilite l'adhésion des équipes et la suite.",
          "Fixez un niveau de détail suffisant pour décider, pas plus. Vous pourrez affiner domaine par domaine.",
        ],
      },
      {
        heading: "Collecter sans épuiser les équipes",
        list: [
          "Partir de l'existant : inventaires, CMDB, schémas d'intégration, contrats, même imparfaits.",
          "Mener des entretiens courts avec les responsables d'application, préparés avec une fiche à compléter plutôt qu'une page blanche.",
          "Automatiser ce qui peut l'être : imports depuis la CMDB ou les outils d'intégration, scripts de contrôle de cohérence.",
          "Restituer vite : une première carte, même partielle, montrée aux contributeurs, corrige plus d'erreurs qu'un mois de collecte.",
        ],
      },
      {
        heading: "Faire vivre le référentiel",
        paragraphs: [
          "Une cartographie qui n'est pas mise à jour perd sa valeur en quelques mois. Elle doit vivre dans un référentiel outillé, par exemple MEGA HOPEX, avec un métamodèle adapté à votre organisation, des responsables identifiés par domaine et des points de mise à jour inscrits dans les processus : comités projet, mises en production, décommissionnements.",
          "Les scripts et l'API de l'outil permettent d'automatiser les imports et les exports, de produire des tableaux de bord pour la DSI et de contrôler la qualité des données, afin que le référentiel reste la source de vérité.",
        ],
      },
      {
        heading: "Les erreurs fréquentes",
        list: [
          "Démarrer par le métamodèle parfait et ne jamais livrer de carte.",
          "Confier la saisie à une seule personne, sans responsables par domaine.",
          "Cartographier sans cas d'usage : la carte n'est consultée par personne.",
          "Oublier les flux : une liste d'applications n'est pas une cartographie.",
          "Ne pas prévoir la mise à jour dans les processus existants.",
        ],
      },
    ],
    conclusion:
      "Une bonne cartographie n'est pas une œuvre exhaustive, c'est un outil de décision tenu à jour. Commencez par le périmètre qui fait mal, modélisez les flux, restituez vite et installez la gouvernance qui la fera vivre.",
    cta: {
      title: "Votre cartographie SI est floue ou obsolète ?",
      text: "Échangeons 30 minutes sur votre périmètre, votre outillage (MEGA HOPEX ou autre) et vos échéances : vous repartez avec une proposition de démarche.",
    },
  },
];

export const getGuide = (slug: string) => GUIDES.find((g) => g.slug === slug);

/** « 26 octobre 2026 » — formatage manuel, identique au pré-rendu et dans le navigateur */
export const formatGuideDate = (iso: string) => {
  const months = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
  const [year, month, day] = iso.split("-").map(Number);
  return `${day} ${months[month - 1]} ${year}`;
};
