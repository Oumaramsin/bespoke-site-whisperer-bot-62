// Pré-rendu statique (dernière étape de `npm run build`).
// À partir du build client (dist/) et du build SSR (dist-ssr/entry-server.js), écrit pour chaque route
// un HTML complet : contenu de la page + <title>, description, canonical, og:*, twitter:* et JSON-LD,
// ainsi que dist/404.html pour les URL inconnues.
// Les réseaux sociaux (LinkedIn, WhatsApp, Slack, Facebook) lisent ces balises sans exécuter de JavaScript.
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distDir = path.join(root, "dist");
const ssrDir = path.join(root, "dist-ssr");

const { render, PRERENDER_ROUTES, NOT_FOUND_ROUTE, SITE_URL } = await import(
  pathToFileURL(path.join(ssrDir, "entry-server.js")).href
);

const builtIndex = await fs.readFile(path.join(distDir, "index.html"), "utf8");

// Feuille de style principale intégrée dans le HTML : plus de requête bloquante avant le premier affichage
const CSS_LINK = /<link\s+rel="stylesheet"[^>]*href="(\/assets\/[^"]+\.css)"[^>]*>/;
const cssMatch = builtIndex.match(CSS_LINK);
if (!cssMatch) throw new Error("dist/index.html : feuille de style principale introuvable");
const css = await fs.readFile(path.join(distDir, cssMatch[1]), "utf8");
// JavaScript chargé juste après le premier affichage : le HTML pré-rendu est complet et lisible sans lui,
// il ne sert qu'à l'interactivité. Les balises sont retirées pour que le navigateur ne le télécharge pas
// avant d'avoir affiché la page, puis réinjectées au premier affichage (signal first-contentful-paint),
// immédiatement si l'onglet est masqué, et au plus tard après 1,5 s.
const MAIN_SCRIPT = /\s*<script type="module"[^>]*src="([^"]+)"[^>]*><\/script>/;
const MODULE_PRELOADS = /\s*<link rel="modulepreload"[^>]*href="([^"]+)"[^>]*>/g;
const mainScript = builtIndex.match(MAIN_SCRIPT)?.[1];
if (!mainScript) throw new Error("dist/index.html : script principal introuvable");
const preloads = [...builtIndex.matchAll(MODULE_PRELOADS)].map((m) => m[1]);
const loader = `<script>(function(){var done=false;var go=function(){if(done)return;done=true;${JSON.stringify(preloads)}.forEach(function(h){var l=document.createElement("link");l.rel="modulepreload";l.href=h;l.crossOrigin="";document.head.appendChild(l)});var s=document.createElement("script");s.type="module";s.crossOrigin="";s.src=${JSON.stringify(mainScript)};document.body.appendChild(s)};if(document.visibilityState==="hidden"){go();return}try{new PerformanceObserver(function(list){if(list.getEntriesByName("first-contentful-paint").length)setTimeout(go,0)}).observe({type:"paint",buffered:true})}catch(e){}setTimeout(go,1500)})();</script>`;
const template = builtIndex
  .replace(CSS_LINK, () => `<style>${css}</style>`)
  .replace(MAIN_SCRIPT, "")
  .replace(MODULE_PRELOADS, "")
  .replace("</body>", () => `${loader}\n</body>`);

// Balises gérées par le composant SEO : retirées du gabarit puis réécrites pour chaque page
const SEO_SLOT = "<!--seo-head-->";
const ROOT_DIV = '<div id="root"></div>';
const MANAGED_TAGS = [
  /<meta\s+name="(description|keywords|robots|twitter:title|twitter:description|twitter:image)"[^>]*>\s*/g,
  /<meta\s+property="og:(title|description|url|image)"[^>]*>\s*/g,
  /<link\s+rel="canonical"[^>]*>\s*/g,
];
const pageTemplate = MANAGED_TAGS.reduce(
  (html, tag) => html.replace(tag, ""),
  template.replace(/<title>[\s\S]*?<\/title>/, SEO_SLOT)
);
if (!pageTemplate.includes(SEO_SLOT) || !pageTemplate.includes(ROOT_DIV)) {
  throw new Error("dist/index.html : <title> ou <div id=\"root\"></div> introuvable");
}

const writePage = async (route, file, { html, head }) => {
  // Remplacements par fonction : le contenu peut contenir des motifs "$&" ou "$'"
  const page = pageTemplate
    .replace(SEO_SLOT, () => head)
    .replace(ROOT_DIV, () => `<div id="root">${html}</div>`);

  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, page);
  console.log(`prerender  ${route.padEnd(36)} → ${path.relative(root, file)}`);
};

// URL indexables (robots « index ») : elles forment le sitemap, généré au build pour ne jamais diverger des routes
const sitemapUrls = [];

for (const route of PRERENDER_ROUTES) {
  const result = await render(route);

  // Garde-fou : une route qui retombe sur la 404 ou dont la canonical ne correspond pas fait échouer le build
  const expectedCanonical = `${SITE_URL}${route}`;
  if (!result.head || result.seo.canonical !== expectedCanonical) {
    throw new Error(`${route} : canonical "${result.seo?.canonical}" attendue "${expectedCanonical}"`);
  }

  await writePage(route, path.join(distDir, route === "/" ? "" : route.slice(1), "index.html"), result);
  if (result.seo.robots.startsWith("index")) sitemapUrls.push(expectedCanonical);
}

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...sitemapUrls.map((url) => `  <url><loc>${url}</loc></url>`),
  "</urlset>",
  "",
].join("\n");
await fs.writeFile(path.join(distDir, "sitemap.xml"), sitemap);
console.log(`sitemap    ${String(sitemapUrls.length).padEnd(36)} → dist/sitemap.xml`);

// Page 404 : Vercel sert dist/404.html, avec le statut 404, pour toute URL sans fichier correspondant.
// Rendue sur une URL inexistante (route "*" → NotFound) ; le client l'hydrate quelle que soit l'URL demandée.
const notFound = await render(NOT_FOUND_ROUTE);
if (!notFound.head || notFound.seo.canonical || !notFound.seo.robots.startsWith("noindex")) {
  throw new Error(`${NOT_FOUND_ROUTE} : la page 404 doit être en noindex et sans canonical`);
}
await writePage(NOT_FOUND_ROUTE, path.join(distDir, "404.html"), notFound);

await fs.rm(ssrDir, { recursive: true, force: true });
