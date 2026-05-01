// app/restaurant/[id].tsx
import { View, Text, FlatList, Pressable, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Image } from "expo-image";
import { useCart } from "../cart-context";

const MOCK_MENU = [
  {
    id: "m1",
    restaurant_id: "1",
    name: "Classic Burger",
    description: "Beef, cheese, salad",
    price: 2490,
    image: "https://picsum.photos/400/200?burger",
  },
  {
    id: "m2",
    restaurant_id: "1",
    name: "Double Burger",
    description: "Double meat, double cheese",
    price: 3290,
    image: "https://picsum.photos/400/200?burger2",
  },
];

export default function RestaurantScreen() {
  const { id } = useLocalSearchParams();
  const { addToCart } = useCart();

  const menu = MOCK_MENU.filter((m) => m.restaurant_id === id);

  return (
    <View style={styles.container}>
      <FlatList
        data={menu}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image
              source={item.image}
              style={styles.image}
              contentFit="cover"
              cachePolicy="memory-disk"
            />

            <View style={styles.content}>
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.desc}>{item.description}</Text>

              <View style={styles.row}>
                <Text style={styles.price}>{item.price} Ft</Text>

                <Pressable
                  style={styles.button}
                  onPress={() =>
                    addToCart({
                      id: item.id,
                      name: item.name,
                      price: item.price,
                      image: item.image,
                      quantity: 1,
                    })
                  }
                >
                  <Text style={{ color: "white" }}>Add</Text>
                </Pressable>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0f172a" },

  card: {
    margin: 16,
    backgroundColor: "#1e293b",
    borderRadius: 16,
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: 200,
  },

  content: {
    padding: 12,
  },

  title: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },

  desc: {
    color: "#94a3b8",
    marginVertical: 4,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  price: {
    color: "#facc15",
    fontWeight: "bold",
  },

  button: {
    backgroundColor: "#ef4444",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
  },
});