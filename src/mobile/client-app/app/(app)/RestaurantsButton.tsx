// client-app\app\(app)\RestaurantsButton.tsx
import { Text, Pressable, View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import React from "react";

type Props = {
  style?: StyleProp<ViewStyle>;
};

export default function RestaurantsButton({ style }: Props) {
  return (
    <View style={[styles.wrapper, style]}>
      <Pressable
        onPress={() => router.push("/RestaurantsScreen")}
        style={({ pressed }) => [
          styles.button,
          pressed && styles.pressed,
        ]}
      >

        <Ionicons name="restaurant" size={26} color="#fff" />
        <Text>Éttermek</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#111827", // dark but distinct from background
    alignItems: "center",
    justifyContent: "center",

    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },

    elevation: 4,
  },
  pressed: {
    opacity: 0.75,
    transform: [{ scale: 0.96 }],
  },
});