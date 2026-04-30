import { Pressable, StyleSheet } from "react-native";
import { router } from "expo-router";
import { Bootstrap } from "@expo/vector-icons";

const COLORS = {
  bg: "#0f0e0c",
  gold: "#f0b429",
};

export default function HomeButton() {
  return (
    <Pressable
      onPress={() => router.replace("/")}
      style={({ pressed }) => [
        styles.container,
        pressed && { opacity: 0.7, transform: [{ scale: 0.95 }] },
      ]}
    >
      <Bootstrap name="house-door-fill" size={22} color={COLORS.gold} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 50,
    right: 20,
    zIndex: 999,

    backgroundColor: "#1c1a16",
    padding: 10,
    borderRadius: 12,

    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
});