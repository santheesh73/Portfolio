"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import {
  X,
  ExternalLink,
  GitBranch,
  Sparkles,
  Rotate3d,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Project } from "@/types";
import { ExhibitionState } from "@/types/exhibition";
import { getProjectIdentity } from "@/theme/colors";

interface ProjectDetailModalProps {
  project: Project | null;
  exhibitionState?: ExhibitionState;
  onExhibitionStateChange?: (state: ExhibitionState) => void;
  onClose: () => void;
}

export function ProjectDetailModal({
  project,
  exhibitionState = "EXHIBITION_360",
  onExhibitionStateChange,
  onClose,
}: ProjectDetailModalProps) {
  const reduce = useReducedMotion();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const projectIdentity = project ? getProjectIdentity(project.id) : null;
  const isVisible =
    Boolean(project) &&
    Boolean(projectIdentity) &&
    exhibitionState !== "EXITING" &&
    exhibitionState !== "IDLE";

  // Escape key handler
  useEffect(() => {
    if (!isVisible) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isVisible, onClose]);

  const handleToggleCollapse = () => {
    const next = !isCollapsed;
    setIsCollapsed(next);
    if (!next) {
      onExhibitionStateChange?.("DETAIL");
    } else {
      onExhibitionStateChange?.("EXHIBITION_360");
    }
  };

  return (
    <AnimatePresence>
      {isVisible && project && projectIdentity && (
        <motion.div
          key={`exhibit-signage-${project.id}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.3 } }}
          className="pointer-events-none fixed inset-0 z-40 flex flex-col justify-between p-4 sm:p-6 lg:p-8"
          role="region"
          aria-label={`Exhibition Signage: ${project.name}`}
        >
        {/* ========================================================
            1. TOP-CENTER MINIMAL 360° INTERACTION CONTROLS BANNER
            ======================================================== */}
        <motion.div
          initial={reduce ? undefined : { opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? undefined : { opacity: 0, y: -10 }}
          transition={{ duration: 0.4 }}
          className="mx-auto flex items-center gap-2.5 rounded-full border border-black/[0.08] bg-white/85 px-4 py-1.5 shadow-sm backdrop-blur-md"
        >
          <Rotate3d
            className="size-3.5 animate-spin-slow text-accent"
            style={{ color: projectIdentity.accent }}
            aria-hidden="true"
          />
          <span className="font-mono text-[0.68rem] tracking-[0.16em] uppercase text-text-secondary">
            <span className="hidden sm:inline">
              {exhibitionState === "SELECTED" ? "APPROACHING EXHIBIT · " : "360° EXHIBITION MODE · "}
            </span>
            <span className="text-text-primary font-medium">DRAG TO ORBIT</span>
            <span className="hidden sm:inline text-text-muted/60"> · SCROLL TO ZOOM</span>
            <span className="inline sm:hidden text-text-muted/60"> · PINCH ZOOM</span>
          </span>
          <span className="hidden sm:inline font-mono text-[0.62rem] text-text-muted bg-surface-muted/80 rounded px-1.5 py-0.5 border border-border-subtle">
            ESC TO EXIT
          </span>
        </motion.div>

        {/* ========================================================
            2. CONTEXTUAL EXHIBITION SIGNAGE PLACARD
            Docked on side/bottom to keep 3D exhibit completely visible
            ======================================================== */}
        <div className="flex w-full justify-end items-end mt-auto pointer-events-none">
          <motion.div
            initial={reduce ? undefined : { opacity: 0, x: 20, y: 10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, x: 20, y: 10 }}
            transition={{
              duration: reduce ? 0.01 : 0.35,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="pointer-events-auto relative w-full sm:max-w-md rounded-xl border border-black/[0.1] bg-white/92 backdrop-blur-xl p-4 sm:p-6 shadow-2xl text-text-primary overflow-hidden"
          >
            {/* Project Identity Hairline Indicator */}
            <div
              className="absolute top-0 left-0 right-0 h-[2px]"
              style={{
                background: `linear-gradient(90deg, transparent, ${projectIdentity.accent}, transparent)`,
              }}
            />

            {/* Header: Exhibit Number, Category, Actions */}
            <div className="flex items-center justify-between border-b border-border-subtle/50 pb-3">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[0.65rem] tracking-[0.16em] uppercase text-text-muted">
                  EXHIBIT
                </span>
                {project.category && (
                  <>
                    <span className="text-text-muted/40 font-mono text-[0.65rem]">/</span>
                    <span
                      className="font-mono text-[0.68rem] tracking-[0.14em] uppercase font-semibold"
                      style={{ color: projectIdentity.accent }}
                    >
                      {project.category}
                    </span>
                  </>
                )}
                {project.featured && (
                  <span className="inline-flex items-center gap-1 rounded-full border border-accent/30 bg-accent/10 px-2 py-0.5 text-[0.6rem] font-mono tracking-wider text-accent uppercase">
                    <Sparkles className="size-2" aria-hidden="true" />
                    MASTER
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1">
                {/* Collapse / Expand Toggle */}
                <button
                  type="button"
                  onClick={handleToggleCollapse}
                  className="inline-flex size-7 items-center justify-center rounded-md text-text-muted transition-colors hover:bg-surface-muted hover:text-text-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
                  aria-label={isCollapsed ? "Expand exhibit details" : "Collapse exhibit details"}
                >
                  {isCollapsed ? (
                    <ChevronUp className="size-4" aria-hidden="true" />
                  ) : (
                    <ChevronDown className="size-4" aria-hidden="true" />
                  )}
                </button>

                {/* Return / Close Exhibit */}
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex items-center gap-1.5 rounded-md border border-border-subtle bg-surface px-2.5 py-1 text-text-secondary transition-colors hover:bg-surface-muted hover:text-text-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
                  aria-label="Return to gallery room"
                >
                  <span className="font-mono text-[0.62rem] uppercase tracking-[0.1em]">RETURN</span>
                  <X className="size-3 text-text-muted" aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* Exhibit Title & Tagline */}
            <div className="mt-3">
              <h3 className="type-h3 text-lg sm:text-xl font-bold tracking-tight text-text-primary">
                {project.name}
              </h3>
              {project.tagline && (
                <p className="mt-0.5 font-mono text-xs text-text-secondary">
                  {project.tagline}
                </p>
              )}
            </div>

            {/* Collapsible Content Section */}
            {!isCollapsed && (
              <motion.div
                initial={reduce ? undefined : { opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={reduce ? undefined : { opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="mt-3 space-y-3"
              >
                {/* Narrative Description (Verified only) */}
                {project.description && (
                  <p className="type-body text-xs text-text-secondary leading-relaxed">
                    {project.description}
                  </p>
                )}

                {/* Verified Core Technologies */}
                {project.technologies && project.technologies.length > 0 && (
                  <div className="border-t border-border-subtle/50 pt-2.5">
                    <span className="font-mono text-[0.62rem] tracking-[0.14em] text-text-muted uppercase block mb-1.5">
                      VERIFIED STACK & CAPABILITIES
                    </span>
                    <ul className="flex flex-wrap gap-1" aria-label="Project technologies">
                      {project.technologies.map((tech) => (
                        <li
                          key={tech}
                          className="rounded border border-border-subtle bg-surface-muted/60 px-2 py-0.5 font-mono text-[0.65rem] text-text-secondary"
                        >
                          {tech}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Verified Destinations & Repository Links */}
                {project.links && (project.links.github || project.links.liveUrl) && (
                  <div className="flex flex-wrap items-center gap-2 border-t border-border-subtle/50 pt-2.5">
                    {project.links.github && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-md border border-border bg-surface px-2.5 py-1 font-mono text-xs text-text-primary transition-colors hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
                      >
                        <GitBranch className="size-3 text-text-muted" aria-hidden="true" />
                        <span>Repository</span>
                      </a>
                    )}
                    {project.links.liveUrl && (
                      <a
                        href={project.links.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 font-mono text-xs text-white transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
                        style={{ backgroundColor: projectIdentity.accent }}
                      >
                        <span>Launch Project</span>
                        <ExternalLink className="size-3" aria-hidden="true" />
                      </a>
                    )}
                  </div>
                )}
              </motion.div>
            )}
          </motion.div>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);
}
