"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Menu, X } from "lucide-react";
import { NAV_ITEMS, SITE_NAME, SOCIAL_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const SECTION_IDS = ["projects", "about", "stack", "proof", "contact"] as const;
type SectionId = (typeof SECTION_IDS)[number];

function getSectionElement(id: SectionId): HTMLElement | null {
  return document.getElementById(id);
}

export function Navbar() {
  const reduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId>("projects");
  const [open, setOpen] = useState(false);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const menuTriggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY;
          const delta = currentY - lastScrollY.current;

          if (currentY <= 0) {
            setScrolled(false);
            setHidden(false);
          } else {
            setScrolled(true);
            if (delta > 5) {
              setHidden(true);
            } else if (delta < -5) {
              setHidden(false);
            }
          }
          lastScrollY.current = currentY;
          ticking.current = false;
        });
        ticking.current = true;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (reduce) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id as SectionId;
            if (SECTION_IDS.includes(id)) {
              setActiveSection(id);
            }
          }
        });
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
    );

    SECTION_IDS.forEach((id) => {
      const el = getSectionElement(id);
      if (el) observer.observe(el);
    });

    observerRef.current = observer;
    return () => observer.disconnect();
  }, [reduce]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) {
      const focusable = document.querySelectorAll<HTMLElement>(
        '#mobile-menu a, #mobile-menu button, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length > 0) {
        (focusable[0] as HTMLElement).focus();
      }
    } else {
      menuTriggerRef.current?.focus();
    }
  }, [open]);

  const navClasses = cn(
    "sticky top-0 z-[50] w-full transition-[background-color,border-color,box-shadow,backdrop-filter]",
    "duration-300 ease-out",
    scrolled
      ? "bg-background/70 backdrop-blur-md border-b border-border shadow-card"
      : "bg-transparent border-b border-transparent",
    hidden && !open
      ? "-translate-y-full"
      : "translate-y-0"
  );

  const linkClasses = cn(
    "type-nav relative px-3 py-2 rounded-md transition-colors duration-150",
    "hover:text-text-primary",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
  );

  return (
    <header className={navClasses} role="banner">
      <nav aria-label="Primary" className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="type-nav font-semibold tracking-[0.08em] text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
          aria-label={`${SITE_NAME} — home`}
        >
          {SITE_NAME}
        </Link>

        <ul className="hidden items-center gap-0.5 md:flex" role="menubar">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.href.replace("/#", "");
            return (
              <li key={item.href} role="none">
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  role="menuitem"
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    linkClasses,
                    isActive ? "text-text-primary" : "text-text-secondary"
                  )}
                >
                  {item.label}
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="absolute bottom-1 left-3 right-3 h-0.5 bg-accent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"
                    />
                  )}
                </Link>
              </li>
            );
          })}
          <li className="ml-2" role="none">
            <Link
              href={SOCIAL_LINKS.github}
              target="_blank"
              rel="noreferrer"
              role="menuitem"
              className="type-button inline-flex h-9 items-center gap-1.5 rounded-md border border-border bg-surface px-3.5 text-text-primary transition-[background-color,border-color,color] duration-150 hover:bg-surface-muted hover:border-text-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              aria-label="Open GitHub profile in a new tab"
            >
              GitHub
            </Link>
          </li>
        </ul>

        <button
          ref={menuTriggerRef}
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="inline-flex h-10 min-w-10 items-center justify-center gap-2 rounded-md px-3 text-text-primary transition-colors hover:bg-surface-muted md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          {open ? (
            <X className="size-5" aria-hidden="true" />
          ) : (
            <Menu className="size-5" aria-hidden="true" />
          )}
          <span className="type-button sr-only">{open ? "Close" : "Menu"}</span>
        </button>
      </nav>

      <AnimatePresence mode="wait">
        {open && (
          <motion.div
            id="mobile-menu"
            initial={reduce ? { opacity: 1, clipPath: "inset(0 0 0% 0)" } : { opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={reduce ? { opacity: 0, clipPath: "inset(100% 0 0 0)" } : { opacity: 0, clipPath: "inset(100% 0 0 0)" }}
            transition={reduce ? { duration: 0.01 } : { duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[60] bg-background flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <div className="flex h-16 items-center justify-between px-5 sm:px-8 border-b border-border-subtle">
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="type-nav font-semibold tracking-[0.08em] text-text-primary"
                aria-label={`${SITE_NAME} — home`}
              >
                {SITE_NAME}
              </Link>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="inline-flex h-10 min-w-10 items-center justify-center rounded-md text-text-primary transition-colors hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>

            <div className="flex-1 flex items-center justify-center px-5 py-10">
              <ul className="w-full max-w-md flex flex-col items-center gap-6">
                {NAV_ITEMS.map((item, i) => {
                  const isActive = activeSection === item.href.replace("/#", "");
                  return (
                    <motion.li
                      key={item.href}
                      initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={reduce ? { duration: 0.01 } : { delay: 0.08 * i, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "type-display text-balance w-full text-center transition-colors duration-150",
                          isActive ? "text-text-primary" : "text-text-secondary hover:text-text-primary"
                        )}
                        aria-current={isActive ? "page" : undefined}
                      >
                        {item.label}
                        {isActive && (
                          <span
                            aria-hidden="true"
                            className="inline-block w-12 h-px bg-accent mt-2"
                          />
                        )}
                      </Link>
                    </motion.li>
                  );
                })}
                <motion.li
                  initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={reduce ? { duration: 0.01 } : { delay: 0.08 * NAV_ITEMS.length, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={SOCIAL_LINKS.github}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => setOpen(false)}
                    className="type-button inline-flex items-center justify-center gap-2 w-full rounded-md border border-border bg-surface px-4 py-3 text-text-primary transition-[background-color,border-color,color] duration-150 hover:bg-surface-muted hover:border-text-muted/50"
                    aria-label="Open GitHub profile in a new tab"
                  >
                    GitHub
                  </Link>
                </motion.li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}