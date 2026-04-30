// client-app\app\index.tsx
import { ScrollView } from "react-native";
import HomeScreen from "./homeScreen";
import Contact from "./contact";

export default function Index() {
  return (
    <ScrollView>
      {/* <DebugDashboard /> */}
      <HomeScreen />
      <Contact />
    </ScrollView>
  );
}
