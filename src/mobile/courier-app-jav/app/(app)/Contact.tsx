import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function ContactPreview() {
  return (
    <View style={{ padding: 24 }}>
      <Text
        style={{
          fontSize: 28,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 12,
        }}
      >
        Kapcsolat
      </Text>

      <Text style={styles.text}>Email: info@royaldelivery.com</Text>
      <Text style={styles.text}>Telefon: +36 30 123 4567</Text>
      <Text style={[styles.text, { marginBottom: 16 }]}>
        Cím: 1234 Budapest, Király utca 1.
      </Text>

      <Pressable
        onPress={() => router.push("/ContactDetails")}
        style={{
          backgroundColor: "#2563eb",
          padding: 14,
          borderRadius: 12,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white", fontWeight: "700", fontSize: 16 }}>
          Továbbiak →
        </Text>
      </Pressable>
    </View>
  );
}

const styles = {
  text: {
    fontSize: 16,
    color: "#555",
    textAlign: "center" as const,
    marginBottom: 6,
  },
};