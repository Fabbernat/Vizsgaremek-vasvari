import { router } from "expo-router";
import {
  Linking,
  Platform,
  Pressable,
  Text,
  View,
  ScrollView,
  Image,
  StyleSheet,
} from "react-native";

export default function ContactDetailsScreen() {
  function openPhone() {
    if (Platform.OS === "web") {
      alert("Call: +36 30 123 4567");
    } else {
      Linking.openURL("tel:+36301234567");
    }
  }

  function openFacebook() {
    Linking.openURL("https://www.facebook.com/RoyalDelivery");
  }

  function openEmail() {
    Linking.openURL("mailto:info@royaldelivery.com");
  }

  function openInstagram() {
    Linking.openURL("https://www.instagram.com/RoyalDelivery/");
  }

  function openLinkedIn() {
    Linking.openURL("https://www.linkedin.com/RoyalDelivery/");
  }

  return (
    <ScrollView
      contentContainerStyle={{
        padding: 24,
        backgroundColor: "#ffffff",
      }}
    >
      <Pressable
        onPress={() => router.push("/")}
        style={{
          alignSelf: "flex-start",
          backgroundColor: "#e5e7eb",
          paddingVertical: 10,
          paddingHorizontal: 16,
          borderRadius: 10,
          marginBottom: 20,
        }}
      >
        <Text style={{ color: "#111827", fontWeight: "600" }}>← Vissza</Text>
      </Pressable>

      <Text style={styles.title}>Kapcsolat & Segítség</Text>

      <View style={styles.iconRow}>
        <Image source={require("../../assets/mine/landline-phone.png")} style={styles.icon} />
        <Image source={require("../../assets/mine/email.png")} style={styles.icon} />
        <Image source={require("../../assets/mine/icons8-facebook-96.png")} style={styles.icon} />
        <Image source={require("../../assets/mine/icons8-instagram-480.png")} style={styles.icon} />
        <Image source={require("../../assets/mine/icons8-linkedin-96.png")} style={styles.icon} />
      </View>

      <Text style={styles.subtitle}>
        Ezeket a csatornákat használd az ügyfélszolgálatunk és híreink
        elérésére.
      </Text>

      <ContactButton
        color="#2563eb"
        title="Minden munkanapon 8:00-16:00-ig elérhető telefonos ügyfélszolgálatunk:"
        value="+36 30 123 4567"
        onPress={openPhone}
      />

      <ContactButton
        color="#16a34a"
        title="Kérdés, kérés, óhaj, sóhaj, bánat, panasz esetén az alábbi e-mail címen állunk rendelkezésre:"
        value="info@royaldelivery.com"
        onPress={openEmail}
      />

      <ContactButton
        color="#1877F2"
        title="Írj Facebook üzenetet Messengeren:"
        value="Royal Delivery Facebook"
        onPress={openFacebook}
      />

      <ContactButton
        color="#F9A04E"
        title="Kövess hírekért Instagramon!"
        value="@RoyalDelivery"
        onPress={openInstagram}
      />

      <ContactButton
        color="#0A66C2"
        title="Kövess LinkedInen!"
        value="Royal Delivery LinkedIn"
        onPress={openLinkedIn}
      />

      <Image
        source={require("../../assets/mine/5icons.png")}
        style={styles.bottomImage}
      />
    </ScrollView>
  );
}

function ContactButton({
  color,
  title,
  value,
  onPress,
}: {
  color: string;
  title: string;
  value: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        backgroundColor: color,
        padding: 16,
        borderRadius: 12,
        marginBottom: 14,
      }}
    >
      <Text style={styles.buttonTitle}>{title}</Text>
      <Text style={styles.buttonText}>{value}</Text>
    </Pressable>
  );
}

const ICON_SIZE = 40;

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  subtitle: {
    textAlign: "center",
    color: "#555",
    marginBottom: 28,
  },
  iconRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 20,
  },
  icon: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    resizeMode: "contain",
  },
  buttonTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 4,
  },
  buttonText: {
    color: "white",
  },
  bottomImage: {
    width: "100%",
    height: 260,
    resizeMode: "contain",
    marginTop: 10,
  },
});