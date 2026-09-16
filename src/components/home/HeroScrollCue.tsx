"use client";

import { motion, useReducedMotion } from "motion/react";
import { ChevronDown } from "lucide-react";

/**
 * Editorial scroll indicator with subtle, calm vertical motion.
 * Respects reduced motion and functions as an accessible link to #projects.
 */
export function HeroScrollCue() {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={
        reduce
          ? { duration: 0.01 }
          : { delay: 1.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }
      }
      className="mt-12 flex flex-col items-center justify-center pt-4"
    >
      <a
        href="#projects"
        className="group inline-flex flex-col items-center gap-2 text-text-muted transition-colors hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
        aria-label="Scroll to projects section"
      >
        <div className="flex items-center gap-2 font-mono text-[0.68rem] tracking-[0.16em] uppercase">
          <span className="text-text-muted/60">01</span>
          <span className="h-px w-3 bg-border-subtle" aria-hidden="true" />
          <span className="type-label tracking-[0.14em]">Scroll to explore</span>
        </div>
        <motion.div
          animate={reduce ? undefined : { y: [0, 4, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown
            className="size-4 text-text-muted transition-colors group-hover:text-accent"
            aria-hidden="true"
          />
        </motion.div>
      </a>
    </motion.div>
  );
}
