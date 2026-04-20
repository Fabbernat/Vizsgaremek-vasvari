import {
  Image,
  View,
  Text,
  Pressable,
  FlatList,
  StyleSheet,
  Animated,
  StatusBar,
} from "react-native";
import { router } from "expo-router";
import { supabase } from "@/supabase";
import { useRef, useEffect } from "react";
import { useMeals } from "./useMeals";
import Cart from "./cartIconButton";
import { Meal } from "./models/meal";
import ProfileIconButton from "./profileIconButton";
import { useGlobalAuth } from "./authStore";
import { setGlobalIsLoggedIn } from "./authStore";
import Toast from "react-native-toast-message";

const COLORS = {
  bg: "#0f0e0c",
  surface: "#1c1a16",
  card: "#242018",
  border: "#2e2b22",
  gold: "#f0b429",
  goldLight: "#fcd34d",
  green: "#22c55e",
  blue: "#3b82f6",
  text: "#f5f0e8",
  muted: "#9c9178",
  danger: "#ef4444",
};

const fallbackData = [
  { id: "1", name: "Étel 1", description: "Leírás 1", price: 1590, imageUrl: "" },
  { id: "2", name: "Étel 2", description: "Leírás 2", price: 1990, imageUrl: "" },
  { id: "3", name: "Étel 3", description: "Leírás 3", price: 2990, imageUrl: "" },
  { id: "4", name: "Étel 4", description: "Leírás 4", price: 3990, imageUrl: "" },
  { id: "5", name: "Étel 5", description: "Leírás 5", price: 3490, imageUrl: "" },
  { id: "6", name: "Étel 6", description: "Leírás 6", price: 2490, imageUrl: "" },
];

// Animated meal card
function MealCard({ item, index }: { item: any; index: number }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(24)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        delay: index * 80,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400,
        delay: index * 80,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, { toValue: 0.96, useNativeDriver: true }).start();
  };
  const handlePressOut = () => {
    Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true }).start();
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
          {/* Price badge */}
          <View style={styles.priceBadge}>
            <Text style={styles.priceText}>{item.price} Ft</Text>
          </View>
        </View>

        {/* Card body */}
        <View style={styles.cardBody}>
          <Text style={styles.cardName} numberOfLines={1}>{item.name}</Text>
          <Text style={styles.cardDesc} numberOfLines={2}>{item.description}</Text>
        </View>

        {/* Gold accent line */}
        <View style={styles.cardAccent} />
      </Pressable>
    </Animated.View>
  );
}

export default function HomeScreen() {
  const { meals, loading } = useMeals();
  const { isLoggedIn } = useGlobalAuth();

  const headerAnim = useRef(new Animated.Value(0)).current;
  const logoAnim = useRef(new Animated.Value(-20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(headerAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(logoAnim, {
        toValue: 0,
        tension: 60,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const dataToShow = (meals ?? []).map((meal: Meal) => ({
    ...meal,
    id: meal.id.toString(),
  }));
  const displayData = dataToShow.length > 0 ? dataToShow : fallbackData;

  const logout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      Toast.show({
        type: "error",
        text1: "Hiba",
        text2: "Kijelentkezés sikertelen",
      });
    } else {
      setGlobalIsLoggedIn(false); // ← UI visszavált login/register gombokra
      Toast.show({
        type: "success",
        text1: "Viszlát!",
        text2: "Sikeres kijelentkezés",
      });
    }
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.bg} />

      {/* Top bar */}
      <View style={styles.topBar}>
        <Animated.View style={{ opacity: headerAnim, transform: [{ translateY: logoAnim }] }}>
          <Text style={styles.brandSmall}>👑</Text>
        </Animated.View>
        <View style={styles.topActions}>
          <Cart style={styles.iconBtn} />
          <ProfileIconButton style={styles.iconBtn} />
        </View>
      </View>

      {/* Hero section */}
      <Animated.View
        style={[
          styles.hero,
          {
            opacity: headerAnim,
            transform: [{ translateY: logoAnim }],
          },
        ]}
      >
        <Text style={styles.heroEyebrow}>🚀 Gyors kiszállítás</Text>
        <Text style={styles.heroTitle}>Royal{"\n"}Delivery</Text>
        <Text style={styles.heroSubtitle}>
          Kiszállítás olcsón és egyszerűen — egyenesen az ajtódhoz.
        </Text>

        <Pressable
          onPress={() => router.push("/meals")}
          style={({ pressed }) => [
            styles.heroCta,
            pressed && { opacity: 0.85, transform: [{ scale: 0.97 }] },
          ]}
        >
          <Text style={styles.heroCtaText}>Ételek böngészése →</Text>
        </Pressable>
      </Animated.View>

      {/* Section header */}
      <View style={styles.sectionHeader}>
        <View style={styles.sectionDot} />
        <Text style={styles.sectionTitle}>Ajánlott ételek</Text>
        <View style={styles.sectionLine} />
      </View>

      {/* Meal grid */}
      {loading ? (
        <View style={styles.loadingBox}>
          <Text style={styles.loadingText}>⏳ Ételek betöltése...</Text>
        </View>
      ) : (
        <FlatList
          data={displayData}
          numColumns={2}
          keyExtractor={(item) => item.id.toString()}
          scrollEnabled={false}
          contentContainerStyle={styles.grid}
          columnWrapperStyle={styles.gridRow}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyIcon}>🍽</Text>
              <Text style={styles.emptyText}>Nincs étel</Text>
            </View>
          }
          renderItem={({ item, index }) => (
            <MealCard item={item} index={index} />
          )}
        />
      )}

      {/* Auth buttons */}
      <View style={styles.authSection}>
        {!isLoggedIn ? (
          <View style={styles.authRow}>
            <Pressable
              onPress={() => router.push("/login")}
              style={({ pressed }) => [styles.authBtn, styles.loginBtn, pressed && styles.btnPressed]}
            >
              <Text style={styles.authBtnText}>Bejelentkezés</Text>
            </Pressable>
            <Pressable
              onPress={() => router.push("/register")}
              style={({ pressed }) => [styles.authBtn, styles.registerBtn, pressed && styles.btnPressed]}
            >
              <Text style={styles.authBtnText}>Regisztráció</Text>
            </Pressable>
          </View>
        ) : (
          <Pressable
            onPress={logout}
            style={({ pressed }) => [styles.authBtn, styles.logoutBtn, pressed && styles.btnPressed]}
          >
            <Text style={[styles.authBtnText, { color: COLORS.danger }]}>Kijelentkezés</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.bg,
    paddingHorizontal: 16,
    paddingBottom: 32,
  },

  /* Top bar */
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 16,
    paddingBottom: 8,
  },
  brandSmall: {
    fontSize: 18,
    fontWeight: "800",
    color: COLORS.gold,
    letterSpacing: 1,
  },
  topActions: {
    flexDirection: "row",
    gap: 8,
  },
  iconBtn: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  /* Hero */
  hero: {
    paddingTop: 24,
    paddingBottom: 32,
  },
  heroEyebrow: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.gold,
    letterSpacing: 2,
    textTransform: "uppercase",
    marginBottom: 10,
  },
  heroTitle: {
    fontSize: 52,
    fontWeight: "900",
    color: COLORS.text,
    lineHeight: 56,
    letterSpacing: -1,
    marginBottom: 14,
  },
  heroSubtitle: {
    fontSize: 15,
    color: COLORS.muted,
    lineHeight: 22,
    marginBottom: 28,
    maxWidth: 280,
  },
  heroCta: {
    backgroundColor: COLORS.gold,
    paddingVertical: 15,
    paddingHorizontal: 28,
    borderRadius: 14,
    alignSelf: "flex-start",
  },
  heroCtaText: {
    color: "#0f0e0c",
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 0.3,
  },

  /* Section header */
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 16,
  },
  sectionDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.gold,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: COLORS.muted,
    letterSpacing: 1.5,
    textTransform: "uppercase",
  },
  sectionLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.border,
  },

  /* Grid */
  grid: {
    gap: 12,
  },
  gridRow: {
    gap: 12,
  },

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
    position: "relative",
    height: 110,
    backgroundColor: COLORS.surface,
  },
  cardImage: {
    width: "100%",
    height: "100%",
  },
  cardImagePlaceholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.surface,
  },
  cardImageEmoji: {
    fontSize: 36,
  },
  priceBadge: {
    position: "absolute",
    bottom: 8,
    right: 8,
    backgroundColor: COLORS.gold,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  priceText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#0f0e0c",
  },
  cardBody: {
    padding: 12,
  },
  cardName: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 4,
  },
  cardDesc: {
    fontSize: 12,
    color: COLORS.muted,
    lineHeight: 17,
  },
  cardAccent: {
    height: 3,
    backgroundColor: COLORS.gold,
    marginHorizontal: 12,
    marginBottom: 12,
    borderRadius: 2,
    opacity: 0.5,
  },

  /* Loading / empty */
  loadingBox: {
    paddingVertical: 40,
    alignItems: "center",
  },
  loadingText: {
    fontSize: 16,
    color: COLORS.muted,
  },
  emptyContainer: {
    alignItems: "center",
    paddingVertical: 48,
  },
  emptyIcon: {
    fontSize: 40,
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 16,
    color: COLORS.muted,
  },

  /* Auth */
  authSection: {
    marginTop: 28,
  },
  authRow: {
    flexDirection: "row",
    gap: 12,
  },
  authBtn: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  loginBtn: {
    backgroundColor: COLORS.blue,
    borderColor: COLORS.blue,
  },
  registerBtn: {
    backgroundColor: COLORS.green,
    borderColor: COLORS.green,
  },
  logoutBtn: {
    backgroundColor: COLORS.surface,
    flex: 0,
  },
  authBtnText: {
    color: COLORS.text,
    fontSize: 15,
    fontWeight: "700",
  },
  btnPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.97 }],
  },
});