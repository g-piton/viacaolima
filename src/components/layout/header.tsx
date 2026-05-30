"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { company } from "@/lib/constants";

export function Header() {
  const pathname = usePathname();

  if (pathname === "/atendimento") {
    return null;
  }

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <nav
        className="mx-auto flex h-16 max-w-7xl items-center px-4 sm:h-20 sm:px-6 lg:px-8"
        aria-label="Menu principal"
      >
        <Link href="/" className="focus-ring flex items-center gap-3 rounded-lg">
          <span className="relative h-10 w-24 shrink-0 sm:h-12 sm:w-36">
            <Image
              src={company.logo}
              alt="Logo Viação Lima"
              fill
              priority
              className="object-contain"
              sizes="144px"
            />
          </span>
          <span className="min-w-0 leading-tight">
            <span className="block text-base font-black text-lima-black sm:text-lg">
              Viação Lima
            </span>
            <span className="block text-[0.65rem] font-semibold uppercase text-lima-dark sm:text-xs">
              Transportes e Turismo
            </span>
          </span>
        </Link>
      </nav>
    </header>
  );
}
