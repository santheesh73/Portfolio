"use client";

import { useReducedMotion } from "motion/react";
import { SkillCard } from "@/components/skills/SkillCard";
import type { SkillGroupData } from "@/types";
import { cn } from "@/lib/utils";

interface SkillGroupProps {
  group: SkillGroupData;
  isActive?: boolean;
  isMuted?: boolean;
  onActivate?: () => void;
  onDeactivate?: () => void;
}

/**
 * Phase 9 — Cinematic Capability Domain Panel.
 * Editorial presentation: domain anchor index (01-04), domain title,
 * architectural role tagline, left accent line, and responsive grid of verified tools.
 */
export function SkillGroup({
  group,
  isActive = false,
  isMuted = false,
  onActivate,
  onDeactivate,
}: SkillGroupProps) {
  const reduce = useReducedMotion();

  return (
    <div
      role="region"
      aria-label={`${group.title} technical domain`}
      tabIndex={0}
      onMouseEnter={onActivate}
      onMouseLeave={onDeactivate}
      onFocus={onActivate}
      onBlur={onDeactivate}
      className={cn(
        "group relative flex flex-col gap-6 border-t border-border-subtle/80 py-8 px-4 sm:px-6 transition-[background-color,opacity,border-color] duration-200 ease-out outline-none lg:flex-row lg:gap-12 lg:py-10",
        isActive
          ? "bg-surface-muted/20 opacity-100"
          : isMuted
          ? "opacity-70"
          : "opacity-100",
        "focus-visible:ring-1 focus-visible:ring-accent focus-visible:bg-surface-muted/20"
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

      {/* Category Header Column */}
      <div className="flex flex-col gap-3 shrink-0 lg:w-72">
        <div className="flex items-center gap-3">
          <span
            className={cn(
              "font-mono text-xs font-semibold tracking-[0.16em] transition-[color,transform] duration-200 ease-out",
              isActive ? "text-accent translate-x-0.5" : "text-text-muted"
            )}
          >
            {group.index}
          </span>
          <span aria-hidden="true" className="h-px w-3 bg-border-subtle" />
          <span className="font-mono text-[0.68rem] tracking-[0.14em] uppercase text-text-muted">
            {String(group.items.length).padStart(2, "0")} Technologies
          </span>
        </div>

        <h3
          className={cn(
            "type-h2 font-semibold tracking-tight text-text-primary transition-transform duration-200 ease-out",
            isActive && !reduce ? "translate-x-1" : "translate-x-0"
          )}
        >
          {group.title}
        </h3>

        <p className="type-body text-pretty text-text-secondary leading-relaxed">
          {group.tagline}
        </p>

        {/* Subtle accent indicator dot */}
        <div className="hidden lg:flex items-center gap-2 pt-2">
          <span
            aria-hidden="true"
            className={cn(
              "size-1.5 rounded-full transition-all duration-200",
              isActive ? "bg-accent scale-150" : "bg-border-subtle"
            )}
          />
          <span className="font-mono text-[0.65rem] tracking-[0.12em] uppercase text-text-muted">
            {isActive ? "Domain Active" : "Domain Focused"}
          </span>
        </div>
      </div>

      {/* Technology Items Grid */}
      <div className="flex-1">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
          {group.items.map((skill) => (
            <SkillCard key={skill.id} skill={skill} />
          ))}
        </div>
      </div>
    </div>
  );
}
