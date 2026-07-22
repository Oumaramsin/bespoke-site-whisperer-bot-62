import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Cpu, Code2, Database, ShieldCheck, Sparkles, Layers, Terminal, Server, Globe } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export const TechStackSection = () => {
  const [activeTab, setActiveTab] = useState<string>("web");
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation();

  const categories = [
    { id: "web", label: "Frontend & Web", icon: Code2 },
    { id: "backend", label: "Backend & Data", icon: Server },
    { id: "si", label: "Architecture SI & Hopex", icon: Database },
    { id: "devops", label: "DevOps & Sécurité", icon: ShieldCheck },
  ];

  const techData: Record<string, Array<{ name: string; category: string; benefit: string; level: string; icon: string }>> = {
    web: [
      { name: "Next.js 16 / 15", category: "Framework Web Core", benefit: "Chargement ultra-rapide (< 0.5s) & SEO optimal", level: "Expertise Avancée", icon: "⚡" },
      { name: "React 19", category: "UI Engine", benefit: "Interfaces fluides, vivantes et réactives", level: "Master", icon: "⚛️" },
      { name: "TypeScript", category: "Typage Robuste", benefit: "Zéro bug en production & code maintenable", level: "Expert", icon: "📘" },
      { name: "TailwindCSS & Shadcn UI", category: "Design System", benefit: "Design sur-mesure adapté à votre marque", level: "Maîtrisé", icon: "🎨" },
    ],
    backend: [
      { name: "Node.js & Express", category: "Serveur & API", benefit: "Capacité d'accueil de milliers d'utilisateurs", level: "Expert", icon: "🟢" },
      { name: "PostgreSQL & Prisma", category: "Base de Données", benefit: "Stockage sécurisé, structuré et très rapide", level: "Expert", icon: "🐘" },
      { name: "REST & GraphQL APIs", category: "Interconnexion", benefit: "Intégration fluide avec vos logiciels existants", level: "Maîtrisé", icon: "🔗" },
      { name: "Stripe & FormSubmit/Resend", category: "Services Tiers", benefit: "Paiements et notifications 100% sécurisés", level: "Intégré", icon: "💳" },
    ],
    si: [
      { name: "MEGA HOPEX V5 & V2R1", category: "Cartographie SI", benefit: "Urbanisation & cartographie applicative certifiée", level: "V5 Certifiée", icon: "🏛️" },
      { name: "Dossiers d'Architecture (DAT)", category: "Spécifications DSI", benefit: "Documentation conforme aux normes grands comptes", level: "Expertise DSI", icon: "📑" },
      { name: "Design Authority & UML", category: "Gouvernance SI", benefit: "Standardisation des flux et schémas d'entreprise", level: "Senior", icon: "📐" },
      { name: "Urbanisation & Dette Tech", category: "Modernisation", benefit: "Simplification du SI et réduction des coûts IT", level: "Conseil", icon: "🧹" },
    ],
    devops: [
      { name: "Docker & Conteneurs", category: "Déploiement", benefit: "Déploiements isolés sans panne ni bug d'env.", level: "Maîtrisé", icon: "🐳" },
      { name: "Cloud OVH & Vercel", category: "Hébergement", benefit: "Disponibilité garantie 99.9% et sauvegardes", level: "Pro", icon: "☁️" },
      { name: "Git & GitHub Actions", category: "CI/CD", benefit: "Mises à jour automatisées et sans interruption", level: "Expert", icon: "🔄" },
      { name: "Sécurité & SSL/TLS", category: "Protection", benefit: "Protection des données et chiffrement SSL", level: "Garanti", icon: "🛡️" },
    ],
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background via-secondary/10 to-background border-t border-border/60 relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* En-tête de section */}
        <div ref={headerRef} className={`text-center max-w-3xl mx-auto mb-12 space-y-3 scroll-fade-up ${headerVisible ? "is-visible" : ""}`}>
          <Badge variant="outline" className="px-3.5 py-1 text-xs border-primary/30 text-primary font-semibold">
            <Cpu className="w-3.5 h-3.5 mr-1.5 inline text-primary" /> Stack Technique & Excellence
          </Badge>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            Les Technologies au Service de Votre Succès
          </h2>
          <p className="text-muted-foreground text-lg sm:text-xl leading-relaxed">
            Une sélection rigoureuse d'outils modernes garantissant des performances d'exception, une sécurité maximale et une évolutivité sans limite.
          </p>
        </div>

        {/* Onglets de Catégorie */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => {
            const IconComp = cat.icon;
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all border cursor-pointer ${
                  isActive
                    ? "bg-primary text-primary-foreground border-primary shadow-md scale-105"
                    : "bg-card border-border/80 text-muted-foreground hover:text-foreground hover:border-primary/40"
                }`}
              >
                <IconComp className="w-4 h-4" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Grille des Technologies */}
        <div ref={contentRef} className={`grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto scroll-scale-up ${contentVisible ? "is-visible" : ""}`}>
          {techData[activeTab].map((tech, idx) => (
            <Card key={idx} className="border border-border/80 hover:border-primary/50 transition-all hover-lift glass-card overflow-hidden">
              <CardContent className="p-6 flex items-start gap-4">
                <div className="text-3xl p-3 rounded-2xl bg-primary/10 border border-primary/20 shrink-0">
                  {tech.icon}
                </div>
                <div className="space-y-1 flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-extrabold text-base text-foreground">{tech.name}</h3>
                    <Badge variant="secondary" className="text-[10px] font-bold px-2 py-0.5 bg-primary/10 text-primary border-primary/20">
                      {tech.level}
                    </Badge>
                  </div>
                  <span className="text-xs font-semibold text-primary block">{tech.category}</span>
                  <p className="text-xs text-muted-foreground pt-1 leading-relaxed">
                    💡 <strong>Bénéfice Client :</strong> {tech.benefit}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;
