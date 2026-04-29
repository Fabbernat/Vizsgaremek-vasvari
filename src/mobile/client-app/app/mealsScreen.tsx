// client-app/app/mealsScreen.tsx
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  FlatList,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
} from "react-native";
import Toast from "react-native-toast-message";
import { addToGuestCart } from "./cartStore";

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
  danger: "#ef4444",
  dangerFaint: "#2a1010",
};

const mealsData = [
  {
    id: "1",
    name: "Margherita Pizza",
    description: "Friss paradicsom, mozzarella és bazsalikom",
    price: 1500,
  },
  {
    id: "2",
    name: "Caesar Saláta",
    description: "Ropogós saláta csirkével és krutonnal",
    price: 1200,
  },
  {
    id: "3",
    name: "Spaghetti Carbonara",
    description: "Klasszikus olasz tészta szalonnával és tojással",
    price: 1300,
  },
  {
    id: "4",
    name: "Pepperoni Pizza",
    description: "Szaftos pepperoni és olvadt sajt",
    price: 1600,
  },
  {
    id: "5",
    name: "Hawaii Pizza",
    description: "Ananász és sonka",
    price: 1700,
  },
  {
    id: "6",
    name: "Vegetáriánus Pizza",
    description: "Friss zöldségek és sajt",
    price: 1400,
  },
  {
    id: "7",
    name: "California Roll",
    description: "Rák, avokádó, uborka",
    price: 2000,
  },
  {
    id: "8",
    name: "Spicy Tuna Roll",
    description: "Fűszeres tonhal",
    price: 2200,
  },
  {
    id: "9",
    name: "Salmon Nigiri",
    description: "Friss lazac rizsen",
    price: 1800,
  },
  {
    id: "10",
    name: "Gyros tál",
    description: "Csirke, krumpli, tzatziki",
    price: 1500,
  },
  {
    id: "11",
    name: "Hamburger",
    description: "Marhahús, cheddar",
    price: 1800,
  },
  {
    id: "12",
    name: "Sült csirke",
    description: "Ropogós bundában",
    price: 2200,
  },
  { id: "13", name: "Rántott sajt", description: "Tartárral", price: 1700 },
  {
    id: "14",
    name: "Lazac steak",
    description: "Grillezett lazac",
    price: 3000,
  },
  {
    id: "15",
    name: "Vegetáriánus lasagne",
    description: "Zöldséges tészta",
    price: 2500,
  },
  {
    id: "16",
    name: "Sült zöldségek",
    description: "Kemencében sült",
    price: 1200,
  },
  { id: "17", name: "Sült krumpli", description: "Ropogós", price: 500 },
  { id: "18", name: "Kóla", description: "0.5L", price: 1000 },
  {
    id: "26",
    name: "Királyi Burger",
    description: "Frissen készített, ízletes fogás",
    price: 2490,
  },
  {
    id: "27",
    name: "Arany Krumpli",
    description: "Frissen készített, ízletes fogás",
    price: 890,
  },
  {
    id: "28",
    name: "Koronás Limonádé",
    description: "Frissen készített, ízletes fogás",
    price: 690,
  },
];

// ── Card ─────────────────────────────────────────────────
function MealCard({ item, index, onAddToCart }: any) {
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

  return (
    <Animated.View
      style={[
        styles.cardWrapper,
        { opacity: fade, transform: [{ translateY: slide }] },
      ]}
    >
      <View style={styles.card}>
        <View style={styles.cardImageBox}>
          <Text style={styles.cardImageEmoji}>🍽️</Text>
          <View style={styles.priceBadge}>
            <Text style={styles.priceText}>{item.price} Ft</Text>
          </View>
        </View>
        <View style={styles.cardBody}>
          <Text style={styles.cardName}>{item.name}</Text>
          <Text style={styles.cardDesc}>{item.description}</Text>
        </View>
        <Pressable
          onPress={() => {
            addToGuestCart(item);
            onAddToCart(item.name);
          }}
          style={({ pressed }) => [
            styles.cartBtn,
            pressed && { opacity: 0.8, transform: [{ scale: 0.97 }] },
          ]}
        >
          <Text style={styles.cartBtnText}>+ Kosárba</Text>
        </Pressable>
      </View>
    </Animated.View>
  );
}

// ── Screen ───────────────────────────────────────────────
export default function MealsScreen() {
  const [meals, setMeals] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
const [activeFilter, setActiveFilter] = useState<string | null>(null);
const [sortOption, setSortOption] = useState<"none" | "priceAsc" | "priceDesc" | "name">("none");

  useEffect(() => {
    setMeals(mealsData);
  }, []);

  // ✅ Lean showToast: just delegate to the library.
  //    <Toast /> is already mounted once in your Layout — no need to render it here.
  const showToast = (itemName: string) => {
    Toast.show({
      type: "success",
      text1: "Siker!",
      text2: `1 db ${itemName} sikeresen a kosárba rakva!`,
    });
  };

  const filteredMeals = meals
  .filter((meal) => {
    const query = searchQuery.toLowerCase();

    const matchesSearch =
      meal.name.toLowerCase().includes(query) ||
      meal.description.toLowerCase().includes(query);

    const matchesFilter = activeFilter
      ? meal.name.toLowerCase().includes(activeFilter)
      : true;

    return matchesSearch && matchesFilter;
  })
  .sort((a, b) => {
    switch (sortOption) {
      case "priceAsc":
        return a.price - b.price;
      case "priceDesc":
        return b.price - a.price;
      case "name":
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <Pressable onPress={() => router.back()} style={styles.backBtn}>
        <Text style={styles.backText}>← Vissza</Text>
      </Pressable>
      <View style={styles.brandRow}>
        <Image source={require("../assets/mine/icons/rd-logo.png")} style={styles.crown}  />
        <Text style={styles.brandName}>Royal Delivery</Text>
      </View>
      <Text style={styles.heading}>Étlap</Text>
      <Text style={styles.subheading}>Válassz kedvenc ételeidből</Text>

      {/* 🔍 KERESŐ */}
<TextInput
  placeholder="Keresés..."
  placeholderTextColor={COLORS.muted}
  value={searchQuery}
  onChangeText={setSearchQuery}
  style={styles.searchInput}
/>

{/* 🧩 SZŰRŐK */}
<View style={styles.filterRow}>
  {["pizza", "saláta", "sushi", "burger", "ital"].map((f) => (
    <Pressable
      key={f}
      onPress={() => setActiveFilter(activeFilter === f ? null : f)}
      style={[
        styles.filterBtn,
        activeFilter === f && styles.filterBtnActive,
      ]}
    >
      <Text style={styles.filterText}>{f}</Text>
    </Pressable>
  ))}
</View>

{/* 🔃 RENDEZÉS */}
<View style={styles.sortRow}>
  <Pressable onPress={() => setSortOption("priceAsc")} style={styles.sortBtn}>
    <Text style={styles.sortText}>Ár ↑</Text>
  </Pressable>
  <Pressable onPress={() => setSortOption("priceDesc")} style={styles.sortBtn}>
    <Text style={styles.sortText}>Ár ↓</Text>
  </Pressable>
  <Pressable onPress={() => setSortOption("name")} style={styles.sortBtn}>
    <Text style={styles.sortText}>Név</Text>
  </Pressable>
</View>

      <FlatList
        data={filteredMeals}
        keyExtractor={(i) => i.id}
        numColumns={2}
        columnWrapperStyle={{ gap: 16 }}
        contentContainerStyle={{ paddingBottom: 80 }}
        renderItem={({ item, index }) => (
          <MealCard item={item} index={index} onAddToCart={showToast} />
        )}
      />
      {/* ❌ Do NOT render <Toast /> here — it lives in Layout already */}
    </View>
  );
}

// ── Styles ───────────────────────────────────────────────
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.bg,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  backBtn: { marginBottom: 10 },
  backText: { color: COLORS.muted },
  brandRow: { flexDirection: "row", gap: 8, marginBottom: 20 },
  crown: {
  width: 100,
  height: 100,
  resizeMode: "contain",
},
  brandName: { color: COLORS.gold, fontWeight: "700" },
  heading: { fontSize: 32, fontWeight: "900", color: COLORS.text },
  subheading: { color: COLORS.muted, marginBottom: 20 },
  cardWrapper: { flex: 1, marginBottom: 16 },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: "hidden",
  },
  cardImageBox: {
    height: 110,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.surface,
  },
  cardImageEmoji: { fontSize: 36 },
  priceBadge: {
    position: "absolute",
    bottom: 6,
    right: 6,
    backgroundColor: COLORS.gold,
    borderRadius: 6,
    paddingHorizontal: 6,
  },
  priceText: { fontWeight: "800" },
  cardBody: { padding: 10 },
  cardName: { color: COLORS.text, fontWeight: "800", fontSize: 14 },
  cardDesc: { color: COLORS.muted, fontSize: 12 },
  cartBtn: {
    margin: 10,
    padding: 10,
    backgroundColor: COLORS.gold,
    borderRadius: 10,
    alignItems: "center",
  },
  cartBtnText: { color: "#0f0e0c", fontWeight: "800" },
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
});
