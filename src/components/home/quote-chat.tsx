"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Send, X } from "lucide-react";
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
type Message = { from: "bot" | "user" | "typing"; text: string };

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
    placeholder: "Sua resposta..."
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
  const inputRef = useRef<HTMLInputElement>(null);
  const waitingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const currentStep = steps[Math.min(stepIndex, steps.length - 1)];
  const isDone = stepIndex >= steps.length;
  const isAssistantBusy = assistantState !== "idle";

  const messages = useMemo<Message[]>(() => {
    const answered = steps
      .slice(0, visibleStepCount)
      .flatMap<Message>((step, index) => {
        const stepMessages: Message[] = [{ from: "bot", text: step.question }];
        const answer = answers[step.field];

        if (answer) {
          stepMessages.push({ from: "user", text: answer });
        }

        if (assistantState === "typing" && index === visibleStepCount - 1) {
          stepMessages.push({ from: "typing", text: "" });
        }

        return stepMessages;
      });

    if (isDone && assistantState === "idle") {
      answered.push({
        from: "bot",
        text: "Perfeito. Posso abrir o WhatsApp com seu pedido organizado."
      });
    }

    return answered;
  }, [answers, assistantState, isDone, visibleStepCount]);

  function focusInput() {
    inputRef.current?.focus({ preventScroll: true });
  }

  function submit(value = input) {
    const trimmed = value.trim();
    if (!trimmed || isDone || isAssistantBusy) return;

    setAnswers((current) => ({
      ...current,
      [currentStep.field]: trimmed
    }));
    setInput("");
    setAssistantState("waiting");
    window.setTimeout(focusInput, 0);

    waitingTimeoutRef.current = setTimeout(() => {
      setAssistantState("typing");

      typingTimeoutRef.current = setTimeout(() => {
        setStepIndex((current) => {
          const next = current + 1;
          setVisibleStepCount(Math.min(next + 1, steps.length));
          return next;
        });
        setAssistantState("idle");
        window.setTimeout(focusInput, 0);
      }, 2000);
    }, 2000);
  }

  useEffect(() => {
    const scrollElement = scrollRef.current;

    if (!scrollElement) return;

    scrollElement.scrollTo({
      top: scrollElement.scrollHeight,
      behavior: "smooth"
    });
  }, [messages]);

  useEffect(() => {
    if (!isDone) {
      focusInput();
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
    <div className="flex h-svh min-h-svh flex-col bg-white text-lima-black">
      <header className="flex items-center justify-between gap-4 bg-lima-dark px-4 py-4 text-white shadow-sm sm:px-6">
        <div className="flex min-w-0 items-center gap-3 sm:gap-4">
          <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border-2 border-white bg-white sm:h-16 sm:w-16">
            <Image
              src="/images/logo/assistant-avatar.png"
              alt=""
              fill
              priority
              sizes="64px"
              className="object-cover"
            />
          </span>
          <div className="min-w-0">
            <p className="truncate text-xl font-black leading-tight sm:text-2xl">
              Lima - Atendimento
            </p>
            <p className="mt-1 text-sm font-semibold text-white/85 sm:text-base">
              Online agora
            </p>
          </div>
        </div>
        <Link
          href="/"
          className="focus-ring inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-white/80 text-white transition hover:bg-white hover:text-lima-dark"
          aria-label="Voltar para a tela inicial"
        >
          <X aria-hidden size={22} />
        </Link>
      </header>

      <div
        ref={scrollRef}
        className="mx-auto flex w-full max-w-3xl flex-1 flex-col space-y-5 overflow-y-auto px-4 py-8 sm:px-6 sm:py-10"
      >
        {messages.map((message, index) => {
          const isAssistantMessage =
            message.from === "bot" || message.from === "typing";

          if (isAssistantMessage) {
            return (
              <div key={`${message.from}-${index}`} className="flex items-start gap-3">
                <span className="relative mt-1 h-10 w-10 shrink-0 overflow-hidden rounded-full border-2 border-lima-green bg-white sm:h-11 sm:w-11">
                  <Image
                    src="/images/logo/assistant-avatar.png"
                    alt=""
                    fill
                    sizes="44px"
                    className="object-cover"
                  />
                </span>
                <div className="max-w-[78%] rounded-[1.75rem] bg-slate-100 px-5 py-4 text-base leading-7 text-slate-900 shadow-sm sm:max-w-[70%] sm:text-lg">
                  {message.from === "typing" ? (
                    <span
                      className="inline-flex min-w-12 items-center justify-center gap-1"
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
            );
          }

          return (
            <div
              key={`${message.from}-${index}`}
              className="ml-auto max-w-[78%] rounded-[1.75rem] bg-lima-green px-5 py-4 text-base font-semibold leading-7 text-lima-black shadow-sm sm:max-w-[70%] sm:text-lg"
            >
              {message.text}
            </div>
          );
        })}
      </div>

      <div className="border-t border-slate-100 bg-white px-4 py-4 sm:px-6">
        <div className="mx-auto w-full max-w-3xl">
          {!isDone && currentStep.options && !answers[currentStep.field] && (
            <div className="mb-3 flex flex-wrap gap-2">
              {currentStep.options.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => submit(option)}
                  disabled={isAssistantBusy}
                  className="focus-ring rounded-full border border-lima-dark/15 px-4 py-2 text-sm font-bold text-lima-dark transition hover:bg-lima-light disabled:opacity-60"
                >
                  {option}
                </button>
              ))}
            </div>
          )}

          {isDone ? (
            <a
              href={buildWhatsappUrl(answers)}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-lima-green px-6 py-4 text-base font-black text-lima-black transition hover:bg-lima-dark hover:text-white"
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
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(event) => handleInputChange(event.target.value)}
                placeholder={currentStep.placeholder}
                inputMode={
                  currentStep.field === "date" ||
                  currentStep.field === "passengers"
                    ? "numeric"
                    : "text"
                }
                readOnly={isAssistantBusy}
                className="focus-ring min-h-14 w-full rounded-full border-2 border-lima-green px-5 text-base shadow-sm"
              />
              <button
                type="submit"
                disabled={isAssistantBusy}
                className="focus-ring inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-lima-green text-lima-black transition hover:bg-lima-dark hover:text-white disabled:opacity-70"
                aria-label="Enviar resposta"
              >
                <ArrowRight aria-hidden size={24} />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
