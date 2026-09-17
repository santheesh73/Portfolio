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
 * Phase 9 — Individual technology tile.
 * Editorial presentation: verified details, clear name and description,
 * verified project usage references, and restrained tactile micro-motion.
 */
export function SkillCard({ skill }: { skill: SkillItem }) {
  const Icon = ICONS[skill.icon];

  return (
    <div
      tabIndex={0}
      role="article"
      aria-label={`${skill.name}: ${skill.description}`}
      className={cn(
        "group relative flex h-full flex-col justify-between gap-3 rounded-lg border p-4 sm:p-4.5 outline-none",
        "transition-[border-color,background-color,transform,box-shadow] duration-200 ease-out",
        "hover:-translate-y-0.5 hover:border-text-muted/40 hover:bg-surface-muted/30 hover:shadow-card",
        "focus-visible:ring-1 focus-visible:ring-accent focus-visible:bg-surface-muted/30",
        skill.featured
          ? "border-accent/30 bg-surface-muted/15"
          : "border-border-subtle/80 bg-surface/40"
      )}
    >
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between gap-2">
          <span
            aria-hidden="true"
            className={cn(
              "flex size-8 items-center justify-center rounded-md border transition-transform duration-200 ease-out group-hover:-translate-y-0.5",
              skill.featured
                ? "border-accent/30 bg-accent/10 text-accent"
                : "border-border-subtle bg-surface-muted/80 text-text-secondary"
            )}
          >
            <Icon className="size-4" />
          </span>

          {skill.featured ? (
            <span className="font-mono text-[0.62rem] tracking-[0.14em] uppercase px-2 py-0.5 rounded border border-accent/25 bg-accent/5 text-accent">
              Core
            </span>
          ) : null}
        </div>

        <div className="flex flex-col gap-1">
          <h4 className="type-body font-semibold tracking-tight text-text-primary group-hover:text-accent transition-colors duration-200">
            {skill.name}
          </h4>
          <p className="type-caption text-pretty text-text-secondary leading-relaxed">
            {skill.description}
          </p>
        </div>
      </div>

      {skill.projects && skill.projects.length > 0 ? (
        <div className="mt-auto pt-2 border-t border-border-subtle/50 flex items-center gap-1.5 font-mono text-[0.66rem] tracking-[0.04em] text-text-muted">
          <span aria-hidden="true" className="text-accent">
            →
          </span>
          <span className="sr-only">Used in: </span>
          <span className="truncate">{skill.projects.join(" · ")}</span>
        </div>
      ) : null}
    </div>
  );
}
