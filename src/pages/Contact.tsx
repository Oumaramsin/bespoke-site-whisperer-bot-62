import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Mail, Phone, MapPin, Send, CheckCircle2, Clock, ShieldCheck, Sparkles, HelpCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import SEO from "@/components/SEO";
import BookingWidget from "@/components/index/BookingWidget";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import CopyEmailButton from "@/components/CopyEmailButton";

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
  const { toast } = useToast();

  const { ref: formRef, isVisible: formVisible } = useScrollAnimation();
  const { ref: faqRef, isVisible: faqVisible } = useScrollAnimation();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
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

  const onSubmit = async (data: FormValues) => {
    // Honeypot anti-spam
    if (honeypot) {
      toast({
        title: "Demande reçue",
        description: "Votre message a bien été envoyé.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("https://formspree.io/f/xvgopkbl", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          ...data,
          _subject: `[Contact Site Web] ${data.subject} - De ${data.name}`
        })
      });

      if (response.ok) {
        setSubmitted(true);
        form.reset();
        toast({
          title: "Message envoyé avec succès !",
          description: "Merci de votre message. Oumar SIDIBÉ vous recontactera sous 24h ouvrées.",
        });
      } else {
        throw new Error("Erreur réseau lors de l'envoi");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur lors de l'envoi",
        description: "Un problème est survenu. Vous pouvez contacter Oumar directement par email à sidibeoumar94@gmail.com.",
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
        title="Contact & Prise de RDV | Oumar SIDIBÉ - Architecte SI & Développeur Fullstack"
        description="Besoin d'un site web, d'une application ou d'un conseil en SI ? Contactez Oumar SIDIBÉ pour planifier un échange offert de 30 minutes sans engagement."
      />

      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-5xl mx-auto">
          {/* En-tête (Visible immédiatement) */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              Discutons de Votre Projet
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Vous avez un projet de site web, d'application ou besoin d'un conseil ? Réservez un premier échange gratuit et sans engagement.
            </p>
          </div>

          {/* Cartes de contact rapide (Visibles immédiatement) */}
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
                <CopyEmailButton email="sidibeoumar94@gmail.com" className="w-full justify-center text-xs sm:text-sm py-1.5" />
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

          {/* Module de Prise de RDV / Session de Cadrage Offerte (Visible immédiatement) */}
          <div className="mb-16">
            <BookingWidget />
          </div>

          {/* Formulaire & Garanties (S'anime au scroll quand on descend) */}
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
                      Merci pour votre confiance. Oumar SIDIBÉ a bien reçu votre demande et vous répondra sous 24h ouvrées.
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
                                  <SelectItem value="web-app">Création d'un Site Web / Application</SelectItem>
                                  <SelectItem value="ecommerce">Boutique E-Commerce / Vente en ligne</SelectItem>
                                  <SelectItem value="architecture-si">Architecture SI & Cartographie</SelectItem>
                                  <SelectItem value="mega-hopex">Expertise / Administration MEGA HOPEX</SelectItem>
                                  <SelectItem value="po-agile">Product Owner & Gestion de Projet</SelectItem>
                                  <SelectItem value="autre">Autre demande / Conseil</SelectItem>
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
                                  <SelectItem value="asap">Dès que possible</SelectItem>
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
                            <FormLabel>Sujet de votre demande *</FormLabel>
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
                            <FormLabel>Description de votre besoin *</FormLabel>
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

                      <Button
                        type="submit"
                        size="lg"
                        disabled={isSubmitting || !form.formState.isValid}
                        className="w-full gap-2 font-bold shadow-md"
                      >
                        {isSubmitting ? (
                          "Envoi en cours..."
                        ) : (
                          <>
                            Envoyer ma demande <Send className="h-4 w-4" />
                          </>
                        )}
                      </Button>
                    </form>
                  </Form>
                )}
              </CardContent>
            </Card>

            {/* Colonne Réassurance B2B (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              <Card className="bg-primary/5 border-primary/20">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2 text-primary">
                    <Clock className="w-5 h-5" /> Engagements Sérénité
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <p><strong>Échange Offert :</strong> 30 minutes de conseil gratuites sans engagement.</p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <p><strong>Réponse Rapide :</strong> Retour sous 24 heures ouvrées garanti.</p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <p><strong>Langage Clair :</strong> Explications simples et accompagnement étape par étape.</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-primary" /> Vos Garanties
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <p><strong className="text-foreground">Devis Fixe :</strong> Tarif clair validé avant le lancement.</p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <p><strong className="text-foreground">Accompagnement Inclus :</strong> Prise en main facile de votre outil.</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Section FAQ Spéciale Client Non-Technique (S'anime au scroll) */}
          <Card ref={faqRef} className={`border border-border/80 shadow-xs scroll-fade-up ${faqVisible ? "is-visible" : ""}`}>
            <CardHeader className="text-center pb-2">
              <HelpCircle className="w-10 h-10 text-primary mx-auto mb-2" />
              <CardTitle className="text-2xl font-bold">Vos Questions Fréquentes</CardTitle>
              <CardDescription className="text-base">
                Tout ce que vous devez savoir avant de vous lancer dans votre projet.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <Accordion type="single" collapsible className="w-full">
                {faqItems.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary text-base">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-sm leading-relaxed">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Contact;
