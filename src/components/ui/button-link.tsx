import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

type ButtonLinkProps = ComponentPropsWithoutRef<typeof Link> & {
  variant?: "primary" | "secondary" | "outline";
};

export function ButtonLink({
  className,
  variant = "primary",
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={cn(
        "focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition",
        variant === "primary" &&
          "bg-lima-green text-white shadow-soft hover:bg-lima-dark",
        variant === "secondary" &&
          "bg-white text-lima-black hover:bg-lima-light",
        variant === "outline" &&
          "border border-lima-green text-lima-dark hover:bg-lima-light",
        className
      )}
      {...props}
    />
  );
}
