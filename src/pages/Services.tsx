import { useState, useEffect } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Building2,
  Smartphone,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Layers,
  FileText,
  Compass,
  Lock,
  Code2,
  Clock,
  Sparkles,
  Award,
  ChevronRight,
  Workflow,
  HelpCircle,
  Database,
  Phone,
} from "lucide-react";
import SEO from "@/components/SEO";
import CTASection from "@/components/CTASection";
import { trackConversionEvent } from "@/lib/analytics";

type ServicePole = "si" | "web";

export const Services = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Initialisation du pôle selon l'URL (?pole=si ou ?pole=web, défaut : web)
  const poleParam = searchParams.get("pole");
  const [activePole, setActivePole] = useState<ServicePole>(
    poleParam === "si" ? "si" : "web"
  );

  useEffect(() => {
    if (poleParam === "web" || poleParam === "si") {
      setActivePole(poleParam);
    }
  }, [poleParam]);

  const switchPole = (pole: ServicePole) => {
    trackConversionEvent("select_pole", { pole, source: "services_tabs" });
    setActivePole(pole);
    setSearchParams({ pole });
    window.scrollTo({ top: 320, behavior: "smooth" });
  };

  const handleBookingRedirect = () => {
    trackConversionEvent("click_booking_calendly", { source: "services_page" });
    navigate("/contact", { state: { scrollToBooking: true } });
  };

  return (
    <>
      <SEO
        title="Services & Expertises | RAMSIN - Architecture SI & Développement Web Sur-Mesure"
        description="Découvrez nos deux pôles d'excellence : Conception d'applications web & mobiles sur-mesure pour tout porteur de projet et entreprise, et Conseil & Architecture SI (MEGA HOPEX V5) pour DSI."
        canonical="https://www.ramsin.fr/services"
      />

      {/* ═══════════════════════════════════════════
          HERO HEADER DES SERVICES
      ═══════════════════════════════════════════ */}
      <section className="relative overflow-hidden border-b border-border/60 pt-12 pb-16 md:pt-18 md:pb-22">
        <div className="absolute inset-0 -z-10 dot-grid-pattern pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-[350px] bg-gradient-to-r from-[#123A35]/10 via-[#C7F36B]/15 to-[#123A35]/10 rounded-full blur-[100px] -z-10 pointer-events-none" />

        <div className="container mx-auto px-4 text-center max-w-4xl space-y-6">
          <Badge variant="outline" className="px-3.5 py-1 text-xs border-primary/30 text-primary font-semibold">
            <Sparkles className="w-3.5 h-3.5 mr-1 inline text-amber-500" /> Deux Pôles d'Excellence Dédiés
          </Badge>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.15]">
            Des Expertises Spécialisées.
            <span className="block gradient-text mt-1">Des Livrables Clairs & Tangibles.</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-muted-foreground font-normal max-w-3xl mx-auto leading-relaxed">
            Pour répondre précisément à vos enjeux, RAMSIN structure ses prestations autour de deux parcours indépendants. Choisissez le domaine correspondant à votre besoin :
          </p>

          {/* SÉLECTEUR DE PÔLE COMMERCIAL (SWITCHER CLÉ : Web à Gauche par Défaut) */}
          <div className="pt-4 flex justify-center">
            <div className="p-1.5 rounded-2xl glass-card border border-border/80 inline-flex flex-col sm:flex-row gap-2 max-w-full shadow-lg">
              <button
                onClick={() => switchPole("web")}
                className={`flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-sm sm:text-base transition-all cursor-pointer ${
                  activePole === "web"
                    ? "bg-emerald-600 text-white shadow-md scale-[1.02]"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                }`}
              >
                <Smartphone className="w-5 h-5 shrink-0" />
                <span>Web & Applications Sur-Mesure</span>
                <span className="hidden md:inline text-[11px] opacity-90 px-2 py-0.5 rounded-full bg-white/20">
                  Porteurs de Projet & Entreprises
                </span>
              </button>

              <button
                onClick={() => switchPole("si")}
                className={`flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-sm sm:text-base transition-all cursor-pointer ${
                  activePole === "si"
                    ? "bg-[#123A35] text-white shadow-md scale-[1.02]"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                }`}
              >
                <Building2 className="w-5 h-5 shrink-0" />
                <span>Architecture SI & MEGA HOPEX</span>
                <span className="hidden md:inline text-[11px] opacity-90 px-2 py-0.5 rounded-full bg-white/20">
                  DSI & Transformation
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 1 : PÔLE WEB & APPLICATIONS SUR-MESURE
      ═══════════════════════════════════════════ */}
      {activePole === "web" && (
        <div className="animate-fade-in space-y-16 md:space-y-24 py-12 md:py-20">
          
          {/* BANDEAU EN-TÊTE DU PÔLE WEB */}
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#0c2420] via-[#15463f] to-[#0d2e29] text-white border-2 border-emerald-500/30 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#C7F36B]/10 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10 max-w-3xl space-y-4">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#C7F36B] bg-[#C7F36B]/15 border border-[#C7F36B]/30 px-3 py-1 rounded-full">
                  <Code2 className="w-3.5 h-3.5" /> Développement Web & Applications Mobiles
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight text-white">
                  Des solutions numériques performantes, conçues sur-mesure et cédées en pleine propriété.
                </h2>
                <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                  Porteurs de projet, créateurs, indépendants et entreprises : nous concevons des plateformes web, applications mobiles (iOS/Android) et outils métiers sur-mesure. Vous êtes propriétaire de votre code source, libre de tout abonnement captif et accompagné de A à Z.
                </p>
                <div className="pt-2 flex flex-wrap gap-4 text-xs text-slate-200 font-medium">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#C7F36B]" /> Cession Complète du Code Source
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#C7F36B]" /> Garantie 30 Jours Post-Lancement Incluse
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#C7F36B]" /> Stack Moderne (Next.js, React Native, TypeScript)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 1. LES PROJETS QUE NOUS CONCEVONS */}
          <div className="container mx-auto px-4 max-w-5xl space-y-8">
            <div className="text-center max-w-3xl mx-auto space-y-2">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground">
                Quels Types de Projets Réalisons-Nous ?
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                Des solutions techniques modernes, fiables et adaptées à vos objectifs commerciaux.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: Code2,
                  badge: "Web & SaaS",
                  title: "Applications Web & Outils Métiers",
                  desc: "Portails clients, tableaux de bord de gestion, logiciels SaaS internes et espaces membres interactifs.",
                  stack: "Next.js 15, React, TypeScript, Node.js, PostgreSQL",
                  features: [
                    "Authentification sécurisée (JWT, rôles)",
                    "Automatisation de flux métiers & exports",
                    "Paiements Stripe & abonnements récurrents",
                  ],
                },
                {
                  icon: Smartphone,
                  badge: "iOS & Android",
                  title: "Applications Mobiles Cross-Platform",
                  desc: "Applications natives rapides et intuitives pour smartphones et tablettes, publiées sur l'App Store et Google Play.",
                  stack: "React Native, Expo, Notifications Push, Caméra",
                  features: [
                    "Une seule base de code pour iOS & Android",
                    "Expérience utilisateur fluide à 60 FPS",
                    "Fonctionnement hors-ligne et synchronisation cloud",
                  ],
                },
                {
                  icon: Sparkles,
                  badge: "Haute Conversion",
                  title: "Sites Web & E-Commerce Premium",
                  desc: "Sites vitrines d'autorité et boutiques e-commerce conçus pour convertir vos visiteurs en demandes qualifiées.",
                  stack: "Vite, Next.js, Tailwind CSS, Stripe Checkout",
                  features: [
                    "Temps de chargement instantanés (Core Web Vitals)",
                    "SEO technique structuré dès la conception pour maximiser votre visibilité naturelle",
                    "Design responsive sur smartphone, tablette & desktop",
                  ],
                },
              ].map((proj, idx) => {
                const IconP = proj.icon;
                return (
                  <Card key={idx} className="border border-border/80 glass-card hover-lift flex flex-col justify-between">
                    <CardHeader className="space-y-3 pb-3">
                      <div className="flex items-center justify-between">
                        <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-700 flex items-center justify-center font-bold">
                          <IconP className="w-6 h-6" />
                        </div>
                        <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-800 text-xs font-bold border border-emerald-500/20">
                          {proj.badge}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl font-bold text-foreground">
                        {proj.title}
                      </CardTitle>
                      <CardDescription className="text-sm text-muted-foreground leading-relaxed">
                        {proj.desc}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 pt-2">
                      <div className="space-y-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">
                          Fonctionnalités clés :
                        </span>
                        <ul className="space-y-1.5 text-xs text-foreground font-medium">
                          {proj.features.map((f, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                              <span>{f}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-2 border-t border-border/60 text-[11px] text-muted-foreground">
                        <strong>Stack :</strong> {proj.stack}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* 2. DÉMARCHE PROJET EN 5 ÉTAPES */}
          <div className="container mx-auto px-4 max-w-5xl space-y-8">
            <div className="text-center max-w-3xl mx-auto space-y-2">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground">
                Notre Méthode de Projet en 5 Étapes Transparentes
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                Vous savez exactement où en est votre projet, sans mauvaise surprise ni retard imprévu.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {[
                {
                  step: "01",
                  title: "Cadrage & UX",
                  desc: "Définition des fonctionnalités exactes, parcours utilisateurs et maquettage.",
                },
                {
                  step: "02",
                  title: "Architecture",
                  desc: "Modélisation des données, choix des technologies et sécurisation des API.",
                },
                {
                  step: "03",
                  title: "Développement",
                  desc: "Sprints agiles courts, démonstrations en direct et validation continue.",
                },
                {
                  step: "04",
                  title: "Recette & Tests",
                  desc: "Vérification sur tous les appareils, audits de performance et sécurité.",
                },
                {
                  step: "05",
                  title: "Livraison & Code",
                  desc: "Mise en ligne, remise du code source et formation vidéo à l'administration.",
                },
              ].map((step, i) => (
                <div key={i} className="p-4 rounded-2xl glass-card border border-border/80 space-y-2 text-center md:text-left">
                  <span className="text-2xl font-black text-emerald-600 opacity-60 block">
                    {step.step}
                  </span>
                  <h4 className="text-sm font-bold text-foreground">{step.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 3. NOS GARANTIES CONTRACTUELLES (RÉASSURANCE DIRIGEANT) */}
          <div className="container mx-auto px-4 max-w-5xl space-y-8">
            <div className="text-center max-w-3xl mx-auto space-y-2">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground">
                Nos 4 Engagements Contractuels & Déontologiques
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                Les engagements concrets et vérifiables qui protègent votre investissement.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  icon: Lock,
                  title: "Pleine Propriété du Code",
                  desc: "Vous êtes propriétaire de votre projet, avec cession contractuelle 100% du code source et accès complets à vos comptes d'hébergement.",
                },
                {
                  icon: ShieldCheck,
                  title: "Garantie 30 Jours Incluse",
                  desc: "Tout dysfonctionnement identifié dans les 30 jours suivant la livraison est pris en charge et résolu en priorité sans frais.",
                },
                {
                  icon: Compass,
                  title: "Hébergement au Choix",
                  desc: "Déploiement sur votre infrastructure ou nos serveurs haute disponibilité (Vercel, AWS, Cloudflare, VPS).",
                },
                {
                  icon: Clock,
                  title: "Délais & Tarifs Forfaitaires",
                  desc: "Un devis clair, un budget ferme et un planning d'exécution validé ensemble dès le départ.",
                },
              ].map((g, i) => {
                const IconG = g.icon;
                return (
                  <div key={i} className="p-5 rounded-2xl glass-card border border-border/80 space-y-2.5">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-700 flex items-center justify-center">
                      <IconG className="w-5 h-5" />
                    </div>
                    <h4 className="text-base font-bold text-foreground">{g.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{g.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 4. BANDEAU DE CONVERSION SPÉCIFIQUE WEB */}
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="p-8 sm:p-10 rounded-3xl bg-secondary/50 border-2 border-emerald-500/30 text-center space-y-6">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground">
                Vous avez une idée d'application ou un site à concrétiser ?
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Présentez-nous votre besoin. Nous étudions la faisabilité technique et vous transmettons une proposition détaillée sous 24h ouvrées.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                <Button
                  asChild
                  size="lg"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl px-8 py-6 text-base gap-2 shadow-lg"
                >
                  <Link to="/contact?service=web">
                    Décrire mon projet web ou mobile <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
                <Button
                  onClick={handleBookingRedirect}
                  variant="outline"
                  size="lg"
                  className="rounded-xl px-8 py-6 text-base font-semibold border-border/80 hover:bg-secondary gap-2"
                >
                  <Calendar className="w-4 h-4 text-emerald-600" />
                  Réserver un cadrage de 30 min (Gratuit)
                </Button>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* ═══════════════════════════════════════════
          SECTION 2 : PÔLE ARCHITECTURE SI & MEGA HOPEX
      ═══════════════════════════════════════════ */}
      {activePole === "si" && (
        <div className="animate-fade-in space-y-16 md:space-y-24 py-12 md:py-20">
          
          {/* BANDEAU EN-TÊTE DU PÔLE SI */}
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#071916] via-[#123A35] to-[#0a2622] text-white border-2 border-[#123A35]/40 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#C7F36B]/10 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10 max-w-3xl space-y-4">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#C7F36B] bg-[#C7F36B]/15 border border-[#C7F36B]/30 px-3 py-1 rounded-full">
                  <Award className="w-3.5 h-3.5" /> Conseil & Urbanisation des Systèmes d'Information
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight text-white">
                  Prenez le contrôle de votre patrimoine applicatif et sécurisez vos trajectoires SI.
                </h2>
                <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                  DSI, Architectes d'Entreprise et Responsables de Transformation : nous intervenons pour cartographier vos flux, réduire la dette technique, structurer vos référentiels MEGA HOPEX V5 et formaliser des dossiers d'architecture technique (DAT) rigoureux.
                </p>
                <div className="pt-2 flex flex-wrap gap-4 text-xs text-slate-200 font-medium">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#C7F36B]" /> Expertise Certifiée MEGA HOPEX V5
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#C7F36B]" /> Missions Grands Comptes (Covéa, La Banque Postale)
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#C7F36B]" /> Régie spécialisée ou Forfait ciblé
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 1. LES PROBLÈMES QUE NOUS TRAITONS */}
          <div className="container mx-auto px-4 max-w-5xl space-y-8">
            <div className="text-center max-w-3xl mx-auto space-y-2">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground">
                Les Défis d'Architecture SI que Nous Résolvons
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                Une intervention ciblée sur les véritables points de friction des directions informatiques.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: "Cartographie applicative floue ou obsolète",
                  desc: "Manque de visibilité sur les flux d'échanges, les composants et les interdépendances logicielles. Difficulté à évaluer l'impact d'une évolution.",
                  solution: "Restitution d'une cartographie dynamique claire et à jour du SI.",
                },
                {
                  title: "Dette technique et redondances applicatives",
                  desc: "Multiplication des outils en silos, doublons fonctionnels coûteux et difficultés à rationaliser le portefeuille applicatif.",
                  solution: "Matrice d'optimisation et plan de rationalisation du patrimoine.",
                },
                {
                  title: "Référentiel MEGA HOPEX sous-exploité",
                  desc: "Métamodèles complexes, données d'architecture non fiabilisées, absence d'automatisation des flux ou difficulté de prise en main.",
                  solution: "Configuration avancée, fiabilisation du métamodèle et scripts API VB.Net.",
                },
                {
                  title: "Trajectoire de transformation non documentée",
                  desc: "Absence de Dossier d'Architecture Technique (DAT) formalisé pour sécuriser les comités d'architecture et les arbitrages DSI.",
                  solution: "Rédaction complète des DAT et feuilles de route de transition opérationnelles.",
                },
              ].map((item, idx) => (
                <div key={idx} className="p-6 rounded-2xl glass-card border border-border/80 space-y-3 hover-lift">
                  <h4 className="text-base sm:text-lg font-bold text-foreground flex items-start gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-[#123A35]/10 text-[#123A35] flex items-center justify-center text-xs shrink-0 mt-0.5 font-black">
                      {idx + 1}
                    </span>
                    <span>{item.title}</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed pl-8">
                    {item.desc}
                  </p>
                  <div className="pl-8 pt-2">
                    <span className="text-xs font-semibold text-[#123A35] bg-[#123A35]/10 px-3 py-1 rounded-lg inline-block border border-[#123A35]/15">
                      ✓ Impact RAMSIN : {item.solution}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 2. LES 4 MISSIONS CONCRÈTES & LIVRABLES */}
          <div className="container mx-auto px-4 max-w-5xl space-y-8">
            <div className="text-center max-w-3xl mx-auto space-y-2">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground">
                Nos Prestations d'Architecture SI & Livrables Concrets
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                Chaque mission débouche sur des livrables tangibles, vérifiables et immédiatement exploitables par vos équipes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  icon: Layers,
                  title: "Cartographie & Urbanisation du SI",
                  scope: "Recensement exhaustif des briques logicielles, cartographie des flux d'échanges, découpage en zones fonctionnelles et urbanisation globale.",
                  deliverables: [
                    "Cartographie applicative interactive (Niveaux Fonctionnel, Applicatif, Technique)",
                    "Matrice des flux et interfaces d'intégration",
                    "Schémas d'urbanisation conformes aux standards d'entreprise",
                  ],
                },
                {
                  icon: Database,
                  title: "Administration & Configuration MEGA HOPEX",
                  scope: "Paramétrage expert de la plateforme MEGA HOPEX V5 / V2R1, modélisation des référentiels, automatisation par scripts et gouvernance des données.",
                  deliverables: [
                    "Métamodèle personnalisé et référentiel nettoyé",
                    "Scripts d'automatisation des imports/exports (VB.Net / VBScript / API)",
                    "Tableaux de bord d'arbitrage et reporting décisionnel pour la DSI",
                  ],
                },
                {
                  icon: FileText,
                  title: "Dossiers d'Architecture Technique (DAT)",
                  scope: "Cadrage d'architecture de vos projets majeurs, identification des contraintes de sécurité, dimensionnement et passage en comité d'architecture.",
                  deliverables: [
                    "Dossiers d'Architecture Technique (DAT) complets et validés",
                    "Matrices d'impact technique et d'évaluation des risques",
                    "Trajectoire cible (état actuel 'As-Is' vers cible 'To-Be')",
                  ],
                },
                {
                  icon: Workflow,
                  title: "Product Ownership SI & Conduite du Changement",
                  scope: "Rapprochement des équipes métiers et informatiques, formalisation des besoins, rédaction de spécifications fonctionnelles et animation des rituels.",
                  deliverables: [
                    "Backlog produit priorisé et User Stories détaillées",
                    "Cahiers de recette et plans de validation métiers",
                    "Sessions de formation et transfert d'autonomie aux équipes internes",
                  ],
                },
              ].map((mission, idx) => {
                const IconC = mission.icon;
                return (
                  <Card key={idx} className="border border-border/80 glass-card hover-lift flex flex-col justify-between">
                    <CardHeader className="space-y-3 pb-3">
                      <div className="w-12 h-12 rounded-xl bg-[#123A35]/10 text-[#123A35] flex items-center justify-center font-bold">
                        <IconC className="w-6 h-6" />
                      </div>
                      <CardTitle className="text-xl font-bold text-foreground">
                        {mission.title}
                      </CardTitle>
                      <CardDescription className="text-sm text-muted-foreground leading-relaxed">
                        {mission.scope}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3 pt-2">
                      <div className="p-3.5 rounded-xl bg-secondary/60 border border-border/60 space-y-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#123A35] block">
                          Livrables remis à la DSI :
                        </span>
                        <ul className="space-y-1.5 text-xs text-foreground/90 font-medium">
                          {mission.deliverables.map((d, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#123A35] shrink-0 mt-0.5" />
                              <span>{d}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* 3. MÉTHODOLOGIE DE MISSION EN 4 ÉTAPES */}
          <div className="container mx-auto px-4 max-w-5xl space-y-8">
            <div className="text-center max-w-3xl mx-auto space-y-2">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground">
                Comment se déroule une Mission d'Architecture avec RAMSIN ?
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                Une démarche cadrée, collaborative et transparente du premier échange à la restitution finale.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  step: "01",
                  title: "Cadrage & Diagnostic",
                  desc: "Échange avec les parties prenantes, analyse de l'existant documentaire et fixation du périmètre d'intervention.",
                },
                {
                  step: "02",
                  title: "Modélisation & Analyse",
                  desc: "Travail dans le référentiel, entretiens techniques, identification des flux et formalisation de l'architecture.",
                },
                {
                  step: "03",
                  title: "Restitution & Validation",
                  desc: "Présentation des livrables en comités d'architecture, confrontation aux contraintes opérationnelles et validation.",
                },
                {
                  step: "04",
                  title: "Transfert d'Autonomie",
                  desc: "Documentation remise, ateliers de prise en main avec vos architectes internes et support de transition.",
                },
              ].map((step, i) => (
                <div key={i} className="p-5 rounded-2xl glass-card border border-border/80 space-y-2 relative">
                  <span className="text-2xl font-black text-[#123A35] opacity-60 block">
                    {step.step}
                  </span>
                  <h4 className="text-base font-bold text-foreground">{step.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 4. BANDEAU DE CONVERSION SPÉCIFIQUE SI */}
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="p-8 sm:p-10 rounded-3xl bg-secondary/50 border-2 border-[#123A35]/30 text-center space-y-6">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground">
                Vous avez une mission d'Architecture SI ou un besoin MEGA HOPEX ?
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Discutons de vos enjeux applicatifs, de vos échéances et des modalités d'intervention (régie ou forfait) lors d'un premier échange technique de 30 minutes.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                <Button
                  asChild
                  size="lg"
                  className="bg-[#123A35] hover:bg-[#0c2724] text-white font-bold rounded-xl px-8 py-6 text-base gap-2 shadow-lg"
                >
                  <Link to="/contact?service=si">
                    Échanger sur une mission d'architecture SI <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
                <Button
                  onClick={handleBookingRedirect}
                  variant="outline"
                  size="lg"
                  className="rounded-xl px-8 py-6 text-base font-semibold border-border/80 hover:bg-secondary gap-2"
                >
                  <Calendar className="w-4 h-4 text-[#123A35]" />
                  Réserver un créneau de 30 min (Gratuit)
                </Button>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* ═══════════════════════════════════════════
          CTA GLOBAL BAS DE PAGE
      ═══════════════════════════════════════════ */}
      <CTASection
        title="Vous hésitez sur le format ou la prestation adaptée ?"
        subtitle="Échangeons simplement lors d'un premier rendez-vous de 30 minutes sans aucun engagement."
      />
    </>
  );
};

export default Services;
