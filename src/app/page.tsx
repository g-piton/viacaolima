import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { Hero } from "@/components/home/hero";
import { FleetGrid } from "@/components/fleet/fleet-grid";
import { PartnerStrip } from "@/components/partners/partner-strip";
import { ServiceGrid } from "@/components/services/service-grid";
import { Section } from "@/components/ui/section";

export const metadata: Metadata = {
  title: "Transporte de passageiros por fretamento",
  description:
    "Fretamento intermunicipal, interestadual e internacional com ônibus, vans e micro-ônibus."
};

export default function Home() {
  return (
    <>
      <Hero />
      <Section
        eyebrow="Desde 2020"
        title="Transporte com conforto, segurança e pontualidade"
        description="A Viação Lima atua no transporte rodoviário coletivo de passageiros sob regime de fretamento, atendendo empresas, grupos, excursões, turismo e aeroportos."
      >
        <div className="grid gap-4 sm:grid-cols-3">
          {["Conforto", "Segurança", "Pontualidade"].map((item) => (
            <div
              key={item}
              className="flex items-center gap-3 rounded-2xl bg-lima-light p-5 text-lg font-bold text-lima-black"
            >
              <CheckCircle2 aria-hidden className="text-lima-dark" />
              {item}
            </div>
          ))}
        </div>
      </Section>
      <Section
        className="bg-lima-light"
        eyebrow="Serviços"
        title="Soluções para diferentes rotinas de transporte"
        description="Atendimento sob medida para contratos recorrentes, viagens pontuais e deslocamentos executivos."
      >
        <ServiceGrid />
      </Section>
      <Section
        eyebrow="Frota"
        title="Ônibus, micro-ônibus e vans"
        description="Veículos adequados ao tamanho do grupo, ao tipo de viagem e ao nível de conforto necessário."
      >
        <FleetGrid />
      </Section>
      <Section
        className="bg-lima-light"
        eyebrow="Parceiros"
        title="Empresas e instituições atendidas"
        description="Relacionamentos construídos com foco em segurança, regularidade e atendimento responsável."
      >
        <PartnerStrip />
      </Section>
    </>
  );
}
