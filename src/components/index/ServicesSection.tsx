import { Database, Code, Briefcase, ShoppingBag, Smartphone, Wrench, ArrowRight, Sparkles } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export const ServicesSection = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollAnimation();

  const services = [
    {
      icon: Code,
      title: "Développement de Sites Web Professionnels",
      subtitle: "Vitrine, E-Commerce & Refonte",
      description: "Création de sites vitrines modernes, boutiques e-commerce haute conversion, portails d'entreprise et refonte complète de sites existants.",
      items: ["Site Vitrine Pro", "Boutique E-Commerce (Stripe/PayPal)", "Portail d'Entreprise", "Refonte & Modernisation"],
      link: "/projects"
    },
    {
      icon: Smartphone,
      title: "Développement d'Applications & Logiciels",
      subtitle: "Web, Mobile iOS & Android, sur-mesure",
      description: "Conception d'applications web scalables (Next.js/React), d'applications mobiles intuitives et de logiciels de gestion métier sur-mesure.",
      items: ["Applications Web (Next.js / Node)", "Applications Mobiles (iOS & Android)", "Logiciels de Gestion Métier", "Espaces Membres & API"],
      link: "/projects"
    },
    {
      icon: Wrench,
      title: "Maintenance, Support & Hébergement",
      subtitle: "Sérénité Technique & Sauvegardes",
      description: "Prise en charge intégrale de la sécurité de vos outils : mises à jour régulières, correction de bugs, hébergement haute disponibilité et assistance.",
      items: ["Mises à jour Sites & Apps", "Correction de Bugs & Optimisation", "Hébergement & Sauvegardes", "Assistance Technique 7j/7"],
      link: "/projects"
    },
    {
      icon: Database,
      title: "Architecture SI & Conseil Hopex",
      subtitle: "Cartographie & Gouvernance",
      description: "Accompagnement des DSI et entreprises dans l'urbanisation des Systèmes d'Information, cartographie sur MEGA HOPEX V5 et rédaction des DAT.",
      items: ["Expertise MEGA HOPEX V5", "Dossier d'Architecture DAT", "Cartographie Applicative", "Design Authority"],
      link: "/projects"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-transparent via-secondary/15 to-transparent">
      <div className="container mx-auto px-4">
        <div ref={headerRef} className={`text-center max-w-3xl mx-auto mb-14 scroll-fade-up ${headerVisible ? "is-visible" : ""}`}>
          <Badge variant="outline" className="mb-3 px-3.5 py-1 text-xs border-primary/30 text-primary font-semibold">
            <Sparkles className="w-3.5 h-3.5 mr-1 inline text-amber-500" /> Nos Services & Solutions
          </Badge>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
            Des Solutions Digitales Adaptées à Vos Besoins
          </h2>
          <p className="text-muted-foreground text-lg sm:text-xl leading-relaxed">
            De la création de votre site vitrine jusqu'à l'architecture complexe de votre Système d'Information, nous concrétisons vos idées avec précision.
          </p>
        </div>

        <div ref={cardsRef} className={`grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 scroll-fade-up ${cardsVisible ? "is-visible" : ""}`}>
          {services.map((item, index) => {
            const IconComp = item.icon;
            return (
              <Card key={index} className={`flex flex-col border border-border/80 hover:border-primary/50 transition-all hover:shadow-md bg-card hover-lift stagger-${index + 1}`}>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-3 bg-primary/10 rounded-xl text-primary">
                      <IconComp className="h-6 w-6" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-primary uppercase tracking-wider block">
                        {item.subtitle}
                      </span>
                      <CardTitle className="text-xl font-bold">{item.title}</CardTitle>
                    </div>
                  </div>
                  <CardDescription className="text-sm text-muted-foreground mt-2 leading-relaxed">
                    {item.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-between pt-0 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                    {item.items.map((sub, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs font-medium text-foreground bg-secondary/60 p-2 rounded-lg">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                        <span>{sub}</span>
                      </div>
                    ))}
                  </div>
                  <div className="pt-3 border-t border-border/60">
                    <Link
                      to={item.link}
                      className="text-xs font-bold text-primary hover:underline inline-flex items-center gap-1.5"
                    >
                      Découvrir nos réalisations dans ce domaine <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
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

export default ServicesSection;
