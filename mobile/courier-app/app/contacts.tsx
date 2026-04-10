import { router } from "expo-router";
import {
  Linking,
  Platform,
  Pressable,
  Text,
  View,
  Image,
  StyleSheet,
} from "react-native";

export default function ContactsScreen() {
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
    <View
      style={{
        flexGrow: 1,
        padding: 24,
        backgroundColor: "#ffffff",
      }}
    >
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Pressable
          onPress={() => router.replace("/")}
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

        <Text
          style={{
            fontSize: 28,
            fontWeight: "bold",
            marginBottom: 12,
            textAlign: "center",
          }}
        >
          Kapcsolat & Segítség
        </Text>
        <View style={styles.container}>
          <Image
            source={require("../assets/mine/landline-phone.png")}
            style={styles.icon}
          />
          <Image
            source={require("../assets/mine/email.png")}
            style={styles.icon}
          />
          <Image
            source={require("../assets/mine/icons8-facebook-96.png")}
            style={styles.icon}
          />
          <Image
            source={require("../assets/mine/icons8-instagram-480.png")}
            style={styles.icon}
          />
          <Image
            source={require("../assets/mine/icons8-linkedin-96.png")}
            style={styles.icon}
          />
        </View>

        <Text
          style={{
            textAlign: "center",
            color: "#555",
            marginBottom: 28,
          }}
        >
          Ezeket a csatornákat használd az ügyfélszolgálatunk és híreink
          elérésére.
        </Text>

        <Pressable
          onPress={openPhone}
          style={{
            backgroundColor: "#2563eb",
            padding: 16,
            borderRadius: 12,
            marginBottom: 14,
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 16,
              fontWeight: "700",
              marginBottom: 4,
            }}
          >
            Munka közben kérdés során az alábbi számot hívd:
          </Text>
          <Text style={{ color: "white" }}>+36 30 123 4567</Text>
        </Pressable>

        <Pressable
          onPress={openEmail}
          style={{
            backgroundColor: "#16a34a",
            padding: 16,
            borderRadius: 12,
            marginBottom: 14,
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 16,
              fontWeight: "700",
              marginBottom: 4,
            }}
          >
            Hivatalos ügyekre használd alábbi email címre:
          </Text>
          <Text style={{ color: "white" }}>info@royaldelivery.com</Text>
        </Pressable>

        <Pressable
          onPress={openFacebook}
          style={{
            backgroundColor: "#1877F2",
            padding: 16,
            borderRadius: 12,
            marginBottom: 14,
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 16,
              fontWeight: "700",
              marginBottom: 4,
            }}
          >
            Vagy írj Facebook üzenetet Messengeren:
          </Text>
          <Text style={{ color: "white" }}>Royal Delivery Facebook</Text>
        </Pressable>

        <Pressable
          onPress={openInstagram}
          style={{
            backgroundColor: "#F9A04E",
            padding: 16,
            borderRadius: 12,
            marginBottom: 14,
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 16,
              fontWeight: "700",
              marginBottom: 4,
            }}
          >
            Kövess hírekért Instagramon!
          </Text>
          <Text style={{ color: "white" }}>@RoyalDelivery</Text>
        </Pressable>

        <Pressable
          onPress={openLinkedIn}
          style={{
            backgroundColor: "#0A66C2",
            padding: 16,
            borderRadius: 12,
            marginBottom: 14,
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 16,
              fontWeight: "700",
              marginBottom: 4,
            }}
          >
            Kövess LinkedInen!
          </Text>
          <Text style={{ color: "white" }}>Royal Delivery LinkedIn</Text>
        </Pressable>

        <View>
          <Image
            source={require("../assets/mine/5icons.png")}
            style={{ height: 400 }}
          />
        </View>
      </View>
    </View>
  );
}

const ICON_SIZE = 40;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  icon: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    resizeMode: "contain", // 🔥 prevents distortion
  },
});
