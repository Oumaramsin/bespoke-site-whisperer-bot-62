import HeroSection from "@/components/index/HeroSection";
import ClientsSection from "@/components/index/ClientsSection";
import ProjectsSection from "@/components/index/ProjectsSection";
import TestimonialsSection from "@/components/index/TestimonialsSection";
import MethodSection from "@/components/index/MethodSection";
import GuaranteesSection from "@/components/index/GuaranteesSection";
import BookingWidget from "@/components/index/BookingWidget";
import SEO from "@/components/SEO";

// La vidéo de présentation en données structurées : Google peut l'afficher dans les résultats (vignette, durée)
const HOME_JSONLD = {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  name: "La méthode RAMSIN : de l'idée à l'application en ligne",
  description:
    "Comment RAMSIN conçoit une application web ou mobile sur-mesure : cadrage de 30 min offert, groupe WhatsApp dédié, tests chaque semaine, lancement à votre nom.",
  thumbnailUrl: ["https://www.ramsin.fr/videos/cover_v4_1080p.png"],
  contentUrl: "https://www.ramsin.fr/videos/ramsin-motion-v4-1080p.mp4",
  uploadDate: "2026-10-20",
  duration: "PT1M24S",
  inLanguage: "fr-FR",
  publisher: { "@id": "https://www.ramsin.fr/#organization" },
};

const Index = () => {
  return (
    <>
      <SEO
        title="Applications web & mobiles sur-mesure, Architecture SI & MEGA HOPEX | RAMSIN"
        description="De l'idée à l'application en ligne : applications web, mobiles iOS & Android et e-commerce sur-mesure, code à votre nom, hébergement et maintenance. Architecture SI & MEGA HOPEX pour les DSI. 30 min offertes."
        canonical="https://www.ramsin.fr/"
        jsonLd={HOME_JSONLD}
      />
      <div className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/10">
        {/* 1. HERO SECTION (Titre, Vidéo Motion Design & Choix de Parcours) */}
        <HeroSection />

        {/* 2. PREUVE SOCIALE & EXPÉRIENCE GRANDS COMPTES (Covéa, La Banque Postale, Société Générale) */}
        <div className="cv-auto"><ClientsSection /></div>

        {/* 3. ÉTUDES DE CAS EN VEDETTE (Dabari, Maison HamdiWaShukri, L'Éclat du Chef) */}
        <div className="cv-auto"><ProjectsSection /></div>

        {/* 3 bis. AVIS CLIENTS : affichés seulement une fois écrits et validés par les clients (src/data/testimonials.ts) */}
        <div className="cv-auto"><TestimonialsSection /></div>

        {/* 4. LA MÉTHODE EN 4 ÉTAPES (les deux pôles sont déjà présentés dans le hero) */}
        <div className="cv-auto"><MethodSection /></div>

        {/* 5. NOS 3 GARANTIES CONCRÈTES (Budget forfaitaire, Zéro boîte noire, Code cédé & Garantie 30j) */}
        <div className="cv-auto"><GuaranteesSection /></div>

        {/* 6. CONVERSION FINALE : RÉSERVATION DE CADRAGE OFFERT (30 MIN) */}
        <div className="cv-auto"><BookingWidget /></div>
      </div>
    </>
  );
};

export default Index;
