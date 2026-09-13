import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  narrow?: boolean;
}

export function Container({
  children,
  className,
  narrow = false,
  ...rest
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-5 sm:px-8",
        narrow ? "max-w-3xl" : "max-w-6xl",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
