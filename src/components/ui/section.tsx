import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionProps = {
  id?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
};

export function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  className
}: SectionProps) {
  return (
    <section id={id} className={cn("py-16 sm:py-24", className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {(eyebrow || title || description) && (
          <div className="mb-10 max-w-3xl">
            {eyebrow && (
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-lima-dark">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="text-3xl font-bold tracking-normal text-lima-black sm:text-4xl">
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
                {description}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
