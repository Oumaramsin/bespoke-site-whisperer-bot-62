import { FileCheck, Hand, ShieldCheck, LifeBuoy, CheckCircle2, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

/** Les quatre engagements écrits dans chaque devis : ils répondent aux freins relevés chez les prospects
 *  (prestataire qui disparaît, prix inconnu, projet qui dérape, personne après la mise en ligne). */
export const GUARANTEES = [
  {
    icon: Hand,
    badge: "Sans risque",
    title: "Payé après test, arrêt libre",
    description:
      "Vous payez chaque étape seulement après l'avoir testée sur votre téléphone. Vous pouvez arrêter à tout moment et vous gardez tout ce qui est payé.",
    points: [
      "Chaque étape payée après test",
      "Arrêt possible à la fin de chaque étape",
      "Vous gardez tout ce qui est payé",
    ],
  },
  {
    icon: ShieldCheck,
    badge: "Tout est à vous",
    title: "Code et comptes à votre nom",
    description:
      "Le code est déposé chaque semaine sur votre propre compte, avec une documentation pour qu'un autre développeur puisse reprendre si besoin. Stores, hébergement et nom de domaine sont à votre nom dès le départ.",
    points: [
      "Code déposé chaque semaine sur votre compte",
      "Documentation de reprise fournie",
      "Aucun abonnement imposé",
    ],
  },
  {
    icon: FileCheck,
    badge: "Pas de rallonge",
    title: "Prix ferme et date écrite",
    description:
      "Des fourchettes de prix affichées pour chaque type de projet. Le prix ferme est écrit dans le devis envoyé sous 48 h, avec la date de mise en ligne. Tout ajout est chiffré par écrit avant d'être fait.",
    points: [
      "Fourchettes de prix affichées, devis ferme sous 48 h",
      "Date de mise en ligne écrite dans le devis",
      "Ajouts chiffrés par écrit, jamais imposés",
    ],
  },
  {
    icon: LifeBuoy,
    badge: "On reste là",
    title: "Suivi après la mise en ligne",
    description:
      "30 jours de corrections offertes, puis une maintenance mensuelle à prix fixe, sans engagement : mises à jour iOS et Android, sécurité, bugs corrigés sous 2 jours ouvrés.",
    points: [
      "30 jours de corrections offertes",
      "Maintenance à prix fixe, sans engagement",
      "Bugs corrigés sous 2 jours ouvrés",
    ],
  },
];

const BADGE_COLORS = [
  "bg-[#C7F36B]/25 text-[#123A35] border-[#C7F36B]/50",
  "bg-emerald-500/10 text-emerald-800 border-emerald-500/25",
  "bg-[#123A35]/10 text-[#123A35] border-[#123A35]/25",
  "bg-teal-500/10 text-teal-800 border-teal-500/25",
];

export const GuaranteesSection = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollAnimation();

  const guarantees = GUARANTEES.map((g, idx) => ({ ...g, badgeColor: BADGE_COLORS[idx] }));

  return (
    <section
      id="garanties"
      className="scroll-mt-20 py-16 md:py-24 bg-gradient-to-b from-background via-secondary/25 to-background border-t border-border/60 relative overflow-hidden"
    >
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
            Quatre garanties écrites dans votre devis
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Ce à quoi RAMSIN s'engage sur chaque projet, par écrit, avant de commencer. Vous ne prenez aucun risque sur ce que vous n'avez pas testé.
          </p>
        </div>

        {/* Grille des 3 Garanties d'Impact */}
        <div
          ref={cardsRef}
          className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-12 scroll-fade-up ${
            cardsVisible ? "is-visible" : ""
          }`}
        >
          {guarantees.map((item, idx) => {
            const IconComp = item.icon;
            const topAccents = [
              "from-[#123A35] via-[#1c554e] to-[#0a2320]",
              "from-[#C7F36B] via-emerald-400 to-[#123A35]",
              "from-emerald-600 via-teal-500 to-[#123A35]",
              "from-teal-600 via-[#1c554e] to-[#071816]",
            ];
            const iconStyles = [
              "bg-[#123A35] text-[#C7F36B] shadow-md shadow-[#123A35]/20",
              "bg-[#C7F36B] text-[#071816] shadow-md shadow-[#C7F36B]/30",
              "bg-emerald-700 text-white shadow-md shadow-emerald-700/20",
              "bg-teal-700 text-white shadow-md shadow-teal-700/20",
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
