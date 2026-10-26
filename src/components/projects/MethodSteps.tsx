import { Clock, MessageCircle, Smartphone, Rocket } from "lucide-react";
import { cn } from "@/lib/utils";

/** Les 4 étapes d'un projet web / mobile — les mêmes que dans la vidéo de présentation */
const METHOD_STEPS = [
  {
    icon: Clock,
    title: "Échange de 30 min offert",
    text: "Vous expliquez votre idée avec vos mots, sans cahier des charges. Vous repartez avec un plan clair.",
  },
  {
    icon: MessageCircle,
    title: "Groupe WhatsApp dédié",
    text: "Dès le premier jour, vous parlez en direct avec RAMSIN, sans intermédiaire.",
  },
  {
    icon: Smartphone,
    title: "Tests chaque semaine",
    text: "Vous testez la nouvelle version sur votre téléphone, vos retours sont intégrés tout de suite.",
  },
  {
    icon: Rocket,
    title: "Lancement à votre nom",
    text: "Application, code et comptes vous appartiennent. Hébergement et maintenance assurés ensuite.",
  },
];

export const MethodSteps = ({ dark = false, compact = false }: { dark?: boolean; compact?: boolean }) => (
  <ol className={cn("grid gap-4 sm:grid-cols-2", !compact && "lg:grid-cols-4")}>
    {METHOD_STEPS.map(({ icon: Icon, title, text }, i) => (
      <li
        key={title}
        className={cn(
          "relative rounded-2xl p-5 border",
          dark ? "bg-white/5 border-white/10 text-white" : "bg-card border-border/80"
        )}
      >
        <div className="flex items-center gap-3 mb-3">
          <span className="w-10 h-10 rounded-xl bg-[#C7F36B] text-[#123A35] flex items-center justify-center">
            <Icon className="w-5 h-5" />
          </span>
          <span className={cn("text-xs font-black uppercase tracking-wider", dark ? "text-[#C7F36B]" : "text-muted-foreground")}>
            Étape {i + 1}
          </span>
        </div>
        <h3 className="font-extrabold leading-snug">{title}</h3>
        <p className={cn("mt-1.5 text-sm leading-relaxed", dark ? "text-slate-300" : "text-muted-foreground")}>{text}</p>
      </li>
    ))}
  </ol>
);

export default MethodSteps;
