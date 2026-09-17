import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/motion/Reveal";
import { EngineeringPrinciples } from "@/components/about/EngineeringPrinciples";
import { EducationCard } from "@/components/about/EducationCard";
import { TECHNICAL_FOCUS } from "@/data/about";
import { profile } from "@/data/profile";

/**
 * Phase 8 — Cinematic About & Personal Identity.
 * Server component. Editorial narrative hierarchy:
 * 1. Large identity statement (editorial headline)
 * 2. Personal narrative & typographic system visual
 * 3. Build / Think / Explore / Refine editorial principles
 * 4. Education surface
 * 5. Transition bridge into Technical Stack
 */
export function AboutSection() {
  return (
    <section
      id="about"
      aria-label="About Santheesh S"
      className="relative scroll-mt-20 border-t border-border-subtle bg-background"
    >
      {/* Reflective cinematic atmospheric ambient light */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_35%_at_50%_0%,rgba(20,184,166,0.035),transparent_70%)]"
      />

      <Container className="relative flex flex-col gap-16 py-20 sm:gap-20 sm:py-28 lg:gap-24 lg:py-32">
        {/* ---- 1. Opening Identity Statement ---- */}
        <Reveal>
          <div className="flex max-w-4xl flex-col gap-6">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
              <span className="font-mono text-xs tracking-[0.16em] uppercase text-text-muted">
                03 — About &amp; Engineering Identity
              </span>
              <span aria-hidden="true" className="hidden h-px w-6 bg-border-subtle sm:inline-block" />
              <span className="font-mono text-[0.68rem] tracking-[0.14em] uppercase text-accent whitespace-nowrap">
                {profile.name}
              </span>
            </div>

            <h2 className="text-balance text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl lg:text-5xl leading-[1.15]">
              I turn ideas in AI and modern web architecture into calm, reliable
              software people can actually use.
            </h2>

            <p className="type-body max-w-2xl text-pretty text-text-secondary leading-relaxed sm:text-lg">
              {profile.roles.join("  ·  ")}
            </p>
          </div>
        </Reveal>

        {/* ---- 2. Personal Narrative & Typographic System Visual ---- */}
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          {/* Narrative Column */}
          <Reveal delay={0.05}>
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="size-1.5 rounded-full bg-accent"
                />
                <h3 className="font-mono text-xs tracking-[0.16em] uppercase text-text-muted">
                  Approach &amp; Mindset
                </h3>
              </div>

              <div className="type-body flex flex-col gap-4 text-pretty text-text-secondary leading-relaxed">
                <p>
                  I work across intelligent systems and modern web interfaces —
                  experimenting with generative AI, building full-stack products,
                  and refining them until they feel simple, honest, and reliable.
                </p>
                <p>
                  My focus is real-world problems: understanding the system first,
                  architecting honest interfaces, and delivering software that holds
                  up in everyday use.
                </p>
              </div>

              {/* Verified Technical Focus */}
              <div className="flex flex-col gap-3 pt-2">
                <p className="font-mono text-[0.7rem] tracking-[0.12em] uppercase text-text-muted">
                  Core Engineering Focus
                </p>
                <ul
                  aria-label="Technical focus areas"
                  className="flex flex-wrap gap-2"
                >
                  {TECHNICAL_FOCUS.map((area) => (
                    <li key={area}>
                      <Badge variant="outline">{area}</Badge>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="font-mono text-[0.72rem] tracking-[0.08em] text-text-muted">
                PROJECTS ↑ WHAT I BUILD &nbsp;·&nbsp; ABOUT → HOW I THINK
              </p>
            </div>
          </Reveal>

          {/* Identity visual */}
          <Reveal delay={0.1}>
            <IdentityVisual />
          </Reveal>
        </div>

        {/* ---- 3. Engineering Principles (Build / Think / Explore / Refine) ---- */}
        <Reveal delay={0.05}>
          <div className="flex flex-col gap-6">
            <div className="flex items-baseline justify-between gap-4 border-b border-border-subtle/50 pb-4">
              <div className="flex items-center gap-2.5">
                <span
                  aria-hidden="true"
                  className="size-1.5 rounded-full bg-accent"
                />
                <h3 className="font-mono text-xs tracking-[0.16em] uppercase text-text-muted">
                  How I approach building
                </h3>
              </div>
              <span
                aria-hidden="true"
                className="font-mono text-[0.72rem] tracking-[0.1em] text-text-muted"
              >
                04 PRINCIPLES
              </span>
            </div>

            <EngineeringPrinciples />
          </div>
        </Reveal>

        {/* ---- 4. Education Surface ---- */}
        <Reveal delay={0.05}>
          <EducationCard />
        </Reveal>

        {/* ---- 5. About → Skills Transition Bridge ---- */}
        <div className="relative pt-6 sm:pt-10">
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
                  03 / Philosophy &amp; Identity Complete
                </p>
              </div>

              <a
                href="#stack"
                className="group inline-flex items-center gap-2 font-mono text-xs tracking-[0.14em] uppercase text-text-muted transition-colors duration-200 hover:text-text-primary focus-visible:text-accent focus-visible:outline-none"
                aria-label="Continue downward to Technical Stack section"
              >
                <span>Continue to Technical Stack</span>
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

/**
 * Original typographic identity visual.
 * Lightweight SVG + HTML only: AI → SOFTWARE → PRODUCT chain with
 * technical annotations, subtle grid, and restrained hover depth.
 */
function IdentityVisual() {
  return (
    <Card className="group relative overflow-hidden transition-[box-shadow,transform,border-color] duration-200 ease-out hover:-translate-y-[2px] hover:shadow-card">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border-subtle px-4 py-2.5">
        <p className="font-mono text-[0.68rem] tracking-[0.08em] text-text-muted">
          engineering-identity — overview
        </p>
        <span className="flex items-center gap-1.5">
          <span aria-hidden="true" className="size-1.5 rounded-full bg-success" />
          <span className="font-mono text-[0.68rem] text-text-muted">
            santheesh s
          </span>
        </span>
      </div>

      {/* Typographic system diagram */}
      <svg
        viewBox="0 0 440 300"
        role="img"
        aria-label="Diagram showing the engineering identity flow from AI to software to product"
        className="h-auto w-full"
      >
        <defs>
          <pattern
            id="about-grid"
            width="26"
            height="26"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 26 0 L 0 0 0 26"
              fill="none"
              stroke="var(--border-subtle)"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="440" height="300" fill="url(#about-grid)" />

        {/* Connector path */}
        <path
          d="M 96 84 C 150 120, 170 150, 220 168 S 300 220, 344 236"
          fill="none"
          stroke="var(--border)"
          strokeWidth="1.5"
          strokeDasharray="5 5"
        />
        <circle cx={96} cy={84} r={3.5} fill="var(--accent)" />
        <circle cx={220} cy={168} r={3.5} fill="var(--accent)" />
        <circle cx={344} cy={236} r={3.5} fill="var(--accent)" />

        {/* Nodes */}
        <g>
          <rect
            x={48}
            y={52}
            width={96}
            height={64}
            rx={10}
            fill="var(--surface)"
            stroke="var(--border)"
            strokeWidth={1.5}
          />
          <text
            x={96}
            y={80}
            textAnchor="middle"
            fontSize={22}
            fontWeight={650}
            letterSpacing="-0.02em"
            fill="var(--text-primary)"
          >
            AI
          </text>
          <text
            x={96}
            y={98}
            textAnchor="middle"
            fontSize={9}
            fontFamily="var(--font-geist-mono), monospace"
            letterSpacing="0.12em"
            fill="var(--text-muted)"
          >
            EXPLORE
          </text>
        </g>

        <g>
          <rect
            x={172}
            y={136}
            width={150}
            height={64}
            rx={10}
            fill="var(--accent)"
          />
          <text
            x={247}
            y={164}
            textAnchor="middle"
            fontSize={19}
            fontWeight={650}
            letterSpacing="-0.02em"
            fill="var(--accent-foreground)"
          >
            SOFTWARE
          </text>
          <text
            x={247}
            y={182}
            textAnchor="middle"
            fontSize={9}
            fontFamily="var(--font-geist-mono), monospace"
            letterSpacing="0.12em"
            fill="var(--accent-foreground)"
            opacity={0.8}
          >
            THINK + BUILD
          </text>
        </g>

        <g>
          <rect
            x={268}
            y={204}
            width={124}
            height={64}
            rx={10}
            fill="var(--surface)"
            stroke="var(--border)"
            strokeWidth={1.5}
            className="transition-transform duration-200 ease-out"
          />
          <text
            x={330}
            y={232}
            textAnchor="middle"
            fontSize={19}
            fontWeight={650}
            letterSpacing="-0.02em"
            fill="var(--text-primary)"
          >
            PRODUCT
          </text>
          <text
            x={330}
            y={250}
            textAnchor="middle"
            fontSize={9}
            fontFamily="var(--font-geist-mono), monospace"
            letterSpacing="0.12em"
            fill="var(--text-muted)"
          >
            REFINE
          </text>
        </g>

        {/* Annotations */}
        <text
          x={356}
          y={60}
          textAnchor="end"
          fontSize={9}
          fontFamily="var(--font-geist-mono), monospace"
          letterSpacing="0.08em"
          fill="var(--text-muted)"
        >
          v4.0 / identity
        </text>
        <text
          x={48}
          y={262}
          fontSize={9}
          fontFamily="var(--font-geist-mono), monospace"
          letterSpacing="0.08em"
          fill="var(--text-muted)"
        >
          input: curiosity
        </text>
      </svg>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-border-subtle px-4 py-2.5">
        <p className="font-mono text-[0.68rem] tracking-[0.04em] text-text-muted">
          build <span aria-hidden="true">→</span> think{" "}
          <span aria-hidden="true">→</span> explore{" "}
          <span aria-hidden="true">→</span> refine
        </p>
        <p className="font-mono text-[0.68rem] text-text-muted">
          <span className="text-accent" aria-hidden="true">
            ◉
          </span>{" "}
          how i think
        </p>
      </div>
    </Card>
  );
}
