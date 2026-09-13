import type { ProofItem } from "@/types";
import { profile } from "@/data/profile";

/**
 * Phase 6 — Proof of work structured data.
 * Verified information only. The sole hackathon fact established by
 * `src/data/projects.ts` is OSDHack 2026 → ORION. No positions,
 * prizes, employers, internships, or awards are stated anywhere.
 * Milestones paraphrase existing project descriptions — no new claims.
 */
export const PROOF_HACKATHONS: ProofItem[] = [
  {
    id: "osdhack-2026",
    category: "hackathon",
    title: "OSDHack 2026",
    year: "2026",
    theme: "On-Device AI",
    description:
      "Built ORION — an assistant that runs AI inference locally on-device, offline and private by design.",
    relatedProject: "orion",
  },
];

export const PROOF_OPEN_SOURCE: ProofItem = {
  id: "building-in-public",
  category: "open-source",
  title: "Building in public",
  description:
    "Experiments, projects, and works-in-progress live in public repositories.",
  href: profile.github,
};

export const PROOF_MILESTONES: ProofItem[] = [
  {
    id: "milestone-on-device",
    category: "milestone",
    title: "Thinking on-device",
    description:
      "Local inference that stays offline and private — no cloud round-trip.",
    relatedProject: "orion",
  },
  {
    id: "milestone-inference-product",
    category: "milestone",
    title: "Inference-backed product",
    description:
      "A Next.js surface over a FastAPI backend with background job processing.",
    relatedProject: "nisf",
  },
  {
    id: "milestone-streaming-backend",
    category: "milestone",
    title: "Streaming-grade backend",
    description:
      "Auth, relational data, and caching behind a Spotify-like listening experience.",
    relatedProject: "hearttune",
  },
];
