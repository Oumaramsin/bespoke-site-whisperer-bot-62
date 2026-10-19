import { useState } from "react";
import { PROJECTS_DATA } from "@/data/projects";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Award, Laptop, Layers } from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { trackConversionEvent } from "@/lib/analytics";
import ProjectCard from "@/components/projects/ProjectCard";

export const ProjectsSection = () => {
  const [activeTab, setActiveTab] = useState<"web" | "si">("web");
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollAnimation();

  const displayedProjects = PROJECTS_DATA.filter((p) => p.pole === activeTab);

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-secondary/20 via-background to-secondary/15 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl h-[500px] bg-gradient-to-r from-[#123A35]/5 via-[#C7F36B]/5 to-emerald-500/5 blur-3xl pointer-events-none -z-10" />

      {/* Wave separator top */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none -translate-y-[1px]">
        <svg viewBox="0 0 1200 60" preserveAspectRatio="none" className="w-full h-8 md:h-12">
          <path d="M0,30 C200,60 400,0 600,30 C800,60 1000,0 1200,30 L1200,0 L0,0 Z" fill="hsl(var(--secondary) / 0.4)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 max-w-7xl">
        {/* En-tête de section */}
        <div
          ref={headerRef}
          className={`flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 scroll-fade-up ${
            headerVisible ? "is-visible" : ""
          }`}
        >
          <div className="space-y-3">
            <Badge variant="outline" className="px-3.5 py-1 text-xs border-primary/30 text-primary font-semibold">
              <Award className="w-3.5 h-3.5 mr-1.5 inline text-amber-500" />
              Réalisations
            </Badge>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">Des idées devenues de vrais produits</h2>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl leading-relaxed">
              Le défi de départ, ce que nous avons construit et le résultat obtenu pour chaque client.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            {/* Toggle Web vs SI */}
            <div className="inline-flex p-1 rounded-xl bg-muted/80 border border-border/80 shadow-2xs">
              {(
                [
                  { key: "web", label: "Web & Mobile", icon: Laptop },
                  { key: "si", label: "Architecture SI & MEGA HOPEX", icon: Layers },
                ] as const
              ).map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => {
                    setActiveTab(key);
                    trackConversionEvent("switch_projects_tab", { tab: key });
                  }}
                  className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all cursor-pointer flex items-center gap-2 ${
                    activeTab === key
                      ? "bg-card text-foreground shadow-xs border border-border/60"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon className="w-4 h-4 text-primary" />
                  {label} ({PROJECTS_DATA.filter((p) => p.pole === key).length})
                </button>
              ))}
            </div>

            <Button asChild variant="outline" className="gap-2 font-bold hover-lift border-primary/30 hover:border-primary/60 text-xs sm:text-sm">
              <Link to="/projets">
                Toutes les réalisations <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Grille des cartes projets */}
        <div
          ref={cardsRef}
          className={`grid grid-cols-1 sm:grid-cols-2 ${
            activeTab === "web" ? "lg:grid-cols-3" : "max-w-5xl mx-auto"
          } gap-6 scroll-fade-up ${cardsVisible ? "is-visible" : ""}`}
        >
          {displayedProjects.map((project) => (
            <ProjectCard key={project.id} project={project} source="home_projects" />
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
