"use client";

import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { ChevronDown, ArrowDown, Compass } from "lucide-react";
import Link from "next/link";
import { profile } from "@/data/profile";
import {
  RoomId,
  getActiveSpatialState,
} from "./SpatialNavigation";

interface CinematicHUDProps {
  scrollProgress: number;
  onNavigateToRoom: (roomId: RoomId) => void;
  onEnterClick: () => void;
}

export function CinematicHUD({
  scrollProgress,
  onNavigateToRoom,
  onEnterClick,
}: CinematicHUDProps) {
  const reduce = useReducedMotion();
  const spatialState = getActiveSpatialState(scrollProgress);

  // In specific zones, show prominent cinematic room title
  const activeRoomTitle =
    scrollProgress >= 0.30 && scrollProgress < 0.44
      ? { index: "01", title: "FOYER", subtitle: "THE DIGITAL RESIDENCE" }
      : scrollProgress >= 0.52 && scrollProgress < 0.68
      ? { index: "02", title: "PROJECT STUDIO", subtitle: "FEATURED WORK & SYSTEMS" }
      : scrollProgress >= 0.82 && scrollProgress < 0.96
      ? { index: "03", title: "ENGINEERING LAB", subtitle: "TECHNICAL CAPABILITIES" }
      : null;

  return (
    <div
      className="pointer-events-none absolute inset-0 z-30 flex flex-col justify-between p-6 sm:p-10 lg:p-12 select-none"
      aria-label="Cinematic spatial navigation HUD"
    >
      {/* ========================================================
          1. TOP BAR: Brand Identity, Active Spatial Tag, Skip
          ======================================================== */}
      <header className="flex items-start justify-between">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={
            reduce
              ? { duration: 0.01 }
              : { duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }
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
          <div className="flex items-center gap-2">
            <span className="font-mono text-[0.68rem] tracking-[0.14em] text-text-muted uppercase">
              AI SOFTWARE ENGINEER
            </span>
            <span className="text-text-muted/40 font-mono text-[0.65rem]">/</span>
            <span className="font-mono text-[0.68rem] tracking-[0.14em] text-accent font-medium uppercase">
              {spatialState.name}
            </span>
          </div>
        </motion.div>

        {/* Top-Right: Skip link for quick accessibility */}
        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={reduce ? { duration: 0.01 } : { duration: 0.6, delay: 0.4 }}
          className="pointer-events-auto"
        >
          <Link
            href="#identity-heading"
            className="group inline-flex items-center gap-1.5 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-text-muted/80 transition-colors hover:text-text-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent rounded-sm px-2.5 py-1.5 border border-border-subtle/50 bg-surface/30 backdrop-blur-sm"
          >
            <span>Skip to Content</span>
            <ArrowDown
              className="size-3 text-text-muted transition-transform group-hover:translate-y-0.5"
              aria-hidden="true"
            />
          </Link>
        </motion.div>
      </header>

      {/* ========================================================
          2. CENTER: Cinematic Room Title Reveal (Dynamic)
          ======================================================== */}
      <AnimatePresence mode="wait">
        {activeRoomTitle && (
          <motion.div
            key={activeRoomTitle.index}
            initial={reduce ? { opacity: 1 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={
              reduce
                ? { duration: 0.01 }
                : { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
            }
            className="my-auto mx-auto flex flex-col items-center text-center pointer-events-none"
          >
            <span className="font-mono text-xs tracking-[0.3em] text-accent uppercase">
              {activeRoomTitle.index}
            </span>
            <h2 className="type-h1 mt-1 font-semibold tracking-[0.1em] text-text-primary">
              {activeRoomTitle.title}
            </h2>
            <div className="mt-2 h-px w-16 bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
            <p className="mt-2 font-mono text-xs tracking-[0.2em] text-text-secondary uppercase">
              {activeRoomTitle.subtitle}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================
          3. BOTTOM BAR: Breadcrumb, Interaction Cue, Spatial Selector
          ======================================================== */}
      <footer className="relative flex flex-col sm:flex-row items-center sm:items-end justify-between gap-6 pt-4">
        {/* Bottom-Left: Spatial Breadcrumb */}
        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={reduce ? { duration: 0.01 } : { duration: 0.8, delay: 0.6 }}
          className="hidden sm:flex flex-col font-mono text-[0.68rem] tracking-[0.16em] text-text-muted uppercase"
        >
          <div className="flex items-center gap-2">
            <Compass className="size-3 text-accent" aria-hidden="true" />
            <span className="text-text-secondary font-medium">
              {spatialState.name}
            </span>
            <span className="text-text-muted/40">·</span>
            <span>{spatialState.subtitle}</span>
          </div>
          <span className="text-[0.62rem] text-text-muted/60 mt-0.5">
            {spatialState.isInterior
              ? "INTERIOR · CONTINUOUS NAVIGATION"
              : "EXTERIOR · DUSK BLUE HOUR"}
          </span>
        </motion.div>

        {/* Bottom-Center: Contextual Exploration Cue */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={
            reduce
              ? { duration: 0.01 }
              : { duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }
          }
          className="pointer-events-auto flex flex-col items-center"
        >
          <button
            type="button"
            onClick={onEnterClick}
            className="group flex flex-col items-center gap-2 transition-transform active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-md p-2"
            aria-label="Advance through the spatial journey"
          >
            <div className="flex items-center gap-2 font-mono text-xs sm:text-sm tracking-[0.22em] text-text-secondary uppercase transition-colors group-hover:text-text-primary">
              <span className="size-1 rounded-full bg-accent/60" aria-hidden="true" />
              <span>
                {scrollProgress < 0.16
                  ? "SCROLL TO ENTER"
                  : scrollProgress < 0.28
                  ? "STEP TO THRESHOLD"
                  : scrollProgress < 0.44
                  ? "EXPLORING FOYER"
                  : scrollProgress < 0.72
                  ? "02 PROJECT STUDIO"
                  : scrollProgress < 0.98
                  ? "03 ENGINEERING LAB"
                  : "CORRIDOR GALLERY"}
              </span>
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
              <ChevronDown className="size-3.5" aria-hidden="true" />
            </motion.div>
          </button>
        </motion.div>

        {/* Bottom-Right: Direct Spatial Navigation Menu */}
        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={reduce ? { duration: 0.01 } : { duration: 0.8, delay: 0.6 }}
          className="pointer-events-auto flex flex-col items-end gap-1.5"
        >
          <div className="flex items-center gap-1.5 font-mono text-[0.68rem] tracking-[0.16em] uppercase">
            <span className="text-text-muted/60">SPATIAL</span>
            <span className="text-text-secondary font-medium">DESTINATIONS</span>
          </div>

          <div
            className="flex items-center gap-1 rounded-md border border-border-subtle bg-surface/60 p-1 backdrop-blur-md"
            role="toolbar"
            aria-label="Direct spatial navigation"
          >
            {/* 00 EXTERIOR */}
            <button
              type="button"
              onClick={() => onNavigateToRoom("exterior")}
              className={`rounded px-2 py-1 font-mono text-[0.65rem] tracking-[0.12em] uppercase transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent ${
                spatialState.roomId === "exterior"
                  ? "bg-accent/20 text-accent font-semibold"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              00 EXT
            </button>

            {/* 01 FOYER */}
            <button
              type="button"
              onClick={() => onNavigateToRoom("foyer")}
              className={`rounded px-2 py-1 font-mono text-[0.65rem] tracking-[0.12em] uppercase transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent ${
                spatialState.roomId === "foyer"
                  ? "bg-accent/20 text-accent font-semibold"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              01 FOYER
            </button>

            {/* 02 WORK */}
            <button
              type="button"
              onClick={() => onNavigateToRoom("projects")}
              className={`rounded px-2 py-1 font-mono text-[0.65rem] tracking-[0.12em] uppercase transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent ${
                spatialState.roomId === "projects"
                  ? "bg-accent/20 text-accent font-semibold"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              02 WORK
            </button>

            {/* 03 LAB */}
            <button
              type="button"
              onClick={() => onNavigateToRoom("lab")}
              className={`rounded px-2 py-1 font-mono text-[0.65rem] tracking-[0.12em] uppercase transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent ${
                spatialState.roomId === "lab"
                  ? "bg-accent/20 text-accent font-semibold"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              03 LAB
            </button>

            {/* FUTURE DESTINATIONS BADGE */}
            <span
              title="Archive, Study, Contact (Phase 4)"
              className="px-1.5 py-1 font-mono text-[0.6rem] tracking-[0.08em] text-text-muted/60 uppercase cursor-default"
            >
              +3 ROOMS
            </span>
          </div>
        </motion.div>
      </footer>
    </div>
  );
}
