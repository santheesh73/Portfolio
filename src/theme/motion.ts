/**
 * DESIGN SYSTEM MOTION TOKENS
 * Centralized Timing & Cubic-Bezier Easings
 * (Preserves exact cinematography while providing standard references)
 */

export const MOTION_TOKENS = {
  duration: {
    instant: 0.1,    // 100ms
    fast: 0.15,      // 150ms
    normal: 0.25,    // 250ms
    slow: 0.42,      // 420ms
    cinematic: 0.9,  // 900ms
  },
  ease: {
    standard: [0.4, 0, 0.2, 1] as const,
    enter: [0.22, 1, 0.36, 1] as const,
    exit: [0.16, 1, 0.3, 1] as const,
    cinematic: [0.16, 1, 0.3, 1] as const,
  },
} as const;

export const TRANSITIONS = {
  fast: { duration: MOTION_TOKENS.duration.fast, ease: MOTION_TOKENS.ease.standard },
  normal: { duration: MOTION_TOKENS.duration.normal, ease: MOTION_TOKENS.ease.enter },
  slow: { duration: MOTION_TOKENS.duration.slow, ease: MOTION_TOKENS.ease.cinematic },
  cinematic: { duration: MOTION_TOKENS.duration.cinematic, ease: MOTION_TOKENS.ease.cinematic },
} as const;
