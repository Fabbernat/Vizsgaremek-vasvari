// client-app/app/mealsScreen.tsx
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  FlatList,
  Image,
  Pressable,
  ScrollView,
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
  goldFaint: "#2a2010",
  green: "#22c55e",
  greenDim: "#14532d",
  text: "#f5f0e8",
  muted: "#9c9178",
  danger: "#ef4444",
  dangerFaint: "#2a1010",
};

// ── Animated meal card ────────────────────────────────────────────────────────
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
    Animated.spring(scaleAnim, { toValue: 0.97, useNativeDriver: true }).start();
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
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
        marginBottom: 16,
      }}
    >
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.card}
      >
        {/* Image */}
        <View style={styles.cardImageBox}>
          {item.imageUrl ? (
            <Image
              source={{ uri: item.imageUrl }}
              style={styles.cardImage}
              accessibilityLabel={`Kép: ${item.name}`}
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

        {/* Body */}
        <View style={styles.cardBody}>
          <Text style={styles.cardName} numberOfLines={1}>{item.name}</Text>
          <Text style={styles.cardDesc} numberOfLines={2}>{item.description}</Text>
        </View>

        {/* Add to cart */}
        <Pressable
          onPress={handleAddToCart}
          style={[styles.cartBtn, added && styles.cartBtnAdded]}
        >
          <Text style={[styles.cartBtnText, added && styles.cartBtnTextAdded]}>
            {added ? "✓ Hozzáadva" : "+ Kosárba"}
          </Text>
        </Pressable>

        {/* Gold accent */}
        <View style={styles.cardAccent} />
      </Pressable>
    </Animated.View>
  );
}

// ── Main screen ───────────────────────────────────────────────────────────────
export default function MealsScreen() {
  const [meals, setMeals] = useState<(Meal & { id: string })[]>([]);
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
    setError(null);
    const { data, error } = await supabase.from("meals").select("*");
    setLoading(false);
    if (error) { setError(error.message); return; }
    setMeals((data ?? []).map((m) => ({ ...m, id: m.id.toString() })));
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.bg} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Back */}
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backText}>← Vissza</Text>
        </Pressable>

        {/* Header */}
        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
          <View style={styles.brandRow}>
            <Text style={styles.crown}>👑</Text>
            <Text style={styles.brandName}>Royal Delivery</Text>
          </View>
          <Text style={styles.heading}>Étlap</Text>
          <Text style={styles.subheading}>Válassz kedvenc ételeidből</Text>
        </Animated.View>

        {/* Section header */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionIcon}>🍴</Text>
          <Text style={styles.sectionTitle}>Összes étel</Text>
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
        ) : meals.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>🍽</Text>
            <Text style={styles.emptyTitle}>Nincs elérhető étel</Text>
            <Text style={styles.emptyBody}>Jelenleg nincs megjelenítendő étel az étlapon.</Text>
          </View>
        ) : (
          meals.map((item, index) => (
            <MealCard key={item.id} item={item} index={index} />
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.bg },
  scrollContent: { paddingHorizontal: 24, paddingBottom: 48 },

  backBtn: { paddingTop: 20, paddingBottom: 8 },
  backText: { color: COLORS.muted, fontSize: 15, fontWeight: "500" },

  brandRow: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 28, marginTop: 8 },
  crown: { fontSize: 22 },
  brandName: { fontSize: 16, fontWeight: "700", color: COLORS.gold, letterSpacing: 0.5 },

  heading: {
    fontSize: 38, fontWeight: "900", color: COLORS.text,
    lineHeight: 44, letterSpacing: -0.5, marginBottom: 8,
  },
  subheading: { fontSize: 14, color: COLORS.muted, marginBottom: 28 },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  sectionIcon: { fontSize: 16 },
  sectionTitle: { fontSize: 15, fontWeight: "700", color: COLORS.gold, letterSpacing: 0.2 },

  /* Card */
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: "hidden",
  },
  cardImageBox: {
    position: "relative", height: 160, backgroundColor: COLORS.surface,
  },
  cardImage: { width: "100%", height: "100%", resizeMode: "cover" },
  cardImagePlaceholder: {
    flex: 1, justifyContent: "center", alignItems: "center",
    backgroundColor: COLORS.surface,
  },
  cardImageEmoji: { fontSize: 48 },
  priceBadge: {
    position: "absolute", bottom: 10, right: 10,
    backgroundColor: COLORS.gold, borderRadius: 8,
    paddingHorizontal: 10, paddingVertical: 4,
  },
  priceText: { fontSize: 13, fontWeight: "800", color: "#0f0e0c" },

  cardBody: { padding: 18, paddingBottom: 10 },
  cardName: { fontSize: 17, fontWeight: "800", color: COLORS.text, marginBottom: 6 },
  cardDesc: { fontSize: 13, color: COLORS.muted, lineHeight: 19 },

  cartBtn: {
    marginHorizontal: 18,
    marginBottom: 14,
    marginTop: 8,
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    paddingVertical: 11,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cartBtnAdded: {
    backgroundColor: COLORS.greenDim,
    borderColor: COLORS.green,
  },
  cartBtnText: { fontSize: 14, fontWeight: "700", color: COLORS.muted },
  cartBtnTextAdded: { color: COLORS.green },

  cardAccent: {
    height: 3, backgroundColor: COLORS.gold,
    marginHorizontal: 18, marginBottom: 16,
    borderRadius: 2, opacity: 0.45,
  },

  /* States */
  loadingBox: { paddingVertical: 80, alignItems: "center" },
  loadingText: { fontSize: 16, color: COLORS.muted },

  errorBox: { paddingVertical: 60, alignItems: "center", gap: 12 },
  errorIcon: { fontSize: 36 },
  errorText: { fontSize: 15, color: COLORS.danger, textAlign: "center" },
  retryBtn: {
    backgroundColor: COLORS.dangerFaint, borderRadius: 12,
    paddingVertical: 12, paddingHorizontal: 24,
    borderWidth: 1, borderColor: COLORS.danger, marginTop: 8,
  },
  retryBtnText: { color: COLORS.danger, fontWeight: "700", fontSize: 14 },

  emptyState: { flex: 1, alignItems: "center", paddingVertical: 80, gap: 12 },
  emptyIcon: { fontSize: 56, marginBottom: 8 },
  emptyTitle: { fontSize: 22, fontWeight: "800", color: COLORS.text },
  emptyBody: {
    fontSize: 14, color: COLORS.muted, textAlign: "center",
    lineHeight: 22, maxWidth: 260,
  },
});