// courier-app/App.tsx
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import ContactPreview from "./Contact";

export default function App() {
  return (
    <View style={styles.container}>
      <ContactPreview />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});