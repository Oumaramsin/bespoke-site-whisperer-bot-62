import { ShieldCheck, Lock, Clock, HeartHandshake, CheckCircle2, Sparkles, Key, Video } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const BenefitsSection = () => {
  const guarantees = [
    {
      icon: HeartHandshake,
      title: "Transparence Pédagogique",
      fearResolved: "Résout : \"Je ne vais rien comprendre et me faire avoir sur le prix\"",
      description: "Pas de jargon inutile. Je vous explique chaque décision technique avec des mots simples pour que vous gardiez 100 % du contrôle sur votre projet.",
      highlight: "Zéro vocabulaire obscur"
    },
    {
      icon: Clock,
      title: "Devis Ferme & Délais Respectés",
      fearResolved: "Résout : \"Le projet va prendre du retard et exploser le budget\"",
      description: "Engagement strict sur devis ferme et calendrier jalonné étape par étape. Zéro frais caché, zéro mauvaise surprise à la livraison.",
      highlight: "Budget & planning 100% garantis"
    },
    {
      icon: Key,
      title: "100% Propriété & Autonomie Garanties",
      fearResolved: "Résout : \"Une fois livré, je serai bloqué et dépendant du développeur\"",
      description: "Le code, le domaine et tous les accès vous appartiennent à 100 %. Un guide d'utilisation pas-à-pas vous est transmis pour gérer votre contenu en toute autonomie.",
      highlight: "Guide d'autonomie inclus"
    },
    {
      icon: ShieldCheck,
      title: "Garantie 30 Jours Post-Lancement",
      fearResolved: "Résout : \"Si le site plante le mois prochain, je fais comment ?\"",
      description: "Correction immédiate et 100% gratuite du moindre bug ou ajustement durant les 30 jours suivant la mise en ligne officielle.",
      highlight: "Assistance réactive offerte"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-card border-t border-border/60">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <Badge variant="outline" className="px-3.5 py-1 text-xs border-primary/30 text-primary font-semibold">
            <Sparkles className="w-3.5 h-3.5 mr-1 inline" /> Sérénité & Garanties
          </Badge>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            Les 4 Engagements Sérénité Ramsin
          </h2>
          <p className="text-muted-foreground text-lg sm:text-xl leading-relaxed">
            Nous désamorçons chaque inquiétude pour vous offrir un accompagnement fluide et de confiance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {guarantees.map((item, index) => {
            const IconComp = item.icon;
            return (
              <div
                key={index}
                className="p-6 rounded-2xl bg-background border border-border/80 hover:border-primary/50 transition-all hover-lift space-y-4 shadow-2xs group"
              >
                <div className="flex items-center justify-between">
                  <div className="p-3 bg-primary/10 rounded-xl text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                    {item.highlight}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-xl font-extrabold text-foreground group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs font-semibold text-muted-foreground italic">
                    {item.fearResolved}
                  </p>
                </div>

                <p className="text-sm text-foreground/90 leading-relaxed pt-1">
                  {item.description}
                </p>

                <div className="pt-2 flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-4 h-4" /> Promesse respectée sur 100% de nos projets
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
