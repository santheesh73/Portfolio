"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Menu, X } from "lucide-react";
import { NAV_ITEMS, SITE_NAME, SOCIAL_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const SECTION_IDS = ["projects", "about", "stack", "proof", "contact"] as const;
type SectionId = (typeof SECTION_IDS)[number];

export function Navbar() {
  const reduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId | null>(null);
  const [open, setOpen] = useState(false);

  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const scrolledRef = useRef(false);
  const hiddenRef = useRef(false);
  const menuTriggerRef = useRef<HTMLButtonElement>(null);
  const prevOpen = useRef(false);

  // Scroll direction & elevation handler with RAF throttle
  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY;
          const delta = currentY - lastScrollY.current;

          // Check if within the opening 3D house scene
          const inOpeningScene = currentY < 420;
          const isAtTop = currentY <= 24;
          const shouldBeScrolled = !isAtTop;

          if (shouldBeScrolled !== scrolledRef.current) {
            scrolledRef.current = shouldBeScrolled;
            setScrolled(shouldBeScrolled);
          }

          // Determine hidden state: stay hidden during the opening 3D house scene
          // Reveal once user scrolls into the portfolio narrative and projects
          let shouldBeHidden = false;
          if (inOpeningScene) {
            shouldBeHidden = true;
          } else if (delta > 8 && currentY > 550) {
            shouldBeHidden = true;
          } else if (delta < -8) {
            shouldBeHidden = false;
          } else {
            shouldBeHidden = hiddenRef.current;
          }

          if (shouldBeHidden !== hiddenRef.current) {
            hiddenRef.current = shouldBeHidden;
            setHidden(shouldBeHidden);
          }

          // Clear active section if at top (hero)
          if (currentY < 180) {
            setActiveSection(null);
          } else {
            // Check bottom boundary for contact section
            const isAtBottom =
              window.innerHeight + currentY >=
              document.documentElement.scrollHeight - 60;
            if (isAtBottom) {
              setActiveSection("contact");
            }
          }

          lastScrollY.current = currentY;
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Section visibility tracking via IntersectionObserver
  useEffect(() => {
    if (typeof window === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Only evaluate if not at top hero
        if (window.scrollY < 180) {
          setActiveSection(null);
          return;
        }

        const visibleEntries = entries.filter((e) => e.isIntersecting);
        if (visibleEntries.length > 0) {
          // Select entry closest to the top margin
          const topmost = visibleEntries.reduce((prev, curr) =>
            curr.boundingClientRect.top < prev.boundingClientRect.top ? curr : prev
          );
          const id = topmost.target.id as SectionId;
          if (SECTION_IDS.includes(id)) {
            setActiveSection(id);
          }
        }
      },
      {
        rootMargin: "-15% 0px -55% 0px",
        threshold: [0, 0.1, 0.25],
      }
    );

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Body scroll lock on mobile menu open
  useEffect(() => {
    if (open) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [open]);

  // Focus management: autofocus first item in menu on open, return to trigger on close
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        const container = document.getElementById("mobile-menu");
        if (container) {
          const focusable = container.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
          );
          if (focusable.length > 0) {
            focusable[0].focus();
          }
        }
      }, 50);
      return () => clearTimeout(timer);
    } else if (prevOpen.current) {
      menuTriggerRef.current?.focus();
    }
    prevOpen.current = open;
  }, [open]);

  // Keyboard trap and escape handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!open) return;

      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        return;
      }

      if (e.key === "Tab") {
        const container = document.getElementById("mobile-menu");
        if (!container) return;

        const focusable = container.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  const closeMenu = useCallback(() => {
    setOpen(false);
  }, []);

  const primaryNavItems = NAV_ITEMS.filter((item) => item.href !== "/#contact");
  const contactItem = NAV_ITEMS.find((item) => item.href === "/#contact");

  const navClasses = cn(
    "sticky top-0 z-50 w-full transition-[transform,background-color,border-color,box-shadow,backdrop-filter]",
    "duration-300 ease-out",
    scrolled
      ? "bg-surface/85 backdrop-blur-md border-b border-border/50 shadow-xs"
      : "bg-transparent border-b border-transparent",
    hidden && !open && !reduce ? "-translate-y-full" : "translate-y-0"
  );

  return (
    <header
      className={navClasses}
      role="banner"
      style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8"
      >
        {/* Brand / Logo */}
        <Link
          href="/"
          onClick={closeMenu}
          className="type-nav font-semibold tracking-[0.1em] text-text-primary transition-opacity duration-150 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm shrink-0"
          aria-label={`${SITE_NAME} — home`}
        >
          {SITE_NAME}
        </Link>

        {/* Desktop Primary Nav (Center) */}
        <ul className="hidden md:flex items-center gap-1 lg:gap-2" role="menubar">
          {primaryNavItems.map((item) => {
            const sectionId = item.href.replace("/#", "") as SectionId;
            const isActive = activeSection === sectionId;
            return (
              <li key={item.href} role="none">
                <Link
                  href={item.href}
                  role="menuitem"
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "group type-nav relative px-3 py-2 rounded-md transition-colors duration-150",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                    isActive ? "text-text-primary" : "text-text-secondary hover:text-text-primary"
                  )}
                >
                  <span className="relative z-10">{item.label}</span>
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute bottom-0.5 left-2.5 right-2.5 h-px transition-[transform,opacity] duration-200 ease-out",
                      isActive
                        ? "bg-accent opacity-100 scale-x-100"
                        : "bg-text-secondary/40 opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100"
                    )}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Desktop Actions (Right: Contact + GitHub) */}
        <div className="hidden md:flex items-center gap-3">
          {contactItem && (
            <Link
              href={contactItem.href}
              className={cn(
                "group type-nav relative px-3 py-2 rounded-md transition-colors duration-150",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                activeSection === "contact"
                  ? "text-text-primary"
                  : "text-text-secondary hover:text-text-primary"
              )}
            >
              <span className="relative z-10">{contactItem.label}</span>
              <span
                aria-hidden="true"
                className={cn(
                  "absolute bottom-0.5 left-2.5 right-2.5 h-px transition-[transform,opacity] duration-200 ease-out",
                  activeSection === "contact"
                    ? "bg-accent opacity-100 scale-x-100"
                    : "bg-text-secondary/40 opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100"
                )}
              />
            </Link>
          )}

          <Link
            href={SOCIAL_LINKS.github}
            target="_blank"
            rel="noreferrer"
            className="type-button inline-flex h-8 items-center gap-1.5 rounded-md border border-border bg-surface/60 px-3 text-xs text-text-primary transition-[background-color,border-color,color] duration-150 hover:bg-surface-muted hover:border-text-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            aria-label="Open GitHub profile in a new tab"
          >
            GitHub
          </Link>
        </div>

        {/* Mobile Menu Trigger */}
        <button
          ref={menuTriggerRef}
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md text-text-primary transition-colors hover:bg-surface-muted md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          {open ? (
            <X className="size-5" aria-hidden="true" />
          ) : (
            <Menu className="size-5" aria-hidden="true" />
          )}
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        </button>
      </nav>

      {/* Mobile Cinematic Menu Overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: reduce ? 0.01 : 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[60] bg-background/98 backdrop-blur-xl flex flex-col"
            style={{
              paddingTop: "env(safe-area-inset-top, 0px)",
              paddingBottom: "env(safe-area-inset-bottom, 0px)",
            }}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            {/* Overlay Header */}
            <div className="flex h-16 shrink-0 items-center justify-between px-5 sm:px-8 border-b border-border-subtle">
              <Link
                href="/"
                onClick={closeMenu}
                className="type-nav font-semibold tracking-[0.1em] text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
                aria-label={`${SITE_NAME} — home`}
              >
                {SITE_NAME}
              </Link>
              <button
                type="button"
                onClick={closeMenu}
                aria-label="Close menu"
                className="inline-flex h-10 w-10 items-center justify-center rounded-md text-text-primary transition-colors hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>

            {/* Navigation Destinations */}
            <div className="flex-1 overflow-y-auto px-5 py-8 flex flex-col justify-between items-center">
              <ul className="w-full max-w-sm flex flex-col items-center gap-5 my-auto">
                {NAV_ITEMS.map((item, i) => {
                  const sectionId = item.href.replace("/#", "") as SectionId;
                  const isActive = activeSection === sectionId;
                  return (
                    <motion.li
                      key={item.href}
                      initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reduce ? { opacity: 0, y: 0 } : { opacity: 0, y: -6 }}
                      transition={
                        reduce
                          ? { duration: 0.01 }
                          : { delay: 0.05 * i, duration: 0.3, ease: [0.22, 1, 0.36, 1] }
                      }
                      className="w-full text-center"
                    >
                      <Link
                        href={item.href}
                        onClick={closeMenu}
                        className={cn(
                          "type-h2 block py-2.5 tracking-[0.05em] uppercase transition-colors duration-150",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm",
                          isActive
                            ? "text-text-primary font-semibold"
                            : "text-text-secondary hover:text-text-primary"
                        )}
                        aria-current={isActive ? "page" : undefined}
                      >
                        {item.label}
                        {isActive && (
                          <span
                            aria-hidden="true"
                            className="block mx-auto mt-1.5 h-0.5 w-8 bg-accent rounded-full"
                          />
                        )}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>

              {/* Mobile Menu Footer Action */}
              <motion.div
                initial={reduce ? { opacity: 1 } : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={reduce ? { duration: 0.01 } : { delay: 0.2, duration: 0.3 }}
                className="w-full max-w-sm pt-6 border-t border-border-subtle flex justify-center shrink-0"
              >
                <Link
                  href={SOCIAL_LINKS.github}
                  target="_blank"
                  rel="noreferrer"
                  onClick={closeMenu}
                  className="type-button inline-flex items-center justify-center gap-2 w-full rounded-md border border-border bg-surface px-4 py-3 text-text-primary transition-[background-color,border-color,color] duration-150 hover:bg-surface-muted hover:border-text-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  aria-label="Open GitHub profile in a new tab"
                >
                  GitHub
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}