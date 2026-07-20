import { Database, Code, Briefcase, ShoppingBag, ArrowRight, Sparkles } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const ServicesSection = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollAnimation();

  const solutions = [
    {
      icon: Code,
      title: "Application & Plateforme Web Sur-Mesure",
      subtitle: "Développement de A à Z & Scalabilité",
      description: "Conception et développement d'applications web robustes (ex: Dabari) intégrant des espaces membres, API et tableaux de bord.",
      tags: ["Next.js 16/15", "React 19", "Node.js & Express", "PostgreSQL & Prisma", "Docker"],
      link: "/projects"
    },
    {
      icon: Database,
      title: "Architecture SI & Refonte d'Existant",
      subtitle: "Cartographie & Modernisation",
      description: "Audit du SI existant, cartographie sur MEGA HOPEX V5, élimination de la dette technique et rédaction des DAT pour les DSI.",
      tags: ["MEGA HOPEX V5", "Dossier DAT", "Design Authority", "Cartographie Applicative"],
      link: "/services"
    },
    {
      icon: ShoppingBag,
      title: "Sites Vitrines & Boutique E-Commerce",
      subtitle: "Conversion & Génération de Leads",
      description: "Création de sites vitrines générateurs de prospects (ex: L'Éclat du Chef) et de boutiques de luxe (ex: Maison HamdiWaShukri).",
      tags: ["Formspree API", "Stripe & PayPal", "Configurateur Sur-Mesure", "Mobile-First"],
      link: "/projects"
    },
    {
      icon: Briefcase,
      title: "Pilotage & Expertise Agile / Product Owner",
      subtitle: "Cadrage Fonctionnel & Suivi de A à Z",
      description: "Recueil des besoins métiers, découpage en User Stories, animation des cérémonies Agiles et garantie de livraison dans les temps.",
      tags: ["Product Owner", "Scrum / Agile", "Gestion de Backlog", "Cadrage Fonctionnel"],
      link: "/services"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-transparent via-secondary/15 to-transparent">
      <div className="container mx-auto px-4">
        <div ref={headerRef} className={`text-center max-w-3xl mx-auto mb-14 scroll-fade-up ${headerVisible ? "is-visible" : ""}`}>
          <Badge variant="outline" className="mb-3 px-3.5 py-1 text-xs border-primary/30 text-primary font-semibold">
            <Sparkles className="w-3.5 h-3.5 mr-1 inline" /> Offres & Solutions
          </Badge>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
            Vos Besoins / Mes Solutions
          </h2>
          <p className="text-muted-foreground text-lg sm:text-xl">
            Une réponse claire et sur-mesure adaptée aux exigences des DSI comme aux projets des entreprises en croissance.
          </p>
        </div>

        <div ref={cardsRef} className={`grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 scroll-fade-up ${cardsVisible ? "is-visible" : ""}`}>
          {solutions.map((item, index) => {
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
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {item.tags.map((tag, i) => (
                      <span key={i} className="text-xs bg-secondary text-secondary-foreground px-2.5 py-1 rounded-md font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="pt-3 border-t border-border/60">
                    <Link
                      to={item.link}
                      className="text-xs font-bold text-primary hover:underline inline-flex items-center gap-1.5"
                    >
                      En savoir plus sur cette solution <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center pt-4">
          <Button asChild size="lg" variant="outline" className="gap-2 px-8 font-semibold hover-lift">
            <Link to="/services">
              Consulter l'ensemble des prestations <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
