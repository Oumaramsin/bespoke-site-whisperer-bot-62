import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Building2, Calendar, FileText, Layers, ShieldCheck, Smartphone, Sparkles } from "lucide-react";
import { PROJECTS_DATA } from "@/data/projects";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import ProjectCard from "@/components/projects/ProjectCard";
import MethodSteps from "@/components/projects/MethodSteps";
import { trackConversionEvent } from "@/lib/analytics";
import { openBooking } from "@/lib/calendly";
import { cn } from "@/lib/utils";

type Filter = "all" | "web" | "si";

const PROJECTS_JSONLD = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Réalisations RAMSIN Conseil",
  itemListElement: PROJECTS_DATA.map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    url: `https://www.ramsin.fr/projets/${p.id}`,
    name: `${p.client} — ${p.headline}`,
  })),
};

const FILTERS: { key: Filter; label: string; icon: typeof Layers }[] = [
  { key: "all", label: "Tous", icon: Layers },
  { key: "web", label: "Web & mobile", icon: Smartphone },
  { key: "si", label: "Architecture SI", icon: Building2 },
];

export const Projets = () => {
  const [filter, setFilter] = useState<Filter>("all");

  const projects = filter === "all" ? PROJECTS_DATA : PROJECTS_DATA.filter((p) => p.pole === filter);
  const [featured, ...others] = projects;

  const book = (source: string) => openBooking(source);

  return (
    <>
      <SEO
        title="Réalisations & études de cas | RAMSIN Conseil"
        description="Applications web et mobiles, boutiques en ligne et missions d'architecture SI : le défi, la solution et le résultat obtenu pour chaque client RAMSIN."
        canonical="https://www.ramsin.fr/projets"
        jsonLd={PROJECTS_JSONLD}
      />

      {/* EN-TÊTE */}
      <section className="relative overflow-hidden border-b border-border/60 pt-12 pb-14 md:pt-16 md:pb-16">
        <div className="absolute inset-0 -z-10 dot-grid-pattern pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-[320px] bg-gradient-to-r from-[#123A35]/10 via-[#C7F36B]/20 to-[#123A35]/10 rounded-full blur-[100px] -z-10 pointer-events-none" />

        <div className="container mx-auto px-4 max-w-5xl text-center space-y-5">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#123A35] bg-[#C7F36B]/40 px-3 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5" /> Réalisations
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.12] pb-1">
            Des idées devenues
            <span className="block gradient-text">de vrais produits</span>
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Pour chaque projet : le défi de départ, ce que nous avons construit ensemble et le résultat obtenu. Sans jargon.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-6xl py-10 md:py-14 space-y-10">
        {/* FILTRES */}
        <div className="flex justify-center">
        <div className="inline-flex p-1 rounded-xl bg-muted/80 border border-border/80 gap-1" role="tablist" aria-label="Filtrer les réalisations">
          {FILTERS.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={filter === key}
              onClick={() => {
                setFilter(key);
                trackConversionEvent("switch_projects_tab", { tab: key });
              }}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-lg px-3 sm:px-4 py-2 text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap",
                filter === key
                  ? "bg-[#123A35] text-white shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="w-4 h-4 hidden sm:block" />
              {label}
            </button>
          ))}
        </div>
        </div>

        {/* PROJET VEDETTE + GRILLE (regroupée par pôle quand tout est affiché) */}
        <h2 className="sr-only">Nos réalisations</h2>
        {featured && <ProjectCard project={featured} featured source="projects_featured" />}
        {filter === "all" ? (
          <>
            <div className="grid gap-6 sm:grid-cols-2">
              {others.filter((p) => p.pole === "web").map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
            <div className="pt-6 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-border/60 pb-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Pour les DSI & grands comptes</span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Missions d'architecture SI & MEGA HOPEX</h2>
                </div>
                <p className="text-sm text-muted-foreground max-w-md">
                  Livrables clients confidentiels : les visuels de ces missions sont des illustrations.
                </p>
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                {others.filter((p) => p.pole === "si").map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </div>
          </>
        ) : (
          others.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2">
              {others.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )
        )}

        {/* RELANCE AU MILIEU DU PARCOURS */}
        <div className="rounded-3xl border-2 border-dashed border-[#123A35]/25 bg-[#C7F36B]/10 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">Votre projet ressemble à l'un de ceux-ci ?</h2>
            <p className="text-sm sm:text-base text-muted-foreground mt-1">
              Racontez-le en 30 minutes : vous repartez avec un plan clair, sans engagement.
            </p>
          </div>
          <Button variant="lime" size="lg" className="rounded-xl gap-2 shrink-0 cursor-pointer" onClick={() => book("projects_mid")}>
            <Calendar className="w-4 h-4" /> Réserver 30 min offertes
          </Button>
        </div>
      </div>

      {/* MÉTHODE */}
      <section className="bg-gradient-to-br from-[#071816] via-[#123A35] to-[#0c2621] text-white py-14 md:py-20">
        <div className="container mx-auto px-4 max-w-6xl space-y-10">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#C7F36B]">Comment ces projets ont été menés</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">La même méthode pour votre projet web ou mobile</h2>
            <p className="text-slate-300 leading-relaxed">
              Un seul interlocuteur du premier échange à la mise en ligne, et vous voyez votre produit avancer chaque semaine.
            </p>
          </div>
          <MethodSteps dark />
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-300">
            <span className="inline-flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-[#C7F36B]" /> Garantie 30 jours après le lancement</span>
            <span className="inline-flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-[#C7F36B]" /> Aucun abonnement captif</span>
          </div>
        </div>
      </section>

      {/* APPEL À L'ACTION FINAL */}
      <section className="container mx-auto px-4 max-w-4xl py-14 md:py-20 text-center space-y-6">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
          Le prochain projet de cette page
          <span className="block gradient-text pb-1">pourrait être le vôtre</span>
        </h2>
        <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
          Échange direct avec RAMSIN, sans intermédiaire. Réponse sous 24 h ouvrées si vous préférez écrire.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button variant="lime" size="lg" className="rounded-xl gap-2 px-7 cursor-pointer" onClick={() => book("projects_footer")}>
            <Calendar className="w-4 h-4" /> Réserver 30 min offertes <ArrowRight className="w-4 h-4" />
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-xl gap-2 px-7">
            <Link to="/contact?tunnel=form">
              <FileText className="w-4 h-4" /> Décrire mon projet par écrit
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
};

export default Projets;
