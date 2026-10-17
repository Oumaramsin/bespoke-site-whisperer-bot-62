import { FileCheck, Eye, ShieldCheck, CheckCircle2, Sparkles, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { trackConversionEvent } from "@/lib/analytics";

export const GuaranteesSection = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollAnimation();

  const guarantees = [
    {
      icon: FileCheck,
      badge: "Zéro Surcoût Imprévu",
      badgeColor: "bg-[#123A35]/10 text-[#123A35] border-[#123A35]/25",
      title: "Périmètre Cadré & Budget Forfaitaire",
      description:
        "Cadrage fonctionnel rigoureux et devis ferme validé ensemble dès le départ. Aucun frais caché ni surcoût en cours de réalisation : votre investissement est scrupuleusement maîtrisé.",
      points: [
        "Devis détaillé poste par poste",
        "Calendrier de livraison jalonné",
        "Engagement forfaitaire contractuel",
      ],
    },
    {
      icon: Eye,
      badge: "Visibilité Continue",
      badgeColor: "bg-[#C7F36B]/25 text-[#123A35] border-[#C7F36B]/50",
      title: "Démonstrations Régulières & Zéro Boîte Noire",
      description:
        "Vous suivez l'avancée réelle à chaque sprint via un espace de pré-production privé. Vous donnez vos retours en direct et validez l'ergonomie avant toute mise en ligne.",
      points: [
        "Démos interactives à chaque étape clé",
        "Ajustements agiles sans friction",
        "Échanges directs sans jargon technique",
      ],
    },
    {
      icon: ShieldCheck,
      badge: "Liberté Totale & Sérénité",
      badgeColor: "bg-emerald-500/10 text-emerald-800 border-emerald-500/25",
      title: "Pleine Propriété du Code & Garantie 30 Jours",
      description:
        "Le code source complet et tous les comptes d'hébergement vous sont remis à 100%. Tout aléa technique éventuel est pris en charge et résolu en priorité sans frais durant les 30 jours suivant le lancement.",
      points: [
        "Cession contractuelle 100% du code source",
        "Zéro abonnement captif ni dépendance",
        "Garantie corrective gratuite pendant 30 jours",
      ],
    },
  ];

  const scrollToReservation = () => {
    trackConversionEvent("click_booking_calendly", { source: "guarantees_banner" });
    const el = document.getElementById("reservation-calendrier");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

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
            Engagements de Sérénité
          </Badge>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            3 Garanties Concrètes pour Votre Projet
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Engagements contractuels fermes et règles déontologiques qui protègent votre investissement et cadrent votre projet.
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
            return (
              <Card
                key={idx}
                className="flex flex-col justify-between border-2 border-border/80 hover:border-primary/50 transition-all hover-lift bg-card rounded-2xl overflow-hidden shadow-xs"
              >
                <CardHeader className="pb-3 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <Badge variant="outline" className={`text-[11px] font-bold px-2.5 py-0.5 border ${item.badgeColor}`}>
                      {item.badge}
                    </Badge>
                  </div>

                  <CardTitle className="text-xl font-extrabold leading-snug text-foreground">
                    {item.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4 flex-1 flex flex-col justify-between pt-0">
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>

                  <div className="pt-3 border-t border-border/60 space-y-2">
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

        {/* Bandeau d'Appel à l'Action de transition */}
        <div className="p-6 rounded-2xl glass-card border border-border/80 text-center max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="text-center sm:text-left space-y-1">
            <h4 className="font-extrabold text-foreground text-base">
              Vous avez un projet en tête ou un besoin à préciser ?
            </h4>
            <p className="text-xs text-muted-foreground">
              Échangeons simplement lors d'une session de cadrage offerte de 30 minutes.
            </p>
          </div>

          <Button
            variant="lime"
            size="sm"
            className="rounded-xl px-5 py-2.5 font-bold shadow-sm shrink-0 cursor-pointer gap-2"
            onClick={scrollToReservation}
          >
            <Calendar className="w-4 h-4" /> Planifier un cadrage offert (30 min)
          </Button>
        </div>

      </div>
    </section>
  );
};

export default GuaranteesSection;
