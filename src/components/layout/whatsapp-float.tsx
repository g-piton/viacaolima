"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

type AssistantFloatState = "initial" | "hidden" | "typing" | "message";

export function WhatsAppFloat() {
  const pathname = usePathname();
  const [state, setState] = useState<AssistantFloatState>("initial");

  useEffect(() => {
    const showTypingTimer = setTimeout(() => setState("typing"), 1000);
    const showMessageTimer = setTimeout(() => setState("message"), 3000);
    const hideBubbleTimer = setTimeout(() => setState("hidden"), 13000);

    return () => {
      clearTimeout(showTypingTimer);
      clearTimeout(showMessageTimer);
      clearTimeout(hideBubbleTimer);
    };
  }, []);

  if (pathname === "/atendimento") {
    return null;
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-end gap-3">
      {state !== "hidden" && state !== "initial" && (
        <div className="relative mb-3 max-w-72 rounded-lg border border-slate-200 bg-white p-4 pr-10 text-base leading-7 text-slate-700 shadow-soft before:absolute before:-right-2 before:bottom-6 before:h-4 before:w-4 before:rotate-45 before:border-r before:border-t before:border-slate-200 before:bg-white">
          {state === "message" && (
            <button
              type="button"
              onClick={() => setState("hidden")}
              className="focus-ring absolute right-2 top-2 inline-flex h-7 w-7 items-center justify-center rounded-md text-slate-500 transition hover:bg-slate-100 hover:text-lima-black"
              aria-label="Fechar convite de atendimento"
            >
              <X aria-hidden size={16} />
            </button>
          )}
          {state === "typing" ? (
            <span className="inline-flex min-h-7 items-center gap-1" aria-label="Digitando">
              <span className="h-2 w-2 animate-bounce rounded-full bg-slate-500 [animation-delay:-0.2s]" />
              <span className="h-2 w-2 animate-bounce rounded-full bg-slate-500 [animation-delay:-0.1s]" />
              <span className="h-2 w-2 animate-bounce rounded-full bg-slate-500" />
            </span>
          ) : (
            <>
              Olá! Seja bem vindo!
              <br />
              Posso te ajudar a iniciar um orçamento?
            </>
          )}
        </div>
      )}
      <a
        href="/atendimento"
        aria-label="Abrir atendimento"
        className="focus-ring inline-flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full border-4 border-lima-green bg-white shadow-soft transition hover:scale-105"
      >
        <Image
          src="/images/logo/assistant-avatar.png"
          alt=""
          width={80}
          height={80}
          className="h-full w-full object-cover"
        />
      </a>
    </div>
  );
}
