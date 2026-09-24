import { RoomId } from "@/components/house/SpatialNavigation";
import { deriveAccentTokens, DerivedAccentTokens } from "./tokens";

export interface RoomTheme {
  id: RoomId;
  index: string;
  name: string;
  title: string;
  subtitle: string;
  tokens: DerivedAccentTokens;
  environmentTint: string;
  lightingTint: string;
  uiAccent: string;
}

export interface ProjectTheme {
  id: string;
  name: string;
  tokens: DerivedAccentTokens;
}

// 1. Centralized Room Themes
export const ROOM_THEMES: Record<RoomId, RoomTheme> = {
  exterior: {
    id: "exterior",
    index: "00",
    name: "EXTERIOR",
    title: "EXTERIOR RESIDENCE",
    subtitle: "BLUE HOUR RESIDENCE",
    tokens: deriveAccentTokens("Emerald", "#0F766E", "#14B8A6"),
    environmentTint: "#DCD7CC",
    lightingTint: "#FFFDF4",
    uiAccent: "#0F766E",
  },
  entrance: {
    id: "entrance",
    index: "—",
    name: "ENTRANCE",
    title: "THE THRESHOLD",
    subtitle: "ENTRANCE PORTICO",
    tokens: deriveAccentTokens("Emerald", "#0F766E", "#14B8A6"),
    environmentTint: "#E5E1D8",
    lightingTint: "#FFFBEB",
    uiAccent: "#0F766E",
  },
  foyer: {
    id: "foyer",
    index: "01",
    name: "FOYER",
    title: "FOYER",
    subtitle: "THE DIGITAL RESIDENCE",
    tokens: deriveAccentTokens("Amber", "#D97706", "#F59E0B"),
    environmentTint: "#E8DFD3",
    lightingTint: "#FFFBEB",
    uiAccent: "#D97706",
  },
  corridor: {
    id: "corridor",
    index: "—",
    name: "CORRIDOR",
    title: "THE SPATIAL GALLERY",
    subtitle: "GALLERY SPINE",
    tokens: deriveAccentTokens("Teal", "#0F766E", "#14B8A6"),
    environmentTint: "#E5E0D6",
    lightingTint: "#FFFDF5",
    uiAccent: "#0F766E",
  },
  projects: {
    id: "projects",
    index: "02",
    name: "WORK",
    title: "PROJECT STUDIO",
    subtitle: "FEATURED WORK & SYSTEMS",
    tokens: deriveAccentTokens("Blue", "#1D4ED8", "#3B82F6"),
    environmentTint: "#E6E2D8",
    lightingTint: "#FFFFFF",
    uiAccent: "#1D4ED8",
  },
  lab: {
    id: "lab",
    index: "03",
    name: "LAB",
    title: "ENGINEERING LAB",
    subtitle: "TECHNICAL CAPABILITIES",
    tokens: deriveAccentTokens("Teal", "#0D9488", "#2DD4BF"),
    environmentTint: "#E4E6EB",
    lightingTint: "#F0FDFA",
    uiAccent: "#0D9488",
  },
  archive: {
    id: "archive",
    index: "04",
    name: "ARCHIVE",
    title: "ARCHIVE",
    subtitle: "PROOF & MILESTONES",
    tokens: deriveAccentTokens("Amber", "#B45309", "#F59E0B"),
    environmentTint: "#DFD6C8",
    lightingTint: "#FEF3C7",
    uiAccent: "#B45309",
  },
  study: {
    id: "study",
    index: "05",
    name: "STUDY",
    title: "PRIVATE STUDY",
    subtitle: "HOW I THINK & OPERATE",
    tokens: deriveAccentTokens("Violet", "#6D28D9", "#8B5CF6"),
    environmentTint: "#E2D9CD",
    lightingTint: "#FFEDD5",
    uiAccent: "#6D28D9",
  },
  contact: {
    id: "contact",
    index: "06",
    name: "CONTACT",
    title: "CONTACT",
    subtitle: "COMMUNICATION & EXIT",
    tokens: deriveAccentTokens("Emerald", "#0F766E", "#14B8A6"),
    environmentTint: "#ECE8E0",
    lightingTint: "#F8FAFC",
    uiAccent: "#0F766E",
  },
  exit: {
    id: "exit",
    index: "07",
    name: "EXIT",
    title: "OBSERVATION TERRACE",
    subtitle: "THE HOUSE BEHIND YOU",
    tokens: deriveAccentTokens("Emerald", "#0F766E", "#14B8A6"),
    environmentTint: "#E5E1D8",
    lightingTint: "#E0F2FE",
    uiAccent: "#0F766E",
  },
};

// 2. Centralized Project Themes
export const PROJECT_THEMES: Record<string, ProjectTheme> = {
  orion: {
    id: "orion",
    name: "Teal",
    tokens: deriveAccentTokens("Teal", "#0D9488", "#2DD4BF"),
  },
  hearttune: {
    id: "hearttune",
    name: "Violet",
    tokens: deriveAccentTokens("Violet", "#7C3AED", "#A855F7"),
  },
  nisf: {
    id: "nisf",
    name: "Blue",
    tokens: deriveAccentTokens("Blue", "#1D4ED8", "#38BDF8"),
  },
  ahal: {
    id: "ahal",
    name: "Emerald",
    tokens: deriveAccentTokens("Emerald", "#059669", "#34D399"),
  },
  prysm: {
    id: "prysm",
    name: "Amber",
    tokens: deriveAccentTokens("Amber", "#D97706", "#FBBF24"),
  },
  bhoomi: {
    id: "bhoomi",
    name: "Green",
    tokens: deriveAccentTokens("Green", "#15803D", "#4ADE80"),
  },
  minchal: {
    id: "minchal",
    name: "Orange",
    tokens: deriveAccentTokens("Orange", "#EA580C", "#FB923C"),
  },
};

export function getProjectTheme(projectId: string): ProjectTheme {
  const normalized = projectId.toLowerCase().replace(/[^a-z0-9]/g, "");
  for (const [key, theme] of Object.entries(PROJECT_THEMES)) {
    if (normalized.includes(key)) {
      return theme;
    }
  }
  return PROJECT_THEMES.nisf;
}

export function getRoomTheme(roomId: string): RoomTheme {
  return ROOM_THEMES[roomId as RoomId] || ROOM_THEMES.exterior;
}
