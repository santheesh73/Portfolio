import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { SkillsShowcase } from "@/components/skills/SkillsShowcase";
import { SKILL_GROUPS } from "@/data/skills";

/**
 * Phase 9 — Cinematic Technical Stack.
 * Server component. Editorial technical capabilities presentation:
 * 1. Strong editorial domain opening & narrative
 * 2. Architectural system workflow pipeline
 * 3. Interactive capability domain panels (AI, Frontend, Backend, Data/Infra)
 * 4. Atmospheric transition bridge into Proof
 */
export function SkillsSection() {
  return (
    <section
      id="stack"
      aria-label="Technical stack"
      className="relative scroll-mt-20 border-t border-border-subtle bg-background"
    >
      {/* Restrained technical ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_35%_at_50%_0%,rgba(20,184,166,0.035),transparent_70%)]"
      />

      <Container className="relative flex flex-col gap-16 py-20 sm:gap-20 sm:py-28 lg:gap-24 lg:py-32">
        {/* ---- 1. Section Editorial Opening ---- */}
        <Reveal>
          <div className="flex max-w-4xl flex-col gap-6">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
              <span className="font-mono text-xs tracking-[0.16em] uppercase text-text-muted">
                04 — Stack &amp; Technical Capabilities
              </span>
              <span
                aria-hidden="true"
                className="hidden h-px w-6 bg-border-subtle sm:inline-block"
              />
              <span className="font-mono text-[0.68rem] tracking-[0.14em] uppercase text-accent whitespace-nowrap">
                Engineering Toolkit
              </span>
            </div>

            <h2 className="text-balance text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl lg:text-5xl leading-[1.15]">
              Tools I build with
            </h2>

            <p className="type-body max-w-2xl text-pretty text-text-secondary leading-relaxed sm:text-lg">
              A focused toolkit spanning on-device intelligence, generative AI,
              full-stack systems, and cloud infrastructure — organized by domain
              and applied across real products.
            </p>
          </div>
        </Reveal>

        {/* ---- 2. Architectural System Workflow Pipeline ---- */}
        <Reveal delay={0.05}>
          <div className="flex flex-col gap-3.5 rounded-xl border border-border-subtle/80 bg-surface/40 p-5 sm:p-6 shadow-subtle">
            <div className="flex items-center justify-between border-b border-border-subtle/60 pb-3 font-mono text-[0.68rem] tracking-[0.12em] uppercase text-text-muted">
              <span className="flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="size-1.5 rounded-full bg-accent"
                />
                <span>System Workflow Pipeline</span>
              </span>
              <span className="hidden sm:inline-block text-text-muted/80">
                Problem → Systems → Tools → Shipped Product
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-2 font-mono text-[0.72rem] tracking-[0.04em] text-text-muted">
              <span className="text-text-secondary font-medium">
                python · typescript · javascript · sql
              </span>
              <span aria-hidden="true" className="text-accent">
                →
              </span>
              <span className="text-text-secondary font-medium">
                generative ai · llms · rag · prompt engineering
              </span>
              <span aria-hidden="true" className="text-accent">
                →
              </span>
              <span className="text-text-secondary font-medium">
                react · next.js · leaflet
              </span>
              <span aria-hidden="true" className="text-accent">
                →
              </span>
              <span className="text-text-secondary font-medium">
                fastapi · rest apis
              </span>
              <span aria-hidden="true" className="text-accent">
                →
              </span>
              <span className="text-text-secondary font-medium">
                postgres · supabase · redis · docker · vercel
              </span>
              <span aria-hidden="true" className="text-accent">
                →
              </span>
              <span className="text-accent font-semibold">product</span>
            </div>
          </div>
        </Reveal>

        {/* ---- 3. Capability Domains (Interactive Showcase) ---- */}
        <Reveal delay={0.08}>
          <SkillsShowcase groups={SKILL_GROUPS} />
        </Reveal>

        {/* ---- 4. Stack → Proof Transition Bridge ---- */}
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
                  04 / Technical Stack Explored
                </p>
              </div>

              <a
                href="#proof"
                className="group inline-flex items-center gap-2 font-mono text-xs tracking-[0.14em] uppercase text-text-muted transition-colors duration-200 hover:text-text-primary focus-visible:text-accent focus-visible:outline-none"
                aria-label="Continue downward to Proof of work section"
              >
                <span>Continue to Proof of Work</span>
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
