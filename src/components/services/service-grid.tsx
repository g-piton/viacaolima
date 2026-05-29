import { services } from "@/data/services";
import { FadeIn } from "@/components/ui/fade-in";

export function ServiceGrid() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service, index) => {
        const Icon = service.icon;
        return (
          <FadeIn key={service.title} delay={index * 0.03}>
            <article className="h-full rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-lima-light text-lima-dark">
                <Icon aria-hidden size={24} />
              </div>
              <h3 className="text-lg font-bold text-lima-black">
                {service.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {service.description}
              </p>
            </article>
          </FadeIn>
        );
      })}
    </div>
  );
}
