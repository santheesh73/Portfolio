import {
  ArrowLeftRight,
  Atom,
  BookOpen,
  Bot,
  Box,
  Braces,
  Brain,
  Cloud,
  Code,
  Cpu,
  Database,
  FileCode,
  Gauge,
  Globe,
  GitBranch,
  Languages,
  Map,
  MessageSquare,
  Sparkles,
  Table,
  Terminal,
  Triangle,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { SkillItem } from "@/types";

const ICONS: Record<SkillItem["icon"], LucideIcon> = {
  sparkles: Sparkles,
  brain: Brain,
  "book-open": BookOpen,
  terminal: Terminal,
  "message-square": MessageSquare,
  languages: Languages,
  cpu: Cpu,
  bot: Bot,
  atom: Atom,
  globe: Globe,
  "file-code": FileCode,
  braces: Braces,
  map: Map,
  code: Code,
  zap: Zap,
  "arrow-left-right": ArrowLeftRight,
  database: Database,
  cloud: Cloud,
  gauge: Gauge,
  table: Table,
  box: Box,
  triangle: Triangle,
  github: GitBranch,
};

/**
 * Phase 5 — Individual technology tile.
 * Server component: hover depth is CSS-only so the information
 * is never hover-dependent. Project links are always visible.
 */
export function SkillCard({ skill }: { skill: SkillItem }) {
  const Icon = ICONS[skill.icon];

  return (
    <div
      className={cn(
        "group flex h-full flex-col gap-2.5 rounded-md border bg-background p-4",
        "transition-[box-shadow,transform,border-color] duration-200 ease-out",
        "hover:-translate-y-[2px] hover:border-text-muted/40 hover:shadow-card",
        "focus-within:-translate-y-[2px] focus-within:border-text-muted/40 focus-within:shadow-card",
        skill.featured ? "border-accent/30" : "border-border-subtle"
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "flex size-9 items-center justify-center rounded-lg border transition-transform duration-200 ease-out group-hover:-translate-y-0.5",
          skill.featured
            ? "border-accent/25 bg-accent/10 text-accent"
            : "border-border-subtle bg-surface-muted text-text-secondary"
        )}
      >
        <Icon className="size-[18px]" />
      </span>
      <div className="flex flex-col gap-1">
        <p className="type-body-small font-semibold tracking-[-0.005em] text-text-primary">
          {skill.name}
        </p>
        <p className="type-caption text-pretty text-text-secondary">
          {skill.description}
        </p>
      </div>
      {skill.projects && skill.projects.length > 0 ? (
        <p className="mt-auto pt-1 font-mono text-[0.68rem] tracking-[0.04em] text-text-muted">
          <span aria-hidden="true" className="text-accent">
            →
          </span>{" "}
          <span className="sr-only">Used in: </span>
          {skill.projects.join(" · ")}
        </p>
      ) : null}
    </div>
  );
}
