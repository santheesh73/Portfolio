"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}

export function FadeIn({ children, delay = 0, y = 14, className }: FadeInProps) {
  const reduce = useReducedMotion();
  if (reduce) {
    return <div className={className}>{children}</div>;
  }
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
