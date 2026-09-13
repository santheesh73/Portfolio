"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { NAV_ITEMS, SITE_NAME, SOCIAL_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open ]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-[background-color,border-color,box-shadow,backdrop-filter] duration-200",
        scrolled || open
          ? "border-b border-border bg-background/90 shadow-subtle backdrop-blur-md"
          : "border-b border-transparent bg-background"
      )}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8"
      >
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="type-nav rounded-sm font-semibold tracking-[0.08em] text-text-primary"
          aria-label={`${SITE_NAME} — home`}
        >
          {SITE_NAME}
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => {
            const active =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "type-nav rounded-md px-3.5 py-2 transition-colors duration-150",
                    active
                      ? "text-text-primary"
                      : "text-text-secondary hover:bg-surface-muted hover:text-text-primary"
                  )}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
          <li className="ml-2">
            <Link
              href={SOCIAL_LINKS.github}
              target="_blank"
              rel="noreferrer"
              className="type-button inline-flex h-9 items-center gap-1.5 rounded-md border border-border bg-surface px-3.5 text-text-primary transition-colors hover:bg-surface-muted"
              aria-label="Open GitHub profile in a new tab"
            >
              GitHub
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
          </li>
        </ul>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="inline-flex h-10 min-w-10 items-center justify-center gap-2 rounded-md px-3 text-text-primary transition-colors hover:bg-surface-muted md:hidden"
        >
          {open ? (
            <X className="size-5" aria-hidden="true" />
          ) : (
            <Menu className="size-5" aria-hidden="true" />
          )}
          <span className="type-button">{open ? "Close" : "Menu"}</span>
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-border-subtle bg-background md:hidden"
          >
            <ul className="space-y-1 px-5 py-4">
              {NAV_ITEMS.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i, duration: 0.2 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between rounded-lg px-3 py-3 text-[1.05rem] font-medium text-text-primary transition-colors hover:bg-surface-muted"
                  >
                    {item.label}
                    <ArrowUpRight
                      className="size-4 text-text-muted"
                      aria-hidden="true"
                    />
                  </Link>
                </motion.li>
              ))}
              <li className="pt-2">
                <Link
                  href={SOCIAL_LINKS.github}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setOpen(false)}
                  className="type-button flex items-center justify-center gap-2 rounded-md border border-border bg-surface px-4 py-3 text-text-primary"
                >
                  GitHub profile
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
