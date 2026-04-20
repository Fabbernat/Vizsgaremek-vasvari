import { useEffect, useRef, useState } from "react";
import {
  Animated,
  FlatList,
  Image,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { router } from "expo-router";
import { supabase } from "../supabase";
import { Meal } from "./models/meal";
import { addToGuestCart } from "./cartStore";

const COLORS = {
  bg: "#0f0e0c",
  surface: "#1c1a16",
  card: "#242018",
  border: "#2e2b22",
  gold: "#f0b429",
  goldDim: "#7a5c15",
  green: "#22c55e",
  greenDim: "#14532d",
  text: "#f5f0e8",
  muted: "#9c9178",
  danger: "#ef4444",
};

// ── Animated meal card with "Kosárba tesz" button ────────────────────────────
function MealCard({ item, index }: { item: Meal & { id: string }; index: number }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(28)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const [added, setAdded] = useState(false);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1, duration: 400, delay: index * 70, useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0, duration: 400, delay: index * 70, useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handlePressIn = () =>
    Animated.spring(scaleAnim, { toValue: 0.96, useNativeDriver: true }).start();
  const handlePressOut = () =>
    Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true }).start();

  const handleAddToCart = () => {
    addToGuestCart(item);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <Animated.View
      style={{
        flex: 1,
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
      }}
    >
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.card}
      >
        {/* Image area */}
        <View style={styles.cardImageBox}>
          {item.imageUrl ? (
            <Image
              source={{ uri: item.imageUrl }}
              style={styles.cardImage}
              accessibilityLabel={`Egy kép erről: ${item.name}`}
            />
          ) : (
            <View style={styles.cardImagePlaceholder}>
              <Text style={styles.cardImageEmoji}>🍽️</Text>
            </View>
          )}
          <View style={styles.priceBadge}>
            <Text style={styles.priceText}>{item.price} Ft</Text>
          </View>
        </View>

        {/* Card body */}
        <View style={styles.cardBody}>
          <Text style={styles.cardName} numberOfLines={1}>{item.name}</Text>
          <Text style={styles.cardDesc} numberOfLines={2}>{item.description}</Text>
        </View>

        {/* Add to cart button */}
        <Pressable
          onPress={handleAddToCart}
          style={[styles.cartBtn, added && styles.cartBtnAdded]}
        >
          <Text style={[styles.cartBtnText, added && styles.cartBtnTextAdded]}>
            {added ? "✓ Hozzáadva" : "+ Kosárba"}
          </Text>
        </Pressable>

        {/* Gold accent line */}
        <View style={styles.cardAccent} />
      </Pressable>
    </Animated.View>
  );
}

// ── Main screen ───────────────────────────────────────────────────────────────
export default function MealsScreen() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.spring(slideAnim, { toValue: 0, tension: 60, friction: 8, useNativeDriver: true }),
    ]).start();

    fetchMeals();
  }, []);

  const fetchMeals = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("meals").select("*");
    setLoading(false);
    if (error) { setError(error.message); return; }
    setMeals(data ?? []);
  };

  const displayData = (meals ?? []).map((meal) => ({
    ...meal,
    id: meal.id.toString(),
  }));

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.bg} />

      {/* Back button */}
      <Pressable onPress={() => router.back()} style={styles.backBtn}>
        <Text style={styles.backText}>← Vissza</Text>
      </Pressable>

      <Animated.View
        style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}
      >
        {/* Brand */}
        <View style={styles.brandRow}>
          <Text style={styles.crown}>👑</Text>
          <Text style={styles.brandName}>Royal Delivery</Text>
        </View>

        {/* Heading */}
        <Text style={styles.heading}>Étlap</Text>
        <Text style={styles.subheading}>Válassz kedvenc ételeidből</Text>
      </Animated.View>

      {/* Section header */}
      <View style={styles.sectionHeader}>
        <View style={styles.sectionDot} />
        <Text style={styles.sectionTitle}>Összes étel</Text>
        <View style={styles.sectionLine} />
      </View>

      {/* Content */}
      {error ? (
        <View style={styles.errorBox}>
          <Text style={styles.errorIcon}>⚠️</Text>
          <Text style={styles.errorText}>Hiba: {error}</Text>
          <Pressable onPress={fetchMeals} style={styles.retryBtn}>
            <Text style={styles.retryBtnText}>Újrapróbálás</Text>
          </Pressable>
        </View>
      ) : loading ? (
        <View style={styles.loadingBox}>
          <Text style={styles.loadingText}>⏳ Ételek betöltése...</Text>
        </View>
      ) : (
        <FlatList
          data={displayData}
          numColumns={2}
          keyExtractor={(item) => item.id}
          scrollEnabled={true}
          contentContainerStyle={styles.grid}
          columnWrapperStyle={styles.gridRow}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyIcon}>🍽</Text>
              <Text style={styles.emptyText}>Nincs elérhető étel</Text>
            </View>
          }
          renderItem={({ item, index }) => (
            <MealCard item={item} index={index} />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.bg,
    paddingHorizontal: 16,
  },

  backBtn: { paddingTop: 20, paddingBottom: 8 },
  backText: { color: COLORS.muted, fontSize: 15, fontWeight: "500" },

  brandRow: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 20 },
  crown: { fontSize: 22 },
  brandName: { fontSize: 16, fontWeight: "700", color: COLORS.gold, letterSpacing: 0.5 },

  heading: {
    fontSize: 42, fontWeight: "900", color: COLORS.text,
    lineHeight: 46, letterSpacing: -0.5, marginBottom: 8,
  },
  subheading: { fontSize: 15, color: COLORS.muted, marginBottom: 24 },

  sectionHeader: {
    flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 16,
  },
  sectionDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.gold },
  sectionTitle: {
    fontSize: 13, fontWeight: "700", color: COLORS.muted,
    letterSpacing: 1.5, textTransform: "uppercase",
  },
  sectionLine: { flex: 1, height: 1, backgroundColor: COLORS.border },

  grid: { gap: 12, paddingBottom: 40 },
  gridRow: { gap: 12 },

  /* Card */
  card: {
    flex: 1,
    backgroundColor: COLORS.card,
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cardImageBox: {
    position: "relative", height: 110, backgroundColor: COLORS.surface,
  },
  cardImage: { width: "100%", height: "100%" },
  cardImagePlaceholder: {
    flex: 1, justifyContent: "center", alignItems: "center",
    backgroundColor: COLORS.surface,
  },
  cardImageEmoji: { fontSize: 36 },
  priceBadge: {
    position: "absolute", bottom: 8, right: 8,
    backgroundColor: COLORS.gold, borderRadius: 8,
    paddingHorizontal: 8, paddingVertical: 3,
  },
  priceText: { fontSize: 11, fontWeight: "800", color: "#0f0e0c" },
  cardBody: { padding: 12, paddingBottom: 8 },
  cardName: { fontSize: 14, fontWeight: "700", color: COLORS.text, marginBottom: 4 },
  cardDesc: { fontSize: 12, color: COLORS.muted, lineHeight: 17 },

  /* Cart button */
  cartBtn: {
    marginHorizontal: 12,
    marginBottom: 10,
    marginTop: 6,
    backgroundColor: COLORS.surface,
    borderRadius: 10,
    paddingVertical: 9,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cartBtnAdded: {
    backgroundColor: COLORS.greenDim,
    borderColor: COLORS.green,
  },
  cartBtnText: { fontSize: 13, fontWeight: "700", color: COLORS.muted },
  cartBtnTextAdded: { color: COLORS.green },

  cardAccent: {
    height: 3, backgroundColor: COLORS.gold,
    marginHorizontal: 12, marginBottom: 12,
    borderRadius: 2, opacity: 0.4,
  },

  /* Loading / error / empty */
  loadingBox: { paddingVertical: 60, alignItems: "center" },
  loadingText: { fontSize: 16, color: COLORS.muted },

  errorBox: { paddingVertical: 60, alignItems: "center", gap: 12 },
  errorIcon: { fontSize: 36 },
  errorText: { fontSize: 15, color: COLORS.danger, textAlign: "center" },
  retryBtn: {
    backgroundColor: COLORS.surface, borderRadius: 12,
    paddingVertical: 12, paddingHorizontal: 24,
    borderWidth: 1, borderColor: COLORS.border, marginTop: 8,
  },
  retryBtnText: { color: COLORS.gold, fontWeight: "700", fontSize: 14 },

  emptyContainer: { alignItems: "center", paddingVertical: 60 },
  emptyIcon: { fontSize: 40, marginBottom: 12 },
  emptyText: { fontSize: 16, color: COLORS.muted },
});