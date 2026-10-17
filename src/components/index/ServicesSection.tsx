import { Building2, Smartphone, Layers, Database, Code2, Sparkles, ArrowRight, CheckCircle2, Lock, FileText } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export const ServicesSection = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollAnimation();

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-transparent via-secondary/15 to-transparent">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* En-tête de section */}
        <div
          ref={headerRef}
          className={`text-center max-w-3xl mx-auto mb-14 scroll-fade-up ${headerVisible ? "is-visible" : ""}`}
        >
          <Badge variant="outline" className="mb-3 px-3.5 py-1 text-xs border-primary/30 text-primary font-semibold">
            <Sparkles className="w-3.5 h-3.5 mr-1 inline text-amber-500" /> Nos 2 Pôles d'Excellence
          </Badge>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
            Deux Expertises Dédiées à Vos Enjeux
          </h2>
          <p className="text-muted-foreground text-lg sm:text-xl leading-relaxed">
            Que vous cherchiez à rationaliser l'architecture de votre Système d'Information ou à lancer une application sur-mesure, découvrez nos offres clé en main.
          </p>
        </div>

        {/* Grille des 2 Pôles Structurés */}
        <div
          ref={cardsRef}
          className={`grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 scroll-fade-up ${cardsVisible ? "is-visible" : ""}`}
        >
          {/* PÔLE A : ARCHITECTURE SI & MEGA HOPEX */}
          <Card className="flex flex-col border-2 border-[#123A35]/25 hover:border-[#123A35] transition-all hover:shadow-[0_25px_60px_-15px_rgba(18,58,53,0.18)] bg-white rounded-3xl overflow-hidden hover-lift">
            <div className="h-1.5 bg-gradient-to-r from-[#123A35] via-[#1c554e] to-[#0a2320]" />
            <CardHeader className="pb-4 space-y-3 p-6 sm:p-8">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#123A35] to-[#081a17] text-[#C7F36B] flex items-center justify-center shrink-0 shadow-md shadow-[#123A35]/20">
                  <Building2 className="w-5 h-5 shrink-0" />
                </div>
                <Badge variant="secondary" className="bg-[#123A35]/10 text-[#123A35] text-xs font-bold border border-[#123A35]/20 px-3 py-1">
                  Pour DSI & Dir. Transformation
                </Badge>
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#123A35] block">
                  Conseil Stratégique & Opérationnel
                </span>
                <CardTitle className="text-2xl font-bold mt-1 text-foreground">
                  Architecture des SI & MEGA HOPEX
                </CardTitle>
              </div>

              <CardDescription className="text-sm text-muted-foreground leading-relaxed">
                Cartographie, urbanisation, rédaction des Dossiers d'Architecture Technique (DAT) et administration avancée de la plateforme MEGA HOPEX V5.
              </CardDescription>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col justify-between space-y-6 pt-0 p-6 sm:p-8">
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">
                  Missions & Livrables Concrets :
                </span>
                <div className="space-y-2.5">
                  {[
                    "Cartographie applicative interactive & matrice des flux d'échanges",
                    "Configuration métamodèle & scripts d'automatisation MEGA HOPEX V5",
                    "Dossiers d'Architecture Technique (DAT) pour comités d'architecture",
                    "Trajectoires cibles, urbanisation et accompagnement Product Owner SI",
                  ].map((sub, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm font-medium text-foreground bg-secondary/40 hover:bg-secondary/70 transition-colors p-3 rounded-xl border border-border/50">
                      <CheckCircle2 className="w-4 h-4 text-[#123A35] shrink-0 mt-0.5" />
                      <span>{sub}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-5 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-3">
                <Button asChild size="sm" className="w-full sm:w-auto bg-[#123A35] hover:bg-[#0a221f] text-white font-bold rounded-xl gap-2 shadow-sm px-5 py-2.5">
                  <Link to="/services?pole=si">
                    Découvrir l'offre Architecture SI <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </Button>
                <Link
                  to="/contact?service=si"
                  className="text-xs font-bold text-muted-foreground hover:text-[#123A35] inline-flex items-center gap-1 transition-colors"
                >
                  Discuter d'une mission →
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* PÔLE B : DÉVELOPPEMENT WEB & APPLICATIONS SUR-MESURE */}
          <Card className="flex flex-col border-2 border-emerald-500/25 hover:border-emerald-600 transition-all hover:shadow-[0_25px_60px_-15px_rgba(16,185,129,0.18)] bg-white rounded-3xl overflow-hidden hover-lift">
            <div className="h-1.5 bg-gradient-to-r from-emerald-600 via-[#C7F36B] to-teal-500" />
            <CardHeader className="pb-4 space-y-3 p-6 sm:p-8">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#C7F36B] to-[#9ee83a] text-[#071816] flex items-center justify-center shrink-0 shadow-md shadow-[#C7F36B]/30">
                  <Smartphone className="w-5 h-5 shrink-0" />
                </div>
                <Badge variant="secondary" className="bg-emerald-500/15 text-emerald-800 text-xs font-bold border border-emerald-500/25 px-3 py-1">
                  Pour Porteurs de Projet & Entreprises
                </Badge>
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block">
                  Solutions Numériques Clé en Main
                </span>
                <CardTitle className="text-2xl font-bold mt-1 text-foreground">
                  Web & Applications Sur-Mesure
                </CardTitle>
              </div>

              <CardDescription className="text-sm text-muted-foreground leading-relaxed">
                Conception d'applications web scalables (Next.js/React), d'applications mobiles iOS & Android et de plateformes métier haute conversion.
              </CardDescription>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col justify-between space-y-6 pt-0 p-6 sm:p-8">
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">
                  Types de Réalisations & Engagements :
                </span>
                <div className="space-y-2.5">
                  {[
                    "Applications Web & SaaS Métier (tableaux de bord, espaces clients)",
                    "Applications Mobiles Cross-Platform (iOS & Android avec React Native)",
                    "Propriété intégrale de votre projet (code source et livrables cédés)",
                    "Garantie 30 jours incluse, hébergement souverain et support réactif",
                  ].map((sub, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm font-medium text-foreground bg-secondary/40 hover:bg-secondary/70 transition-colors p-3 rounded-xl border border-border/50">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{sub}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-5 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-3">
                <Button asChild size="sm" variant="lime" className="w-full sm:w-auto font-extrabold rounded-xl gap-2 shadow-sm px-5 py-2.5">
                  <Link to="/services?pole=web">
                    Découvrir l'offre Web & Mobile <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </Button>
                <Link
                  to="/contact?service=web"
                  className="text-xs font-bold text-muted-foreground hover:text-emerald-700 inline-flex items-center gap-1 transition-colors"
                >
                  Présenter mon projet →
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bandeau de Réassurance Bas de Section */}
        <div className="text-center pt-2">
          <Link
            to="/services"
            className="text-sm font-bold text-primary hover:underline inline-flex items-center gap-1.5"
          >
            Comparer en détail l'ensemble de nos méthodologies et livrables d'intervention <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;
