// app/(app)/settingsIconButton.tsx
//
// Gear icon button for the home screen top bar.
// Matches the visual style of cartIconButton and profileIconButton.

import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { useTheme } from "@/contextw/ThemeContext";

type Props = {
  style?: StyleProp<ViewStyle>;
};

export default function SettingsIconButton({ style }: Props) {
  const { colors } = useTheme();

  return (
    <View style={[styles.wrapper, style]}>
      <Pressable
onPress={() => router.push("/(app)/SettingsScreen")}
        style={({ pressed }) => [
          styles.button,
          { backgroundColor: colors.surface, borderColor: colors.border },
          pressed && styles.pressed,
        ]}
      >
        <Ionicons name="settings-outline" size={22} color={colors.muted} />
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
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  pressed: {
    opacity: 0.7,
    transform: [{ scale: 0.95 }],
  },
});