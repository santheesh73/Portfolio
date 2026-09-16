import type { NavigationItem } from "@/types";

export const SITE_NAME = "SANTHEESH S";
export const SITE_TAGLINE = "AI Software Engineer — Full-Stack Developer";
export const SITE_URL = "https://santheesh73.github.io";
export const SITE_DESCRIPTION =
  "Santheesh S — AI Software Engineer and Full-Stack Developer building calm, precise, production-quality software with modern generative AI.";

export const NAV_ITEMS: NavigationItem[] = [
  { label: "Work", href: "/#projects" },
  { label: "About", href: "/#about" },
  { label: "Stack", href: "/#stack" },
  { label: "Proof", href: "/#proof" },
  { label: "Contact", href: "/#contact" },
];

export const SOCIAL_LINKS = {
  github: "https://github.com/santheesh73",
} as const;
