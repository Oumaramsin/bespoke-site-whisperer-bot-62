import { useState } from "react";
import {
  MessageSquare,
  FileText,
  Code2,
  Rocket,
  Layers,
  Workflow,
  Building2,
  Smartphone,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Award,
  Sparkles,
  Compass,
  Target,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { trackConversionEvent } from "@/lib/analytics";

type ProcessPole = "web" | "si";

const ProcessSection = () => {
  const [activePole, setActivePole] = useState<ProcessPole>("web");
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: stepsRef, isVisible: stepsVisible } = useScrollAnimation();

  const webSteps = [
    {
      number: "01",
      icon: FileText,
      title: "1. Périmètre & Devis Forfaitaire",
      description:
        "Cadrage fonctionnel précis, sélection de la stack adaptée et engagement sur un devis ferme sans surcoût. Vous savez exactement ce qui sera développé et dans quel délai.",
      deliverable: "Feuille de route & Devis forfaitaire ferme",
      accent: "border-emerald-500/30 text-emerald-700",
      bgAccent: "bg-emerald-500/10",
    },
    {
      number: "02",
      icon: Compass,
      title: "2. Conception UI/UX & Architecture",
      description:
        "Maquettage des interfaces sur Figma, conception des parcours utilisateurs et modélisation de la base de données. Vous validez l'apparence et l'ergonomie avant la moindre ligne de code.",
      deliverable: "Prototypes interactifs & Schéma relationnel",
      accent: "border-emerald-500/30 text-emerald-700",
      bgAccent: "bg-emerald-500/10",
    },
    {
      number: "03",
      icon: Code2,
      title: "3. Développement & Démos Régulières",
      description:
        "Développement itératif (Next.js, React Native, Node.js) avec des démonstrations intermédiaires à chaque étape clé. Vous suivez l'avancée réelle et donnez votre feedback en direct.",
      deliverable: "Accès à un espace de pré-production privé",
      accent: "border-emerald-500/30 text-emerald-700",
      bgAccent: "bg-emerald-500/10",
    },
    {
      number: "04",
      icon: Rocket,
      title: "4. Livraison, Prise en Main & Garantie",
      description:
        "Déploiement sécurisé sur votre hébergement, remise intégrale du code source sur votre dépôt, formation vidéo à l'administration et garantie offerte de 30 jours.",
      deliverable: "Code source cédé + Garantie 30 jours",
      accent: "border-emerald-500/30 text-emerald-700",
      bgAccent: "bg-emerald-500/10",
    },
  ];

  const siSteps = [
    {
      number: "01",
      icon: Target,
      title: "1. Cadrage de Mission & Enjeux DSI",
      description:
        "Identification des objectifs stratégiques (urbanisation, comités d'architecture, conformité réglementaire, refonte de métamodèle) et définition des modalités d'intervention (régie ou forfait).",
      deliverable: "Note de cadrage & Planning d'intervention",
      accent: "border-[#123A35]/30 text-[#123A35]",
      bgAccent: "bg-[#123A35]/10",
    },
    {
      number: "02",
      icon: Layers,
      title: "2. Analyse Existant & Métamodèle SI",
      description:
        "Audit du référentiel MEGA HOPEX, inventaire des applications et flux d'échanges, identification des adhérences legacy et résolution des anomalies cartographiques transverses.",
      deliverable: "Diagnostic du référentiel & Matrice d'écarts",
      accent: "border-[#123A35]/30 text-[#123A35]",
      bgAccent: "bg-[#123A35]/10",
    },
    {
      number: "03",
      icon: Workflow,
      title: "3. Modélisation & Rédaction des DAT",
      description:
        "Élaboration des diagrammes d'architecture dans MEGA HOPEX V5, rédaction détaillée des Dossiers d'Architecture Technique (DAT) et analyses d'impacts adhérence projet / stratégie globale.",
      deliverable: "DAT validés & Cartographies HOPEX V5",
      accent: "border-[#123A35]/30 text-[#123A35]",
      bgAccent: "bg-[#123A35]/10",
    },
    {
      number: "04",
      icon: Award,
      title: "4. Comités, Soutenance & Transfert",
      description:
        "Passage et soutenance devant les comités d'architecture (Design Authority), restitution des recommandations à la direction et transfert méthodologique aux équipes internes.",
      deliverable: "Validation en comités & Documentation d'exploitation",
      accent: "border-[#123A35]/30 text-[#123A35]",
      bgAccent: "bg-[#123A35]/10",
    },
  ];

  const currentSteps = activePole === "web" ? webSteps : siSteps;

  return (
    <section className="py-16 md:py-24 bg-background border-t border-border/60 relative overflow-hidden">
      {/* Halo lumineux ambiant */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="container mx-auto px-4">
        
        {/* EN-TÊTE DE SECTION */}
        <div
          ref={headerRef}
          className={`text-center max-w-3xl mx-auto mb-10 space-y-4 scroll-fade-up ${headerVisible ? "is-visible" : ""}`}
        >
          <Badge
            variant="outline"
            className="px-3.5 py-1 text-xs border-primary/30 text-primary font-semibold"
          >
            <Sparkles className="w-3.5 h-3.5 mr-1.5 inline text-primary" />
            Méthodologies Spécialisées
          </Badge>

          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            Comment Nous Travaillons Concrètement
          </h2>

          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
            Un projet web et une mission d'architecture SI n'ont pas les mêmes exigences. Nous appliquons une démarche structurée et adaptée aux enjeux de chaque métier.
          </p>
        </div>

        {/* CADRE POINT DE DÉPART COMMUN (ÉTAPE 0) */}
        <div className="max-w-4xl mx-auto mb-10 p-5 rounded-2xl bg-secondary/40 border border-border/80 flex flex-col sm:flex-row items-center justify-between gap-4 glass-card shadow-xs">
          <div className="flex items-center gap-3 text-left">
            <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Point de départ commun — 30 minutes offertes
              </span>
              <h3 className="text-base sm:text-lg font-bold text-foreground">
                Comprendre Votre Besoin & Vos Contraintes
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Un premier échange direct pour identifier vos objectifs, vos délais et orienter vers la démarche la plus pertinente.
              </p>
            </div>
          </div>

          <Button asChild size="sm" className="shrink-0 gap-1.5 font-bold shadow-xs">
            <Link to="/contact">
              Réserver cet échange <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </Button>
        </div>

        {/* SÉLECTEUR DE DÉMARCHE (ONGLETS INTERACTIFS) */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 rounded-2xl bg-secondary/80 border border-border/80 shadow-xs max-w-md w-full sm:w-auto">
            <button
              onClick={() => {
                setActivePole("web");
                trackConversionEvent("switch_process_tab", { pole: "web" });
              }}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activePole === "web"
                  ? "bg-background text-foreground shadow-sm border border-emerald-500/30"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Smartphone className={`w-4 h-4 ${activePole === "web" ? "text-emerald-500" : ""}`} />
              <span>Projets Web & Applications</span>
            </button>

            <button
              onClick={() => {
                setActivePole("si");
                trackConversionEvent("switch_process_tab", { pole: "si" });
              }}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activePole === "si"
                  ? "bg-background text-foreground shadow-sm border border-[#123A35]/40"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Building2 className={`w-4 h-4 ${activePole === "si" ? "text-[#123A35]" : ""}`} />
              <span>Missions Architecture SI</span>
            </button>
          </div>
        </div>

        {/* 4 ÉTAPES SELON LA DÉMARCHE SÉLECTIONNÉE */}
        <div
          ref={stepsRef}
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 scroll-fade-up ${
            stepsVisible ? "is-visible" : ""
          }`}
        >
          {currentSteps.map((step, index) => {
            const IconComp = step.icon;
            return (
              <div
                key={`${activePole}-${index}`}
                className={`relative flex flex-col justify-between p-6 rounded-2xl bg-card border border-border/80 shadow-xs hover:border-primary/40 transition-all group hover-lift glass-card stagger-${
                  index + 1
                }`}
              >
                {/* Ligne de connexion entre étapes (desktop) */}
                {index < currentSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/3 -right-3 w-6 h-0.5 bg-gradient-to-r from-primary/30 to-transparent z-10" />
                )}

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div
                      className={`p-3 rounded-xl ${step.bgAccent} ${step.accent} transition-colors`}
                    >
                      <IconComp className="w-5 h-5" />
                    </div>
                    <span className="text-2xl font-black text-muted-foreground/30 font-mono">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-foreground leading-snug">
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Badge de livrable tangible */}
                <div className="pt-4 mt-4 border-t border-border/50">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                    Livrable clé :
                  </span>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-foreground bg-secondary/60 px-2.5 py-1.5 rounded-lg border border-border/40">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span className="truncate">{step.deliverable}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* BANDEAU BAS D'ACTION AVEC DOUBLE CTA */}
        <div className="mt-12 text-center max-w-xl mx-auto space-y-3">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg" className="font-bold gap-2 px-6 shadow-md animate-pulse-glow">
              <Link to="/contact">
                <Calendar className="w-4 h-4" /> Réserver un échange de 30 min (Offert)
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="font-semibold">
              <Link to="/contact">
                Décrire mon besoin par écrit →
              </Link>
            </Button>
          </div>
          <p className="text-xs text-muted-foreground font-medium">
            Sans engagement, sans jargon technique et réponse garantie sous 24h ouvrées.
          </p>
        </div>

      </div>
    </section>
  );
};

export default ProcessSection;
