// client-app/app/RestaurantsScreen.tsx
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  FlatList,
  Image,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import { addToGuestCart } from "@/stores/CartStore";

const COLORS = {
  bg: "#0f0e0c",
  surface: "#1c1a16",
  card: "#242018",
  border: "#2e2b22",
  gold: "#f0b429",
  goldDim: "#7a5c15",
  goldFaint: "#2a2010",
  green: "#22c55e",
  greenDim: "#14532d",
  text: "#f5f0e8",
  muted: "#9c9178",
};

type RestaurantItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  restaurant_id?: string | number;
  image_url?: string;
  imageUrl?: string;
};

type RestaurantCardProps = {
  item: RestaurantItem;
  index: number;
  onAddToCart: (name: string, quantity: number) => void;
};

type SortOption = "none" | "priceAsc" | "priceDesc" | "name";

const restaurantsData: RestaurantItem[] = [
  {
    id: "1",
    name: "Margherita Pizza",
    description: "Friss paradicsom, mozzarella és bazsalikom",
    price: 1500,
    imageUrl: "margherita-pizza.jpg",
  },
  {
    id: "2",
    name: "Caesar Saláta",
    description: "Ropogós saláta csirkével és krutonnal",
    price: 1200,
    imageUrl: "caesar-salata.jpg",
  },
  {
    id: "3",
    name: "Spaghetti Carbonara",
    description: "Klasszikus olasz tészta szalonnával és tojással",
    price: 1300,
    imageUrl: "carbonara.jpg",
  },
  {
    id: "4",
    name: "Pepperoni Pizza",
    description: "Szaftos pepperoni és olvadt sajt",
    price: 1600,
    imageUrl: "pepperoni-pizza.jpg",
  },
  {
    id: "5",
    name: "Hawaii Pizza",
    description: "Ananász és sonka",
    price: 1700,
    imageUrl: "hawaii-pizza.jpg",
  },
  {
    id: "6",
    name: "Vegetáriánus Pizza",
    description: "Friss zöldségek és sajt",
    price: 1400,
    imageUrl: "vegetarianus-pizza.jpg",
  },
  {
    id: "7",
    name: "California Roll",
    description: "Rák, avokádó, uborka",
    price: 2000,
    imageUrl: "california-roll.jpg",
  },
  {
    id: "8",
    name: "Spicy Tuna Roll",
    description: "Fűszeres tonhal",
    price: 2200,
    imageUrl: "spicy-tuna-roll.jpg",
  },
  {
    id: "9",
    name: "Salmon Nigiri",
    description: "Friss lazac rizsen",
    price: 1800,
    imageUrl: "salmon-nigiri.jpg",
  },
  {
    id: "10",
    name: "Gyros tál",
    description: "Csirke, krumpli, tzatziki",
    price: 1500,
    imageUrl: "gyros-tal.jpg",
  },
  {
    id: "11",
    name: "Hamburger",
    description: "Marhahús, cheddar",
    price: 1800,
    imageUrl: "hamburger.jpg",
  },
  {
    id: "12",
    name: "Sült csirke",
    description: "Ropogós bundában",
    price: 2200,
    imageUrl: "sult-csirke.jpg",
  },
  {
    id: "13",
    name: "Rántott sajt",
    description: "Tartárral",
    price: 1700,
    imageUrl: "rantott-sajt.jpg",
  },
  {
    id: "14",
    name: "Lazac steak",
    description: "Grillezett lazac",
    price: 3000,
    imageUrl: "lazac-steak.jpg",
  },
  {
    id: "15",
    name: "Vegetáriánus lasagne",
    description: "Zöldséges tészta",
    price: 2500,
    imageUrl: "vegetarianus-lasagne.jpg",
  },
  {
    id: "16",
    name: "Sült zöldségek",
    description: "Kemencében sült",
    price: 1200,
    imageUrl: "sult-zoldsegek.jpg",
  },
  {
    id: "17",
    name: "Sült krumpli",
    description: "Ropogós",
    price: 500,
    imageUrl: "sult-krumpli.jpg",
  },
  {
    id: "18",
    name: "Kóla",
    description: "0.5L",
    price: 1000,
    imageUrl: "kola.jpg",
  },
  {
    id: "26",
    name: "Királyi Burger",
    description: "Frissen készített, ízletes fogás",
    price: 2490,
    imageUrl: "kiralyi-burger.jpg",
  },
  {
    id: "27",
    name: "Arany Krumpli",
    description: "Frissen készített, ízletes fogás",
    price: 890,
    imageUrl: "arany-krumpli.jpg",
  },
  {
    id: "28",
    name: "Koronás Limonádé",
    description: "Frissen készített, ízletes fogás",
    price: 690,
    imageUrl: "koronas-limonade.jpg",
  },
];

const imageById: Record<string, string> = {
  "1": "margherita-pizza.jpg",
  "2": "caesar-salata.jpg",
  "3": "carbonara.jpg",
  "4": "pepperoni-pizza.jpg",
  "5": "hawaii-pizza.jpg",
  "6": "vegetarianus-pizza.jpg",
  "7": "california-roll.jpg",
  "8": "spicy-tuna-roll.jpg",
  "9": "salmon-nigiri.jpg",
  "10": "gyros-tal.jpg",
  "11": "hamburger.jpg",
  "12": "sult-csirke.jpg",
  "13": "rantott-sajt.jpg",
  "14": "lazac-steak.jpg",
  "15": "vegetarianus-lasagne.jpg",
  "16": "sult-zoldsegek.jpg",
  "17": "sult-krumpli.jpg",
  "18": "kola.jpg",
  "26": "kiralyi-burger.jpg",
  "27": "arany-krumpli.jpg",
  "28": "koronas-limonade.jpg",
};

const normalizeRestaurant = (restaurant: RestaurantItem): RestaurantItem => {
  const id = String(restaurant.id);

  return {
    ...restaurant,
    id,
    imageUrl:
      restaurant.imageUrl ?? restaurant.image_url ?? imageById[id] ?? "placeholder.jpg",
  };
};

function RestaurantCard({ item, index, onAddToCart }: RestaurantCardProps) {
  const [quantity, setQuantity] = useState(1);

  const fade = useRef(new Animated.Value(0)).current;
  const slide = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade, {
        toValue: 1,
        duration: 300,
        delay: index * 60,
        useNativeDriver: true,
      }),
      Animated.timing(slide, {
        toValue: 0,
        duration: 300,
        delay: index * 60,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fade, index, slide]);

  const handleAddToCart = () => {
    
    onAddToCart(item.name, quantity);
    setQuantity(1);
  };

  return (
    <Animated.View
      style={[
        styles.cardWrapper,
        { opacity: fade, transform: [{ translateY: slide }] },
      ]}
    >
      <View style={styles.card}>
        <View style={styles.cardImageBox}>
          <Image
            style={styles.restaurantImage}
          />

          <View style={styles.priceBadge}>
            <Text style={styles.priceText}>{item.price} Ft</Text>
          </View>
        </View>

        <View style={styles.cardBody}>
          <Text style={styles.cardName} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={styles.cardDesc} numberOfLines={2}>
            {item.description}
          </Text>
        </View>

        <View style={styles.quantityRow}>
          <Pressable
            onPress={() => setQuantity((q) => Math.max(1, q - 1))}
            style={styles.quantityBtn}
          >
            <Text style={styles.quantityBtnText}>−</Text>
          </Pressable>

          <Text style={styles.quantityText}>{quantity} db</Text>

          <Pressable
            onPress={() => setQuantity((q) => Math.min(99, q + 1))}
            style={styles.quantityBtn}
          >
            <Text style={styles.quantityBtnText}>+</Text>
          </Pressable>
        </View>

        <Pressable
          onPress={handleAddToCart}
          style={({ pressed }) => [
            styles.cartBtn,
            pressed && styles.btnPressed,
          ]}
        >
          <Text style={styles.cartBtnText}>+ Kosárba</Text>
        </Pressable>
      </View>
    </Animated.View>
  );
}

export default function RestaurantsScreen() {
  const [inMemoryRestaurants, setRestaurants] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<SortOption>("none");

  const showToast = (itemName: string, quantity: number) => {
    Toast.show({
      type: "success",
      text1: "Siker!",
      text2: `${quantity} db ${itemName} sikeresen a kosárba rakva!`,
    });
  };




  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />

      <Pressable onPress={() => router.back()} style={styles.backBtn}>
        <Text style={styles.backText}>← Vissza</Text>
      </Pressable>

      <View style={styles.brandRow}>
        <Image
          source={require("../../assets/mine/icons/royal-delivery-logo.png")}
          style={styles.crown}
        />
        <Text style={styles.brandName}>Royal Delivery</Text>
      </View>

      <Text style={styles.heading}>Étlap</Text>
      <Text style={styles.subheading}>Válassz kedvenc ételeidből</Text>

      <TextInput
        placeholder="Keresés..."
        placeholderTextColor={COLORS.muted}
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.searchInput}
      />

      <View style={styles.filterRow}>
        {["pizza", "saláta", "sushi", "burger", "ital"].map((filter) => (
          <Pressable
            key={filter}
            onPress={() =>
              setActiveFilter(activeFilter === filter ? null : filter)
            }
            style={[
              styles.filterBtn,
              activeFilter === filter && styles.filterBtnActive,
            ]}
          >
            <Text style={styles.filterText}>{filter}</Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.sortRow}>
        <Pressable
          onPress={() => setSortOption("priceAsc")}
          style={styles.sortBtn}
        >
          <Text style={styles.sortText}>Ár ↑</Text>
        </Pressable>

        <Pressable
          onPress={() => setSortOption("priceDesc")}
          style={styles.sortBtn}
        >
          <Text style={styles.sortText}>Ár ↓</Text>
        </Pressable>

        <Pressable onPress={() => setSortOption("name")} style={styles.sortBtn}>
          <Text style={styles.sortText}>Név</Text>
        </Pressable>
      </View>
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
  backBtn: {
    marginBottom: 10,
  },
  backText: {
    color: COLORS.muted,
  },
  brandRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 20,
  },
  crown: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  brandName: {
    color: COLORS.gold,
    fontWeight: "700",
  },
  heading: {
    fontSize: 32,
    fontWeight: "900",
    color: COLORS.text,
  },
  subheading: {
    color: COLORS.muted,
    marginBottom: 20,
  },
  searchInput: {
    backgroundColor: COLORS.surface,
    borderColor: COLORS.border,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    color: COLORS.text,
    marginBottom: 12,
  },
  filterRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 12,
  },
  filterBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  filterBtnActive: {
    backgroundColor: COLORS.gold,
  },
  filterText: {
    color: COLORS.text,
    fontSize: 12,
  },
  sortRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 12,
  },
  sortBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  sortText: {
    color: COLORS.text,
    fontSize: 12,
  },
  cardWrapper: {
    flex: 1,
    marginBottom: 16,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: "hidden",
  },
  cardImageBox: {
    height: 260,
    maxHeight: 600,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.surface,
  },
  restaurantImage: {
    width: "100%",
    height: "100%",
    maxHeight: 600,
    resizeMode: "cover",
  },
  priceBadge: {
    position: "absolute",
    bottom: 6,
    right: 6,
    backgroundColor: COLORS.gold,
    borderRadius: 6,
    paddingHorizontal: 6,
  },
  priceText: {
    color: COLORS.bg,
    fontWeight: "800",
  },
  cardBody: {
    padding: 10,
  },
  cardName: {
    color: COLORS.text,
    fontWeight: "800",
    fontSize: 14,
  },
  cardDesc: {
    color: COLORS.muted,
    fontSize: 12,
  },
  quantityRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginHorizontal: 10,
    marginTop: 6,
  },
  quantityBtn: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
  },
  quantityBtnText: {
    color: COLORS.gold,
    fontSize: 18,
    fontWeight: "900",
  },
  quantityText: {
    color: COLORS.text,
    fontSize: 13,
    fontWeight: "700",
    minWidth: 42,
    textAlign: "center",
  },
  cartBtn: {
    margin: 10,
    padding: 10,
    backgroundColor: COLORS.gold,
    borderRadius: 10,
    alignItems: "center",
  },
  cartBtnText: {
    color: COLORS.bg,
    fontWeight: "800",
  },
  btnPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.97 }],
  },
});
