"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import type { ReactNode } from "react";

/**
 * Subtle GPU-accelerated response to initial viewport scroll.
 * Applies gentle scale and opacity fade without continuous React re-renders.
 */
export function HeroScrollWrapper({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();

  const opacity = useTransform(scrollY, [0, 420], [1, 0.72]);
  const scale = useTransform(scrollY, [0, 420], [1, 0.985]);
  const y = useTransform(scrollY, [0, 420], [0, -18]);

  if (reduce) {
    return <div className="relative flex flex-1 flex-col justify-center w-full">{children}</div>;
  }

  return (
    <motion.div
      style={{ opacity, scale, y }}
      className="relative flex flex-1 flex-col justify-center w-full"
    >
      {children}
    </motion.div>
  );
}
