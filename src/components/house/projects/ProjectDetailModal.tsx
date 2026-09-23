"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { X, ExternalLink, GitBranch, Sparkles } from "lucide-react";
import { Project } from "@/types";

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectDetailModal({
  project,
  onClose,
}: ProjectDetailModalProps) {
  const reduce = useReducedMotion();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Focus trap & Escape key handler
  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    closeButtonRef.current?.focus();

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0.01 : 0.3 }}
            onClick={onClose}
            className="absolute inset-0 bg-background/80 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Modal Card */}
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.98 }}
            transition={{
              duration: reduce ? 0.01 : 0.35,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative w-full max-w-xl overflow-hidden rounded-xl border border-border-subtle bg-surface/95 p-6 sm:p-8 shadow-elevated text-text-primary"
          >
            {/* Subtle atmospheric hairline */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-60" />

            {/* Header: Category, Featured Pill, Close Button */}
            <div className="flex items-center justify-between border-b border-border-subtle/50 pb-4">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs uppercase tracking-[0.14em] text-accent">
                  {project.category || "ENGINEERING"}
                </span>
                {project.featured && (
                  <span className="inline-flex items-center gap-1 rounded-full border border-accent/30 bg-accent/10 px-2 py-0.5 text-[0.65rem] font-mono tracking-wider text-accent uppercase">
                    <Sparkles className="size-2.5" aria-hidden="true" />
                    FEATURED
                  </span>
                )}
              </div>

              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                className="inline-flex size-8 items-center justify-center rounded-md text-text-secondary transition-colors hover:bg-surface-muted hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                aria-label="Close project details"
              >
                <X className="size-4" aria-hidden="true" />
              </button>
            </div>

            {/* Project Title & Tagline */}
            <div className="mt-5">
              <h3
                id="project-modal-title"
                className="type-h2 font-semibold tracking-tight text-text-primary"
              >
                {project.name}
              </h3>
              {project.tagline && (
                <p className="mt-1 font-mono text-xs text-text-secondary">
                  {project.tagline}
                </p>
              )}
            </div>

            {/* Project Narrative Description */}
            {project.description && (
              <p className="type-body mt-4 text-pretty text-text-secondary leading-relaxed">
                {project.description}
              </p>
            )}

            {/* Technologies */}
            {project.technologies && project.technologies.length > 0 && (
              <div className="mt-6 border-t border-border-subtle/50 pt-4">
                <span className="font-mono text-[0.68rem] tracking-[0.14em] text-text-muted uppercase block mb-2.5">
                  CORE TECHNOLOGIES
                </span>
                <ul className="flex flex-wrap gap-1.5" aria-label="Project technologies">
                  {project.technologies.map((tech) => (
                    <li
                      key={tech}
                      className="rounded border border-border-subtle bg-surface-muted/60 px-2.5 py-1 font-mono text-xs text-text-secondary"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Verified External Links */}
            {project.links && (project.links.github || project.links.liveUrl) && (
              <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-border-subtle/50 pt-4">
                {project.links.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-md border border-border bg-surface px-3 py-1.5 font-mono text-xs text-text-primary transition-colors hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    <GitBranch className="size-3.5 text-text-muted" aria-hidden="true" />
                    <span>View Repository</span>
                  </a>
                )}
                {project.links.liveUrl && (
                  <a
                    href={project.links.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-md bg-accent px-3 py-1.5 font-mono text-xs text-accent-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    <span>Launch Live</span>
                    <ExternalLink className="size-3.5" aria-hidden="true" />
                  </a>
                )}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
