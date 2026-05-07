// client-app\(app)\app\(app)\PayingScreen.tsx
import { router } from "expo-router";
import { useEffect } from "react";
import {
    ActivityIndicator,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from "react-native";

const COLORS = {
  bg: "#0f0e0c",
  card: "#242018",
  border: "#2e2b22",
  gold: "#f0b429",
  text: "#f5f0e8",
  muted: "#9c9178",
};

export default function PayingScreen() {
  useEffect(() => {
    const timeout = setTimeout(() => {
      router.replace("/");
    }, 2600);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.card}>
        <ActivityIndicator size="large" color={COLORS.gold} />
        <Text style={styles.title}>Fizetés feldolgozása</Text>
        <Text style={styles.text}>
          Kérlek ne zárd be az alkalmazást. Mindjárt visszairányítunk.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.bg,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  card: {
    width: "100%",
    backgroundColor: COLORS.card,
    borderColor: COLORS.border,
    borderWidth: 1,
    borderRadius: 28,
    padding: 28,
    alignItems: "center",
  },
  title: {
    marginTop: 18,
    color: COLORS.text,
    fontSize: 24,
    fontWeight: "900",
    textAlign: "center",
  },
  text: {
    marginTop: 10,
    color: COLORS.muted,
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center",
  },
});