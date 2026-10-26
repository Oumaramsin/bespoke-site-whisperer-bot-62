import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Quote, MessageSquareHeart, ArrowRight } from "lucide-react";
import { PUBLISHED_TESTIMONIALS, type Testimonial } from "@/data/testimonials";
import { PROJECTS_DATA } from "@/data/projects";
import { trackConversionEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

/** Initiales du témoin (ou de l'entreprise s'il est anonyme) pour l'avatar sans photo */
const initials = (t: Testimonial) =>
  (t.name || t.company)
    .replace(/[^\p{L}\s]/gu, " ")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");

/**
 * Avis clients de l'accueil. N'affiche que les avis écrits ou validés par les clients (src/data/testimonials.ts) :
 * tant qu'il n'y en a aucun, la section n'existe pas.
 */
const TestimonialsSection = () => {
  if (PUBLISHED_TESTIMONIALS.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-card border-t border-border/60">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <Badge variant="outline" className="px-3.5 py-1 text-xs border-primary/30 text-primary font-semibold">
            <MessageSquareHeart className="w-3.5 h-3.5 mr-1 inline" /> Avis clients
          </Badge>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">Ce que disent nos clients</h2>
          <p className="text-muted-foreground text-lg sm:text-xl leading-relaxed">
            Leurs mots, pas les nôtres : chaque avis est écrit par le client et relié à son projet.
          </p>
        </div>

        <div
          className={cn(
            "grid grid-cols-1 gap-6 md:gap-8 mx-auto",
            PUBLISHED_TESTIMONIALS.length >= 3 ? "md:grid-cols-2 lg:grid-cols-3 max-w-6xl" : "md:grid-cols-2 max-w-4xl",
          )}
        >
          {PUBLISHED_TESTIMONIALS.map((t, index) => {
            const project = t.projectId ? PROJECTS_DATA.find((p) => p.id === t.projectId) : undefined;
            return (
              <Card key={index} className="flex flex-col border border-border/80 shadow-xs hover:border-primary/40 transition-all hover-lift bg-background">
                <CardContent className="pt-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <Quote className="w-7 h-7 text-[#C7F36B] fill-[#C7F36B]/40" aria-hidden="true" />
                    <blockquote className="text-sm sm:text-base text-foreground leading-relaxed">« {t.quote} »</blockquote>
                  </div>

                  <div className="pt-3 border-t border-border/60 space-y-3">
                    <div className="flex items-center gap-3">
                      {t.photo ? (
                        <img
                          src={t.photo}
                          alt={t.name ? `Portrait de ${t.name}` : ""}
                          width={40}
                          height={40}
                          loading="lazy"
                          className="w-10 h-10 rounded-full object-cover border border-border/60 shrink-0"
                        />
                      ) : (
                        <span
                          aria-hidden="true"
                          className="w-10 h-10 rounded-full bg-[#123A35] text-[#C7F36B] flex items-center justify-center text-xs font-extrabold shrink-0"
                        >
                          {initials(t)}
                        </span>
                      )}
                      <div className="min-w-0">
                        <p className="font-bold text-sm text-foreground truncate">{t.name || t.role}</p>
                        <p className="text-xs text-muted-foreground truncate">
                          {t.name ? `${t.role} · ` : ""}
                          <span className="text-primary font-semibold">{t.company}</span>
                          {t.source ? ` · ${t.source}` : ""}
                        </p>
                      </div>
                    </div>

                    {project && (
                      <Link
                        to={`/projets/${project.id}`}
                        onClick={() => trackConversionEvent("click_case_study", { projectId: project.id, source: "testimonial" })}
                        className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline"
                      >
                        Lire l'étude de cas {project.client} <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
