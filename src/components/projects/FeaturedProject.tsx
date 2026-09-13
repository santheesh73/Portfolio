import { Badge } from "@/components/ui/Badge";
import { ProjectLinkActions } from "@/components/projects/ProjectCard";
import { ProjectVisual } from "@/components/projects/ProjectVisual";
import type { Project } from "@/types";

/**
 * Featured project treatment — substantially larger than secondary cards,
 * with a dominant visual area and full technology list.
 */
export function FeaturedProject({ project }: { project: Project }) {
  return (
    <div className="group overflow-hidden rounded-xl border border-border bg-surface shadow-card transition-[box-shadow,border-color] duration-200 ease-out hover:border-text-muted/40 hover:shadow-elevated">
      <article
        aria-labelledby={`${project.id}-featured-title`}
        className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr]"
      >
        <ProjectVisual
          id={project.id}
          className="aspect-[16/10] border-b border-border-subtle sm:aspect-[16/8] lg:aspect-auto lg:min-h-[380px] lg:border-b-0 lg:border-r"
        />

        <div className="flex flex-col justify-center gap-3 p-6 sm:p-9 lg:p-11">
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="type-eyebrow text-text-muted">Featured</span>
            {project.category ? (
              <span className="type-eyebrow text-accent">
                · {project.category}
              </span>
            ) : null}
          </p>
          <h3
            id={`${project.id}-featured-title`}
            className="type-h1 text-text-primary"
          >
            {project.name}
          </h3>
          {project.tagline ? (
            <p className="type-body-large text-pretty text-text-primary">
              {project.tagline}
            </p>
          ) : null}
          {project.description ? (
            <p className="type-body max-w-xl text-pretty text-text-secondary">
              {project.description}
            </p>
          ) : null}
          {project.technologies.length > 0 ? (
            <ul
              aria-label={`${project.name} technologies`}
              className="mt-1 flex flex-wrap gap-1.5"
            >
              {project.technologies.map((tech) => (
                <li key={tech}>
                  <Badge variant={tech === "On-Device AI" ? "accent" : "default"}>
                    {tech}
                  </Badge>
                </li>
              ))}
            </ul>
          ) : null}
          <ProjectLinkActions project={project} />
        </div>
      </article>
    </div>
  );
}
