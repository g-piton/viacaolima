import type { Metadata } from "next";
import { ServiceGrid } from "@/components/services/service-grid";
import { Section } from "@/components/ui/section";

export const metadata: Metadata = {
  title: "Serviços",
  description:
    "Fretamento empresarial, executivo, contínuo, eventual, transporte turístico, excursões e aeroportos."
};

export default function ServicesPage() {
  return (
    <Section
      eyebrow="Serviços"
      title="Transporte para empresas, grupos, turismo e aeroportos"
      description="Serviços organizados para rotinas recorrentes, viagens sob demanda e deslocamentos executivos."
    >
      <ServiceGrid />
    </Section>
  );
}
