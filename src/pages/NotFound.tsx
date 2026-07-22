import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Home, ArrowLeft, AlertCircle } from "lucide-react";
import SEO from "@/components/SEO";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "Erreur 404 : Tentative d'accès à une page inexistante :",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <>
      <SEO
        title="Page Non Trouvée (404) | RAMSIN Conseil"
        description="La page que vous recherchez n'existe pas ou a été déplacée. Retournez à l'accueil du site RAMSIN Conseil."
      />

      <div className="min-h-[75vh] flex items-center justify-center py-16 px-4 relative overflow-hidden">
        {/* Halo lumineux ambiant */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px]" />
        </div>

        <div className="text-center max-w-lg mx-auto space-y-6 glass-card p-8 sm:p-12 rounded-3xl border-2 border-primary/20 shadow-xl">
          <Badge variant="outline" className="px-3.5 py-1 text-xs border-destructive/30 text-destructive font-semibold">
            <AlertCircle className="w-3.5 h-3.5 mr-1 inline" /> Erreur 404
          </Badge>

          <h1 className="text-6xl sm:text-8xl font-black gradient-text tracking-tight">
            404
          </h1>

          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-extrabold text-foreground">
              Page Non Trouvée
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Désolé, la page que vous cherchez n'existe pas, a été déplacée ou l'adresse saisie est incorrecte.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Button asChild size="lg" className="font-extrabold gap-2 cursor-pointer shadow-md">
              <Link to="/">
                <Home className="w-4 h-4" /> Retour à l'Accueil
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="font-bold cursor-pointer">
              <Link to="/contact">
                <ArrowLeft className="w-4 h-4" /> Nous Contacter
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
