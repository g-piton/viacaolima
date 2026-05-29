import Image from "next/image";
import { fleet } from "@/data/fleet";
import { FadeIn } from "@/components/ui/fade-in";

export function FleetGrid() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {fleet.map((vehicle, index) => (
        <FadeIn key={vehicle.title} delay={index * 0.06}>
          <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="relative aspect-[4/3]">
              <Image
                src={vehicle.image}
                alt={`${vehicle.title} da frota Viação Lima`}
                fill
                loading={index === 0 ? "eager" : "lazy"}
                fetchPriority={index === 0 ? "high" : "auto"}
                className="object-cover"
                sizes="(min-width: 1024px) 33vw, 100vw"
              />
            </div>
            <div className="p-5">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-lima-dark">
                {vehicle.capacity}
              </p>
              <h3 className="mt-2 text-2xl font-black text-lima-black">
                {vehicle.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {vehicle.description}
              </p>
            </div>
          </article>
        </FadeIn>
      ))}
    </div>
  );
}
