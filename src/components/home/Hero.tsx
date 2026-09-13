import { ArrowDown, ArrowUpRight } from "lucide-react";
import { ChevronDown } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { FadeIn } from "@/components/motion/FadeIn";
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
 * Phase 2 — Premium Hero experience.
 * Server component: entrance motion is delegated to the
 * reduced-motion-aware FadeIn primitive; pointer interaction
 * lives inside the client HeroVisual boundary.
 */
export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="relative overflow-clip">
      {/* Refined background: soft radial depth + fine grid (reduced on mobile) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(52rem_30rem_at_18%_8%,rgba(15,118,110,0.08),transparent_65%)]" />
        <div className="absolute inset-0 hidden bg-[linear-gradient(to_right,var(--border-subtle)_1px,transparent_1px),linear-gradient(to_bottom,var(--border-subtle)_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(46rem_30rem_at_50%_0%,black,transparent_75%)] opacity-70 sm:block" />
      </div>

      <Container className="relative flex min-h-[calc(100svh-4rem)] flex-col justify-center py-14 sm:py-20">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.04fr_0.96fr] lg:gap-10">
          {/* ---- Content ---- */}
          <div className="flex max-w-2xl flex-col">
            <FadeIn>
              <p className="flex items-center gap-2.5">
                <span
                  aria-hidden="true"
                  className="inline-block size-1.5 rounded-full bg-accent"
                />
                <span className="type-eyebrow text-text-secondary">
                  AI • Full-stack • Product engineering
                </span>
              </p>
            </FadeIn>

            <FadeIn delay={0.06}>
              <ul
                aria-label="Professional identity"
                className="mt-5 space-y-1 text-[0.95rem] font-semibold uppercase leading-snug tracking-[0.12em] text-text-primary"
              >
                {profile.roles.map((role) => (
                  <li key={role}>{role}</li>
                ))}
              </ul>
            </FadeIn>

            <FadeIn delay={0.12}>
              <h1
                id="hero-heading"
                className="type-display mt-4 text-text-primary"
              >
                Building <span className="text-accent">intelligent</span>{" "}
                software for the real world.
              </h1>
            </FadeIn>

            <FadeIn delay={0.18}>
              <p className="type-body-large mt-5 max-w-xl text-pretty text-text-secondary">
                I build AI-powered and full-stack software products with a
                focus on intelligent systems, modern interfaces, and
                meaningful user experiences.
              </p>
            </FadeIn>

            <FadeIn delay={0.24}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button href="/#projects">
                  View Projects
                  <ArrowDown className="size-4" aria-hidden="true" />
                </Button>
                <Button
                  variant="secondary"
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Open GitHub profile in a new tab"
                >
                  GitHub
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </Button>
              </div>
            </FadeIn>

            <FadeIn delay={0.3}>
              <ul
                aria-label="Core technologies"
                className="mt-7 flex flex-wrap gap-2"
              >
                {HERO_TECHNOLOGIES.map((tech) => (
                  <li key={tech}>
                    <Badge variant={tech === "Generative AI" ? "accent" : "default"}>
                      {tech}
                    </Badge>
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>

          {/* ---- Visual ---- */}
          <FadeIn delay={0.2} y={20}>
            <HeroVisual />
          </FadeIn>
        </div>

        {/* ---- Scroll guidance (decorative) ---- */}
        <div
          aria-hidden="true"
          className="mt-14 flex flex-col items-center gap-1.5 text-text-muted"
        >
          <p className="type-label">Scroll to explore</p>
          <ChevronDown className="size-4 animate-bounce" />
        </div>
      </Container>
    </section>
  );
}
