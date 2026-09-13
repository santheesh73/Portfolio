import { Card } from "@/components/ui/Card";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { ENGINEERING_PRINCIPLES } from "@/data/about";

/**
 * Phase 4 — Compact engineering principles group.
 * 4 principles maximum, scannable, subtle hover micro-interaction
 * via the interactive Card variant.
 */
export function EngineeringPrinciples() {
  return (
    <Stagger
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
      aria-label="Engineering principles"
    >
      {ENGINEERING_PRINCIPLES.map((principle) => (
        <StaggerItem key={principle.index}>
          <Card
            variant="interactive"
            className="group flex h-full flex-col gap-3 p-5"
            tabIndex={0}
            aria-label={`${principle.label}: ${principle.title}`}
          >
            <div className="flex items-center justify-between">
              <span
                aria-hidden="true"
                className="font-mono text-[0.72rem] tracking-[0.1em] text-text-muted"
              >
                {principle.index}
              </span>
              <span
                aria-hidden="true"
                className="size-1.5 rounded-full bg-accent/60 transition-transform duration-200 ease-out group-hover:scale-150"
              />
            </div>
            <p className="type-eyebrow text-accent">{principle.label}</p>
            <h3 className="type-h3 text-text-primary">{principle.title}</h3>
            <p className="type-body-small text-pretty text-text-secondary">
              {principle.description}
            </p>
          </Card>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
