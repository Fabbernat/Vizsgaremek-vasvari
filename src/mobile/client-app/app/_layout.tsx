// client-app\app\_layout.tsx
import { router, Stack } from "expo-router";
import Toast from "react-native-toast-message";
import { Pressable, Text } from "react-native";


function HomeIcon() {
  return (
    <Pressable
      onPress={() => router.replace("/")}
      style={({ pressed }) => ({
        marginRight: 16,
        opacity: pressed ? 0.6 : 1,
      })}
    >
      <Text style={{ fontSize: 20 }}>🏠</Text>
    </Pressable>
  );
}

export default function Layout() {
  return (
    <>
      <Stack
        screenOptions={{
          headerShown: true,
          headerStyle: { backgroundColor: "#0f0e0c" },
          headerTintColor: "#f5f0e8",
          headerRight: () => <HomeIcon />,
          headerTitle: "",
        }}
      />
      <Toast />
    </>
  );
}