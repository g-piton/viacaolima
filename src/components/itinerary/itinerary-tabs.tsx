import Link from "next/link";
import { Clock, MapPin } from "lucide-react";
import { itinerary } from "@/data/itinerary";
import { cn } from "@/lib/utils";

type Direction = "outbound" | "inbound";

export function ItineraryTabs({ active }: { active: Direction }) {
  const data = itinerary[active];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-soft sm:p-6">
      <div className="mb-8 inline-flex rounded-xl bg-lima-light p-1">
        {[
          { direction: "outbound" as const, href: "?sentido=ida" },
          { direction: "inbound" as const, href: "?sentido=volta" }
        ].map((tab) => (
          <Link
            key={tab.direction}
            href={tab.href}
            className={cn(
              "focus-ring rounded-lg px-5 py-3 text-sm font-bold text-slate-700 transition",
              active === tab.direction && "bg-white text-lima-dark shadow-sm"
            )}
            aria-current={active === tab.direction ? "page" : undefined}
          >
            {itinerary[tab.direction].label}
          </Link>
        ))}
      </div>

      <div className="mb-8">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-lima-dark">
          Fretamento
        </p>
        <h2 className="mt-2 text-3xl font-black text-lima-black">
          {data.route}
        </h2>
      </div>

      <ol className="relative space-y-6 before:absolute before:left-5 before:top-4 before:h-[calc(100%-2rem)] before:w-px before:bg-lima-green/35">
        {data.stops.map((stop) => (
          <li key={`${stop.time}-${stop.place}`} className="relative flex gap-4">
            <span className="z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-lima-green text-white">
              <Clock aria-hidden size={18} />
            </span>
            <div className="w-full rounded-xl border border-slate-200 bg-lima-light p-4">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-2xl font-black text-lima-black">
                  {stop.time}
                </p>
                <p className="inline-flex items-center gap-2 text-sm font-bold text-lima-dark">
                  <MapPin aria-hidden size={16} />
                  {stop.place}
                </p>
              </div>
              <p className="mt-2 text-sm text-slate-600">{stop.detail}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
