"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
  ReactNode,
} from "react";
import {
  ACCENT_PALETTES,
  ColorTokenGroup,
  ProjectIdentity,
  getRoomAccentKey,
  getProjectIdentity,
  createProjectTokenGroup,
} from "./colors";

export interface ThemeContextType {
  activeAccentKey: string;
  activeAccent: ColorTokenGroup;
  interactingProjectId: string | null;
  focusedProject: ProjectIdentity | null;
  isProjectFocused: boolean;
  setActiveAccentKey: (key: string) => void;
  updateAccentForRoom: (roomId: string) => void;
  setInteractingProject: (projectId: string | null) => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({
  children,
  initialRoomId = "exterior",
}: {
  children: ReactNode;
  initialRoomId?: string;
}) {
  const [roomAccentKey, setRoomAccentKey] = useState<string>(() =>
    getRoomAccentKey(initialRoomId)
  );
  const [interactingProjectId, setInteractingProjectId] = useState<string | null>(null);

  // Derive focused project identity if any project is selected/focused
  const focusedProject = useMemo(() => {
    return interactingProjectId ? getProjectIdentity(interactingProjectId) : null;
  }, [interactingProjectId]);

  // Derive active accent dynamically: project-specific if focused, otherwise current room
  const activeAccent = useMemo(() => {
    if (focusedProject) {
      return createProjectTokenGroup(focusedProject);
    }
    return ACCENT_PALETTES[roomAccentKey] || ACCENT_PALETTES.emerald;
  }, [focusedProject, roomAccentKey]);

  const isProjectFocused = Boolean(focusedProject);

  // Synchronize CSS variables into the DOM for Tailwind and native CSS elements
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--accent", activeAccent.accent);
    root.style.setProperty("--accent-hover", activeAccent.accentHover);
    root.style.setProperty("--accent-muted", activeAccent.accentSoft);
    root.style.setProperty("--accent-foreground", activeAccent.accentContrast);
  }, [activeAccent]);

  const updateAccentForRoom = useCallback((roomId: string) => {
    const nextKey = getRoomAccentKey(roomId);
    setRoomAccentKey((prev) => (prev !== nextKey ? nextKey : prev));
  }, []);

  const setInteractingProject = useCallback((projectId: string | null) => {
    setInteractingProjectId(projectId);
  }, []);

  const value = useMemo(
    () => ({
      activeAccentKey: focusedProject ? focusedProject.name.toLowerCase() : roomAccentKey,
      activeAccent,
      interactingProjectId,
      focusedProject,
      isProjectFocused,
      setActiveAccentKey: setRoomAccentKey,
      updateAccentForRoom,
      setInteractingProject,
    }),
    [
      focusedProject,
      roomAccentKey,
      activeAccent,
      interactingProjectId,
      isProjectFocused,
      updateAccentForRoom,
      setInteractingProject,
    ]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    // Graceful fallback if used outside provider
    return {
      activeAccentKey: "emerald",
      activeAccent: ACCENT_PALETTES.emerald,
      interactingProjectId: null,
      focusedProject: null,
      isProjectFocused: false,
      setActiveAccentKey: () => {},
      updateAccentForRoom: () => {},
      setInteractingProject: () => {},
    };
  }
  return context;
}
