import { useEffect, useRef, useState } from "react";

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

/**
 * Apparition au défilement (classes .scroll-fade-up / .scroll-fade-in / .scroll-scale-up + .is-visible).
 * Le HTML pré-rendu est lisible tel quel : les éléments ne sont masqués qu'une fois le JavaScript actif
 * (classe « js » sur <html>, posée ici), puis révélés par l'IntersectionObserver.
 */
export const useScrollAnimation = ({
  threshold = 0,
  rootMargin = "120px 0px 120px 0px",
  triggerOnce = true,
}: UseScrollAnimationOptions = {}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Active les animations seulement maintenant : avant l'hydratation, tout le contenu reste visible
    document.documentElement.classList.add("js");

    // Pure IntersectionObserver sans getBoundingClientRect pour éviter tout Forced Reflow
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isVisible };
};

export default useScrollAnimation;
