import { router } from "expo-router";
import { Pressable, Text, View, StyleSheet } from "react-native";

export default function ContactPreview() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kapcsolat</Text>

      <Text style={styles.text}>Email: info@royaldelivery.com</Text>
      <Text style={styles.text}>Telefon: +36 30 123 4567</Text>
      <Text style={[styles.text, { marginBottom: 16 }]}>
        Cím: 1234 Budapest, Király utca 1.
      </Text>

      <Pressable
        onPress={() => router.push("/ContactDetails")}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Továbbiak →</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
  },
  text: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginBottom: 6,
  },
  button: {
    backgroundColor: "#2563eb",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});