// Pré-rendu statique (dernière étape de `npm run build`).
// À partir du build client (dist/) et du build SSR (dist-ssr/entry-server.js), écrit pour chaque route
// un HTML complet : contenu de la page + <title>, description, canonical, og:*, twitter:* et JSON-LD.
// Les réseaux sociaux (LinkedIn, WhatsApp, Slack, Facebook) lisent ces balises sans exécuter de JavaScript.
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distDir = path.join(root, "dist");
const ssrDir = path.join(root, "dist-ssr");

const { render, PRERENDER_ROUTES, SITE_URL } = await import(
  pathToFileURL(path.join(ssrDir, "entry-server.js")).href
);

const template = await fs.readFile(path.join(distDir, "index.html"), "utf8");

// Coquille SPA intacte pour les URL non pré-rendues (404, /projects, /about…) : voir la rewrite de vercel.json
await fs.writeFile(path.join(distDir, "spa-fallback.html"), template);

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

for (const route of PRERENDER_ROUTES) {
  const { html, head, seo } = await render(route);

  // Garde-fou : une route qui retombe sur la 404 ou dont la canonical ne correspond pas fait échouer le build
  const expectedCanonical = `${SITE_URL}${route}`;
  if (!head || seo.canonical !== expectedCanonical) {
    throw new Error(`${route} : canonical "${seo?.canonical}" attendue "${expectedCanonical}"`);
  }

  // Remplacements par fonction : le contenu peut contenir des motifs "$&" ou "$'"
  const page = pageTemplate
    .replace(SEO_SLOT, () => head)
    .replace(ROOT_DIV, () => `<div id="root">${html}</div>`);

  const file = path.join(distDir, route === "/" ? "" : route.slice(1), "index.html");
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, page);
  console.log(`prerender  ${route.padEnd(36)} → ${path.relative(root, file)}`);
}

await fs.rm(ssrDir, { recursive: true, force: true });
