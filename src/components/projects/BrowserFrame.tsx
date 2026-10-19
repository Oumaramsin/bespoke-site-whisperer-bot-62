import { cn } from "@/lib/utils";

interface BrowserFrameProps {
  src: string;
  alt: string;
  /** Texte affiché dans la barre (nom du projet, jamais une fausse URL) */
  label: string;
  illustrative?: boolean;
  bg?: string;
  /** Point d'ancrage de l'image recadrée (object-position CSS) */
  position?: string;
  /** Ratio de l'aperçu : « 16/10 » pour les cartes, « auto » pour la capture complète */
  ratio?: "16/10" | "auto";
  eager?: boolean;
  className?: string;
}

export const BrowserFrame = ({
  src,
  alt,
  label,
  illustrative = false,
  bg = "#f8fafc",
  position = "top",
  ratio = "16/10",
  eager = false,
  className,
}: BrowserFrameProps) => (
  <div className={cn("rounded-2xl overflow-hidden border border-black/10 bg-white shadow-[0_20px_50px_-20px_rgba(7,24,22,0.45)]", className)}>
    <div className="flex items-center gap-1.5 px-3.5 py-2.5 bg-slate-100 border-b border-black/5">
      <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
      <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
      <span className="ml-2 text-[11px] font-semibold text-slate-500 truncate">{label}</span>
      {illustrative && (
        <span className="ml-auto shrink-0 text-[10px] font-bold uppercase tracking-wide text-slate-500 bg-white border border-slate-200 rounded-full px-2 py-0.5">
          Visuel d'illustration
        </span>
      )}
    </div>
    <div className={cn("overflow-hidden", ratio === "16/10" && "aspect-[16/10]")} style={{ background: bg }}>
      <img
        src={src}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        style={ratio === "16/10" ? { objectPosition: position } : undefined}
        className={cn(
          "block w-full",
          ratio === "16/10" ? "h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" : "h-auto"
        )}
      />
    </div>
  </div>
);

export default BrowserFrame;
