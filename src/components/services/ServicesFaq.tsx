import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { WEB_FAQ } from "@/data/services";

/** Questions qui freinent un porteur de projet avant de se lancer */
export const ServicesFaq = () => (
  <div className="container mx-auto px-4 max-w-3xl space-y-8">
    <div className="text-center space-y-2">
      <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Questions fréquentes</span>
      <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground">Avant de vous lancer</h3>
    </div>
    <Accordion type="single" collapsible className="space-y-3">
      {WEB_FAQ.map(({ q, a }, i) => (
        <AccordionItem key={q} value={`faq-${i}`} className="rounded-2xl border border-border/80 bg-card px-5">
          <AccordionTrigger className="text-left font-bold hover:no-underline">{q}</AccordionTrigger>
          <AccordionContent className="text-muted-foreground leading-relaxed">{a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  </div>
);

export default ServicesFaq;
