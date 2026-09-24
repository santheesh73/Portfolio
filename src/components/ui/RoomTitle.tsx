"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

interface RoomTitleProps {
  index: string;
  title: string;
  subtitle?: string;
  accentColor?: string;
  className?: string;
  animate?: boolean;
}

/**
 * Standardized Room Title System
 * Format: 0X / ROOM TITLE (with muted index, bold foreground title, accent indicator, and subtitle)
 */
export function RoomTitle({
  index,
  title,
  subtitle,
  accentColor,
  className,
  animate = true,
}: RoomTitleProps) {
  const reduce = useReducedMotion();

  const containerAnimation = animate && !reduce
    ? {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -12 },
        transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
      }
    : {};

  return (
    <motion.div
      {...containerAnimation}
      className={cn("flex flex-col items-center text-center select-none pointer-events-none", className)}
      role="status"
      aria-label={`${index} ${title} — ${subtitle || ""}`}
    >
      {/* 1. Muted Index + Slash Prefix */}
      <div className="flex items-center gap-1.5 font-mono text-xs tracking-[0.24em] text-text-muted uppercase">
        <span>{index}</span>
        <span className="text-text-muted/40">/</span>
        <span className="text-accent font-medium tracking-[0.2em]" style={accentColor ? { color: accentColor } : undefined}>
          SPACE
        </span>
      </div>

      {/* 2. Main Title with Foreground Contrast & Fluid Mobile Scaling */}
      <h2 className="text-2xl sm:text-4xl lg:text-5xl mt-1 font-semibold tracking-[0.08em] text-text-primary uppercase leading-tight text-balance">
        {title}
      </h2>

      {/* 3. Subtle Hairline Accent Indicator */}
      <div
        className="mt-2.5 h-px w-16 bg-gradient-to-r from-transparent via-accent to-transparent"
        style={accentColor ? { backgroundImage: `linear-gradient(to right, transparent, ${accentColor}, transparent)` } : undefined}
        aria-hidden="true"
      />

      {/* 4. Subtitle / Architectural Descriptor */}
      {subtitle && (
        <p className="mt-2 font-mono text-[0.7rem] sm:text-xs tracking-[0.2em] text-text-secondary uppercase">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
