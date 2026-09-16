import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { FadeIn } from "@/components/motion/FadeIn";
import { HeroHeading } from "@/components/home/HeroHeading";
import { HeroScrollWrapper } from "@/components/home/HeroScrollWrapper";
import { HeroScrollCue } from "@/components/home/HeroScrollCue";
import { HeroVisual } from "@/components/home/HeroVisual";
import { profile } from "@/data/profile";

const HERO_TECHNOLOGIES = [
  "Python",
  "TypeScript",
  "React",
  "Next.js",
  "Generative AI",
];

/**
 * Phase 3 — Cinematic Hero / Opening Scene.
 * Server component: renders initial semantic HTML, keeps client boundary
 * strictly inside focused interactive motion components.
 */
export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative flex min-h-[100svh] flex-col justify-between overflow-clip pt-16"
    >
      {/* Cinematic Atmosphere (Pure CSS, 0 JS runtime cost) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        {/* Soft radial depth centered behind heading */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[560px] w-full max-w-5xl bg-[radial-gradient(ellipse_65%_55%_at_50%_25%,rgba(20,184,166,0.08),transparent_70%)]" />

        {/* Secondary faint ambient depth */}
        <div className="absolute top-1/4 right-0 h-[420px] w-[460px] bg-[radial-gradient(circle_at_60%_40%,rgba(20,184,166,0.04),transparent_65%)]" />

        {/* Subtle architectural grid with radial fade */}
        <div className="absolute inset-0 atmosphere-grid atmosphere-grid-fade opacity-35" />
      </div>

      <Container className="relative flex flex-1 flex-col justify-center py-10 sm:py-16 lg:py-20">
        <HeroScrollWrapper>
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.12fr_0.88fr] lg:gap-12 xl:gap-16">
            {/* ---- Editorial Identity & Headline ---- */}
            <div className="flex max-w-2xl flex-col lg:max-w-none">
              {/* Identity Eyebrow */}
              <FadeIn delay={0.15} y={10}>
                <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-surface-muted/60 px-3 py-1 text-xs font-mono tracking-[0.08em] text-text-secondary">
                    <span
                      aria-hidden="true"
                      className="size-1.5 rounded-full bg-accent"
                    />
                    <span>AI SOFTWARE ENGINEER</span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="text-xs font-mono text-text-muted/60"
                  >
                    /
                  </span>
                  <span className="text-xs font-mono tracking-[0.08em] uppercase text-text-muted">
                    FULL-STACK DEVELOPER
                  </span>
                </div>
              </FadeIn>

              {/* Cinematic Headline */}
              <HeroHeading />

              {/* Supporting Statement */}
              <FadeIn delay={0.7} y={12}>
                <p className="type-body-large mt-6 max-w-xl text-pretty text-text-secondary">
                  I build AI-powered and full-stack software products with a
                  focus on intelligent systems, modern interfaces, and
                  meaningful user experiences.
                </p>
              </FadeIn>

              {/* Primary & Secondary Actions */}
              <FadeIn delay={0.88} y={12}>
                <div className="mt-8 flex flex-wrap items-center gap-3.5">
                  <Button href="/#projects" className="group">
                    Explore Work
                    <ArrowDown
                      className="size-4 transition-transform duration-200 group-hover:translate-y-0.5"
                      aria-hidden="true"
                    />
                  </Button>
                  <Button
                    variant="secondary"
                    href={profile.github}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Open GitHub profile in a new tab"
                    className="group"
                  >
                    GitHub
                    <ArrowUpRight
                      className="size-4 text-text-muted transition-transform duration-200 group-hover:text-text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </Button>
                </div>
              </FadeIn>

              {/* Supporting Focus Badges */}
              <FadeIn delay={1.02} y={10}>
                <div className="mt-8 flex flex-col gap-2.5">
                  <span className="type-label text-[0.68rem] uppercase tracking-[0.14em] text-text-muted">
                    Core Focus
                  </span>
                  <ul
                    aria-label="Core technologies"
                    className="flex flex-wrap gap-2"
                  >
                    {HERO_TECHNOLOGIES.map((tech) => (
                      <li key={tech}>
                        <Badge
                          variant={
                            tech === "Generative AI" ? "accent" : "default"
                          }
                        >
                          {tech}
                        </Badge>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            </div>

            {/* ---- Technical Blueprint Visual (Desktop Only) ---- */}
            <div className="hidden lg:flex justify-center xl:justify-end">
              <FadeIn delay={0.35} y={18}>
                <HeroVisual />
              </FadeIn>
            </div>
          </div>
        </HeroScrollWrapper>

        {/* ---- Scroll Guidance Cue ---- */}
        <HeroScrollCue />
      </Container>
    </section>
  );
}
