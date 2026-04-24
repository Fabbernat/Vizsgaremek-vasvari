// client-app/app/profileIconButton.tsx
import { Pressable, View, StyleProp, ViewStyle } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  style?: StyleProp<ViewStyle>;
};

export default function ProfileIconButton({ style }: Props) {
  return (
    <View style={style}>
      <Pressable onPress={() => router.push("/profileScreen")}>
        <Ionicons name="person-outline" size={28} color="#333" />
      </Pressable>
    </View>
  );
}