import { useEffect } from "react";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
}

export const SEO = ({
  title = "RAMSIN | Architecture des SI & Expert MEGA Hopex",
  description = "Conseil et expertise en Architecture des Systèmes d'Information, administration avancée MEGA Hopex, Product Ownership et conduite du changement DSI.",
  keywords = "Architecture SI, MEGA Hopex, Consultant SI, Product Owner, DSI, Cartographie applicative, Paris, Transformation digitale",
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
