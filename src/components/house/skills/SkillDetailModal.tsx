"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { X, Sparkles, Cpu } from "lucide-react";
import { SkillGroupData } from "@/types";

interface SkillDetailModalProps {
  group: SkillGroupData | null;
  onClose: () => void;
}

export function SkillDetailModal({
  group,
  onClose,
}: SkillDetailModalProps) {
  const reduce = useReducedMotion();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Focus trap & Escape key handler
  useEffect(() => {
    if (!group) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    closeButtonRef.current?.focus();

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [group, onClose]);

  return (
    <AnimatePresence>
      {group && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8"
          role="dialog"
          aria-modal="true"
          aria-labelledby="skill-modal-title"
        >
          {/* Backdrop (Soft architectural depth, keeping 3D lab visible) */}
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
            {/* Subtle atmospheric hairline */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-60" />

            {/* Header: Node Index & Group Category */}
            <div className="flex items-center justify-between border-b border-border-subtle/50 pb-4">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs uppercase tracking-[0.14em] text-accent flex items-center gap-1.5">
                  <Cpu className="size-3.5 text-accent" aria-hidden="true" />
                  SYSTEM NODE {group.index}
                </span>
                <span className="rounded-full border border-border-subtle bg-surface-muted/60 px-2 py-0.5 text-[0.65rem] font-mono tracking-wider text-text-secondary uppercase">
                  {group.id.toUpperCase()}
                </span>
              </div>

              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                className="inline-flex size-8 items-center justify-center rounded-md text-text-secondary transition-colors hover:bg-surface-muted hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                aria-label="Close skill node details"
              >
                <X className="size-4" aria-hidden="true" />
              </button>
            </div>

            {/* Group Title & Tagline */}
            <div className="mt-5">
              <h3
                id="skill-modal-title"
                className="type-h2 font-semibold tracking-tight text-text-primary"
              >
                {group.title}
              </h3>
              {group.tagline && (
                <p className="mt-1 font-mono text-xs text-text-secondary">
                  {group.tagline}
                </p>
              )}
            </div>

            {/* Scrollable Skills Grid */}
            <div className="mt-6 flex-1 overflow-y-auto pr-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" role="list">
                {group.items.map((skill) => (
                  <div
                    key={skill.id}
                    className="flex flex-col justify-between rounded-lg border border-border-subtle bg-surface-muted/40 p-3.5 transition-colors hover:border-accent/40"
                    role="listitem"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-1.5">
                        <span className="font-mono text-xs font-medium text-text-primary">
                          {skill.name}
                        </span>
                        {skill.featured && (
                          <span className="inline-flex items-center gap-1 text-[0.6rem] font-mono tracking-wider text-accent uppercase">
                            <Sparkles className="size-2.5" aria-hidden="true" />
                            KEY
                          </span>
                        )}
                      </div>
                      <p className="mt-1.5 text-xs text-text-secondary leading-relaxed">
                        {skill.description}
                      </p>
                    </div>

                    {/* Associated Projects if any */}
                    {skill.projects && skill.projects.length > 0 && (
                      <div className="mt-3 pt-2 border-t border-border-subtle/30 flex items-center gap-1 flex-wrap">
                        <span className="text-[0.62rem] font-mono text-text-muted">Used in:</span>
                        {skill.projects.map((proj) => (
                          <span
                            key={proj}
                            className="rounded bg-accent/10 px-1.5 py-0.5 font-mono text-[0.62rem] text-accent font-medium"
                          >
                            {proj}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Footer telemetry note */}
            <div className="mt-5 pt-3 border-t border-border-subtle/50 flex items-center justify-between font-mono text-[0.65rem] text-text-muted">
              <span>ACTIVE CAPABILITY TELEMETRY</span>
              <span>TOTAL ITEMS: {group.items.length}</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
