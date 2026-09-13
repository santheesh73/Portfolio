import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { ProofCard } from "@/components/proof/ProofCard";
import { ProofTimeline } from "@/components/proof/ProofTimeline";
import {
  PROOF_HACKATHONS,
  PROOF_MILESTONES,
  PROOF_OPEN_SOURCE,
} from "@/data/proof";
import { getProject } from "@/data/projects";

/**
 * Phase 6 — Experience, Achievements & Proof of Work.
 * Server component. Editorial composition, not a resume timeline:
 * hackathons on a minimal spine, an open-source surface, and numbered
 * project milestones. Verified information only.
 */
export function ProofSection() {
  return (
    <section
      id="proof"
      aria-label="Proof of work"
      className="scroll-mt-20 border-t border-border-subtle"
    >
      <Container className="flex flex-col gap-10 py-14 sm:gap-12 sm:py-20">
        <Reveal>
          <SectionHeading
            eyebrow="06 — Proof"
            title="Building, competing, learning."
            description="A snapshot of the work and challenges shaping my engineering journey."
          />
        </Reveal>

        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          {/* ---- Hackathons on a minimal spine ---- */}
          <Reveal delay={0.05}>
            <div className="flex flex-col gap-5">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="type-label text-text-muted">Hackathons</h3>
                <span
                  aria-hidden="true"
                  className="font-mono text-[0.72rem] tracking-[0.08em] text-text-muted"
                >
                  2026
                </span>
              </div>
              <ProofTimeline items={PROOF_HACKATHONS} />
            </div>
          </Reveal>

          <div className="flex flex-col gap-10">
            {/* ---- Open source ---- */}
            <Reveal delay={0.08}>
              <div className="flex flex-col gap-5">
                <h3 className="type-label text-text-muted">Open source</h3>
                <ProofCard item={PROOF_OPEN_SOURCE} />
              </div>
            </Reveal>

            {/* ---- Project milestones ---- */}
            <Reveal delay={0.1}>
              <div className="flex flex-col gap-5">
                <h3 className="type-label text-text-muted">
                  Project milestones
                </h3>
                <ol className="flex flex-col">
                  {PROOF_MILESTONES.map((milestone, index) => {
                    const related = milestone.relatedProject
                      ? getProject(milestone.relatedProject)
                      : null;
                    return (
                      <li
                        key={milestone.id}
                        className="flex gap-4 border-t border-border-subtle py-4 last:border-b"
                      >
                        <span
                          aria-hidden="true"
                          className="font-mono text-[0.72rem] tracking-[0.08em] text-text-muted"
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <div className="flex flex-1 flex-col gap-1">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <p className="type-body-small font-semibold tracking-[-0.005em] text-text-primary">
                              {milestone.title}
                            </p>
                            {related ? (
                              <Badge variant="muted">
                                <span className="sr-only">
                                  Related project:{" "}
                                </span>
                                {related.name}
                              </Badge>
                            ) : null}
                          </div>
                          <p className="type-body-small text-pretty text-text-secondary">
                            {milestone.description}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
