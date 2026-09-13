import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { getProject } from "@/data/projects";
import type { ProofItem } from "@/types";

const CATEGORY_LABELS: Record<ProofItem["category"], string> = {
  hackathon: "Hackathon",
  "open-source": "Open source",
  milestone: "Milestone",
};

/**
 * Phase 6 — Compact proof card.
 * Server component. Hierarchy: category → title → context →
 * related project / year. Hover is CSS-only; links are real anchors
 * with visible focus states from the global stylesheet.
 */
export function ProofCard({ item }: { item: ProofItem }) {
  const related = item.relatedProject
    ? getProject(item.relatedProject)
    : null;
  const context = [item.theme, item.organization]
    .filter((part): part is string => Boolean(part))
    .join(" · ");

  return (
    <Card className="group flex h-full flex-col gap-2.5 p-5 transition-[box-shadow,transform,border-color] duration-200 ease-out hover:-translate-y-[2px] hover:border-text-muted/40 hover:shadow-card">
      <div className="flex items-center justify-between gap-3">
        <p className="type-eyebrow text-accent">
          {CATEGORY_LABELS[item.category]}
        </p>
        {item.year ? (
          <span className="font-mono text-[0.72rem] tracking-[0.08em] text-text-muted">
            {item.year}
          </span>
        ) : null}
      </div>
      <h4 className="type-h3 text-balance text-text-primary">{item.title}</h4>
      {context ? (
        <p className="font-mono text-[0.72rem] tracking-[0.06em] text-text-muted">
          {context}
        </p>
      ) : null}
      <p className="type-body-small text-pretty text-text-secondary">
        {item.description}
      </p>
      <div className="mt-auto flex items-center justify-between gap-3 pt-2">
        {related ? (
          <Badge variant="outline">
            <span aria-hidden="true" className="text-accent">
              →
            </span>
            <span>
              <span className="sr-only">Related project: </span>
              {related.name}
            </span>
          </Badge>
        ) : (
          <span />
        )}
        {item.href ? (
          <a
            href={item.href}
            target="_blank"
            rel="noreferrer"
            aria-label="Open GitHub profile in a new tab"
            className="type-body-small inline-flex items-center gap-1 font-medium text-accent hover:text-accent-hover"
          >
            GitHub
            <ArrowUpRight
              aria-hidden="true"
              className="size-3.5 transition-transform duration-200 ease-out group-hover:translate-x-px group-hover:-translate-y-px"
            />
          </a>
        ) : null}
      </div>
    </Card>
  );
}
