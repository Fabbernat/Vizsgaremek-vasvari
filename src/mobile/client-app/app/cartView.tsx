import { View, Pressable, Text, StyleSheet } from "react-native";
import Orders from "./orders";
import { router } from "expo-router";

const COLORS = {
  bg: "#0f0e0c",
  surface: "#1c1a16",
  card: "#242018",
  border: "#2e2b22",
  gold: "#f0b429",
  goldDim: "#7a5c15",
  text: "#f5f0e8",
  muted: "#9c9178",
  placeholder: "#5a5545",
};

export default function CartView() {
  return (
    <View style={styles.root}>
      {/* Brand header */}
      <View style={styles.brandRow}>
        <Text style={styles.crown}>👑</Text>
        <Text style={styles.brandName}>Royal Delivery</Text>
      </View>

      <Text style={styles.heading}>Kosarad</Text>
      <Text style={styles.subheading}>Ellenőrizd rendelésed a folytatáshoz</Text>

      {/* Orders list */}
      <View style={styles.ordersCard}>
        <Orders />
      </View>

      {/* Checkout button */}
      <Pressable
        onPress={() => {
          console.log("Checkout button pressed");
          router.push("/checkoutScreen");
        }}
        style={({ pressed }) => [
          styles.checkoutBtn,
          pressed && styles.btnPressed,
        ]}
      >
        <Text style={styles.checkoutBtnText}>Megrendelés →</Text>
        <Text style={styles.checkoutBtnSub}>Tovább a fizetéshez</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.bg,
    paddingHorizontal: 24,
    paddingTop: 24,
  },

  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 28,
  },
  crown: { fontSize: 22 },
  brandName: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.gold,
    letterSpacing: 0.5,
  },

  heading: {
    fontSize: 36,
    fontWeight: "900",
    color: COLORS.text,
    letterSpacing: -0.5,
    marginBottom: 6,
  },
  subheading: {
    fontSize: 14,
    color: COLORS.muted,
    marginBottom: 24,
  },

  ordersCard: {
    flex: 1,
    backgroundColor: COLORS.card,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 16,
    marginBottom: 20,
  },

  checkoutBtn: {
    backgroundColor: COLORS.gold,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 28,
  },
  checkoutBtnText: {
    color: "#0f0e0c",
    fontSize: 17,
    fontWeight: "800",
    letterSpacing: 0.2,
  },
  checkoutBtnSub: {
    color: "#0f0e0c",
    fontSize: 12,
    fontWeight: "500",
    opacity: 0.65,
    marginTop: 2,
  },
  btnPressed: {
    opacity: 0.82,
    transform: [{ scale: 0.97 }],
  },
});