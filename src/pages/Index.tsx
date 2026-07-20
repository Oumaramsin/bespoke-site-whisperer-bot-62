import HeroSection from '@/components/index/HeroSection';
import ClientsSection from '@/components/index/ClientsSection';
import ProjectsSection from '@/components/index/ProjectsSection';
import ServicesSection from '@/components/index/ServicesSection';
import ComparisonTable from '@/components/index/ComparisonTable';
import ProcessSection from '@/components/index/ProcessSection';
import BookingWidget from '@/components/index/BookingWidget';
import CTASection from '@/components/CTASection';
import SEO from '@/components/SEO';

const Index = () => {
  return (
    <>
      <SEO
        title="RAMSIN Conseil | Conception & Développement d'Applications Sur-Mesure"
        description="Conception & développement d'applications sur-mesure pour projets exigeants. 7 ans d'expertise au service des grands groupes et des entreprises en croissance."
      />
      <div className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/10">
        {/* 1. HERO SECTION (Titre & Valeur Métier) */}
        <HeroSection />

        {/* 2. BANDEAU DE PREUVE SOCIALE IMMÉDIATE (Logos Grands Groupes) */}
        <ClientsSection />

        {/* 3. ÉTUDES DE CAS (Problème ➔ Solution ➔ Impact) */}
        <ProjectsSection />

        {/* 4. OFFRES & SOLUTIONS (Vos Besoins / Mes Solutions) */}
        <ServicesSection />

        {/* 5. TABLEAU COMPARATIF (Méthode Classique ❌ vs Accompagnement Ramsin ✅) */}
        <ComparisonTable />

        {/* 6. MÉTHODOLOGIE EN 4 ÉTAPES */}
        <ProcessSection />

        {/* 7. WIDGET DE RÉSERVATION D'APPEL & CONTACT DIRECT */}
        <BookingWidget />

        {/* CTA FINAL DE BAS DE PAGE */}
        <CTASection />
      </div>
    </>
  );
};

export default Index;
