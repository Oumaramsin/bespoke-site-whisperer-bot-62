import { useState } from "react";
import { PROJECTS_DATA, Project } from "@/data/projects";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  CheckCircle2,
  Building2,
  Award,
  Briefcase,
  Code,
  Sparkles,
  Layers,
  AlertTriangle,
  TrendingUp,
  Zap,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import SEO from "@/components/SEO";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

/* Couleur de bordure latérale selon la catégorie */
const categoryAccent: Record<string, string> = {
  fullstack: "border-l-blue-500",
  "ecommerce-web": "border-l-amber-500",
  "mega-hopex": "border-l-violet-500",
  "architecture-si": "border-l-emerald-500",
};

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollAnimation();
  const navigate = useNavigate();

  const filteredProjects =
    activeCategory === "all"
      ? PROJECTS_DATA
      : PROJECTS_DATA.filter((p) => p.category === activeCategory);

  const categories = [
    { id: "all", label: "Toutes les réalisations", count: PROJECTS_DATA.length },
    { id: "fullstack", label: "Applications Full-Stack", count: PROJECTS_DATA.filter(p => p.category === "fullstack").length },
    { id: "ecommerce-web", label: "E-Commerce & Sites Web", count: PROJECTS_DATA.filter(p => p.category === "ecommerce-web").length },
    { id: "mega-hopex", label: "MEGA HOPEX & Cartographie SI", count: PROJECTS_DATA.filter(p => p.category === "mega-hopex").length },
    { id: "architecture-si", label: "Architecture SI & Solution", count: PROJECTS_DATA.filter(p => p.category === "architecture-si").length },
  ];

  const handleBookingRedirect = () => {
    navigate("/contact", { state: { scrollToBooking: true } });
  };

  return (
    <>
      <SEO
        title="Projets & Réalisations | RAMSIN - Architecte SI & Développeur Full-Stack"
        description="Découvrez les projets réels développés par RAMSIN Conseil : Dabari, Maison HamdiWaShukri, L'Éclat du Chef, ainsi que des missions d'Architecture SI chez COVEA et La Banque Postale."
      />

      {/* ═══════════════════════════════════════════
          HERO HEADER AVEC HALO LUMINEUX
      ═══════════════════════════════════════════ */}
      <section className="relative overflow-hidden border-b border-border/60">
        {/* Halo lumineux ambiant */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px]" />
          <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-emerald-500/8 rounded-full blur-[80px]" />
        </div>

        <div className="container mx-auto px-4 py-16 md:py-24 text-center max-w-4xl space-y-6">
          <Badge
            variant="outline"
            className="px-4 py-1.5 text-xs font-semibold border-primary/30 text-primary"
          >
            <Award className="w-3.5 h-3.5 mr-1.5 inline text-amber-500" />
            Portfolio & Études de Cas Réelles
          </Badge>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.1]">
            Projets & Réalisations
            <span className="block gradient-text mt-1">d'Excellence</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            De la conception d'applications Full-Stack modernes à la gouvernance
            du SI d'entreprise — découvrez comment RAMSIN Conseil transforme
            les défis en succès mesurables.
          </p>


        </div>
      </section>

      <div className="container mx-auto px-4 py-12 md:py-16">
        {/* ═══════════════════════════════════════════
            FILTRES PAR CATÉGORIES AVEC COMPTEURS
        ═══════════════════════════════════════════ */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <Button
              key={cat.id}
              variant={activeCategory === cat.id ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(cat.id)}
              className="rounded-full px-5 transition-all text-xs sm:text-sm font-semibold cursor-pointer gap-1.5"
            >
              {cat.label}
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ml-0.5 font-bold ${activeCategory === cat.id ? "bg-white/20 text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                {cat.count}
              </span>
            </Button>
          ))}
        </div>

        {/* ═══════════════════════════════════════════
            GRILLE DE PROJETS EN 2 COLONNES
        ═══════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {filteredProjects.map((project: Project, index) => {
            const accentClass = categoryAccent[project.category] || "border-l-primary";

            return (
              <Card
                key={project.id}
                className={`flex flex-col border border-border/80 border-l-4 ${accentClass} shadow-sm hover:shadow-xl transition-all duration-300 hover-lift glass-card rounded-2xl overflow-hidden`}
              >
                {/* En-tête de carte compact */}
                <CardHeader className="p-5 pb-3 space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      {project.logo && (
                        <img
                          src={project.logo}
                          alt={`Logo ${project.clientCompany}`}
                          className="h-8 w-auto object-contain"
                        />
                      )}
                      <Badge
                        variant="secondary"
                        className="text-[11px] font-bold px-2.5 py-0.5 bg-primary/10 text-primary border border-primary/20 flex items-center gap-1"
                      >
                        <Building2 className="w-3 h-3" />
                        {project.clientCompany}
                      </Badge>
                    </div>
                    <Badge
                      variant="outline"
                      className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground"
                    >
                      {project.categoryLabel}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl font-extrabold leading-snug">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="text-sm leading-relaxed text-muted-foreground">
                    {project.summary}
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex-1 p-5 pt-0 space-y-3">
                  {/* ─── PIPELINE D'IMPACT COMPACT (bande horizontale) ─── */}
                  {(project.problem || project.solution || project.impact) && (
                    <div className="grid grid-cols-3 gap-2 text-center">
                      {project.problem && (
                        <div className="p-2.5 rounded-lg bg-rose-100 dark:bg-rose-950/25 border border-rose-300 dark:border-rose-500/20">
                          <AlertTriangle className="w-3.5 h-3.5 text-rose-500 mx-auto mb-1" />
                          <span className="text-[10px] font-black uppercase tracking-wider text-rose-600 dark:text-rose-400 block">Défi</span>
                          <p className="text-xs text-foreground/85 leading-snug mt-0.5">{project.problem}</p>
                        </div>
                      )}
                      {project.solution && (
                        <div className="p-2.5 rounded-lg bg-blue-100 dark:bg-blue-950/25 border border-blue-300 dark:border-blue-500/20">
                          <Zap className="w-3.5 h-3.5 text-blue-500 mx-auto mb-1" />
                          <span className="text-[10px] font-black uppercase tracking-wider text-blue-600 dark:text-blue-400 block">Solution</span>
                          <p className="text-xs text-foreground/85 leading-snug mt-0.5">{project.solution}</p>
                        </div>
                      )}
                      {project.impact && (
                        <div className="p-2.5 rounded-lg bg-emerald-100 dark:bg-emerald-500/15 border border-emerald-300 dark:border-emerald-500/30">
                          <TrendingUp className="w-3.5 h-3.5 text-emerald-500 mx-auto mb-1" />
                          <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-300 block">Impact</span>
                          <p className="text-xs text-emerald-950 dark:text-emerald-100 font-bold leading-snug mt-0.5">{project.impact}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* ─── CONTEXTE (si pas de pipeline) ─── */}
                  {project.context && !project.problem && (
                    <div className="bg-muted/40 p-3 rounded-lg border border-border/40 space-y-1">
                      <h4 className="text-[10px] font-bold uppercase tracking-wider text-primary flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-amber-500" /> Contexte
                      </h4>
                      <p className="text-xs text-foreground leading-relaxed">{project.context}</p>
                    </div>
                  )}

                  {/* ─── FONCTIONNALITÉS PHARES ─── */}
                  {project.features && project.features.length > 0 && (
                    <div className="space-y-1.5">
                      <h4 className="text-xs font-bold text-foreground flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-primary" /> Ce qui a été livré :
                      </h4>
                      <ul className="space-y-1">
                        {project.features.map((feat, i) => (
                          <li key={i} className="text-xs sm:text-sm text-muted-foreground flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span className="leading-snug">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* ─── TRAVAUX & CHOIX TECHNIQUES ─── */}
                  {project.tasks && project.tasks.length > 0 && (
                    <div className="space-y-1.5 pt-2 border-t border-border/60">
                      <h4 className="text-sm font-bold text-foreground flex items-center gap-1.5">
                        <Code className="w-3.5 h-3.5 text-primary" /> Comment nous l'avons réalisé :
                      </h4>
                      <ul className="space-y-1">
                        {project.tasks.map((task, i) => (
                          <li key={i} className="text-xs sm:text-sm text-muted-foreground flex items-start gap-1.5">
                            <span className="w-1 h-1 rounded-full bg-primary shrink-0 mt-1.5" />
                            <span className="leading-snug">{task}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* ─── BADGES DE STACK TECHNIQUE ─── */}
                  <div className="flex flex-wrap gap-1 pt-2 border-t border-border/60">
                    {project.tags.map((tag, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => {
                          const targetCat =
                            tag.toLowerCase().includes("hopex") ||
                            tag.toLowerCase().includes("mega")
                              ? "mega-hopex"
                              : tag.toLowerCase().includes("next") ||
                                  tag.toLowerCase().includes("node") ||
                                  tag.toLowerCase().includes("react")
                                ? "fullstack"
                                : "all";
                          setActiveCategory(targetCat);
                        }}
                        className="text-[10px] font-bold bg-secondary hover:bg-primary/10 hover:text-primary text-secondary-foreground px-2 py-0.5 rounded-md border border-border/30 transition-colors cursor-pointer"
                        title={`Filtrer par ${tag}`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* ═══════════════════════════════════════════
            SECTION APPEL À L'ACTION
        ═══════════════════════════════════════════ */}
        <div
          ref={ctaRef}
          className={`relative overflow-hidden bg-gradient-to-r from-primary/10 via-primary/5 to-emerald-500/10 border-2 border-primary/20 rounded-3xl p-8 md:p-12 text-center max-w-4xl mx-auto shadow-md glass-card scroll-scale-up ${ctaVisible ? "is-visible" : ""}`}
        >
          <Briefcase className="w-12 h-12 text-primary mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-extrabold mb-4 tracking-tight">
            Un projet web, e-commerce ou d'architecture SI à concrétiser ?
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
            Discutez directement avec RAMSIN Conseil lors d'un premier échange
            offert de 30 minutes sans aucun engagement.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              onClick={handleBookingRedirect}
              className="gap-2 font-extrabold cursor-pointer shadow-md bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              Réserver mon échange (30 min) <ArrowRight className="w-4 h-4" />
            </Button>
            <Button asChild variant="outline" size="lg" className="font-bold">
              <Link to="/about">Consulter le profil complet</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Projects;
