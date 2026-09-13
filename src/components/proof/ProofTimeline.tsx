import { ProofCard } from "@/components/proof/ProofCard";
import type { ProofItem } from "@/types";

/**
 * Phase 6 — Minimal CSS-only timeline spine.
 * A plain ordered list: fully readable without animation, motion is
 * delegated to the Reveal wrapper in the parent section. Connectors
 * are decorative (aria-hidden); meaning never depends on color.
 */
export function ProofTimeline({ items }: { items: ProofItem[] }) {
  return (
    <ol className="relative flex flex-col gap-5 border-l border-border pl-6 sm:pl-8">
      {items.map((item) => (
        <li key={item.id} className="relative">
          <span
            aria-hidden="true"
            className="absolute -left-6 top-7 size-2 -translate-x-1/2 rounded-full bg-accent ring-4 ring-background sm:-left-8"
          />
          <ProofCard item={item} />
        </li>
      ))}
    </ol>
  );
}
