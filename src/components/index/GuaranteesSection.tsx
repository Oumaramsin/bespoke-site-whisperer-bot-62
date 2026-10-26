import { FileCheck, Eye, ShieldCheck, CheckCircle2, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export const GuaranteesSection = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollAnimation();

  const guarantees = [
    {
      icon: FileCheck,
      badge: "Pas de rallonge",
      badgeColor: "bg-[#123A35]/10 text-[#123A35] border-[#123A35]/25",
      title: "Périmètre cadré & budget forfaitaire",
      description:
        "On cadre le projet ensemble et vous validez un devis ferme avant le début. Pas de frais cachés, pas de rallonge en cours de route.",
      points: [
        "Devis détaillé poste par poste",
        "Un planning avec des étapes datées",
        "Prix forfaitaire écrit dans le devis",
      ],
    },
    {
      icon: Eye,
      badge: "Vous suivez tout",
      badgeColor: "bg-[#C7F36B]/25 text-[#123A35] border-[#C7F36B]/50",
      title: "Une version à tester chaque semaine",
      description:
        "Chaque semaine, vous testez la nouvelle version sur un lien privé. Vous donnez vos retours, on ajuste, et rien n'est mis en ligne sans votre accord.",
      points: [
        "Un lien de test mis à jour chaque semaine",
        "Vos retours intégrés au fur et à mesure",
        "Échanges directs sans jargon technique",
      ],
    },
    {
      icon: ShieldCheck,
      badge: "Tout est à vous",
      badgeColor: "bg-emerald-500/10 text-emerald-800 border-emerald-500/25",
      title: "Code à votre nom & garantie 30 jours",
      description:
        "Le code source et tous les comptes sont à votre nom. Pendant 30 jours après le lancement, nous corrigeons sans frais tout bug constaté.",
      points: [
        "Code source cédé par contrat",
        "Aucun abonnement imposé",
        "Corrections gratuites pendant 30 jours",
      ],
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background via-secondary/25 to-background border-t border-border/60 relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* En-tête de section */}
        <div
          ref={headerRef}
          className={`text-center max-w-3xl mx-auto mb-14 space-y-3 scroll-fade-up ${
            headerVisible ? "is-visible" : ""
          }`}
        >
          <Badge
            variant="outline"
            className="px-3.5 py-1 text-xs border-primary/30 text-primary font-semibold"
          >
            <Sparkles className="w-3.5 h-3.5 mr-1 inline text-amber-500" />
            Nos engagements
          </Badge>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            Trois garanties écrites pour votre projet
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Ce à quoi nous nous engageons sur chaque projet, par écrit, avant de commencer.
          </p>
        </div>

        {/* Grille des 3 Garanties d'Impact */}
        <div
          ref={cardsRef}
          className={`grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 scroll-fade-up ${
            cardsVisible ? "is-visible" : ""
          }`}
        >
          {guarantees.map((item, idx) => {
            const IconComp = item.icon;
            const topAccents = [
              "from-[#123A35] via-[#1c554e] to-[#0a2320]",
              "from-[#C7F36B] via-emerald-400 to-[#123A35]",
              "from-emerald-600 via-teal-500 to-[#123A35]",
            ];
            const iconStyles = [
              "bg-[#123A35] text-[#C7F36B] shadow-md shadow-[#123A35]/20",
              "bg-[#C7F36B] text-[#071816] shadow-md shadow-[#C7F36B]/30",
              "bg-emerald-700 text-white shadow-md shadow-emerald-700/20",
            ];

            return (
              <Card
                key={idx}
                className="flex flex-col md:justify-between border-2 border-border/80 hover:border-emerald-500/50 transition-all hover-lift bg-white rounded-3xl overflow-hidden shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_50px_-12px_rgba(18,58,53,0.15)] group"
              >
                <div className={`h-1.5 bg-gradient-to-r ${topAccents[idx]}`} />
                <CardHeader className="space-y-3 p-6 pb-3 sm:p-7 sm:pb-3">
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold ${iconStyles[idx]}`}>
                      <IconComp className="w-6 h-6" />
                    </div>
                    <Badge variant="outline" className={`text-xs font-bold px-3 py-1 rounded-full border ${item.badgeColor}`}>
                      {item.badge}
                    </Badge>
                  </div>

                  <CardTitle className="text-xl font-extrabold leading-snug text-foreground pt-1">
                    {item.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4 md:flex-1 md:flex md:flex-col md:justify-between p-6 pt-0 sm:p-7 sm:pt-0">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>

                  <div className="hidden sm:block pt-3 border-t border-border/60 space-y-2">
                    {item.points.map((pt, pIdx) => (
                      <div key={pIdx} className="flex items-start gap-2 text-xs font-semibold text-foreground/90">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </div>
                    ))}
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

export default GuaranteesSection;
