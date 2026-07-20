import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Briefcase, School, Wrench, Star, Mail, Phone, MapPin, Linkedin, ArrowRight, Code2, Database, Layers, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const About = () => {
  const { ref: expRef, isVisible: expVisible } = useScrollAnimation();
  const { ref: eduRef, isVisible: eduVisible } = useScrollAnimation();
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollAnimation();

  const experiences = [
    {
      title: "Consultant Architecte MEGA HOPEX",
      company: "COVEA",
      period: "Juin 2023 - Présent",
      category: "Architecture SI & MEGA HOPEX",
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
      period: "Septembre 2022 - Mai 2023",
      category: "Architecture Solution & Cadrage",
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
      period: "Janvier 2017 - Janvier 2019",
      category: "Développement Web & AMOA",
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
      items: ["MEGA HOPEX V5 & V2R1", "Cartographie Applicative", "Flux & Processus SI", "Dossier d'Architecture (DAT)", "Design Authority", "UML & MERISE", "Gouvernance Données"]
    },
    {
      title: "Développement Fullstack Moderne",
      icon: Code2,
      items: ["Next.js 16 / 15", "React 19", "TypeScript", "Node.js & Express", "JavaScript (Vanilla)", "HTML5 & CSS3", "PHP 7 & Symfony"]
    },
    {
      title: "Base de Données & DevOps",
      icon: Database,
      items: ["PostgreSQL", "Prisma ORM", "MySQL", "Docker & Docker Compose", "API REST & JWT", "Stripe & PayPal SDK", "Gitlab & Linux", "VB.Net / VBScript"]
    }
  ];

  const contact = {
    email: "sidibeoumar94@gmail.com",
    phone: "+33 (0)7 61 51 88 90",
    location: "Paris & Région Parisienne (Fresnes)",
    linkedin: "https://www.linkedin.com/public-profile/settings?trk=d_flagship3_profil"
  };

  return (
    <>
      <SEO
        title="À Propos - Oumar SIDIBÉ | Architecte SI & Développeur Fullstack"
        description="Profil, parcours professionnel et compétences d'Oumar SIDIBÉ, Consultant en Architecture des SI, Expert MEGA HOPEX et Développeur Fullstack."
      />

      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-4xl mx-auto">
          {/* En-tête Profil (Visible immédiatement) */}
          <div className="mb-12 text-center">
            <Badge variant="outline" className="mb-3 px-3.5 py-1 text-xs border-primary/30 text-primary font-semibold">
              Consultant Senior SI & Développeur Fullstack
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Oumar SIDIBÉ</h1>
            <p className="text-xl text-muted-foreground font-medium max-w-2xl mx-auto">
              Architecture des Systèmes d'Information | Expert MEGA HOPEX | Conception d'Applications Fullstack
            </p>
            <div className="mt-6 flex flex-wrap gap-3 justify-center text-sm">
              <a href={`mailto:${contact.email}`} className="bg-secondary/80 hover:bg-secondary px-3 py-1.5 rounded-full flex items-center gap-1.5 transition-colors">
                <Mail className="w-3.5 h-3.5 text-primary" /> {contact.email}
              </a>
              <a href="tel:+33761518890" className="bg-secondary/80 hover:bg-secondary px-3 py-1.5 rounded-full flex items-center gap-1.5 transition-colors">
                <Phone className="w-3.5 h-3.5 text-primary" /> {contact.phone}
              </a>
              <span className="bg-secondary/80 px-3 py-1.5 rounded-full flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-primary" /> {contact.location}
              </span>
            </div>
          </div>

          {/* Synthèse Profil (Visible immédiatement) */}
          <Card className="mb-12 border-primary/20 bg-gradient-to-r from-primary/5 via-background to-background hover-lift">
            <CardContent className="pt-6 space-y-4 text-base leading-relaxed">
              <p>
                Doté d'une double compétence rare alliant <strong>l'Architecture des Systèmes d'Information d'Entreprise (MEGA HOPEX)</strong> et <strong>le Développement Web & Mobile Fullstack moderne (Next.js, Node.js, PostgreSQL, Docker)</strong>, j'accompagne les DSI et les entreprises dans la structuration et la numérisation de leurs activités.
              </p>
              <p>
                Ma rigueur, ma curiosité technique insatiable et ma volonté inébranlable sont les atouts clés qui me permettent de m'intégrer avec aisance au sein des équipes (Squads Agiles, Design Authorities, Comités DSI).
              </p>
            </CardContent>
          </Card>

          {/* Domaines de Compétences (Visibles immédiatement) */}
          <section className="mb-14">
            <div className="flex items-center gap-3 mb-6">
              <Wrench className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">Domaines d'Expertise & Stack</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {skillGroups.map((group, index) => {
                const IconComp = group.icon;
                return (
                  <Card key={index} className="border border-border/80 hover-lift">
                    <CardHeader className="pb-3">
                      <div className="p-2 bg-primary/10 rounded-lg w-fit text-primary mb-2">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <CardTitle className="text-lg font-bold">{group.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-1.5">
                        {group.items.map((item, i) => (
                          <li key={i} className="text-xs text-muted-foreground flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
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

          {/* Expériences Professionnelles (S'anime au scroll quand on descend) */}
          <section ref={expRef} className={`mb-14 scroll-fade-up ${expVisible ? "is-visible" : ""}`}>
            <div className="flex items-center gap-3 mb-6">
              <Briefcase className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">Expériences Professionnelles</h2>
            </div>
            <div className="space-y-6">
              {experiences.map((exp, index) => (
                <Card key={index} className="border border-border/80 shadow-sm hover-lift">
                  <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2 gap-1">
                      <h3 className="text-xl font-bold text-foreground">{exp.title}</h3>
                      <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full w-fit">
                        {exp.period}
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-primary mb-4">{exp.company}</p>
                    <ul className="space-y-2">
                      {exp.description.map((item, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-start gap-2.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2"></span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Formations & Diplômes (S'anime au scroll) */}
          <section ref={eduRef} className={`mb-14 scroll-fade-up ${eduVisible ? "is-visible" : ""}`}>
            <div className="flex items-center gap-3 mb-6">
              <School className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">Formation & Diplômes</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {education.map((edu, index) => (
                <Card key={index} className="border border-border/80 hover-lift">
                  <CardContent className="pt-6">
                    <span className="text-xs font-bold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full mb-2 inline-block">
                      {edu.year}
                    </span>
                    <h3 className="text-lg font-bold mb-1">{edu.degree}</h3>
                    <p className="text-sm text-muted-foreground">{edu.school}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* CTA & LinkedIn (S'anime au scroll) */}
          <div ref={ctaRef} className={`bg-card border border-border rounded-2xl p-8 text-center shadow-sm scroll-scale-up ${ctaVisible ? "is-visible" : ""}`}>
            <h3 className="text-2xl font-bold mb-3">Travaillons ensemble sur votre projet</h3>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              Que ce soit pour une mission de conseil en architecture SI, d'administration MEGA HOPEX ou pour le développement d'une application web sur-mesure.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="gap-2">
                <Link to="/contact">
                  Me Contacter <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="gap-2">
                  <Linkedin className="w-4 h-4 text-blue-600" /> Profil LinkedIn
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
