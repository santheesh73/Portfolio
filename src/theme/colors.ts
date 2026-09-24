/**
 * DESIGN SYSTEM COLOR BRIDGE
 * Connects legacy interfaces to tokens.ts and rooms.ts
 */

import { COLOR_TOKENS, DerivedAccentTokens } from "./tokens";
import { ROOM_THEMES, PROJECT_THEMES, getProjectTheme, getRoomTheme } from "./rooms";

export type ColorTokenGroup = DerivedAccentTokens;

export const ACCENT_PALETTES: Record<string, ColorTokenGroup> = {
  emerald: ROOM_THEMES.exterior.tokens,
  amber: ROOM_THEMES.foyer.tokens,
  blue: ROOM_THEMES.projects.tokens,
  teal: ROOM_THEMES.lab.tokens,
  violet: ROOM_THEMES.study.tokens,
  rose: {
    name: "Rose",
    accent: "#BE123C",
    accentHover: "#E11D48",
    accentSoft: "rgba(190, 18, 60, 0.10)",
    accentMuted: "rgba(190, 18, 60, 0.22)",
    accentContrast: "#FFFFFF",
    glow3D: "#F43F5E",
  },
};

export interface ProjectIdentity {
  accent: string;
  glow: string;
  name: string;
}

export const PROJECT_IDENTITIES: Record<string, ProjectIdentity> = Object.fromEntries(
  Object.entries(PROJECT_THEMES).map(([k, v]) => [
    k,
    { accent: v.tokens.accent, glow: v.tokens.accentHover, name: v.name },
  ])
);

export function getProjectIdentity(projectId: string): ProjectIdentity {
  const theme = getProjectTheme(projectId);
  return {
    accent: theme.tokens.accent,
    glow: theme.tokens.accentHover,
    name: theme.name,
  };
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
  background: COLOR_TOKENS.background,
  surface: COLOR_TOKENS.surface,
  surfaceElevated: COLOR_TOKENS.surfaceElevated,
  surfaceWarm: COLOR_TOKENS.surfaceMuted,
  border: COLOR_TOKENS.border,
  borderSubtle: COLOR_TOKENS.borderSubtle,
  borderStrong: COLOR_TOKENS.borderStrong,
  textPrimary: COLOR_TOKENS.foreground,
  textSecondary: COLOR_TOKENS.foregroundSecondary,
  textMuted: COLOR_TOKENS.foregroundMuted,
  skyClearColor: COLOR_TOKENS.background,
  fogNear: 16,
  fogFar: 55,
  sunColor: "#FFFDF7",
  skyHemisphere: "#E0F2FE",
  groundHemisphere: "#F5F0E8",
};

export function getRoomAccentKey(roomId: string): string {
  const room = getRoomTheme(roomId);
  return room.tokens.name.toLowerCase();
}
