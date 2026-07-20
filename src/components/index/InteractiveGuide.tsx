import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Smartphone, ShoppingBag, Building2, HelpCircle, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const InteractiveGuide = () => {
  const [selectedCategory, setSelectedCategory] = useState<number>(0);

  const options = [
    {
      id: 0,
      icon: Smartphone,
      title: "Application ou Plateforme Web",
      subtitle: "Pour entrepreneurs & créateurs de services",
      description: "Vous voulez lancer une plateforme web moderne, rapide et sécurisée avec gestion d'utilisateurs, espaces connectés ou services collaboratifs.",
      exampleTitle: "Exemple de Réalisation : Dabari",
      exampleDesc: "Plateforme communautaire traiteur & transport collaboratif GP Colis (Next.js 16, React, Node.js, PostgreSQL, Docker).",
      features: ["Authentification sécurisée (JWT)", "Tableaux de bord interactifs", "Administration complète"],
      targetLink: "/projects",
      buttonText: "Découvrir le projet Dabari"
    },
    {
      id: 1,
      icon: ShoppingBag,
      title: "Site Vitrine & Boutique E-Commerce",
      subtitle: "Pour commerçants, artisans & prestataires",
      description: "Vous souhaitez créer un site vitrine captant des prospects qualifiés ou une boutique e-commerce de luxe avec paiement en ligne.",
      exampleTitle: "Exemples : L'Éclat du Chef & Maison HamdiWaShukri",
      exampleDesc: "Vitrine événementielle traiteur avec devis automatique et boutique de luxe avec atelier sur-mesure & paiements Stripe/PayPal.",
      features: ["Paiement sécurisé Stripe / PayPal", "Configurateur sur-mesure", "Demande de devis sans rechargement"],
      targetLink: "/projects",
      buttonText: "Découvrir ces réalisations"
    },
    {
      id: 2,
      icon: Building2,
      title: "Architecture SI & MEGA HOPEX",
      subtitle: "Pour DSI & Directeurs de Projets",
      description: "Vous cherchez à structurer et cartographier les logiciels de votre entreprise, rédiger des DAT et faire valider vos architectures.",
      exampleTitle: "Références DSI : COVEA & La Banque Postale",
      exampleDesc: "Gouvernance des données, cartographie des flux applicatifs MEGA HOPEX V5 et passage en Design Authority.",
      features: ["Dossiers d'Architecture (DAT)", "Qualité du référentiel V5", "Accompagnement des architectes"],
      targetLink: "/services",
      buttonText: "Consulter l'offre Architecture SI"
    },
    {
      id: 3,
      icon: HelpCircle,
      title: "Autre Demande & Projet Sur-Mesure",
      subtitle: "Pour tout besoin ou idée spécifique",
      description: "Vous avez une idée novatrice, un besoin d'automatisation, un audit ou un projet personnalisé qui ne rentre pas dans les cases ?",
      exampleTitle: "Accompagnement & Conseil Personnalisé",
      exampleDesc: "Nous étudions votre demande sous 24h et concevons une réponse sur-mesure adaptée à votre budget et à vos objectifs.",
      features: ["Étude de faisabilité offerte (30 min)", "Accompagnement 100% en langage clair", "Devis fixe & solution sur-mesure"],
      targetLink: "/contact",
      buttonText: "Discuter de mon projet spécifique"
    }
  ];

  const current = options[selectedCategory];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background via-secondary/15 to-background border-t border-border/60">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <Badge variant="outline" className="px-3.5 py-1 text-xs border-primary/30 text-primary font-semibold">
            <Sparkles className="w-3.5 h-3.5 mr-1 inline" /> Guide Interactif
          </Badge>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            Quel est Votre Besoin ?
          </h2>
          <p className="text-muted-foreground text-lg sm:text-xl leading-relaxed">
            Cliquez sur votre situation pour découvrir la solution et l'exemple concret correspondant.
          </p>
        </div>

        {/* Boutons de sélection en grille de 4 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto mb-10">
          {options.map((opt, index) => {
            const IconComp = opt.icon;
            const isSelected = selectedCategory === index;
            return (
              <button
                key={opt.id}
                onClick={() => setSelectedCategory(index)}
                className={`p-5 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                  isSelected
                    ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20 scale-[1.02]"
                    : "bg-card border-border/80 hover:border-primary/50 text-foreground hover-lift"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2.5 rounded-xl ${isSelected ? "bg-white/20 text-white" : "bg-primary/10 text-primary"}`}>
                    <IconComp className="w-6 h-6" />
                  </div>
                  {isSelected && (
                    <Badge variant="secondary" className="text-xs font-semibold bg-white/20 text-white border-none">
                      Sélectionné
                    </Badge>
                  )}
                </div>
                <div>
                  <span className={`text-xs font-semibold uppercase tracking-wider block mb-1 ${isSelected ? "text-primary-foreground/80" : "text-primary"}`}>
                    {opt.subtitle}
                  </span>
                  <h3 className="font-bold text-base leading-snug">
                    {opt.title}
                  </h3>
                </div>
              </button>
            );
          })}
        </div>

        {/* Fiche détaillée dynamique */}
        <Card className="max-w-6xl mx-auto border-2 border-primary/30 shadow-md bg-card/90 glass-card">
          <CardHeader className="pb-4 border-b border-border/60">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <Badge variant="secondary" className="text-xs font-semibold mb-2 bg-primary/10 text-primary">
                  {current.subtitle}
                </Badge>
                <CardTitle className="text-2xl font-extrabold">{current.title}</CardTitle>
                <CardDescription className="text-base mt-1 text-muted-foreground">{current.description}</CardDescription>
              </div>
              <Button asChild size="lg" className="shrink-0 gap-2 font-semibold shadow-md">
                <Link to={current.targetLink}>
                  {current.buttonText} <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </CardHeader>

          <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-7 space-y-3">
              <h4 className="text-sm font-bold text-foreground flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" /> Ce qui est inclus dans cette offre :
              </h4>
              <ul className="space-y-2">
                {current.features.map((feat, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-5 bg-primary/5 p-5 rounded-2xl border border-primary/15 space-y-2">
              <span className="text-xs font-bold text-primary uppercase tracking-wider block">
                {current.exampleTitle}
              </span>
              <p className="text-xs sm:text-sm text-foreground font-medium leading-relaxed">
                {current.exampleDesc}
              </p>
            </div>
          </CardContent>
        </Card>

      </div>
    </section>
  );
};

export default InteractiveGuide;
