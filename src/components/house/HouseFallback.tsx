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
          COMPLETE DIGITAL RESIDENCE · ALL ROOMS ACTIVE
        </div>
      </div>

      {/* Central Architectural Composition */}
      <div className="my-auto flex flex-col items-center py-12 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border-subtle bg-surface-muted/60 px-3.5 py-1 text-xs font-mono text-text-secondary">
          <span className="size-1.5 rounded-full bg-accent" />
          <span>SANTHEESH&apos;S DIGITAL HOUSE</span>
        </div>

        <h1 className="type-display max-w-3xl text-balance text-text-primary">
          Building <span className="text-accent">intelligent</span> systems from
          the ground up.
        </h1>

        <p className="type-body-large mt-6 max-w-xl text-balance text-text-secondary">
          Explore production software engineering, real-world AI systems, core technical capabilities, proof of work, and engineering philosophy.
        </p>

        {/* Spatial Room Destinations */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2 max-w-2xl">
          <Link
            href="#projects"
            className="inline-flex items-center gap-1.5 rounded-md bg-accent px-3.5 py-2 font-mono text-xs font-medium tracking-[0.08em] text-accent-foreground uppercase transition-opacity hover:opacity-90"
          >
            02 Work (Projects)
          </Link>
          <Link
            href="#stack"
            className="inline-flex items-center gap-1.5 rounded-md border border-border bg-surface px-3.5 py-2 font-mono text-xs font-medium tracking-[0.08em] text-text-primary uppercase transition-colors hover:bg-surface-muted"
          >
            03 Lab (Stack)
          </Link>
          <Link
            href="#proof"
            className="inline-flex items-center gap-1.5 rounded-md border border-border bg-surface px-3.5 py-2 font-mono text-xs font-medium tracking-[0.08em] text-text-primary uppercase transition-colors hover:bg-surface-muted"
          >
            04 Archive (Proof)
          </Link>
          <Link
            href="#about"
            className="inline-flex items-center gap-1.5 rounded-md border border-border bg-surface px-3.5 py-2 font-mono text-xs font-medium tracking-[0.08em] text-text-primary uppercase transition-colors hover:bg-surface-muted"
          >
            05 Study (About)
          </Link>
          <Link
            href="#contact"
            className="inline-flex items-center gap-1.5 rounded-md border border-border bg-surface px-3.5 py-2 font-mono text-xs font-medium tracking-[0.08em] text-text-primary uppercase transition-colors hover:bg-surface-muted"
          >
            06 Contact (Exit)
          </Link>
          <Link
            href={SOCIAL_LINKS.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-md border border-border bg-surface px-3.5 py-2 font-mono text-xs font-medium tracking-[0.08em] text-text-muted uppercase transition-colors hover:text-text-primary hover:bg-surface-muted"
          >
            GitHub
            <ArrowUpRight className="size-3 text-text-muted" aria-hidden="true" />
          </Link>
        </div>
      </div>

      {/* Bottom Status */}
      <div className="flex items-center justify-between border-t border-border-subtle/40 pt-6 text-xs font-mono text-text-muted">
        <span>ALL 6 ROOMS INTEGRATED</span>
        <Link href="#identity-heading" className="inline-flex items-center gap-1 hover:text-text-primary">
          <span>SCROLL DOWN TO EXPLORE</span>
          <ArrowDown className="size-3" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
