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
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Calendar,
  Zap,
  Users2,
  HeartHandshake,
} from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";

const ABOUT_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Oumar Sidibé",
  jobTitle: "Fondateur de RAMSIN Conseil, Architecte SI & Développeur Full-Stack",
  worksFor: { "@type": "ProfessionalService", name: "RAMSIN Conseil", url: "https://www.ramsin.fr" },
  url: "https://www.ramsin.fr/a-propos",
  knowsAbout: ["Architecture des Systèmes d'Information", "MEGA HOPEX", "Next.js", "React Native", "Développement web et mobile"],
};
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { openBooking } from "@/lib/calendly";

export const About = () => {
  const { ref: expRef, isVisible: expVisible } = useScrollAnimation();
  const { ref: eduRef, isVisible: eduVisible } = useScrollAnimation();
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollAnimation();

  const experiences = [
    {
      title: "Consultant architecte SI & MEGA HOPEX V5",
      company: "COVEA (Assurances MAAF, MMA, GMF)",
      logo: "/logos/covea.png",
      period: "Juin 2023 - Présent",
      category: "Architecture SI & Référentiel Entreprise",
      accent: "border-l-[#123A35]",
      description: [
        "Pilotage de la cartographie du SI transverse (applications, flux, socles technologiques) dans MEGA HOPEX V5",
        "Fiabilisation du référentiel et comités de gouvernance avec les architectes de domaine",
      ],
    },
    {
      title: "Consultant architecte solution & cadrage",
      company: "La Banque Postale (via Marte)",
      logo: "/logos/banque-postale.webp",
      period: "Septembre 2022 - Mai 2023",
      category: "Architecture Solution & Secteur Bancaire",
      accent: "border-l-emerald-600",
      description: [
        "Rédaction des dossiers d'architecture technique (DAT), validés en Design Authority",
        "Cadrage d'architecture des projets de transformation du crédit immobilier",
      ],
    },
    {
      title: "Consultant solution AE MEGA HOPEX",
      company: "Marte Conseil",
      logo: "/logos/marte.webp",
      period: "Janvier 2020 - Septembre 2022",
      category: "Expertise MEGA HOPEX & Automatisation API",
      accent: "border-l-[#123A35]",
      description: [
        "Migrations de MEGA 2009 vers MEGA HOPEX V2R1 et scripts d'automatisation",
        "Tableaux de bord, formation et accompagnement des architectes clients",
      ],
    },
    {
      title: "Ingénieur études et développement full-stack",
      company: "Société Générale",
      logo: "/logos/societe-generale.png",
      period: "Janvier 2017 - Janvier 2019",
      category: "Développement Web & AMOA Bancaire",
      accent: "border-l-emerald-600",
      description: [
        "Conception et développement d'applications web métiers",
        "Mise en production et travail en méthode agile avec les équipes métier",
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

  const contact = {
    email: "contact@ramsin.fr",
    phone: "+33 (0)7 61 51 88 90",
    location: "Basés à Fresnes (94) · Interventions Paris & à distance",
  };

  const handleBookingRedirect = () => openBooking("about_footer");

  return (
    <>
      <SEO
        title="À propos de RAMSIN Conseil | Oumar Sidibé"
        description="RAMSIN Conseil, fondé par Oumar Sidibé : 7 ans en DSI de grands comptes (Covéa, La Banque Postale) et développement d'applications web et mobiles."
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

          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.22]">
            L'expertise d'un architecte senior.
            <span className="block gradient-text mt-2 pb-2">La proximité d'un partenaire dédié.</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            Porté par son fondateur <strong>Oumar Sidibé</strong>, architecte SI diplômé Master 2 et certifié MEGA HOPEX V5, RAMSIN Conseil accompagne aussi bien les DSI de grandes entreprises que les porteurs de projet, du cadrage à la mise en ligne.
          </p>

          {/* Liens de contact rapide */}
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
              Pourquoi travailler avec RAMSIN Conseil ?
            </h2>
            <p className="text-sm text-muted-foreground">
              Les 4 engagements d'un modèle sans intermédiaire qui fait la différence pour votre organisation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                icon: Users2,
                title: "1. Un seul interlocuteur, expérimenté",
                desc: "Pas de commercial qui disparaît après la signature, pas de sous-traitance : vous échangez directement avec la personne qui conçoit votre architecture ou écrit votre code.",
              },
              {
                icon: Zap,
                title: "2. Des décisions rapides",
                desc: "Démarrage rapide, ajustements en direct et réponse sous 24 h ouvrées, sans la lourdeur d'une grosse ESN.",
              },
              {
                icon: HeartHandshake,
                title: "3. Un budget clair dès le départ",
                desc: "Pas de frais de structure d'agence. Un forfait ou un tarif en régie fixé avant de commencer, et tenu.",
              },
              {
                icon: ShieldCheck,
                title: "4. Vous restez propriétaire",
                desc: "Vos référentiels d'architecture sont documentés pour vos équipes, et le code source vous est cédé en entier, sans abonnement imposé.",
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
              La philosophie RAMSIN
            </span>
            <CardTitle className="text-xl sm:text-2xl font-bold">
              Allier vision stratégique des SI et réalisation technique
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 sm:p-8 pt-0 space-y-4 text-sm sm:text-base leading-relaxed text-muted-foreground">
            <p>
              Dans le numérique, deux mondes se parlent peu : les cabinets de conseil, qui produisent des schémas, et les développeurs, qui codent sans vue d'ensemble du système d'information.
            </p>
            <p>
              <strong>RAMSIN Conseil a été fondé pour faire le pont entre ces deux mondes.</strong> Fort de 7 années d'expérience professionnelle au cœur de DSI de grandes entreprises régulées (Covéa, La Banque Postale, Société Générale) et d'une maîtrise approfondie du développement Full-Stack moderne (Next.js, React Native, TypeScript, PostgreSQL), j'apporte une double compétence rare :
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs sm:text-sm text-foreground font-semibold">
              <div className="p-3.5 rounded-xl bg-[#123A35]/10 border border-[#123A35]/25 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#123A35] shrink-0 mt-0.5" />
                <span>Pour la DSI : cartographies rigoureuses, conformité MEGA HOPEX V5 et passage réussi des DAT.</span>
              </div>
              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <span>Pour les métiers : applications fluides, sécurisées, livrées dans les délais avec code propriétaire.</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Réalisations web : la preuve pour les porteurs de projet */}
        <Link
          to="/projets"
          className="group flex flex-col sm:flex-row items-center justify-between gap-3 rounded-2xl border border-border/80 bg-card px-6 py-5 hover:border-emerald-600/50 transition-colors"
        >
          <span className="text-center sm:text-left">
            <span className="block text-base font-extrabold text-foreground">Nos réalisations</span>
            <span className="block text-sm text-muted-foreground">
              Une marketplace web et mobile, une boutique sur-mesure, un site vitrine de traiteur et deux missions d'architecture SI.
            </span>
          </span>
          <span className="inline-flex items-center gap-1.5 text-sm font-extrabold text-emerald-700 group-hover:gap-2.5 transition-all shrink-0">
            Voir les études de cas <ArrowRight className="w-4 h-4" />
          </span>
        </Link>

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
                Parcours professionnel
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
                Diplômes & formation
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
            Échangez directement avec RAMSIN lors d'une session de cadrage technique offerte de 30 minutes, sans aucun engagement.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              onClick={handleBookingRedirect}
              className="gap-2 font-bold cursor-pointer shadow-md bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl px-7"
            >
              <Calendar className="w-4 h-4" />
              Réserver 30 min offertes <ArrowRight className="w-4 h-4" />
            </Button>
            <Button asChild variant="outline" size="lg" className="font-bold rounded-xl px-7">
              <Link to="/contact?tunnel=form">Décrire mon projet par écrit</Link>
            </Button>
          </div>
        </div>

      </div>
    </>
  );
};

export default About;
