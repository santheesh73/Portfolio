import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ProjectVisual } from "@/components/projects/ProjectVisual";
import type { Project } from "@/types";
import { cn } from "@/lib/utils";

export function ProjectLinkActions({ project }: { project: Project }) {
  const links = project.links;
  if (!links || (!links.github && !links.liveUrl && !links.caseStudyHref)) {
    return null;
  }
  return (
    <div className="flex flex-wrap items-center gap-2 pt-1">
      {links.liveUrl ? (
        <Button variant="outline" size="sm" href={links.liveUrl}>
          Live demo
          <ArrowUpRight className="size-3.5" aria-hidden="true" />
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
        >
          GitHub
          <ArrowUpRight className="size-3.5" aria-hidden="true" />
        </Button>
      ) : null}
      {links.caseStudyHref ? (
        <Button variant="ghost" size="sm" href={links.caseStudyHref}>
          Case study
          <ArrowRight className="size-3.5" aria-hidden="true" />
        </Button>
      ) : null}
    </div>
  );
}

interface ProjectCardProps {
  project: Project;
  layout?: "vertical" | "horizontal";
  maxTechnologies?: number;
  headingId?: string;
}

/**
 * Flexible project card — vertical for grids, horizontal for wide rows.
 * Missing fields render nothing; undocumented projects stay clean
 * rather than showing placeholder copy.
 */
export function ProjectCard({
  project,
  layout = "vertical",
  maxTechnologies = 4,
  headingId,
}: ProjectCardProps) {
  const technologies = project.technologies.slice(0, maxTechnologies);
  const horizontal = layout === "horizontal";

  return (
    <Card
      variant="default"
      className={cn(
        "group flex h-full flex-col overflow-hidden",
        "transition-[box-shadow,transform,border-color] duration-200 ease-out",
        "hover:-translate-y-[3px] hover:border-text-muted/40 hover:shadow-card"
      )}
    >
      <article
        aria-labelledby={headingId ?? `${project.id}-title`}
        className={cn(
          "flex h-full flex-col",
          horizontal && "sm:grid sm:grid-cols-[1.05fr_1fr] sm:flex-1"
        )}
      >
        <ProjectVisual
          id={project.id}
          className={cn(
            "border-b border-border-subtle",
            horizontal
              ? "aspect-[16/8] sm:aspect-auto sm:border-b-0 sm:border-r sm:min-h-[220px]"
              : "aspect-[16/9]"
          )}
        />

        <div
          className={cn(
            "flex flex-1 flex-col gap-2.5 p-5 sm:p-6",
            horizontal && "justify-center sm:p-8"
          )}
        >
          {project.category ? (
            <p className="type-eyebrow text-accent">{project.category}</p>
          ) : null}
          <h3
            id={headingId ?? `${project.id}-title`}
            className={cn(
              "text-text-primary",
              horizontal ? "type-h2" : "type-h3"
            )}
          >
            {project.name}
          </h3>
          {project.tagline ? (
            <p className="type-body-small font-medium text-text-primary">
              {project.tagline}
            </p>
          ) : null}
          {project.description ? (
            <p className="type-body-small text-pretty text-text-secondary">
              {project.description}
            </p>
          ) : null}
          {technologies.length > 0 ? (
            <ul aria-label={`${project.name} technologies`} className="mt-1 flex flex-wrap gap-1.5">
              {technologies.map((tech) => (
                <li key={tech}>
                  <Badge>{tech}</Badge>
                </li>
              ))}
            </ul>
          ) : null}
          <ProjectLinkActions project={project} />
        </div>
      </article>
    </Card>
  );
}
