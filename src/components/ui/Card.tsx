import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type CardVariant = "default" | "interactive" | "elevated";

const variantStyles: Record<CardVariant, string> = {
  default: "bg-surface border-border shadow-subtle",
  interactive:
    "bg-surface border-border shadow-subtle hover:shadow-card hover:-translate-y-[2px] hover:border-text-muted/40 focus-visible:shadow-card cursor-pointer",
  elevated: "bg-surface-elevated border-border-subtle shadow-card",
};

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
}

export function Card({ variant = "default", className, ...rest }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border transition-[box-shadow,transform,border-color] duration-200 ease-out",
        variantStyles[variant],
        className
      )}
      {...rest}
    />
  );
}
