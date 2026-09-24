"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { X, Sparkles, GitBranch, BookmarkCheck } from "lucide-react";
import { ProofItem } from "@/types";

interface ProofDetailModalProps {
  item: ProofItem | null;
  onClose: () => void;
}

export function ProofDetailModal({
  item,
  onClose,
}: ProofDetailModalProps) {
  const reduce = useReducedMotion();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Focus trap, Escape key handler, and focus restoration
  useEffect(() => {
    if (!item) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      previouslyFocused?.focus();
    };
  }, [item, onClose]);

  return (
    <AnimatePresence>
      {item && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8"
          role="dialog"
          aria-modal="true"
          aria-labelledby="proof-modal-title"
        >
          {/* Backdrop (Soft architectural depth, keeping 3D archive visible) */}
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
            className="relative w-full max-w-lg max-h-[85dvh] overflow-y-auto rounded-xl border border-black/[0.08] bg-white/92 backdrop-blur-xl p-5 sm:p-8 shadow-2xl text-text-primary scrollbar-thin"
          >
            {/* Subtle atmospheric top hairline */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-60" />

            {/* Header: Category Badge & Close */}
            <div className="flex items-center justify-between border-b border-border-subtle/50 pb-4">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs uppercase tracking-[0.14em] text-accent flex items-center gap-1.5">
                  <BookmarkCheck className="size-3.5 text-accent" aria-hidden="true" />
                  {item.category.toUpperCase()}
                </span>
                {item.year && (
                  <span className="rounded-full border border-border-subtle bg-surface-muted/60 px-2 py-0.5 text-[0.65rem] font-mono tracking-wider text-text-secondary uppercase">
                    {item.year}
                  </span>
                )}
              </div>

              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                className="inline-flex size-8 items-center justify-center rounded-md text-text-secondary transition-colors hover:bg-surface-muted hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                aria-label="Close milestone details"
              >
                <X className="size-4" aria-hidden="true" />
              </button>
            </div>

            {/* Title & Theme */}
            <div className="mt-5">
              <h3
                id="proof-modal-title"
                className="type-h2 font-semibold tracking-tight text-text-primary"
              >
                {item.title}
              </h3>
              {item.theme && (
                <p className="mt-1 font-mono text-xs text-accent">
                  Theme: {item.theme}
                </p>
              )}
            </div>

            {/* Description */}
            <p className="type-body mt-4 text-pretty text-text-secondary leading-relaxed">
              {item.description}
            </p>

            {/* Related Project or Link */}
            {(item.relatedProject || item.href) && (
              <div className="mt-6 border-t border-border-subtle/50 pt-4 flex items-center justify-between">
                {item.relatedProject && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-text-muted">Associated Project:</span>
                    <span className="rounded bg-accent/10 px-2 py-0.5 font-mono text-xs text-accent uppercase font-medium">
                      {item.relatedProject.toUpperCase()}
                    </span>
                  </div>
                )}
                {item.href && (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-md border border-border bg-surface px-3 py-1.5 font-mono text-xs text-text-primary transition-colors hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ml-auto"
                  >
                    <GitBranch className="size-3.5 text-text-muted" aria-hidden="true" />
                    <span>View Repository</span>
                  </a>
                )}
              </div>
            )}

            {/* Footer Telemetry */}
            <div className="mt-5 pt-3 border-t border-border-subtle/50 flex items-center justify-between font-mono text-[0.65rem] text-text-muted">
              <span>VERIFIED PROOF OF WORK</span>
              <span className="flex items-center gap-1">
                <Sparkles className="size-2.5 text-accent" aria-hidden="true" />
                AUTHENTIC EVIDENCE
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
