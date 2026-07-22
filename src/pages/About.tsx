import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Briefcase, School, Wrench, Star, Mail, Phone, MapPin, ArrowRight, Code2, Database, Layers, CheckCircle2, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SEO from "@/components/SEO";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const About = () => {
  const { ref: expRef, isVisible: expVisible } = useScrollAnimation();
  const { ref: eduRef, isVisible: eduVisible } = useScrollAnimation();
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollAnimation();
  const navigate = useNavigate();

  const experiences = [
    {
      title: "Consultant Architecte MEGA HOPEX",
      company: "COVEA",
      logo: "/logos/covea.png",
      period: "Juin 2023 - Présent",
      category: "Architecture SI & MEGA HOPEX",
      accent: "border-l-violet-500",
      description: [
        "Amélioration de la documentation transverse sur les différents périmètres du SI",
        "Échange avec les architectes fonctionnels et solutions pour sécuriser les documentations",
        "Enrichissement de la cartographie (description application, objets gérés, flux applicatifs, technologies)",
        "Participation à l'évolution des bonnes pratiques et de l'outillage",
        "Gestion des manques et incohérences avec la cartographie MEGA HOPEX V5",
        "Suivi du backlog des évolutions et reporting sur la qualité du référentiel"
      ]
    },
    {
      title: "Consultant Architecte Solution",
      company: "La Banque Postale (via Marte)",
      logo: "/logos/banque-postale.png",
      period: "Septembre 2022 - Mai 2023",
      category: "Architecture Solution & Cadrage",
      accent: "border-l-emerald-500",
      description: [
        "Cadrage de projets de transformation digitale",
        "Analyses d'impacts (Adhérence projets et Stratégie SI)",
        "Rédaction des Dossiers d'Architecture Applicative et Technique (DAT)",
        "Passage et soutenance des dossiers en Design Authority pour validation",
        "Collaboration au sein des Squads pour l'intégration systémique",
        "Cartographie des processus métiers et flux du périmètre crédit immobilier"
      ]
    },
    {
      title: "Consultant Solution AE MEGA HOPEX",
      company: "Marte",
      period: "Janvier 2020 - Septembre 2022",
      category: "Expertise MEGA HOPEX & API",
      accent: "border-l-amber-500",
      description: [
        "Migration de MEGA 2009 vers MEGA HOPEX V2R1",
        "Analyse de cas d'usage et portage de fonctionnalités métiers",
        "Développement de scripts en VB.Net pour l'API MEGA HOPEX",
        "Conception d'interfaces utilisateur personnalisées et scripts VBScript pour l'automatisation",
        "Support technique et fonctionnel auprès des utilisateurs",
        "Conduite du changement et formation"
      ]
    },
    {
      title: "Ingénieur Études et Développement",
      company: "Société Générale",
      logo: "/logos/societe-generale.png",
      period: "Janvier 2017 - Janvier 2019",
      category: "Développement Web & AMOA",
      accent: "border-l-blue-500",
      description: [
        "Développement d'applications web (PHP 7, Symfony 3.4, MySQL, JavaScript)",
        "Création et consommation d'API REST",
        "Gestion des déploiements sur environnements Linux",
        "Animation des Daily Meetings en méthode Agile",
        "Assistance à la maîtrise d'ouvrage (AMOA)"
      ]
    }
  ];

  const education = [
    {
      degree: "Master 2 Expert en Systèmes d'Informations",
      school: "Pôle Universitaire Léonard de Vinci - Sup de Vinci",
      year: "2019"
    },
    {
      degree: "Licence 3 Parcours MIAGE",
      school: "Université d'Orléans",
      year: "2017"
    }
  ];

  const skillGroups = [
    {
      title: "Architecture & Cartographie SI",
      icon: Layers,
      accent: "border-l-violet-500",
      items: ["MEGA HOPEX V5 & V2R1", "Cartographie Applicative", "Flux & Processus SI", "Dossier d'Architecture (DAT)", "Design Authority", "UML & MERISE", "Gouvernance Données"]
    },
    {
      title: "Développement Full-Stack Moderne",
      icon: Code2,
      accent: "border-l-blue-500",
      items: ["Next.js 16 / 15", "React 19", "TypeScript", "Node.js & Express", "JavaScript (Vanilla)", "HTML5 & CSS3", "PHP 7 & Symfony"]
    },
    {
      title: "Base de Données & DevOps",
      icon: Database,
      accent: "border-l-emerald-500",
      items: ["PostgreSQL", "Prisma ORM", "MySQL", "Docker & Docker Compose", "API REST & JWT", "Stripe & PayPal SDK", "Gitlab & Linux", "VB.Net / VBScript"]
    }
  ];

  const contact = {
    email: "ramsinconseil@gmail.com",
    phone: "+33 (0)7 61 51 88 90",
    location: "Paris & Région Parisienne (Fresnes)"
  };

  const handleBookingRedirect = () => {
    navigate("/contact", { state: { scrollToBooking: true } });
  };

  return (
    <>
      <SEO
        title="À Propos - RAMSIN Conseil | Architecture SI & Développement Web"
        description="Profil, parcours professionnel et compétences de RAMSIN Conseil, cabinet en Architecture des SI, Expert MEGA HOPEX et Développeur Full-Stack."
      />

      {/* ═══════════════════════════════════════════
          HERO HEADER AVEC HALO LUMINEUX
      ═══════════════════════════════════════════ */}
      <section className="relative overflow-hidden border-b border-border/60">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px]" />
          <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-emerald-500/8 rounded-full blur-[80px]" />
        </div>

        <div className="container mx-auto px-4 py-16 md:py-24 text-center max-w-4xl space-y-5">
          {/* Badges de statut & qualification */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-bold text-emerald-700 dark:text-emerald-300 shadow-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              Disponible pour de nouvelles missions
            </div>

            <Badge variant="outline" className="px-3.5 py-1 text-xs border-primary/30 text-primary font-semibold">
              <Star className="w-3.5 h-3.5 mr-1.5 inline text-amber-500" /> Cabinet Conseil SI & Développement Full-Stack
            </Badge>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.1]">
            RAMSIN
            <span className="block gradient-text mt-1">Conseil</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Architecture des Systèmes d'Information | Expert MEGA HOPEX | Conception d'Applications Full-Stack
          </p>

          {/* Contact rapide */}
          <div className="flex flex-wrap gap-3 justify-center text-sm pt-2">
            <a href={`mailto:${contact.email}`} className="bg-secondary/80 hover:bg-secondary px-3.5 py-2 rounded-full flex items-center gap-1.5 transition-colors font-medium">
              <Mail className="w-3.5 h-3.5 text-primary" /> {contact.email}
            </a>
            <a href="tel:+33761518890" className="bg-secondary/80 hover:bg-secondary px-3.5 py-2 rounded-full flex items-center gap-1.5 transition-colors font-medium">
              <Phone className="w-3.5 h-3.5 text-primary" /> {contact.phone}
            </a>
            <span className="bg-secondary/80 px-3.5 py-2 rounded-full flex items-center gap-1.5 font-medium">
              <MapPin className="w-3.5 h-3.5 text-primary" /> {contact.location}
            </span>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-4xl mx-auto">

          {/* ═══════════════════════════════════════════
              SYNTHÈSE PROFIL
          ═══════════════════════════════════════════ */}
          <Card className="mb-14 border-2 border-primary/20 bg-gradient-to-r from-primary/5 via-background to-background glass-card rounded-2xl">
            <CardContent className="pt-6 space-y-4 text-base leading-relaxed">
              <p>
                Doté d'une double compétence rare alliant <strong>l'Architecture des Systèmes d'Information d'Entreprise (MEGA HOPEX)</strong> et <strong>le Développement Web & Mobile Full-Stack moderne (Next.js, Node.js, PostgreSQL, Docker)</strong>, j'accompagne les DSI et les entreprises dans la structuration et la numérisation de leurs activités.
              </p>
              <p>
                Ma rigueur, ma curiosité technique insatiable et ma volonté inébranlable sont les atouts clés qui me permettent de m'intégrer avec aisance au sein des équipes (Squads Agiles, Design Authorities, Comités DSI).
              </p>
            </CardContent>
          </Card>

          {/* ═══════════════════════════════════════════
              DOMAINES DE COMPÉTENCES (GLASSMORPHISM)
          ═══════════════════════════════════════════ */}
          <section className="mb-14">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Wrench className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-2xl font-extrabold tracking-tight">Domaines d'Expertise & Stack</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {skillGroups.map((group, index) => {
                const IconComp = group.icon;
                return (
                  <Card key={index} className={`border border-border/80 border-l-4 ${group.accent} hover-lift glass-card rounded-2xl`}>
                    <CardHeader className="pb-3">
                      <div className="p-2 bg-primary/10 rounded-lg w-fit text-primary mb-2">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <CardTitle className="text-lg font-bold">{group.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-1.5">
                        {group.items.map((item, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* ═══════════════════════════════════════════
              TIMELINE D'EXPÉRIENCES PROFESSIONNELLES
          ═══════════════════════════════════════════ */}
          <section ref={expRef} className={`mb-14 scroll-fade-up ${expVisible ? "is-visible" : ""}`}>
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Briefcase className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-2xl font-extrabold tracking-tight">Expériences Professionnelles</h2>
            </div>

            {/* Timeline */}
            <div className="relative">
              {/* Ligne verticale connectrice */}
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/40 via-primary/20 to-transparent hidden md:block" />

              <div className="space-y-6">
                {experiences.map((exp, index) => (
                  <div key={index} className="relative md:pl-12">
                    {/* Point sur la timeline */}
                    <div className="absolute left-2.5 top-6 w-3 h-3 rounded-full bg-primary border-2 border-background hidden md:block" />

                    <Card className={`border border-border/80 border-l-4 ${exp.accent} shadow-sm hover-lift glass-card rounded-2xl overflow-hidden`}>
                      <CardContent className="p-5 space-y-3">
                        {/* Header de l'expérience */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                          <div className="flex items-center gap-3">
                            {exp.logo && (
                              <img
                                src={exp.logo}
                                alt={`Logo ${exp.company}`}
                                className="h-8 w-auto object-contain"
                              />
                            )}
                            <div>
                              <h3 className="text-lg font-extrabold text-foreground">{exp.title}</h3>
                              <p className="text-sm font-bold text-primary">{exp.company}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                              {exp.category}
                            </Badge>
                            <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full whitespace-nowrap">
                              {exp.period}
                            </span>
                          </div>
                        </div>

                        {/* Description */}
                        <ul className="space-y-1.5 pt-1">
                          {exp.description.map((item, i) => (
                            <li key={i} className="text-sm text-muted-foreground flex items-start gap-2.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2"></span>
                              <span className="leading-relaxed">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════
              FORMATIONS & DIPLÔMES
          ═══════════════════════════════════════════ */}
          <section ref={eduRef} className={`mb-14 scroll-fade-up ${eduVisible ? "is-visible" : ""}`}>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-primary/10 rounded-lg">
                <School className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-2xl font-extrabold tracking-tight">Formation & Diplômes</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {education.map((edu, index) => (
                <Card key={index} className="border border-border/80 hover-lift glass-card rounded-2xl">
                  <CardContent className="pt-6 space-y-2">
                    <span className="text-xs font-bold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full inline-block">
                      {edu.year}
                    </span>
                    <h3 className="text-lg font-bold">{edu.degree}</h3>
                    <p className="text-sm text-muted-foreground">{edu.school}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* ═══════════════════════════════════════════
              CTA DE BAS DE PAGE
          ═══════════════════════════════════════════ */}
          <div
            ref={ctaRef}
            className={`relative overflow-hidden bg-gradient-to-r from-primary/10 via-primary/5 to-emerald-500/10 border-2 border-primary/20 rounded-3xl p-8 md:p-12 text-center shadow-md glass-card scroll-scale-up ${ctaVisible ? "is-visible" : ""}`}
          >
            <Sparkles className="w-10 h-10 text-primary mx-auto mb-4" />
            <h3 className="text-2xl md:text-3xl font-extrabold mb-3 tracking-tight">
              Travaillons ensemble sur votre projet
            </h3>
            <p className="text-muted-foreground text-base sm:text-lg mb-8 max-w-xl mx-auto leading-relaxed">
              Que ce soit pour une mission de conseil en architecture SI, d'administration MEGA HOPEX ou pour le développement d'une application web sur-mesure.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                onClick={handleBookingRedirect}
                className="gap-2 font-extrabold cursor-pointer shadow-md bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                Réserver mon échange (30 min) <ArrowRight className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="font-bold"
                onClick={() => navigate("/projects")}
              >
                Voir les réalisations
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
