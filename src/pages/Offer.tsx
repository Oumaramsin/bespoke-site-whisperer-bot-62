import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Calendar, CheckCircle2, Mail, Package, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import SEO from "@/components/SEO";
import CTASection from "@/components/CTASection";
import PoleProjects from "@/components/projects/PoleProjects";
import MethodSteps from "@/components/projects/MethodSteps";
import { getOffer } from "@/data/offers";
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
              <p className="text-sm sm:text-base md:text-lg text-slate-200 leading-relaxed">{offer.lead}</p>
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

        {/* PREUVES */}
        <PoleProjects pole={offer.pole} />

        {/* FAQ */}
        <section className="container mx-auto px-4 max-w-3xl space-y-8">
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
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
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
