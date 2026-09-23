"use client";

import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { profile } from "@/data/profile";
import { SOCIAL_LINKS } from "@/lib/constants";

export function HouseFallback() {
  return (
    <section
      aria-label="Santheesh's Digital House - Architectural Overview"
      className="relative flex min-h-[90vh] flex-col justify-between overflow-hidden bg-[#0a0a0b] px-6 py-12 sm:px-12 lg:px-20"
    >
      {/* Visual background gradient simulating dusk house silhouette */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[600px] w-full max-w-6xl bg-[radial-gradient(ellipse_70%_60%_at_50%_30%,rgba(14,21,38,0.8),transparent_70%)]" />
        <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 h-80 w-96 rounded-full bg-[radial-gradient(circle,rgba(245,158,11,0.08),transparent_65%)]" />
        <div className="absolute inset-0 atmosphere-grid opacity-25" />
      </div>

      {/* Top HUD */}
      <div className="flex items-center justify-between border-b border-border-subtle/40 pb-6">
        <div className="flex flex-col">
          <span className="font-mono text-xs font-semibold tracking-[0.16em] text-text-primary uppercase">
            {profile.name}
          </span>
          <span className="font-mono text-[0.68rem] tracking-[0.14em] text-accent uppercase">
            AI SOFTWARE ENGINEER
          </span>
        </div>
        <div className="font-mono text-xs tracking-[0.16em] text-text-muted">
          PHASE 01 / 04 · EXTERIOR
        </div>
      </div>

      {/* Central Architectural Composition */}
      <div className="my-auto flex flex-col items-center py-12 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border-subtle bg-surface-muted/60 px-3.5 py-1 text-xs font-mono text-text-secondary">
          <span className="size-1.5 rounded-full bg-accent" />
          <span>ARCHITECTURAL FOUNDATION</span>
        </div>

        <h1 className="type-display max-w-3xl text-balance text-text-primary">
          Building <span className="text-accent">intelligent</span> systems from
          the ground up.
        </h1>

        <p className="type-body-large mt-6 max-w-xl text-balance text-text-secondary">
          Welcome to my digital residence. Explore production engineering,
          generative AI systems, and selected software architectures.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="#projects"
            className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-2.5 font-mono text-xs font-medium tracking-[0.08em] text-accent-foreground uppercase transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            Step Inside
            <ArrowDown className="size-3.5" aria-hidden="true" />
          </Link>

          <Link
            href={SOCIAL_LINKS.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-5 py-2.5 font-mono text-xs font-medium tracking-[0.08em] text-text-primary uppercase transition-colors hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            GitHub
            <ArrowUpRight className="size-3.5 text-text-muted" aria-hidden="true" />
          </Link>
        </div>
      </div>

      {/* Bottom Status */}
      <div className="flex items-center justify-between border-t border-border-subtle/40 pt-6 text-xs font-mono text-text-muted">
        <span>BLUE HOUR · DUSK EXTERIOR</span>
        <span>SCROLL DOWN TO EXPLORE</span>
      </div>
    </section>
  );
}
