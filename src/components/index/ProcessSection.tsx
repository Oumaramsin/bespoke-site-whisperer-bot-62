import { MessageSquare, FileText, Wrench, Rocket, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const ProcessSection = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: stepsRef, isVisible: stepsVisible } = useScrollAnimation();

  const steps = [
    {
      number: "01",
      icon: MessageSquare,
      title: "1. Échange Offert (30 min)",
      description: "Vous expliquez votre besoin ou votre idée en toute simplicité. Pas besoin de vocabulaire informatique : nous traduisons vos besoins métiers en solutions claires."
    },
    {
      number: "02",
      icon: FileText,
      title: "2. Proposition & Devis Transparent",
      description: "Vous recevez une feuille de route détaillée avec un tarif fixe et sans aucun coût caché. Vous savez exactement ce qui sera livré et dans quel délai."
    },
    {
      number: "03",
      icon: Wrench,
      title: "3. Création & Suivi en Direct",
      description: "Nous créons votre site, application ou architecture. Vous suivez l'avancée étape par étape grâce à des présentations régulières pour donner votre avis."
    },
    {
      number: "04",
      icon: Rocket,
      title: "4. Lancement & Prise en Main",
      description: "Votre projet est mis en ligne en toute sécurité. Nous vous formons pour que vous soyez 100% autonome et nous assurons le suivi technique."
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-background border-t border-border/60">
      <div className="container mx-auto px-4">
        <div ref={headerRef} className={`text-center max-w-3xl mx-auto mb-16 space-y-4 scroll-fade-up ${headerVisible ? "is-visible" : ""}`}>
          <Badge variant="outline" className="px-3.5 py-1 text-xs border-primary/30 text-primary font-semibold">
            Méthode & Accompagnement
          </Badge>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            Votre Projet en 4 Étapes Simples
          </h2>
          <p className="text-muted-foreground text-lg sm:text-xl leading-relaxed">
            Pas de casse-tête ni de termes complexes : nous vous accompagnons pas à pas en toute sérénité.
          </p>
        </div>

        <div ref={stepsRef} className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 scroll-fade-up ${stepsVisible ? "is-visible" : ""}`}>
          {steps.map((step, index) => {
            const IconComp = step.icon;
            return (
              <div key={index} className={`relative flex flex-col p-6 rounded-2xl bg-card border border-border/80 shadow-xs hover:border-primary/40 transition-all group hover-lift stagger-${index + 1}`}>
                {/* Connector line between steps (desktop only) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary/30 to-transparent" />
                )}
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-primary/10 rounded-xl text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <span className="text-3xl font-extrabold text-muted-foreground/30 font-mono">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-lg font-bold mb-2 text-foreground">{step.title}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed flex-1">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Button asChild size="lg" className="gap-2 font-semibold px-8 shadow-md animate-pulse-glow">
            <Link to="/contact">
              Démarrer par un échange offert de 30 min <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
