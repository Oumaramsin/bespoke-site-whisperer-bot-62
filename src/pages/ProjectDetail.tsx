import { useParams, Link, useNavigate } from "react-router-dom";
import { PROJECTS_DATA } from "@/data/projects";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  Layers,
  Sparkles,
  TrendingUp,
  AlertTriangle,
  Zap,
  Laptop,
  Lock,
  ArrowUpRight,
  ShieldCheck,
  FileText,
} from "lucide-react";
import SEO from "@/components/SEO";
import { trackConversionEvent } from "@/lib/analytics";

export const ProjectDetail = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();

  const projectIndex = PROJECTS_DATA.findIndex((p) => p.id === projectId);
  const project = PROJECTS_DATA[projectIndex];

  if (!project) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center container mx-auto px-4 text-center py-20 space-y-4">
        <h1 className="text-3xl font-extrabold text-foreground">Étude de cas introuvable</h1>
        <p className="text-muted-foreground text-sm max-w-md">
          L'étude de cas demandée n'existe pas ou a été déplacée.
        </p>
        <Button asChild variant="lime" className="mt-4">
          <Link to="/projets">
            <ArrowLeft className="w-4 h-4 mr-2" /> Retour aux réalisations
          </Link>
        </Button>
      </div>
    );
  }

  const prevProject = projectIndex > 0 ? PROJECTS_DATA[projectIndex - 1] : null;
  const nextProject =
    projectIndex < PROJECTS_DATA.length - 1 ? PROJECTS_DATA[projectIndex + 1] : null;

  const isSI = project.pole === "si";

  const getFauxUrl = (id: string) => {
    switch (id) {
      case "dabari":
        return "dabari.fr/traiteur";
      case "maison-hamdiwashukri":
        return "hamdiwashukri.com";
      case "leclat-du-chef":
        return "leclatduchef.fr";
      case "covea-hopex-v5":
        return "hopex.covea.intra";
      case "lbp-architecture-solution":
        return "labanquepostale.fr/si";
      default:
        return "ramsin.fr/etude-de-cas";
    }
  };

  return (
    <>
      <SEO
        title={`${project.title} | Étude de Cas Réelle RAMSIN`}
        description={`${project.summary} Découvrez le contexte, les livrables remis et l'impact mesurable obtenu pour ${project.clientCompany}.`}
        canonical={`https://www.ramsin.fr/projets/${project.id}`}
      />

      <div className="min-h-screen bg-gradient-to-b from-background via-secondary/15 to-background py-10 md:py-16">
        <div className="container mx-auto px-4 max-w-6xl space-y-12">
          
          {/* 1. BREADCRUMBS & NAVIGATION RETOUR */}
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Link to="/" className="hover:text-primary transition-colors">
                Accueil
              </Link>
              <span>/</span>
              <Link to="/projets" className="hover:text-primary transition-colors">
                Études de Cas
              </Link>
              <span>/</span>
              <span className="text-foreground font-semibold truncate max-w-[200px] sm:max-w-xs">
                {project.clientCompany}
              </span>
            </div>

            <Button
              asChild
              variant="ghost"
              size="sm"
              className="gap-2 text-xs font-semibold hover:bg-secondary/80"
            >
              <Link to="/projets">
                <ArrowLeft className="w-4 h-4" /> Toutes les études de cas
              </Link>
            </Button>
          </div>

          {/* 2. EN-TÊTE DE L'ÉTUDE DE CAS (HERO DETAIL) */}
          <div className="space-y-6 max-w-4xl">
            <div className="flex flex-wrap items-center gap-2.5">
              <Badge
                variant="outline"
                className={`text-xs font-bold px-3 py-1 ${
                  isSI
                    ? "bg-[#123A35]/10 text-[#123A35] border-[#123A35]/30"
                    : "bg-emerald-500/10 text-emerald-800 border-emerald-500/30"
                }`}
              >
                <Building2 className="w-3.5 h-3.5 mr-1.5 inline" />
                {project.clientCompany}
              </Badge>

              <Badge
                variant="outline"
                className="text-xs font-semibold text-muted-foreground border-border/80"
              >
                {project.categoryLabel}
              </Badge>

              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> {project.period}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15]">
              {project.title}
            </h1>

            <p className="text-base sm:text-xl text-muted-foreground leading-relaxed font-normal">
              {project.summary}
            </p>

            {/* Metric Clé en Vedette */}
            {project.metric && (
              <div className="inline-flex items-center gap-3 p-3 px-4 rounded-2xl bg-card border border-border/80 shadow-xs">
                <span className="text-lg sm:text-xl font-black text-[#123A35] bg-[#C7F36B] px-2.5 py-1 rounded-xl">
                  {project.metric.value}
                </span>
                <span className="text-xs sm:text-sm font-bold text-foreground">
                  {project.metric.label}
                </span>
              </div>
            )}
          </div>

          {/* 3. VISUEL GRAND FORMAT DE L'INTERFACE DÉPLOYÉE */}
          {project.image && (
            <div className="rounded-3xl border-2 border-border/80 overflow-hidden bg-muted/40 shadow-xl">
              {/* Browser window top bar */}
              <div className="px-5 py-3 bg-muted/70 border-b border-border/60 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-400/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-amber-400/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-emerald-400/80 inline-block" />
                </div>
                <div className="flex-1 max-w-sm mx-auto bg-background/90 text-xs font-mono text-muted-foreground py-1 px-4 rounded-lg border border-border/60 truncate text-center shadow-2xs">
                  https://{getFauxUrl(project.id)}
                </div>
                <div className="text-[11px] font-bold text-muted-foreground hidden sm:block">
                  Production Validée
                </div>
              </div>

              {/* Screen view */}
              <div className={`overflow-hidden flex items-center justify-center ${
                project.id === "leclat-du-chef" ? "bg-[#09090b]" : project.id === "dabari" ? "bg-[#f8fafd]" : "bg-slate-900/5"
              }`}>
                <img
                  src={project.image}
                  alt={`Capture grand format de l'interface ${project.title}`}
                  className="w-full h-auto object-contain block mx-auto"
                  loading="eager"
                />
              </div>
            </div>
          )}

          {/* 4. DÉMARCHE COMPLÈTE EN 4 PILIERS DE SUCCÈS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Pilier 1 : Contexte & Défi Initial */}
            <Card className="border border-border/80 bg-card rounded-2xl p-6 sm:p-7 space-y-4 shadow-xs">
              <div className="flex items-center gap-2.5 text-xs font-extrabold uppercase tracking-wider text-rose-700">
                <div className="w-8 h-8 rounded-lg bg-rose-500/10 flex items-center justify-center">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                </div>
                1. Contexte & Défi Initial
              </div>
              <div className="space-y-3">
                <p className="text-sm text-foreground/90 leading-relaxed font-medium">
                  {project.context}
                </p>
                <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200/80 text-xs text-rose-950 font-semibold leading-relaxed">
                  <strong>Point de friction résolu :</strong> {project.problem}
                </div>
              </div>
            </Card>

            {/* Pilier 2 : Le Rôle de RAMSIN */}
            <Card className="border border-border/80 bg-card rounded-2xl p-6 sm:p-7 space-y-4 shadow-xs">
              <div className="flex items-center gap-2.5 text-xs font-extrabold uppercase tracking-wider text-[#123A35]">
                <div className="w-8 h-8 rounded-lg bg-[#123A35]/10 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                </div>
                2. Intervention & Rôle Précis
              </div>
              <div className="space-y-3">
                <p className="text-sm text-foreground/90 leading-relaxed font-medium">
                  {project.ramsinRole}
                </p>
                <ul className="space-y-2 text-xs text-muted-foreground pt-1">
                  {project.tasks.map((task, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                      <span>{task}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>

            {/* Pilier 3 : La Solution Technique Déployée */}
            <Card className="border border-border/80 bg-card rounded-2xl p-6 sm:p-7 space-y-4 shadow-xs">
              <div className="flex items-center gap-2.5 text-xs font-extrabold uppercase tracking-wider text-primary">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-primary" />
                </div>
                3. Solution Technique Déployée
              </div>
              <div className="space-y-3">
                <p className="text-sm text-foreground/90 leading-relaxed font-medium">
                  {project.solution}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.stack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-bold bg-secondary text-secondary-foreground px-2.5 py-1 rounded-lg border border-border/40"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </Card>

            {/* Pilier 4 : Résultats & Impact Mesurable */}
            <Card className="border-2 border-emerald-500/30 bg-emerald-500/5 rounded-2xl p-6 sm:p-7 space-y-4 shadow-xs">
              <div className="flex items-center gap-2.5 text-xs font-extrabold uppercase tracking-wider text-emerald-800">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-emerald-700" />
                </div>
                4. Résultat & Impact Concret
              </div>
              <div className="space-y-3">
                <p className="text-sm sm:text-base text-emerald-950 font-bold leading-relaxed">
                  {project.impact}
                </p>
                <div className="p-3.5 rounded-xl bg-card border border-emerald-500/20 text-xs text-muted-foreground leading-relaxed">
                  {isSI
                    ? "Dossier validé auprès des instances de gouvernance et cartographie pérennisée dans le référentiel d'entreprise."
                    : "Solution mise en production avec cession complète du code source, accompagnement à la prise en main et garantie de 30 jours."}
                </div>
              </div>
            </Card>

          </div>

          {/* 5. CE QUI A ÉTÉ CONCRÈTEMENT LIVRÉ AU CLIENT */}
          <Card className="border border-border/80 bg-card rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-extrabold text-foreground">
                  Livrables Tangibles Remis au Client
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  L'ensemble des documents, codes et accès cédés contractuellement sans abonnement captif :
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {project.deliverables.map((deliv, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-secondary/40 border border-border/60 text-xs sm:text-sm font-semibold text-foreground/90"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{deliv}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* 6. BANDEAU DE CONVERSION : ÉCHANGER SUR UN PROJET SIMILAIRE */}
          <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#123A35]/10 via-background to-[#C7F36B]/15 border-2 border-primary/30 text-center space-y-6 shadow-md">
            <div className="space-y-2 max-w-2xl mx-auto">
              <Badge variant="outline" className="text-xs font-bold border-primary/30 text-primary">
                Un besoin similaire pour votre organisation ?
              </Badge>
              <h3 className="text-2xl sm:text-4xl font-extrabold text-foreground">
                {isSI
                  ? "Structurons Votre Système d'Information"
                  : "Concevons Votre Application Sur-Mesure"}
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {isSI
                  ? "Bénéficiez d'une expertise reconnue sur MEGA HOPEX V5 et d'un accompagnement méthodique pour vos cartographies et comités d'architecture."
                  : "Discutons de votre cahier des charges et validons la faisabilité technique lors d'un premier échange de cadrage offert."}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button
                asChild
                size="lg"
                variant="lime"
                className="gap-2 px-7 py-6 text-sm sm:text-base font-extrabold rounded-2xl shadow-md hover:scale-[1.02] transition-all"
              >
                <Link
                  to={isSI ? "/contact?service=si" : "/contact?service=web"}
                  onClick={() =>
                    trackConversionEvent("click_case_study_cta", {
                      projectId: project.id,
                      pole: project.pole,
                    })
                  }
                >
                  Échanger sur un projet similaire <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="gap-2 px-6 py-6 text-sm sm:text-base font-bold rounded-2xl border-border/80 glass-card"
              >
                <Link to="/contact">
                  <FileText className="w-4 h-4" /> Poser une question écrite
                </Link>
              </Button>
            </div>
          </div>

          {/* 7. NAVIGATION ENTRE ÉTUDES DE CAS (SUIVANT / PRÉCÉDENT) */}
          <div className="border-t border-border/60 pt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {prevProject ? (
              <Link
                to={`/projets/${prevProject.id}`}
                className="p-4 rounded-2xl border border-border/80 hover:border-primary/50 transition-all bg-card/60 hover-lift flex flex-col justify-between group"
              >
                <span className="text-[11px] font-bold text-muted-foreground flex items-center gap-1 group-hover:text-primary">
                  <ArrowLeft className="w-3.5 h-3.5" /> Étude de cas précédente
                </span>
                <span className="text-sm font-extrabold text-foreground mt-1 group-hover:text-primary transition-colors truncate">
                  {prevProject.title}
                </span>
              </Link>
            ) : (
              <div />
            )}

            {nextProject ? (
              <Link
                to={`/projets/${nextProject.id}`}
                className="p-4 rounded-2xl border border-border/80 hover:border-primary/50 transition-all bg-card/60 hover-lift flex flex-col justify-between items-end text-right group sm:col-start-2"
              >
                <span className="text-[11px] font-bold text-muted-foreground flex items-center gap-1 group-hover:text-primary">
                  Étude de cas suivante <ArrowRight className="w-3.5 h-3.5" />
                </span>
                <span className="text-sm font-extrabold text-foreground mt-1 group-hover:text-primary transition-colors truncate">
                  {nextProject.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
          </div>

        </div>
      </div>
    </>
  );
};

export default ProjectDetail;
