// client-app/app/cartIconButton.tsx
import { Pressable, View, StyleProp, ViewStyle } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  style?: StyleProp<ViewStyle>;
};

export default function CartIconButton({ style }: Props) {
  return (
    <View style={style}>
      <Pressable onPress={() => router.push("/cartView")}>
        <Ionicons name="cart-outline" size={28} color="#333" />
      </Pressable>
    </View>
  );
}