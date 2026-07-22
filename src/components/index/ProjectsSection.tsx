import { PROJECTS_DATA } from "@/data/projects";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Award, AlertTriangle, TrendingUp, Sparkles, Building2, CheckCircle2, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export const ProjectsSection = () => {
  const featuredProjects = PROJECTS_DATA.filter((p) => p.featured).slice(0, 3);
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollAnimation();

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-secondary/15 via-background to-secondary/15 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl h-[500px] bg-gradient-to-r from-blue-500/5 via-emerald-500/5 to-purple-500/5 blur-3xl pointer-events-none -z-10" />

      {/* Wave separator top */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none -translate-y-[1px]">
        <svg viewBox="0 0 1200 60" preserveAspectRatio="none" className="w-full h-8 md:h-12">
          <path d="M0,30 C200,60 400,0 600,30 C800,60 1000,0 1200,30 L1200,0 L0,0 Z" fill="hsl(var(--secondary) / 0.4)" />
        </svg>
      </div>

      <div className="container mx-auto px-4">
        {/* En-tête de section */}
        <div ref={headerRef} className={`flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6 scroll-fade-up ${headerVisible ? "is-visible" : ""}`}>
          <div className="space-y-3">
            <Badge variant="outline" className="px-3.5 py-1 text-xs border-primary/30 text-primary font-semibold">
              <Award className="w-3.5 h-3.5 mr-1.5 inline text-amber-500" /> Preuve Par l'Impact Concret
            </Badge>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
              Études de Cas & Projets Réalisés
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
              Découvrez comment nous avons transformé les contraintes initiales de nos clients en succès digitaux mesurables.
            </p>
          </div>
          <Button asChild variant="outline" className="shrink-0 gap-2 font-bold hover-lift border-primary/30 hover:border-primary/60">
            <Link to="/projects">
              Explorer tout le portfolio <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>

        {/* Grille des Cartes Projets d'Impact */}
        <div ref={cardsRef} className={`grid grid-cols-1 md:grid-cols-3 gap-8 scroll-fade-up ${cardsVisible ? "is-visible" : ""}`}>
          {featuredProjects.map((project, index) => (
            <Card
              key={project.id}
              className={`flex flex-col h-full bg-card/95 border-2 border-border/80 hover:border-primary/60 transition-all hover-lift shadow-lg group rounded-2xl overflow-hidden glass-card stagger-${index + 1}`}
            >
              {/* En-tête de Carte avec Badges */}
              <CardHeader className="pb-4 pt-5 px-6 border-b border-border/60 bg-gradient-to-r from-muted/50 to-transparent">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    {project.logo && (
                      <img
                        src={project.logo}
                        alt={`Logo ${project.clientCompany}`}
                        className="h-7 w-auto object-contain"
                      />
                    )}
                    <Badge variant="secondary" className="text-xs font-bold px-3 py-1 bg-primary/10 text-primary border-primary/20 flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5" />
                      {project.clientCompany}
                    </Badge>
                  </div>
                  <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground border-border/80">
                    {project.categoryLabel}
                  </Badge>
                </div>
                <CardTitle className="text-xl font-extrabold leading-snug group-hover:text-primary transition-colors">
                  {project.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col justify-between p-6 space-y-5">
                {/* Transformation Pipeline : Défi -> Solution -> Impact */}
                <div className="space-y-3.5">
                  {/* 1. Défi Initial */}
                  {project.problem && (
                    <div className="p-3.5 rounded-xl bg-rose-500/10 dark:bg-rose-950/30 border border-rose-500/25 text-xs space-y-1">
                      <div className="font-extrabold text-rose-600 dark:text-rose-400 flex items-center gap-1.5 uppercase tracking-wider text-[10px]">
                        <AlertTriangle className="w-3.5 h-3.5" /> 1. Le Défi Initial
                      </div>
                      <p className="text-foreground/90 font-medium leading-relaxed">
                        {project.problem}
                      </p>
                    </div>
                  )}

                  {/* 2. Intervention RAMSIN */}
                  {project.solution && (
                    <div className="p-3.5 rounded-xl bg-primary/10 dark:bg-primary/15 border border-primary/25 text-xs space-y-1">
                      <div className="font-extrabold text-primary flex items-center gap-1.5 uppercase tracking-wider text-[10px]">
                        <Sparkles className="w-3.5 h-3.5 text-amber-500" /> 2. La Solution Sur-Mesure
                      </div>
                      <p className="text-foreground/90 font-medium leading-relaxed">
                        {project.solution}
                      </p>
                    </div>
                  )}

                  {/* 3. Résultat & Impact Métier */}
                  {project.impact && (
                    <div className="p-3.5 rounded-xl bg-emerald-500/15 dark:bg-emerald-500/20 border-2 border-emerald-500/40 text-xs space-y-1 shadow-2xs">
                      <div className="font-black text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5 uppercase tracking-wider text-[10px]">
                        <TrendingUp className="w-3.5 h-3.5 text-emerald-500" /> 3. Résultat & Impact Concret
                      </div>
                      <p className="text-emerald-950 dark:text-emerald-100 font-extrabold leading-relaxed">
                        {project.impact}
                      </p>
                    </div>
                  )}
                </div>

                {/* Stack Technique & Lien Détail */}
                <div className="pt-3 border-t border-border/60 space-y-3">
                  <div className="flex flex-wrap gap-1.5">
                    {project.stack?.slice(0, 4).map((tech, i) => (
                      <span key={i} className="text-[10px] font-bold bg-secondary text-secondary-foreground px-2 py-0.5 rounded-md border border-border/40">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <Link
                    to="/projects"
                    className="text-xs font-extrabold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1 group-hover:translate-x-1"
                  >
                    Voir l'étude de cas complète <ArrowUpRight className="w-4 h-4 ml-0.5" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Wave separator bottom */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none translate-y-[1px]">
        <svg viewBox="0 0 1200 60" preserveAspectRatio="none" className="w-full h-8 md:h-12">
          <path d="M0,30 C200,0 400,60 600,30 C800,0 1000,60 1200,30 L1200,60 L0,60 Z" fill="hsl(var(--secondary) / 0.4)" />
        </svg>
      </div>
    </section>
  );
};

export default ProjectsSection;
