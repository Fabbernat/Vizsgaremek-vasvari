import { View, Text, StyleSheet, FlatList, Pressable, Image } from "react-native";
import { Link, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const categories = [
  { id: "pizza", name: "Pizza", icon: "pizza-outline" },
  { id: "burger", name: "Burger", icon: "fast-food-outline" },
  { id: "sushi", name: "Sushi", icon: "fish-outline" },
  { id: "dessert", name: "Dessert", icon: "ice-cream-outline" },
];

const restaurants = [
  {
    id: "1",
    name: "Royal Burger",
    image: "https://picsum.photos/600/300?1",
    rating: 4.8,
    deliveryTime: "25-35 min",
  },
  {
    id: "2",
    name: "Pizza Palace",
    image: "https://picsum.photos/600/300?2",
    rating: 4.5,
    deliveryTime: "20-30 min",
  },
  {
    id: "3",
    name: "Sushi World",
    image: "https://picsum.photos/600/300?3",
    rating: 4.7,
    deliveryTime: "30-40 min",
  },
];

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      
      {/* HEADER */}
      <View style={styles.header}>
        <View>
          <Text style={styles.locationLabel}>Deliver to</Text>
          <Text style={styles.location}>Szeged 📍</Text>
        </View>

        <Pressable
          style={styles.cartButton}
          onPress={() => router.push("/cart")}
        >
          <Ionicons name="cart" size={22} color="white" />
        </Pressable>
      </View>

      {/* BIG CATEGORY BAR */}
      <FlatList
        data={categories}
        horizontal
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categories}
        renderItem={({ item }) => (
          <Pressable
            style={styles.categoryCard}
            onPress={() => router.push(`/category/${item.id}`)}
          >
            <Ionicons name={item.icon as any} size={28} color="white" />
            <Text style={styles.categoryText}>{item.name}</Text>
          </Pressable>
        )}
      />

      {/* RESTAURANTS */}
      <FlatList
        data={restaurants}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Pressable
            key={item.id}
            style={styles.card}
            onPress={() => router.push(`/restaurant/${item.id}`)}
          >
            <Image
              source={{ uri: item.image }}
              style={styles.image}
              resizeMode="cover"
            />

            <View style={styles.overlay}>
              <Text style={styles.title}>{item.name}</Text>

              <View style={styles.row}>
                <Text style={styles.rating}>⭐ {item.rating}</Text>
                <Text style={styles.time}>{item.deliveryTime}</Text>
              </View>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    paddingTop: 50,
  },

  header: {
    paddingHorizontal: 16,
    marginBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  locationLabel: {
    color: "#94a3b8",
    fontSize: 12,
  },

  location: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },

  cartButton: {
    backgroundColor: "#ef4444",
    padding: 12,
    borderRadius: 14,
  },

  categories: {
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 16,
  },

  categoryCard: {
    backgroundColor: "#1e293b",
    paddingVertical: 18,
    paddingHorizontal: 22,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 100,
  },

  categoryText: {
    color: "white",
    marginTop: 6,
    fontWeight: "600",
  },

  card: {
    marginHorizontal: 16,
    marginBottom: 18,
    borderRadius: 18,
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: 220, // ✅ capped under 250
  },

  overlay: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 12,
    backgroundColor: "rgba(0,0,0,0.55)",
  },

  title: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4,
  },

  rating: {
    color: "#facc15",
  },

  time: {
    color: "#e2e8f0",
  },
});