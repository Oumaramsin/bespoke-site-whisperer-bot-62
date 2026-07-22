import HeroSection from "@/components/index/HeroSection";
import ClientsSection from "@/components/index/ClientsSection";
import ProjectsSection from "@/components/index/ProjectsSection";
import ServicesSection from "@/components/index/ServicesSection";
import WhyChooseUsSection from "@/components/index/WhyChooseUsSection";
import ComparisonTable from "@/components/index/ComparisonTable";
import ProcessSection from "@/components/index/ProcessSection";
import BookingWidget from "@/components/index/BookingWidget";
import SEO from "@/components/SEO";

const Index = () => {
  return (
    <>
      <SEO
        title="RAMSIN Conseil | Partenaire Transformation Digitale, Web & SI"
        description="Création de sites web professionnels, d'applications sur-mesure (iOS, Android, Web) et conseil en Architecture des SI. Accompagnement de A à Z pour entreprises, commerces et entrepreneurs."
      />
      <div className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/10">
        {/* 1. HERO SECTION (Titre & Valeur Métier) */}
        <HeroSection />

        {/* 2. BANDEAU DE PREUVE SOCIALE IMMÉDIATE (Logos Grands Groupes) */}
        <ClientsSection />

        {/* 3. ÉTUDES DE CAS (Problème ➔ Solution ➔ Impact) */}
        <ProjectsSection />

        {/* 4. OFFRES & SERVICES COMPLET (Sites Web, Apps, Maintenance & Architecture SI) */}
        <ServicesSection />

        {/* 5. NOTRE ENGAGEMENT POUR VOTRE CROISSANCE (Vos 3 Objectifs & 5 Piliers) */}
        <WhyChooseUsSection />

        {/* 6. TABLEAU COMPARATIF (Méthode Classique ❌ vs L'Approche RAMSIN ✅) */}
        <ComparisonTable />

        {/* 7. MÉTHODOLOGIE EN 4 ÉTAPES */}
        <ProcessSection />

        {/* 8. WIDGET DE RÉSERVATION D'APPEL & CONTACT DIRECT (Point d'atterrissage final) */}
        <BookingWidget />
      </div>
    </>
  );
};

export default Index;
