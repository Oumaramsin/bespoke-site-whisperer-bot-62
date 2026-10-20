import { Link } from "react-router-dom";
import SEO from "@/components/SEO";

/** Champ à renseigner par RAMSIN avant la mise en ligne (volontairement visible) */
const ToFill = ({ label }: { label: string }) => (
  <mark className="bg-amber-200/70 text-amber-950 rounded px-1.5 py-0.5 font-semibold">[{label} — à compléter]</mark>
);

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="space-y-3">
    <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">{title}</h2>
    <div className="space-y-3 text-foreground/85 leading-relaxed">{children}</div>
  </section>
);

const LegalLayout = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="container mx-auto px-4 max-w-3xl py-12 md:py-16 space-y-10">
    <div className="space-y-3">
      <Link to="/" className="text-sm font-semibold text-primary hover:underline">← Retour à l'accueil</Link>
      <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">{title}</h1>
      <p className="text-sm text-muted-foreground">Dernière mise à jour : octobre 2026</p>
    </div>
    {children}
  </div>
);

export const MentionsLegales = () => (
  <>
    <SEO title="Mentions légales | RAMSIN Conseil" description="Mentions légales du site ramsin.fr : éditeur, hébergeur et propriété intellectuelle." canonical="https://www.ramsin.fr/mentions-legales" />
    <LegalLayout title="Mentions légales">
      <Section title="Éditeur du site">
        <p>
          <strong>RAMSIN Conseil SAS</strong>, société par actions simplifiée au capital de <ToFill label="capital social" />,
          immatriculée au RCS de <ToFill label="ville du RCS" /> sous le numéro <ToFill label="SIREN" />.
        </p>
        <p>Siège social : <ToFill label="adresse complète" />, 94260 Fresnes, France.</p>
        <p>Numéro de TVA intracommunautaire : <ToFill label="n° TVA" /></p>
        <p>
          Contact : <a href="mailto:contact@ramsin.fr" className="text-primary font-semibold">contact@ramsin.fr</a> ·{" "}
          <a href="tel:+33761518890" className="text-primary font-semibold">+33 (0)7 61 51 88 90</a>
        </p>
        <p>Directeur de la publication : Oumar Sidibé, président.</p>
      </Section>

      <Section title="Hébergement">
        <p>Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis — vercel.com</p>
      </Section>

      <Section title="Propriété intellectuelle">
        <p>
          L'ensemble des contenus de ce site (textes, visuels, vidéos, logo) est la propriété de RAMSIN Conseil ou de ses clients,
          qui ont autorisé leur présentation. Toute reproduction sans autorisation préalable est interdite.
        </p>
        <p>
          Les visuels des missions d'architecture SI sont des illustrations : les livrables réels de ces missions sont confidentiels.
          Les marques et logos cités appartiennent à leurs propriétaires respectifs.
        </p>
      </Section>

      <Section title="Données personnelles">
        <p>
          Le traitement des données transmises via les formulaires est détaillé dans la{" "}
          <Link to="/confidentialite" className="text-primary font-semibold">politique de confidentialité</Link>.
        </p>
      </Section>
    </LegalLayout>
  </>
);

export const Confidentialite = () => (
  <>
    <SEO title="Politique de confidentialité | RAMSIN Conseil" description="Comment RAMSIN Conseil collecte, utilise et protège les données transmises via ramsin.fr." canonical="https://www.ramsin.fr/confidentialite" />
    <LegalLayout title="Politique de confidentialité">
      <Section title="Responsable du traitement">
        <p>RAMSIN Conseil SAS, Fresnes (94260) — contact : <a href="mailto:contact@ramsin.fr" className="text-primary font-semibold">contact@ramsin.fr</a>.</p>
      </Section>

      <Section title="Données collectées et finalités">
        <p>
          <strong>Formulaire de contact</strong> : nom, adresse email, entreprise et téléphone (facultatifs), domaine du projet, délai et message.
          Ces informations servent uniquement à répondre à votre demande et à préparer un éventuel échange. Base légale : votre demande
          (mesures précontractuelles).
        </p>
        <p>
          <strong>Prise de rendez-vous</strong> : la réservation des 30 minutes offertes passe par Calendly, qui traite vos données selon sa
          propre politique de confidentialité.
        </p>
        <p>
          <strong>Mesure d'audience</strong> : aucun cookie publicitaire n'est déposé. Des statistiques de visite anonymes peuvent être
          mesurées pour améliorer le site.
        </p>
      </Section>

      <Section title="Destinataires">
        <p>
          Les messages du formulaire sont transmis par email à RAMSIN Conseil via le service d'envoi Resend. Vos données ne sont jamais
          vendues ni cédées à des tiers.
        </p>
      </Section>

      <Section title="Durée de conservation">
        <p>Les données de contact sont conservées au maximum 3 ans après le dernier échange, puis supprimées.</p>
      </Section>

      <Section title="Vos droits">
        <p>
          Vous pouvez accéder à vos données, les rectifier, les supprimer, vous opposer à leur traitement ou en demander la portabilité en
          écrivant à <a href="mailto:contact@ramsin.fr" className="text-primary font-semibold">contact@ramsin.fr</a>. Vous pouvez aussi
          adresser une réclamation à la CNIL (cnil.fr).
        </p>
      </Section>
    </LegalLayout>
  </>
);
