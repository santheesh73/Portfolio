"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { X, GraduationCap, Compass } from "lucide-react";
import { profile } from "@/data/profile";

interface StudyDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PRINCIPLES = [
  {
    step: "01",
    label: "BUILD",
    summary: "Ideas into usable products",
    desc: "Software shouldn't just be intelligent — it should be calm, precise, and genuinely useful. I start from real-world friction and deliver functional products.",
  },
  {
    step: "02",
    label: "THINK",
    summary: "Problem before implementation",
    desc: "Understanding the system first, ensuring contracts and state flow are resilient, and architecting the platform for long-term durability.",
  },
  {
    step: "03",
    label: "EXPLORE",
    summary: "AI and emerging technology",
    desc: "Active experimentation with generative AI, on-device local inference, agent architectures, and intelligent product surfaces.",
  },
  {
    step: "04",
    label: "REFINE",
    summary: "UX, performance, clarity",
    desc: "Polishing typography, micro-interactions, and response latencies until the technology gets out of the user's way.",
  },
];

export function StudyDetailModal({
  isOpen,
  onClose,
}: StudyDetailModalProps) {
  const reduce = useReducedMotion();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Focus trap & Escape key handler
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    closeButtonRef.current?.focus();

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8"
          role="dialog"
          aria-modal="true"
          aria-labelledby="study-modal-title"
        >
          {/* Backdrop (Soft architectural depth, keeping 3D study visible) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0.01 : 0.3 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/15 backdrop-blur-[2px]"
            aria-hidden="true"
          />

          {/* Modal Card (Frosted architectural specification sheet) */}
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.98 }}
            transition={{
              duration: reduce ? 0.01 : 0.35,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative w-full max-w-xl max-h-[85vh] flex flex-col overflow-hidden rounded-xl border border-black/[0.08] bg-white/92 backdrop-blur-xl p-6 sm:p-8 shadow-2xl text-text-primary"
          >
            {/* Atmospheric top hairline */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-60" />

            {/* Header: Room Name & Close */}
            <div className="flex items-center justify-between border-b border-border-subtle/50 pb-4">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs uppercase tracking-[0.14em] text-accent flex items-center gap-1.5">
                  <Compass className="size-3.5 text-accent" aria-hidden="true" />
                  05 · PRIVATE STUDY
                </span>
                <span className="rounded-full border border-border-subtle bg-surface-muted/60 px-2 py-0.5 text-[0.65rem] font-mono tracking-wider text-text-secondary uppercase">
                  PHILOSOPHY
                </span>
              </div>

              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                className="inline-flex size-8 items-center justify-center rounded-md text-text-secondary transition-colors hover:bg-surface-muted hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                aria-label="Close study details"
              >
                <X className="size-4" aria-hidden="true" />
              </button>
            </div>

            {/* Identity & Core Philosophy */}
            <div className="mt-5">
              <h3
                id="study-modal-title"
                className="type-h2 font-semibold tracking-tight text-text-primary"
              >
                {profile.name}
              </h3>
              <p className="mt-1 font-mono text-xs text-text-secondary">
                {profile.roles.join(" · ")}
              </p>
              <p className="mt-3 text-xs sm:text-sm text-text-secondary leading-relaxed">
                {profile.tagline}
              </p>
            </div>

            {/* Scrollable Principles & Education */}
            <div className="mt-6 flex-1 overflow-y-auto pr-1 space-y-4">
              {/* Engineering Principles */}
              <div>
                <span className="font-mono text-[0.68rem] tracking-[0.14em] text-text-muted uppercase block mb-2.5">
                  ENGINEERING PRINCIPLES
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {PRINCIPLES.map((p) => (
                    <div
                      key={p.label}
                      className="rounded-lg border border-border-subtle bg-surface-muted/40 p-3"
                    >
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-xs text-accent font-semibold">{p.step}</span>
                        <span className="font-mono text-xs font-medium text-text-primary">{p.label}</span>
                      </div>
                      <p className="mt-1 text-[0.7rem] font-medium text-text-secondary">{p.summary}</p>
                      <p className="mt-1 text-[0.68rem] text-text-muted leading-relaxed">{p.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div className="pt-3 border-t border-border-subtle/50">
                <span className="font-mono text-[0.68rem] tracking-[0.14em] text-text-muted uppercase block mb-2">
                  EDUCATION & ACADEMICS
                </span>
                <div className="flex items-start gap-3 rounded-lg border border-border-subtle bg-surface-muted/40 p-3.5">
                  <GraduationCap className="size-4 text-accent shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <h4 className="font-mono text-xs font-semibold text-text-primary">
                      {profile.education.degree}
                    </h4>
                    <p className="text-xs text-text-secondary mt-0.5">
                      {profile.education.institution}
                    </p>
                    <span className="mt-1.5 inline-block rounded bg-accent/10 px-1.5 py-0.5 font-mono text-[0.62rem] text-accent">
                      Expected Graduation {profile.education.expectedGraduation}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer note */}
            <div className="mt-5 pt-3 border-t border-border-subtle/50 flex items-center justify-between font-mono text-[0.65rem] text-text-muted">
              <span>HOW I THINK & OPERATE</span>
              <span>FOUR GUIDING PILLARS</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
