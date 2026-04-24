// client-app\app\cartView.tsx
import { View, Pressable, Text, StyleSheet, FlatList, Alert } from "react-native";
import { router } from "expo-router";
import { useCart, removeFromCart, clearCart } from "./cartStore";

const COLORS = {
  bg: "#0f0e0c",
  surface: "#1c1a16",
  card: "#242018",
  border: "#2e2b22",
  gold: "#f0b429",
  goldDim: "#7a5c15",
  goldFaint: "#1e1a0e",
  text: "#f5f0e8",
  muted: "#9c9178",
  placeholder: "#5a5545",
  danger: "#e05252",
  dangerFaint: "#1e0e0e",
};

// ── Types ─────────────────────────────────────────────────────────────────────

export type CartItem = {
  id: string;
  name: string;
  price: number;       // HUF
  quantity: number;
};

// ── Demo state (replace with your global store / context) ─────────────────────
import { useState } from "react";

const DEMO_ITEMS: CartItem[] = [
  { id: "1", name: "Királyi Burger",   price: 2490, quantity: 2 },
  { id: "2", name: "Arany Krumpli",    price:  890, quantity: 1 },
  { id: "3", name: "Koronás Limonádé", price:  690, quantity: 3 },
];

// ── Component ──────────────────────────────────────────────────────────────────

export default function CartView() {
  const [items, setItems] = useState<CartItem[]>(DEMO_ITEMS);

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const removeItem = (id: string) =>
    setItems((prev) => prev.filter((i) => i.id !== id));

  const clearCart = () => {
    Alert.alert(
      "Kosár kiürítése",
      "Biztosan törölni szeretnéd az összes tételt?",
      [
        { text: "Mégse", style: "cancel" },
        { text: "Kiürítés", style: "destructive", onPress: () => setItems([]) },
      ]
    );
  };

  return (
    <View style={styles.root}>

      {/* ── Brand header ── */}
      <View style={styles.brandRow}>
        <Text style={styles.crown}>👑</Text>
        <Text style={styles.brandName}>Royal Delivery</Text>
      </View>

      {/* ── Page title + clear button ── */}
      <View style={styles.titleRow}>
        <View>
          <Text style={styles.heading}>Kosár</Text>
          <Text style={styles.subheading}>
            {items.length === 0
              ? "A kosár üres"
              : `${items.length} féle tétel`}
          </Text>
        </View>

        {items.length > 0 && (
          <Pressable
            onPress={clearCart}
            style={({ pressed }) => [styles.clearBtn, pressed && styles.clearBtnPressed]}
          >
            <Text style={styles.clearBtnText}>🗑 Kiürítés</Text>
          </Pressable>
        )}
      </View>

      {/* ── Cart list ── */}
      {items.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>🛒</Text>
          <Text style={styles.emptyTitle}>Üres a kosár</Text>
          <Text style={styles.emptyBody}>
            Adj hozzá termékeket a menüből a rendelés folytatásához.
          </Text>
          <Pressable
            onPress={() => router.back()}
            style={({ pressed }) => [styles.backToMenuBtn, pressed && { opacity: 0.75 }]}
          >
            <Text style={styles.backToMenuText}>← Vissza a menübe</Text>
          </Pressable>
        </View>
      ) : (
        <>
          <FlatList
            data={items}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            renderItem={({ item }) => (
              <View style={styles.cartRow}>
                {/* Left: name + unit price */}
                <View style={styles.cartItemInfo}>
                  <Text style={styles.cartItemName}>{item.name}</Text>
                  <Text style={styles.cartItemUnit}>
                    {item.price.toLocaleString("hu-HU")} Ft / db
                  </Text>
                </View>

                {/* Middle: qty badge */}
                <View style={styles.qtyBadge}>
                  <Text style={styles.qtyText}>×{item.quantity}</Text>
                </View>

                {/* Right: line total + remove */}
                <View style={styles.cartItemRight}>
                  <Text style={styles.cartItemTotal}>
                    {(item.price * item.quantity).toLocaleString("hu-HU")} Ft
                  </Text>
                  <Pressable
                    onPress={() => removeItem(item.id)}
                    hitSlop={8}
                    style={({ pressed }) => [styles.removeBtn, pressed && styles.removeBtnPressed]}
                  >
                    <Text style={styles.removeBtnText}>Törlés</Text>
                  </Pressable>
                </View>
              </View>
            )}
          />

          {/* ── Summary card ── */}
          <View style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Részösszeg</Text>
              <Text style={styles.summaryValue}>
                {total.toLocaleString("hu-HU")} Ft
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Szállítás</Text>
              <Text style={[styles.summaryValue, { color: COLORS.gold }]}>Ingyenes</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.summaryRow}>
              <Text style={styles.totalLabel}>Összesen</Text>
              <Text style={styles.totalValue}>
                {total.toLocaleString("hu-HU")} Ft
              </Text>
            </View>
          </View>

          {/* ── Checkout button ── */}
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
        </>
      )}
    </View>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.bg,
    paddingHorizontal: 24,
    paddingTop: 24,
  },

  // Brand
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

  // Title row
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 20,
  },
  heading: {
    fontSize: 36,
    fontWeight: "900",
    color: COLORS.text,
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  subheading: {
    fontSize: 14,
    color: COLORS.muted,
  },

  // Clear button
  clearBtn: {
    backgroundColor: COLORS.dangerFaint,
    borderWidth: 1,
    borderColor: COLORS.danger,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  clearBtnPressed: { opacity: 0.65 },
  clearBtnText: {
    color: COLORS.danger,
    fontSize: 13,
    fontWeight: "600",
  },

  // List
  listContent: {
    paddingBottom: 8,
  },
  separator: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 4,
  },

  // Cart row
  cartRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    gap: 12,
  },
  cartItemInfo: {
    flex: 1,
  },
  cartItemName: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 3,
  },
  cartItemUnit: {
    fontSize: 12,
    color: COLORS.muted,
  },
  qtyBadge: {
    backgroundColor: COLORS.goldFaint,
    borderWidth: 1,
    borderColor: COLORS.goldDim,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  qtyText: {
    color: COLORS.gold,
    fontSize: 13,
    fontWeight: "700",
  },
  cartItemRight: {
    alignItems: "flex-end",
    gap: 6,
  },
  cartItemTotal: {
    fontSize: 15,
    fontWeight: "800",
    color: COLORS.text,
  },
  removeBtn: {
    backgroundColor: COLORS.dangerFaint,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  removeBtnPressed: { opacity: 0.6 },
  removeBtnText: {
    color: COLORS.danger,
    fontSize: 11,
    fontWeight: "600",
  },

  // Summary card
  summaryCard: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 16,
    marginVertical: 16,
    gap: 10,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  summaryLabel: {
    fontSize: 14,
    color: COLORS.muted,
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.text,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "800",
    color: COLORS.text,
  },
  totalValue: {
    fontSize: 18,
    fontWeight: "900",
    color: COLORS.gold,
  },

  // Checkout button
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

  // Empty state
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 80,
    gap: 12,
  },
  emptyIcon: {
    fontSize: 56,
    marginBottom: 8,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: COLORS.text,
  },
  emptyBody: {
    fontSize: 14,
    color: COLORS.muted,
    textAlign: "center",
    lineHeight: 22,
    maxWidth: 260,
  },
  backToMenuBtn: {
    marginTop: 12,
    backgroundColor: COLORS.goldFaint,
    borderWidth: 1,
    borderColor: COLORS.goldDim,
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  backToMenuText: {
    color: COLORS.gold,
    fontSize: 14,
    fontWeight: "700",
  },
});