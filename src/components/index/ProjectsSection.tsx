import { useState } from "react";
import { PROJECTS_DATA, Project } from "@/data/projects";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Award,
  AlertTriangle,
  TrendingUp,
  Sparkles,
  Building2,
  ExternalLink,
  Laptop,
  Layers,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { trackConversionEvent } from "@/lib/analytics";

export const ProjectsSection = () => {
  const [activeTab, setActiveTab] = useState<"web" | "si">("web");
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollAnimation();

  const displayedProjects = PROJECTS_DATA.filter((p) => p.pole === activeTab);

  const getFauxUrl = (id: string) => {
    switch (id) {
      case "dabari":
        return "app.dabari.fr/dashboard";
      case "maison-hamdiwashukri":
        return "maisonhamdiwashukri.com/configurateur";
      case "leclat-du-chef":
        return "leclatduchef.fr/devis-evenementiel";
      case "covea-hopex-v5":
        return "hopex.covea.intra/cartographie-si";
      case "lbp-architecture-solution":
        return "architecture.labanquepostale.fr/dat";
      default:
        return "ramsin.fr/etude-de-cas";
    }
  };

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
            <Badge
              variant="outline"
              className="px-3.5 py-1 text-xs border-primary/30 text-primary font-semibold"
            >
              <Award className="w-3.5 h-3.5 mr-1.5 inline text-amber-500" />
              Preuves Visuelles & Résultats Réels
            </Badge>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
              Des Solutions Concrètes Déployées
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl leading-relaxed">
              Pas de théorie abstraite : découvrez les interfaces réelles conçues et mises en production pour nos clients, avec les résultats obtenus.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            {/* Toggle Web vs SI */}
            <div className="inline-flex p-1 rounded-xl bg-muted/80 border border-border/80 shadow-2xs">
              <button
                type="button"
                onClick={() => {
                  setActiveTab("web");
                  trackConversionEvent("switch_projects_tab", { tab: "web" });
                }}
                className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all cursor-pointer flex items-center gap-2 ${
                  activeTab === "web"
                    ? "bg-card text-foreground shadow-xs border border-border/60"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Laptop className="w-4 h-4 text-primary" />
                Applications Web & Mobile ({PROJECTS_DATA.filter((p) => p.pole === "web").length})
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab("si");
                  trackConversionEvent("switch_projects_tab", { tab: "si" });
                }}
                className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all cursor-pointer flex items-center gap-2 ${
                  activeTab === "si"
                    ? "bg-card text-foreground shadow-xs border border-border/60"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Layers className="w-4 h-4 text-primary" />
                Architecture SI & HOPEX ({PROJECTS_DATA.filter((p) => p.pole === "si").length})
              </button>
            </div>

            <Button
              asChild
              variant="outline"
              className="gap-2 font-bold hover-lift border-primary/30 hover:border-primary/60 text-xs sm:text-sm"
            >
              <Link to="/projets">
                Tout le portfolio <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Grille des Cartes Projets Visuelles */}
        <div
          ref={cardsRef}
          className={`grid grid-cols-1 ${
            activeTab === "web" ? "md:grid-cols-3" : "md:grid-cols-2 max-w-5xl mx-auto"
          } gap-8 scroll-fade-up ${cardsVisible ? "is-visible" : ""}`}
        >
          {displayedProjects.map((project, index) => (
            <Card
              key={project.id}
              className={`flex flex-col h-full bg-white border-2 border-border/80 hover:border-emerald-500/50 transition-all hover-lift shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_50px_-12px_rgba(18,58,53,0.18)] group rounded-3xl overflow-hidden stagger-${
                index + 1
              }`}
            >
              {/* 1. MOCKUP DE FENÊTRE D'INTERFACE (Browser Window Frame) */}
              <div className="relative border-b border-border/80 bg-slate-50/90 overflow-hidden">
                {/* Header de la fenêtre d'interface */}
                <div className="px-4 py-2.5 bg-slate-100/90 border-b border-border/60 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-400/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80 inline-block" />
                  </div>
                  <div className="flex-1 max-w-[220px] mx-auto bg-white text-[11px] font-mono text-muted-foreground py-0.5 px-2.5 rounded-md border border-border/60 truncate text-center shadow-2xs flex items-center justify-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                    <span className="truncate">{getFauxUrl(project.id)}</span>
                  </div>
                  <div className="w-8" />
                </div>

                {/* Image d'écran d'interface réelle */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-900/5">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={`Aperçu de l'interface ${project.title}`}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground text-xs">
                      Aperçu d'architecture
                    </div>
                  )}

                  {/* Badge métrique clé flottant sur l'image */}
                  {project.metric && (
                    <div className="absolute bottom-3 right-3 bg-card/95 backdrop-blur-md border border-border/80 shadow-md rounded-xl px-3 py-1.5 flex items-center gap-2">
                      <span className="text-sm font-extrabold text-[#123A35] bg-[#C7F36B] px-1.5 py-0.5 rounded-md">
                        {project.metric.value}
                      </span>
                      <span className="text-[11px] font-bold text-foreground">
                        {project.metric.label}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* 2. CONTENU DE LA CARTE ÉPURÉ & MODERNE */}
              <CardContent className="flex-1 flex flex-col justify-between p-5 sm:p-6 space-y-4">
                <div className="space-y-3">
                  {/* Badges client & catégorie */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5" />
                      {project.clientCompany}
                    </span>
                    <Badge
                      variant="outline"
                      className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground border-border/80"
                    >
                      {project.categoryLabel}
                    </Badge>
                  </div>

                  {/* Titre du projet */}
                  <h3 className="text-base sm:text-lg font-extrabold leading-snug text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>

                  {/* Résumé clair du projet et de la valeur apportée */}
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {project.summary}
                  </p>

                  {/* Impact & Résultat Clé vérifié (encadré sobre et valorisant) */}
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-start gap-2.5">
                    <div className="p-1 rounded-md bg-emerald-600/15 text-emerald-800 shrink-0 mt-0.5">
                      <TrendingUp className="w-3.5 h-3.5" />
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-extrabold text-emerald-900 uppercase tracking-wider block">
                        Résultat clé mesuré
                      </span>
                      <p className="text-xs font-semibold text-emerald-950 leading-snug">
                        {project.shortImpact || project.impact}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Footer de la carte : Lien direct vers l'étude */}
                <div className="pt-2 border-t border-border/60">
                  <Link
                    to={`/projets/${project.id}`}
                    onClick={() =>
                      trackConversionEvent("click_case_study", {
                        projectId: project.id,
                        title: project.title,
                      })
                    }
                    className="text-xs font-extrabold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1.5 group-hover:translate-x-1"
                  >
                    Consulter l'étude de cas détaillée <ArrowUpRight className="w-4 h-4 ml-0.5" />
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
