import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { GOOGLE_BUSINESS_URL, GOOGLE_RATING, GOOGLE_REVIEW_COUNT } from "@/data/company";

/** Note et nombre d'avis de la fiche Google, avec un lien vers la fiche ; rien n'est affiché sans avis réels */
export const GoogleReviewsBadge = ({ dark = false, className }: { dark?: boolean; className?: string }) => {
  if (GOOGLE_BUSINESS_URL === "" || GOOGLE_REVIEW_COUNT <= 0) return null;

  const rating = GOOGLE_RATING > 0 ? GOOGLE_RATING.toLocaleString("fr-FR", { minimumFractionDigits: 1, maximumFractionDigits: 1 }) : null;

  return (
    <a
      href={GOOGLE_BUSINESS_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold border transition-colors",
        dark
          ? "bg-white/10 border-white/20 text-white hover:bg-white/15"
          : "bg-card border-border/80 text-foreground hover:border-primary/40",
        className
      )}
    >
      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" aria-hidden="true" />
      {rating && <span>{rating}/5</span>}
      <span className={dark ? "text-slate-200" : "text-muted-foreground"}>
        {GOOGLE_REVIEW_COUNT} avis Google
      </span>
    </a>
  );
};

export default GoogleReviewsBadge;
