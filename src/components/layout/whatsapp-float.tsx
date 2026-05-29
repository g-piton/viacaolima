import Image from "next/image";
import { company } from "@/lib/constants";

export function WhatsAppFloat() {
  return (
    <a
      href={company.whatsappHref}
      aria-label="Abrir conversa no WhatsApp"
      className="focus-ring fixed bottom-5 right-5 z-50 inline-flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-[#25D366] shadow-soft transition hover:scale-105"
    >
      <Image
        src="/images/logo/whatsapp.png"
        alt=""
        width={64}
        height={64}
        className="h-full w-full object-cover"
      />
    </a>
  );
}
