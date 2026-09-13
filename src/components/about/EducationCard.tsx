import { GraduationCap } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { profile } from "@/data/profile";

/**
 * Phase 4 — Compact premium education surface.
 * Visually integrated, not a resume timeline. No CGPA.
 */
export function EducationCard() {
  const { education } = profile;

  return (
    <Card className="relative overflow-hidden p-6 sm:p-7">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,var(--border-subtle)_1px,transparent_1px),linear-gradient(to_bottom,var(--border-subtle)_1px,transparent_1px)] bg-[size:28px_28px] [mask-image:radial-gradient(24rem_12rem_at_0%_0%,black,transparent_75%)] opacity-60"
      />
      <div className="relative flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-4">
          <span
            aria-hidden="true"
            className="flex size-11 shrink-0 items-center justify-center rounded-lg border border-border bg-surface-muted text-accent"
          >
            <GraduationCap className="size-5" />
          </span>
          <div className="flex flex-col gap-1.5">
            <p className="type-eyebrow text-text-muted">Education</p>
            <h3 className="type-h3 max-w-md text-balance text-text-primary">
              {education.institution}
            </h3>
            <p className="type-body-small text-pretty text-text-secondary">
              {education.degree}
            </p>
          </div>
        </div>
        <div className="flex shrink-0 flex-wrap items-center gap-2 sm:flex-col sm:items-end">
          <Badge variant="accent">Expected Graduation · {education.expectedGraduation}</Badge>
          <span className="font-mono text-[0.7rem] tracking-[0.06em] text-text-muted">
            B.TECH / AI &amp; DS
          </span>
        </div>
      </div>
    </Card>
  );
}
