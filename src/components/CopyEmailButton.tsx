import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";

interface CopyEmailButtonProps {
  email?: string;
  variant?: "badge" | "button" | "inline";
  className?: string;
}

export const CopyEmailButton = ({
  email = "sidibeoumar94@gmail.com",
  variant = "badge",
  className = "",
}: CopyEmailButtonProps) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    navigator.clipboard.writeText(email);
    setCopied(true);

    toast({
      title: "Email copié !",
      description: `${email} a été copié dans votre presse-papier.`,
    });

    setTimeout(() => {
      setCopied(false);
    }, 2500);
  };

  if (variant === "button") {
    return (
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={handleCopy}
        className={`gap-1.5 font-semibold ${className}`}
        title="Copier l'email"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-emerald-500" /> Copié !
          </>
        ) : (
          <>
            <Copy className="w-3.5 h-3.5 text-primary" /> Copier l'email
          </>
        )}
      </Button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label="Copier l'adresse email"
      title="Cliquer pour copier l'email"
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary hover:bg-primary/20 transition-all cursor-pointer ${className}`}
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5 text-emerald-600" />
          <span>Copié dans le presse-papier !</span>
        </>
      ) : (
        <>
          <Copy className="w-3.5 h-3.5" />
          <span>{email}</span>
        </>
      )}
    </button>
  );
};

export default CopyEmailButton;
