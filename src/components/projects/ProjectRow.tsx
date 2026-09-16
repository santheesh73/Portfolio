"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ProjectVisual } from "@/components/projects/ProjectVisual";
import type { Project } from "@/types";
import { cn } from "@/lib/utils";

interface ProjectRowProps {
  project: Project;
  number: string;
  isActive: boolean;
  isMuted: boolean;
  onActivate: () => void;
  onDeactivate: () => void;
  index: number;
}

export function ProjectRow({
  project,
  number,
  isActive,
  isMuted,
  onActivate,
  onDeactivate,
  index,
}: ProjectRowProps) {
  const reduce = useReducedMotion();
  const rowRef = useRef<HTMLElement>(null);
  const [finePointer, setFinePointer] = useState<boolean>(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: fine)").matches
  );

  // Fine pointer query for tactile micro-interaction (desktop only)
  useEffect(() => {
    const query = window.matchMedia("(pointer: fine)");
    const onChange = (e: MediaQueryListEvent) => setFinePointer(e.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  // Subtle pointer-based parallax for preview card (heavily restrained: ±4px)
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 160, damping: 22, mass: 0.3 });
  const sy = useSpring(py, { stiffness: 160, damping: 22, mass: 0.3 });
  const previewX = useTransform(sx, [-0.5, 0.5], [-5, 5]);
  const previewY = useTransform(sy, [-0.5, 0.5], [-3, 3]);

  const enableTilt = finePointer && !reduce && isActive;

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (!finePointer || reduce) return;
    const rect = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width - 0.5);
    py.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handlePointerLeave = () => {
    px.set(0);
    py.set(0);
    onDeactivate();
  };

  const isPrysm = project.id === "prysm";
  const category = project.category || (isPrysm ? "In Development" : "");
  const description =
    project.description ||
    (isPrysm ? "Architecture and interface specifications in development." : "");
  const links = project.links;

  return (
    <motion.article
      ref={rowRef}
      id={`project-${project.id}`}
      aria-labelledby={`project-title-${project.id}`}
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={
        reduce
          ? { duration: 0.01 }
          : { duration: 0.5, delay: 0.04 * index, ease: [0.22, 1, 0.36, 1] }
      }
      onMouseEnter={onActivate}
      onMouseLeave={handlePointerLeave}
      onPointerMove={handlePointerMove}
      onFocus={onActivate}
      onBlur={onDeactivate}
      className={cn(
        "group relative border-t border-border-subtle py-8 sm:py-12 transition-[opacity,background-color,border-color] duration-250 ease-out outline-none",
        isActive
          ? "opacity-100 bg-surface-muted/25"
          : isMuted
          ? "opacity-60"
          : "opacity-100",
        "focus-within:opacity-100 focus-within:bg-surface-muted/25"
      )}
    >
      {/* Active Left Indicator Accent Line */}
      <span
        aria-hidden="true"
        className={cn(
          "absolute left-0 top-0 bottom-0 w-1 bg-accent transition-all duration-250 ease-out",
          isActive ? "opacity-100 scale-y-100" : "opacity-0 scale-y-75"
        )}
      />

      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[1.18fr_0.82fr] lg:gap-12 px-4 sm:px-6">
        {/* ---- Information & Narrative Column ---- */}
        <div className="flex flex-col">
          {/* Index & Category */}
          <div className="flex items-center gap-3">
            <span
              className={cn(
                "font-mono text-xs font-semibold tracking-[0.16em] transition-transform duration-200 ease-out",
                isActive ? "text-accent translate-x-0.5" : "text-text-muted"
              )}
            >
              {number}
            </span>
            <span
              aria-hidden="true"
              className="h-px w-3 bg-border-subtle"
            />
            {category ? (
              <span className="font-mono text-xs tracking-[0.12em] uppercase text-text-muted">
                {category}
              </span>
            ) : null}
          </div>

          {/* Project Name (Tactile horizontal translation on active) */}
          <h3
            id={`project-title-${project.id}`}
            className={cn(
              "type-h2 mt-3 font-semibold tracking-tight text-text-primary transition-transform duration-200 ease-out",
              isActive && !reduce ? "translate-x-1" : "translate-x-0"
            )}
          >
            {project.name}
          </h3>

          {/* Tagline */}
          {project.tagline ? (
            <p className="type-body mt-2 font-medium text-text-primary">
              {project.tagline}
            </p>
          ) : null}

          {/* Description */}
          {description ? (
            <p className="type-body mt-2 text-pretty text-text-secondary leading-relaxed">
              {description}
            </p>
          ) : null}

          {/* Verified Technologies */}
          {project.technologies.length > 0 ? (
            <ul
              aria-label={`${project.name} technologies`}
              className="mt-4 flex flex-wrap gap-1.5"
            >
              {project.technologies.map((tech) => (
                <li key={tech}>
                  <Badge
                    variant={isActive ? "outline" : "default"}
                    className="transition-colors duration-150"
                  >
                    {tech}
                  </Badge>
                </li>
              ))}
            </ul>
          ) : null}

          {/* Project Links / Actions */}
          {links && (links.liveUrl || links.github || links.caseStudyHref) ? (
            <div className="mt-6 flex flex-wrap items-center gap-2.5">
              {links.liveUrl ? (
                <Button
                  variant="outline"
                  size="sm"
                  href={links.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group/btn"
                >
                  Live Demo
                  <ArrowUpRight
                    className="size-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </Button>
              ) : null}
              {links.github ? (
                <Button
                  variant="ghost"
                  size="sm"
                  href={links.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${project.name} source code on GitHub (opens in a new tab)`}
                  className="group/btn"
                >
                  GitHub
                  <ArrowUpRight
                    className="size-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </Button>
              ) : null}
              {links.caseStudyHref ? (
                <Button
                  variant="ghost"
                  size="sm"
                  href={links.caseStudyHref}
                  className="group/btn"
                >
                  Case Study
                  <ArrowRight
                    className="size-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5"
                    aria-hidden="true"
                  />
                </Button>
              ) : null}
            </div>
          ) : null}
        </div>

        {/* ---- Abstract Architectural Visual Preview (with restrained tactile micro-parallax) ---- */}
        <motion.div
          style={enableTilt ? { x: previewX, y: previewY } : undefined}
          className={cn(
            "relative aspect-[16/10] w-full overflow-hidden rounded-xl border transition-[border-color,box-shadow,transform] duration-300 ease-out",
            isActive
              ? "border-border shadow-card bg-surface/70"
              : "border-border-subtle bg-surface/40"
          )}
        >
          {/* Subtle atmospheric ambient glow on active preview */}
          <div
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute inset-0 transition-opacity duration-300 ease-out",
              isActive
                ? "opacity-100 bg-[radial-gradient(circle_at_50%_30%,rgba(20,184,166,0.1),transparent_70%)]"
                : "opacity-0"
            )}
          />

          <ProjectVisual id={project.id} className="h-full w-full" />
        </motion.div>
      </div>
    </motion.article>
  );
}
