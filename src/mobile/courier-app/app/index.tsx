import { useEffect } from "react";
import { router } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { useCourierAuth } from "../stores/CourierAuthStore";
import { useTheme } from "../context/CourierThemeContext";

export default function App() {
  const { isLoggedIn, loading } = useCourierAuth();
  const { colors } = useTheme();

  useEffect(() => {
    if (!loading) {
      if (isLoggedIn) {
        router.replace("/home");
      } else {
        router.replace("/login");
      }
    }
  }, [isLoggedIn, loading]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.bg,
      }}
    >
      <ActivityIndicator size="large" color={colors.gold} />
    </View>
  );
}
