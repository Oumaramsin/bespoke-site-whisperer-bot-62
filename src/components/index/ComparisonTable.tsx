import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, X, Scale, Sparkles, ShieldCheck, ArrowRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const ComparisonTable = () => {
  const { ref, isVisible } = useScrollAnimation();

  const comparisonRows = [
    {
      criterion: "Communication & Suivi",
      traditional: "Jargon technique complexe, échanges rares et nouvelles imprécises.",
      ramsin: "Explications 100% en langage clair, démonstrations régulières et suivi transparent."
    },
    {
      criterion: "Transparence Budget",
      traditional: "Devis flous, suppléments imprévus et surcoûts en cours de réalisation.",
      ramsin: "Devis forfaitaire ferme garanti. Zéro frais caché, tarif fixe scrupuleusement respecté."
    },
    {
      criterion: "Propriété & Liberté",
      traditional: "Code propriétaire fermé, client verrouillé et dépendant pour chaque modification.",
      ramsin: "Propriété 100% à votre nom (code source, domaine, serveurs) + Guide d'autonomie."
    },
    {
      criterion: "Garantie Post-Lancement",
      traditional: "Aucune assistance offerte ou facturation au prix fort dès le moindre besoin.",
      ramsin: "Garantie 30 jours offerte : correction immédiate et gratuite du moindre dysfonctionnement."
    }
  ];

  const scrollToReservation = () => {
    const el = document.getElementById("reservation-calendrier");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background via-secondary/20 to-background border-t border-border/60 relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* En-tête de section */}
        <div
          ref={ref}
          className={`text-center max-w-3xl mx-auto mb-14 space-y-3 scroll-fade-up ${isVisible ? "is-visible" : ""}`}
        >
          <Badge
            variant="outline"
            className="px-3.5 py-1 text-xs border-primary/30 text-primary font-semibold"
          >
            <Scale className="w-3.5 h-3.5 mr-1.5 inline text-primary" /> Transparence & Sérénité
          </Badge>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            Méthode Classique vs L'Approche RAMSIN
          </h2>
          <p className="text-muted-foreground text-lg sm:text-xl leading-relaxed">
            Une comparaison directe entre les dérives habituelles du secteur et un partenariat serein, transparent et sécurisé.
          </p>
        </div>

        {/* Tableau de Comparaison Haut de Gamme */}
        <Card
          className={`max-w-5xl mx-auto border-2 border-emerald-500/30 shadow-2xl overflow-hidden glass-card rounded-2xl scroll-scale-up ${isVisible ? "is-visible" : ""}`}
        >
          <CardContent className="p-0">
            {/* Header de la Table */}
            <div className="grid grid-cols-12 bg-muted/80 p-4 sm:p-6 border-b border-border/80 text-xs sm:text-sm font-bold items-center">
              <div className="col-span-4 sm:col-span-3 text-foreground font-extrabold flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-primary hidden sm:inline" />
                <span>Critères de Projet</span>
              </div>
              <div className="col-span-4 sm:col-span-4 text-rose-600 dark:text-rose-400 flex items-center gap-2 font-extrabold px-3 py-1.5 rounded-xl bg-rose-500/15 dark:bg-rose-950/40 border border-rose-500/30 w-fit shadow-2xs">
                <div className="w-5 h-5 rounded-full bg-rose-500 text-white flex items-center justify-center shrink-0 shadow-2xs">
                  <X className="w-3 h-3 stroke-[3]" />
                </div>
                <span className="truncate">Agence / Méthode Classique</span>
              </div>
              <div className="col-span-4 sm:col-span-5 text-emerald-700 dark:text-emerald-300 flex items-center justify-between font-black p-2.5 rounded-xl bg-gradient-to-r from-emerald-500/20 via-emerald-500/15 to-emerald-500/20 border border-emerald-500/40 shadow-xs">
                <span className="flex items-center gap-2 truncate">
                  <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span className="truncate">L'Approche RAMSIN</span>
                </span>
                <Badge className="hidden sm:inline-flex bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  <Sparkles className="w-3 3 mr-1 inline" /> Recommandé
                </Badge>
              </div>
            </div>

            {/* Lignes du Tableau */}
            <div className="divide-y divide-border/60">
              {comparisonRows.map((row, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-12 p-4 sm:p-6 text-xs sm:text-sm items-center hover:bg-muted/40 transition-colors"
                >
                  {/* Colonne Critère */}
                  <div className="col-span-4 sm:col-span-3 font-extrabold text-foreground pr-2">
                    {row.criterion}
                  </div>

                  {/* Colonne Méthode Classique */}
                  <div className="col-span-4 sm:col-span-4 text-muted-foreground pr-3 flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-rose-500/15 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0 mt-0.5">
                      <X className="w-3 h-3 stroke-[2.5]" />
                    </div>
                    <span className="leading-relaxed font-medium">{row.traditional}</span>
                  </div>

                  {/* Colonne Mon Accompagnement Ramsin (Mise en avant stylisée) */}
                  <div className="col-span-4 sm:col-span-5 font-semibold text-foreground bg-emerald-500/10 dark:bg-emerald-500/15 p-3.5 rounded-xl border border-emerald-500/30 flex items-start gap-2.5 shadow-2xs">
                    <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                      <Check className="w-3 h-3" />
                    </div>
                    <span className="leading-relaxed text-emerald-950 dark:text-emerald-200 font-bold">
                      {row.ramsin}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Bandeau d'Appel à l'Action de fin de Tableau */}
            <div className="bg-gradient-to-r from-emerald-500/10 via-primary/5 to-emerald-500/10 p-6 border-t border-emerald-500/30 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <h4 className="font-extrabold text-foreground text-base">Convaincu par l'approche RAMSIN ?</h4>
                <p className="text-xs text-muted-foreground">Planifiez votre premier échange offert de 30 minutes sans engagement.</p>
              </div>
              <Button onClick={scrollToReservation} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold gap-2 shadow-md cursor-pointer shrink-0">
                Réserver mon échange (30 min) <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ComparisonTable;
