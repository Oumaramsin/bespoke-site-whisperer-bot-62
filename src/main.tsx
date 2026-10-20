import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'

// /services/ reçoit le même HTML pré-rendu que /services : on retire le « / » final (comme dans les canonicals)
// avant l'hydratation, sinon le lien actif du menu (comparaison stricte du pathname) diffère du HTML serveur.
const { pathname, search, hash } = window.location;
if (pathname.length > 1 && pathname.endsWith("/")) {
  window.history.replaceState(window.history.state, "", pathname.replace(/\/+$/, "") + search + hash);
}

const container = document.getElementById("root")!;
const app = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

// En production toutes les pages servies sont pré-rendues (scripts/prerender.mjs), y compris dist/404.html : on hydrate.
// Serveur de développement Vite : coquille vide, rendu classique côté client.
// L'hydratation attend la première image affichée : le texte pré-rendu apparaît sans attendre React.
if (container.hasChildNodes()) {
  requestAnimationFrame(() => setTimeout(() => hydrateRoot(container, app), 0));
} else {
  createRoot(container).render(app);
}
