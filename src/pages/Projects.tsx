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
  Layers,
  AlertTriangle,
  TrendingUp,
  Zap,
  Sparkles,
  Calendar,
  Smartphone,
  Check,
  UserCheck,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import SEO from "@/components/SEO";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export const Projects = () => {
  const [activePole, setActivePole] = useState<"all" | "si" | "web">("all");
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollAnimation();
  const navigate = useNavigate();

  const filteredProjects =
    activePole === "all"
      ? PROJECTS_DATA
      : PROJECTS_DATA.filter((p) => p.pole === activePole);

  const handleBookingRedirect = () => {
    navigate("/contact", { state: { scrollToBooking: true } });
  };

  return (
    <>
      <SEO
        title="Études de Cas & Réalisations | RAMSIN Conseil - Architecture SI & Développement Web"
        description="Découvrez nos études de cas réelles et livrables : missions d'Architecture SI chez Covéa et La Banque Postale, ainsi que nos applications web & e-commerce Dabari et Maison HamdiWaShukri."
      />

      {/* ═══════════════════════════════════════════
          HERO HEADER AVEC HALO LUMINEUX
      ═══════════════════════════════════════════ */}
      <section className="relative overflow-hidden border-b border-border/60 pt-12 pb-16 md:pt-18 md:pb-22">
        <div className="absolute inset-0 -z-10 dot-grid-pattern pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-[350px] bg-gradient-to-r from-blue-500/10 via-emerald-500/8 to-blue-500/10 rounded-full blur-[100px] -z-10 pointer-events-none" />

        <div className="container mx-auto px-4 text-center max-w-4xl space-y-5">
          <Badge
            variant="outline"
            className="px-4 py-1.5 text-xs font-semibold border-primary/30 text-primary"
          >
            <Award className="w-3.5 h-3.5 mr-1.5 inline text-amber-500" />
            Preuves Tangibles & Résultats Mesurables
          </Badge>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.15]">
            Études de Cas &
            <span className="block gradient-text mt-1">Réalisations Réelles</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Pas de théorie abstraite : découvrez le contexte de départ, notre rôle précis, les livrables remis et l'impact direct obtenu pour nos clients.
          </p>

          {/* SÉLECTEUR DE CATÉGORIE / PÔLE */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-2">
            <Button
              variant={activePole === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setActivePole("all")}
              className="rounded-full px-5 font-bold text-xs sm:text-sm cursor-pointer"
            >
              Toutes les études de cas ({PROJECTS_DATA.length})
            </Button>
            <Button
              variant={activePole === "si" ? "default" : "outline"}
              size="sm"
              onClick={() => setActivePole("si")}
              className="rounded-full px-5 font-bold text-xs sm:text-sm cursor-pointer gap-2"
            >
              <Building2 className="w-3.5 h-3.5" />
              Architecture SI & MEGA HOPEX ({PROJECTS_DATA.filter((p) => p.pole === "si").length})
            </Button>
            <Button
              variant={activePole === "web" ? "default" : "outline"}
              size="sm"
              onClick={() => setActivePole("web")}
              className="rounded-full px-5 font-bold text-xs sm:text-sm cursor-pointer gap-2"
            >
              <Smartphone className="w-3.5 h-3.5" />
              Web & Applications Sur-Mesure ({PROJECTS_DATA.filter((p) => p.pole === "web").length})
            </Button>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          GRILLE DES ÉTUDES DE CAS STRUCTURÉES
      ═══════════════════════════════════════════ */}
      <div className="container mx-auto px-4 py-12 md:py-16 max-w-5xl">
        <div className="space-y-12">
          {filteredProjects.map((project: Project, index) => {
            const isSI = project.pole === "si";
            const borderAccent = isSI ? "border-l-blue-500" : "border-l-emerald-500";
            const badgeBg = isSI ? "bg-blue-500/10 text-blue-700 dark:text-blue-300" : "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300";

            return (
              <Card
                key={project.id}
                className={`border border-border/80 border-l-4 ${borderAccent} shadow-md hover:shadow-xl transition-all duration-300 glass-card rounded-3xl overflow-hidden`}
              >
                {/* 1. EN-TÊTE DE L'ÉTUDE DE CAS */}
                <CardHeader className="p-6 sm:p-8 pb-4 space-y-3 bg-secondary/30 border-b border-border/60">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      {project.logo && (
                        <img
                          src={project.logo}
                          alt={`Logo ${project.clientCompany}`}
                          className="h-7 w-auto object-contain"
                        />
                      )}
                      <Badge variant="secondary" className={`text-xs font-bold px-3 py-1 ${badgeBg} border-0 flex items-center gap-1.5`}>
                        <Building2 className="w-3.5 h-3.5" />
                        {project.clientCompany}
                      </Badge>
                      <span className="text-xs text-muted-foreground font-medium hidden sm:inline">
                        • {project.period}
                      </span>
                    </div>

                    <Badge variant="outline" className="text-xs font-bold text-muted-foreground">
                      {project.categoryLabel}
                    </Badge>
                  </div>

                  <div>
                    <CardTitle className="text-xl sm:text-2xl font-extrabold text-foreground leading-snug">
                      {project.title}
                    </CardTitle>
                    <CardDescription className="text-sm sm:text-base text-muted-foreground mt-1.5 leading-relaxed">
                      {project.summary}
                    </CardDescription>
                  </div>
                </CardHeader>

                <CardContent className="p-6 sm:p-8 space-y-6">
                  {/* 2. DÉMARCHE D'IMPACT (Contexte ➔ Problème ➔ Rôle RAMSIN) */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Contexte */}
                    <div className="p-4 rounded-2xl bg-secondary/60 border border-border/60 space-y-1.5 text-xs">
                      <span className="font-extrabold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5 text-[10px]">
                        <Building2 className="w-3 h-3 text-primary" /> 1. Contexte Client
                      </span>
                      <p className="text-foreground/90 leading-relaxed font-medium">
                        {project.context}
                      </p>
                    </div>

                    {/* Problème / Défi initial */}
                    <div className="p-4 rounded-2xl bg-rose-500/10 dark:bg-rose-950/20 border border-rose-500/30 space-y-1.5 text-xs">
                      <span className="font-extrabold uppercase tracking-wider text-rose-600 dark:text-rose-400 flex items-center gap-1.5 text-[10px]">
                        <AlertTriangle className="w-3 h-3" /> 2. Problème / Défi
                      </span>
                      <p className="text-foreground/90 leading-relaxed font-medium">
                        {project.problem}
                      </p>
                    </div>

                    {/* Intervention RAMSIN */}
                    <div className="p-4 rounded-2xl bg-blue-500/10 dark:bg-blue-950/20 border border-blue-500/30 space-y-1.5 text-xs">
                      <span className="font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5 text-[10px]">
                        <UserCheck className="w-3 h-3" /> 3. Rôle de RAMSIN
                      </span>
                      <p className="text-foreground/90 leading-relaxed font-medium">
                        {project.ramsinRole}
                      </p>
                    </div>
                  </div>

                  {/* 3. SOLUTION DÉPLOYÉE & RÉSULTATS MESURABLES */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Solution */}
                    <div className="p-5 rounded-2xl bg-secondary/40 border border-border/60 space-y-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                        <Zap className="w-4 h-4 text-amber-500" /> Solution Déployée
                      </span>
                      <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed">
                        {project.solution}
                      </p>
                    </div>

                    {/* Impact & Résultats */}
                    <div className="p-5 rounded-2xl bg-emerald-500/10 dark:bg-emerald-950/25 border-2 border-emerald-500/30 space-y-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                        <TrendingUp className="w-4 h-4 text-emerald-500" /> Résultat Mesurable & Impact
                      </span>
                      <p className="text-xs sm:text-sm text-emerald-950 dark:text-emerald-100 font-bold leading-relaxed">
                        {project.impact}
                      </p>
                    </div>
                  </div>

                  {/* 4. CE QUI A ÉTÉ CONCRÈTEMENT LIVRÉ AU CLIENT */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-card border border-border/80 space-y-2.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
                      <Layers className="w-4 h-4 text-primary" /> Livrables Concrets Remis au Client :
                    </span>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-muted-foreground">
                      {project.deliverables.map((deliv, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                          <span className="text-foreground/90 font-medium">{deliv}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* 5. STACK TECHNIQUE & CTA PAR CAS */}
                  <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-border/60">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="text-xs font-semibold text-muted-foreground mr-1">Stack :</span>
                      {project.stack.map((stk, i) => (
                        <span
                          key={i}
                          className="text-[11px] font-semibold bg-secondary px-2.5 py-1 rounded-lg text-secondary-foreground border border-border/40"
                        >
                          {stk}
                        </span>
                      ))}
                    </div>

                    <Button
                      asChild
                      size="sm"
                      variant="outline"
                      className="gap-1.5 text-xs font-bold rounded-xl hover-lift border-primary/30 hover:border-primary"
                    >
                      <Link to={isSI ? "/contact?service=si" : "/contact?service=web"}>
                        Échanger sur un projet similaire <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* ═══════════════════════════════════════════
            BANDEAU D'APPEL À L'ACTION FINAL
        ═══════════════════════════════════════════ */}
        <div
          ref={ctaRef}
          className={`mt-16 bg-gradient-to-r from-primary/10 via-primary/5 to-emerald-500/10 border-2 border-primary/20 rounded-3xl p-8 md:p-12 text-center max-w-4xl mx-auto shadow-xl glass-card scroll-scale-up ${
            ctaVisible ? "is-visible" : ""
          }`}
        >
          <Briefcase className="w-12 h-12 text-primary mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-extrabold mb-3 tracking-tight">
            Vous avez un enjeu d'Architecture SI ou un projet d'application ?
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-2xl mx-auto leading-relaxed">
            Échangez directement avec votre consultant lors d'un premier rendez-vous de cadrage offert de 30 minutes sans aucun engagement.
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
              <Link to="/about">Consulter le parcours de l'expert</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Projects;
