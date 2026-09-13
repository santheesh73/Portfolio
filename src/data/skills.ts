import type { SkillGroupData } from "@/types";

/**
 * Phase 5 — Technical Stack structured data.
 * Only verified technologies from the profile, hero, and project
 * context. Project associations use the project names from
 * `src/data/projects.ts` and follow the owner-verified
 * project–technology mapping. No proficiency percentages.
 */
export const SKILL_GROUPS: SkillGroupData[] = [
  {
    id: "ai",
    index: "01",
    title: "AI & Generative AI",
    tagline: "Intelligence layer — from models to product behavior.",
    items: [
      {
        id: "generative-ai",
        name: "Generative AI",
        description: "LLM-powered features designed into real product flows.",
        icon: "sparkles",
        featured: true,
        projects: ["NISF"],
      },
      {
        id: "llms",
        name: "LLMs",
        description: "Working with large language models for text and analysis.",
        icon: "brain",
        projects: ["NISF", "AHAL AI"],
      },
      {
        id: "rag",
        name: "RAG",
        description: "Grounding model output in retrieved, relevant context.",
        icon: "book-open",
      },
      {
        id: "prompt-engineering",
        name: "Prompt Engineering",
        description: "Shaping reliable behavior through careful instruction.",
        icon: "terminal",
      },
      {
        id: "ai-chatbots",
        name: "AI Chatbots",
        description: "Conversational interfaces with memory and tool use.",
        icon: "message-square",
      },
      {
        id: "nlp",
        name: "NLP",
        description: "Understanding and structuring human language input.",
        icon: "languages",
      },
      {
        id: "on-device-ai",
        name: "On-Device AI",
        description: "Local inference that stays offline and private.",
        icon: "cpu",
        projects: ["ORION"],
      },
      {
        id: "gemma",
        name: "Gemma",
        description: "Open-model analysis over repos and documents.",
        icon: "bot",
        projects: ["AHAL AI"],
      },
    ],
  },
  {
    id: "frontend",
    index: "02",
    title: "Frontend",
    tagline: "Interfaces — calm surfaces over complex systems.",
    items: [
      {
        id: "react",
        name: "React",
        description: "Component-driven interfaces with clear state flow.",
        icon: "atom",
        projects: ["HeartTune", "BHOOMI"],
      },
      {
        id: "nextjs",
        name: "Next.js",
        description: "Full product surface — routing, rendering, delivery.",
        icon: "globe",
        projects: ["HeartTune", "NISF"],
        featured: true,
      },
      {
        id: "typescript",
        name: "TypeScript",
        description: "Type-safe code that stays readable as it grows.",
        icon: "file-code",
        projects: ["HeartTune"],
      },
      {
        id: "javascript",
        name: "JavaScript",
        description: "The interactive foundation of the modern web.",
        icon: "braces",
      },
      {
        id: "leaflet",
        name: "Leaflet",
        description: "Map rendering for geospatial product views.",
        icon: "map",
        projects: ["BHOOMI"],
      },
    ],
  },
  {
    id: "backend",
    index: "03",
    title: "Backend & APIs",
    tagline: "Logic layer — inference, services, and contracts.",
    items: [
      {
        id: "python",
        name: "Python",
        description: "AI, automation, backend, and data-driven applications.",
        icon: "code",
        featured: true,
        projects: ["MINCHAL"],
      },
      {
        id: "fastapi",
        name: "FastAPI",
        description: "Typed inference backends with background jobs.",
        icon: "zap",
        projects: ["NISF"],
      },
      {
        id: "rest-apis",
        name: "REST APIs",
        description: "Clean contracts between product and platform.",
        icon: "arrow-left-right",
        projects: ["HeartTune"],
      },
    ],
  },
  {
    id: "data-infra",
    index: "04",
    title: "Data & Infrastructure",
    tagline: "Foundation — persistence, speed, and shipping.",
    items: [
      {
        id: "postgresql",
        name: "PostgreSQL",
        description: "Relational source of truth for product data.",
        icon: "database",
        projects: ["HeartTune", "NISF"],
        featured: true,
      },
      {
        id: "supabase",
        name: "Supabase",
        description: "Auth, database, and backend primitives in one place.",
        icon: "cloud",
        projects: ["HeartTune"],
      },
      {
        id: "redis",
        name: "Redis",
        description: "Caching layer that keeps reads fast and cheap.",
        icon: "gauge",
        projects: ["HeartTune", "NISF"],
      },
      {
        id: "sql",
        name: "SQL",
        description: "Precise queries over structured product data.",
        icon: "table",
      },
      {
        id: "docker",
        name: "Docker",
        description: "Containerized services that run anywhere.",
        icon: "box",
        projects: ["NISF"],
      },
      {
        id: "vercel",
        name: "Vercel",
        description: "Frictionless deployment for the web surface.",
        icon: "triangle",
        projects: ["HeartTune"],
      },
      {
        id: "github",
        name: "GitHub",
        description: "Version control and home for everything shipped.",
        icon: "github",
      },
    ],
  },
];
