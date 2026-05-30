import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { QuoteChat } from "@/components/home/quote-chat";

export const metadata: Metadata = {
  title: "Atendimento",
  description:
    "Atendimento guiado para solicitar orçamento de fretamento com a Viação Lima."
};

export default function AtendimentoPage() {
  return (
    <section className="border-b border-white/10 bg-lima-black text-white">
      <div className="mx-auto grid min-h-[calc(100svh-4rem)] max-w-7xl gap-6 px-4 py-6 sm:min-h-[calc(100vh-5rem)] sm:px-6 sm:py-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-8 lg:px-8 lg:py-12">
        <div>
          <Link
            href="/"
            className="focus-ring mb-6 inline-flex items-center gap-2 rounded-lg border border-white/15 px-4 py-3 text-sm font-bold text-white transition hover:bg-white/10 sm:mb-8"
          >
            <ArrowLeft aria-hidden size={18} />
            Voltar ao site
          </Link>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-lima-green">
            Atendimento
          </p>
          <h1 className="mt-3 text-3xl font-black leading-tight sm:text-5xl">
            Responda poucas perguntas e envie pelo WhatsApp.
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-6 text-slate-300 sm:mt-5 sm:text-base sm:leading-7">
            Atendimento rápido para organizar os dados da viagem. Ao final,
            abrimos o WhatsApp com as informações prontas para envio.
          </p>
        </div>
        <QuoteChat />
      </div>
    </section>
  );
}
