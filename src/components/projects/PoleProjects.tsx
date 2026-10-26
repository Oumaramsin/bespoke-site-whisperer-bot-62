import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { PROJECTS_DATA, type Project } from "@/data/projects";
import ProjectCard from "./ProjectCard";

/** Réalisations du pôle consulté (pages Services, offres et À propos) : une carte large par projet */
export const PoleProjects = ({
  pole,
  ids,
  limit,
  title,
}: {
  pole: Project["pole"];
  /** Projets précis à montrer, dans cet ordre (pages d'offre : seulement les projets du même type) */
  ids?: string[];
  /** Nombre de projets affichés (tous par défaut) ; les plus parlants sont en tête de src/data/projects.ts */
  limit?: number;
  title?: string;
}) => {
  const selection = ids
    ? ids.map((id) => PROJECTS_DATA.find((p) => p.id === id)).filter((p): p is Project => Boolean(p))
    : PROJECTS_DATA.filter((p) => p.pole === pole);
  const projects = selection.slice(0, limit);
  return (
    <div className="container mx-auto px-4 max-w-6xl space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Nos réalisations</span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground">
            {title ?? (pole === "web" ? "Ils l'ont fait avec nous" : "Missions récentes")}
          </h3>
        </div>
        <Link to="/projets" className="text-sm font-extrabold text-primary inline-flex items-center gap-1.5 hover:gap-2.5 transition-all">
          Toutes les réalisations <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
      <div className="grid gap-6 md:gap-8">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} source={`services_${pole}`} wide />
        ))}
      </div>
    </div>
  );
};

export default PoleProjects;
