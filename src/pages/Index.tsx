import HeroSection from "@/components/index/HeroSection";
import ClientsSection from "@/components/index/ClientsSection";
import ProjectsSection from "@/components/index/ProjectsSection";
import ServicesSection from "@/components/index/ServicesSection";
import GuaranteesSection from "@/components/index/GuaranteesSection";
import BookingWidget from "@/components/index/BookingWidget";
import SEO from "@/components/SEO";

const Index = () => {
  return (
    <>
      <SEO
        title="Applications web & mobiles sur-mesure, Architecture SI & MEGA HOPEX | RAMSIN"
        description="De l'idée à l'application en ligne : applications web, mobiles iOS & Android et e-commerce sur-mesure, code à votre nom, hébergement et maintenance. Architecture SI & MEGA HOPEX pour les DSI. 30 min offertes."
        canonical="https://www.ramsin.fr/"
      />
      <div className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/10">
        {/* 1. HERO SECTION (Titre, Vidéo Motion Design & Choix de Parcours) */}
        <HeroSection />

        {/* 2. PREUVE SOCIALE & EXPÉRIENCE GRANDS COMPTES (Covéa, La Banque Postale, Société Générale) */}
        <div className="cv-auto"><ClientsSection /></div>

        {/* 3. ÉTUDES DE CAS EN VEDETTE (Dabari, Maison HamdiWaShukri, L'Éclat du Chef) */}
        <div className="cv-auto"><ProjectsSection /></div>

        {/* 4. NOS 2 PÔLES D'EXCELLENCE DÉDIÉS (Architecture SI & Web/Mobile) */}
        <div className="cv-auto"><ServicesSection /></div>

        {/* 5. NOS 3 GARANTIES CONCRÈTES (Budget forfaitaire, Zéro boîte noire, Code cédé & Garantie 30j) */}
        <div className="cv-auto"><GuaranteesSection /></div>

        {/* 6. CONVERSION FINALE : RÉSERVATION DE CADRAGE OFFERT (30 MIN) */}
        <div className="cv-auto"><BookingWidget /></div>
      </div>
    </>
  );
};

export default Index;
