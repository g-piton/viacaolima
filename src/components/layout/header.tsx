import Link from "next/link";
import Image from "next/image";
import { company } from "@/lib/constants";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <nav
        className="mx-auto flex h-20 max-w-7xl items-center px-4 sm:px-6 lg:px-8"
        aria-label="Menu principal"
      >
        <Link href="/" className="focus-ring flex items-center gap-3 rounded-lg">
          <span className="relative h-12 w-28 sm:w-36">
            <Image
              src={company.logo}
              alt="Logo Viação Lima"
              fill
              priority
              className="object-contain"
              sizes="144px"
            />
          </span>
          <span className="leading-tight">
            <span className="block text-lg font-black text-lima-black">
              Viação Lima
            </span>
            <span className="block text-xs font-semibold uppercase text-lima-dark">
              Transportes e Turismo
            </span>
          </span>
        </Link>
      </nav>
    </header>
  );
}
