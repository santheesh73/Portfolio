import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "muted" | "accent" | "outline";

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-surface-muted text-text-secondary border-border",
  muted: "bg-background text-text-muted border-border-subtle",
  accent: "bg-accent/10 text-accent border-accent/20",
  outline: "bg-transparent text-text-secondary border-border",
};

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

export function Badge({ variant = "default", className, ...rest }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-pill border px-2.5 py-1 text-[0.76rem] font-medium leading-none tracking-[0.005em]",
        variantStyles[variant],
        className
      )}
      {...rest}
    />
  );
}
