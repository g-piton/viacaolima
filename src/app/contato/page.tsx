import type { Metadata } from "next";
import { QuoteForm } from "@/components/forms/quote-form";
import { Section } from "@/components/ui/section";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Solicite um orçamento de transporte com a Viação Lima pelo WhatsApp."
};

export default function ContactPage() {
  return (
    <Section
      id="orcamento"
      className="bg-lima-light"
      eyebrow="Orçamento"
      title="Conte sobre o trajeto"
      description="Com origem, destino, data e tipo de serviço, o atendimento consegue retornar com mais agilidade."
    >
      <QuoteForm />
    </Section>
  );
}
