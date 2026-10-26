import { useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
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
  Server,
} from "lucide-react";
import SEO from "@/components/SEO";
import CTASection from "@/components/CTASection";
import PoleProjects from "@/components/projects/PoleProjects";
import MethodSteps from "@/components/projects/MethodSteps";
import ServicesFaq from "@/components/services/ServicesFaq";
import { WEB_FAQ } from "@/data/services";
import { offerPath, type OfferId } from "@/data/offerRoutes";
import { smoothScrollTo } from "@/lib/smoothScroll";

const SERVICES_JSONLD = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Création d'applications web & mobiles sur-mesure",
    serviceType: "Développement d'applications web, mobiles iOS & Android et sites e-commerce",
    provider: { "@type": "ProfessionalService", name: "RAMSIN Conseil", url: "https://www.ramsin.fr" },
    areaServed: ["Paris", "Île-de-France", "France"],
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Hébergement, maintenance & évolutions d'applications",
    serviceType: "Hébergement, maintenance, sécurité et évolutions de sites et d'applications web & mobiles",
    provider: { "@type": "ProfessionalService", name: "RAMSIN Conseil", url: "https://www.ramsin.fr" },
    areaServed: ["Paris", "Île-de-France", "France"],
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Architecture des Systèmes d'Information & MEGA HOPEX V5",
    serviceType: "Cartographie applicative, urbanisation du SI et Dossiers d'Architecture Technique",
    provider: { "@type": "ProfessionalService", name: "RAMSIN Conseil", url: "https://www.ramsin.fr" },
    areaServed: ["Paris", "Île-de-France", "France"],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: WEB_FAQ.map(({ q, a }) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
  },
];
import { trackConversionEvent } from "@/lib/analytics";
import { openBooking } from "@/lib/calendly";


export const Services = () => {
  const [searchParams] = useSearchParams();

  // Les liens /services#architecture-si (accueil, pied de page, guides) sont gérés par ScrollToTop.
  // Ici, seulement les anciens liens ?pole=si : on descend aussi jusqu'à la partie SI.
  const legacySiLink = searchParams.get("pole") === "si";
  useEffect(() => {
    if (!legacySiLink) return;
    const timer = window.setTimeout(() => {
      const section = document.getElementById("architecture-si");
      if (section) smoothScrollTo(section);
    }, 200);
    return () => window.clearTimeout(timer);
  }, [legacySiLink]);

  // Raccourcis du haut de page : défilement animé jusqu'à la partie choisie (l'ancre reste pour les navigateurs sans JS)
  const goTo = (id: "web-mobile" | "architecture-si", pole: "web" | "si") => (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    trackConversionEvent("select_pole", { pole, source: "services_hero" });
    const section = document.getElementById(id);
    if (section) smoothScrollTo(section);
  };

  const handleBookingRedirect = () => openBooking("services_page");

  return (
    <>
      <SEO
        title="Services web, mobile et architecture SI | RAMSIN"
        description="Applications web et mobiles, e-commerce, hébergement et maintenance sur-mesure. Pour les DSI : architecture SI et MEGA HOPEX V5. Paris et à distance."
        jsonLd={SERVICES_JSONLD}
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
            <Sparkles className="w-3.5 h-3.5 mr-1 inline text-amber-500" /> Deux métiers, un interlocuteur
          </Badge>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.22]">
            Applications web & mobiles sur-mesure,
            <span className="block gradient-text mt-2 pb-2">et architecture SI pour les DSI.</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-muted-foreground font-normal max-w-3xl mx-auto leading-relaxed">
            Créateurs, indépendants et entreprises : nous concevons votre application ou votre site et vous en cédons l'intégralité.
            Directions informatiques : cartographie, urbanisation et MEGA HOPEX V5.
          </p>

          {/* Raccourcis vers les deux parties de la page (de simples ancres : elles marchent avant même le chargement de React) */}
          <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
            <a
              href="#web-mobile"
              onClick={goTo("web-mobile", "web")}
              className="flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-sm sm:text-base bg-emerald-700 hover:bg-emerald-800 text-white shadow-md transition-colors"
            >
              <Smartphone className="w-5 h-5 shrink-0" />
              Web & applications sur-mesure
              <ChevronRight className="w-4 h-4 rotate-90 shrink-0" />
            </a>
            <a
              href="#architecture-si"
              onClick={goTo("architecture-si", "si")}
              className="flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-sm sm:text-base bg-white text-[#123A35] border-2 border-[#123A35]/25 hover:border-[#123A35] shadow-sm transition-colors"
            >
              <Building2 className="w-5 h-5 shrink-0" />
              Architecture SI & MEGA HOPEX
              <ChevronRight className="w-4 h-4 rotate-90 shrink-0" />
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          PARTIE 1 : WEB & APPLICATIONS SUR-MESURE (page carrefour vers les pages d'offre)
      ═══════════════════════════════════════════ */}
      <section id="web-mobile" className="scroll-mt-20 space-y-14 md:space-y-20 py-12 md:py-20">
          
          {/* BANDEAU EN-TÊTE DU PÔLE WEB */}
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#0c2420] via-[#15463f] to-[#0d2e29] text-white border-2 border-emerald-500/30 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#C7F36B]/10 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10 max-w-3xl space-y-4">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#C7F36B] bg-[#C7F36B]/15 border border-[#C7F36B]/30 px-3 py-1 rounded-full">
                  <Code2 className="w-3.5 h-3.5" /> Développement web & applications mobiles
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight text-white">
                  Votre site ou votre application, conçu avec vous et livré à votre nom.
                </h2>
                <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                  Vous lancez un projet ou vous voulez équiper votre entreprise : nous concevons votre site, votre application web ou mobile, ou votre outil de gestion. Le code et les comptes sont à votre nom, sans abonnement imposé, et nous restons là après la mise en ligne.
                </p>
                <div className="pt-2 flex flex-wrap gap-4 text-xs text-slate-200 font-medium">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#C7F36B]" /> Cession complète du code source
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#C7F36B]" /> Garantie 30 jours après le lancement
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#C7F36B]" /> Un prix ferme, fixé avant de commencer
                  </span>
                </div>
                <div className="pt-3 flex flex-wrap gap-3">
                  <Button variant="lime" className="rounded-xl gap-2 cursor-pointer" onClick={handleBookingRedirect}>
                    <Calendar className="w-4 h-4" /> Réserver 30 min offertes
                  </Button>
                  <Button asChild variant="outline" className="rounded-xl gap-2 bg-transparent text-white border-white/30 hover:bg-white/10 hover:text-white">
                    <Link to="/contact?tunnel=form&service=web">Décrire mon projet par écrit</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* 1. LES PROJETS QUE NOUS CONCEVONS */}
          <div className="container mx-auto px-4 max-w-5xl space-y-8">
            <div className="text-center max-w-3xl mx-auto space-y-2">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground">
                Ce que nous réalisons
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                Choisissez votre type de projet : chaque offre a sa page, avec le détail, le déroulé et des exemples.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  icon: Code2,
                  badge: "Web & SaaS",
                  title: "Applications web & outils métiers",
                  desc: "Espace client, tableau de bord, outil de gestion interne ou logiciel en ligne pour vos propres clients.",
                  stack: "Next.js 15, React, TypeScript, Node.js, PostgreSQL",
                  offer: "application-web" as OfferId | undefined,
                  features: [
                    "Comptes utilisateurs et droits d'accès sécurisés",
                    "Vos tâches répétitives automatisées",
                    "Paiement en ligne et abonnements",
                  ],
                },
                {
                  icon: Smartphone,
                  badge: "iOS & Android",
                  title: "Applications mobiles iOS & Android",
                  desc: "Une application pour iPhone et Android, publiée sur l'App Store et Google Play.",
                  stack: "React Native, Expo, notifications push, caméra",
                  offer: "application-mobile" as OfferId | undefined,
                  features: [
                    "Une seule application pour iPhone et Android",
                    "Fluide et simple à prendre en main",
                    "Fonctionne même sans réseau, puis se synchronise",
                  ],
                },
                {
                  icon: Sparkles,
                  badge: "Vitrine & boutique",
                  title: "Sites web & e-commerce",
                  desc: "Un site vitrine qui donne envie de vous contacter, ou une boutique pour vendre en ligne.",
                  stack: "Vite, Next.js, Tailwind CSS, Stripe Checkout",
                  offer: "site-ecommerce" as OfferId | undefined,
                  features: [
                    "Des pages qui s'affichent vite, même sur mobile",
                    "Pensé dès le départ pour être bien référencé sur Google",
                    "Adapté au téléphone, à la tablette et à l'ordinateur",
                  ],
                },
                {
                  icon: Server,
                  badge: "Après lancement",
                  title: "Hébergement, maintenance & évolutions",
                  desc: "Après la mise en ligne, nous gardons votre site ou votre application en ligne, sécurisé et à jour, pour que vous restiez concentré sur votre activité.",
                  stack: "Vercel, AWS, Cloudflare, VPS",
                  offer: undefined as OfferId | undefined,
                  features: [
                    "Hébergement, nom de domaine et connexion sécurisée",
                    "Mises à jour, correctifs de sécurité & sauvegardes",
                    "Évolutions & publication sur l'App Store et Google Play",
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

                      {proj.offer && (
                        <Link
                          to={offerPath(proj.offer)}
                          className="inline-flex items-center gap-1 text-sm font-bold text-emerald-700 hover:text-emerald-900 transition-colors"
                        >
                          Découvrir l'offre <ArrowRight className="w-4 h-4" />
                        </Link>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* PREUVE : un projet web, le plus complet (site, application iPhone et Android) */}
          <PoleProjects pole="web" limit={1} title="Un projet récent" />

          {/* MÉTHODE : les 4 étapes, les mêmes que sur l'accueil et dans la vidéo */}
          <div className="container mx-auto px-4 max-w-5xl space-y-8">
            <div className="text-center max-w-3xl mx-auto space-y-2">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground">Comment ça se passe</h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                Un seul interlocuteur du premier échange à la mise en ligne.
              </p>
            </div>
            <MethodSteps />
          </div>

          {/* FAQ : LEVER LES FREINS AVANT DE SE LANCER */}
          <ServicesFaq />

          {/* 4. BANDEAU DE CONVERSION SPÉCIFIQUE WEB */}
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="p-8 sm:p-10 rounded-3xl bg-secondary/50 border-2 border-emerald-500/30 text-center space-y-6">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground">
                Vous avez une idée d'application ou un site à concrétiser ?
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Décrivez-nous votre besoin : nous vous disons ce qui est faisable et vous envoyons une proposition détaillée sous 24 h ouvrées.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                <Button
                  onClick={handleBookingRedirect}
                  size="lg"
                  className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl px-8 py-6 text-base gap-2 shadow-lg cursor-pointer"
                >
                  <Calendar className="w-4 h-4" /> Réserver 30 min offertes
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="rounded-xl px-8 py-6 text-base font-semibold border-border/80 hover:bg-secondary gap-2"
                >
                  <Link to="/contact?tunnel=form&service=web">
                    Décrire mon projet par écrit <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>

      </section>

      {/* ═══════════════════════════════════════════
          PARTIE 2 : ARCHITECTURE SI & MEGA HOPEX (pour les DSI), en entier
      ═══════════════════════════════════════════ */}
      <section id="architecture-si" className="scroll-mt-20 space-y-16 md:space-y-24 py-12 md:py-20 border-t border-border/60 bg-secondary/20">
          
          {/* BANDEAU EN-TÊTE DU PÔLE SI */}
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#071916] via-[#123A35] to-[#0a2622] text-white border-2 border-[#123A35]/40 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#C7F36B]/10 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10 max-w-3xl space-y-4">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#C7F36B] bg-[#C7F36B]/15 border border-[#C7F36B]/30 px-3 py-1 rounded-full">
                  <Award className="w-3.5 h-3.5" /> Conseil et urbanisation des systèmes d'information
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight text-white">
                  Une vue claire de votre SI et des décisions documentées.
                </h2>
                <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                  DSI, architectes d'entreprise et responsables de transformation : nous intervenons pour cartographier vos flux, réduire la dette technique, structurer vos référentiels MEGA HOPEX V5 et formaliser vos dossiers d'architecture technique (DAT).
                </p>
                <div className="pt-2 flex flex-wrap gap-4 text-xs text-slate-200 font-medium">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#C7F36B]" /> Expertise certifiée MEGA HOPEX V5
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#C7F36B]" /> Missions grands comptes (Covéa, La Banque Postale)
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#C7F36B]" /> Régie spécialisée ou forfait ciblé
                  </span>
                </div>
                <div className="pt-3 flex flex-wrap gap-3">
                  <Button variant="lime" className="rounded-xl gap-2 cursor-pointer" onClick={handleBookingRedirect}>
                    <Calendar className="w-4 h-4" /> Réserver 30 min offertes
                  </Button>
                  <Button asChild variant="outline" className="rounded-xl gap-2 bg-transparent text-white border-white/30 hover:bg-white/10 hover:text-white">
                    <Link to="/contact?tunnel=form&service=si">Décrire mon projet par écrit</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* 1. LES PROBLÈMES QUE NOUS TRAITONS */}
          <div className="container mx-auto px-4 max-w-5xl space-y-8">
            <div className="text-center max-w-3xl mx-auto space-y-2">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground">
                Les défis d'architecture SI que nous résolvons
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                Les situations pour lesquelles les DSI nous sollicitent le plus souvent.
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

          {/* PREUVES : MISSIONS SI */}
          <PoleProjects pole="si" limit={1} title="Une mission récente" />

          {/* 2. LES 4 MISSIONS CONCRÈTES & LIVRABLES */}
          <div className="container mx-auto px-4 max-w-5xl space-y-8">
            <div className="text-center max-w-3xl mx-auto space-y-2">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground">
                Nos prestations d'architecture SI et leurs livrables
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                Chaque mission se termine par des livrables que vos équipes reprennent directement.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  icon: Layers,
                  title: "Cartographie & urbanisation du SI",
                  scope: "Recensement des briques logicielles, cartographie des flux d'échanges, découpage en zones fonctionnelles et urbanisation globale.",
                  deliverables: [
                    "Cartographie applicative interactive (niveaux fonctionnel, applicatif et technique)",
                    "Matrice des flux et interfaces d'intégration",
                    "Schémas d'urbanisation conformes aux standards d'entreprise",
                  ],
                },
                {
                  icon: Database,
                  title: "Administration & configuration MEGA HOPEX",
                  scope: "Paramétrage de la plateforme MEGA HOPEX V5 / V2R1, modélisation des référentiels, automatisation par scripts et gouvernance des données.",
                  deliverables: [
                    "Métamodèle personnalisé et référentiel nettoyé",
                    "Scripts d'automatisation des imports/exports (VB.Net / VBScript / API)",
                    "Tableaux de bord d'arbitrage et reporting décisionnel pour la DSI",
                  ],
                },
                {
                  icon: FileText,
                  title: "Dossiers d'architecture technique (DAT)",
                  scope: "Cadrage d'architecture de vos projets majeurs, identification des contraintes de sécurité, dimensionnement et passage en comité d'architecture.",
                  deliverables: [
                    "Dossiers d'architecture technique (DAT) complets et validés",
                    "Matrices d'impact technique et d'évaluation des risques",
                    "Trajectoire cible, de l'existant à l'architecture visée",
                  ],
                },
                {
                  icon: Workflow,
                  title: "Product ownership SI & conduite du changement",
                  scope: "Rapprochement des équipes métiers et informatiques, formalisation des besoins, rédaction de spécifications fonctionnelles et animation des rituels.",
                  deliverables: [
                    "Backlog priorisé et user stories détaillées",
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
                Comment se déroule une mission d'architecture avec RAMSIN ?
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                Quatre étapes, du premier échange à la remise des livrables.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  step: "01",
                  title: "Cadrage & diagnostic",
                  desc: "Échange avec les parties prenantes, analyse de l'existant documentaire et fixation du périmètre d'intervention.",
                },
                {
                  step: "02",
                  title: "Modélisation & analyse",
                  desc: "Travail dans le référentiel, entretiens techniques, identification des flux et formalisation de l'architecture.",
                },
                {
                  step: "03",
                  title: "Restitution & validation",
                  desc: "Présentation des livrables en comités d'architecture, confrontation aux contraintes opérationnelles et validation.",
                },
                {
                  step: "04",
                  title: "Transfert d'autonomie",
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
                Une mission d'architecture SI ou un besoin MEGA HOPEX ?
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Discutons de vos enjeux applicatifs, de vos échéances et des modalités d'intervention (régie ou forfait) lors d'un premier échange technique de 30 minutes.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                <Button
                  onClick={handleBookingRedirect}
                  size="lg"
                  className="bg-[#123A35] hover:bg-[#0c2724] text-white font-bold rounded-xl px-8 py-6 text-base gap-2 shadow-lg cursor-pointer"
                >
                  <Calendar className="w-4 h-4" /> Réserver 30 min offertes
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="rounded-xl px-8 py-6 text-base font-semibold border-border/80 hover:bg-secondary gap-2"
                >
                  <Link to="/contact?tunnel=form&service=si">
                    Décrire mon projet par écrit <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>

      </section>

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
