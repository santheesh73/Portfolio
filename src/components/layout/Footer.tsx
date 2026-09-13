import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { profile } from "@/data/profile";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-border bg-surface-muted/40">
      <Container className="flex flex-col gap-8 py-12 sm:py-14">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-sm">
            <p className="text-sm font-semibold tracking-[0.08em] text-text-primary">
              {profile.name}
            </p>
            <ul className="mt-3 space-y-1" aria-label="Roles">
              {profile.roles.map((role) => (
                <li key={role} className="type-body-small text-text-secondary">
                  {role}
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Social">
            <p className="type-label text-text-muted">Connect</p>
            <ul className="mt-3 flex items-center gap-2">
              <li>
                <Link
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub profile"
                  className="inline-flex h-10 items-center gap-2 rounded-md border border-border bg-surface px-3.5 text-text-secondary transition-colors hover:bg-background hover:text-text-primary"
                >
                  <span className="type-button">GitHub</span>
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </Link>
              </li>
              <li
                aria-hidden="true"
                className="inline-flex size-10 items-center justify-center rounded-md border border-dashed border-border text-[0.65rem] font-medium text-text-muted"
                title="More social links coming soon"
              >
                +
              </li>
            </ul>
          </nav>
        </div>

        <div className="flex flex-col gap-2 border-t border-border-subtle pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="type-caption text-text-muted">
            © {year} {profile.name}. All rights reserved.
          </p>
          <p className="type-caption text-text-muted">
            {profile.education.degree} · {profile.education.expectedGraduation}
          </p>
        </div>
      </Container>
    </footer>
  );
}
