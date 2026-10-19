import { useContext, useEffect } from "react";
import { resolveSeo, SeoCollectorContext, type SeoProps } from "@/lib/seo";

export const SEO = (props: SeoProps) => {
  const seo = resolveSeo(props);
  const { title, description, keywords, robots, canonical, image, jsonLd } = seo;

  // Pré-rendu : les effets ne s'exécutent pas côté serveur, on transmet donc les balises au script de build
  const collector = useContext(SeoCollectorContext);
  if (collector) collector.seo = seo;

  useEffect(() => {
    // Modifier le titre de la page
    document.title = title;

    // Helper pour mettre à jour ou créer une balise meta
    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? "property" : "name";
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    updateMetaTag("description", description);
    updateMetaTag("keywords", keywords);
    updateMetaTag("robots", robots);
    updateMetaTag("og:title", title, true);
    updateMetaTag("og:description", description, true);
    updateMetaTag("og:image", image, true);
    updateMetaTag("twitter:title", title);
    updateMetaTag("twitter:description", description);
    updateMetaTag("twitter:image", image);

    // Mettre à jour l'URL canonique et og:url si fournie
    if (canonical) {
      updateMetaTag("og:url", canonical, true);

      let link: HTMLLinkElement | null = document.querySelector("link[rel='canonical']");
      if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", "canonical");
        document.head.appendChild(link);
      }
      link.setAttribute("href", canonical);
    }

    // Données structurées de la page (remplacées à chaque changement de page)
    const existing = document.getElementById("page-jsonld");
    if (jsonLd) {
      const script = existing ?? document.createElement("script");
      script.id = "page-jsonld";
      script.setAttribute("type", "application/ld+json");
      script.textContent = JSON.stringify(jsonLd);
      if (!existing) document.head.appendChild(script);
    } else if (existing) {
      existing.remove();
    }
  }, [title, description, keywords, canonical, robots, image, jsonLd]);

  return null;
};

export default SEO;
