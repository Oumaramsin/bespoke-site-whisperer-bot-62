import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarIcon, Clock, CheckCircle2, Send, ShieldCheck } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const BookingWidget = () => {
  const [selectedDay, setSelectedDay] = useState<string>("Demain");
  const [selectedTime, setSelectedTime] = useState<string>("10:00");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const { toast } = useToast();
  const { ref: widgetRef, isVisible: widgetVisible } = useScrollAnimation();

  const [honeypot, setHoneypot] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    message: ""
  });

  const days = ["Demain", "Mercredi", "Jeudi", "Vendredi", "Lundi prochain"];
  const timeSlots = ["09:30", "11:00", "14:30", "16:00", "17:30"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Protection Anti-Spam (Honeypot Bot Trap)
    if (honeypot) {
      setSubmitted(true);
      return;
    }

    if (!formData.name.trim() || !formData.contact.trim()) {
      toast({
        variant: "destructive",
        title: "Champs obligatoires manquants",
        description: "Veuillez renseigner votre nom et vos coordonnées.",
      });
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      toast({
        title: "Créneau réservé avec succès !",
        description: `Votre RDV pour ${selectedDay} à ${selectedTime} a été enregistré. Oumar SIDIBÉ vous contactera sous 24h.`,
      });
    }, 1000);
  };

  return (
    <section id="reservation-calendrier" className="py-16 md:py-24 bg-gradient-to-b from-background via-primary/5 to-background border-t border-border/60">
      <div className="container mx-auto px-4">
        <div ref={widgetRef} className={`max-w-4xl mx-auto text-center mb-12 space-y-3 scroll-fade-up ${widgetVisible ? "is-visible" : ""}`}>
          <Badge variant="outline" className="px-3.5 py-1 text-xs border-primary/30 text-primary font-semibold">
            <CalendarIcon className="w-3.5 h-3.5 mr-1 inline" /> Prise de RDV Instantanée
          </Badge>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            Réservez Votre Échange Offert de 30 Min
          </h2>
          <p className="text-muted-foreground text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto">
            Sélectionnez un jour et un créneau horaire. C'est 100% gratuit, sans engagement et en langage clair.
          </p>
        </div>

        <Card className="max-w-4xl mx-auto border-2 border-primary/30 shadow-xl bg-card glass-card">
          <CardHeader className="text-center border-b border-border/60 pb-6">
            <CardTitle className="text-xl sm:text-2xl font-bold flex items-center justify-center gap-2">
              <Clock className="w-6 h-6 text-primary" /> Session de Cadrage Offerte (30 min)
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground mt-1">
              Échangez directement avec Oumar SIDIBÉ sur vos besoins webs, applicatifs ou d'architecture SI.
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-8">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-500/10 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold">Créneau Réversé avec Succès !</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Merci ! Votre échange pour <strong className="text-foreground">{selectedDay} à {selectedTime}</strong> a été réservé. Oumar vous confirmera le lien d'échange sous 24h ouvrées.
                </p>
                <Button onClick={() => setSubmitted(false)} variant="outline" className="mt-4">
                  Réserver un autre créneau
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Champ Honeypot Anti-Spam (Invisible pour les humains, piège à bots) */}
                <input
                  type="text"
                  name="website_url_hp"
                  aria-label="Piège à robot anti-spam"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  style={{ opacity: 0, position: "absolute", top: "-9999px", left: "-9999px" }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                {/* 1. Choix du Jour */}
                <div className="space-y-3">
                  <span className="text-sm font-bold text-foreground flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4 text-primary" /> 1. Choisissez un jour :
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {days.map((day) => (
                      <button
                        type="button"
                        key={day}
                        aria-label={`Choisir le jour ${day}`}
                        onClick={() => setSelectedDay(day)}
                        className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all border ${
                          selectedDay === day
                            ? "bg-primary text-primary-foreground border-primary shadow-sm"
                            : "bg-background border-border/80 hover:border-primary/50 text-foreground"
                        }`}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Choix du Créneau Horaire */}
                <div className="space-y-3">
                  <span className="text-sm font-bold text-foreground flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" /> 2. Choisissez une heure :
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {timeSlots.map((time) => (
                      <button
                        type="button"
                        key={time}
                        aria-label={`Choisir l'horaire ${time}`}
                        onClick={() => setSelectedTime(time)}
                        className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all border ${
                          selectedTime === time
                            ? "bg-primary text-primary-foreground border-primary shadow-sm"
                            : "bg-background border-border/80 hover:border-primary/50 text-foreground"
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Mini-formulaire 3 champs avec labels d'accessibilité */}
                <div className="space-y-4 pt-4 border-t border-border/60">
                  <span className="text-sm font-bold text-foreground block">
                    3. Vos coordonnées rapides :
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="booking-name" className="sr-only">Votre nom complet</label>
                      <Input
                        id="booking-name"
                        aria-label="Votre nom complet"
                        placeholder="Votre nom complet *"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="booking-contact" className="sr-only">Email ou N° Téléphone</label>
                      <Input
                        id="booking-contact"
                        aria-label="Email ou N° Téléphone"
                        placeholder="Email ou N° Téléphone *"
                        value={formData.contact}
                        onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="booking-message" className="sr-only">Description de votre besoin</label>
                    <Textarea
                      id="booking-message"
                      aria-label="Description de votre besoin"
                      placeholder="Décrivez votre besoin en 1 phrase (ex: Création d'un site vitrine traiteur, Refonte app, Conseil MEGA Hopex...)"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="min-h-24"
                    />
                  </div>
                </div>

                <Button type="submit" size="lg" className="w-full font-semibold gap-2 py-6 text-base shadow-lg" disabled={isSubmitting || !formData.name.trim() || !formData.contact.trim()}>
                  {isSubmitting ? (
                    <span>Réservation en cours...</span>
                  ) : (
                    <>
                      Confirmer le RDV pour {selectedDay} à {selectedTime} <Send className="w-4 h-4" />
                    </>
                  )}
                </Button>

                <div className="flex flex-wrap justify-center items-center gap-6 text-xs text-muted-foreground pt-2">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> 100% Gratuit & Sans engagement
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Confirmation immédiate
                  </span>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default BookingWidget;
