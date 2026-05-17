// context/ThemeContext.tsx
/* Single Source of Truth */
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

export const colors_I_use = [
    "#2563eb", "#16a34a", "#178b42", "#555", "#888", "#ccc", "#fff", "#888", "#ddd", "#f9c9c9"
];

export type Theme = "dark" | "light";

export const DARK_COLORS = {
  bg: "#0f0e0c",
  surface: "#1c1a16",
  card: "#242018",
  border: "#2e2b22",
  gold: "#f0b429",
  goldDim: "#7a5c15",
  goldFaint: "#1e1a0e",
  text: "#f5f0e8",
  muted: "#9c9178",
  placeholder: "#5a5545",
  danger: "#e05252",
  dangerFaint: "#1e0e0e",
  blue: "#3b82f6",
  green: "#22c55e",
  // Header (Stack navigator)
  headerBg: "#0f0e0c",
  headerTint: "#f5f0e8",
};

export const LIGHT_COLORS = {
  bg: "#faf8f3",
  surface: "#f0ece1",
  card: "#ffffff",
  border: "#e2d9c4",
  gold: "#c9920a",
  goldDim: "#e8c56a",
  goldFaint: "#fef9eb",
  text: "#1a1714",
  muted: "#6b6047",
  placeholder: "#b0a48a",
  danger: "#dc2626",
  dangerFaint: "#fee2e2",
  blue: "#2563eb",
  green: "#16a34a",
  // Header (Stack navigator)
  headerBg: "#f0ece1",
  headerTint: "#1a1714",
};

export type AppColors = typeof DARK_COLORS;

type ThemeContextType = {
  theme: Theme;
  colors: AppColors;
  toggleTheme: () => void;
  isDark: boolean;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  colors: DARK_COLORS,
  toggleTheme: () => {},
  isDark: true,
});

const STORAGE_KEY = "royal_delivery_theme";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [ready, setReady] = useState(false);

  // Load persisted preference on mount
  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((stored) => {
        if (stored === "light" || stored === "dark") setTheme(stored);
      })
      .finally(() => setReady(true));
  }, []);

  const toggleTheme = async () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    await AsyncStorage.setItem(STORAGE_KEY, next);
  };

  // Don't flash the wrong theme on startup
  if (!ready) return null;

  return (
    <ThemeContext.Provider
      value={{
        theme,
        colors: theme === "dark" ? DARK_COLORS : LIGHT_COLORS,
        toggleTheme,
        isDark: theme === "dark",
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
