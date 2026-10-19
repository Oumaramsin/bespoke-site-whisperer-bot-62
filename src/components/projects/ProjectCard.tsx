import { Link } from "react-router-dom";
import { ArrowUpRight, CheckCircle2, Building2, Smartphone, AlertTriangle, Zap, TrendingUp } from "lucide-react";
import type { Project } from "@/data/projects";
import { trackConversionEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import BrowserFrame from "./BrowserFrame";

const PoleBadge = ({ pole }: { pole: Project["pole"] }) => (
  <span
    className={cn(
      "inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full",
      pole === "web" ? "bg-[#C7F36B]/30 text-[#123A35]" : "bg-[#123A35]/10 text-[#123A35]"
    )}
  >
    {pole === "web" ? <Smartphone className="w-3.5 h-3.5" /> : <Building2 className="w-3.5 h-3.5" />}
    {pole === "web" ? "Web & Mobile" : "Architecture SI & MEGA HOPEX"}
  </span>
);

interface ProjectCardProps {
  project: Project;
  source?: string;
  /** Carte large en deux colonnes : défi → solution → résultat */
  featured?: boolean;
}

export const ProjectCard = ({ project, source = "projects_grid", featured = false }: ProjectCardProps) => {
  const track = () => trackConversionEvent("click_case_study", { projectId: project.id, source });

  if (featured) {
    return (
      <Link
        to={`/projets/${project.id}`}
        onClick={track}
        className="group grid lg:grid-cols-[1.15fr_1fr] rounded-[28px] overflow-hidden border border-border/80 bg-card shadow-sm hover:shadow-2xl transition-all duration-300"
      >
        <div className="relative p-6 sm:p-10 bg-gradient-to-br from-[#123A35] via-[#15463f] to-[#071816] overflow-hidden">
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#C7F36B]/15 blur-3xl pointer-events-none" />
          {project.image && (
            <BrowserFrame
              src={project.image}
              alt={`Aperçu de ${project.client}`}
              label={`${project.client} · ${project.categoryLabel}`}
              illustrative={project.imageIllustrative}
              bg={project.imageBg}
              position={project.imagePosition}
              className="relative"
            />
          )}
          {project.metric && (
            <div className="relative mt-5 inline-flex items-baseline gap-2 rounded-2xl bg-[#C7F36B] px-4 py-2.5 text-[#123A35] shadow-lg">
              <span className="text-2xl font-black">{project.metric.value}</span>
              <span className="text-sm font-bold">{project.metric.label}</span>
            </div>
          )}
        </div>

        <div className="p-6 sm:p-10 flex flex-col gap-5">
          <div className="flex flex-wrap items-center gap-2">
            <PoleBadge pole={project.pole} />
            <span className="text-xs font-semibold text-muted-foreground">{project.categoryLabel} · {project.period}</span>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-extrabold text-primary">{project.client}</p>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight group-hover:text-primary transition-colors">
              {project.headline}
            </h3>
          </div>

          <ol className="space-y-3">
            {[
              { icon: AlertTriangle, label: "Le défi", text: project.shortProblem, tone: "text-rose-600 bg-rose-500/10" },
              { icon: Zap, label: "Notre solution", text: project.shortSolution, tone: "text-[#123A35] bg-[#123A35]/10" },
              { icon: TrendingUp, label: "Le résultat", text: project.shortImpact, tone: "text-emerald-700 bg-emerald-500/15" },
            ].map(({ icon: Icon, label, text, tone }) => (
              <li key={label} className="flex gap-3">
                <span className={cn("mt-0.5 w-8 h-8 shrink-0 rounded-lg flex items-center justify-center", tone)}>
                  <Icon className="w-4 h-4" />
                </span>
                <div>
                  <span className="block text-[11px] font-extrabold uppercase tracking-wider text-muted-foreground">{label}</span>
                  <span className="text-sm text-foreground/90 leading-relaxed">{text}</span>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-auto pt-5 border-t border-border/60 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-1.5">
              {project.stack.slice(0, 3).map((tech) => (
                <span key={tech} className="text-[11px] font-semibold bg-secondary px-2.5 py-1 rounded-lg border border-border/50">
                  {tech}
                </span>
              ))}
            </div>
            <span className="inline-flex items-center gap-1.5 text-sm font-extrabold text-primary group-hover:gap-2.5 transition-all">
              Lire l'étude de cas <ArrowUpRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/projets/${project.id}`}
      onClick={track}
      className="group flex flex-col h-full rounded-3xl overflow-hidden border border-border/80 bg-card shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      <div className="relative p-5 pb-0 bg-gradient-to-br from-[#123A35] to-[#0b2320]">
        {project.image && (
          <BrowserFrame
            src={project.image}
            alt={`Aperçu de ${project.client}`}
            label={project.client}
            illustrative={project.imageIllustrative}
            bg={project.imageBg}
            position={project.imagePosition}
            className="rounded-b-none border-b-0 translate-y-1"
          />
        )}
        {project.metric && (
          <span className="absolute bottom-4 left-8 inline-flex items-baseline gap-1.5 rounded-xl bg-[#C7F36B] px-3 py-1.5 text-[#123A35] shadow-lg">
            <span className="text-base font-black">{project.metric.value}</span>
            <span className="text-[11px] font-bold">{project.metric.label}</span>
          </span>
        )}
      </div>

      <div className="flex flex-col flex-1 p-6 gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <PoleBadge pole={project.pole} />
          <span className="text-xs font-semibold text-muted-foreground">{project.categoryLabel}</span>
        </div>
        <p className="text-sm font-extrabold text-primary">{project.client}</p>
        <h3 className="text-lg font-extrabold leading-snug group-hover:text-primary transition-colors">{project.headline}</h3>
        <ul className="space-y-1.5 pt-1">
          {project.results.slice(0, 2).map((result) => (
            <li key={result} className="flex items-start gap-2 text-sm text-foreground/85">
              <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-emerald-600" />
              {result}
            </li>
          ))}
        </ul>
        <span className="mt-auto pt-4 border-t border-border/60 inline-flex items-center gap-1.5 text-sm font-extrabold text-primary group-hover:gap-2.5 transition-all">
          Lire l'étude de cas <ArrowUpRight className="w-4 h-4" />
        </span>
      </div>
    </Link>
  );
};

export default ProjectCard;
