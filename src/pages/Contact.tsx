import { useState, useEffect } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Sparkles,
  HelpCircle,
  Building2,
  Smartphone,
  Lock,
  Calendar,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import SEO from "@/components/SEO";
import BookingWidget from "@/components/index/BookingWidget";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import CopyEmailButton from "@/components/CopyEmailButton";
import { sendContactRequest, formatServiceType } from "@/services/contactService";
import { trackConversionEvent } from "@/lib/analytics";
import { openBooking } from "@/lib/calendly";

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Veuillez renseigner votre nom et prénom (au moins 2 caractères)" })
    .max(100, { message: "Le nom ne doit pas dépasser 100 caractères" }),
  email: z
    .string()
    .max(254, { message: "L'adresse e-mail est trop longue" })
    .email({ message: "Veuillez entrer une adresse e-mail valide (ex: vous@entreprise.fr)" }),
  phone: z.string().max(40, { message: "Le numéro ne doit pas dépasser 40 caractères" }).optional(),
  serviceType: z
    .string()
    .min(1, { message: "Veuillez sélectionner le domaine concerné par votre besoin" }),
  message: z
    .string()
    .min(10, { message: "Veuillez décrire brièvement votre besoin (au moins 10 caractères)" })
    .max(5000, { message: "Le message ne doit pas dépasser 5000 caractères" }),
});

type FormValues = z.infer<typeof formSchema>;

export const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<FormValues | null>(null);
  const [honeypot, setHoneypot] = useState("");
  const [hasTrackedFormStart, setHasTrackedFormStart] = useState(false);
  const { toast } = useToast();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const { ref: formRef, isVisible: formVisible } = useScrollAnimation();
  const { ref: faqRef, isVisible: faqVisible } = useScrollAnimation();

  // Détection du mode express tunnel
  const isExpressTunnel =
    location.hash === "#formulaire-contact" ||
    Boolean(location.state?.scrollToForm) ||
    searchParams.get("tunnel") === "form" ||
    searchParams.get("mode") === "form";

  // Détection du service passé en paramètre URL ou state
  const serviceParam = searchParams.get("service") || searchParams.get("need");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      serviceType: serviceParam === "si" ? "architecture-si" : serviceParam === "web" ? "web-app" : "",
      message: "",
    },
  });

  const handleFormInteraction = () => {
    if (!hasTrackedFormStart) {
      setHasTrackedFormStart(true);
      trackConversionEvent("start_form_contact", {
        tunnel: isExpressTunnel ? "express_2min" : "direct",
      });
    }
  };

  useEffect(() => {
    // Gestion du tunnel express vers le formulaire écrit
    if (isExpressTunnel) {
      const el = document.getElementById("formulaire-contact");
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 150);
      }
    } else if (
      location.state?.scrollToBooking ||
      searchParams.get("tunnel") === "booking" ||
      location.hash === "#reservation-calendrier"
    ) {
      const el = document.getElementById("reservation-calendrier");
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 150);
      }
    }

    // Gestion du service sélectionné depuis la page services
    if (location.state?.selectedService) {
      const raw = location.state.selectedService;
      if (raw.includes("Web") || raw.includes("Applications")) {
        form.setValue("serviceType", "web-app");
      } else if (raw.includes("Architecture") || raw.includes("SI")) {
        form.setValue("serviceType", "architecture-si");
      } else if (raw.includes("HOPEX")) {
        form.setValue("serviceType", "mega-hopex");
      }
    }
  }, [location.state, location.hash, searchParams, form, isExpressTunnel]);

  // Envoi direct sans popup intrusif pour maximiser la conversion
  const onSubmit = async (data: FormValues) => {
    if (honeypot) {
      // Détection bot honeypot silencieuse
      setSubmitted(true);
      return;
    }

    setIsSubmitting(true);

    try {
      // Le sujet de l'email est déduit du domaine par le serveur (api/contact.ts)
      await sendContactRequest({
        name: data.name,
        email: data.email,
        phone: data.phone,
        serviceType: data.serviceType,
        message: data.message,
        website: honeypot,
      });

      // Suivi de conversion éthique
      trackConversionEvent("submit_contact_form", {
        serviceType: data.serviceType,
        pole: data.serviceType.includes("si") || data.serviceType.includes("hopex") ? "si" : "web",
      });

      setSubmittedData(data);
      setSubmitted(true);
      form.reset();

      toast({
        title: "Demande transmise avec succès !",
        description: "Merci pour votre message. Nous vous recontactons sous 24 h ouvrées.",
      });
    } catch (error) {
      // Échec réel de l'envoi : on conserve la saisie et on propose les coordonnées directes
      console.error("Contact form submission failed:", error);
      toast({
        variant: "destructive",
        title: "Votre message n'a pas pu être envoyé",
        description:
          "Veuillez réessayer dans un instant, ou écrire directement à contact@ramsin.fr / appeler le +33 (0)7 61 51 88 90.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const faqItems = [
    {
      question: "Comment se déroule le premier contact avec RAMSIN Conseil ?",
      answer:
        "Nous réalisons un premier échange offert de 30 minutes (par visioconférence Google Meet/Teams ou par téléphone). Vous me décrivez votre contexte, vos enjeux et vos délais. À l'issue de cet échange, je vous transmets une feuille de route claire avec une proposition forfaitaire ou régie sous 24 à 48h.",
    },
    {
      question: "Quelle est la différence entre une mission SI et un projet Web ?",
      answer:
        "Pour l'Architecture SI (MEGA HOPEX, urbanisation, DAT), nous intervenons auprès des DSI sous forme de mission en régie ou forfait de cadrage d'architecture. Pour les projets Web et mobiles, nous assurons la conception avec un devis forfaitaire ferme et cession contractuelle des droits sur le code source développé.",
    },
    {
      question: "Quel est le délai habituel pour démarrer une mission ou un projet ?",
      answer:
        "Grâce à notre structure indépendante réactive sans lourdeur administrative, nous pouvons généralement démarrer une mission ou un projet sous 1 à 2 semaines après validation de la proposition.",
    },
    {
      question: "Suis-je propriétaire de mon projet et de mes livrables ?",
      answer:
        "Absolument. Vous restez pleinement propriétaire de votre projet : le code source complet vous est transféré sur votre propre dépôt (GitHub/GitLab) et tous les comptes d'hébergement sont configurés à votre nom, sans aucun abonnement captif.",
    },
    {
      question: "Que se passe-t-il après la livraison de mon projet web/mobile ?",
      answer:
        "Tous nos développements bénéficient d'une garantie de 30 jours offerte post-lancement : tout dysfonctionnement identifié est corrigé en priorité sans frais. Nous assurons également une session de prise en main pour votre autonomie et pouvons proposer des forfaits de maintenance préventive.",
    },
  ];

  return (
    <>
      <SEO
        title="Contact & prise de rendez-vous | RAMSIN Conseil"
        description="Réservez 30 minutes offertes ou décrivez votre projet par écrit : applications web et mobiles, architecture SI. Réponse sous 24 h ouvrées."
        canonical="https://www.ramsin.fr/contact"
      />

      <div className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          
          {/* EN-TÊTE DE LA PAGE */}
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
            <Badge
              variant="outline"
              className="px-3.5 py-1 text-xs border-primary/30 text-primary font-semibold"
            >
              <Sparkles className="w-3.5 h-3.5 mr-1 inline text-amber-500" />
              Échange direct, sans engagement
            </Badge>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
              Parlons de votre projet
            </h1>
            <p className="text-muted-foreground text-base sm:text-xl leading-relaxed max-w-2xl mx-auto">
              Réservez 30 minutes offertes dans notre agenda, ou décrivez votre projet par écrit : réponse sous 24 h ouvrées.
            </p>
          </div>

          {/* COORDONNÉES DIRECTES : e-mail, téléphone et localisation, visibles dès l'arrivée */}
          <h2 className="sr-only">Nos coordonnées</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 mb-8 md:mb-12">
            <Card className="hover:border-primary/40 transition-colors hover-lift glass-card">
              <CardHeader className="p-4 pb-2 md:p-6 md:pb-3 flex-row md:flex-col items-center md:items-start gap-3 md:gap-0 space-y-0 md:space-y-1.5">
                <div className="p-2 md:p-2.5 bg-primary/10 rounded-xl w-fit text-primary shrink-0 md:mb-2">
                  <Mail className="h-5 w-5 md:h-6 md:w-6" />
                </div>
                <div className="space-y-1 min-w-0">
                  <CardTitle className="text-base md:text-lg">E-mail direct</CardTitle>
                  <CardDescription className="text-xs sm:text-sm">
                    Pour un dossier, un cahier des charges ou une question
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0 md:p-6 md:pt-0">
                <div onClick={() => trackConversionEvent("copy_email")}>
                  <CopyEmailButton
                    email="contact@ramsin.fr"
                    className="w-full justify-center text-xs sm:text-sm py-1.5"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="hover:border-primary/40 transition-colors hover-lift glass-card">
              <CardHeader className="p-4 pb-2 md:p-6 md:pb-3 flex-row md:flex-col items-center md:items-start gap-3 md:gap-0 space-y-0 md:space-y-1.5">
                <div className="p-2 md:p-2.5 bg-primary/10 rounded-xl w-fit text-primary shrink-0 md:mb-2">
                  <Phone className="h-5 w-5 md:h-6 md:w-6" />
                </div>
                <div className="space-y-1 min-w-0">
                  <CardTitle className="text-base md:text-lg">Téléphone direct</CardTitle>
                  <CardDescription className="text-xs sm:text-sm">
                    Du lundi au vendredi, 9 h à 19 h
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0 md:p-6 md:pt-0">
                <a
                  href="tel:+33761518890"
                  className="font-bold text-primary hover:underline text-base inline-block py-1"
                >
                  +33 (0)7 61 51 88 90
                </a>
              </CardContent>
            </Card>

            <Card className="hover:border-primary/40 transition-colors hover-lift glass-card">
              <CardHeader className="p-4 pb-2 md:p-6 md:pb-3 flex-row md:flex-col items-center md:items-start gap-3 md:gap-0 space-y-0 md:space-y-1.5">
                <div className="p-2 md:p-2.5 bg-primary/10 rounded-xl w-fit text-primary shrink-0 md:mb-2">
                  <MapPin className="h-5 w-5 md:h-6 md:w-6" />
                </div>
                <div className="space-y-1 min-w-0">
                  <CardTitle className="text-base md:text-lg">Localisation & mobilité</CardTitle>
                  <CardDescription className="text-xs sm:text-sm">
                    Sur place ou à distance
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0 md:p-6 md:pt-0">
                <p className="font-semibold text-foreground text-sm">
                  Basés à Fresnes (94)
                  <br />
                  <span className="text-xs text-muted-foreground font-normal">
                    Interventions Paris, Île-de-France & à distance
                  </span>
                </p>
              </CardContent>
            </Card>
          </div>

          {/* 1. OPTION 1 : CALENDRIER INTERACTIF CALENDLY */}
          <div className="mb-16">
            <BookingWidget
              autoLoad={Boolean(location.state?.scrollToBooking) || searchParams.get("tunnel") === "booking" || location.hash === "#reservation-calendrier"}
            />
          </div>

          {/* 2. OPTION 2 : FORMULAIRE DE CONTACT QUALIFIANT & GARANTIES */}
          <div
            ref={formRef}
            className={`grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 scroll-fade-up ${
              formVisible ? "is-visible" : ""
            }`}
          >
            {/* Colonne Formulaire (8 colonnes) */}
            <Card
              id="formulaire-contact"
              className={`lg:col-span-8 border-border/80 shadow-md glass-card rounded-2xl transition-all ${
                isExpressTunnel
                  ? "ring-2 ring-primary border-primary/50 shadow-xl bg-gradient-to-b from-primary/5 via-card to-card"
                  : ""
              }`}
            >
              <CardHeader className="space-y-1.5 pb-4">
                {isExpressTunnel ? (
                  <div className="p-3 mb-2 rounded-xl bg-primary/10 border border-primary/30 flex items-center gap-2.5 text-xs text-primary font-bold animate-pulse-gentle">
                    <Sparkles className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>
                      Décrivez votre projet en quelques lignes : nous vous répondons sous 24 h ouvrées.
                    </span>
                  </div>
                ) : (
                  <Badge
                    variant="outline"
                    className="w-fit px-3 py-0.5 text-xs border-primary/30 text-primary font-semibold"
                  >
                    Par écrit, en 2 minutes
                  </Badge>
                )}
                <CardTitle className="text-2xl font-bold">
                  Décrivez votre projet en 2 minutes
                </CardTitle>
                <CardDescription className="text-sm sm:text-base leading-relaxed">
                  Quelques lignes suffisent, pas besoin de cahier des charges. Nous étudions votre demande et vous répondons sous 24 h ouvrées avec de premières pistes.
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-2">
                {submitted ? (
                  /* ÉCRAN DE CONFIRMATION SUCCÈS TRÈS RASSURANT */
                  <div className="py-10 px-4 text-center space-y-5 animate-fade-in">
                    <div className="w-16 h-16 bg-emerald-500/15 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>

                    <div className="space-y-2 max-w-lg mx-auto">
                      <h3 className="text-2xl font-extrabold text-foreground">
                        Demande bien reçue !
                      </h3>
                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                        Merci pour votre confiance. Votre message nous a bien été transmis.
                      </p>
                    </div>

                    {/* Récapitulatif rassurant */}
                    {submittedData && (
                      <div className="p-4 sm:p-5 rounded-2xl bg-secondary/50 border border-border/80 text-left max-w-md mx-auto text-xs sm:text-sm space-y-2">
                        <div className="flex justify-between border-b border-border/60 pb-2">
                          <span className="text-muted-foreground">Contact :</span>
                          <span className="font-bold text-foreground">{submittedData.name}</span>
                        </div>
                        <div className="flex justify-between border-b border-border/60 pb-2">
                          <span className="text-muted-foreground">E-mail :</span>
                          <span className="font-semibold text-primary">{submittedData.email}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Domaine :</span>
                          <span className="font-bold text-foreground">
                            {formatServiceType(submittedData.serviceType)}
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs sm:text-sm text-emerald-800 max-w-lg mx-auto flex items-center justify-center gap-2 font-medium">
                      <Clock className="w-4 h-4 shrink-0 text-emerald-600" />
                      <span>Engagement de réponse : Un retour circonstancié vous parviendra sous 24h ouvrées.</span>
                    </div>

                    <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                      <Button
                        type="button"
                        onClick={() => openBooking("contact_after_form")}
                        className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl gap-2 cursor-pointer"
                      >
                        <Calendar className="w-4 h-4" />
                        Réserver 30 min offertes
                      </Button>
                      <Button
                        type="button"
                        onClick={() => setSubmitted(false)}
                        variant="outline"
                        className="rounded-xl"
                      >
                        Envoyer un autre message
                      </Button>
                    </div>
                  </div>
                ) : (
                  /* FORMULAIRE ACCESSIBLE W3C & QUALIFIANT */
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      onFocusCapture={handleFormInteraction}
                      className="space-y-5"
                    >
                      
                      {/* Honeypot Bot Trap (Caché aux humains, détecte les spammeurs) */}
                      <div className="hidden" aria-hidden="true">
                        <input
                          type="text"
                          name="website_url_check_bot"
                          aria-label="Champ piège anti-spam"
                          tabIndex={-1}
                          value={honeypot}
                          onChange={(e) => setHoneypot(e.target.value)}
                          autoComplete="off"
                        />
                      </div>

                      {/* Ligne 1 : Nom & Email */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel htmlFor="contact-name">
                                Nom et Prénom <span className="text-rose-500">*</span>
                              </FormLabel>
                              <FormControl>
                                <Input
                                  id="contact-name"
                                  placeholder="Ex: Marc Dubois"
                                  autoComplete="name"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage className="text-xs" />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel htmlFor="contact-email">
                                Adresse e-mail <span className="text-rose-500">*</span>
                              </FormLabel>
                              <FormControl>
                                <Input
                                  id="contact-email"
                                  type="email"
                                  placeholder="vous@entreprise.fr"
                                  autoComplete="email"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage className="text-xs" />
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* Ligne 2 : Domaine & Téléphone */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <FormField
                          control={form.control}
                          name="serviceType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel htmlFor="contact-service">
                                Votre Domaine de Besoin <span className="text-rose-500">*</span>
                              </FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                value={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger id="contact-service">
                                    <SelectValue placeholder="Sélectionnez votre domaine" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectLabel className="font-bold text-primary flex items-center gap-1.5">
                                      <Building2 className="w-3.5 h-3.5" /> Architecture des SI & MEGA HOPEX
                                    </SelectLabel>
                                    <SelectItem value="architecture-si">
                                      Architecture des SI, urbanisation & trajectoires
                                    </SelectItem>
                                    <SelectItem value="mega-hopex">
                                      Expertise, configuration & administration MEGA HOPEX V5
                                    </SelectItem>
                                    <SelectItem value="po-agile">
                                      Product ownership SI & cadrage de DAT
                                    </SelectItem>
                                  </SelectGroup>

                                  <SelectGroup className="pt-1.5 border-t border-border/40">
                                    <SelectLabel className="font-bold text-emerald-700 flex items-center gap-1.5">
                                      <Smartphone className="w-3.5 h-3.5" /> Web & applications sur-mesure
                                    </SelectLabel>
                                    <SelectItem value="web-app">
                                      Application web & logiciel SaaS métier
                                    </SelectItem>
                                    <SelectItem value="mobile-app">
                                      Application mobile iOS & Android (React Native)
                                    </SelectItem>
                                    <SelectItem value="site-vitrine">
                                      Site web professionnel & e-commerce
                                    </SelectItem>
                                  </SelectGroup>

                                  <SelectGroup className="pt-1.5 border-t border-border/40">
                                    <SelectLabel className="font-bold text-muted-foreground">
                                      Autre accompagnement
                                    </SelectLabel>
                                    <SelectItem value="transformation">
                                      Conseil en transformation digitale
                                    </SelectItem>
                                    <SelectItem value="autre">
                                      Autre besoin ou demande spécifique
                                    </SelectItem>
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                              <FormMessage className="text-xs" />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel htmlFor="contact-phone">
                                Téléphone <span className="text-xs text-muted-foreground font-normal">(optionnel, pour un rappel rapide)</span>
                              </FormLabel>
                              <FormControl>
                                <Input
                                  id="contact-phone"
                                  type="tel"
                                  placeholder="06 12 34 56 78"
                                  autoComplete="tel"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage className="text-xs" />
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* Ligne 3 : Description du Besoin */}
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel htmlFor="contact-message">
                              Votre projet en quelques mots <span className="text-rose-500">*</span>
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                id="contact-message"
                                placeholder="Votre activité, ce que vous voulez créer ou améliorer, votre budget ou vos questions. Pas besoin de cahier des charges."
                                className="min-h-[130px] resize-y"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-xs" />
                          </FormItem>
                        )}
                      />

                      {/* Bouton d'action direct & Mention RGPD */}
                      <div className="space-y-3 pt-2">
                        <Button
                          type="submit"
                          size="lg"
                          className="w-full font-bold gap-2 py-6 text-base shadow-md cursor-pointer rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground transition-all"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-5 h-5 animate-spin" />
                              Transmission de votre demande en cours...
                            </>
                          ) : (
                            <>
                              Envoyer ma demande <Send className="w-4 h-4" />
                            </>
                          )}
                        </Button>

                        <p className="text-xs text-center text-muted-foreground flex items-center justify-center gap-1.5">
                          <Lock className="w-3 h-3 text-emerald-600 shrink-0" />
                          <span>
                            Vos informations servent uniquement à répondre à votre demande. Zéro spam.{" "}
                            <Link to="/confidentialite" className="underline hover:text-primary">Politique de confidentialité</Link>
                          </span>
                        </p>
                      </div>

                    </form>
                  </Form>
                )}
              </CardContent>
            </Card>

            {/* Colonne Latérale : Engagements & Réactivité (4 colonnes) */}
            <div className="lg:col-span-4 space-y-6">
              <Card className="border-2 border-primary/20 bg-primary/5 glass-card rounded-2xl">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2 text-primary font-bold text-lg">
                    <Clock className="h-5 w-5" /> Réponse sous 24 h ouvrées
                  </div>
                </CardHeader>
                <CardContent className="space-y-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  <p>
                    Chaque demande est étudiée personnellement pour vous apporter une réponse constructive, des premières pistes techniques et une estimation réaliste.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border/80 glass-card rounded-2xl">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2 text-foreground font-bold text-lg">
                    <ShieldCheck className="h-5 w-5 text-emerald-600" /> Nos 3 garanties
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-3 items-start">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-sm text-foreground block">
                        100 % en langage clair
                      </span>
                      <span className="text-xs text-muted-foreground leading-relaxed">
                        Des explications concrètes sur vos enjeux, zéro jargon technique obscur pour masquer les réalités.
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-sm text-foreground block">
                        Transparence forfaitaire
                      </span>
                      <span className="text-xs text-muted-foreground leading-relaxed">
                        Devis clair, périmètre maîtrisé et budget forfaitaire ferme sans aucun surcoût imprévu.
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-sm text-foreground block">
                        Confidentialité absolue
                      </span>
                      <span className="text-xs text-muted-foreground leading-relaxed">
                        Protection stricte de vos secrets d'affaires, de votre code et de vos architectures.
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

          </div>

          {/* SECTION FAQ (RASSURER SUR LES QUESTIONS FRÉQUENTES) */}
          <div
            ref={faqRef}
            className={`max-w-4xl mx-auto scroll-fade-up ${faqVisible ? "is-visible" : ""}`}
          >
            <div className="text-center space-y-3 mb-8">
              <Badge
                variant="outline"
                className="px-3.5 py-1 text-xs border-primary/30 text-primary font-semibold"
              >
                <HelpCircle className="w-3.5 h-3.5 mr-1 inline" /> Questions fréquentes
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-extrabold">
                Vos questions, nos réponses
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base">
                Tout ce que vous devez savoir avant d'engager un échange commercial avec RAMSIN Conseil.
              </p>
            </div>

            <Accordion type="single" collapsible className="w-full space-y-3">
              {faqItems.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={`faq-${index}`}
                  className="border border-border/80 rounded-xl px-4 bg-card glass-card"
                >
                  <AccordionTrigger className="text-left font-bold text-sm sm:text-base py-4 hover:no-underline hover:text-primary">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-xs sm:text-sm leading-relaxed pb-4">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

        </div>
      </div>
    </>
  );
};

export default Contact;
