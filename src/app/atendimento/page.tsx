import type { Metadata } from "next";
import { QuoteChat } from "@/components/home/quote-chat";

export const metadata: Metadata = {
  title: "Atendimento",
  description:
    "Atendimento guiado para solicitar orçamento de fretamento com a Viação Lima."
};

export default function AtendimentoPage() {
  return (
    <section className="min-h-svh bg-white">
      <QuoteChat />
    </section>
  );
}
