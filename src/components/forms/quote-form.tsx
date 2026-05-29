"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { ArrowLeft, Send } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { services } from "@/data/services";
import { leadSchema, type LeadFormData } from "@/lib/validations";
import { FormField } from "./form-field";

const inputClass =
  "focus-ring w-full rounded-lg border-slate-300 bg-white text-lima-black shadow-sm";
const quoteWhatsappNumber = "5519981188065";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    timeZone: "America/Sao_Paulo"
  }).format(new Date(`${value}T12:00:00`));
}

function buildWhatsappUrl(data: LeadFormData) {
  const message = [
    "Olá, gostaria de solicitar um orçamento com a Viação Lima.",
    "",
    `Nome: ${data.firstName} ${data.lastName}`,
    `E-mail: ${data.email}`,
    `Telefone/WhatsApp: ${data.phone}`,
    `Tipo de serviço: ${data.serviceType}`,
    `Origem: ${data.origin}`,
    `Destino: ${data.destination}`,
    `Data desejada: ${formatDate(data.desiredDate)}`,
    "",
    `Roteiro: ${data.message || "Não informado"}`
  ].join("\n");

  return `https://wa.me/${quoteWhatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function QuoteForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema)
  });

  function onSubmit(data: LeadFormData) {
    setStatus("idle");
    window.open(buildWhatsappUrl(data), "_blank", "noopener,noreferrer");
    reset();
    setStatus("success");
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid gap-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-soft sm:grid-cols-2 sm:p-6"
    >
      <FormField label="Nome" error={errors.firstName?.message}>
        <input className={inputClass} {...register("firstName")} />
      </FormField>
      <FormField label="Sobrenome" error={errors.lastName?.message}>
        <input className={inputClass} {...register("lastName")} />
      </FormField>
      <FormField label="E-mail" error={errors.email?.message}>
        <input className={inputClass} type="email" {...register("email")} />
      </FormField>
      <FormField label="Telefone/WhatsApp" error={errors.phone?.message}>
        <input className={inputClass} inputMode="tel" {...register("phone")} />
      </FormField>
      <FormField label="Tipo de serviço" error={errors.serviceType?.message}>
        <select className={inputClass} {...register("serviceType")}>
          <option value="">Selecione</option>
          {services.map((service) => (
            <option key={service.title} value={service.title}>
              {service.title}
            </option>
          ))}
        </select>
      </FormField>
      <FormField label="Data desejada" error={errors.desiredDate?.message}>
        <input className={inputClass} type="date" {...register("desiredDate")} />
      </FormField>
      <FormField label="Origem" error={errors.origin?.message}>
        <input className={inputClass} {...register("origin")} />
      </FormField>
      <FormField label="Destino" error={errors.destination?.message}>
        <input className={inputClass} {...register("destination")} />
      </FormField>
      <div className="sm:col-span-2">
        <FormField
          label="Descreva brevemente o roteiro"
          error={errors.message?.message}
        >
          <textarea
            className={inputClass}
            rows={4}
            placeholder="Exemplo: saída da empresa, parada intermediária e destino final."
            {...register("message")}
          />
        </FormField>
      </div>
      <div className="sm:col-span-2">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/"
            className="focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-lima-green px-5 py-3 text-sm font-bold text-lima-dark transition hover:bg-lima-light"
          >
            <ArrowLeft aria-hidden size={18} />
            Voltar ao menu principal
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-lima-green px-5 py-3 text-sm font-bold text-white transition hover:bg-lima-dark disabled:cursor-not-allowed disabled:opacity-70"
          >
            <Send aria-hidden size={18} />
            {isSubmitting ? "Enviando" : "Enviar no WhatsApp"}
          </button>
        </div>
        {status === "success" && (
          <p className="mt-3 text-sm font-semibold text-lima-dark sm:text-right">
            Abrimos o WhatsApp com a solicitação preenchida.
          </p>
        )}
        {status === "error" && (
          <p className="mt-3 text-sm font-semibold text-red-700 sm:text-right">
            Não foi possível enviar agora. Tente novamente em instantes.
          </p>
        )}
      </div>
    </form>
  );
}
