// client-app\(app)\_layout.tsx
import { router, Stack } from "expo-router";
import Toast from "react-native-toast-message";
import { Pressable, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ThemeProvider } from "./themecontext";

function HomeIcon() {
  return (
    <Pressable
      onPress={() => router.navigate("/")}
      hitSlop={8}
      style={({ pressed }) => ({
        opacity: pressed ? 0.6 : 1,
        marginRight: 8,
      })}
    >
      <Ionicons name="home-outline" size={22} color="#f5f0e8" />
    </Pressable>
  );
}

export default function Layout() {
  return (
    <ThemeProvider>
      <Stack
        screenOptions={({ route }) => ({
          headerShown: true,
          headerStyle: { backgroundColor: "#0f0e0c" },
          headerTintColor: "#f5f0e8",
          headerRight: route.name !== "index" ? () => <HomeIcon /> : undefined,
          headerTitle: "",
          headerRightContainerStyle: {
            paddingRight: 4,
        },
        })}
      />
      <Toast />
    </ThemeProvider>
  );
}