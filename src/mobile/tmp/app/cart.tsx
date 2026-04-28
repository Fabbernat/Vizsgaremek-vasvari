// app/cart.tsx
import { View, Text, FlatList, Pressable, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { useCart } from "./cart-context";

export default function CartScreen() {
  const { items, addToCart, removeFromCart, total, clearCart } = useCart();

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(i) => i.id}
        ListEmptyComponent={
          <Text style={{ color: "white", textAlign: "center", marginTop: 40 }}>
            Cart is empty
          </Text>
        }
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Image source={item.image} style={styles.image} />

            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.price}>{item.price} Ft</Text>
            </View>

            <View style={styles.controls}>
              <Pressable onPress={() => removeFromCart(item.id)}>
                <Text style={styles.btn}>-</Text>
              </Pressable>

              <Text style={styles.qty}>{item.quantity}</Text>

              <Pressable onPress={() => addToCart(item)}>
                <Text style={styles.btn}>+</Text>
              </Pressable>
            </View>
          </View>
        )}
      />

      {/* FOOTER */}
      <View style={styles.footer}>
        <Text style={styles.total}>Total: {total} Ft</Text>

        <Pressable style={styles.checkout}>
          <Text style={{ color: "white" }}>Checkout</Text>
        </Pressable>

        <Pressable onPress={clearCart}>
          <Text style={{ color: "#94a3b8", marginTop: 8 }}>Clear</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0f172a" },

  row: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#1e293b",
  },

  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 10,
  },

  name: { color: "white", fontWeight: "bold" },
  price: { color: "#94a3b8" },

  controls: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  btn: {
    color: "white",
    fontSize: 18,
    paddingHorizontal: 8,
  },

  qty: { color: "white" },

  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#1e293b",
  },

  total: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },

  checkout: {
    backgroundColor: "#22c55e",
    padding: 14,
    borderRadius: 12,
    marginTop: 10,
    alignItems: "center",
  },
});