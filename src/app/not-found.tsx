import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export const metadata = {
  title: "Page not found",
};

/**
 * Minimal 404 in the existing premium light language.
 * Concise copy, single route home.
 */
export default function NotFound() {
  return (
    <Container className="flex flex-1 flex-col items-center justify-center gap-4 py-24 text-center sm:py-32">
      <p className="type-eyebrow text-accent">404</p>
      <h1 className="type-h1 text-balance text-text-primary">
        This page doesn&apos;t exist.
      </h1>
      <p className="type-body max-w-md text-pretty text-text-secondary">
        The page you&apos;re looking for was moved or never existed.
      </p>
      <Button href="/" className="mt-2">
        Back to Home
      </Button>
    </Container>
  );
}
