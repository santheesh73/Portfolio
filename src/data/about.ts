import type { EngineeringPrinciple } from "@/types";

/**
 * Phase 4 — About / Engineering Identity structured content.
 * Verified profile information only: no employment, clients,
 * awards, or experience are fabricated here.
 */
export const ENGINEERING_PRINCIPLES: EngineeringPrinciple[] = [
  {
    index: "01",
    label: "Build",
    title: "Ideas into usable products",
    description:
      "Start from a real problem and ship something people can actually use.",
  },
  {
    index: "02",
    label: "Think",
    title: "Problem before implementation",
    description:
      "Understand the system first, then choose the simplest correct solution.",
  },
  {
    index: "03",
    label: "Explore",
    title: "AI and emerging technology",
    description:
      "Prototype with generative AI and modern tooling to learn what works.",
  },
  {
    index: "04",
    label: "Refine",
    title: "UX, performance, clarity",
    description:
      "Iterate on interface, speed, and maintainability until it feels calm.",
  },
];

export const TECHNICAL_FOCUS: string[] = [
  "Artificial Intelligence",
  "Generative AI",
  "Full-Stack Development",
  "Modern Web Applications",
];
