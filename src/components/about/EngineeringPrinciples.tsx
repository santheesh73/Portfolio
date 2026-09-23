"use client";

import { useState } from "react";
import { useReducedMotion } from "motion/react";
import { ENGINEERING_PRINCIPLES } from "@/data/about";
import { cn } from "@/lib/utils";

/**
 * Phase 8 — Cinematic Engineering Principles.
 * Editorial list composition for Build / Think / Explore / Refine.
 * Replaces generic cards with a tactile, rhythmic editorial structure.
 */
export function EngineeringPrinciples() {
  const reduce = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState<string | null>(null);

  const hasActive = activeIndex !== null && !reduce;

  return (
    <div
      role="list"
      aria-label="Engineering principles: Build, Think, Explore, Refine"
      className="flex flex-col border-b border-border-subtle/80"
    >
      {ENGINEERING_PRINCIPLES.map((principle) => {
        const isActive = activeIndex === principle.index;
        const isMuted = hasActive && !isActive;

        return (
          <div
            key={principle.index}
            role="listitem"
            tabIndex={0}
            aria-label={`${principle.label}: ${principle.title}`}
            onMouseEnter={() => setActiveIndex(principle.index)}
            onMouseLeave={() => setActiveIndex(null)}
            onFocus={() => setActiveIndex(principle.index)}
            onBlur={() => setActiveIndex(null)}
            className={cn(
              "group relative flex flex-col gap-4 border-t border-border-subtle/80 py-6 px-4 sm:px-6 sm:py-8 transition-[background-color,opacity,border-color] duration-200 ease-out outline-none lg:flex-row lg:items-baseline lg:gap-12",
              !reduce && "active:scale-[0.999]",
              isActive
                ? "bg-surface-muted/30 opacity-100"
                : isMuted
                ? "opacity-70"
                : "opacity-100",
              "focus-visible:ring-1 focus-visible:ring-accent focus-visible:bg-surface-muted/30"
            )}
          >
            {/* Active Left Indicator Accent Line */}
            <span
              aria-hidden="true"
              className={cn(
                "absolute left-0 top-0 bottom-0 w-1 bg-accent transition-all duration-200 ease-out",
                isActive ? "opacity-100 scale-y-100" : "opacity-0 scale-y-75"
              )}
            />

            {/* Principle Number & Concept Label */}
            <div className="flex items-center gap-3 shrink-0 sm:gap-4 lg:w-44">
              <span
                className={cn(
                  "font-mono text-xs font-semibold tracking-[0.16em] transition-[color,transform] duration-200 ease-out",
                  isActive ? "text-accent translate-x-0.5" : "text-text-muted"
                )}
              >
                {principle.index}
              </span>
              <span aria-hidden="true" className="h-px w-3 bg-border-subtle" />
              <span
                className={cn(
                  "font-mono text-xs font-semibold tracking-[0.16em] uppercase transition-colors duration-200",
                  isActive ? "text-accent" : "text-text-primary"
                )}
              >
                {principle.label}
              </span>
            </div>

            {/* Principle Title & Description */}
            <div className="flex flex-col gap-1.5 flex-1">
              <h4
                className={cn(
                  "type-h3 font-semibold tracking-tight text-text-primary transition-transform duration-200 ease-out",
                  isActive && !reduce ? "translate-x-1" : "translate-x-0"
                )}
              >
                {principle.title}
              </h4>
              <p className="type-body text-pretty text-text-secondary leading-relaxed max-w-2xl">
                {principle.description}
              </p>
            </div>

            {/* Right-side alignment cue */}
            <span
              aria-hidden="true"
              className={cn(
                "hidden lg:inline-block size-1.5 rounded-full transition-all duration-200 shrink-0 self-center",
                isActive ? "bg-accent scale-150" : "bg-border-subtle"
              )}
            />
          </div>
        );
      })}
    </div>
  );
}
