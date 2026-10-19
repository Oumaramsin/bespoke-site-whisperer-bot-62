import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { PROJECTS_DATA, type Project } from "@/data/projects";
import ProjectCard from "./ProjectCard";

/** Preuves concrètes à afficher dans la page Services, pour le pôle consulté */
export const PoleProjects = ({ pole }: { pole: Project["pole"] }) => {
  const projects = PROJECTS_DATA.filter((p) => p.pole === pole);
  return (
    <div className="container mx-auto px-4 max-w-6xl space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Preuves concrètes</span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground">
            {pole === "web" ? "Ils l'ont fait avec nous" : "Missions récentes"}
          </h3>
        </div>
        <Link to="/projets" className="text-sm font-extrabold text-primary inline-flex items-center gap-1.5 hover:gap-2.5 transition-all">
          Toutes les réalisations <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
      <div className={`grid gap-6 sm:grid-cols-2 ${projects.length > 2 ? "lg:grid-cols-3" : ""}`}>
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} source={`services_${pole}`} />
        ))}
      </div>
    </div>
  );
};

export default PoleProjects;
