import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

interface PageContainerProps {
  children: ReactNode;
  className?: string;
}

export function PageContainer({ children, className }: PageContainerProps) {
  return (
    <main className={cn("flex w-full flex-1 flex-col", className)}>
      <Container className="flex flex-1 flex-col">{children}</Container>
    </main>
  );
}
