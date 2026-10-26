import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Building2, Calendar, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PROJECTS_DATA } from "@/data/projects";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { trackConversionEvent } from "@/lib/analytics";
import { openBooking } from "@/lib/calendly";

const SI_POINTS = ["Cartographie et urbanisation du SI", "Référentiel MEGA HOPEX V5", "Dossiers d'architecture (DAT)"];

/**
 * Le second métier de RAMSIN, présenté en une section compacte sur l'accueil :
 * l'accueil parle d'abord aux porteurs de projet web et mobile, le détail SI est sur /services#architecture-si.
 */
export const SiSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const missions = PROJECTS_DATA.filter((p) => p.pole === "si");

  return (
    <section id="architecture-si" className="py-14 md:py-20 bg-secondary/30 border-t border-border/60 scroll-mt-24">
      <div
        ref={ref}
        className={`container mx-auto px-4 max-w-6xl grid md:grid-cols-[1.15fr_1fr] gap-8 md:gap-12 items-center scroll-fade-up ${isVisible ? "is-visible" : ""}`}
      >
        <div className="space-y-5">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#123A35]">
            <span className="w-8 h-8 rounded-lg bg-[#123A35] text-[#C7F36B] flex items-center justify-center">
              <Building2 className="w-4 h-4" />
            </span>
            Pour les DSI et directions de transformation
          </span>
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight">Architecture SI & MEGA HOPEX</h2>
          <p className="text-muted-foreground text-base leading-relaxed">
            RAMSIN accompagne aussi les grandes entreprises sur leur système d'information : cartographie applicative,
            urbanisation, gouvernance des référentiels MEGA HOPEX V5 et dossiers d'architecture, en régie ou au forfait.
          </p>
          <ul className="flex flex-wrap gap-2">
            {SI_POINTS.map((point) => (
              <li
                key={point}
                className="inline-flex items-center gap-1.5 rounded-full bg-white border border-border/80 px-3 py-1.5 text-xs sm:text-sm font-semibold text-foreground/90"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-[#123A35]" /> {point}
              </li>
            ))}
          </ul>
          <div className="flex flex-col sm:flex-row gap-3 pt-1">
            <Button asChild size="lg" className="rounded-xl gap-2 bg-[#123A35] hover:bg-[#0a221f] text-white font-bold">
              <Link
                to="/services#architecture-si"
                onClick={() => trackConversionEvent("select_pole", { pole: "si", source: "home_si_section" })}
              >
                Découvrir l'offre SI <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="rounded-xl gap-2 font-bold border-2 border-[#123A35]/25 hover:border-[#123A35] cursor-pointer"
              onClick={() => openBooking("home_si_section")}
            >
              <Calendar className="w-4 h-4" /> Réserver un échange
            </Button>
          </div>
        </div>

        {/* Preuves pour une DSI : les missions SI, chacune reliée à son étude de cas */}
        <div className="rounded-3xl border border-border/80 bg-card p-5 sm:p-6 space-y-3 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Missions récentes</p>
          <ul className="space-y-3">
            {missions.map((mission) => (
              <li key={mission.id}>
                <Link
                  to={`/projets/${mission.id}`}
                  onClick={() => trackConversionEvent("click_case_study", { projectId: mission.id, source: "home_si_section" })}
                  className="group flex items-start justify-between gap-3 rounded-2xl border border-border/70 bg-background p-4 hover:border-[#123A35]/40 transition-colors"
                >
                  <span className="min-w-0">
                    <span className="block text-sm font-extrabold text-primary">{mission.client}</span>
                    <span className="block text-sm font-semibold text-foreground leading-snug mt-0.5">{mission.headline}</span>
                  </span>
                  <ArrowUpRight className="w-4 h-4 mt-1 shrink-0 text-muted-foreground group-hover:text-[#123A35] transition-colors" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default SiSection;
