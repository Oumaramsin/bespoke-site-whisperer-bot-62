import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Building2, Mail, MapPin, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { trackConversionEvent } from "@/lib/analytics";
import { openBooking } from "@/lib/calendly";
import MethodMotionSection from "@/components/index/MethodMotionSection";

/** Logos du premier écran (ordinateur) : entreprises où les missions de conseil ont été réalisées */
const TRUST_LOGOS = [
  { name: "Covéa", src: "/logos/covea.png" },
  { name: "La Banque Postale", src: "/logos/banque-postale.webp" },
  { name: "Société Générale", src: "/logos/societe-generale.png" },
  { name: "France Travail", src: "/logos/france-travail.webp" },
];

const HeroSection = () => {
  // Tous les boutons « Réserver » ouvrent l'agenda par-dessus la page (BookingDialog), sans défilement
  const book = (source: string) => openBooking(source);

  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-16 md:pb-24">
      {/* Dot grid pattern de fond */}
      <div className="absolute inset-0 dot-grid-pattern -z-10 pointer-events-none" />

      {/* Halo lumineux subtil */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[520px] bg-gradient-to-b from-[#123A35]/10 via-[#C7F36B]/5 to-transparent -z-10 pointer-events-none" />

      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto space-y-10 text-center">
          
          {/* 1. BADGES D'ACCÈS & STATUT */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card border-emerald-500/30 text-emerald-800 text-xs font-semibold shadow-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Disponible pour vos projets web & mobiles
            </div>

            {/* Localisation masquée sur mobile pour que le bouton principal reste dans le premier écran */}
            <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary/80 text-muted-foreground text-xs font-medium border border-border/60">
              <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
              <span>Basés à Fresnes (94) · Interventions Paris & à distance</span>
            </div>
          </div>

          {/* 2. ACCROCHE STRATÉGIQUE & PROMESSE CENTRALE */}
          <div className="space-y-4 max-w-4xl mx-auto">
            {/* Accroche alignée sur la vidéo de présentation (cible : porteurs de projet web, mobile, e-commerce) ;
                l'architecture SI reste présente dans l'intro et dans la carte dédiée juste en dessous */}
            <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-primary block">
              Applications web, mobiles & e-commerce sur-mesure
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.22]">
              De l’idée à l’application en ligne.
              <span className="block mt-2 sm:mt-2.5 pb-2 gradient-text">
                Conçue avec vous, livrée à votre nom.
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground font-normal max-w-3xl mx-auto leading-relaxed pt-2">
              Une idée d’application, de boutique en ligne ou de plateforme ? RAMSIN la transforme en{" "}
              <strong>un vrai produit, prêt pour vos clients</strong>, et vous en cède{" "}
              <strong>l’intégralité : code, comptes, données</strong>.
            </p>

            {/* 2.1 ACTION PRINCIPALE : visible dès le premier écran, y compris sur mobile */}
            <div className="pt-3 sm:pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button
                onClick={() => book("hero_top")}
                size="lg"
                variant="lime"
                className="w-full sm:w-auto rounded-xl px-7 py-6 font-extrabold text-sm sm:text-base gap-2 shadow-[0_8px_30px_-8px_rgba(18,58,53,0.45)] hover:shadow-[0_12px_35px_-8px_rgba(18,58,53,0.55)] transition-all cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-[#071816]" />
                Réserver 30 min offertes
                <ArrowRight className="w-4 h-4 text-[#071816]" />
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full sm:w-auto rounded-xl px-6 py-6 font-bold text-sm sm:text-base gap-2 border-2 border-[#123A35]/25 hover:border-[#123A35] hover:bg-[#123A35]/5 transition-all"
              >
                <Link
                  to="/contact?tunnel=form#formulaire-contact"
                  state={{ scrollToForm: true }}
                  onClick={() => trackConversionEvent("click_switch_to_written_form", { source: "hero_top" })}
                >
                  <Mail className="w-4 h-4 text-[#123A35]" />
                  Décrire mon projet par écrit
                </Link>
              </Button>
            </div>
            <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-muted-foreground font-medium">
              <li className="inline-flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Sans engagement</li>
              <li className="inline-flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Réponse sous 24 h ouvrées</li>
              <li className="inline-flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Code cédé à 100 %</li>
            </ul>

            {/* Second métier : les DSI voient tout de suite que RAMSIN ne fait pas que du web */}
            <p className="text-sm text-muted-foreground pt-1">
              <Building2 className="w-4 h-4 inline -mt-0.5 mr-1 text-[#123A35]" />
              Vous êtes une DSI ?{" "}
              <Link
                to="/services#architecture-si"
                onClick={() => trackConversionEvent("select_pole", { pole: "si", source: "hero_dsi_link" })}
                className="font-bold text-[#123A35] underline underline-offset-4 hover:text-primary"
              >
                Architecture SI & MEGA HOPEX
              </Link>
            </p>

            {/* Preuve immédiate : les grands comptes où les missions ont été réalisées */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6 pt-4">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Missions réalisées chez</span>
              <ul className="flex items-center gap-3 sm:gap-5">
                {TRUST_LOGOS.map((logo) => (
                  <li key={logo.name} className="w-[72px] sm:w-28 h-8 flex items-center justify-center">
                    <img
                      src={logo.src}
                      alt={logo.name}
                      loading="lazy"
                      decoding="async"
                      className="w-auto h-auto max-h-7 sm:max-h-8 max-w-full object-contain opacity-80 grayscale transition hover:opacity-100 hover:grayscale-0"
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 2.5 LECTEUR CINÉMA MOTION DESIGN : Démonstration vivante & problème client */}
          <div className="pt-1 pb-2">
            <MethodMotionSection embedded />
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
