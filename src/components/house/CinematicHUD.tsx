"use client";

import { motion, useReducedMotion } from "motion/react";
import { ChevronDown, ArrowDown } from "lucide-react";
import Link from "next/link";
import { profile } from "@/data/profile";

interface CinematicHUDProps {
  scrollProgress: number;
  onEnterClick: () => void;
}

export function CinematicHUD({
  scrollProgress,
  onEnterClick,
}: CinematicHUDProps) {
  const reduce = useReducedMotion();

  // As scroll approaches the door (progress > 0.75), fade out HUD elements smoothly
  const hudOpacity = Math.max(0, 1 - scrollProgress * 1.3);

  return (
    <div
      className="pointer-events-none absolute inset-0 z-30 flex flex-col justify-between p-6 sm:p-10 lg:p-14 select-none"
      style={{ opacity: hudOpacity }}
      aria-hidden={hudOpacity < 0.1 ? "true" : undefined}
    >
      {/* Top Bar: Minimal Cinematic Brand & Eyebrow */}
      <header className="flex items-start justify-between">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={
            reduce
              ? { duration: 0.01 }
              : { duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }
          }
          className="flex flex-col gap-1"
        >
          <div className="flex items-center gap-2.5">
            <span
              className="size-1.5 rounded-full bg-accent animate-pulse"
              aria-hidden="true"
            />
            <h1 className="font-mono text-sm sm:text-base font-semibold tracking-[0.18em] text-text-primary uppercase">
              {profile.name}
            </h1>
          </div>
          <span className="font-mono text-[0.68rem] sm:text-xs tracking-[0.14em] text-text-muted uppercase">
            AI SOFTWARE ENGINEER
          </span>
        </motion.div>

        {/* Top-Right: Quick skip link for accessibility */}
        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={reduce ? { duration: 0.01 } : { duration: 0.6, delay: 0.5 }}
          className="pointer-events-auto"
        >
          <Link
            href="#identity-heading"
            className="group inline-flex items-center gap-1.5 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-text-muted/80 transition-colors hover:text-text-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent rounded-sm px-2 py-1"
          >
            <span>Skip Tour</span>
            <ArrowDown
              className="size-3 text-text-muted transition-transform group-hover:translate-y-0.5"
              aria-hidden="true"
            />
          </Link>
        </motion.div>
      </header>

      {/* Bottom Bar: Action prompt (center) & Phase counter (right) */}
      <footer className="relative flex items-end justify-between">
        {/* Bottom-Left: Subtle coordinates / setting */}
        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={reduce ? { duration: 0.01 } : { duration: 0.8, delay: 0.7 }}
          className="hidden sm:flex flex-col font-mono text-[0.65rem] tracking-[0.16em] text-text-muted/70 uppercase"
        >
          <span>EXTERIOR · BLUE HOUR</span>
          <span>LAT 11.0168° N · 76.9558° E</span>
        </motion.div>

        {/* Bottom-Center: Enter Interaction Cue */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={
            reduce
              ? { duration: 0.01 }
              : { duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }
          }
          className="pointer-events-auto mx-auto flex flex-col items-center"
        >
          <button
            type="button"
            onClick={onEnterClick}
            className="group flex flex-col items-center gap-2.5 transition-transform active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-md p-2"
            aria-label="Scroll or click to approach the entrance"
          >
            <div className="flex items-center gap-2 font-mono text-xs sm:text-sm tracking-[0.22em] text-text-secondary uppercase transition-colors group-hover:text-text-primary">
              <span className="size-1 rounded-full bg-accent/60" aria-hidden="true" />
              <span>{scrollProgress > 0.4 ? "APPROACHING ENTRANCE" : "SCROLL TO ENTER"}</span>
              <span className="size-1 rounded-full bg-accent/60" aria-hidden="true" />
            </div>

            <motion.div
              animate={reduce ? undefined : { y: [0, 4, 0] }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="flex items-center justify-center rounded-full border border-border-subtle bg-surface/50 p-1.5 text-text-muted backdrop-blur-sm transition-colors group-hover:border-accent/40 group-hover:text-accent"
            >
              <ChevronDown className="size-4" aria-hidden="true" />
            </motion.div>
          </button>
        </motion.div>

        {/* Bottom-Right: Phase indicator (01 / 04) */}
        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={reduce ? { duration: 0.01 } : { duration: 0.8, delay: 0.7 }}
          className="flex flex-col items-end font-mono text-[0.72rem] tracking-[0.18em] text-text-muted"
        >
          <span className="text-text-secondary font-medium">01 / 04</span>
          <span className="text-[0.62rem] text-text-muted/60 uppercase">PHASE ONE</span>
        </motion.div>
      </footer>
    </div>
  );
}
