"use client";

import { useCallback, useState } from "react";
import { useReducedMotion } from "motion/react";
import { ProjectRow } from "@/components/projects/ProjectRow";
import type { Project, ProjectId } from "@/types";
import { cn } from "@/lib/utils";

const SEQUENCE: ProjectId[] = [
  "hearttune",
  "nisf",
  "ahal",
  "prysm",
  "orion",
  "bhoomi",
  "minchal",
];

interface ProjectShowcaseProps {
  projects: Project[];
}

/**
 * Phase 7 — Cinematic Project Transition System.
 * Coordinates tactile hover, keyboard focus states, responsive mobile touch activation,
 * and collection progress continuity across all seven portfolio projects.
 */
export function ProjectShowcase({ projects }: ProjectShowcaseProps) {
  const reduce = useReducedMotion();
  const [activeId, setActiveId] = useState<ProjectId | null>(null);

  const handleActivate = useCallback((id: ProjectId) => {
    setActiveId(id);
  }, []);

  const handleDeactivate = useCallback(() => {
    setActiveId(null);
  }, []);

  // Resolve projects according to the balanced 01–07 sequence
  const orderedProjects = SEQUENCE.map((id) => {
    const found = projects.find((p) => p.id === id);
    if (!found) throw new Error(`Project not found: ${id}`);
    return found;
  });

  const activeIndex = activeId ? SEQUENCE.indexOf(activeId) : -1;
  const activeProject = activeIndex >= 0 ? orderedProjects[activeIndex] : null;
  const activeNumber =
    activeIndex >= 0 ? String(activeIndex + 1).padStart(2, "0") : null;

  const hasActive = activeId !== null && !reduce;

  return (
    <div className="flex flex-col">
      {/* Minimal Progress & Collection Status (Phase 7 Continuity) */}
      <div className="mb-4 flex flex-col gap-2.5">
        <div className="flex items-center justify-between font-mono text-[0.68rem] tracking-[0.14em] uppercase text-text-muted">
          <span className="flex items-center gap-2">
            <span
              className={cn(
                "inline-block size-1.5 rounded-full transition-colors duration-200",
                activeId ? "bg-accent" : "bg-text-muted/40"
              )}
              aria-hidden="true"
            />
            <span>
              {activeProject
                ? `Active: ${activeProject.name}`
                : "Collection: 07 Systems"}
            </span>
          </span>
          <span className="tabular-nums">
            {activeNumber ? `${activeNumber} / 07` : "01 — 07"}
          </span>
        </div>

        {/* Minimal progress line indicator */}
        <div
          className="relative h-px w-full overflow-hidden bg-border-subtle"
          role="progressbar"
          aria-valuenow={activeIndex >= 0 ? activeIndex + 1 : 0}
          aria-valuemin={1}
          aria-valuemax={7}
          aria-label="Project collection navigation progress"
        >
          <div
            className={cn(
              "h-full bg-accent transition-all ease-out",
              reduce ? "duration-0" : "duration-250"
            )}
            style={{
              width:
                activeIndex >= 0
                  ? `${((activeIndex + 1) / SEQUENCE.length) * 100}%`
                  : "0%",
            }}
          />
        </div>
      </div>

      {/* Project Sequence Rows */}
      <div className="flex flex-col border-b border-border-subtle">
        {orderedProjects.map((project, index) => {
          const number = String(index + 1).padStart(2, "0");
          const isActive = activeId === project.id;

          return (
            <ProjectRow
              key={project.id}
              project={project}
              number={number}
              isActive={isActive}
              isMuted={hasActive && !isActive}
              onActivate={() => handleActivate(project.id)}
              onDeactivate={handleDeactivate}
              index={index}
            />
          );
        })}
      </div>
    </div>
  );
}
