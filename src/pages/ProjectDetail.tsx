import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  CheckCircle2,
  FileText,
  Layers,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  UserCheck,
  Users,
  Zap,
  AlertTriangle,
  Phone,
  Quote,
} from "lucide-react";
import { PROJECTS_DATA } from "@/data/projects";
import { getTestimonialForProject } from "@/data/testimonials";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import NotFound from "@/pages/NotFound";
import BrowserFrame from "@/components/projects/BrowserFrame";
import ProjectCard from "@/components/projects/ProjectCard";
import MethodSteps from "@/components/projects/MethodSteps";
import { trackConversionEvent } from "@/lib/analytics";
import { openBooking } from "@/lib/calendly";
import { cn } from "@/lib/utils";

export const ProjectDetail = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const project = PROJECTS_DATA.find((p) => p.id === projectId);

  const jsonLd = useMemo(() => {
    if (!project) return undefined;
    const url = `https://www.ramsin.fr/projets/${project.id}`;
    return [
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: "https://www.ramsin.fr/" },
          { "@type": "ListItem", position: 2, name: "Réalisations", item: "https://www.ramsin.fr/projets" },
          { "@type": "ListItem", position: 3, name: project.client, item: url },
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        name: `${project.client} — ${project.headline}`,
        description: project.summary,
        url,
        ...(project.image ? { image: `https://www.ramsin.fr${project.image}` } : {}),
        creator: { "@type": "ProfessionalService", name: "RAMSIN Conseil", url: "https://www.ramsin.fr" },
        keywords: project.tags.join(", "),
      },
    ];
  }, [project]);

  // Titre et description courts pour Google (environ 60 et 155 caractères avant la coupure)
  const seoTitle = (() => {
    if (!project) return "";
    const label = project.categoryLabel.charAt(0).toLowerCase() + project.categoryLabel.slice(1);
    const long = `${project.client}, ${label} | RAMSIN`;
    return long.length <= 60 ? long : `${project.client} : étude de cas | RAMSIN`;
  })();
  const seoDescription = (() => {
    if (!project) return "";
    const text = project.summary;
    if (text.length <= 158) return text;
    const cut = text.slice(0, 155);
    return `${cut.slice(0, cut.lastIndexOf(" "))}…`;
  })();

  // Identifiant inconnu : Vercel répond avec dist/404.html (page NotFound pré-rendue), le client doit afficher la même chose
  if (!project) return <NotFound />;

  const isSI = project.pole === "si";
  // Autres projets : même pôle d'abord, puis le reste
  const related = [
    ...PROJECTS_DATA.filter((p) => p.id !== project.id && p.pole === project.pole),
    ...PROJECTS_DATA.filter((p) => p.id !== project.id && p.pole !== project.pole),
  ].slice(0, 2);

  const book = (source: string) => {
    trackConversionEvent("click_case_study_cta", { projectId: project.id, pole: project.pole, source });
    openBooking(`case_${source}`);
  };
  const formLink = `/contact?tunnel=form&service=${isSI ? "si" : "web"}`;

  // Avis du client, affiché seulement s'il l'a écrit ou validé (src/data/testimonials.ts)
  const testimonial = getTestimonialForProject(project.id);

  const story = [
    { icon: Target, step: "01", title: "Le contexte", text: project.context, tone: "bg-secondary text-foreground" },
    { icon: AlertTriangle, step: "02", title: "Le défi", text: project.problem, tone: "bg-rose-500/10 text-rose-700" },
    { icon: Zap, step: "03", title: "La solution", text: project.solution, tone: "bg-[#123A35]/10 text-[#123A35]" },
    { icon: TrendingUp, step: "04", title: "Le résultat", text: project.impact, tone: "bg-[#C7F36B]/40 text-[#123A35]" },
  ];

  return (
    <>
      <SEO
        title={seoTitle}
        description={seoDescription}
        canonical={`https://www.ramsin.fr/projets/${project.id}`}
        jsonLd={jsonLd}
      />

      {/* EN-TÊTE */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#071816] via-[#123A35] to-[#0c2621] text-white">
        <div className="absolute -top-32 -right-32 w-[520px] h-[520px] rounded-full bg-[#C7F36B]/10 blur-3xl pointer-events-none" />
        <div className="container mx-auto px-4 max-w-6xl pt-8 pb-14 md:pb-20 relative">
          <nav className="flex items-center gap-2 text-xs sm:text-sm text-slate-300 mb-8" aria-label="Fil d'Ariane">
            <Link to="/" className="hover:text-white transition-colors">Accueil</Link>
            <span>/</span>
            <Link to="/projets" className="hover:text-white transition-colors">Réalisations</Link>
            <span>/</span>
            <span className="text-white font-semibold truncate">{project.client}</span>
          </nav>

          <div className="grid lg:grid-cols-[1fr_1.05fr] gap-10 lg:gap-14 items-center">
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
                <span className="uppercase tracking-wider bg-[#C7F36B] text-[#123A35] px-3 py-1 rounded-full">
                  {isSI ? "Architecture SI & MEGA HOPEX" : "Web & mobile"}
                </span>
                <span className="text-slate-300">{project.categoryLabel}</span>
                <span className="text-slate-400">·</span>
                <span className="text-slate-300 inline-flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{project.period}</span>
              </div>
              <div className="space-y-3">
                <p className="text-lg font-extrabold text-[#C7F36B]">{project.client}</p>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.12]">{project.headline}</h1>
                <p className="text-base sm:text-lg text-slate-300 leading-relaxed">{project.summary}</p>
              </div>

              <ul className="grid sm:grid-cols-3 gap-3">
                {project.results.map((result, i) => (
                  <li
                    key={result}
                    className={cn(
                      "rounded-2xl p-4 text-sm font-bold leading-snug",
                      i === 0 ? "bg-[#C7F36B] text-[#123A35]" : "bg-white/10 border border-white/10 text-white"
                    )}
                  >
                    {result}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-3 pt-1">
                <Button variant="lime" size="lg" className="rounded-xl gap-2 cursor-pointer" onClick={() => openBooking("case_hero")}>
                  <Calendar className="w-4 h-4" /> Un projet similaire ? 30 min offertes
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-xl gap-2 bg-transparent text-white border-white/30 hover:bg-white/10 hover:text-white">
                  <Link to="/projets"><ArrowLeft className="w-4 h-4" /> Toutes les réalisations</Link>
                </Button>
              </div>
            </div>

            {project.image && (
              <div className="space-y-3">
                <BrowserFrame
                  src={project.image}
                  alt={`Aperçu de ${project.client}`}
                  label={`${project.client} · ${project.categoryLabel}`}
                  illustrative={project.imageIllustrative}
                  bg={project.imageBg}
                  ratio="auto"
                  eager
                />
                {project.imageIllustrative && (
                  <p className="text-xs text-slate-400">Les livrables de cette mission sont confidentiels : ce visuel est une illustration.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-6xl py-12 md:py-16">
        <div className="grid lg:grid-cols-[1fr_320px] gap-10 lg:gap-12 items-start">
          {/* RÉCIT */}
          <div className="space-y-12">
            <section aria-labelledby="story" className="space-y-6">
              <h2 id="story" className="text-2xl sm:text-3xl font-extrabold tracking-tight">L'histoire du projet</h2>
              <ol className="relative space-y-6 before:absolute before:left-5 before:top-2 before:bottom-2 before:w-px before:bg-border">
                {story.map(({ icon: Icon, step, title, text, tone }) => (
                  <li key={step} className="relative flex gap-5">
                    <span className={cn("relative z-10 w-10 h-10 shrink-0 rounded-xl flex items-center justify-center ring-4 ring-background", tone)}>
                      <Icon className="w-5 h-5" />
                    </span>
                    <div className={cn("flex-1 rounded-2xl border p-5", step === "04" ? "border-[#C7F36B] bg-[#C7F36B]/10" : "border-border/80 bg-card")}>
                      <span className="text-xs font-black text-muted-foreground">{step}</span>
                      <h3 className="text-lg font-extrabold">{title}</h3>
                      <p className={cn("mt-1.5 leading-relaxed", step === "04" ? "font-semibold text-foreground" : "text-foreground/85")}>{text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            {testimonial && (
              <section aria-labelledby="testimonial" className="rounded-3xl border border-[#C7F36B] bg-[#C7F36B]/10 p-6 sm:p-8 space-y-4">
                <h2 id="testimonial" className="text-sm font-extrabold uppercase tracking-wider text-[#123A35] inline-flex items-center gap-2">
                  <Quote className="w-4 h-4" aria-hidden="true" /> Ce qu'en dit le client
                </h2>
                <blockquote className="text-lg sm:text-xl font-semibold leading-relaxed text-foreground">« {testimonial.quote} »</blockquote>
                <p className="text-sm font-semibold text-muted-foreground">
                  {testimonial.name ? `${testimonial.name}, ${testimonial.role}` : testimonial.role} · {testimonial.company}
                  {testimonial.source ? ` · ${testimonial.source}` : ""}
                </p>
              </section>
            )}

            <section aria-labelledby="deliverables" className="space-y-5">
              <h2 id="deliverables" className="text-2xl sm:text-3xl font-extrabold tracking-tight">Ce qui a été livré</h2>
              <ul className="grid sm:grid-cols-2 gap-3">
                {project.deliverables.map((item) => (
                  <li key={item} className="flex items-start gap-3 rounded-2xl border border-border/80 bg-card p-4 text-sm font-semibold">
                    <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="rounded-2xl bg-secondary/60 p-5 space-y-3">
                <h3 className="text-sm font-extrabold uppercase tracking-wider text-muted-foreground">Comment nous avons travaillé</h3>
                <ul className="space-y-2">
                  {project.tasks.map((task) => (
                    <li key={task} className="flex items-start gap-2.5 text-sm text-foreground/85">
                      <Sparkles className="w-4 h-4 mt-0.5 shrink-0 text-[#123A35]" />
                      {task}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {!isSI && (
              <section aria-labelledby="method" className="space-y-5">
                <h2 id="method" className="text-2xl sm:text-3xl font-extrabold tracking-tight">La méthode, appliquée à votre projet</h2>
                <MethodSteps compact />
              </section>
            )}
          </div>

          {/* EN BREF (colonne collante) */}
          <aside className="lg:sticky lg:top-24 space-y-4">
            <div className="rounded-3xl border border-border/80 bg-card p-6 space-y-4 shadow-sm">
              <h2 className="text-sm font-extrabold uppercase tracking-wider text-muted-foreground">En bref</h2>
              <dl className="space-y-3 text-sm">
                {[
                  { icon: Users, label: "Client", value: project.clientCompany },
                  { icon: Calendar, label: "Période", value: project.period },
                  { icon: UserCheck, label: "Rôle de RAMSIN", value: project.ramsinRole },
                  ...(project.targetAudience ? [{ icon: Target, label: "Utilisateurs", value: project.targetAudience }] : []),
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label}>
                    <dt className="flex items-center gap-2 text-xs font-bold text-muted-foreground">
                      <Icon className="w-4 h-4 shrink-0 text-[#123A35]" aria-hidden="true" />
                      {label}
                    </dt>
                    <dd className="pl-6 font-semibold leading-snug">{value}</dd>
                  </div>
                ))}
              </dl>
              <div className="pt-3 border-t border-border/60">
                <span className="text-xs font-bold text-muted-foreground inline-flex items-center gap-1.5"><Layers className="w-3.5 h-3.5" /> Technologies</span>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {project.stack.map((tech) => (
                    <span key={tech} className="text-xs font-semibold bg-secondary px-2.5 py-1 rounded-lg border border-border/50">{tech}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-3xl bg-[#123A35] text-white p-6 space-y-4 shadow-lg">
              <p className="text-lg font-extrabold leading-snug">
                {isSI ? "Un enjeu d'architecture similaire ?" : `Un projet comme ${project.client} ?`}
              </p>
              <p className="text-sm text-slate-300">30 minutes offertes avec RAMSIN pour en parler, sans engagement.</p>
              <Button variant="lime" className="w-full rounded-xl gap-2 cursor-pointer" onClick={() => book("aside")}>
                <Calendar className="w-4 h-4" /> Réserver 30 min offertes
              </Button>
              <a href="tel:+33761518890" className="flex items-center justify-center gap-2 text-sm font-semibold text-slate-200 hover:text-white">
                <Phone className="w-4 h-4" /> +33 (0)7 61 51 88 90
              </a>
            </div>
          </aside>
        </div>
      </div>

      {/* CONVERSION */}
      <section className="container mx-auto px-4 max-w-6xl pb-12">
        <div className="rounded-[28px] bg-gradient-to-br from-[#C7F36B] to-[#D9FF7D] p-8 sm:p-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-2 text-[#123A35]">
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
              {isSI ? "Structurons ensemble votre système d'information" : "Votre idée mérite le même résultat"}
            </h2>
            <p className="text-base sm:text-lg font-medium text-[#123A35]/80">
              {isSI
                ? "Cartographie, DAT, gouvernance MEGA HOPEX : parlons de votre contexte en 30 minutes."
                : "Racontez-nous votre projet : vous repartez avec un plan clair, et le code sera à votre nom."}
            </p>
            <p className="text-sm font-semibold inline-flex items-center gap-2 pt-1"><ShieldCheck className="w-4 h-4" /> Sans engagement · Réponse sous 24 h ouvrées</p>
          </div>
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
            <Button size="lg" className="rounded-xl gap-2 bg-[#123A35] hover:bg-[#0c2621] text-white cursor-pointer" onClick={() => book("footer")}>
              <Calendar className="w-4 h-4" /> Réserver 30 min offertes
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-xl gap-2 bg-white/60 border-[#123A35]/30 text-[#123A35]">
              <Link to={formLink}><FileText className="w-4 h-4" /> Décrire mon projet par écrit</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* AUTRES RÉALISATIONS */}
      <section className="container mx-auto px-4 max-w-6xl pb-16 md:pb-24 space-y-6">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">D'autres réalisations</h2>
          <Link to="/projets" className="text-sm font-extrabold text-primary inline-flex items-center gap-1.5 hover:gap-2.5 transition-all">
            Toutes les réalisations <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {related.map((p) => (
            <ProjectCard key={p.id} project={p} source="case_related" />
          ))}
        </div>
      </section>
    </>
  );
};

export default ProjectDetail;
