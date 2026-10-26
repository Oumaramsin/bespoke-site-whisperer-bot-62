/**
 * Défilement animé vers un élément de la page, identique sur tous les navigateurs.
 * Le défilement « smooth » natif saute d'un coup sur certains ordinateurs (animations Windows désactivées),
 * on anime donc nous-mêmes la position, image par image.
 */

/** Hauteur du menu collant, plus un peu d'air au-dessus du titre visé */
const HEADER_OFFSET = 80;

const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

let cancelCurrent: (() => void) | null = null;

export const smoothScrollTo = (target: HTMLElement, offset = HEADER_OFFSET) => {
  cancelCurrent?.();

  const html = document.documentElement;
  const previousBehavior = html.style.scrollBehavior;
  // Sans ça, la classe scroll-smooth de <html> ralentirait chaque pas de l'animation
  html.style.scrollBehavior = "auto";

  const startY = window.scrollY;
  // La cible est recalculée à chaque image : la page peut encore bouger (images, sections chargées à l'approche)
  const targetY = () => Math.max(0, target.getBoundingClientRect().top + window.scrollY - offset);
  const distance = Math.abs(targetY() - startY);
  if (distance < 2) {
    html.style.scrollBehavior = previousBehavior;
    return;
  }
  // Assez long pour voir le trajet, assez court pour ne pas faire attendre
  const duration = Math.min(1100, Math.max(450, distance * 0.2));

  let frame = 0;
  let startTime: number | null = null;

  const stop = () => {
    cancelAnimationFrame(frame);
    html.style.scrollBehavior = previousBehavior;
    window.removeEventListener("wheel", stop);
    window.removeEventListener("touchstart", stop);
    window.removeEventListener("keydown", stop);
    if (cancelCurrent === stop) cancelCurrent = null;
  };

  const step = (now: number) => {
    if (startTime === null) startTime = now;
    const progress = Math.min(1, (now - startTime) / duration);
    window.scrollTo(0, startY + (targetY() - startY) * easeInOutCubic(progress));
    if (progress < 1) frame = requestAnimationFrame(step);
    else stop();
  };

  // Le visiteur reprend la main dès qu'il fait défiler lui-même
  window.addEventListener("wheel", stop, { passive: true });
  window.addEventListener("touchstart", stop, { passive: true });
  window.addEventListener("keydown", stop);
  cancelCurrent = stop;
  frame = requestAnimationFrame(step);
};
