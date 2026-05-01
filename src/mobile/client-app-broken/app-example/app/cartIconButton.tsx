import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
    Pressable,
    StyleProp,
    StyleSheet,
    View,
    ViewStyle,
} from "react-native";

type Props = {
  style?: StyleProp<ViewStyle>;
};

export default function CartIconButton({ style }: Props) {
  return (
    <View style={[styles.wrapper, style]}>
      <Pressable
        onPress={() => router.push("/cartScreen")}
        style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      >
        <Ionicons name="cart-outline" size={26} color="#fff" />
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
    backgroundColor: "#2563eb", // nice blue (high contrast)
    alignItems: "center",
    justifyContent: "center",

    // shadow (iOS)
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },

    // elevation (Android)
    elevation: 4,
  },
  pressed: {
    opacity: 0.75,
    transform: [{ scale: 0.96 }],
  },
});
