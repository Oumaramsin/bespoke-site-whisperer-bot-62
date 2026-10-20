import { ShieldCheck } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface Client {
  name: string;
  logo: string;
  category: string;
  description: string;
  imgClassName?: string;
}

const ClientsSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  const corporateClients: Client[] = [
    {
      name: "COVEA",
      logo: "/logos/covea.png",
      category: "Assurance & Mutuelle",
      description: "Architecture & Cartographie SI MEGA HOPEX V5",
      imgClassName: "max-h-14 max-w-[140px]"
    },
    {
      name: "La Banque Postale",
      logo: "/logos/banque-postale.webp",
      category: "Secteur Bancaire",
      description: "Dossiers d'Architecture Solution (DAT) & Crédit",
      imgClassName: "max-h-14 max-w-[140px]"
    },
    {
      name: "Société Générale",
      logo: "/logos/societe-generale.png",
      category: "Banque & Finance",
      description: "Développement d'Applications Web & Agilité",
      imgClassName: "max-h-16 max-w-[170px] scale-125 sm:scale-135"
    },
    {
      name: "France Travail",
      logo: "/logos/france-travail.webp",
      category: "Service Public",
      description: "Systèmes d'Information & Projets Métiers",
      imgClassName: "max-h-16 max-w-[170px] scale-125 sm:scale-135"
    }
  ];

  return (
    <section className="py-10 bg-gradient-to-r from-secondary/40 via-background to-secondary/40 border-y border-border/60">
      <div className="container mx-auto px-4">
        <div ref={ref} className={`text-center max-w-3xl mx-auto mb-8 space-y-2 scroll-fade-up ${isVisible ? "is-visible" : ""}`}>
          <p className="text-xs sm:text-sm font-bold tracking-wider text-muted-foreground uppercase flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-primary" /> Missions de conseil, architecture SI & cadrage exercées au sein de leurs équipes :
          </p>
          <p className="text-xs text-muted-foreground/80 max-w-2xl mx-auto pt-1 font-normal">
            Interventions d'expertise senior (MEGA HOPEX V5, dossiers d'architecture technique, gouvernance) réalisées en direct ou via nos partenaires de confiance.
          </p>
        </div>

        <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto items-center scroll-scale-up ${isVisible ? "is-visible" : ""}`}>
          {corporateClients.map((client, index) => (
            <div
              key={index}
              className={`p-5 rounded-2xl bg-white/90 backdrop-blur-md border border-border/80 hover:border-emerald-500/50 transition-all text-center space-y-4 flex flex-col justify-between shadow-[0_4px_20px_-8px_rgba(0,0,0,0.05)] hover:shadow-xl hover:shadow-emerald-950/5 group hover-lift h-full stagger-${index + 1}`}
            >
              {/* Logo de l'entreprise sur piédestal soigné */}
              <div className="h-16 flex items-center justify-center p-2 rounded-xl bg-gradient-to-b from-slate-50 to-white border border-border/40 overflow-hidden group-hover:border-emerald-500/30 transition-colors">
                <img
                  src={client.logo}
                  alt={`Logo officiel de l'entreprise ${client.name}`}
                  width="160"
                  height="60"
                  loading="lazy"
                  decoding="async"
                  className={`object-contain transition-all duration-300 opacity-90 group-hover:opacity-100 group-hover:scale-105 ${client.imgClassName || "max-h-14 max-w-[140px]"}`}
                />
              </div>

              <div>
                <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block bg-emerald-500/10 rounded-full py-0.5 px-2 w-fit mx-auto border border-emerald-500/20">
                  {client.category}
                </span>
                <p className="text-[11px] text-muted-foreground font-medium pt-2 border-t border-border/40 line-clamp-2">
                  {client.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
