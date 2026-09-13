import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { SkillCard } from "@/components/skills/SkillCard";
import type { SkillGroupData } from "@/types";

/**
 * Phase 5 — Capability group panel.
 * Strong group header (index + title + tagline) with a staggered
 * grid of technology tiles underneath.
 */
export function SkillGroup({ group }: { group: SkillGroupData }) {
  return (
    <Reveal>
      <Card className="flex h-full flex-col gap-5 p-6 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1.5">
            <p
              aria-hidden="true"
              className="font-mono text-[0.72rem] tracking-[0.1em] text-text-muted"
            >
              {group.index}
            </p>
            <h3 className="type-h3 text-balance text-text-primary">
              {group.title}
            </h3>
            <p className="type-body-small text-pretty text-text-secondary">
              {group.tagline}
            </p>
          </div>
          <span
            aria-hidden="true"
            className="mt-1 size-1.5 shrink-0 rounded-full bg-accent/60"
          />
        </div>
        <Stagger className="grid grid-cols-1 gap-3 min-[480px]:grid-cols-2">
          {group.items.map((skill) => (
            <StaggerItem key={skill.id} className="h-full">
              <SkillCard skill={skill} />
            </StaggerItem>
          ))}
        </Stagger>
      </Card>
    </Reveal>
  );
}
