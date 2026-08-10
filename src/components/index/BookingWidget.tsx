import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Calendar as CalendarIcon, Clock, ShieldCheck, Zap } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export const BookingWidget = () => {
  const { ref: widgetRef, isVisible: widgetVisible } = useScrollAnimation();

  return (
    <section id="reservation-calendrier" className="py-16 md:py-24 bg-gradient-to-b from-background via-primary/5 to-background border-t border-border/60">
      <div className="container mx-auto px-4">
        <div ref={widgetRef} className={`max-w-4xl mx-auto text-center mb-10 space-y-3 scroll-fade-up ${widgetVisible ? "is-visible" : ""}`}>
          <Badge variant="outline" className="px-3.5 py-1 text-xs border-primary/30 text-primary font-semibold">
            <CalendarIcon className="w-3.5 h-3.5 mr-1 inline" /> Calendrier Synchro &amp; Instantané
          </Badge>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            Réservez Votre Échange Offert de 30 Min
          </h2>
          <p className="text-muted-foreground text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto">
            Choisissez la date et l'horaire de votre choix. C'est 100% gratuit, sans engagement et en langage clair.
          </p>
        </div>

        <Card className="max-w-4xl mx-auto border-2 border-primary/30 shadow-2xl bg-card glass-card overflow-hidden">
          <CardHeader className="text-center border-b border-border/60 pb-6 bg-muted/20">
            <CardTitle className="text-xl sm:text-2xl font-bold flex items-center justify-center gap-2">
              <Clock className="w-6 h-6 text-primary" /> Session de Cadrage Offerte (30 min)
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground mt-1 max-w-xl mx-auto">
              Échangez directement avec RAMSIN Conseil sur vos besoins web, applicatifs ou d'architecture SI.
            </CardDescription>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-3 text-xs font-semibold text-muted-foreground">
              <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                <ShieldCheck className="w-4 h-4" /> 100% Sans Engagement
              </span>
              <span className="flex items-center gap-1 text-primary">
                <Zap className="w-4 h-4" /> Invitation Google Meet / Teams Automatique
              </span>
            </div>
          </CardHeader>

          <CardContent className="p-0 sm:p-2">
            {/* Widget Officiel Calendly Encastré */}
            <div className="w-full overflow-hidden rounded-b-xl" style={{ minHeight: "680px" }}>
              <iframe
                src="https://calendly.com/contact-ramsin/30min?hide_landing_page_details=1&hide_gdpr_banner=1&primary_color=2563eb"
                width="100%"
                height="700"
                frameBorder="0"
                title="Prise de RDV Calendly - RAMSIN Conseil"
                className="w-full h-[700px] border-0"
              ></iframe>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
