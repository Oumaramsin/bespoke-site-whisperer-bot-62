import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PackageCheck, FileText, Key, ShieldCheck, CheckCircle2 } from "lucide-react";

const DeliveryPackSection = () => {
  const packItems = [
    {
      icon: FileText,
      title: "Documentation Complète en Français Simple",
      description: "Un guide d'utilisation rédigé pas-à-pas avec des explications claires pour gérer et mettre à jour votre contenu sans toucher une seule ligne de code."
    },
    {
      icon: Key,
      title: "Certificat de Transfert de Propriété 100%",
      description: "Le code source, le nom de domaine, les hébergements et les comptes d'accès vous appartiennent à 100 %. Aucune dépendance, aucune licence captive."
    },
    {
      icon: ShieldCheck,
      title: "Assistance & Garantie 30 Jours Offertes",
      description: "Un suivi post-lancement réactif : correction immédiate et gratuite de la moindre anomalie durant le mois suivant la mise en ligne officielle."
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-card border-t border-border/60">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <Badge variant="outline" className="px-3.5 py-1 text-xs border-primary/30 text-primary font-semibold">
            <PackageCheck className="w-3.5 h-3.5 mr-1 inline" /> Livrables Officiels
          </Badge>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            Le Pack de Livraison Clé en Main
          </h2>
          <p className="text-muted-foreground text-lg sm:text-xl leading-relaxed">
            Ce que vous recevez le jour officiel de la mise en ligne pour garantir votre liberté totale.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {packItems.map((item, index) => {
            const IconComp = item.icon;
            return (
              <Card key={index} className="flex flex-col border border-border/80 hover:border-primary/40 transition-all hover-lift bg-background">
                <CardContent className="pt-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="p-3 bg-primary/10 text-primary rounded-xl w-fit">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <h3 className="font-extrabold text-lg text-foreground">{item.title}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-border/60 flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" /> Inclus sans frais supplémentaires
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

export default DeliveryPackSection;
