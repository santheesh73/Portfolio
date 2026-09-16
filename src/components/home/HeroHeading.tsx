"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Editorial cinematic headline with controlled line-by-line reveal.
 * Preserves accessible semantic <h1> structure while animating visual lines.
 */
export function HeroHeading() {
  const reduce = useReducedMotion();

  return (
    <h1
      id="hero-heading"
      className="type-display mt-5 text-text-primary"
    >
      <span className="block overflow-hidden pb-1">
        <motion.span
          className="block"
          initial={reduce ? false : { y: "105%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={
            reduce
              ? { duration: 0.01 }
              : { duration: 0.65, delay: 0.35, ease: [0.16, 1, 0.3, 1] }
          }
        >
          Building <span className="text-accent">intelligent</span>
        </motion.span>
      </span>
      <span className="block overflow-hidden pb-1">
        <motion.span
          className="block"
          initial={reduce ? false : { y: "105%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={
            reduce
              ? { duration: 0.01 }
              : { duration: 0.65, delay: 0.5, ease: [0.16, 1, 0.3, 1] }
          }
        >
          software for the real world.
        </motion.span>
      </span>
    </h1>
  );
}
