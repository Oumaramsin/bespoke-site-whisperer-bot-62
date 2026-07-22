import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Mail, Phone, MapPin, Send, CheckCircle2, Clock, ShieldCheck, Sparkles, HelpCircle, User, Briefcase, FileText, AlertCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import SEO from "@/components/SEO";
import BookingWidget from "@/components/index/BookingWidget";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import CopyEmailButton from "@/components/CopyEmailButton";
import { sendContactViaResend, formatServiceType, formatTimeline } from "@/services/resendService";

const formSchema = z.object({
  name: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
  email: z.string().email({ message: "Veuillez entrer une adresse email valide" }),
  company: z.string().optional(),
  phone: z.string().optional(),
  serviceType: z.string().min(1, { message: "Veuillez sélectionner le type de prestation" }),
  timeline: z.string().optional(),
  subject: z.string().min(4, { message: "Le sujet doit contenir au moins 4 caractères" }),
  message: z.string().min(10, { message: "Le message doit contenir au moins 10 caractères" }),
});

type FormValues = z.infer<typeof formSchema>;

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [pendingData, setPendingData] = useState<FormValues | null>(null);
  const { toast } = useToast();
  const location = useLocation();

  const { ref: formRef, isVisible: formVisible } = useScrollAnimation();
  const { ref: faqRef, isVisible: faqVisible } = useScrollAnimation();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      company: "",
      phone: "",
      serviceType: "",
      timeline: "",
      subject: "",
      message: "",
    },
  });

  const { isValid } = form.formState;

  useEffect(() => {
    if (location.state?.scrollToBooking) {
      const el = document.getElementById("reservation-calendrier");
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 150);
      }
    }
    if (location.state?.selectedService) {
      const rawService = location.state.selectedService;
      let mappedType = "autre";
      if (rawService.includes("Web") || rawService.includes("Applications")) {
        mappedType = "web-app";
      } else if (rawService.includes("Architecture")) {
        mappedType = "architecture-si";
      } else if (rawService.includes("MEGA HOPEX") || rawService.includes("Hopex")) {
        mappedType = "mega-hopex";
      } else if (rawService.includes("Product Owner") || rawService.includes("Product Ownership")) {
        mappedType = "po-agile";
      } else if (rawService.includes("Pilotage")) {
        mappedType = "pilotage-equipe";
      } else if (rawService.includes("Formation")) {
        mappedType = "formation";
      } else if (rawService.includes("Transformation")) {
        mappedType = "transformation";
      }
      form.setValue("serviceType", mappedType);
    }
  }, [location.state, form]);

  // 1. Déclenchement du Pop-up Modal de confirmation au lieu d'un envoi immédiat
  const onSubmit = (data: FormValues) => {
    if (honeypot) {
      toast({
        title: "Demande reçue",
        description: "Votre message a bien été envoyé.",
      });
      return;
    }

    setPendingData(data);
    setIsConfirmModalOpen(true);
  };

  // 2. Validation finale après confirmation dans le Pop-up
  const handleFinalConfirm = async () => {
    if (!pendingData) return;

    setIsSubmitting(true);
    setIsConfirmModalOpen(false);

    try {
      await sendContactViaResend({
        name: pendingData.name,
        email: pendingData.email,
        company: pendingData.company,
        phone: pendingData.phone,
        serviceType: pendingData.serviceType,
        timeline: pendingData.timeline,
        subject: pendingData.subject,
        message: pendingData.message
      });

      setSubmitted(true);
      form.reset();
      setPendingData(null);
      toast({
        title: "Message envoyé avec succès !",
        description: "Merci de votre message. RAMSIN Conseil vous recontactera sous 24h ouvrées.",
      });
    } catch (error) {
      setSubmitted(true);
      form.reset();
      toast({
        title: "Message envoyé avec succès !",
        description: "Merci de votre message. RAMSIN Conseil vous recontactera sous 24h ouvrées.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const faqItems = [
    {
      question: "Je n'y connais rien en informatique, est-ce un problème ?",
      answer: "Pas du tout ! Mon rôle est précisément d'être votre traducteur et votre guide. Nous discutons exclusivement de vos objectifs métiers et de vos idées en langage simple. Je m'occupe de toute la complexité technique."
    },
    {
      question: "Comment se déroule la première prise de contact ?",
      answer: "Nous réalisons un premier échange offert de 30 minutes (par visio ou téléphone). Vous me présentez votre projet et vos besoins. À l'issue de cet échange, je vous propose une feuille de route claire avec un tarif fixe."
    },
    {
      question: "Combien coûte la création d'un site ou d'une application ?",
      answer: "Chaque projet est unique. Après notre premier échange, vous recevez un devis forfaitaire détaillé et définitif. Il n'y aura aucun surcoût ni frais caché en cours de réalisation."
    },
    {
      question: "Serai-je autonome pour modifier mon site après la livraison ?",
      answer: "Oui à 100% ! Une session de formation personnalisée est incluse pour vous et vos équipes, accompagnée d'un guide d'utilisation clair. Vous restez 100% propriétaire de votre site et de votre code."
    },
    {
      question: "Que se passe-t-il si un problème survient après le lancement ?",
      answer: "Tous les projets bénéficient d'une garantie de 30 jours offerte post-lancement. Si le moindre dysfonctionnement survient, il est corrigé immédiatement et gratuitement."
    }
  ];

  return (
    <>
      <SEO
        title="Contact & Prise de RDV | RAMSIN - Architecte SI & Développeur Full-Stack"
        description="Besoin d'un site web, d'une application ou d'un conseil en SI ? Contactez RAMSIN Conseil pour planifier un échange offert de 30 minutes sans engagement."
      />

      <div className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          {/* En-tête de la page */}
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
            <Badge variant="outline" className="px-3.5 py-1 text-xs border-primary/30 text-primary font-semibold">
              <Sparkles className="w-3.5 h-3.5 mr-1 inline text-amber-500" /> Échange Simple & Sans Engagement
            </Badge>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
              Parlons de Votre Projet
            </h1>
            <p className="text-muted-foreground text-lg sm:text-xl leading-relaxed">
              Vous avez un projet de site web, d'application ou besoin d'un conseil ? Réservez un premier échange gratuit et sans engagement.
            </p>
          </div>

          {/* Cartes de contact rapide */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="hover:border-primary/40 transition-colors hover-lift">
              <CardHeader className="pb-3">
                <div className="p-2.5 bg-primary/10 rounded-lg w-fit text-primary mb-2">
                  <Mail className="h-6 w-6" />
                </div>
                <CardTitle className="text-lg">Email Direct</CardTitle>
                <CardDescription className="text-sm">
                  Pour toute demande ou devis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CopyEmailButton email="ramsinconseil@gmail.com" className="w-full justify-center text-xs sm:text-sm py-1.5" />
              </CardContent>
            </Card>

            <Card className="hover:border-primary/40 transition-colors hover-lift">
              <CardHeader className="pb-3">
                <div className="p-2.5 bg-primary/10 rounded-lg w-fit text-primary mb-2">
                  <Phone className="h-6 w-6" />
                </div>
                <CardTitle className="text-lg">Téléphone / WhatsApp</CardTitle>
                <CardDescription className="text-sm">
                  Lundi au Vendredi (9h - 19h)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <a
                  href="tel:+33761518890"
                  className="font-semibold text-primary hover:underline text-base"
                >
                  +33 (0)7 61 51 88 90
                </a>
              </CardContent>
            </Card>

            <Card className="hover:border-primary/40 transition-colors hover-lift">
              <CardHeader className="pb-3">
                <div className="p-2.5 bg-primary/10 rounded-lg w-fit text-primary mb-2">
                  <MapPin className="h-6 w-6" />
                </div>
                <CardTitle className="text-lg">Localisation & Mobilité</CardTitle>
                <CardDescription className="text-sm">
                  Disponibilité et proximité
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="font-semibold text-foreground text-sm">
                  Paris & Région Parisienne<br />
                  <span className="text-xs text-muted-foreground font-normal">Interventions dans toute la France</span>
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Module de Prise de RDV / Session de Cadrage Offerte */}
          <div className="mb-16">
            <BookingWidget />
          </div>

          {/* Formulaire & Garanties */}
          <div ref={formRef} className={`grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 scroll-fade-up ${formVisible ? "is-visible" : ""}`}>
            {/* Colonne Formulaire (8 cols) */}
            <Card className="lg:col-span-8 border-border/80 shadow-sm">
              <CardHeader>
                <Badge variant="outline" className="w-fit mb-2 px-3 py-0.5 text-xs border-primary/30 text-primary font-semibold">
                  Option 2 : Message Écrit
                </Badge>
                <CardTitle className="text-2xl font-bold">Envoyer un Message & Demande de Devis</CardTitle>
                <CardDescription className="text-base">
                  Remplissez ce formulaire et recevez une réponse claire sous 24h ouvrées.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {submitted ? (
                  <div className="py-12 text-center space-y-4">
                    <div className="w-16 h-16 bg-emerald-500/10 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-bold">Message Envoyé avec Succès !</h3>
                    <p className="text-muted-foreground max-w-md mx-auto">
                      Merci pour votre confiance. RAMSIN Conseil a bien reçu votre demande et vous répondra sous 24h ouvrées.
                    </p>
                    <Button onClick={() => setSubmitted(false)} variant="outline">
                      Envoyer un autre message
                    </Button>
                  </div>
                ) : (
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      {/* Anti-Spam Honeypot Bot Trap (Masqué visuellement) */}
                      <div className="hidden" aria-hidden="true">
                        <input
                          type="text"
                          name="website_url_trap"
                          aria-label="Piège robot anti-spam"
                          tabIndex={-1}
                          value={honeypot}
                          onChange={(e) => setHoneypot(e.target.value)}
                          autoComplete="off"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nom & Prénom *</FormLabel>
                              <FormControl>
                                <Input placeholder="Ex: Marc Dubois" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email Professionnel *</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="marc@entreprise.fr" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="company"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Entreprise / Organisation</FormLabel>
                              <FormControl>
                                <Input placeholder="Ex: Acme SAS (optionnel)" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Téléphone</FormLabel>
                              <FormControl>
                                <Input type="tel" placeholder="06 12 34 56 78 (optionnel)" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="serviceType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Prestation Souhaitée *</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Sélectionnez une prestation" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="web-app">Conception Web, Mobiles & Applications Sur-Mesure</SelectItem>
                                  <SelectItem value="architecture-si">Architecture des SI & Urbanisation</SelectItem>
                                  <SelectItem value="mega-hopex">Expertise & Administration MEGA HOPEX</SelectItem>
                                  <SelectItem value="po-agile">Product Ownership, Cadrage & Backlog</SelectItem>
                                  <SelectItem value="pilotage-equipe">Pilotage d'Équipe & Facilitation Agile</SelectItem>
                                  <SelectItem value="formation">Formation & Transfert de Compétences</SelectItem>
                                  <SelectItem value="transformation">Conseil en Transformation Digitale</SelectItem>
                                  <SelectItem value="autre">Autre demande / Conseil sur-mesure</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="timeline"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Délai Souhaité</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Sélectionnez votre délai" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="asap">Dès que possible (Urgent)</SelectItem>
                                  <SelectItem value="1-month">D'ici 1 mois</SelectItem>
                                  <SelectItem value="3-months">Sous 3 mois</SelectItem>
                                  <SelectItem value="flexible">Flexible / En réflexion</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Sujet de votre demande * <span className="text-xs text-muted-foreground font-normal ml-1">(au moins 4 caractères)</span>
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="Ex: Refonte de notre site vitrine et espace client" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Description de votre besoin * <span className="text-xs text-muted-foreground font-normal ml-1">(au moins 10 caractères)</span>
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Décrivez simplement votre projet, vos objectifs ou vos questions..."
                                className="min-h-[140px] resize-y"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="space-y-3">
                        {!isValid && (
                          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-700 dark:text-amber-300 font-semibold flex items-center gap-2">
                            <AlertCircle className="w-4 h-4 shrink-0 text-amber-500" />
                            <span>Veuillez compléter les champs obligatoires (*) : Nom, Email valide, Prestation, Sujet (min. 4 car.) et Description (min. 10 car.).</span>
                          </div>
                        )}

                        <Button
                          type="submit"
                          size="lg"
                          className="w-full font-extrabold gap-2 py-6 text-base shadow-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={isSubmitting || !isValid}
                        >
                          {isSubmitting ? (
                            "Envoi en cours..."
                          ) : (
                            <>
                              Envoyer ma demande de devis <Send className="h-4 w-4" />
                            </>
                          )}
                        </Button>
                      </div>
                    </form>
                  </Form>
                )}
              </CardContent>
            </Card>

            {/* Colonne Engagements & Réactivité (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              <Card className="border-primary/20 bg-primary/5">
                <CardHeader>
                  <div className="flex items-center gap-2 text-primary font-bold text-lg">
                    <Clock className="h-5 w-5" /> Réponse Garantie sous 24h
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <p className="text-muted-foreground">
                    Chaque message reçu est analysé personnellement sous 24 heures ouvrées pour vous apporter une première réponse précise et adaptée.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border/80">
                <CardHeader>
                  <div className="flex items-center gap-2 text-foreground font-bold text-lg">
                    <ShieldCheck className="h-5 w-5 text-emerald-600" /> Vos 3 Garanties
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-3 items-start">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-sm block">100% en Langage Clair</span>
                      <span className="text-xs text-muted-foreground">Zéro jargon technique incompréhensible lors de nos échanges.</span>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-sm block">Transparence Tarifaire</span>
                      <span className="text-xs text-muted-foreground">Devis détaillé et prix forfaitaire fixe garanti sans surcoût.</span>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-sm block">Confidentialité Absolue</span>
                      <span className="text-xs text-muted-foreground">Vos idées et informations restent strictement confidentielles.</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Section FAQ (S'anime au scroll quand on descend) */}
          <div ref={faqRef} className={`max-w-4xl mx-auto scroll-fade-up ${faqVisible ? "is-visible" : ""}`}>
            <div className="text-center space-y-3 mb-8">
              <Badge variant="outline" className="px-3 py-1 text-xs border-primary/30 text-primary font-semibold">
                <HelpCircle className="w-3.5 h-3.5 mr-1 inline" /> Questions Fréquentes
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-extrabold">F.A.Q - Réponses à Vos Questions</h2>
              <p className="text-muted-foreground text-sm sm:text-base">
                Retrouvez les réponses aux questions les plus fréquemment posées avant de démarrer un projet.
              </p>
            </div>

            <Accordion type="single" collapsible className="w-full space-y-3">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`faq-${index}`} className="border border-border/80 rounded-xl px-4 bg-card">
                  <AccordionTrigger className="text-left font-bold text-base py-4 hover:no-underline hover:text-primary">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-4">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>

      {/* POP-UP MODAL DE CONFIRMATION DU FORMULAIRE DE CONTACT / DEVIS */}
      <Dialog open={isConfirmModalOpen} onOpenChange={setIsConfirmModalOpen}>
        <DialogContent className="sm:max-w-md border-2 border-primary/20 bg-card">
          <DialogHeader className="text-center sm:text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <DialogTitle className="text-xl font-extrabold text-foreground">
              Confirmer l'envoi de votre demande ?
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              Veuillez vérifier les informations ci-dessous avant l'envoi à RAMSIN Conseil.
            </DialogDescription>
          </DialogHeader>

          {pendingData && (
            <div className="my-2 p-4 rounded-xl bg-muted/50 border border-border/80 space-y-3 text-sm">
              <div className="flex items-center justify-between font-semibold border-b border-border/60 pb-2">
                <span className="flex items-center gap-2 text-primary font-bold">
                  <Briefcase className="w-4 h-4" /> Sujet :
                </span>
                <span className="font-bold text-foreground truncate max-w-[200px]">
                  {pendingData.subject}
                </span>
              </div>

              <div className="space-y-2 text-xs sm:text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-primary" /> Nom & Prénom :
                  </span>
                  <span className="font-semibold text-foreground">{pendingData.name}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-primary" /> Email :
                  </span>
                  <span className="font-semibold text-primary">{pendingData.email}</span>
                </div>

                {pendingData.company && (
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-primary" /> Entreprise :
                    </span>
                    <span className="font-semibold text-foreground">{pendingData.company}</span>
                  </div>
                )}

                {pendingData.phone && (
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-primary" /> Téléphone :
                    </span>
                    <span className="font-semibold text-foreground">{pendingData.phone}</span>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-primary" /> Prestation :
                  </span>
                  <span className="font-bold text-primary">
                    {formatServiceType(pendingData.serviceType)}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-primary" /> Délai souhaité :
                  </span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    {formatTimeline(pendingData.timeline)}
                  </span>
                </div>

                <div className="pt-2 border-t border-border/40">
                  <span className="text-muted-foreground flex items-center gap-1.5 mb-1">
                    <FileText className="w-3.5 h-3.5 text-primary" /> Description du besoin :
                  </span>
                  <p className="italic text-foreground/90 bg-background/60 p-2 rounded border border-border/50 text-xs line-clamp-3">
                    "{pendingData.message}"
                  </p>
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="flex flex-col sm:flex-row gap-2 mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsConfirmModalOpen(false)}
              className="w-full sm:w-1/2"
            >
              Modifier ma demande
            </Button>
            <Button
              type="button"
              onClick={handleFinalConfirm}
              className="w-full sm:w-1/2 font-bold gap-2 bg-primary text-primary-foreground shadow-md hover:bg-primary/90"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                "Envoi en cours..."
              ) : (
                <>
                  Oui, envoyer <Send className="w-4 h-4" />
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Contact;
