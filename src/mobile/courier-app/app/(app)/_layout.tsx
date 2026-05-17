import { ThemeProvider } from "@/components/ThemeContext";
import { Stack } from "expo-router";
import Toast from "react-native-toast-message";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <Stack screenOptions={{ headerShown: false }} />
      <Toast />
    </ThemeProvider>
  );
}