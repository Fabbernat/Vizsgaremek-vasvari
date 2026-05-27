import { Stack } from "expo-router";
import Toast from "react-native-toast-message";
import { ThemeProvider } from "./ThemeContext";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <Stack screenOptions={{ headerShown: false }} />
      <Toast />
    </ThemeProvider>
  );
}