import { useTheme } from "./ThemeContext";

export default function ContactDetailsScreen() {
  const { colors } = useTheme();     // ← hozzáadod ezt
  // ... a te kódod marad, csak:
  // backgroundColor: "#ffffff"  →  backgroundColor: colors.bg
  // color: "#111827"            →  color: colors.text
  // color: "#555"               →  color: colors.muted
}