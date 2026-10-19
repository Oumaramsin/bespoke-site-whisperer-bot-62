// Point d'entrée du pré-rendu (build SSR lancé par `npm run build`, exploité par scripts/prerender.mjs).
// N'est jamais chargé par le navigateur.
import { Writable } from "node:stream";
import { renderToPipeableStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import App from "./App";
import { PROJECTS_DATA } from "./data/projects";
import { renderSeoHead, SeoCollectorContext, SITE_URL, type ResolvedSeo, type SeoCollector } from "./lib/seo";

/** Routes servies en HTML statique ; les autres URL reçoivent dist/404.html (statut 404), sauf redirections de vercel.json. */
export const PRERENDER_ROUTES = [
  "/",
  "/services",
  "/projets",
  ...PROJECTS_DATA.map((project) => `/projets/${project.id}`),
  "/a-propos",
  "/contact",
  "/mentions-legales",
  "/confidentialite",
];

/** URL inexistante utilisée pour rendre la page NotFound dans dist/404.html */
export const NOT_FOUND_ROUTE = "/404";

export { SITE_URL };

export interface RenderResult {
  /** Contenu de <div id="root"> */
  html: string;
  /** Balises <head> de la page, null si aucun composant SEO n'a été rendu */
  head: string | null;
  seo?: ResolvedSeo;
}

export const render = (url: string): Promise<RenderResult> =>
  new Promise((resolve, reject) => {
    const collector: SeoCollector = {};
    const chunks: Buffer[] = [];
    const sink = new Writable({
      write(chunk, _encoding, callback) {
        chunks.push(Buffer.from(chunk));
        callback();
      },
      final(callback) {
        callback();
        resolve({
          html: Buffer.concat(chunks).toString("utf8"),
          head: collector.seo ? renderSeoHead(collector.seo) : null,
          seo: collector.seo,
        });
      },
    });

    const { pipe } = renderToPipeableStream(
      <SeoCollectorContext.Provider value={collector}>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </SeoCollectorContext.Provider>,
      {
        // On attend la résolution de toutes les pages chargées en lazy() pour obtenir un HTML complet
        onAllReady: () => pipe(sink),
        onShellError: reject,
        onError: reject,
      }
    );
  });
