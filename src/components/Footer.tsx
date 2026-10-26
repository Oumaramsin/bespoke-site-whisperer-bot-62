import { Link } from "react-router-dom";
import { Lock, ShieldCheck, HeartHandshake, FileText, Zap, Star, MapPin } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import CopyEmailButton from "./CopyEmailButton";
import RamsinLogo from "./RamsinLogo";
import { openConsentBanner } from "@/lib/consent";
import { isGoogleTagConfigured } from "@/lib/googleTag";
import { OFFER_LINKS } from "@/data/offerRoutes";
import { GOOGLE_BUSINESS_URL, GOOGLE_REVIEW_URL } from "@/data/company";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { ref, isVisible } = useScrollAnimation();

  const trustBadges = [
    { icon: Lock, label: "Propriété du code & des livrables" },
    { icon: ShieldCheck, label: "Hébergement conforme RGPD" },
    { icon: HeartHandshake, label: "Garantie 30 jours après lancement" },
    { icon: FileText, label: "Formation & autonomie incluses" },
  ];

  return (
    <footer
      ref={ref}
      className={`bg-card border-t border-border/80 scroll-fade-up ${isVisible ? "is-visible" : ""}`}
    >
      {/* Badges de réassurance dans le Footer */}
      <div className="bg-secondary/40 border-b border-border/60 py-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {trustBadges.map((badge, i) => {
              const IconComp = badge.icon;
              return (
                <div
                  key={i}
                  className="flex items-center justify-center gap-2 text-xs font-semibold text-foreground/90"
                >
                  <IconComp className="w-4 h-4 text-primary shrink-0" />
                  <span>{badge.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <RamsinLogo size={28} />
              <h3 className="text-xl font-bold">RAMSIN Conseil</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Cabinet d'expertise en Architecture des Systèmes d'Information
              (MEGA HOPEX V5) et développement d'applications web & mobiles
              sur-mesure.
            </p>
          </div>

          {/* Pages d'offre et guides : maillage interne vers les pages dédiées à chaque prestation */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4 text-foreground">
              Nos prestations
            </h3>
            <ul className="space-y-2 text-sm">
              {OFFER_LINKS.map((offer) => (
                <li key={offer.id}>
                  <Link
                    to={offer.path}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {offer.shortTitle}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/services?pole=si"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Architecture SI & MEGA HOPEX
                </Link>
              </li>
              <li>
                <Link
                  to="/guides"
                  className="text-foreground font-semibold hover:text-primary transition-colors"
                >
                  Guides pratiques
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4 text-foreground">
              Navigation
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Accueil
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/projets"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Réalisations
                </Link>
              </li>
              <li>
                <Link
                  to="/a-propos"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  À propos
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Contact & réservation
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4 text-foreground">
              Contact & localisation
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-1.5 flex-wrap">
                <span>Email :</span>
                <CopyEmailButton email="contact@ramsin.fr" />
              </li>
              <li>
                Téléphone :{" "}
                <a
                  href="tel:+33761518890"
                  className="text-foreground hover:text-primary font-medium"
                >
                  +33 (0)7 61 51 88 90
                </a>
              </li>
              <li>
                Localisation : Basés à Fresnes (94) · Interventions Paris, Île-de-France & Remote
              </li>
              {/* Fiche Google : liens affichés une fois les URL renseignées dans src/data/company.ts */}
              {GOOGLE_REVIEW_URL !== "" && (
                <li>
                  <a
                    href={GOOGLE_REVIEW_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-foreground hover:text-primary font-medium"
                  >
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500 shrink-0" /> Laisser un avis Google
                  </a>
                </li>
              )}
              {GOOGLE_BUSINESS_URL !== "" && (
                <li>
                  <a
                    href={GOOGLE_BUSINESS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-foreground hover:text-primary font-medium"
                  >
                    <MapPin className="w-3.5 h-3.5 text-primary shrink-0" /> Voir la fiche Google
                  </a>
                </li>
              )}
              <li className="pt-2 text-xs text-emerald-700 font-semibold flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500 shrink-0" />
                <span>Réponse assurée sous 24h ouvrées</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/60 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>© {currentYear} RAMSIN Conseil. Tous droits réservés.</p>
          <nav className="flex items-center gap-4" aria-label="Informations légales">
            <Link to="/mentions-legales" className="hover:text-primary transition-colors">Mentions légales</Link>
            <Link to="/confidentialite" className="hover:text-primary transition-colors">Politique de confidentialité</Link>
            {isGoogleTagConfigured && (
              <button type="button" onClick={openConsentBanner} className="hover:text-primary transition-colors">
                Gestion des cookies
              </button>
            )}
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
