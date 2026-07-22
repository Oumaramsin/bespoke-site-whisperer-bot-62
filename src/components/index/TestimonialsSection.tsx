import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Quote, Award } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      author: "Gérant",
      company: "L'Éclat du Chef",
      role: "Traiteur Événementiel Île-de-France",
      stars: 5,
      content: "RAMSIN Conseil a su traduire nos besoins en un site vitrine élégant et ultra-efficace. Les demandes de devis arrivent directement sur notre boîte e-mail. Tout nous a été expliqué simplement et la formation m'a rendu 100% autonome."
    },
    {
      author: "Équipe Projet",
      company: "Maison HamdiWaShukri",
      role: "Boutique E-Commerce Luxe",
      stars: 5,
      content: "Le configurateur sur-mesure et le paiement Stripe/PayPal fonctionnent à la perfection. RAMSIN est d'une grande rigueur, très pédagogue et réactif. Un vrai plaisir de collaborer en toute confiance."
    },
    {
      author: "Responsable DSI",
      company: "Projets Cartographie SI",
      role: "Architecture d'Entreprise MEGA HOPEX",
      stars: 5,
      content: "Excellente maîtrise de la plateforme MEGA HOPEX V5 et de la cartographie des flux applicatifs. RAMSIN Conseil sécurise les documentations et apporte une vision claire et structurée auprès des équipes."
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-card border-t border-border/60">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <Badge variant="outline" className="px-3.5 py-1 text-xs border-primary/30 text-primary font-semibold">
            <Award className="w-3.5 h-3.5 mr-1 inline" /> Confiance & Satisfaction
          </Badge>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            Ce Que Disent Nos Clients
          </h2>
          <p className="text-muted-foreground text-lg sm:text-xl leading-relaxed">
            La sérénité d'un accompagnement clair, ponctuel et orienté satisfaction globale.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((t, index) => (
            <Card key={index} className="flex flex-col border border-border/80 shadow-xs hover:border-primary/40 transition-all hover-lift bg-background">
              <CardContent className="pt-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex text-amber-400">
                      {[...Array(t.stars)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    <Quote className="w-6 h-6 text-primary/20" />
                  </div>
                  <p className="text-xs sm:text-sm text-foreground italic leading-relaxed">
                    "{t.content}"
                  </p>
                </div>

                <div className="pt-3 border-t border-border/60">
                  <h4 className="font-bold text-sm text-foreground">{t.author} - <span className="text-primary">{t.company}</span></h4>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
