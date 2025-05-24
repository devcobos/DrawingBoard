import { create } from 'zustand'

export type ThemeType = "light" | "dark" | "chalkboard";

interface ThemeState {
  currentTheme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  onThemeChange: ((theme: ThemeType) => void) | null;
  setOnThemeChange: (callback: ((theme: ThemeType) => void) | null) => void;
}

// Create theme store with Zustand
export const useThemeStore = create<ThemeState>((set, get) => ({
  currentTheme: "chalkboard", // Tema por defecto (encerado)
  onThemeChange: null,
  setOnThemeChange: (callback) => set({ onThemeChange: callback }),
  setTheme: (theme: ThemeType) => {
    set({ currentTheme: theme });
    const { onThemeChange } = get();
    if (onThemeChange) {
      onThemeChange(theme);
    }
  },
}));