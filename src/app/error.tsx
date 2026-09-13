"use client";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

/**
 * Minimal route error boundary in the existing design language.
 * Offers recovery (retry) and a safe route home — never a blank page.
 */
export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Container className="flex flex-1 flex-col items-center justify-center gap-4 py-24 text-center sm:py-32">
      <p className="type-eyebrow text-accent">Something went wrong</p>
      <h1 className="type-h1 text-balance text-text-primary">
        This section failed to load.
      </h1>
      <p className="type-body max-w-md text-pretty text-text-secondary">
        Please try again — or return home and continue from there.
      </p>
      <div className="mt-2 flex flex-col items-center gap-3 sm:flex-row">
        <Button onClick={reset}>Try again</Button>
        <Button variant="secondary" href="/">
          Back to Home
        </Button>
      </div>
    </Container>
  );
}
