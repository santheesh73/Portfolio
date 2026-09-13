import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { CopyEmailButton } from "@/components/contact/CopyEmailButton";
import { profile } from "@/data/profile";

/**
 * Phase 7 — Contact & conversion experience.
 * Server component (the clipboard interaction is an isolated client
 * island). Closing chapter: one dominant mailto CTA, a visible email
 * address with copy feedback, and the single verified social profile.
 * No contact form, no invented links — LinkedIn is absent from the
 * verified profile data and is therefore omitted.
 */
export function ContactSection() {
  const { email, github } = profile;

  return (
    <section
      id="contact"
      aria-label="Contact Santheesh S"
      className="scroll-mt-20 border-t border-border-subtle"
    >
      <Container className="flex flex-col items-center gap-10 py-14 text-center sm:gap-12 sm:py-20">
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="07 — Connect"
            title="Let's build something meaningful."
            description="Have an idea, opportunity, or project worth discussing? Let's connect."
          />
        </Reveal>

        <Reveal delay={0.08} className="w-full max-w-2xl">
          <Card className="relative flex flex-col items-center gap-6 overflow-hidden px-6 py-10 sm:px-10 sm:py-12">
            {/* Distinctive closing treatment: soft accent depth + fine grid */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
            >
              <div className="absolute inset-0 bg-[radial-gradient(28rem_16rem_at_50%_0%,rgba(15,118,110,0.1),transparent_70%)]" />
              <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border-subtle)_1px,transparent_1px),linear-gradient(to_bottom,var(--border-subtle)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(26rem_18rem_at_50%_20%,black,transparent_75%)] opacity-60" />
            </div>

            <p className="relative flex items-center gap-2 font-mono text-[0.7rem] tracking-[0.1em] text-text-muted">
              <span
                aria-hidden="true"
                className="inline-block size-1.5 rounded-full bg-accent"
              />
              SANTHEESH S — DIRECT
            </p>

            <div className="relative flex flex-col items-center gap-3">
              <a
                href={`mailto:${email}`}
                aria-label={`Send an email to ${email}`}
                className="max-w-full break-all text-xl font-semibold tracking-[-0.02em] text-text-primary transition-colors hover:text-accent sm:text-2xl"
              >
                {email}
              </a>
              <CopyEmailButton email={email} />
            </div>

            <div className="relative flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
              <Button
                href={`mailto:${email}`}
                size="lg"
                className="group w-full sm:w-auto"
                icon={
                  <ArrowRight
                    aria-hidden="true"
                    className="size-4 transition-transform duration-150 ease-out group-hover:translate-x-0.5"
                  />
                }
              >
                {"Let's Talk"}
              </Button>
              <Button
                variant="secondary"
                size="lg"
                href={github}
                target="_blank"
                rel="noreferrer"
                aria-label="Open GitHub profile in a new tab"
                className="group w-full sm:w-auto"
                icon={
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-4 transition-transform duration-150 ease-out group-hover:translate-x-px group-hover:-translate-y-px"
                  />
                }
              >
                GitHub
              </Button>
            </div>

            <p className="relative font-mono text-[0.68rem] tracking-[0.06em] text-text-muted">
              EMAIL FIRST · GITHUB FOR THE WORK
            </p>
          </Card>
        </Reveal>
      </Container>
    </section>
  );
}
