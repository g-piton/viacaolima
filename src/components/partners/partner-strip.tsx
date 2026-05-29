"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { partners } from "@/data/partners";

export function PartnerStrip() {
  const shouldReduceMotion = useReducedMotion();
  const carouselItems = [...partners, ...partners];

  return (
    <div className="overflow-hidden">
      <motion.div
        className="flex w-max gap-5"
        animate={shouldReduceMotion ? undefined : { x: ["0%", "-50%"] }}
        transition={{
          duration: 24,
          ease: "linear",
          repeat: Infinity
        }}
      >
        {carouselItems.map((partner, index) => (
          <div
            key={`${partner.name}-${index}`}
            className="flex h-36 w-64 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white px-8 shadow-sm"
            aria-label={partner.name}
          >
            <Image
              src={partner.logo}
              alt={`Logo ${partner.name}`}
              width={220}
              height={110}
              className="max-h-24 w-auto object-contain"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
