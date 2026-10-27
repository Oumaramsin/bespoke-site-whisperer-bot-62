import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Calendar, CheckCircle2, Clock, Mail, Package, Tag, UserRound, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import SEO from "@/components/SEO";
import CTASection from "@/components/CTASection";
import PoleProjects from "@/components/projects/PoleProjects";
import MethodSteps from "@/components/projects/MethodSteps";
import GuaranteesSection from "@/components/index/GuaranteesSection";
import GoogleReviewsBadge from "@/components/GoogleReviewsBadge";
import { getOffer } from "@/data/offers";
import { PRICE_NOTES, PRICE_TIERS, formatSpan, formatTier, headlineTiers, lowerFirst } from "@/data/pricing";
import { GUIDES } from "@/data/guides";
import type { OfferId } from "@/data/offerRoutes";
import { SITE_URL } from "@/lib/seo";
import { trackConversionEvent } from "@/lib/analytics";
import { openBooking } from "@/lib/calendly";

/** Page d'offre : une prestation, une URL, un H1 — page d'atterrissage des annonces et des recherches précises */
export const Offer = ({ id }: { id: OfferId }) => {
  const offer = getOffer(id);
  const guides = GUIDES.filter((g) => offer.relatedGuides.includes(g.slug));
  const url = `${SITE_URL}${offer.path}`;
  const si = offer.pole === "si";
  const tiers = PRICE_TIERS[offer.id];
  const lowestTier = tiers[0];
  const highestTier = tiers[tiers.length - 1];
  const headline = headlineTiers(offer.id);
  const priceNote = PRICE_NOTES[offer.id];

  const book = () => openBooking(`offer_${offer.id}`);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services` },
        { "@type": "ListItem", position: 3, name: offer.shortTitle, item: url },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: offer.schema.name,
      serviceType: offer.schema.serviceType,
      description: offer.seoDescription,
      url,
      provider: { "@type": "ProfessionalService", name: "RAMSIN Conseil", url: SITE_URL },
      areaServed: ["Paris", "Île-de-France", "France"],
      offers: {
        "@type": "Offer",
        url,
        priceSpecification: {
          "@type": "PriceSpecification",
          ...(lowestTier.min !== undefined && { minPrice: lowestTier.min }),
          ...(highestTier.max !== undefined && { maxPrice: highestTier.max }),
          priceCurrency: "EUR",
          valueAddedTaxIncluded: false,
        },
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: offer.faq.map(({ q, a }) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
    },
  ];

  return (
    <>
      <SEO title={offer.seoTitle} description={offer.seoDescription} canonical={url} jsonLd={jsonLd} />

      {/* EN-TÊTE */}
      <section className="relative overflow-hidden border-b border-border/60 pt-8 pb-12 md:pt-12 md:pb-16">
        <div className="absolute inset-0 -z-10 dot-grid-pattern pointer-events-none" />
        <div className="container mx-auto px-4 max-w-5xl space-y-6">
          <nav aria-label="Fil d'Ariane" className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">Accueil</Link>
            <span aria-hidden="true">/</span>
            <Link to={`/services?pole=${offer.pole}`} className="hover:text-primary transition-colors">Services</Link>
            <span aria-hidden="true">/</span>
            <span className="font-semibold text-foreground">{offer.shortTitle}</span>
          </nav>

          <div
            className={`p-8 sm:p-10 rounded-3xl text-white border-2 shadow-2xl relative overflow-hidden ${
              si
                ? "bg-gradient-to-br from-[#071916] via-[#123A35] to-[#0a2622] border-[#123A35]/40"
                : "bg-gradient-to-br from-[#0c2420] via-[#15463f] to-[#0d2e29] border-emerald-500/30"
            }`}
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#C7F36B]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 max-w-3xl space-y-4">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#C7F36B] bg-[#C7F36B]/15 border border-[#C7F36B]/30 px-3 py-1 rounded-full">
                {offer.kicker}
              </span>
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-white">
                {offer.h1}
              </h1>
              {/* Sur mobile, l'accroche longue est masquée pour que les délais et le bouton restent dans le premier écran */}
              <p className="hidden sm:block text-sm sm:text-base md:text-lg text-slate-200 leading-relaxed">{offer.lead}</p>
              {offer.timing && (
                <p className="flex items-start gap-2 text-sm text-white font-semibold leading-relaxed">
                  <Clock className="w-4 h-4 text-[#C7F36B] shrink-0 mt-0.5" /> {offer.timing}
                </p>
              )}
              {/* Ordre de prix : le premier frein des visiteurs était de ne trouver aucun prix avant l'appel.
                  Le prix dépend de la taille du projet : on renvoie vers les fourchettes détaillées plus bas.
                  Pour les applications, on montre la première version et l'application complète plutôt que l'étendue entière. */}
              <p className="flex items-start gap-2 text-sm text-slate-200 leading-relaxed">
                <Tag className="w-4 h-4 text-[#C7F36B] shrink-0 mt-0.5" />
                <span>
                  {headline.length > 0 ? (
                    headline.map((tier, i) => (
                      <span key={tier.name}>
                        {i > 0 && ", "}
                        {i === 0 ? tier.name : lowerFirst(tier.name)} :{" "}
                        <strong className="text-white font-extrabold">{formatTier(tier)}</strong>
                      </span>
                    ))
                  ) : (
                    <>
                      Selon la taille du projet :{" "}
                      <strong className="text-white font-extrabold">{formatSpan(offer.id)}</strong>
                    </>
                  )}
                  .{" "}
                  <a href="#prix" className="underline underline-offset-2 text-[#C7F36B] hover:text-white">
                    Voir les fourchettes
                  </a>
                </span>
              </p>
              <GoogleReviewsBadge dark />
              <ul className="pt-2 flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-200 font-medium">
                {offer.highlights.map((h) => (
                  <li key={h} className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#C7F36B] shrink-0" /> {h}
                  </li>
                ))}
              </ul>
              <div className="pt-3 flex flex-col sm:flex-row gap-3">
                <Button variant="lime" size="lg" className="rounded-xl gap-2 cursor-pointer font-extrabold" onClick={book}>
                  <Calendar className="w-4 h-4" /> Réserver 30 min offertes
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="rounded-xl gap-2 bg-transparent text-white border-white/30 hover:bg-white/10 hover:text-white"
                >
                  <Link
                    to={`/contact?tunnel=form&service=${offer.serviceParam}`}
                    onClick={() => trackConversionEvent("click_switch_to_written_form", { source: `offer_${offer.id}` })}
                  >
                    <Mail className="w-4 h-4" /> Décrire mon projet par écrit
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GARANTIES ÉCRITES : la réponse au premier frein des prospects (« et si le prestataire disparaît ? ») */}
      {!si && <GuaranteesSection />}

      <div className="py-12 md:py-20 space-y-16 md:space-y-24">
        {/* POUR QUI */}
        <section className="container mx-auto px-4 max-w-5xl space-y-6">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">Pour qui ?</h2>
            <p className="text-sm sm:text-base text-muted-foreground">Les situations dans lesquelles cette prestation est la bonne réponse.</p>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {offer.audience.map((item) => (
              <li key={item} className="flex items-start gap-3 p-4 rounded-2xl glass-card border border-border/80 text-sm text-foreground/90 leading-relaxed">
                <Users className={`w-5 h-5 shrink-0 mt-0.5 ${si ? "text-[#123A35]" : "text-emerald-700"}`} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* CE QUE VOUS OBTENEZ */}
        <section className="container mx-auto px-4 max-w-5xl space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">Ce que vous obtenez</h2>
            <p className="text-sm sm:text-base text-muted-foreground">Des livrables concrets, à votre nom, que vous pouvez vérifier.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {offer.deliverables.map((d) => (
              <div key={d.title} className="p-6 rounded-2xl glass-card border border-border/80 space-y-2.5 hover-lift">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${si ? "bg-[#123A35]/10 text-[#123A35]" : "bg-emerald-500/10 text-emerald-700"}`}>
                  <Package className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-foreground">{d.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{d.text}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-muted-foreground">
            <strong>Technologies :</strong> {offer.stack}
          </p>
        </section>

        {/* COMBIEN ÇA COÛTE : des fourchettes par taille de projet, jamais un prix unique (ancre #prix de l'en-tête) */}
        <section id="prix" className="scroll-mt-20 container mx-auto px-4 max-w-5xl space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">Combien ça coûte ?</h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              Le prix dépend de la taille de votre projet. Voici les ordres de prix habituels, hors taxes.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {tiers.map((tier) => (
              <div key={tier.name} className="p-6 rounded-2xl glass-card border border-border/80 space-y-2">
                <h3 className="text-base font-bold text-foreground">{tier.name}</h3>
                <p className="text-xl font-extrabold text-emerald-700">{formatTier(tier)}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{tier.examples}</p>
              </div>
            ))}
          </div>
          {priceNote && (
            <p className="max-w-3xl mx-auto text-center text-sm sm:text-base font-semibold text-foreground leading-relaxed">{priceNote}</p>
          )}
          <p className="max-w-3xl mx-auto text-center text-sm text-muted-foreground leading-relaxed">
            Le prix ferme est écrit dans le devis envoyé sous 48 h, après l'échange de 30 minutes. Rien n'est ajouté sans
            votre accord écrit, et vous payez par étapes, chacune seulement après l'avoir testée.
          </p>
          <p className="max-w-3xl mx-auto text-center text-sm font-semibold text-foreground leading-relaxed">
            Petit budget ou idée à tester ? Dites-le dès le premier échange : nous vous proposons la version la plus simple
            qui suffit pour démarrer, ou nous vous orientons vers une solution toute faite comme Shopify si c'est plus raisonnable.
          </p>
        </section>

        {/* QUI RÉALISE LE PROJET : remonté juste après les prix, car « il est seul » est le premier doute après le prix */}
        {!si && (
          <section className="container mx-auto px-4 max-w-3xl">
            <div className="p-6 sm:p-8 rounded-3xl glass-card border border-border/80 space-y-3">
              <h2 className="flex items-center gap-2.5 text-xl sm:text-2xl font-extrabold text-foreground">
                <UserRound className="w-6 h-6 text-emerald-700 shrink-0" /> Qui réalise votre projet
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Votre projet est conçu et développé par le fondateur de RAMSIN, développeur et ancien consultant SI pour de
                grands comptes (Covéa, La Banque Postale). Un seul interlocuteur, du premier appel à la mise en ligne, sur un
                groupe WhatsApp dédié. Deux projets à la fois au maximum, pour tenir les dates écrites dans chaque devis.
              </p>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Et si, un jour, il n'était plus disponible : votre code est déposé chaque semaine sur votre compte, avec une
                documentation de reprise, et vous n'avez payé que les étapes testées. Un autre développeur peut reprendre sans
                repartir de zéro.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <GoogleReviewsBadge />
                <Link to="/a-propos" className="inline-flex items-center gap-1 text-sm font-bold text-primary">
                  En savoir plus sur RAMSIN <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </section>
        )}


        {/* MÉTHODE */}
        <section className="container mx-auto px-4 max-w-5xl space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
              {si ? "Comment se déroule une mission" : "Comment se déroule votre projet"}
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              {si
                ? "Une démarche cadrée, collaborative et transparente, du premier échange à la restitution finale."
                : "Vous suivez l'avancement chaque semaine, en langage clair, sans intermédiaire."}
            </p>
          </div>
          {offer.steps ? (
            <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {offer.steps.map((step, i) => (
                <li key={step.title} className="p-5 rounded-2xl glass-card border border-border/80 space-y-2">
                  <span className="text-2xl font-black text-[#123A35] opacity-60 block">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="text-base font-bold text-foreground">{step.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{step.text}</p>
                </li>
              ))}
            </ol>
          ) : (
            <MethodSteps />
          )}
        </section>

        {/* PREUVES : uniquement des projets du même type que l'offre */}
        <PoleProjects
          pole={offer.pole}
          ids={offer.relatedProjects}
          title={offer.relatedProjects.length === 1 ? "Un projet similaire" : "Des projets similaires"}
        />

        {/* FAQ (ancre #faq : lien annexe « Combien ça coûte » des annonces) */}
        <section id="faq" className="scroll-mt-20 container mx-auto px-4 max-w-3xl space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Questions fréquentes</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">Avant de vous lancer</h2>
          </div>
          <Accordion type="single" collapsible className="space-y-3">
            {offer.faq.map(({ q, a }, i) => (
              <AccordionItem key={q} value={`faq-${i}`} className="rounded-2xl border border-border/80 bg-card px-5">
                <AccordionTrigger className="text-left font-bold hover:no-underline">{q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">{a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* GUIDES LIÉS */}
        {guides.length > 0 && (
          <section className="container mx-auto px-4 max-w-5xl space-y-6">
            <div className="text-center space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Pour aller plus loin</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">Nos guides sur le sujet</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {guides.map((g) => (
                <Link
                  key={g.slug}
                  to={`/guides/${g.slug}`}
                  className="block p-5 rounded-2xl glass-card border border-border/80 hover-lift space-y-2"
                >
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    <BookOpen className="w-3.5 h-3.5" /> {g.kicker} · {g.readingMinutes} min
                  </span>
                  <h3 className="text-base font-bold text-foreground leading-snug">{g.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{g.description}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-bold text-primary">
                    Lire le guide <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>

      <CTASection
        title={si ? "Une mission d'architecture SI ou un besoin MEGA HOPEX ?" : "Parlons de votre projet"}
        subtitle="Un premier échange de 30 minutes, offert et sans engagement, pour poser le périmètre, les étapes et le calendrier."
      />
    </>
  );
};

export default Offer;
