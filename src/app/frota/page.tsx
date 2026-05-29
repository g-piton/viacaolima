import type { Metadata } from "next";
import { FleetGrid } from "@/components/fleet/fleet-grid";
import { Section } from "@/components/ui/section";

export const metadata: Metadata = {
  title: "Frota",
  description:
    "Conheça as opções de ônibus, micro-ônibus e vans para transporte de passageiros."
};

export default function FleetPage() {
  return (
    <Section
      eyebrow="Frota"
      title="Veículos para cada tipo de deslocamento"
      description="A Viação Lima atende com ônibus, vans e micro-ônibus para fretamento empresarial, executivo, eventual, turístico e aeroportos."
    >
      <FleetGrid />
    </Section>
  );
}
