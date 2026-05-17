import React, { createContext, useContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { useCourierAuth } from "../stores/CourierAuthStore";

export type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  colors: {
    bg: string;
    surface: string;
    card: string;
    border: string;
    gold: string;
    goldLight: string;
    green: string;
    blue: string;
    red: string;
    text: string;
    muted: string;
    danger: string;
  };
  toggleTheme: () => void;
}

const LIGHT_COLORS = {
  bg: "#f5f0e8",
  surface: "#ede5d6",
  card: "#e8dfd0",
  border: "#d9cdbf",
  gold: "#f0b429",
  goldLight: "#fcd34d",
  green: "#22c55e",
  blue: "#3b82f6",
  red: "#ef4444",
  text: "#1a1a1a",
  muted: "#6b5f52",
  danger: "#dc2626",
};

const DARK_COLORS = {
  bg: "#0f0e0c",
  surface: "#1c1a16",
  card: "#242018",
  border: "#2e2b22",
  gold: "#f0b429",
  goldLight: "#fcd34d",
  green: "#22c55e",
  blue: "#3b82f6",
  red: "#ef4444",
  text: "#f5f0e8",
  muted: "#9c9178",
  danger: "#ef4444",
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const systemTheme = useColorScheme() as Theme;
  const { courier } = useCourierAuth();
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    // Use courier's theme preference if available, otherwise use system theme
    if (courier?.theme) {
      setTheme(courier.theme);
    } else {
      setTheme(systemTheme || "dark");
    }
  }, [courier?.theme, systemTheme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const colors = theme === "light" ? LIGHT_COLORS : DARK_COLORS;

  return (
    <ThemeContext.Provider value={{ theme, colors, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};
