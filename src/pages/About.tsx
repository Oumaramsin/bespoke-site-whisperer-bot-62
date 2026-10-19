import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Briefcase,
  School,
  Star,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Code2,
  Database,
  Layers,
  CheckCircle2,
  Sparkles,
  Award,
  ShieldCheck,
  Calendar,
  ExternalLink,
  Zap,
  Users2,
  HeartHandshake,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import SEO from "@/components/SEO";
import PoleProjects from "@/components/projects/PoleProjects";

const ABOUT_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Oumar Sidibé",
  jobTitle: "Fondateur de RAMSIN Conseil, Architecte SI & Développeur Full-Stack",
  worksFor: { "@type": "ProfessionalService", name: "RAMSIN Conseil", url: "https://www.ramsin.fr" },
  url: "https://www.ramsin.fr/a-propos",
  sameAs: ["https://www.linkedin.com/in/oumar-ramsin/"],
  knowsAbout: ["Architecture des Systèmes d'Information", "MEGA HOPEX", "Next.js", "React Native", "Développement web et mobile"],
};
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export const About = () => {
  const { ref: expRef, isVisible: expVisible } = useScrollAnimation();
  const { ref: eduRef, isVisible: eduVisible } = useScrollAnimation();
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollAnimation();
  const navigate = useNavigate();

  const experiences = [
    {
      title: "Consultant Architecte SI & MEGA HOPEX V5",
      company: "COVEA (Assurances MAAF, MMA, GMF)",
      logo: "/logos/covea.png",
      period: "Juin 2023 - Présent",
      category: "Architecture SI & Référentiel Entreprise",
      accent: "border-l-[#123A35]",
      description: [
        "Pilotage et enrichissement continu de la cartographie du SI transverse (applications, flux, socles technologiques)",
        "Collaboration directe avec les architectes de domaine et responsables d'applications",
        "Assainissement des métamodèles et résolution des anomalies cartographiques dans MEGA HOPEX V5",
        "Mise en place de comités de gouvernance et reporting régulier sur la qualité du référentiel SI",
      ],
    },
    {
      title: "Consultant Architecte Solution & Cadrage",
      company: "La Banque Postale (via Marte)",
      logo: "/logos/banque-postale.png",
      period: "Septembre 2022 - Mai 2023",
      category: "Architecture Solution & Secteur Bancaire",
      accent: "border-l-emerald-600",
      description: [
        "Cadrage d'architecture applicative et technique sur les projets de transformation du Crédit Immobilier",
        "Analyses d'impacts d'adhérence des projets à la stratégie SI d'entreprise",
        "Rédaction complète des Dossiers d'Architecture Technique (DAT) et passage réussi en Design Authority",
        "Modélisation des processus métiers et des flux inter-applicatifs bancaires sécurisés",
      ],
    },
    {
      title: "Consultant Solution AE MEGA HOPEX",
      company: "Marte Conseil",
      logo: "/logos/marte.png",
      period: "Janvier 2020 - Septembre 2022",
      category: "Expertise MEGA HOPEX & Automatisation API",
      accent: "border-l-[#123A35]",
      description: [
        "Accompagnement de migrations d'environnements MEGA 2009 vers MEGA HOPEX V2R1",
        "Développement de scripts d'automatisation en VB.Net et VBScript pour l'API MEGA HOPEX",
        "Création de tableaux de bord personnalisés et de formulaires de saisie pour les utilisateurs",
        "Conduite du changement, support technique et formation des architectes clients",
      ],
    },
    {
      title: "Ingénieur Études et Développement Full-Stack",
      company: "Société Générale",
      logo: "/logos/societe-generale.png",
      period: "Janvier 2017 - Janvier 2019",
      category: "Développement Web & AMOA Bancaire",
      accent: "border-l-emerald-600",
      description: [
        "Conception et développement d'applications web métiers (PHP 7, Symfony, MySQL, JavaScript)",
        "Développement et consommation d'API REST sécurisées",
        "Déploiement et administration des environnements sur serveurs Linux",
        "Animation des cérémonies quotidiennes en méthode Agile (Daily, Sprint Planning)",
      ],
    },
  ];

  const education = [
    {
      degree: "Master 2 Expert en Systèmes d'Information (Bac+5)",
      school: "Pôle Universitaire Léonard de Vinci - Sup de Vinci",
      year: "2019",
      mention: "Spécialisation Architecture des SI, Urbanisation & Gouvernance",
    },
    {
      degree: "Licence 3 MIAGE (Méthodes Informatiques Appliquées à la Gestion des Entreprises)",
      school: "Université d'Orléans",
      year: "2017",
      mention: "Bases de données relationnelles, Génie Logiciel & Modélisation",
    },
  ];

  const skillGroups = [
    {
      title: "Architecture & Cartographie SI",
      icon: Layers,
      accent: "border-l-[#123A35]",
      items: [
        "MEGA HOPEX V5 & V2R1",
        "Cartographie Applicative & Flux",
        "Dossier d'Architecture Technique (DAT)",
        "Design Authority & Comités SI",
        "Urbanisation & Trajectoire Cible",
        "UML, ArchiMate & MERISE",
        "Gouvernance des Référentiels",
      ],
    },
    {
      title: "Développement Web & Mobile Full-Stack",
      icon: Code2,
      accent: "border-l-emerald-600",
      items: [
        "Next.js 15 / 16 (App Router)",
        "React Native & Expo (iOS / Android)",
        "TypeScript & Node.js",
        "Tailwind CSS & shadcn/ui",
        "PostgreSQL & Prisma ORM",
        "API REST & Authentification JWT",
        "Stripe Checkout & PayPal SDK",
      ],
    },
    {
      title: "Méthodologie, Cloud & DevOps",
      icon: Database,
      accent: "border-l-[#123A35]",
      items: [
        "Product Ownership & User Stories",
        "Méthodologie Agile / Scrum",
        "Docker & Conteneurisation",
        "Hébergement Cloud (Vercel, AWS, VPS)",
        "Git, GitHub & GitLab CI/CD",
        "Scripts API (VB.Net / Python)",
        "Conformité RGPD & Sécurité",
      ],
    },
  ];

  const contact = {
    email: "contact@ramsin.fr",
    phone: "+33 (0)7 61 51 88 90",
    location: "Basés à Fresnes (94) · Interventions Paris & Remote",
    linkedin: "https://www.linkedin.com/in/oumar-ramsin/",
  };

  const handleBookingRedirect = () => {
    navigate("/contact", { state: { scrollToBooking: true } });
  };

  return (
    <>
      <SEO
        title="À Propos de RAMSIN Conseil | Consultant Fondateur & Architecte SI Senior"
        description="Découvrez le profil de RAMSIN Conseil : 7 ans d'expérience professionnelle en Architecture SI (MEGA HOPEX V5, grands comptes Covéa, La Banque Postale) et développement Full-Stack sur-mesure."
        canonical="https://www.ramsin.fr/a-propos"
        jsonLd={ABOUT_JSONLD}
      />

      {/* ═══════════════════════════════════════════
          HERO HEADER AVEC HALO LUMINEUX
      ═══════════════════════════════════════════ */}
      <section className="relative overflow-hidden border-b border-border/60 pt-12 pb-16 md:pt-18 md:pb-22">
        <div className="absolute inset-0 -z-10 dot-grid-pattern pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-[350px] bg-gradient-to-r from-[#123A35]/10 via-[#C7F36B]/15 to-[#123A35]/10 rounded-full blur-[100px] -z-10 pointer-events-none" />

        <div className="container mx-auto px-4 text-center max-w-4xl space-y-6">
          {/* Badges de statut & qualification */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-bold text-emerald-800 shadow-xs">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              Disponible pour missions SI & projets applicatifs
            </div>

            <Badge variant="outline" className="px-3.5 py-1 text-xs border-primary/30 text-primary font-semibold">
              <Star className="w-3.5 h-3.5 mr-1.5 inline text-amber-500" />
              Cabinet Conseil & Développement Indépendant
            </Badge>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.22]">
            L'Expertise d'un Spécialiste Senior.
            <span className="block gradient-text mt-2 pb-2">La Proximité d'un Partenaire Dédié.</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            Porté par son fondateur <strong>Oumar Sidibé</strong>, architecte SI diplômé Master 2 et certifié MEGA HOPEX V5, RAMSIN Conseil accompagne grands comptes et dirigeants avec une exigence absolue de résultat.
          </p>

          {/* Liens de contact rapide & profil LinkedIn vérifié */}
          <div className="flex flex-wrap gap-3 justify-center text-xs sm:text-sm pt-2">
            <a
              href={`mailto:${contact.email}`}
              className="bg-secondary/80 hover:bg-secondary px-3.5 py-2 rounded-full flex items-center gap-1.5 transition-colors font-semibold"
            >
              <Mail className="w-3.5 h-3.5 text-primary" /> {contact.email}
            </a>
            <a
              href="tel:+33761518890"
              className="bg-secondary/80 hover:bg-secondary px-3.5 py-2 rounded-full flex items-center gap-1.5 transition-colors font-semibold"
            >
              <Phone className="w-3.5 h-3.5 text-primary" /> {contact.phone}
            </a>
            <span className="bg-secondary/80 px-3.5 py-2 rounded-full flex items-center gap-1.5 font-medium text-muted-foreground">
              <MapPin className="w-3.5 h-3.5 text-primary" /> {contact.location}
            </span>
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#0A66C2] hover:bg-[#084e96] text-white px-4 py-2 rounded-full flex items-center gap-1.5 transition-colors font-bold shadow-xs hover:shadow-md"
            >
              <ExternalLink className="w-3.5 h-3.5" /> Profil LinkedIn Vérifié
            </a>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 md:py-16 max-w-4xl space-y-16">
        
        {/* ═══════════════════════════════════════════
            1. POURQUOI CHOISIR UN CABINET INDÉPENDANT ?
        ═══════════════════════════════════════════ */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
              Pourquoi Travailler avec RAMSIN Conseil ?
            </h2>
            <p className="text-sm text-muted-foreground">
              Les 4 engagements d'un modèle sans intermédiaire qui fait la différence pour votre organisation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                icon: Users2,
                title: "1. Interlocuteur Unique Senior",
                desc: "Pas de commercial qui disparaît après la signature ni de stagiaire envoyé en sous-traitance : vous échangez et travaillez directement avec l'expert qui conçoit vos architectures ou développe votre code.",
              },
              {
                icon: Zap,
                title: "2. Circuit Décisionnel Court & Réactivité",
                desc: "Démarrage de mission rapide, ajustements agiles en direct et réponse garantie sous 24h ouvrées. Zéro lourdeur administrative d'ESN traditionnelle.",
              },
              {
                icon: HeartHandshake,
                title: "3. Transparence Budgétaire Totale",
                desc: "Pas de frais de structure superflus d'agence. Des tarifs forfaitaires ou régie clairs, fixés en amont et respectés scrupuleusement.",
              },
              {
                icon: ShieldCheck,
                title: "4. Souveraineté & Propriété Contractuelle",
                desc: "Vos référentiels d'architecture sont documentés pour vos équipes internes et l'intégralité du code source applicatif vous est cédée sans aucun abonnement captif.",
              },
            ].map((adv, i) => {
              const IconA = adv.icon;
              return (
                <div key={i} className="p-5 rounded-2xl glass-card border border-border/80 space-y-2 hover-lift">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <IconA className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-foreground">{adv.title}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{adv.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* ═══════════════════════════════════════════
            2. SYNTHÈSE DE POSITIONNEMENT DU DIRIGEANT
        ═══════════════════════════════════════════ */}
        <Card className="border-2 border-primary/20 bg-gradient-to-r from-primary/5 via-background to-background glass-card rounded-3xl overflow-hidden shadow-md">
          <CardHeader className="p-6 sm:p-8 pb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">
              La Philosophie RAMSIN
            </span>
            <CardTitle className="text-xl sm:text-2xl font-bold">
              Allier Vision Stratégique des SI & Concrétisation Technique Réelle
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 sm:p-8 pt-0 space-y-4 text-sm sm:text-base leading-relaxed text-muted-foreground">
            <p>
              Dans le monde du numérique, deux univers coexistent souvent sans se comprendre : les cabinets de conseil stratégique qui produisent des schémas théoriques, et les développeurs qui codent sans vision d'ensemble du système d'information.
            </p>
            <p>
              <strong>RAMSIN Conseil a été fondé pour faire le pont entre ces deux mondes.</strong> Fort de 7 années d'expérience professionnelle au cœur de DSI de grandes entreprises régulées (Covéa, La Banque Postale, Société Générale) et d'une maîtrise approfondie du développement Full-Stack moderne (Next.js, React Native, TypeScript, PostgreSQL), j'apporte une double compétence rare :
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs sm:text-sm text-foreground font-semibold">
              <div className="p-3.5 rounded-xl bg-[#123A35]/10 border border-[#123A35]/25 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#123A35] shrink-0 mt-0.5" />
                <span>Pour la DSI : Cartographies rigoureuses, conformité MEGA HOPEX V5 et passage réussi des DAT.</span>
              </div>
              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <span>Pour les Métiers : Applications fluides, sécurisées, livrées dans les délais avec code propriétaire.</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Réalisations web : la preuve pour les porteurs de projet */}
        <PoleProjects pole="web" />

        {/* ═══════════════════════════════════════════
            3. EXPÉRIENCES & RÉFÉRENCES PROFESSIONNELLES
        ═══════════════════════════════════════════ */}
        <div ref={expRef} className={`space-y-6 scroll-fade-up ${expVisible ? "is-visible" : ""}`}>
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-primary/10 rounded-xl text-primary">
              <Briefcase className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
                Parcours Professionnel Vérifiable
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Missions exercées au sein d'environnements grands comptes et structures exigeantes.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {experiences.map((exp, i) => (
              <Card
                key={i}
                className={`border border-border/80 border-l-4 ${exp.accent} glass-card hover-lift rounded-2xl`}
              >
                <CardHeader className="p-5 pb-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-primary">
                      {exp.category}
                    </span>
                    <span className="text-xs font-semibold text-muted-foreground bg-secondary px-2.5 py-1 rounded-full">
                      {exp.period}
                    </span>
                  </div>
                  <CardTitle className="text-lg sm:text-xl font-bold mt-1">
                    {exp.title} — <span className="text-foreground/80">{exp.company}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-5 pt-2 space-y-2">
                  <ul className="space-y-1.5 text-xs sm:text-sm text-muted-foreground">
                    {exp.description.map((desc, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{desc}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* ═══════════════════════════════════════════
            4. FORMATION & DIPLÔMES DE HAUT NIVEAU
        ═══════════════════════════════════════════ */}
        <div ref={eduRef} className={`space-y-6 scroll-fade-up ${eduVisible ? "is-visible" : ""}`}>
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-primary/10 rounded-xl text-primary">
              <School className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
                Diplômes & Formation Supérieure
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Une formation académique solide en Architecture des SI et Informatique de Gestion.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {education.map((edu, i) => (
              <Card key={i} className="border border-border/80 glass-card rounded-2xl hover-lift">
                <CardHeader className="p-5 pb-2 space-y-1">
                  <span className="text-xs font-bold text-primary">{edu.year}</span>
                  <CardTitle className="text-base sm:text-lg font-bold">
                    {edu.degree}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-5 pt-0 space-y-2 text-xs sm:text-sm text-muted-foreground">
                  <p className="font-semibold text-foreground/90">{edu.school}</p>
                  <p className="text-xs">{edu.mention}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* ═══════════════════════════════════════════
            5. COMPÉTENCES TECHNIQUES ORGANISÉES
        ═══════════════════════════════════════════ */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-primary/10 rounded-xl text-primary">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
                Compétences & Outils Maîtrisés
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Les technologies et standards réellement déployés en production.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {skillGroups.map((grp, i) => {
              const IconG = grp.icon;
              return (
                <Card key={i} className={`border border-border/80 border-l-4 ${grp.accent} glass-card rounded-2xl`}>
                  <CardHeader className="p-4 pb-2 space-y-1">
                    <div className="flex items-center gap-2 text-foreground font-bold text-sm">
                      <IconG className="w-4 h-4 text-primary" />
                      <span>{grp.title}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-1">
                    <div className="flex flex-wrap gap-1.5">
                      {grp.items.map((it, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] font-semibold bg-secondary px-2.5 py-1 rounded-lg text-secondary-foreground border border-border/40"
                        >
                          {it}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* ═══════════════════════════════════════════
            BANDEAU D'APPEL À L'ACTION
        ═══════════════════════════════════════════ */}
        <div
          ref={ctaRef}
          className={`bg-gradient-to-r from-primary/10 via-primary/5 to-emerald-500/10 border-2 border-primary/20 rounded-3xl p-8 md:p-12 text-center max-w-4xl mx-auto shadow-xl glass-card scroll-scale-up ${
            ctaVisible ? "is-visible" : ""
          }`}
        >
          <Sparkles className="w-12 h-12 text-primary mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-extrabold mb-3 tracking-tight">
            Vous souhaitez valider la faisabilité de votre mission ou projet ?
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-2xl mx-auto leading-relaxed">
            Échangez directement avec Oumar Sidibé lors d'une session de cadrage technique offerte de 30 minutes sans aucun engagement.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              onClick={handleBookingRedirect}
              className="gap-2 font-bold cursor-pointer shadow-md bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl px-7"
            >
              <Calendar className="w-4 h-4" />
              Réserver mon échange offert (30 min) <ArrowRight className="w-4 h-4" />
            </Button>
            <Button asChild variant="outline" size="lg" className="font-bold rounded-xl px-7">
              <Link to="/contact">Envoyer un message direct</Link>
            </Button>
          </div>
        </div>

      </div>
    </>
  );
};

export default About;
