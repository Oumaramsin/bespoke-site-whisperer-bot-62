import { useEffect } from "react";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
}

export const SEO = ({
  title = "RAMSIN | Architecture SI (MEGA HOPEX) & Solutions Numériques Sur-Mesure",
  description = "Cabinet d'expertise en Architecture des Systèmes d'Information (MEGA HOPEX V5) et conception de solutions web & mobiles sur-mesure. Des décisions SI plus claires et des outils adaptés à vos enjeux.",
  keywords = "Architecture SI, MEGA HOPEX V5, Urbanisation SI, Cartographie applicative, Développement Web, Applications Mobiles, Next.js, React Native, Fresnes, Paris, DSI",
  canonical,
}: SEOProps) => {
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
    updateMetaTag("og:title", title, true);
    updateMetaTag("og:description", description, true);
    updateMetaTag("twitter:title", title);
    updateMetaTag("twitter:description", description);

    // Mettre à jour l'URL canonique si fournie
    if (canonical) {
      let link: HTMLLinkElement | null = document.querySelector("link[rel='canonical']");
      if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", "canonical");
        document.head.appendChild(link);
      }
      link.setAttribute("href", canonical);
    }
  }, [title, description, keywords, canonical]);

  return null;
};

export default SEO;
