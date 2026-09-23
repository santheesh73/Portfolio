"use client";

import { motion } from "motion/react";

interface LoadingSceneProps {
  isLoading: boolean;
}

export function LoadingScene({ isLoading }: LoadingSceneProps) {
  if (!isLoading) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0a0a0b] text-text-primary pointer-events-none"
    >
      {/* Subtle architectural background grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 atmosphere-grid opacity-20"
      />

      <div className="relative z-10 flex flex-col items-center gap-6 px-6 text-center">
        {/* Architectural hairline accent */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="h-px w-24 bg-gradient-to-r from-transparent via-accent to-transparent"
        />

        <div className="flex flex-col items-center gap-2">
          <span className="font-mono text-[0.7rem] uppercase tracking-[0.24em] text-text-muted">
            ENTERING DIGITAL SPACE
          </span>
          <h2 className="type-h3 font-medium tracking-[0.12em] text-text-primary">
            SANTHEESH S
          </h2>
        </div>

        {/* Minimal loading indicator bar */}
        <div className="h-[2px] w-36 overflow-hidden rounded-full bg-surface-muted/60">
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{
              repeat: Infinity,
              duration: 1.4,
              ease: "easeInOut",
            }}
            className="h-full w-1/2 bg-gradient-to-r from-transparent via-accent to-transparent"
          />
        </div>

        <span className="font-mono text-[0.65rem] tracking-[0.16em] text-text-muted/60 uppercase">
          BLUE HOUR · 3D EXTERIOR
        </span>
      </div>
    </motion.div>
  );
}
