import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Database,
  Code,
  Briefcase,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Headphones,
  Layers,
  Clock,
  Info,
  Users,
  GraduationCap,
  TrendingUp,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import SEO from "@/components/SEO";
import CTASection from "@/components/CTASection";

interface ServiceItem {
  id: string;
  category: string;
  icon: any;
  title: string;
  subtitle: string;
  description: string;
  businessBenefit: string;
  timeframe: string;
  badgeText: string;
  details: string[];
  accent: string;
}

const Services = () => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const navigate = useNavigate();

  const services: ServiceItem[] = [
    {
      id: "conception-web-apps",
      category: "web-apps",
      icon: Code,
      title: "Conception Web, Mobiles & Applications Sur-Mesure",
      subtitle: "Vitrines, E-Commerce Stripe/PayPal & Logiciels Métier",
      description: "Développement de sites internet, boutiques e-commerce, applications web Next.js/React et logiciels de gestion sur-mesure.",
      businessBenefit: "Vous automatisez vos processus et disposez d'une présence web haut de gamme sécurisée générant des opportunités 24h/24.",
      timeframe: "2 à 4 semaines",
      badgeText: "Forfait Clé en Main",
      accent: "border-l-blue-500",
      details: [
        "Sites vitrines professionnels et boutiques e-commerce haute conversion",
        "Applications web modernes Next.js 16 / React 19 et applications mobiles iOS & Android",
        "Paiements sécurisés (Stripe, PayPal, Apple Pay) & configurateurs sur-mesure",
        "Bases de données PostgreSQL relationnelles et API REST / GraphQL sécurisées",
        "Conteneurisation Docker, hébergement cloud et sauvegardes automatiques",
        "Maintenance préventive, corrective et assistance technique dédiée 7j/7"
      ]
    },
    {
      id: "architecture-si",
      category: "architecture-si",
      icon: Layers,
      title: "Architecture des Systèmes d'Information & Urbanisation",
      subtitle: "Cartographie, Trajectoires Cibles & Gouvernance SI",
      description: "Conception, cartographie et optimisation d'architectures cibles alignées avec vos objectifs stratégiques et gouvernance des standards.",
      businessBenefit: "Vous éliminez les doublons applicatifs coûteux, réduisez la dette technique et disposez d'un plan d'évolution clair pour votre SI.",
      timeframe: "Mission régie ou forfait",
      badgeText: "Conseil Stratégique",
      accent: "border-l-indigo-500",
      details: [
        "Conception et optimisation des architectures applicatives et techniques (SI)",
        "Analyse et cartographie complète de l'existant applicatif et des flux SI",
        "Conception d'architectures cibles alignées avec vos objectifs stratégiques",
        "Définition de la trajectoire d'évolution et des plans de transition de SI",
        "Gouvernance et mise en place des standards et règles d'architecture",
        "Conseil stratégique et accompagnement sur les bonnes pratiques d'entreprise"
      ]
    },
    {
      id: "expert-mega-hopex",
      category: "hopex",
      icon: Database,
      title: "Expertise, Administration & Configuration MEGA HOPEX",
      subtitle: "Modélisation, Métamodèles & Tableaux de Bord V5/V2R1",
      description: "Implémentation, configuration avancée et administration globale de la plateforme MEGA HOPEX V5 & V2R1.",
      businessBenefit: "Vous disposez d'un référentiel MEGA HOPEX 100% fiable, automatisé par scripts et parfaitement exploitable par vos équipes.",
      timeframe: "Mission ou accompagnement",
      badgeText: "Expertise V5 Certifiée",
      accent: "border-l-amber-500",
      details: [
        "Implémentation, paramétrage et configuration avancée de MEGA HOPEX",
        "Administration technique et fonctionnelle de la plateforme au quotidien",
        "Optimisation des modèles, des métamodèles et de la qualité du référentiel",
        "Développement de scripts d'automatisation API (VB.Net / VBScript)",
        "Création de tableaux de bord et reporting décisionnels personnalisés",
        "Résolution de problèmes complexes et optimisation des performances"
      ]
    },
    {
      id: "product-owner",
      category: "po-agile",
      icon: Briefcase,
      title: "Product Ownership, Cadrage & Gestion de Projet",
      subtitle: "User Stories, Priorisation du Backlog & Recette",
      description: "Recueil des besoins métiers, rédaction des user stories et priorisation du backlog produit pour une livraison sans accroc.",
      businessBenefit: "Vos fonctionnalités métiers sont traduites sans perte avec des spécifications claires et des livrables validés à chaque étape.",
      timeframe: "Selon le projet",
      badgeText: "Cadrage & Agilité",
      accent: "border-l-rose-500",
      details: [
        "Recueil des besoins métiers et cadrage fonctionnel des projets",
        "Rédaction des User Stories et spécifications fonctionnelles détaillées",
        "Gestion, découpage et priorisation continue du backlog produit",
        "Validation des livrables métiers et acceptance testing (recette)",
        "Coordination et communication fluide avec les équipes de développement",
        "Garantie du respect du périmètre, du budget et du calendrier d'exécution"
      ]
    },
    {
      id: "pilotage-equipe",
      category: "agile",
      icon: Users,
      title: "Pilotage d'Équipe, Facilitation Agile & Mentoring",
      subtitle: "Encadrement, Cérémonies & Supervision Qualité",
      description: "Animation des cérémonies Agiles, constitution et encadrement des équipes projet et supervision de la qualité des livrables.",
      businessBenefit: "Vos équipes gagnent en maturité et en productivité grâce à un pilotage bienveillant et des rituels agiles maîtrisés.",
      timeframe: "Régie ou accompagnement",
      badgeText: "Management Agile",
      accent: "border-l-violet-500",
      details: [
        "Encadrement, animation et coordination des ressources projet",
        "Facilitation et animation des cérémonies Agiles (Sprint Planning, Daily, Retro)",
        "Supervision du travail réalisé et contrôle qualité rigoureux des livrables",
        "Développement des compétences de l'équipe et mentoring technique",
        "Constitution et montée en puissance d'équipes projet performantes",
        "Rapportage régulier et communication transparente avec la direction"
      ]
    },
    {
      id: "formation-transfert",
      category: "formation",
      icon: GraduationCap,
      title: "Formation, Documentation & Prise en Main Utilisateurs",
      subtitle: "Modules Sur-Mesure & Support Opérationnel",
      description: "Conception de programmes de formation personnalisés et transfert de compétences pour une autonomie totale des utilisateurs.",
      businessBenefit: "Vos collaborateurs s'approprient immédiatement les nouveaux outils et méthodologies avec un accompagnement sur-mesure.",
      timeframe: "Forfait formation",
      badgeText: "Transfert & Autonomie",
      accent: "border-l-emerald-500",
      details: [
        "Conception de modules de formation sur-mesure adaptés à chaque profil",
        "Animation de sessions de formation interactives pour les équipes",
        "Création de guides d'utilisation, documentations et fiches réflexes",
        "Accompagnement individuel et personnalisé à la prise en main des outils",
        "Évaluation des acquis, suivi post-formation et plans d'amélioration",
        "Support utilisateur réactif et assistance technique au quotidien"
      ]
    },
    {
      id: "transformation-digitale",
      category: "transformation",
      icon: TrendingUp,
      title: "Conseil en Transformation Digitale & Stratégie SI",
      subtitle: "Maturité Digitale, Alignement Métier & KPIs",
      description: "Accompagnement stratégique et opérationnel dans vos projets de transformation digitale et d'alignement métier.",
      businessBenefit: "Vous sécurisez votre transformation numérique avec une feuille de route claire et des résultats mesurables à chaque étape.",
      timeframe: "Sur-mesure",
      badgeText: "Stratégie & Impact",
      accent: "border-l-teal-500",
      details: [
        "Évaluation de la maturité digitale de votre organisation et audit du SI",
        "Définition de la stratégie de transformation digitale et feuille de route",
        "Alignement parfait des processus métiers et des systèmes d'information",
        "Conduite du changement et accompagnement humain des équipes",
        "Mesure des résultats, définition des KPIs d'efficacité et optimisation",
        "Conseil impartial sur les choix technologiques et outils du marché"
      ]
    }
  ];

  const handleServiceQuote = (serviceTitle: string) => {
    setSelectedService(null);
    navigate("/contact", { state: { selectedService: serviceTitle, scrollToBooking: true } });
  };

  return (
    <>
      <SEO
        title="Services & Accompagnement | RAMSIN - Architecture SI, MEGA HOPEX & Développement Web"
        description="Découvrez nos 7 pôles de prestations : Architecture SI, Expertise MEGA HOPEX, Product Owner, Pilotage d'Équipe, Formation, Transformation Digitale et Création Web/Apps."
      />

      {/* ═══════════════════════════════════════════
          HERO HEADER
      ═══════════════════════════════════════════ */}
      <section className="relative overflow-hidden border-b border-border/60">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px]" />
          <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-emerald-500/8 rounded-full blur-[80px]" />
        </div>

        <div className="container mx-auto px-4 py-16 md:py-24 text-center max-w-4xl space-y-5">
          <Badge variant="outline" className="px-3.5 py-1 text-xs border-primary/30 text-primary font-semibold">
            <Sparkles className="w-3.5 h-3.5 mr-1 inline text-amber-500" /> Offre de Services Transparente & Forfaitaire
          </Badge>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.1]">
            Services &
            <span className="block gradient-text mt-1">Accompagnement Sur-Mesure</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            Chaque prestation est conçue pour apporter une réponse claire, directement rentable et 100% adaptée aux exigences de votre activité.
          </p>

          {/* Badges de Réassurance */}
          <div className="flex flex-wrap justify-center items-center gap-4 text-xs sm:text-sm text-muted-foreground pt-4 font-semibold">
            <span className="flex items-center gap-1.5 bg-card px-3 py-1.5 rounded-full border border-border/80 shadow-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-500" /> Devis Forfaitaire Ferme
            </span>
            <span className="flex items-center gap-1.5 bg-card px-3 py-1.5 rounded-full border border-border/80 shadow-sm">
              <Headphones className="w-4 h-4 text-blue-500" /> Accompagnement 100% Dédié
            </span>
            <span className="flex items-center gap-1.5 bg-card px-3 py-1.5 rounded-full border border-border/80 shadow-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Garantie Post-Livraison Offerte
            </span>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 md:py-16">
        {/* En-tête de section */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Nos 7 Pôles de Prestations
          </h2>
          <p className="text-sm text-muted-foreground font-medium">
            Cliquez sur n'importe quel service ci-dessous pour ouvrir les bénéfices et le périmètre détaillé.
          </p>
        </div>

        {/* ═══════════════════════════════════════════
            GRILLE DE CARTES CENTRÉES
        ═══════════════════════════════════════════ */}
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-6">
            {services.map((service) => {
              const IconComponent = service.icon;

              return (
                <Card
                  key={service.id}
                  onClick={() => setSelectedService(service)}
                  className={`w-full md:w-[calc(50%-16px)] lg:w-[calc(33.333%-16px)] max-w-md flex flex-col border border-border/80 border-l-4 ${service.accent} glass-card rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover-lift hover:shadow-xl group`}
                >
                  <CardHeader className="p-6 pb-3 space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="p-3 bg-primary/10 rounded-2xl text-primary shrink-0 border border-primary/20 group-hover:scale-105 transition-transform">
                        <IconComponent className="h-7 w-7" />
                      </div>
                      <Badge variant="secondary" className="text-[10px] font-bold bg-primary/10 text-primary border-primary/20">
                        {service.badgeText}
                      </Badge>
                    </div>

                    <div className="space-y-1.5">
                      <CardTitle className="text-lg sm:text-xl font-extrabold leading-snug group-hover:text-primary transition-colors">
                        {service.title}
                      </CardTitle>
                      <CardDescription className="text-xs sm:text-sm leading-relaxed text-muted-foreground">
                        {service.description}
                      </CardDescription>
                    </div>
                  </CardHeader>

                  <CardContent className="p-6 pt-2 flex-1 flex flex-col justify-end space-y-4">
                    <div className="flex items-center justify-between text-xs text-muted-foreground font-semibold pt-3 border-t border-border/60">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-primary" /> {service.timeframe}
                      </span>
                      <span className="text-primary font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        Détails & Devis <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          MODAL DÉTAILS DU SERVICE (Shadcn Dialog)
      ═══════════════════════════════════════════ */}
      <Dialog open={!!selectedService} onOpenChange={(open) => !open && setSelectedService(null)}>
        {selectedService && (
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0 rounded-2xl border-2 border-primary/20 bg-background shadow-2xl">
            {/* En-tête du Modal */}
            <DialogHeader className="p-6 sm:p-7 pb-4 border-b border-border/60 bg-gradient-to-r from-primary/5 via-transparent to-transparent space-y-2">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary/10 rounded-2xl text-primary shrink-0 border border-primary/20">
                  {(() => {
                    const IconComponent = selectedService.icon;
                    return <IconComponent className="h-7 w-7 text-primary" />;
                  })()}
                </div>
                <div>
                  <Badge variant="secondary" className="text-xs font-bold bg-primary/10 text-primary border-primary/20 mb-1">
                    {selectedService.badgeText}
                  </Badge>
                  <DialogTitle className="text-xl sm:text-2xl font-extrabold text-foreground">
                    {selectedService.title}
                  </DialogTitle>
                </div>
              </div>
              <DialogDescription className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {selectedService.subtitle} — <span className="font-bold text-primary">{selectedService.timeframe}</span>
              </DialogDescription>
            </DialogHeader>

            <div className="p-6 sm:p-7 space-y-5">
              {/* Encadré Bénéfice Métier */}
              <div className="bg-emerald-100 dark:bg-emerald-500/15 border-2 border-emerald-300 dark:border-emerald-500/30 p-4 sm:p-5 rounded-2xl space-y-1.5">
                <h4 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
                  <Sparkles className="w-4 h-4 text-emerald-500 shrink-0" /> Ce que cela vous apporte concrètement :
                </h4>
                <p className="text-sm sm:text-base font-medium leading-relaxed text-emerald-950 dark:text-emerald-100">
                  {selectedService.businessBenefit}
                </p>
              </div>

              {/* Périmètre & Actions Incluses */}
              <div className="space-y-3">
                <h4 className="text-sm sm:text-base font-bold text-foreground flex items-center gap-2">
                  <Layers className="w-4 h-4 text-primary" /> Périmètre & Actions Incluses dans cette prestation :
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedService.details.map((detail, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-muted-foreground bg-secondary/40 p-3 rounded-xl border border-border/40">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="font-medium text-foreground leading-relaxed">{detail}</span>
                    </div>
                  ))}
                  {/* Element d'ouverture "De A à Z & Sur-Mesure" */}
                  <div className="flex items-start gap-2.5 text-xs sm:text-sm text-primary bg-primary/10 p-3 rounded-xl border border-primary/30 col-span-1 sm:col-span-2">
                    <Sparkles className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                    <span className="font-bold text-foreground leading-relaxed">
                      + Autres services & intégrations sur-mesure incluses : Prise en charge intégrale de A à Z selon vos besoins.
                    </span>
                  </div>
                </div>
              </div>

              {/* Bouton d'action Devis */}
              <div className="pt-4 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs sm:text-sm text-muted-foreground flex items-center gap-1.5 font-medium">
                  <Info className="w-4 h-4 text-primary shrink-0" />
                  <span>Premier échange offert de 30 minutes sans engagement.</span>
                </div>
                <Button
                  onClick={() => handleServiceQuote(selectedService.title)}
                  size="lg"
                  className="w-full sm:w-auto font-extrabold shadow-md cursor-pointer gap-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl px-6"
                >
                  Demander un devis pour ce service <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>

      {/* CTA Bas de Page */}
      <CTASection
        title="Vous hésitez sur la prestation adaptée à votre projet ?"
        subtitle="Discutons-en simplement lors d'un premier échange offert de 30 minutes sans aucun engagement."
      />
    </>
  );
};

export default Services;
