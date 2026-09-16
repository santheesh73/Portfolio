"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ProjectVisual } from "@/components/projects/ProjectVisual";
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

export function ProjectShowcase({ projects }: ProjectShowcaseProps) {
  const reduce = useReducedMotion();
  const [hoveredId, setHoveredId] = useState<ProjectId | null>(null);
  const [focusedId, setFocusedId] = useState<ProjectId | null>(null);

  const activeId = hoveredId || focusedId;
  const hasActive = activeId !== null && !reduce;

  // Resolve projects according to the balanced 01–07 sequence
  const orderedProjects = SEQUENCE.map((id) => {
    const found = projects.find((p) => p.id === id);
    if (!found) throw new Error(`Project not found: ${id}`);
    return found;
  });

  return (
    <div className="flex flex-col">
      {orderedProjects.map((project, index) => {
        const number = String(index + 1).padStart(2, "0");
        const isActive = activeId === project.id;
        const isPrysm = project.id === "prysm";
        const category = project.category || (isPrysm ? "In Development" : "");
        const description =
          project.description ||
          (isPrysm
            ? "Architecture and interface specifications in development."
            : "");

        const links = project.links;

        return (
          <motion.article
            key={project.id}
            id={`project-${project.id}`}
            aria-labelledby={`project-title-${project.id}`}
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={
              reduce
                ? { duration: 0.01 }
                : { duration: 0.5, delay: 0.04 * index, ease: [0.22, 1, 0.36, 1] }
            }
            onMouseEnter={() => setHoveredId(project.id)}
            onMouseLeave={() => setHoveredId(null)}
            onFocus={() => setFocusedId(project.id)}
            onBlur={() => setFocusedId(null)}
            className={cn(
              "group relative border-t border-border-subtle py-8 sm:py-12 transition-[opacity,background-color,border-color] duration-250 ease-out",
              index === orderedProjects.length - 1 && "border-b",
              isActive
                ? "opacity-100 bg-surface-muted/20"
                : hasActive
                ? "opacity-55"
                : "opacity-100"
            )}
          >
            {/* Active Left Indicator Line */}
            <span
              aria-hidden="true"
              className={cn(
                "absolute left-0 top-0 bottom-0 w-1 bg-accent transition-opacity duration-200",
                isActive ? "opacity-100" : "opacity-0"
              )}
            />

            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[1.18fr_0.82fr] lg:gap-12 px-4 sm:px-6">
              {/* ---- Information & Narrative Column ---- */}
              <div className="flex flex-col">
                {/* Index & Category */}
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-semibold tracking-[0.16em] text-accent">
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

                {/* Project Name */}
                <h3
                  id={`project-title-${project.id}`}
                  className="type-h2 mt-3 font-semibold tracking-tight text-text-primary transition-colors group-hover:text-text-primary"
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
                        <Badge variant="default">{tech}</Badge>
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

              {/* ---- Abstract Architectural Visual Preview ---- */}
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-border-subtle bg-surface/50 shadow-card backdrop-blur-sm transition-[border-color,transform] duration-300 ease-out group-hover:border-border group-hover:scale-[1.015]">
                <ProjectVisual id={project.id} className="h-full w-full" />
              </div>
            </div>
          </motion.article>
        );
      })}
    </div>
  );
}
