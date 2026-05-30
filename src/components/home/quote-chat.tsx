"use client";

import Image from "next/image";
import { ArrowRight, RotateCcw, Send } from "lucide-react";
import type { CSSProperties } from "react";
import { useEffect, useMemo, useRef, useState } from "react";

type Field =
  | "name"
  | "service"
  | "origin"
  | "destination"
  | "date"
  | "passengers"
  | "details";

type AnswerMap = Record<Field, string>;

const initialAnswers: AnswerMap = {
  name: "",
  service: "",
  origin: "",
  destination: "",
  date: "",
  passengers: "",
  details: ""
};

const steps: Array<{
  field: Field;
  question: string;
  placeholder: string;
  options?: string[];
}> = [
  {
    field: "name",
    question: "Para começar, qual é o seu nome?",
    placeholder: "Seu nome"
  },
  {
    field: "service",
    question: "Qual tipo de transporte você precisa?",
    placeholder: "Exemplo: fretamento empresarial",
    options: ["Empresarial", "Excursão", "Turismo", "Aeroporto", "Evento"]
  },
  {
    field: "origin",
    question: "Qual é a origem da viagem?",
    placeholder: "Cidade, bairro ou endereço de saída"
  },
  {
    field: "destination",
    question: "Qual é o destino?",
    placeholder: "Cidade, bairro ou endereço de destino"
  },
  {
    field: "date",
    question: "Qual a data desejada?",
    placeholder: "dd/mm/aaaa"
  },
  {
    field: "passengers",
    question: "Quantos passageiros aproximadamente?",
    placeholder: "Exemplo: 28"
  },
  {
    field: "details",
    question: "Tem alguma observação sobre horários, paradas ou retorno?",
    placeholder: "Exemplo: saída 7h, retorno no mesmo dia"
  }
];

function formatDateInput(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 8);
  if (digits.length <= 2) return digits;
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
}

function buildWhatsappUrl(answers: AnswerMap) {
  const message = [
    "Olá, gostaria de solicitar um orçamento com a Viação Lima.",
    "",
    `Nome: ${answers.name}`,
    `Tipo de transporte: ${answers.service}`,
    `Origem: ${answers.origin}`,
    `Destino: ${answers.destination}`,
    `Data desejada: ${answers.date}`,
    `Passageiros: ${answers.passengers}`,
    `Observações: ${answers.details || "Não informado"}`
  ].join("\n");

  return `https://wa.me/5519981188065?text=${encodeURIComponent(message)}`;
}

export function QuoteChat() {
  const [answers, setAnswers] = useState<AnswerMap>(initialAnswers);
  const [stepIndex, setStepIndex] = useState(0);
  const [visibleStepCount, setVisibleStepCount] = useState(1);
  const [input, setInput] = useState("");
  const [assistantState, setAssistantState] = useState<"idle" | "waiting" | "typing">(
    "idle"
  );
  const scrollRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const waitingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const currentStep = steps[Math.min(stepIndex, steps.length - 1)];
  const isDone = stepIndex >= steps.length;
  const chatHeight = Math.min(18 + visibleStepCount * 4.25, 34);
  const isAssistantBusy = assistantState !== "idle";

  const messages = useMemo(() => {
    const answered = steps
      .slice(0, visibleStepCount)
      .flatMap((step, index) => {
        const messagesForStep = [{ from: "bot", text: step.question }];
        const answer = answers[step.field];

        if (answer) {
          messagesForStep.push({ from: "user", text: answer });
        }

        if (assistantState === "typing" && index === visibleStepCount - 1) {
          messagesForStep.push({ from: "typing", text: "" });
        }

        return messagesForStep;
      });

    if (isDone && assistantState === "idle") {
      answered.push({
        from: "bot",
        text: "Perfeito. Posso abrir o WhatsApp com seu pedido organizado."
      });
    }

    return answered;
  }, [answers, assistantState, isDone, visibleStepCount]);

  function submit(value = input) {
    const trimmed = value.trim();
    if (!trimmed || isDone || isAssistantBusy) return;

    setAnswers((current) => ({
      ...current,
      [currentStep.field]: trimmed
    }));
    setInput("");
    setAssistantState("waiting");
    window.setTimeout(() => inputRef.current?.focus(), 0);

    waitingTimeoutRef.current = setTimeout(() => {
      setAssistantState("typing");

      typingTimeoutRef.current = setTimeout(() => {
        setStepIndex((current) => {
          const next = current + 1;
          setVisibleStepCount(Math.min(next + 1, steps.length));
          return next;
        });
        setAssistantState("idle");
        window.setTimeout(() => inputRef.current?.focus(), 0);
      }, 2000);
    }, 2000);
  }

  function reset() {
    if (waitingTimeoutRef.current) {
      clearTimeout(waitingTimeoutRef.current);
    }
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    setAnswers(initialAnswers);
    setInput("");
    setStepIndex(0);
    setVisibleStepCount(1);
    setAssistantState("idle");
    window.setTimeout(() => inputRef.current?.focus(), 0);
  }

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  useEffect(() => {
    if (!isDone) {
      inputRef.current?.focus();
    }
  }, [currentStep.field, isDone]);

  useEffect(() => {
    return () => {
      if (waitingTimeoutRef.current) {
        clearTimeout(waitingTimeoutRef.current);
      }
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  function handleInputChange(value: string) {
    setInput(currentStep.field === "date" ? formatDateInput(value) : value);
  }

  return (
    <div
      className="flex h-[min(calc(var(--chat-height)-6rem),calc(100svh-2rem))] max-h-[min(34rem,calc(100svh-2rem))] min-h-[15.5rem] flex-col rounded-lg border border-white/10 bg-white p-3 text-lima-black shadow-soft transition-[height] duration-500 sm:h-[var(--chat-height)] sm:min-h-[22rem] sm:p-5 lg:max-h-[calc(100vh-11rem)]"
      style={{ "--chat-height": `${chatHeight}rem` } as CSSProperties}
    >
      <div className="mb-4 flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <p className="text-sm font-black">Atendimento de orçamento</p>
          <p className="text-xs font-semibold text-slate-500">
            Atendimento Viação Lima
          </p>
        </div>
        <button
          type="button"
          onClick={reset}
          className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:bg-slate-50"
          aria-label="Reiniciar atendimento"
        >
          <RotateCcw aria-hidden size={17} />
        </button>
      </div>

      <div ref={scrollRef} className="min-h-0 flex-1 space-y-3 overflow-y-auto pr-1">
        {messages.map((message, index) => {
          const isAssistantMessage =
            message.from === "bot" || message.from === "typing";

          return isAssistantMessage ? (
            <div key={`${message.from}-${index}`} className="flex items-start gap-2 sm:gap-3">
              <span className="relative mt-1 h-8 w-8 shrink-0 overflow-hidden rounded-full border-2 border-lima-green bg-white sm:h-9 sm:w-9">
                <Image
                  src="/images/logo/assistant-avatar.png"
                  alt=""
                  fill
                  sizes="36px"
                  className="object-cover"
                />
              </span>
              <div className="mr-2 rounded-lg bg-slate-100 px-3 py-2.5 text-sm leading-6 text-slate-700 sm:mr-8 sm:px-4 sm:py-3">
                {message.from === "typing" ? (
                  <span
                    className="inline-flex items-center gap-1"
                    aria-label="Digitando"
                  >
                    <span className="h-2 w-2 animate-bounce rounded-full bg-slate-500 [animation-delay:-0.2s]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-slate-500 [animation-delay:-0.1s]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-slate-500" />
                  </span>
                ) : (
                  message.text
                )}
              </div>
            </div>
          ) : (
            <div
              key={`${message.from}-${index}`}
              className="ml-10 rounded-lg bg-lima-light px-3 py-2.5 text-sm font-semibold leading-6 text-lima-dark sm:ml-12 sm:px-4 sm:py-3"
            >
              {message.text}
            </div>
          );
        })}
        <div ref={endRef} />
      </div>

      {!isDone && currentStep.options && !answers[currentStep.field] && (
        <div className="mt-4 flex flex-wrap gap-2">
          {currentStep.options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => submit(option)}
              disabled={isAssistantBusy}
              className="focus-ring rounded-lg border border-lima-dark/15 px-3 py-2 text-xs font-bold text-lima-dark transition hover:bg-lima-light"
            >
              {option}
            </button>
          ))}
        </div>
      )}

      <div className="mt-4">
        {isDone ? (
          <a
            href={buildWhatsappUrl(answers)}
            className="focus-ring inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-lima-green px-5 py-3 text-sm font-black text-lima-black transition hover:bg-lima-dark hover:text-white"
          >
            Abrir conversa no WhatsApp
            <Send aria-hidden size={18} />
          </a>
        ) : (
          <form
            onSubmit={(event) => {
              event.preventDefault();
              submit();
            }}
            className="flex gap-2"
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(event) => handleInputChange(event.target.value)}
              placeholder={currentStep.placeholder}
              inputMode={currentStep.field === "date" || currentStep.field === "passengers" ? "numeric" : "text"}
              readOnly={isAssistantBusy}
              className="focus-ring min-h-12 w-full rounded-lg border-slate-300 px-3 text-base shadow-sm sm:text-sm"
            />
            <button
              type="submit"
              disabled={isAssistantBusy}
              className="focus-ring inline-flex min-h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-lima-green text-lima-black transition hover:bg-lima-dark hover:text-white"
              aria-label="Enviar resposta"
            >
              <ArrowRight aria-hidden size={18} />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
