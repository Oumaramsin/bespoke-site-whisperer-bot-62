import { useState } from "react";
import { PROJECTS_DATA, Project } from "@/data/projects";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Calendar, Building2, Award, Briefcase, Code, Sparkles, Layers } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollAnimation();

  const filteredProjects = activeCategory === "all"
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter((p) => p.category === activeCategory);

  const categories = [
    { id: "all", label: "Toutes les réalisations" },
    { id: "fullstack", label: "Applications Fullstack (Next.js / Node)" },
    { id: "ecommerce-web", label: "E-Commerce & Sites Web" },
    { id: "mega-hopex", label: "MEGA HOPEX & Cartographie SI" },
    { id: "architecture-si", label: "Architecture SI & Solution" },
  ];

  return (
    <>
      <SEO
        title="Projets & Réalisations | Oumar SIDIBÉ - Architecte SI & Développeur Fullstack"
        description="Découvrez les projets réels développés par Oumar SIDIBÉ : AfriConnect, Maison HamdiWaShukri, L'Éclat du Chef, ainsi que ses missions d'Architecture SI chez COVEA et La Banque Postale."
      />

      <div className="container mx-auto px-4 py-12 md:py-20">
        {/* En-tête de la page (Visible immédiatement) */}
        <div className="max-w-4xl mx-auto text-center mb-12 animate-fade-in">
          <Badge variant="outline" className="mb-4 px-4 py-1 text-sm border-primary/30 text-primary">
            <Award className="w-3.5 h-3.5 mr-1.5 inline-block" />
            Réalisations & Portfolio
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Projets & Applications Développées
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Découvrez l'éventail des projets et applications web conçus par Oumar SIDIBÉ, combinant architecture logicielle solide, interfaces utilisateurs d'excellence et expertise métier.
          </p>
        </div>

        {/* Filtres de catégories (Visibles immédiatement) */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <Button
              key={cat.id}
              variant={activeCategory === cat.id ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(cat.id)}
              className="rounded-full px-5 transition-all text-xs sm:text-sm"
            >
              {cat.label}
            </Button>
          ))}
        </div>

        {/* Grille de projets (Visibles immédiatement dès l'arrivée sur la page) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {filteredProjects.map((project: Project) => (
            <Card key={project.id} className="flex flex-col border border-border/80 shadow-sm hover:shadow-md transition-all hover-lift">
              <CardHeader className="pb-4">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <Badge variant="default" className="text-xs font-semibold px-3 py-1 bg-primary text-primary-foreground flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5" />
                    {project.clientCompany}
                  </Badge>
                  <span className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-primary" />
                    {project.period}
                  </span>
                </div>
                <CardTitle className="text-2xl font-bold leading-tight">{project.title}</CardTitle>
                <CardDescription className="text-base mt-2 leading-relaxed text-muted-foreground">
                  {project.summary}
                </CardDescription>
              </CardHeader>

              <CardContent className="flex-1 space-y-6">
                {/* Contexte & Public Cible */}
                {project.context && (
                  <div className="bg-muted/40 p-4 rounded-lg border border-border/40 space-y-2">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-primary flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" /> Contexte & Objectif
                    </h4>
                    <p className="text-sm text-foreground">{project.context}</p>
                    {project.targetAudience && (
                      <p className="text-xs text-muted-foreground pt-1 border-t border-border/40">
                        <strong>Public Cible :</strong> {project.targetAudience}
                      </p>
                    )}
                  </div>
                )}

                {/* Fonctionnalités Phares */}
                {project.features && project.features.length > 0 && (
                  <div className="space-y-2.5">
                    <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                      <Layers className="w-4 h-4 text-primary" /> Fonctionnalités Phares :
                    </h4>
                    <ul className="space-y-2">
                      {project.features.map((feat, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Tâches & Implémentation Technique */}
                {project.tasks && project.tasks.length > 0 && (
                  <div className="space-y-2 pt-2 border-t border-border/60">
                    <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                      <Code className="w-4 h-4 text-primary" /> Travaux & Choix Techniques :
                    </h4>
                    <ul className="space-y-1.5">
                      {project.tasks.map((task, i) => (
                        <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-1.5"></span>
                          <span>{task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Badges de Technologies / Tags Cliquables & Interactifs */}
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-border/60">
                  {project.tags.map((tag, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => {
                        const targetCat = tag.toLowerCase().includes("hopex") || tag.toLowerCase().includes("mega")
                          ? "mega-hopex"
                          : tag.toLowerCase().includes("next") || tag.toLowerCase().includes("node") || tag.toLowerCase().includes("react")
                          ? "fullstack"
                          : "all";
                        setActiveCategory(targetCat);
                      }}
                      className="text-xs bg-secondary hover:bg-primary/10 hover:text-primary text-secondary-foreground px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer"
                      title={`Filtrer par la technologie ${tag}`}
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Section Appel à l'Action en bas de page (S'anime au scroll) */}
        <div ref={ctaRef} className={`bg-gradient-to-r from-primary/10 via-primary/5 to-background border border-primary/20 rounded-2xl p-8 md:p-12 text-center max-w-4xl mx-auto shadow-sm scroll-scale-up ${ctaVisible ? "is-visible" : ""}`}>
          <Briefcase className="w-12 h-12 text-primary mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Un projet web, e-commerce ou d'architecture SI à concrétiser ?
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Discutez directement avec Oumar SIDIBÉ pour échanger sur vos besoins applicatifs, vos choix techniques ou la modélisation de votre SI.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="gap-2">
              <Link to="/contact">
                Prendre contact <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/about">Consulter le profil complet</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Projects;
