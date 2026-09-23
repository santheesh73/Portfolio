export interface ColorTokenGroup {
  name: string;
  accent: string;          // Main brand accent (WCAG AA on light)
  accentHover: string;     // Active/hover state
  accentSoft: string;      // 10-14% opacity tint for card/pill backgrounds
  accentMuted: string;     // 22% tint for borders
  accentContrast: string;  // High-contrast text on accent button (#ffffff)
  glow3D: string;          // Hex for Three.js lights, LEDs, emissive strips
}

export const ACCENT_PALETTES: Record<string, ColorTokenGroup> = {
  emerald: {
    name: "Emerald",
    accent: "#0F766E",
    accentHover: "#14B8A6",
    accentSoft: "rgba(15, 118, 110, 0.10)",
    accentMuted: "rgba(15, 118, 110, 0.22)",
    accentContrast: "#FFFFFF",
    glow3D: "#14B8A6",
  },
  amber: {
    name: "Amber",
    accent: "#B45309",
    accentHover: "#D97706",
    accentSoft: "rgba(180, 83, 9, 0.10)",
    accentMuted: "rgba(180, 83, 9, 0.22)",
    accentContrast: "#FFFFFF",
    glow3D: "#F59E0B",
  },
  blue: {
    name: "Blue",
    accent: "#1D4ED8",
    accentHover: "#2563EB",
    accentSoft: "rgba(29, 78, 216, 0.10)",
    accentMuted: "rgba(29, 78, 216, 0.22)",
    accentContrast: "#FFFFFF",
    glow3D: "#3B82F6",
  },
  teal: {
    name: "Teal",
    accent: "#0D9488",
    accentHover: "#14B8A6",
    accentSoft: "rgba(13, 148, 136, 0.10)",
    accentMuted: "rgba(13, 148, 136, 0.22)",
    accentContrast: "#FFFFFF",
    glow3D: "#2DD4BF",
  },
  rose: {
    name: "Rose",
    accent: "#BE123C",
    accentHover: "#E11D48",
    accentSoft: "rgba(190, 18, 60, 0.10)",
    accentMuted: "rgba(190, 18, 60, 0.22)",
    accentContrast: "#FFFFFF",
    glow3D: "#F43F5E",
  },
  violet: {
    name: "Violet",
    accent: "#6D28D9",
    accentHover: "#7C3AED",
    accentSoft: "rgba(109, 40, 217, 0.10)",
    accentMuted: "rgba(109, 40, 217, 0.22)",
    accentContrast: "#FFFFFF",
    glow3D: "#8B5CF6",
  },
};

export interface ProjectIdentity {
  accent: string;
  glow: string;
  name: string;
}

export const PROJECT_IDENTITIES: Record<string, ProjectIdentity> = {
  orion: { accent: "#0D9488", glow: "#2DD4BF", name: "Teal" },
  hearttune: { accent: "#7C3AED", glow: "#A855F7", name: "Violet" },
  nisf: { accent: "#1D4ED8", glow: "#38BDF8", name: "Blue" },
  ahal: { accent: "#059669", glow: "#34D399", name: "Emerald" },
  prysm: { accent: "#D97706", glow: "#FBBF24", name: "Amber" },
  bhoomi: { accent: "#15803D", glow: "#4ADE80", name: "Green" },
  minchal: { accent: "#EA580C", glow: "#FB923C", name: "Orange" },
};

export function getProjectIdentity(projectId: string): ProjectIdentity {
  const normalized = projectId.toLowerCase().replace(/[^a-z0-9]/g, "");
  for (const [key, identity] of Object.entries(PROJECT_IDENTITIES)) {
    if (normalized.includes(key)) {
      return identity;
    }
  }
  return { accent: "#1D4ED8", glow: "#3B82F6", name: "Blue" };
}

export function createProjectTokenGroup(identity: ProjectIdentity): ColorTokenGroup {
  return {
    name: identity.name,
    accent: identity.accent,
    accentHover: identity.glow,
    accentSoft: `${identity.accent}1A`,
    accentMuted: `${identity.accent}38`,
    accentContrast: "#FFFFFF",
    glow3D: identity.glow,
  };
}

export const LIGHT_THEME_BASE = {
  background: "#F5F4EF",
  surface: "rgba(255, 255, 255, 0.85)",
  surfaceElevated: "#FFFFFF",
  surfaceWarm: "#F0EDE4",
  border: "rgba(0, 0, 0, 0.09)",
  borderSubtle: "rgba(0, 0, 0, 0.05)",
  textPrimary: "#171918",
  textSecondary: "#4B524D",
  textMuted: "#717770",
  // 3D daylight parameters
  skyClearColor: "#F5F4EF",
  fogNear: 16,
  fogFar: 55,
  sunColor: "#FFFDF7",
  skyHemisphere: "#E0F2FE",
  groundHemisphere: "#F5F0E8",
};

export function getRoomAccentKey(roomId: string): string {
  switch (roomId) {
    case "exterior":
    case "entrance":
      return "emerald";
    case "foyer":
      return "amber";
    case "projects":
      return "blue";
    case "lab":
      return "teal";
    case "archive":
      return "amber";
    case "study":
      return "violet";
    case "contact":
    case "exit":
      return "emerald";
    default:
      return "emerald";
  }
}
