import { Stack } from "expo-router";
import { ThemeProvider } from "../context/CourierThemeContext";
import { useCourierAuth } from "../stores/CourierAuthStore";
import { useEffect } from "react";

export default function Layout() {
  const { fetchCourierProfile } = useCourierAuth();

  useEffect(() => {
    // Fetch courier profile on app load
    fetchCourierProfile();
  }, []);

  return (
    <ThemeProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          animationEnabled: true,
        }}
      />
    </ThemeProvider>
  );
}