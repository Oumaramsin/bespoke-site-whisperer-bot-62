import { PROJECTS_DATA } from "@/data/projects";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Award, Calendar, AlertTriangle, TrendingUp, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const ProjectsSection = () => {
  const featuredProjects = PROJECTS_DATA.filter((p) => p.featured).slice(0, 3);
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollAnimation();

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-secondary/15 via-background to-secondary/15 relative">
      {/* Wave separator top */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none -translate-y-[1px]">
        <svg viewBox="0 0 1200 60" preserveAspectRatio="none" className="w-full h-8 md:h-12">
          <path d="M0,30 C200,60 400,0 600,30 C800,60 1000,0 1200,30 L1200,0 L0,0 Z" fill="hsl(var(--secondary) / 0.4)" />
        </svg>
      </div>

      <div className="container mx-auto px-4">
        <div ref={headerRef} className={`flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6 scroll-fade-up ${headerVisible ? "is-visible" : ""}`}>
          <div>
            <Badge variant="outline" className="mb-3 px-3.5 py-1 text-xs border-primary/30 text-primary font-semibold">
              <Award className="w-3.5 h-3.5 mr-1 inline" /> Preuve Par l'Impact Concret
            </Badge>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
              Études de Cas & Projets Réalisés
            </h2>
            <p className="text-muted-foreground text-lg mt-2 max-w-2xl">
              Découvrez la différence entre la situation initiale de nos clients et l'impact concret apporté par nos solutions.
            </p>
          </div>
          <Button asChild variant="outline" className="shrink-0 gap-2 font-semibold hover-lift">
            <Link to="/projects">
              Explorer tout le portfolio <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>

        <div ref={cardsRef} className={`grid grid-cols-1 md:grid-cols-3 gap-8 scroll-fade-up ${cardsVisible ? "is-visible" : ""}`}>
          {featuredProjects.map((project, index) => (
            <Card key={project.id} className={`flex flex-col h-full bg-card/90 border border-border/80 hover:border-primary/50 transition-all hover-lift shadow-xs group stagger-${index + 1}`}>
              <CardHeader className="pb-3 border-b border-border/40">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <Badge variant="default" className="text-xs font-semibold px-2.5 py-0.5 bg-primary text-primary-foreground">
                    {project.categoryLabel}
                  </Badge>
                  <span className="text-xs text-muted-foreground font-medium flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-primary" />
                    {project.period}
                  </span>
                </div>
                <CardTitle className="text-xl font-bold leading-snug group-hover:text-primary transition-colors">
                  {project.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col justify-between pt-4 space-y-4">
                {/* Structure Trame : Problème -> Solution -> Impact */}
                <div className="space-y-3">
                  {/* Problème */}
                  {project.problem && (
                    <div className="p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-xs space-y-1">
                      <span className="font-bold text-destructive flex items-center gap-1 uppercase tracking-wider text-[10px]">
                        <AlertTriangle className="w-3 h-3" /> Le Problème Initial :
                      </span>
                      <p className="text-foreground/90 font-medium leading-relaxed">
                        {project.problem}
                      </p>
                    </div>
                  )}

                  {/* Solution */}
                  {project.solution && (
                    <div className="p-3 rounded-xl bg-primary/5 border border-primary/15 text-xs space-y-1">
                      <span className="font-bold text-primary flex items-center gap-1 uppercase tracking-wider text-[10px]">
                        <Sparkles className="w-3 h-3" /> La Solution Simple :
                      </span>
                      <p className="text-foreground/90 font-medium leading-relaxed">
                        {project.solution}
                      </p>
                    </div>
                  )}

                  {/* Impact Concret */}
                  {project.impact && (
                    <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs space-y-1">
                      <span className="font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1 uppercase tracking-wider text-[10px]">
                        <TrendingUp className="w-3 h-3" /> L'Impact Concret :
                      </span>
                      <p className="text-emerald-950 dark:text-emerald-200 font-bold leading-relaxed">
                        {project.impact}
                      </p>
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-border/60">
                  <Link
                    to="/projects"
                    className="text-xs font-bold text-primary hover:underline inline-flex items-center gap-1.5"
                  >
                    Consulter la fiche détaillée <ArrowRight className="w-3.5 h-3.5" />
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
