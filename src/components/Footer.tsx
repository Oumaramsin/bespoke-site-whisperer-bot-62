import { Link } from "react-router-dom";
import { Lock, ShieldCheck, HeartHandshake, FileText, Zap } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import CopyEmailButton from "./CopyEmailButton";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { ref, isVisible } = useScrollAnimation();

  const trustBadges = [
    { icon: Lock, label: "Code 100% Propriétaire" },
    { icon: ShieldCheck, label: "Hébergement Conforme RGPD" },
    { icon: HeartHandshake, label: "Garantie 30 Jours Post-Lancement" },
    { icon: FileText, label: "Guide & Autonomie Inclus" }
  ];

  return (
    <footer ref={ref} className={`bg-card border-t border-border/80 scroll-fade-up ${isVisible ? "is-visible" : ""}`}>
      {/* Badges de réassurance dans le Footer */}
      <div className="bg-secondary/40 border-b border-border/60 py-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {trustBadges.map((badge, i) => {
              const IconComp = badge.icon;
              return (
                <div key={i} className="flex items-center justify-center gap-2 text-xs font-semibold text-foreground/90">
                  <IconComp className="w-4 h-4 text-primary shrink-0" />
                  <span>{badge.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <h3 className="text-xl font-bold">RAMSIN Conseil</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Cabinet d'accompagnement en architecture des systèmes d'information (MEGA HOPEX V5) et création d'applications web & sites e-commerce sur-mesure.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4 text-foreground">Navigation Rapide</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-muted-foreground hover:text-primary transition-colors">
                  Services & Solutions
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-muted-foreground hover:text-primary transition-colors">
                  Réalisations & Portfolio
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  À Propos d'Oumar SIDIBÉ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact & Réservation
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4 text-foreground">Contact & Localisation</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-1.5 flex-wrap">
                <span>Email :</span>
                <CopyEmailButton email="sidibeoumar94@gmail.com" />
              </li>
              <li>Téléphone : <a href="tel:+33761518890" className="text-foreground hover:text-primary font-medium">+33 (0)7 61 51 88 90</a></li>
              <li>Localisation : Paris & Île-de-France (Interventions France & Remote)</li>
              <li className="pt-2 text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500 shrink-0" />
                <span>Réponse garantie sous 24h ouvrées</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/60 mt-10 pt-6 text-center text-xs text-muted-foreground">
          <p>© {currentYear} RAMSIN Conseil - Oumar SIDIBÉ. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
