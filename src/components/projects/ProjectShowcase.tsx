"use client";

import { useCallback, useState } from "react";
import { useReducedMotion } from "motion/react";
import { ProjectRow } from "@/components/projects/ProjectRow";
import type { Project, ProjectId } from "@/types";

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
 * Phase 6 — Cinematic Project Interaction System.
 * Coordinates tactile hover, keyboard focus states, and equal balance
 * across all seven portfolio projects.
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

  const hasActive = activeId !== null && !reduce;

  return (
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
  );
}
