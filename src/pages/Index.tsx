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
        title="RAMSIN | Architecture SI (MEGA HOPEX) & Solutions Numériques Sur-Mesure"
        description="Cabinet d'expertise en Architecture des Systèmes d'Information (MEGA HOPEX V5) et conception d'applications web & mobiles sur-mesure. Des décisions SI plus claires et des outils adaptés à vos enjeux."
        canonical="https://www.ramsin.fr/"
      />
      <div className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/10">
        {/* 1. HERO SECTION (Titre, Vidéo Motion Design & Choix de Parcours) */}
        <HeroSection />

        {/* 2. PREUVE SOCIALE & EXPÉRIENCE GRANDS COMPTES (Covéa, La Banque Postale, Société Générale) */}
        <ClientsSection />

        {/* 3. ÉTUDES DE CAS EN VEDETTE (Dabari, Maison HamdiWaShukri, L'Éclat du Chef) */}
        <ProjectsSection />

        {/* 4. NOS 2 PÔLES D'EXCELLENCE DÉDIÉS (Architecture SI & Web/Mobile) */}
        <ServicesSection />

        {/* 5. NOS 3 GARANTIES CONCRÈTES (Budget forfaitaire, Zéro boîte noire, Code cédé & Garantie 30j) */}
        <GuaranteesSection />

        {/* 6. CONVERSION FINALE : RÉSERVATION DE CADRAGE OFFERT (30 MIN) */}
        <BookingWidget />
      </div>
    </>
  );
};

export default Index;
