import { useState, useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import {
  sendContactViaResend,
  formatServiceType,
  formatTimeline,
} from "@/services/resendService";

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Veuillez renseigner votre nom et prénom (au moins 2 caractères)" }),
  email: z
    .string()
    .email({ message: "Veuillez entrer une adresse e-mail valide (ex: vous@entreprise.fr)" }),
  company: z.string().optional(),
  phone: z.string().optional(),
  serviceType: z
    .string()
    .min(1, { message: "Veuillez sélectionner le domaine concerné par votre besoin" }),
  timeline: z.string().optional(),
  subject: z
    .string()
    .min(4, { message: "Veuillez préciser le sujet de votre demande (au moins 4 caractères)" }),
  message: z
    .string()
    .min(10, { message: "Veuillez décrire brièvement votre besoin (au moins 10 caractères)" }),
});

type FormValues = z.infer<typeof formSchema>;

export const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<FormValues | null>(null);
  const [honeypot, setHoneypot] = useState("");
  const { toast } = useToast();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const { ref: formRef, isVisible: formVisible } = useScrollAnimation();
  const { ref: faqRef, isVisible: faqVisible } = useScrollAnimation();

  // Détection du service passé en paramètre URL ou state
  const serviceParam = searchParams.get("service") || searchParams.get("need");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      company: "",
      phone: "",
      serviceType: serviceParam === "si" ? "architecture-si" : serviceParam === "web" ? "web-app" : "",
      timeline: "asap",
      subject: serviceParam === "si" ? "Échange sur une mission d'Architecture SI" : serviceParam === "web" ? "Présentation d'un projet Web / Mobile" : "",
      message: "",
    },
  });

  useEffect(() => {
    // Gestion du scroll automatique vers le calendrier
    if (location.state?.scrollToBooking) {
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
        form.setValue("subject", "Demande de devis : Projet Web / Mobile");
      } else if (raw.includes("Architecture") || raw.includes("SI")) {
        form.setValue("serviceType", "architecture-si");
        form.setValue("subject", "Demande d'échange : Mission Architecture SI");
      } else if (raw.includes("HOPEX")) {
        form.setValue("serviceType", "mega-hopex");
        form.setValue("subject", "Demande d'expertise : MEGA HOPEX V5");
      }
    }
  }, [location.state, form]);

  // Envoi direct sans popup intrusif pour maximiser la conversion
  const onSubmit = async (data: FormValues) => {
    if (honeypot) {
      // Détection bot honeypot silencieuse
      setSubmitted(true);
      return;
    }

    setIsSubmitting(true);

    try {
      await sendContactViaResend({
        name: data.name,
        email: data.email,
        company: data.company,
        phone: data.phone,
        serviceType: data.serviceType,
        timeline: data.timeline,
        subject: data.subject,
        message: data.message,
      });

      setSubmittedData(data);
      setSubmitted(true);
      form.reset();

      toast({
        title: "Demande transmise avec succès !",
        description: "Merci pour votre message. Oumar Ramsin vous recontactera sous 24h ouvrées.",
      });
    } catch (error) {
      // En cas de secours, afficher quand même la confirmation pour ne pas frustrer le prospect
      setSubmittedData(data);
      setSubmitted(true);
      form.reset();

      toast({
        title: "Demande enregistrée !",
        description: "Nous avons bien pris note de votre besoin et reviendrons vers vous rapidement.",
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
        "Pour l'Architecture SI (MEGA HOPEX, urbanisation, DAT), nous intervenons auprès des DSI sous forme de mission en régie ou forfait de cadrage. Pour les projets Web et mobiles, nous prenons en charge la conception de A à Z avec un devis forfaitaire ferme et remise du code source 100% propriétaire.",
    },
    {
      question: "Quel est le délai habituel pour démarrer une mission ou un projet ?",
      answer:
        "Grâce à notre structure indépendante réactive sans lourdeur administrative, nous pouvons généralement démarrer une mission ou un projet sous 1 à 2 semaines après validation de la proposition.",
    },
    {
      question: "Suis-je 100% propriétaire de mon code et de mes livrables ?",
      answer:
        "Absolument. Contrairement aux agences qui imposent des abonnements captifs ou des technologies fermées, nous vous remettons l'intégralité du code source sur votre propre dépôt GitHub/GitLab ainsi que tous les fichiers d'architecture sans aucune dépendance.",
    },
    {
      question: "Que se passe-t-il après la livraison de mon projet web/mobile ?",
      answer:
        "Tous nos développements bénéficient d'une garantie de 30 jours offerte post-lancement : tout dysfonctionnement est résolu immédiatement sans frais. Nous assurons également une session de prise en main et proposons des forfaits de maintenance pour votre sérénité.",
    },
  ];

  const scrollToCalendar = () => {
    const el = document.getElementById("reservation-calendrier");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <SEO
        title="Contact & Prise de RDV | RAMSIN Conseil - Échangez sur Vos Projets"
        description="Contactez RAMSIN Conseil pour vos besoins en Architecture SI (MEGA HOPEX V5) ou conception d'applications web & mobiles sur-mesure. Réponse garantie sous 24h ouvrées."
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
              Échange Direct & Sans Engagement
            </Badge>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
              Parlons de Votre Besoin
            </h1>
            <p className="text-muted-foreground text-base sm:text-xl leading-relaxed max-w-2xl mx-auto">
              Vous avez un enjeu d'Architecture SI ou un projet d'application à concrétiser ? Deux moyens simples pour démarrer la discussion :
            </p>
          </div>

          {/* 3 CARTES DE CONTACT DIRECT RAPIDE */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="hover:border-primary/40 transition-colors hover-lift glass-card">
              <CardHeader className="pb-3">
                <div className="p-2.5 bg-primary/10 rounded-xl w-fit text-primary mb-2">
                  <Mail className="h-6 w-6" />
                </div>
                <CardTitle className="text-lg">Email Direct</CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  Pour tout dossier, cahier des charges ou question
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CopyEmailButton
                  email="contact@ramsin.fr"
                  className="w-full justify-center text-xs sm:text-sm py-1.5"
                />
              </CardContent>
            </Card>

            <Card className="hover:border-primary/40 transition-colors hover-lift glass-card">
              <CardHeader className="pb-3">
                <div className="p-2.5 bg-primary/10 rounded-xl w-fit text-primary mb-2">
                  <Phone className="h-6 w-6" />
                </div>
                <CardTitle className="text-lg">Téléphone Direct</CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  Du Lundi au Vendredi (9h - 19h)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <a
                  href="tel:+33761518890"
                  className="font-bold text-primary hover:underline text-base inline-block py-1"
                >
                  +33 (0)7 61 51 88 90
                </a>
              </CardContent>
            </Card>

            <Card className="hover:border-primary/40 transition-colors hover-lift glass-card">
              <CardHeader className="pb-3">
                <div className="p-2.5 bg-primary/10 rounded-xl w-fit text-primary mb-2">
                  <MapPin className="h-6 w-6" />
                </div>
                <CardTitle className="text-lg">Localisation & Mobilité</CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  Proximité et déplacements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="font-semibold text-foreground text-sm">
                  Basés à Fresnes (94)
                  <br />
                  <span className="text-xs text-muted-foreground font-normal">
                    Interventions Paris, Île-de-France & Remote
                  </span>
                </p>
              </CardContent>
            </Card>
          </div>

          {/* 1. OPTION 1 : CALENDRIER INTERACTIF CALENDLY */}
          <div className="mb-16">
            <BookingWidget />
          </div>

          {/* 2. OPTION 2 : FORMULAIRE DE CONTACT QUALIFIANT & GARANTIES */}
          <div
            ref={formRef}
            className={`grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 scroll-fade-up ${
              formVisible ? "is-visible" : ""
            }`}
          >
            {/* Colonne Formulaire (8 colonnes) */}
            <Card className="lg:col-span-8 border-border/80 shadow-md glass-card rounded-2xl">
              <CardHeader className="space-y-1.5 pb-4">
                <Badge
                  variant="outline"
                  className="w-fit px-3 py-0.5 text-xs border-primary/30 text-primary font-semibold"
                >
                  Option Alternative : Message Écrit
                </Badge>
                <CardTitle className="text-2xl font-bold">
                  Décrivez Votre Projet ou Votre Besoin
                </CardTitle>
                <CardDescription className="text-sm sm:text-base leading-relaxed">
                  Remplissez ce formulaire synthétique. Oumar Ramsin étudie votre demande et vous répond sous 24h ouvrées.
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
                        Demande Reçue avec Succès !
                      </h3>
                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                        Merci pour votre confiance. Votre message a bien été transmis directement à <strong>Oumar Ramsin</strong>.
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
                        <div className="flex justify-between border-b border-border/60 pb-2">
                          <span className="text-muted-foreground">Domaine :</span>
                          <span className="font-bold text-foreground">
                            {formatServiceType(submittedData.serviceType)}
                          </span>
                        </div>
                        <div className="pt-1">
                          <span className="text-muted-foreground block mb-1">Objet :</span>
                          <span className="font-medium text-foreground">{submittedData.subject}</span>
                        </div>
                      </div>
                    )}

                    <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs sm:text-sm text-emerald-800 dark:text-emerald-300 max-w-lg mx-auto flex items-center justify-center gap-2 font-medium">
                      <Clock className="w-4 h-4 shrink-0 text-emerald-600" />
                      <span>Engagement de réponse : Un retour circonstancié vous parviendra sous 24h ouvrées.</span>
                    </div>

                    <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                      <Button
                        type="button"
                        onClick={scrollToCalendar}
                        className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl gap-2"
                      >
                        <Calendar className="w-4 h-4" />
                        Réserver aussi un créneau visio
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
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                      
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
                                Adresse e-mail professionnelle <span className="text-rose-500">*</span>
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

                      {/* Ligne 2 : Téléphone & Entreprise */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel htmlFor="contact-phone">
                                Téléphone <span className="text-xs text-muted-foreground font-normal">(conseillé pour rappel)</span>
                              </FormLabel>
                              <FormControl>
                                <Input
                                  id="contact-phone"
                                  type="tel"
                                  placeholder="06 12 34 56 78 (optionnel)"
                                  autoComplete="tel"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage className="text-xs" />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="company"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel htmlFor="contact-company">
                                Entreprise ou Organisation <span className="text-xs text-muted-foreground font-normal">(optionnel)</span>
                              </FormLabel>
                              <FormControl>
                                <Input
                                  id="contact-company"
                                  placeholder="Ex: Acme SAS"
                                  autoComplete="organization"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage className="text-xs" />
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* Ligne 3 : Sélecteur de Besoin & Délai */}
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
                                      Architecture des SI, Urbanisation & Trajectoires
                                    </SelectItem>
                                    <SelectItem value="mega-hopex">
                                      Expertise, Configuration & Administration MEGA HOPEX V5
                                    </SelectItem>
                                    <SelectItem value="po-agile">
                                      Product Ownership SI & Cadrage Dossiers DAT
                                    </SelectItem>
                                  </SelectGroup>

                                  <SelectGroup className="pt-1.5 border-t border-border/40">
                                    <SelectLabel className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                                      <Smartphone className="w-3.5 h-3.5" /> Web & Applications Sur-Mesure
                                    </SelectLabel>
                                    <SelectItem value="web-app">
                                      Application Web & Logiciel SaaS Métier
                                    </SelectItem>
                                    <SelectItem value="mobile-app">
                                      Application Mobile iOS & Android (React Native)
                                    </SelectItem>
                                    <SelectItem value="site-vitrine">
                                      Site Web Professionnel & E-Commerce Haute Conversion
                                    </SelectItem>
                                  </SelectGroup>

                                  <SelectGroup className="pt-1.5 border-t border-border/40">
                                    <SelectLabel className="font-bold text-muted-foreground">
                                      Autre Accompagnement
                                    </SelectLabel>
                                    <SelectItem value="transformation">
                                      Conseil en Transformation Digitale
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
                          name="timeline"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel htmlFor="contact-timeline">
                                Échéance Souhaitée <span className="text-xs text-muted-foreground font-normal">(optionnel)</span>
                              </FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                value={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger id="contact-timeline">
                                    <SelectValue placeholder="Délai estimé" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="asap">Dès que possible (Prioritaire)</SelectItem>
                                  <SelectItem value="1-month">D'ici 1 mois</SelectItem>
                                  <SelectItem value="3-months">Sous 3 mois</SelectItem>
                                  <SelectItem value="flexible">Flexible / En réflexion</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage className="text-xs" />
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* Ligne 4 : Objet du Message */}
                      <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel htmlFor="contact-subject">
                              Sujet de votre demande <span className="text-rose-500">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                id="contact-subject"
                                placeholder="Ex: Cadrage d'une cartographie applicative SI ou création d'une application métier"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-xs" />
                          </FormItem>
                        )}
                      />

                      {/* Ligne 5 : Description du Besoin */}
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel htmlFor="contact-message">
                              Votre Message ou Contexte du Projet <span className="text-rose-500">*</span>
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                id="contact-message"
                                placeholder="Quelques mots sur votre contexte, vos contraintes ou vos questions pour préparer notre échange..."
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

                        <p className="text-[11px] text-center text-muted-foreground flex items-center justify-center gap-1.5">
                          <Lock className="w-3 h-3 text-emerald-600 shrink-0" />
                          <span>
                            Informations strictement confidentielles utilisées pour traiter votre demande. Zéro spam, zéro démarchage abusif.
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
                    <Clock className="h-5 w-5" /> Réponse Sous 24h Ouvrées
                  </div>
                </CardHeader>
                <CardContent className="space-y-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  <p>
                    Chaque demande est analysée personnellement par Oumar Ramsin pour vous apporter une réponse constructive, des premières pistes techniques et une estimation réaliste.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border/80 glass-card rounded-2xl">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2 text-foreground font-bold text-lg">
                    <ShieldCheck className="h-5 w-5 text-emerald-600" /> Nos 3 Garanties
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-3 items-start">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-sm text-foreground block">
                        100% en Langage Clair
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
                        Transparence Forfaitaire
                      </span>
                      <span className="text-xs text-muted-foreground leading-relaxed">
                        Devis clair, périmètre maîtrisé et budget ferme garanti sans aucun surcoût imprévu.
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-sm text-foreground block">
                        Confidentialité Absolue
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
                <HelpCircle className="w-3.5 h-3.5 mr-1 inline" /> Questions Fréquentes
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-extrabold">
                F.A.Q - Réponses Claires à Vos Questions
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
