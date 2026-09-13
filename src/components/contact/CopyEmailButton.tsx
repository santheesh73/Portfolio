"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";

type CopyState = "idle" | "copied" | "failed";

/**
 * Phase 7 — Copy-email micro-interaction.
 * Minimal client island: inline feedback via aria-live, temporary
 * "Copied" state, graceful fallback when the clipboard is unavailable.
 */
export function CopyEmailButton({ email }: { email: string }) {
  const [state, setState] = useState<CopyState>("idle");
  const timer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current !== null) window.clearTimeout(timer.current);
    };
  }, []);

  const flash = (next: CopyState) => {
    setState(next);
    if (timer.current !== null) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setState("idle"), 2000);
  };

  const handleCopy = async () => {
    try {
      if (!navigator.clipboard) throw new Error("clipboard unavailable");
      await navigator.clipboard.writeText(email);
      flash("copied");
    } catch {
      flash("failed");
    }
  };

  return (
    <span className="inline-flex items-center gap-2">
      <button
        type="button"
        onClick={handleCopy}
        aria-label={state === "copied" ? "Email copied" : "Copy email address"}
        className="inline-flex h-9 items-center gap-1.5 rounded-md border border-border bg-surface px-3 text-text-secondary transition-[border-color,color,background-color] duration-150 ease-out hover:border-text-muted/50 hover:text-text-primary"
      >
        {state === "copied" ? (
          <Check aria-hidden="true" className="size-4 text-accent" />
        ) : (
          <Copy aria-hidden="true" className="size-4" />
        )}
        <span className="type-button">
          {state === "copied" ? "Copied" : "Copy"}
        </span>
      </button>
      <span aria-live="polite" className="sr-only">
        {state === "copied"
          ? "Email address copied to clipboard."
          : state === "failed"
            ? "Copy failed. Please copy the address manually."
            : ""}
      </span>
      {state === "failed" ? (
        <span className="type-caption text-text-secondary">
          Copy failed — select it manually.
        </span>
      ) : null}
    </span>
  );
}
