import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ArrowRight, Award, CheckCircle2, UserCheck, ShieldCheck, Target, Cpu } from "lucide-react";

const AboutSection = () => {
  const differentiators = [
    {
      icon: Cpu,
      title: "Autonomie Complète de A à Z",
      description: "Capable de prendre en charge votre projet depuis le recueil du besoin fonctionnel jusqu'au déploiement sécurisé en production."
    },
    {
      icon: Target,
      title: "Culture du Résultat Métier",
      description: "Priorité absolue à la valeur concrète apportée à votre entreprise et vos utilisateurs, plutôt qu'au code pour le code."
    },
    {
      icon: ShieldCheck,
      title: "Exigence Grands Comptes",
      description: "Rigueur, normes de sécurité et qualité éprouvées auprès de grandes institutions bancaires et d'assurance (COVEA, La Banque Postale)."
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-card border-y border-border/60">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <Badge variant="outline" className="px-3.5 py-1 text-xs border-primary/30 text-primary font-semibold">
              <UserCheck className="w-3.5 h-3.5 mr-1 inline" /> Séniorité & Engagements
            </Badge>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
              Pourquoi Travailler Ensemble ?
            </h2>
            <p className="text-muted-foreground text-lg sm:text-xl">
              Ingénieur diplômé (Master 2 Sup de Vinci / MIAGE), Oumar SIDIBÉ combine 7 ans d'expérience SI et développement web sur-mesure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {differentiators.map((diff, index) => {
              const IconComp = diff.icon;
              return (
                <div key={index} className="p-6 rounded-2xl bg-background border border-border/80 hover:border-primary/40 transition-all space-y-4 hover-lift">
                  <div className="p-3 bg-primary/10 text-primary rounded-xl w-fit">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">{diff.title}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {diff.description}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="text-center pt-4">
            <Button asChild size="lg" variant="outline" className="gap-2 font-semibold hover-lift">
              <Link to="/about">
                Consulter le parcours & compétences <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;
