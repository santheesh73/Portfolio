import type { Project, ProjectId } from "@/types";

/**
 * Central project data — the single source of truth for the showcase.
 * Only verified information is populated. Unknown fields stay empty
 * so future phases can complete them without refactoring the UI.
 */
export const projects: Project[] = [
  {
    id: "orion",
    name: "ORION",
    tagline: "On-device assistant — offline-first and private by design.",
    description:
      "ORION is an on-device AI assistant created for OSDHack 2026. It runs AI inference locally on the user's device — offline and privacy-first — rather than relying on cloud AI APIs.",
    category: "On-Device AI",
    technologies: [
      "On-Device AI",
      "Local Inference",
      "Offline-First",
      "Privacy-First",
    ],
    featured: true,
  },
  {
    id: "hearttune",
    name: "HeartTune",
    tagline: "A premium, Spotify-like music streaming experience.",
    description:
      "HeartTune is a premium music streaming PWA with authentication and a Spotify-like listening experience. Streaming is powered by the JioSaavn API on a Supabase and PostgreSQL backend with Redis caching.",
    category: "Music / Media",
    technologies: [
      "Supabase",
      "PostgreSQL",
      "JioSaavn API",
      "Upstash Redis",
      "Sentry",
      "Vercel",
    ],
  },
  {
    id: "nisf",
    name: "NISF",
    tagline: "Generate and optimize content across every modality.",
    description:
      "NISF is an AI creative intelligence platform for generating and optimizing content across text, image, audio, and video. It pairs a Next.js product surface with a FastAPI inference backend, background job processing, and containerized deployment.",
    category: "Creative AI",
    technologies: [
      "Next.js",
      "FastAPI",
      "Groq",
      "PostgreSQL",
      "Redis",
      "Docker",
      "Hugging Face",
      "Celery",
    ],
  },
  {
    id: "ahal",
    name: "AHAL AI",
    tagline: "Repository and document analysis with software intelligence.",
    description:
      "AHAL AI is a software intelligence platform for repository and document analysis.",
    category: "Software Intelligence",
    technologies: ["Gemma", "Repository Analysis", "Document Analysis"],
  },
  {
    id: "prysm",
    name: "PRYSM",
    tagline: "",
    description: "",
    category: "",
    technologies: [],
  },
  {
    id: "bhoomi",
    name: "BHOOMI",
    tagline: "Farmer advisory ecosystem with outbreak and crop intelligence.",
    description:
      "BHOOMI is an agricultural intelligence platform and farmer advisory ecosystem. It combines an agronomist portal and official dashboard with hotspot maps, outbreak counts, region/crop visualization, and a confirmation queue.",
    category: "Agricultural Technology",
    technologies: ["React", "Leaflet", "Outbreak Tracking", "Geo Visualization"],
  },
  {
    id: "minchal",
    name: "MINCHAL",
    tagline: "Understand your electricity bill — down to the appliance.",
    description:
      "MINCHAL helps households understand electricity bill increases by analyzing appliance-level usage to identify which appliance may have caused the change.",
    category: "Energy Intelligence",
    technologies: ["Bill Analysis", "Appliance Insights"],
  },
];

export function getProject(id: ProjectId): Project {
  const project = projects.find((p) => p.id === id);
  if (!project) throw new Error(`Unknown project id: ${id}`);
  return project;
}

export function getFeaturedProject(): Project {
  const featured = projects.find((p) => p.featured);
  if (!featured) throw new Error("No featured project defined");
  return featured;
}
