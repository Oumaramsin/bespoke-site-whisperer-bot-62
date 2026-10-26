import { Link, useParams } from "react-router-dom";
import { ArrowRight, Calendar, Clock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import NotFound from "@/pages/NotFound";
import { GUIDES, formatGuideDate, getGuide } from "@/data/guides";
import { SITE_URL } from "@/lib/seo";
import { openBooking } from "@/lib/calendly";

/** Article d'un guide pratique */
export const Guide = () => {
  const { slug = "" } = useParams<{ slug: string }>();
  const guide = getGuide(slug);

  // Slug inconnu : Vercel répond avec dist/404.html (page NotFound pré-rendue), le client doit afficher la même chose
  if (!guide) return <NotFound />;

  const offer = guide.related;
  const url = `${SITE_URL}/guides/${guide.slug}`;
  const others = GUIDES.filter((g) => g.slug !== guide.slug).slice(0, 3);

  const book = () => openBooking(`guide_${guide.slug}`);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE_URL}/guides` },
        { "@type": "ListItem", position: 3, name: guide.title, item: url },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: guide.title,
      description: guide.description,
      inLanguage: "fr-FR",
      datePublished: guide.datePublished,
      dateModified: guide.dateModified,
      author: { "@type": "Organization", name: "RAMSIN Conseil", url: SITE_URL },
      publisher: {
        "@type": "Organization",
        name: "RAMSIN Conseil",
        url: SITE_URL,
        logo: { "@type": "ImageObject", url: `${SITE_URL}/apple-touch-icon.png` },
      },
      image: `${SITE_URL}/og-image.jpg`,
      mainEntityOfPage: url,
      articleSection: guide.kicker,
    },
  ];

  return (
    <>
      <SEO title={guide.seoTitle} description={guide.description} canonical={url} jsonLd={jsonLd} />

      <article className="py-10 md:py-16">
        <div className="container mx-auto px-4 max-w-3xl space-y-8">
          <nav aria-label="Fil d'Ariane" className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">Accueil</Link>
            <span aria-hidden="true">/</span>
            <Link to="/guides" className="hover:text-primary transition-colors">Guides</Link>
            <span aria-hidden="true">/</span>
            <span className="font-semibold text-foreground">{guide.kicker.replace(/^Guide · /, "")}</span>
          </nav>

          <header className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">{guide.kicker}</span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.15]">{guide.title}</h1>
            <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs sm:text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" /> Par{" "}
                <Link to="/a-propos" className="font-semibold text-foreground hover:text-primary">RAMSIN Conseil</Link>
              </span>
              <span>{formatGuideDate(guide.dateModified)}</span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" /> {guide.readingMinutes} min de lecture
              </span>
            </p>
            <p className="text-base sm:text-lg text-foreground/90 leading-relaxed font-medium border-l-4 border-[#C7F36B] pl-4">
              {guide.intro}
            </p>
          </header>

          <div className="space-y-10">
            {guide.sections.map((section) => (
              <section key={section.heading} className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-extrabold text-foreground">{section.heading}</h2>
                {section.paragraphs?.map((p) => (
                  <p key={p} className="text-base text-foreground/90 leading-relaxed">{p}</p>
                ))}
                {section.list && (
                  <ul className="space-y-2.5 pl-1">
                    {section.list.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-base text-foreground/90 leading-relaxed">
                        <span aria-hidden="true" className="mt-2.5 w-1.5 h-1.5 rounded-full bg-[#123A35] shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {section.after?.map((p) => (
                  <p key={p} className="text-base text-foreground/90 leading-relaxed">{p}</p>
                ))}
              </section>
            ))}

            <section className="rounded-2xl bg-secondary/60 border border-border/80 p-6 space-y-2">
              <h2 className="text-lg font-extrabold text-foreground">En résumé</h2>
              <p className="text-base text-foreground/90 leading-relaxed">{guide.conclusion}</p>
            </section>
          </div>

          {/* APPEL À L'ACTION */}
          <aside className="rounded-3xl bg-gradient-to-br from-[#0c2420] via-[#15463f] to-[#0d2e29] text-white p-7 sm:p-8 space-y-4 border-2 border-emerald-500/30">
            <h2 className="text-xl sm:text-2xl font-extrabold">{guide.cta.title}</h2>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed">{guide.cta.text}</p>
            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <Button variant="lime" size="lg" className="rounded-xl gap-2 cursor-pointer font-extrabold" onClick={book}>
                <Calendar className="w-4 h-4" /> Réserver 30 min offertes
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-xl gap-2 bg-transparent text-white border-white/30 hover:bg-white/10 hover:text-white">
                <Link to={offer.path}>
                  Voir l'offre : {offer.label} <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </aside>

          {/* AUTRES GUIDES */}
          <nav aria-label="Autres guides" className="space-y-3 pt-4 border-t border-border/60">
            <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">À lire aussi</h2>
            <ul className="space-y-2">
              {others.map((g) => (
                <li key={g.slug}>
                  <Link to={`/guides/${g.slug}`} className="inline-flex items-start gap-2 text-sm font-semibold text-foreground hover:text-primary">
                    <ArrowRight className="w-4 h-4 mt-0.5 shrink-0 text-primary" /> {g.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </article>
    </>
  );
};

export default Guide;
