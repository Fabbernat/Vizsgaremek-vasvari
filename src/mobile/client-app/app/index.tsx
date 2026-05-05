// client-app\app\index.tsx
import { Stack } from "expo-router";
import { ScrollView } from "react-native";
import HomeScreen from "./(app)/homeScreen";
import Contact from "./(app)/contact";

export default function Index() {
  return (
    <ScrollView>
      {/* <DebugDashboard /> */}
      <Stack.Screen
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: "#0f0e0c" },
          headerTintColor: "#f5f0e8",
          headerTitle: "",
          headerRight: undefined, // explicitly no home button
        }}
      />
      <HomeScreen />
      <Contact />
    </ScrollView>
  );
}
