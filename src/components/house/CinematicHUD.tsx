"use client";

import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { ChevronDown, ArrowDown, Compass } from "lucide-react";
import Link from "next/link";
import { profile } from "@/data/profile";
import { useTheme } from "@/theme/ThemeContext";
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
  const { isProjectFocused, focusedProject } = useTheme();

  // In specific zones, show prominent cinematic room title
  const activeRoomTitle =
    scrollProgress >= 0.20 && scrollProgress < 0.32
      ? { index: "01", title: "FOYER", subtitle: "THE DIGITAL RESIDENCE" }
      : scrollProgress >= 0.33 && scrollProgress < 0.45
      ? { index: "02", title: "PROJECT STUDIO", subtitle: "FEATURED WORK & SYSTEMS" }
      : scrollProgress >= 0.47 && scrollProgress < 0.59
      ? { index: "03", title: "ENGINEERING LAB", subtitle: "TECHNICAL CAPABILITIES" }
      : scrollProgress >= 0.61 && scrollProgress < 0.73
      ? { index: "04", title: "ARCHIVE", subtitle: "PROOF & MILESTONES" }
      : scrollProgress >= 0.75 && scrollProgress < 0.85
      ? { index: "05", title: "PRIVATE STUDY", subtitle: "HOW I THINK & OPERATE" }
      : scrollProgress >= 0.87 && scrollProgress < 0.95
      ? { index: "06", title: "CONTACT", subtitle: "COMMUNICATION & EXIT" }
      : null;

  return (
    <div
      className="pointer-events-none absolute inset-0 z-30 flex flex-col justify-between p-4 sm:p-8 lg:p-10 select-none"
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
            <span className="font-mono text-[0.68rem] tracking-[0.14em] text-accent font-medium uppercase transition-colors duration-300">
              {isProjectFocused && focusedProject
                ? `${spatialState.name} · ${focusedProject.name.toUpperCase()}`
                : spatialState.name}
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
            className="group inline-flex items-center gap-1.5 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-text-secondary transition-colors hover:text-text-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent rounded-sm px-2.5 py-1.5 border border-black/[0.08] bg-white/75 shadow-xs backdrop-blur-md"
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
      <footer className="relative flex flex-col sm:flex-row items-center sm:items-end justify-between gap-4 pt-3">
        {/* Bottom-Left: Spatial Breadcrumb */}
        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={reduce ? { duration: 0.01 } : { duration: 0.8, delay: 0.6 }}
          className="hidden md:flex flex-col font-mono text-[0.68rem] tracking-[0.16em] text-text-muted uppercase"
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
              : "EXTERIOR · DAYLIGHT RESIDENCE"}
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
            className="group flex flex-col items-center gap-1.5 transition-transform active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-md p-1.5"
            aria-label="Advance through the spatial journey"
          >
            <div className="flex items-center gap-2 font-mono text-xs tracking-[0.2em] text-text-secondary uppercase transition-colors group-hover:text-text-primary">
              <span className="size-1 rounded-full bg-accent/60" aria-hidden="true" />
              <span>
                {scrollProgress < 0.1
                  ? "SCROLL TO ENTER"
                  : scrollProgress < 0.2
                  ? "STEP TO THRESHOLD"
                  : scrollProgress < 0.32
                  ? "01 FOYER"
                  : scrollProgress < 0.46
                  ? "02 PROJECT STUDIO"
                  : scrollProgress < 0.6
                  ? "03 ENGINEERING LAB"
                  : scrollProgress < 0.74
                  ? "04 ARCHIVE"
                  : scrollProgress < 0.86
                  ? "05 PRIVATE STUDY"
                  : scrollProgress < 0.96
                  ? "06 CONTACT"
                  : "OBSERVATION TERRACE"}
              </span>
              <span className="size-1 rounded-full bg-accent/60" aria-hidden="true" />
            </div>

            <motion.div
              animate={reduce ? undefined : { y: [0, 3, 0] }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="flex items-center justify-center rounded-full border border-black/[0.08] bg-white/75 p-1.5 text-text-secondary backdrop-blur-md shadow-xs transition-colors group-hover:border-accent/40 group-hover:text-accent"
            >
              <ChevronDown className="size-3.5" aria-hidden="true" />
            </motion.div>
          </button>
        </motion.div>

        {/* Bottom-Right: Direct Spatial Navigation Menu (All 6 Rooms + Exterior) */}
        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={reduce ? { duration: 0.01 } : { duration: 0.8, delay: 0.6 }}
          className="pointer-events-auto flex flex-col items-end gap-1.5"
        >
          <div className="hidden sm:flex items-center gap-1.5 font-mono text-[0.65rem] tracking-[0.16em] uppercase">
            <span className="text-text-muted/70">SPATIAL</span>
            <span className="text-text-secondary font-medium">DESTINATIONS</span>
          </div>

          <div
            className="flex items-center gap-1 rounded-md border border-black/[0.08] bg-white/80 p-1 backdrop-blur-md shadow-xs overflow-x-auto max-w-full"
            role="toolbar"
            aria-label="Direct spatial room navigation"
          >
            {/* 00 EXT */}
            <button
              type="button"
              onClick={() => onNavigateToRoom("exterior")}
              className={`rounded px-1.5 sm:px-2 py-1 font-mono text-[0.62rem] sm:text-[0.65rem] tracking-[0.1em] uppercase transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent whitespace-nowrap ${
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
              className={`rounded px-1.5 sm:px-2 py-1 font-mono text-[0.62rem] sm:text-[0.65rem] tracking-[0.1em] uppercase transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent whitespace-nowrap ${
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
              className={`rounded px-1.5 sm:px-2 py-1 font-mono text-[0.62rem] sm:text-[0.65rem] tracking-[0.1em] uppercase transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent whitespace-nowrap ${
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
              className={`rounded px-1.5 sm:px-2 py-1 font-mono text-[0.62rem] sm:text-[0.65rem] tracking-[0.1em] uppercase transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent whitespace-nowrap ${
                spatialState.roomId === "lab"
                  ? "bg-accent/20 text-accent font-semibold"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              03 LAB
            </button>

            {/* 04 ARCHIVE */}
            <button
              type="button"
              onClick={() => onNavigateToRoom("archive")}
              className={`rounded px-1.5 sm:px-2 py-1 font-mono text-[0.62rem] sm:text-[0.65rem] tracking-[0.1em] uppercase transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent whitespace-nowrap ${
                spatialState.roomId === "archive"
                  ? "bg-accent/20 text-accent font-semibold"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              04 ARCH
            </button>

            {/* 05 STUDY */}
            <button
              type="button"
              onClick={() => onNavigateToRoom("study")}
              className={`rounded px-1.5 sm:px-2 py-1 font-mono text-[0.62rem] sm:text-[0.65rem] tracking-[0.1em] uppercase transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent whitespace-nowrap ${
                spatialState.roomId === "study"
                  ? "bg-accent/20 text-accent font-semibold"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              05 STUDY
            </button>

            {/* 06 CONTACT */}
            <button
              type="button"
              onClick={() => onNavigateToRoom("contact")}
              className={`rounded px-1.5 sm:px-2 py-1 font-mono text-[0.62rem] sm:text-[0.65rem] tracking-[0.1em] uppercase transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent whitespace-nowrap ${
                spatialState.roomId === "contact" || spatialState.roomId === "exit"
                  ? "bg-accent/20 text-accent font-semibold"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              06 EXIT
            </button>
          </div>
        </motion.div>
      </footer>
    </div>
  );
}
