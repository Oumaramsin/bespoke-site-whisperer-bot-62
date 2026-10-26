import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import SEO from "@/components/SEO";
import CTASection from "@/components/CTASection";
import { GUIDES, formatGuideDate } from "@/data/guides";
import { SITE_URL } from "@/lib/seo";

const GUIDES_JSONLD = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE_URL}/guides` },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: GUIDES.map((g, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: g.title,
      url: `${SITE_URL}/guides/${g.slug}`,
    })),
  },
];

/** Index des guides pratiques */
export const Guides = () => (
  <>
    <SEO
      title="Guides : application, site web & architecture SI | RAMSIN"
      description="Guides courts et concrets pour porteurs de projet et DSI : cahier des charges d'application, choix de technologie, site vitrine ou boutique, cartographie SI."
      canonical={`${SITE_URL}/guides`}
      jsonLd={GUIDES_JSONLD}
    />

    <section className="relative overflow-hidden border-b border-border/60 pt-12 pb-14 md:pt-16 md:pb-16">
      <div className="absolute inset-0 -z-10 dot-grid-pattern pointer-events-none" />
      <div className="container mx-auto px-4 text-center max-w-3xl space-y-5">
        <Badge variant="outline" className="px-3.5 py-1 text-xs border-primary/30 text-primary font-semibold">
          <BookOpen className="w-3.5 h-3.5 mr-1 inline" /> Ressources
        </Badge>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-[1.15]">
          Guides pratiques
          <span className="block gradient-text mt-2 pb-2">pour décider avant de se lancer</span>
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
          Les questions que l'on nous pose avant un projet, avec des réponses directes et sans jargon : pour les porteurs de projet
          web et mobile comme pour les DSI.
        </p>
      </div>
    </section>

    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4 max-w-5xl grid gap-6 md:grid-cols-2">
        {GUIDES.map((g) => (
          <Link
            key={g.slug}
            to={`/guides/${g.slug}`}
            className="flex flex-col justify-between p-6 rounded-2xl glass-card border border-border/80 hover-lift space-y-3"
          >
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-primary">{g.kicker}</span>
              <h2 className="text-lg sm:text-xl font-extrabold text-foreground leading-snug">{g.title}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{g.description}</p>
            </div>
            <div className="flex items-center justify-between gap-3 pt-2 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" /> {g.readingMinutes} min · {formatGuideDate(g.dateModified)}
              </span>
              <span className="inline-flex items-center gap-1 text-sm font-bold text-primary">
                Lire <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>

    <CTASection
      title="Une question que ces guides ne couvrent pas ?"
      subtitle="Posez-la lors d'un échange de 30 minutes, offert et sans engagement."
    />
  </>
);

export default Guides;
