import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { SkillGroup } from "@/components/skills/SkillGroup";
import { SKILL_GROUPS } from "@/data/skills";

/**
 * Phase 5 — Technical Stack & Engineering Capabilities.
 * Server component. An engineering capability map: four groups that
 * show how languages, AI, frontend, backend, and data fit together
 * behind the projects above. Motion via reduced-motion-aware Reveal.
 */
export function SkillsSection() {
  return (
    <section
      id="stack"
      aria-label="Technical stack"
      className="scroll-mt-20 border-t border-border-subtle"
    >
      <Container className="flex flex-col gap-10 py-14 sm:gap-12 sm:py-20">
        <Reveal>
          <SectionHeading
            eyebrow="04 — Stack"
            title="Tools I build with"
            description="A focused toolkit spanning AI, frontend, backend, and data."
          />
        </Reveal>

        {/* System map — how the layers connect */}
        <Reveal delay={0.05}>
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1 rounded-lg border border-border-subtle bg-surface-muted/60 px-4 py-3 font-mono text-[0.7rem] tracking-[0.04em] text-text-muted">
            <span className="text-text-secondary">
              python · typescript · javascript · sql
            </span>
            <span aria-hidden="true" className="text-accent">
              →
            </span>
            <span className="text-text-secondary">generative ai · llms</span>
            <span aria-hidden="true" className="text-accent">
              →
            </span>
            <span className="text-text-secondary">react · next.js</span>
            <span aria-hidden="true" className="text-accent">
              →
            </span>
            <span className="text-text-secondary">fastapi · rest</span>
            <span aria-hidden="true" className="text-accent">
              →
            </span>
            <span className="text-text-secondary">
              postgres · supabase · redis
            </span>
            <span aria-hidden="true" className="text-accent">
              →
            </span>
            <span className="text-text-secondary">docker · vercel</span>
            <span aria-hidden="true" className="text-accent">
              →
            </span>
            <span>product</span>
          </p>
        </Reveal>

        {/* Capability groups */}
        <div className="grid grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-2">
          {SKILL_GROUPS.map((group) => (
            <SkillGroup key={group.id} group={group} />
          ))}
        </div>
      </Container>
    </section>
  );
}
