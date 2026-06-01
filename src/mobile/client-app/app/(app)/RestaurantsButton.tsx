// client-app\app\(app)\RestaurantsButton.tsx

import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";

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
<Ionicons name="location-outline" size={30} color="#0f0e0c" />
        <Text style={styles.text}>Éttermek</Text>
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,

    height: 44,
    paddingHorizontal: 16,

    borderRadius: 999,
    backgroundColor: "#f0b429",

    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },

  text: {
    color: "#0f0e0c",
    fontSize: 14,
  },

  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.96 }],
  },
});