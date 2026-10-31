import HeroSection from "@/components/index/HeroSection";
import ProjectsSection from "@/components/index/ProjectsSection";
import TestimonialsSection from "@/components/index/TestimonialsSection";
import MethodSection from "@/components/index/MethodSection";
import GuaranteesSection from "@/components/index/GuaranteesSection";
import SiSection from "@/components/index/SiSection";
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
  uploadDate: "2026-10-20T09:00:00+02:00",
  duration: "PT1M24S",
  inLanguage: "fr-FR",
  publisher: { "@id": "https://www.ramsin.fr/#organization" },
};

const Index = () => {
  return (
    <>
      <SEO
        title="Applications web et mobiles sur-mesure | RAMSIN"
        description="De l'idée à l'application en ligne : sites, applications web et mobiles à votre nom. Architecture SI et MEGA HOPEX pour les DSI. 30 min offertes."
        canonical="https://www.ramsin.fr/"
        jsonLd={HOME_JSONLD}
      />
      <div className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/10">
        {/* 1. HERO : promesse web & mobile, vidéo, lien discret pour les DSI, logos des grands comptes */}
        <HeroSection />

        {/* 2. RÉALISATIONS WEB & MOBILE (Dabari, Maison HamdiWaShukri, L'Éclat du Chef) */}
        <div className="cv-auto"><ProjectsSection /></div>

        {/* 2 bis. AVIS CLIENTS : affichés seulement une fois écrits et validés par les clients (src/data/testimonials.ts) */}
        <div className="cv-auto"><TestimonialsSection /></div>

        {/* 3. LA MÉTHODE EN 4 ÉTAPES */}
        <div className="cv-auto"><MethodSection /></div>

        {/* 4. TROIS GARANTIES ÉCRITES */}
        <div className="cv-auto"><GuaranteesSection /></div>

        {/* 5. LE SECOND MÉTIER : ARCHITECTURE SI & MEGA HOPEX, en version courte (détail sur /services#architecture-si) */}
        <div className="cv-auto"><SiSection /></div>

        {/* 6. CONVERSION FINALE : RÉSERVATION DES 30 MIN OFFERTES */}
        <div className="cv-auto"><BookingWidget /></div>
      </div>
    </>
  );
};

export default Index;
