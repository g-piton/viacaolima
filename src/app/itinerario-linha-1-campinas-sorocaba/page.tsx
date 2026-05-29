import type { Metadata } from "next";
import { ItineraryTabs } from "@/components/itinerary/itinerary-tabs";
import { Section } from "@/components/ui/section";

export const metadata: Metadata = {
  title: "Itinerários sob consulta",
  description:
    "Roteiros de fretamento da Viação Lima definidos conforme origem, destino e necessidade do grupo."
};

type ItineraryPageProps = {
  searchParams: Promise<{
    sentido?: string;
  }>;
};

export default async function ItineraryPage({ searchParams }: ItineraryPageProps) {
  const params = await searchParams;
  const active = params.sentido === "volta" ? "inbound" : "outbound";

  return (
    <Section
      eyebrow="Itinerário"
      title="Roteiros de fretamento sob consulta"
      description="A operação é planejada conforme origem, destino, paradas e horários combinados para cada contratação."
    >
      <ItineraryTabs active={active} />
    </Section>
  );
}
