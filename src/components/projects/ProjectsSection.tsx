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

        {/* Project → About Transition Bridge */}
        <div className="relative pt-6 sm:pt-10">
          {/* Subtle atmospheric ambient fade */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 -top-6 h-20 bg-gradient-to-b from-transparent to-surface-muted/20 opacity-60"
          />

          <Reveal delay={0.1}>
            <div className="flex flex-col items-start justify-between gap-4 border-t border-border-subtle/50 pt-8 sm:flex-row sm:items-center">
              <div className="flex items-center gap-2.5">
                <span
                  aria-hidden="true"
                  className="size-1.5 rounded-full bg-accent"
                />
                <p className="font-mono text-xs tracking-[0.14em] uppercase text-text-muted">
                  07 / 07 Projects Complete
                </p>
              </div>

              <a
                href="#about"
                className="group inline-flex items-center gap-2 font-mono text-xs tracking-[0.14em] uppercase text-text-muted transition-colors duration-200 hover:text-text-primary focus-visible:text-accent focus-visible:outline-none"
                aria-label="Continue downward to About section"
              >
                <span>Continue to Engineering Philosophy</span>
                <span
                  aria-hidden="true"
                  className="transition-transform duration-200 ease-out group-hover:translate-y-0.5 group-focus-visible:translate-y-0.5"
                >
                  ↓
                </span>
              </a>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
