import { CheckCircle2, ShieldCheck, Cpu, Coins, Headphones, Target, TrendingUp, Users, Sparkles, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export const WhyChooseUsSection = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: benefitsRef, isVisible: benefitsVisible } = useScrollAnimation();
  const { ref: goalsRef, isVisible: goalsVisible } = useScrollAnimation();

  const benefits = [
    {
      icon: Target,
      title: "Solutions 100% Sur-Mesure",
      description: "Chaque projet web ou applicatif est développé sur-mesure pour répondre exactement aux exigences et aux processus de votre activité."
    },
    {
      icon: CheckCircle2,
      title: "Accompagnement de A à Z",
      description: "Un partenaire unique de la phase de cadrage et de design jusqu'à la mise en ligne officielle et la prise en main par vos équipes."
    },
    {
      icon: Cpu,
      title: "Technologies Modernes & Sécurisées",
      description: "Développement basé sur les meilleurs standards du marché (Next.js, React, Node.js, Docker) garantissant rapidité et sécurité."
    },
    {
      icon: Coins,
      title: "Tarifs Compétitifs & Forfaitaires",
      description: "Des devis clairs, forfaitaires et transparents. Aucun frais caché ni surcoût en cours de réalisation."
    },
    {
      icon: Headphones,
      title: "Support Réactif & Maintenance",
      description: "Un suivi technique continu : mises à jour régulières, sauvegardes automatiques, correction de bugs et assistance sous 24h."
    }
  ];

  const goals = [
    {
      icon: TrendingUp,
      title: "Gagner en Visibilité",
      desc: "Positionnez votre entreprise en tête des recherches et valorisez votre image de marque auprès de votre audience."
    },
    {
      icon: Users,
      title: "Attirer Plus de Clients",
      desc: "Transformez vos visiteurs en clients engagés grâce à un parcours utilisateur (UX/UI) fluide et persuasif."
    },
    {
      icon: ShieldCheck,
      title: "Booster Votre Productivité",
      desc: "Simplifiez votre gestion quotidienne grâce à des outils web et logiciels métier automatisés et fiables."
    }
  ];

  const scrollToReservation = () => {
    const el = document.getElementById("reservation-calendrier");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background via-primary/5 to-background border-t border-border/60 relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* En-tête de la section */}
        <div ref={headerRef} className={`text-center max-w-3xl mx-auto mb-16 space-y-4 scroll-fade-up ${headerVisible ? "is-visible" : ""}`}>
          <Badge variant="outline" className="px-3.5 py-1 text-xs border-primary/30 text-primary font-semibold">
            <Sparkles className="w-3.5 h-3.5 mr-1 inline text-amber-500" /> Votre Partenaire Digital
          </Badge>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            Notre Engagement pour Votre Croissance
          </h2>
          <p className="text-muted-foreground text-lg sm:text-xl leading-relaxed">
            Nous accompagnons les entreprises, commerces, associations et entrepreneurs dans la création de solutions numériques modernes, performantes et adaptées à leurs besoins.
          </p>
        </div>

        {/* 1. Les 3 Objectifs Majeurs pour Votre Entreprise */}
        <div ref={goalsRef} className={`grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 scroll-fade-up ${goalsVisible ? "is-visible" : ""}`}>
          {goals.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <Card key={idx} className="border-2 border-primary/20 bg-gradient-to-b from-card to-primary/5 hover:border-primary/50 transition-all hover-lift">
                <CardHeader className="pb-3 text-center sm:text-left">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-3 mx-auto sm:mx-0">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-xl font-bold">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* 2. Les 5 Piliers d'Accompagnement */}
        <div ref={benefitsRef} className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 scroll-fade-up ${benefitsVisible ? "is-visible" : ""}`}>
          {benefits.map((b, index) => {
            const IconComponent = b.icon;
            return (
              <Card key={index} className="border border-border/80 hover:border-primary/40 transition-all hover-lift glass-card">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-primary/10 text-primary shrink-0">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <CardTitle className="text-lg font-bold">{b.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm text-muted-foreground leading-relaxed">
                    {b.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}

          {/* Carte CTA Intégrée */}
          <Card className="border-2 border-dashed border-primary/30 bg-primary/5 flex flex-col justify-center items-center text-center p-6 hover:border-primary/60 transition-all">
            <h3 className="font-bold text-lg mb-2">Prêt à donner vie à votre projet ?</h3>
            <p className="text-xs text-muted-foreground mb-4">
              Discutons de vos besoins lors d'un premier échange offert de 30 minutes sans engagement.
            </p>
            <Button onClick={scrollToReservation} size="sm" className="gap-2 font-bold cursor-pointer">
              Réserver mon échange <ArrowRight className="w-4 h-4" />
            </Button>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
