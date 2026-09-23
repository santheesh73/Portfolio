"use client";

import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Mail, GitBranch, RotateCcw, ArrowDown } from "lucide-react";
import { profile } from "@/data/profile";

interface FinalExitOverlayProps {
  isVisible: boolean;
  onRestart: () => void;
  onContinueDown: () => void;
}

export function FinalExitOverlay({
  isVisible,
  onRestart,
  onContinueDown,
}: FinalExitOverlayProps) {
  const reduce = useReducedMotion();

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={reduce ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0 }}
          transition={{ duration: reduce ? 0.01 : 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-auto absolute inset-0 z-40 flex flex-col items-center justify-center p-6 text-center select-none bg-background/60 backdrop-blur-sm"
          role="region"
          aria-label="Journey completion and contact options"
        >
          <div className="max-w-xl flex flex-col items-center">
            {/* Top Indicator */}
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="flex items-center gap-2 mb-3"
            >
              <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
              <span className="font-mono text-xs uppercase tracking-[0.24em] text-accent">
                THE HOUSE BEHIND YOU · THE WORK AHEAD
              </span>
            </motion.div>

            {/* Name & Headline */}
            <motion.h2
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="type-display font-semibold tracking-tight text-text-primary text-3xl sm:text-4xl lg:text-5xl"
            >
              {profile.name}
            </motion.h2>

            <motion.p
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mt-2 font-mono text-xs sm:text-sm tracking-[0.14em] text-text-secondary uppercase"
            >
              {profile.roles.join(" · ")}
            </motion.p>

            <motion.div
              initial={reduce ? false : { scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="my-5 h-px w-24 bg-gradient-to-r from-transparent via-accent to-transparent"
            />

            <motion.p
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="font-mono text-xs tracking-[0.2em] text-text-muted uppercase"
            >
              BUILDING WHAT COMES NEXT.
            </motion.p>

            {/* Direct Contact Actions */}
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mt-8 flex flex-wrap items-center justify-center gap-3"
            >
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2.5 font-mono text-xs font-semibold tracking-[0.12em] text-accent-foreground uppercase transition-transform active:scale-95 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <Mail className="size-3.5" aria-hidden="true" />
                <span>Email Santheesh</span>
              </a>

              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-4 py-2.5 font-mono text-xs font-semibold tracking-[0.12em] text-text-primary uppercase transition-colors hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <GitBranch className="size-3.5 text-text-muted" aria-hidden="true" />
                <span>GitHub Profile</span>
              </a>
            </motion.div>

            {/* Secondary Controls: Re-enter & Continue */}
            <motion.div
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.75, duration: 0.6 }}
              className="mt-10 flex items-center gap-6 font-mono text-xs text-text-muted"
            >
              <button
                type="button"
                onClick={onRestart}
                className="inline-flex items-center gap-1.5 transition-colors hover:text-text-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent rounded px-2 py-1"
                aria-label="Restart spatial experience from the exterior"
              >
                <RotateCcw className="size-3 text-accent" aria-hidden="true" />
                <span>START AGAIN</span>
              </button>

              <span className="text-text-muted/30">|</span>

              <button
                type="button"
                onClick={onContinueDown}
                className="inline-flex items-center gap-1.5 transition-colors hover:text-text-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent rounded px-2 py-1"
                aria-label="Scroll down to view detailed written portfolio"
              >
                <span>EXPLORE DETAILED PORTFOLIO</span>
                <ArrowDown className="size-3 text-text-muted" aria-hidden="true" />
              </button>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
