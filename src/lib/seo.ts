import { createContext } from "react";

export const SITE_URL = "https://www.ramsin.fr";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;

export const DEFAULT_SEO = {
  title: "RAMSIN | Architecture SI (MEGA HOPEX) & Solutions Numériques Sur-Mesure",
  description:
    "Cabinet d'expertise en Architecture des Systèmes d'Information (MEGA HOPEX V5) et conception de solutions web & mobiles sur-mesure. Des décisions SI plus claires et des outils adaptés à vos enjeux.",
  keywords:
    "Architecture SI, MEGA HOPEX V5, Urbanisation SI, Cartographie applicative, Développement Web, Applications Mobiles, Next.js, React Native, Fresnes, Paris, DSI",
};

export interface SeoProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  noIndex?: boolean;
  /** Image de partage absolue (1200×630), og-image.jpg par défaut */
  image?: string;
  /** Données structurées schema.org propres à la page (une ou plusieurs entités) */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

export interface ResolvedSeo {
  title: string;
  description: string;
  keywords: string;
  robots: string;
  canonical?: string;
  image: string;
  jsonLd?: SeoProps["jsonLd"];
}

export const resolveSeo = ({
  title = DEFAULT_SEO.title,
  description = DEFAULT_SEO.description,
  keywords = DEFAULT_SEO.keywords,
  canonical,
  noIndex = false,
  image = DEFAULT_OG_IMAGE,
  jsonLd,
}: SeoProps): ResolvedSeo => ({
  title,
  description,
  keywords,
  robots: noIndex ? "noindex, nofollow" : "index, follow",
  canonical,
  image,
  jsonLd,
});

/**
 * Pendant le pré-rendu (src/entry-server.tsx), le composant SEO dépose ici les balises
 * de la page rendue ; hors pré-rendu le contexte vaut null et seules les balises du DOM sont mises à jour.
 */
export interface SeoCollector {
  seo?: ResolvedSeo;
}

export const SeoCollectorContext = createContext<SeoCollector | null>(null);

const escapeHtml = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Balises <head> gérées par le composant SEO, en HTML statique (mêmes sélecteurs que la mise à jour côté client). */
export const renderSeoHead = (seo: ResolvedSeo): string => {
  const meta = (attribute: "name" | "property", key: string, content: string) =>
    `<meta ${attribute}="${key}" content="${escapeHtml(content)}" />`;

  const tags = [
    `<title>${escapeHtml(seo.title)}</title>`,
    meta("name", "description", seo.description),
    meta("name", "keywords", seo.keywords),
    meta("name", "robots", seo.robots),
    seo.canonical && `<link rel="canonical" href="${escapeHtml(seo.canonical)}" />`,
    meta("property", "og:title", seo.title),
    meta("property", "og:description", seo.description),
    seo.canonical && meta("property", "og:url", seo.canonical),
    meta("property", "og:image", seo.image),
    meta("name", "twitter:title", seo.title),
    meta("name", "twitter:description", seo.description),
    meta("name", "twitter:image", seo.image),
    // "<" échappé pour qu'un texte contenant "</script>" ne puisse pas fermer la balise
    seo.jsonLd &&
      `<script id="page-jsonld" type="application/ld+json">${JSON.stringify(seo.jsonLd).replace(/</g, "\\u003c")}</script>`,
  ];

  return tags.filter(Boolean).join("\n    ");
};
