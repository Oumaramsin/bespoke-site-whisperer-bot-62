import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Database, Code, Briefcase, BookOpen, ArrowRight, ShoppingBag, Sparkles, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import CTASection from "@/components/CTASection";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface ServiceDetailProps {
  icon: any;
  title: string;
  subtitle: string;
  description: string;
  businessBenefit: string;
  details: string[];
  index: number;
}

const ServiceDetail = ({ icon: Icon, title, subtitle, description, businessBenefit, details, index }: ServiceDetailProps) => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div ref={ref} className={`scroll-fade-up ${isVisible ? "is-visible" : ""}`}>
      <Card className="mb-8 border border-border/80 hover:border-primary/40 transition-all shadow-xs hover-lift">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-xl text-primary shrink-0">
                <Icon className="h-8 w-8 text-primary" />
              </div>
              <div>
                <Badge variant="outline" className="text-xs font-semibold border-primary/30 text-primary mb-1">
                  {subtitle}
                </Badge>
                <CardTitle className="text-2xl font-bold">{title}</CardTitle>
                <CardDescription className="text-base mt-1">{description}</CardDescription>
              </div>
            </div>
            <Button asChild size="sm" className="shrink-0 gap-1.5 font-semibold">
              <Link to="/contact">
                Demander un devis <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Bénéfice Concret pour le Client Non-Technique */}
          <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-xl text-emerald-950 dark:text-emerald-300">
            <h4 className="text-xs font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400">
              <Sparkles className="w-4 h-4" /> Ce que cela vous apporte concrètement :
            </h4>
            <p className="text-sm font-medium leading-relaxed">{businessBenefit}</p>
          </div>

          {/* Détails de l'accompagnement */}
          <div className="space-y-2.5">
            <h4 className="text-sm font-semibold text-foreground">Détail des actions menées :</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {details.map((detail, i) => (
                <div key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <span>{detail}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const Services = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();

  const services = [
    {
      icon: Code,
      title: "Création d'Applications Web & Sites Sur-Mesure",
      subtitle: "Développement Web & E-Commerce",
      description: "Conception et réalisation de votre site internet, boutique e-commerce ou plateforme métier clé en main.",
      businessBenefit: "Vous obtenez une vitrine professionnelle captivante et performante (comme L'Éclat du Chef, Dabari ou Maison HamdiWaShukri) qui attire de nouveaux clients 24h/24 sans aucune gestion technique compliquée de votre part.",
      details: [
        "Création de sites vitrines haut de gamme et captation de prospects",
        "Développement de boutiques e-commerce avec paiement sécurisé (Stripe, PayPal)",
        "Configurateurs interactifs sur-mesure et espaces clients réservés",
        "Formulaires intelligents connectés directement à votre boîte email",
        "Formation personnalisée pour gérer votre site facilement en autonomie"
      ]
    },
    {
      icon: Database,
      title: "Architecture & Cartographie des SI",
      subtitle: "Organisation & Simplification Informatique",
      description: "Organisation, simplification et sécurisation de l'ensemble des logiciels et flux de données de votre entreprise.",
      businessBenefit: "Vous évitez les doublons de logiciels coûteux, éliminez les risques d'incidents informatiques et disposez d'une vision claire de votre système pour prendre les bonnes décisions.",
      details: [
        "Inventaire et cartographie complète de l'ensemble de vos logiciels et flux",
        "Définition de l'architecture cible simplifiée et sécurisée",
        "Rédaction des dossiers d'architecture (DAT) pour guider les équipes",
        "Sécurisation des échanges de données sensibles et de la conformité",
        "Accompagnement et conseil continu pour la DSI et la direction"
      ]
    },
    {
      icon: ShoppingBag,
      title: "Expertise & Administration MEGA HOPEX V5",
      subtitle: "Outil de Référentiel DSI",
      description: "Implémentation, configuration et optimisation de la plateforme de cartographie MEGA HOPEX.",
      businessBenefit: "Vous exploitez enfin tout le potentiel de MEGA HOPEX grâce à un référentiel propre, sans incohérences et générant des rapports clairs pour votre direction.",
      details: [
        "Configuration et personnalisation avancée des métamodèles Hopex V5 & V2R1",
        "Migration d'anciennes versions et portage des données sans perte",
        "Développement de scripts d'automatisation API (VB.Net & VBScript)",
        "Création de tableaux de bord et rapports de qualité automatique",
        "Support technique, fonctionnel et formation des utilisateurs"
      ]
    },
    {
      icon: Briefcase,
      title: "Product Ownership & Coordination Projet",
      subtitle: "Gestion de Projet & Méthode Agile",
      description: "Pilotage de vos projets informatiques de l'idée initiale jusqu'à la livraison finale.",
      businessBenefit: "Votre projet est livré dans les temps et selon votre budget. Nous faisons le pont entre vos besoins métiers et les techniciens sans perte d'information.",
      details: [
        "Recueil des besoins métiers et rédaction des spécifications claires",
        "Découpage du projet en étapes (Sprints) et gestion du backlog",
        "Coordination des développeurs et suivi de l'avancement",
        "Recette et vérification de la qualité des livrables avant mise en ligne",
        "Communication régulière et reporting transparent sans jargon"
      ]
    },
    {
      icon: BookOpen,
      title: "Formation & Prise en Main Accompagnée",
      subtitle: "Transfert de Compétences",
      description: "Sessions de formation sur-mesure pour vous et vos collaborateurs.",
      businessBenefit: "Vos équipes prennent en main rapidement les nouveaux outils déployés et deviennent autonomes dès le premier jour.",
      details: [
        "Conception de guides utilisateurs visuels et simples à suivre",
        "Sessions de formation individuelles ou en petits groupes",
        "Assistance post-livraison pour répondre à toutes vos questions",
        "Évolution et ajustements en fonction de vos retours d'utilisation"
      ]
    }
  ];

  return (
    <>
      <SEO
        title="Services & Accompagnement | RAMSIN - Architecture SI & Création Web"
        description="Découvrez nos prestations adaptées aux besoins des entreprises : création web sur-mesure, e-commerce, architecture SI, MEGA HOPEX V5 et Product Ownership."
      />
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div ref={headerRef} className={`max-w-4xl mx-auto mb-16 text-center scroll-fade-up ${headerVisible ? "is-visible" : ""}`}>
          <Badge variant="outline" className="mb-3 px-3.5 py-1 text-xs border-primary/30 text-primary font-semibold">
            Offre de Services Transparente
          </Badge>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
            Services & Accompagnement Sur-Mesure
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Chaque prestation est pensée pour vous apporter une solution concrète, simple et directement rentable pour votre activité.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {services.map((service, index) => (
            <ServiceDetail
              key={index}
              index={index}
              icon={service.icon}
              title={service.title}
              subtitle={service.subtitle}
              description={service.description}
              businessBenefit={service.businessBenefit}
              details={service.details}
            />
          ))}
        </div>
      </div>

      {/* CTA Bas de Page en Pleine Largeur (Full Width) */}
      <CTASection
        title="Vous hésitez sur la prestation adaptée à votre besoin ?"
        subtitle="Discutons-en simplement lors d'un échange offert de 30 minutes. Nous évaluerons votre besoin ensemble."
      />
    </>
  );
};

export default Services;
