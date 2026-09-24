/**
 * DESIGN SYSTEM TOKENS
 * Single Source of Truth for Colors, Spacing, Radii, Shadows, Surfaces, and Typography
 */

// 1. Core Semantic Color Tokens (Light Architectural Palette)
export const COLOR_TOKENS = {
  // Canvas & Surfaces
  background: "#F5F4EF",
  surface: "rgba(255, 255, 255, 0.85)",
  surfaceElevated: "#FFFFFF",
  surfaceMuted: "#F0EDE4",
  surfaceArchitectural: "#FAF9F6",
  surfaceInteractive: "#EAE8E1",

  // Foreground & Typography
  foreground: "#171918",
  foregroundSecondary: "#4B524D",
  foregroundMuted: "#717770",

  // Borders
  border: "rgba(0, 0, 0, 0.09)",
  borderSubtle: "rgba(0, 0, 0, 0.05)",
  borderStrong: "rgba(0, 0, 0, 0.16)",

  // Status & Feedback
  success: "#16A34A",
  warning: "#D97706",
  error: "#DC2626",
} as const;

// 2. Consistent Spacing Scale
export const SPACING_TOKENS = {
  micro: "0.25rem",  // 4px
  xs: "0.5rem",      // 8px
  sm: "0.75rem",     // 12px
  md: "1rem",        // 16px
  lg: "1.5rem",      // 24px
  xl: "2.5rem",      // 40px
  "2xl": "4rem",     // 64px
  "3xl": "6rem",     // 96px
} as const;

// 3. Radius System
export const RADIUS_TOKENS = {
  none: "0px",
  sm: "6px",
  md: "10px",
  lg: "16px",
  xl: "24px",
  pill: "9999px",
} as const;

// 4. Subtle Architectural Shadow Vocabulary
export const SHADOW_TOKENS = {
  subtle: "0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.03)",
  card: "0 4px 6px -1px rgba(0, 0, 0, 0.06), 0 2px 4px -2px rgba(0, 0, 0, 0.04)",
  elevated: "0 20px 25px -5px rgba(0, 0, 0, 0.07), 0 8px 10px -6px rgba(0, 0, 0, 0.04)",
  glowAccent: "0 0 24px var(--accent-muted)",
} as const;

// 5. Surface System Presets (Tailwind utility compositions)
export const SURFACE_STYLES = {
  base: "bg-[#F5F4EF] text-[#171918]",
  elevated: "bg-white border border-black/[0.08] shadow-card",
  glass: "bg-white/85 backdrop-blur-md border border-black/[0.08] shadow-xs",
  architectural: "bg-[#FAF9F6] border border-black/[0.06]",
} as const;

// 6. Accent Color Derivation Utility
export interface DerivedAccentTokens {
  name: string;
  accent: string;          // Main brand accent (WCAG AA compliant on light backgrounds)
  accentHover: string;     // Active or hover accent state
  accentSoft: string;      // 10-14% opacity tint for card/pill backgrounds
  accentMuted: string;     // 22-25% tint for subtle borders
  accentContrast: string;  // High-contrast text on accent button (#FFFFFF)
  glow3D: string;          // Hex for Three.js lights, LEDs, emissive strips
}

/**
 * Derives a full set of accessible semantic accent tokens from a base hex color.
 */
export function deriveAccentTokens(name: string, primaryHex: string, glowHex?: string): DerivedAccentTokens {
  const glow = glowHex || primaryHex;
  return {
    name,
    accent: primaryHex,
    accentHover: glow,
    accentSoft: `${primaryHex}1A`,   // ~10% alpha
    accentMuted: `${primaryHex}38`,  // ~22% alpha
    accentContrast: "#FFFFFF",
    glow3D: glow,
  };
}
