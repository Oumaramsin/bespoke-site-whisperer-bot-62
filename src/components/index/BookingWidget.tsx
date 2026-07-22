import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Calendar as CalendarIcon, Clock, CheckCircle2, Send, User, Mail, Phone, FileText, AlertCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { sendBookingViaResend } from "@/services/resendService";

export const BookingWidget = () => {
  const [selectedDay, setSelectedDay] = useState<string>("Demain");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);

  const [lastBookedEmail, setLastBookedEmail] = useState<string>("");
  const [lastBookedDay, setLastBookedDay] = useState<string>("");
  const [lastBookedTime, setLastBookedTime] = useState<string>("");
  const { toast } = useToast();
  const { ref: widgetRef, isVisible: widgetVisible } = useScrollAnimation();

  // Créneaux réservés enregistrés de manière permanente dans localStorage
  const [bookedSlots, setBookedSlots] = useState<Record<string, string[]>>(() => {
    try {
      const saved = localStorage.getItem("ramsin_booked_slots_v2");
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error("Erreur lecture localStorage:", e);
    }
    return {
      "Demain": ["11:00"],
    };
  });

  useEffect(() => {
    try {
      localStorage.setItem("ramsin_booked_slots_v2", JSON.stringify(bookedSlots));
    } catch (e) {
      console.error("Erreur écriture localStorage:", e);
    }
  }, [bookedSlots]);

  const [honeypot, setHoneypot] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const days = ["Demain", "Mercredi", "Jeudi", "Vendredi", "Lundi prochain"];
  const allTimeSlots = ["09:30", "11:00", "14:30", "16:00", "17:30"];

  // Calcul des créneaux disponibles
  const getAvailableSlotsForDay = (day: string) => {
    return allTimeSlots.filter((t) => !(bookedSlots[day] || []).includes(t));
  };

  // Un jour est complet si tous ses créneaux sont pris
  const isDayFullyBooked = (day: string) => {
    return getAvailableSlotsForDay(day).length === 0;
  };

  // Liste des jours disponibles (les jours 100% complets disparaissent)
  const availableDays = days.filter((day) => !isDayFullyBooked(day));
  const availableTimeSlots = getAvailableSlotsForDay(selectedDay);

  // Bascule automatique vers le premier jour disponible si nécessaire
  useEffect(() => {
    if (isDayFullyBooked(selectedDay)) {
      const nextAvailableDay = days.find((d) => !isDayFullyBooked(d));
      if (nextAvailableDay) {
        setSelectedDay(nextAvailableDay);
      }
    }
  }, [bookedSlots, selectedDay]);

  useEffect(() => {
    if (selectedTime && !availableTimeSlots.includes(selectedTime)) {
      setSelectedTime("");
    }
  }, [selectedDay, bookedSlots]);

  const isValidEmail = formData.email.trim().includes("@") && formData.email.trim().includes(".");
  const isFormValid =
    formData.name.trim().length >= 2 &&
    isValidEmail &&
    Boolean(selectedTime);

  // 1. Déclenchement du Pop-up Modal de confirmation au lieu d'un envoi immédiat
  const handleOpenConfirmModal = (e: React.FormEvent) => {
    e.preventDefault();

    if (honeypot) {
      setSubmitted(true);
      return;
    }

    if (!isFormValid) {
      toast({
        variant: "destructive",
        title: "Champs manquants",
        description: "Veuillez choisir un horaire et renseigner votre nom ainsi qu'un email valide.",
      });
      return;
    }

    setIsConfirmModalOpen(true);
  };

  // 2. Validation finale après confirmation dans le Pop-up
  const handleFinalConfirm = async () => {
    setIsSubmitting(true);
    setIsConfirmModalOpen(false);

    const currentDay = selectedDay;
    const currentTime = selectedTime;
    const clientEmail = formData.email;
    const clientName = formData.name;

    setLastBookedDay(currentDay);
    setLastBookedTime(currentTime);
    setLastBookedEmail(clientEmail);

    try {
      // Envoi de la notification Resend
      await sendBookingViaResend({
        name: clientName,
        email: clientEmail,
        phone: formData.phone,
        selectedDay: currentDay,
        selectedTime: currentTime,
        message: formData.message
      });
    } catch (error) {
      console.error("Erreur lors de l'envoi de la réservation via Resend:", error);
    } finally {
      // Réinitialisation des champs du formulaire (les coordonnées disparaissent)
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: ""
      });

      // Verrouillage permanent du créneau
      setBookedSlots((prev) => ({
        ...prev,
        [currentDay]: [...(prev[currentDay] || []), currentTime]
      }));

      setSelectedTime("");
      setIsSubmitting(false);
      setSubmitted(true);

      toast({
        title: "Réservation confirmée avec succès !",
        description: `Votre RDV pour ${currentDay} à ${currentTime} a été enregistré. Une confirmation vous a été envoyée par email.`,
      });
    }
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
              Échangez directement avec RAMSIN Conseil sur vos besoins webs, applicatifs ou d'architecture SI.
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-8">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-500/10 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold">Créneau Réservé avec Succès !</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Merci ! Votre échange pour <strong className="text-foreground">{lastBookedDay} à {lastBookedTime}</strong> a été réservé. Un e-mail de confirmation a été envoyé à <strong className="text-primary">{lastBookedEmail}</strong>.
                </p>
                <Button
                  onClick={() => {
                    setSubmitted(false);
                    setSelectedTime("");
                  }}
                  variant="outline"
                  className="mt-4"
                >
                  Réserver un autre créneau
                </Button>
              </div>
            ) : (
              <form onSubmit={handleOpenConfirmModal} className="space-y-8">
                {/* Champ Honeypot Anti-Spam (Invisible pour les humains) */}
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
                  {availableDays.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {availableDays.map((day) => (
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
                  ) : (
                    <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-600 dark:text-amber-400 font-semibold">
                      Tous les créneaux de la semaine sont réservés. N'hésitez pas à nous envoyer un message direct depuis la page Contact.
                    </div>
                  )}
                </div>

                {/* 2. Choix du Créneau Horaire */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-foreground flex items-center gap-2">
                      <Clock className="w-4 h-4 text-primary" /> 2. Choisissez une heure ({selectedDay}) :
                    </span>
                    {!selectedTime && (
                      <span className="text-xs text-amber-600 dark:text-amber-400 font-medium">
                        * Sélectionnez un horaire pour continuer
                      </span>
                    )}
                  </div>

                  {availableTimeSlots.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {availableTimeSlots.map((time) => (
                        <button
                          type="button"
                          key={time}
                          aria-label={`Choisir l'horaire ${time}`}
                          onClick={() => setSelectedTime(time)}
                          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all border ${
                            selectedTime === time
                              ? "bg-primary text-primary-foreground border-primary shadow-sm scale-105"
                              : "bg-background border-border/80 hover:border-primary/50 text-foreground"
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-xs text-destructive font-semibold">
                      Tous les créneaux pour {selectedDay} sont désormais réservés. Veuillez choisir un autre jour.
                    </div>
                  )}
                </div>

                {/* 3. Formulaire Coordonnées */}
                <div className="space-y-4 pt-4 border-t border-border/60">
                  <span className="text-sm font-bold text-foreground block">
                    3. Vos coordonnées de réservation :
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="booking-name" className="block text-xs font-semibold mb-1 text-foreground">
                        Nom complet <span className="text-destructive">*</span>
                      </label>
                      <Input
                        id="booking-name"
                        aria-label="Votre nom complet"
                        placeholder="Ex: Jean Dupont"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="booking-email" className="block text-xs font-semibold mb-1 text-foreground">
                        Adresse Email <span className="text-destructive">*</span>
                      </label>
                      <Input
                        id="booking-email"
                        type="email"
                        aria-label="Votre adresse email"
                        placeholder="Ex: jean.dupont@entreprise.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="booking-phone" className="block text-xs font-semibold mb-1 text-foreground">
                        Téléphone <span className="text-muted-foreground font-normal">(Optionnel)</span>
                      </label>
                      <Input
                        id="booking-phone"
                        type="tel"
                        aria-label="Votre numéro de téléphone"
                        placeholder="Ex: 06 12 34 56 78"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="booking-message" className="block text-xs font-semibold mb-1 text-foreground">
                      Description de votre besoin <span className="text-muted-foreground font-normal">(Optionnel)</span>
                    </label>
                    <Textarea
                      id="booking-message"
                      aria-label="Description de votre besoin"
                      placeholder="Décrivez votre besoin (ex: Création d'un site vitrine, Refonte d'application, Conseil MEGA Hopex...)"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="min-h-24"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  {!isFormValid && (
                    <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-700 dark:text-amber-300 font-semibold flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 text-amber-500" />
                      <span>
                        {!selectedTime
                          ? "Veuillez choisir une heure de rendez-vous ci-dessus (Étape 2)."
                          : "Veuillez indiquer votre nom complet et un email valide (Étape 3)."}
                      </span>
                    </div>
                  )}

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full font-extrabold gap-2 py-6 text-base shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isSubmitting || !isFormValid}
                  >
                    {isSubmitting ? (
                      <span>Réservation en cours...</span>
                    ) : !selectedTime ? (
                      <span>Veuillez sélectionner un horaire ci-dessus</span>
                    ) : !formData.name.trim() || !isValidEmail ? (
                      <span>Veuillez renseigner votre nom et un email valide</span>
                    ) : (
                      <>
                        Confirmer mon RDV pour {selectedDay} à {selectedTime} <Send className="w-4 h-4" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>

      {/* POP-UP MODAL DE CONFIRMATION DE RDV */}
      <Dialog open={isConfirmModalOpen} onOpenChange={setIsConfirmModalOpen}>
        <DialogContent className="sm:max-w-md border-2 border-primary/20 bg-card">
          <DialogHeader className="text-center sm:text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <DialogTitle className="text-xl font-extrabold text-foreground">
              Confirmer votre Session de Cadrage ?
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              Veuillez vérifier les informations ci-dessous avant d'enregistrer officiellement votre rendez-vous.
            </DialogDescription>
          </DialogHeader>

          {/* Récapitulatif du RDV */}
          <div className="my-2 p-4 rounded-xl bg-muted/50 border border-border/80 space-y-3 text-sm">
            <div className="flex items-center justify-between font-semibold border-b border-border/60 pb-2">
              <span className="flex items-center gap-2 text-primary font-bold">
                <CalendarIcon className="w-4 h-4" /> Date & Créneau :
              </span>
              <Badge variant="default" className="bg-primary text-primary-foreground font-bold px-3 py-1">
                {selectedDay} à {selectedTime}
              </Badge>
            </div>

            <div className="space-y-2 text-xs sm:text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-primary" /> Nom :
                </span>
                <span className="font-semibold text-foreground">{formData.name}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-muted-foreground flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-primary" /> Email :
                </span>
                <span className="font-semibold text-primary">{formData.email}</span>
              </div>

              {formData.phone && (
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-primary" /> Téléphone :
                  </span>
                  <span className="font-semibold text-foreground">{formData.phone}</span>
                </div>
              )}

              {formData.message && (
                <div className="pt-2 border-t border-border/40">
                  <span className="text-muted-foreground flex items-center gap-1.5 mb-1">
                    <FileText className="w-3.5 h-3.5 text-primary" /> Description du besoin :
                  </span>
                  <p className="italic text-foreground/90 bg-background/60 p-2 rounded border border-border/50 text-xs line-clamp-2">
                    "{formData.message}"
                  </p>
                </div>
              )}
            </div>
          </div>

          <DialogFooter className="flex flex-col sm:flex-row gap-2 mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsConfirmModalOpen(false)}
              className="w-full sm:w-1/2"
            >
              Modifier mes infos
            </Button>
            <Button
              type="button"
              onClick={handleFinalConfirm}
              className="w-full sm:w-1/2 font-bold gap-2 bg-primary text-primary-foreground shadow-md hover:bg-primary/90"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                "Validation..."
              ) : (
                <>
                  Oui, confirmer le RDV <CheckCircle2 className="w-4 h-4" />
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default BookingWidget;
