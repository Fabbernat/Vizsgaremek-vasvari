import { Stack } from "expo-router";
import Toast from "react-native-toast-message";
import { Text } from "react-native";

export default function Layout() {
  return (
    <>
        <Stack />
        <Text
        style={{
          fontSize: 28,
          fontWeight: "bold",
          marginBottom: 12,
        }}
      >
        Kapcsolat
      </Text>

      <Text
        style={{
          fontSize: 16,
          color: "#555",
          marginBottom: 40,
          textAlign: "center",
        }}
      >
        Email: info@royaldelivery.com
      </Text>
      <Text
        style={{
          fontSize: 16,
          color: "#555",
          marginBottom: 40,
          textAlign: "center",
        }}
      >
        Telefon: +36 20 123 4567
      </Text>
      <Text
        style={{
          fontSize: 16,
          color: "#555",
          marginBottom: 40,
          textAlign: "center",
        }}
      >
        Cím: 1234 Budapest, Király utca 1.
      </Text>
      <Toast />
    </>
  );
}