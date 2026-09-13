import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  action?: ReactNode;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" && "items-center text-center",
        className
      )}
    >
      <p className="type-eyebrow text-accent">{eyebrow}</p>
      <h2 className="type-h2 max-w-2xl text-balance text-text-primary">
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "type-body max-w-2xl text-pretty text-text-secondary",
            align === "center" && "mx-auto"
          )}
        >
          {description}
        </p>
      ) : null}
      {action ? <div className="mt-1">{action}</div> : null}
    </div>
  );
}
