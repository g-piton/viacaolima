import Image from "next/image";
import { ArrowRight, MessageCircle } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { company } from "@/lib/constants";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-lima-black text-white">
      <div className="absolute inset-0">
        <Image
          src="/images/frota/onibus.png"
          alt="Ônibus da Viação Lima em movimento"
          fill
          loading="eager"
          fetchPriority="high"
          className="object-cover object-center opacity-[0.56] sm:object-[center_45%]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-lima-black via-lima-black/82 to-lima-black/24 sm:bg-gradient-to-r sm:from-lima-black sm:via-lima-black/78 sm:to-lima-black/18" />
      </div>

      <div className="relative mx-auto flex min-h-[calc(100svh-4rem)] max-w-7xl items-end px-4 pb-36 pt-14 sm:min-h-[calc(100vh-5rem)] sm:items-center sm:px-6 sm:py-20 lg:px-8">
        <div className="max-w-3xl">
          <p className="mb-4 inline-flex max-w-full rounded-lg bg-white/12 px-3 py-2 text-xs font-bold text-white ring-1 ring-white/16 sm:mb-5 sm:text-sm">
            Transporte de passageiros desde 2020
          </p>
          <h1 className="text-4xl font-black leading-tight tracking-normal sm:text-5xl lg:text-6xl">
            Viação Lima
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-100 sm:mt-6 sm:text-lg sm:leading-8">
            Fretamento intermunicipal, interestadual e internacional para
            empresas, grupos, turismo, eventos e deslocamentos sob medida.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink
              href={company.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="sm:w-auto"
            >
              <MessageCircle aria-hidden size={18} />
              Chamar no WhatsApp
            </ButtonLink>
            <ButtonLink href="/atendimento" variant="secondary">
              Pedir orçamento
              <ArrowRight aria-hidden size={18} />
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
