// client-app\app\contact.tsx
import { View, Text } from "react-native";

export default function Contact() {
    return (
        <View>
            <Text
            style={{
          fontSize: 28,
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Kapcsolat
      </Text>

      <Text
        style={{
          fontSize: 16,
          color: "#555",
          textAlign: "center",
        }}
      >
        Email: info@royaldelivery.com
      </Text>
      <Text
        style={{
          fontSize: 16,
          color: "#555",
          textAlign: "center",
        }}
      >
        Telefon: +36 20 123 4567
      </Text>
      <Text
        style={{
          fontSize: 16,
          color: "#555",
          marginBottom: 16,
          textAlign: "center",
        }}
      >
        Cím: 1234 Budapest, Király utca 1.
      </Text>
    </View>
    );
}