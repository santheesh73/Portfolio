"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowDown } from "lucide-react";
import { Container } from "@/components/ui/Container";

const NARRATIVE_PILLARS = [
  { step: "01", label: "BUILD", summary: "Usable products" },
  { step: "02", label: "THINK", summary: "Problem before code" },
  { step: "03", label: "EXPLORE", summary: "Emerging AI" },
  { step: "04", label: "REFINE", summary: "Clarity & craft" },
] as const;

/**
 * Phase 4 — Cinematic Identity Narrative.
 * Acts as a contemplative editorial bridge between the opening Hero
 * and the Projects showcase.
 */
export function IdentityNarrative() {
  const reduce = useReducedMotion();

  return (
    <section
      aria-labelledby="identity-heading"
      className="relative flex min-h-[70vh] flex-col justify-center overflow-hidden border-t border-border-subtle/40 py-20 sm:min-h-[80vh] sm:py-28"
    >
      {/* Calm Atmosphere (Low visual energy to contrast with Hero & Projects) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-full max-w-4xl bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(20,184,166,0.035),transparent_75%)]" />
        <div className="absolute inset-0 atmosphere-grid atmosphere-grid-fade opacity-15" />
      </div>

      <Container className="relative flex flex-col justify-center">
        <div className="max-w-3xl">
          {/* Eyebrow / Narrative Context */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={
              reduce
                ? { duration: 0.01 }
                : { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
            }
            className="flex items-center gap-3"
          >
            <span
              aria-hidden="true"
              className="h-px w-6 bg-accent/60"
            />
            <span className="font-mono text-xs tracking-[0.18em] uppercase text-text-muted">
              PERSPECTIVE · ENGINEERING IDENTITY
            </span>
          </motion.div>

          {/* Core Typographic Statement */}
          <h2
            id="identity-heading"
            className="mt-6 font-semibold text-text-primary text-[clamp(2rem,4.8vw,3.75rem)] leading-[1.12] tracking-tight"
          >
            <span className="block overflow-hidden pb-1">
              <motion.span
                className="block"
                initial={reduce ? false : { y: "105%", opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-15%" }}
                transition={
                  reduce
                    ? { duration: 0.01 }
                    : {
                        duration: 0.65,
                        delay: 0.1,
                        ease: [0.16, 1, 0.3, 1],
                      }
                }
              >
                I think about the <span className="text-accent font-medium">problem</span> first.
              </motion.span>
            </span>

            <span className="block overflow-hidden pb-1">
              <motion.span
                className="block"
                initial={reduce ? false : { y: "105%", opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-15%" }}
                transition={
                  reduce
                    ? { duration: 0.01 }
                    : {
                        duration: 0.65,
                        delay: 0.22,
                        ease: [0.16, 1, 0.3, 1],
                      }
                }
              >
                Then the <span className="text-text-secondary font-medium">system</span>.
              </motion.span>
            </span>

            <span className="block overflow-hidden pb-1">
              <motion.span
                className="block"
                initial={reduce ? false : { y: "105%", opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-15%" }}
                transition={
                  reduce
                    ? { duration: 0.01 }
                    : {
                        duration: 0.65,
                        delay: 0.34,
                        ease: [0.16, 1, 0.3, 1],
                      }
                }
              >
                Then the <span className="text-text-primary font-medium">experience</span>.
              </motion.span>
            </span>
          </h2>

          {/* Grounded Narrative Statement */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={
              reduce
                ? { duration: 0.01 }
                : { duration: 0.6, delay: 0.45, ease: [0.22, 1, 0.36, 1] }
            }
            className="mt-7 max-w-2xl"
          >
            <p className="type-body-large text-pretty text-text-secondary leading-relaxed">
              Software shouldn&apos;t just be intelligent — it should be calm,
              precise, and genuinely useful. I start from real-world friction,
              architect the backend for durability, and refine interfaces until
              the technology gets out of the user&apos;s way.
            </p>
          </motion.div>

          {/* Four Principles Preview Strip */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={
              reduce
                ? { duration: 0.01 }
                : { duration: 0.6, delay: 0.58, ease: [0.22, 1, 0.36, 1] }
            }
            className="mt-10 pt-8 border-t border-border-subtle/50"
          >
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
              {NARRATIVE_PILLARS.map((pillar) => (
                <div key={pillar.label} className="flex flex-col gap-1">
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-[0.68rem] text-accent/80">
                      {pillar.step}
                    </span>
                    <span className="font-mono text-xs font-medium tracking-[0.1em] text-text-primary">
                      {pillar.label}
                    </span>
                  </div>
                  <span className="text-xs text-text-muted">
                    {pillar.summary}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Transition Cue to Projects */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={
              reduce
                ? { duration: 0.01 }
                : { duration: 0.5, delay: 0.7, ease: [0.22, 1, 0.36, 1] }
            }
            className="mt-12"
          >
            <a
              href="#projects"
              className="group inline-flex items-center gap-2.5 font-mono text-xs tracking-[0.16em] uppercase text-text-muted transition-colors hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
              aria-label="Continue to selected work section"
            >
              <span>Explore selected work</span>
              <ArrowDown
                className="size-3.5 text-accent transition-transform duration-200 group-hover:translate-y-1"
                aria-hidden="true"
              />
            </a>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
