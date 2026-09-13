import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/motion/Reveal";
import { EngineeringPrinciples } from "@/components/about/EngineeringPrinciples";
import { EducationCard } from "@/components/about/EducationCard";
import { TECHNICAL_FOCUS } from "@/data/about";
import { profile } from "@/data/profile";

/**
 * Phase 4 — About / Engineering Identity.
 * Server component. Editorial narrative + typographic identity visual,
 * principles, and a compact education surface.
 * Motion is delegated to the reduced-motion-aware Reveal primitive.
 */
export function AboutSection() {
  return (
    <section
      id="about"
      aria-label="About Santheesh S"
      className="scroll-mt-20 border-t border-border-subtle"
    >
      <Container className="flex flex-col gap-10 py-14 sm:gap-12 sm:py-20">
        <Reveal>
          <SectionHeading
            eyebrow="03 — About"
            title="Engineer. Builder. Learner."
            description="Building software at the intersection of AI, engineering, and user experience."
          />
        </Reveal>

        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          {/* ---- Narrative ---- */}
          <Reveal delay={0.05}>
            <div className="flex max-w-2xl flex-col">
              <p className="type-eyebrow text-text-secondary">
                {profile.name} — {profile.roles.join("  ·  ")}
              </p>
              <h3 className="type-h2 mt-4 text-balance text-text-primary">
                I turn ideas in AI and full-stack development into software
                people can actually use.
              </h3>
              <div className="type-body mt-4 flex flex-col gap-4 text-pretty text-text-secondary">
                <p>
                  I work across intelligent systems and modern web interfaces —
                  experimenting with generative AI, building full-stack
                  products, and refining them until they feel simple and
                  reliable.
                </p>
                <p>
                  My focus is real-world problems: clear architecture, honest
                  interfaces, and software that holds up in everyday use.
                </p>
              </div>

              <ul
                aria-label="Technical focus areas"
                className="mt-6 flex flex-wrap gap-2"
              >
                {TECHNICAL_FOCUS.map((area) => (
                  <li key={area}>
                    <Badge variant="outline">{area}</Badge>
                  </li>
                ))}
              </ul>

              <p className="mt-6 font-mono text-[0.72rem] tracking-[0.06em] text-text-muted">
                PROJECTS ↑ WHAT I BUILD &nbsp;·&nbsp; ABOUT → HOW I THINK
              </p>
            </div>
          </Reveal>

          {/* ---- Identity visual ---- */}
          <Reveal delay={0.1}>
            <IdentityVisual />
          </Reveal>
        </div>

        {/* ---- Principles ---- */}
        <Reveal delay={0.05}>
          <div className="flex flex-col gap-5">
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="type-label text-text-muted">
                How I approach building
              </h3>
              <span
                aria-hidden="true"
                className="hidden font-mono text-[0.72rem] tracking-[0.08em] text-text-muted sm:block"
              >
                04 PRINCIPLES
              </span>
            </div>
            <EngineeringPrinciples />
          </div>
        </Reveal>

        {/* ---- Education ---- */}
        <Reveal delay={0.05}>
          <EducationCard />
        </Reveal>
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
