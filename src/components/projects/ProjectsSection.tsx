import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { ProjectShowcase } from "@/components/projects/ProjectShowcase";
import { projects } from "@/data/projects";

/**
 * Phase 5 — Cinematic Projects Showcase.
 * Server component: renders section structure, editorial opening, and delegates
 * interactive row states to ProjectShowcase.
 */
export function ProjectsSection() {
  return (
    <section
      id="projects"
      aria-label="Selected work"
      className="scroll-mt-20 border-t border-border-subtle"
    >
      <Container className="flex flex-col gap-10 py-16 sm:gap-14 sm:py-24">
        {/* Section Opening & Project Count */}
        <Reveal>
          <div className="flex flex-col gap-4 pb-6 border-b border-border-subtle/50">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs tracking-[0.16em] uppercase text-text-muted">
                02 — Selected work
              </span>
              <span className="font-mono text-[0.68rem] tracking-[0.16em] uppercase px-2.5 py-0.5 rounded-full border border-border-subtle bg-surface-muted/60 text-accent">
                07 Projects
              </span>
            </div>
            <h2 className="type-h1 font-semibold text-text-primary tracking-tight">
              Things I&apos;ve built
            </h2>
            <p className="type-body max-w-2xl text-pretty text-text-secondary leading-relaxed">
              Seven products. Different problems. One engineering mindset —
              spanning on-device intelligence, creative AI, streaming
              architecture, and full-stack systems.
            </p>
          </div>
        </Reveal>

        {/* Editorial Project Showcase Sequence */}
        <ProjectShowcase projects={projects} />
      </Container>
    </section>
  );
}
