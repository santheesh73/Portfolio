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
  getRoomAccentKey,
} from "./colors";

interface ThemeContextType {
  activeAccentKey: string;
  activeAccent: ColorTokenGroup;
  setActiveAccentKey: (key: string) => void;
  updateAccentForRoom: (roomId: string) => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({
  children,
  initialRoomId = "exterior",
}: {
  children: ReactNode;
  initialRoomId?: string;
}) {
  const [accentKey, setAccentKey] = useState<string>(() =>
    getRoomAccentKey(initialRoomId)
  );

  const activeAccent = useMemo(() => {
    return ACCENT_PALETTES[accentKey] || ACCENT_PALETTES.emerald;
  }, [accentKey]);

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
    setAccentKey((prev) => (prev !== nextKey ? nextKey : prev));
  }, []);

  const value = useMemo(
    () => ({
      activeAccentKey: accentKey,
      activeAccent,
      setActiveAccentKey: setAccentKey,
      updateAccentForRoom,
    }),
    [accentKey, activeAccent, updateAccentForRoom]
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
      setActiveAccentKey: () => {},
      updateAccentForRoom: () => {},
    };
  }
  return context;
}
