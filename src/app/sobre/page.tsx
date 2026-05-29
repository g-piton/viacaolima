import type { Metadata } from "next";
import Image from "next/image";
import { Section } from "@/components/ui/section";

export const metadata: Metadata = {
  title: "Sobre",
  description:
    "Conheça a Viação Lima, empresa de transporte e turismo fundada em 17/08/2020."
};

export default function AboutPage() {
  return (
    <>
      <Section
        eyebrow="Sobre"
        title="Uma trajetória dedicada ao transporte de passageiros"
        description="Fundada em 17/08/2020, a Viação Lima atua com transporte rodoviário coletivo de passageiros sob regime de fretamento."
      >
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image
              src="/images/frota/onibus.png"
              alt="Veículo de transporte em operação"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 45vw, 100vw"
            />
          </div>
          <div className="space-y-5 text-base leading-8 text-slate-700">
            <p>
              A razão social Viacao Lima - Transportes e Turismo Ltda reforça a
              atuação em fretamento intermunicipal, interestadual e
              internacional, com operação focada em conforto, segurança e
              pontualidade.
            </p>
            <p>
              A frota contempla ônibus, vans e micro-ônibus, permitindo adaptar
              o serviço ao tamanho do grupo, ao roteiro e à frequência do
              contrato.
            </p>
            <p>
              O compromisso é oferecer um transporte confiável para empresas,
              grupos e instituições que precisam se deslocar com organização.
            </p>
            <p className="font-semibold text-lima-dark">
              CNPJ 38.113.729/0001-47.
            </p>
          </div>
        </div>
      </Section>
      <Section className="bg-lima-light" title="Linha do tempo">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            ["2020", "Fundação da Viação Lima em 17/08/2020."],
            ["Atuação", "Fretamento intermunicipal, interestadual e internacional."],
            ["Hoje", "Operação com ônibus, micro-ônibus e vans para empresas, grupos e turismo."]
          ].map(([year, text]) => (
            <article key={year} className="rounded-2xl bg-white p-6 shadow-sm">
              <p className="text-3xl font-black text-lima-dark">{year}</p>
              <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
