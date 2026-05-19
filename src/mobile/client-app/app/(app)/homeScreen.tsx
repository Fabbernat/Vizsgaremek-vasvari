// client-app\(app)\app\(app)\homeScreen.tsx
import { supabase } from "@/supabase";
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
  View,
} from "react-native";
import { setGlobalIsLoggedIn, useGlobalAuth } from "@/stores/AuthStore";
import Cart from "./CartIconButton";
import { addToGuestCart } from "@/stores/CartStore";
import ProfileIconButton from "./ProfileIconButton";
import { useMeals } from "@/hooks/useMeals";

import Toast from "react-native-toast-message";
import SettingsIconButton from "./SettingsIconButton";
import SkeletonMealCard from "./SkeletonMealCard";
import { getMealImage } from "@/constants/MealImages";
import { useTheme } from "@react-navigation/native";
import { Meal } from "@/models/meal";
import SettingsIconButton from "./SettingsIconButton";

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

type HomeMeal = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  image_url?: string;
};

const fallbackData: HomeMeal[] = [
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
    description: "Ananász és sonka egy különleges kombinációban",
    price: 1700,
    imageUrl: "hawaii-pizza.jpg",
  },
  {
    id: "6",
    name: "Vegetáriánus Pizza",
    description: "Friss zöldségek és sajt egy egészséges választás",
    price: 1400,
    imageUrl: "vegetarianus-pizza.jpg",
  },
];

// Animated meal card
export function MealCard({
  item,
  index,
  onAddToCart,
}: {
  item: HomeMeal;
  index: number;
  onAddToCart: (name: string, quantity: number) => void;
}) {
  const [quantity, setQuantity] = useState(1);

  interface ExtendedColors extends Record<string, string> {
  surface: string;
}

  const colors: ExtendedColors = {
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
  }, [fadeAnim, index, slideAnim]);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.96,
      useNativeDriver: true,
    }).start();
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
        style={[
          HomeScreenStyles.card,
          { backgroundColor: colors.card, borderColor: colors.border },
        ]}
      >
        {/* Image area */}
        <View
          style={[
            HomeScreenStyles.cardImageBox,
            { backgroundColor: colors.surface },
          ]}
        >
          <Image
            source={getMealImage(item.imageUrl)}
            style={HomeScreenStyles.mealImage}
          />
          {/* Price badge */}
          <View
            style={[
              HomeScreenStyles.priceBadge,
              { backgroundColor: colors.gold },
            ]}
          >
            <Text style={HomeScreenStyles.priceText}>{item.price} Ft</Text>
          </View>
        </View>

        {/* Card body */}
        <View style={HomeScreenStyles.cardBody}>
          <Text
            style={[HomeScreenStyles.cardName, { color: colors.text }]}
            numberOfLines={1}
          >
            {item.name}
          </Text>
          <Text
            style={[HomeScreenStyles.cardDesc, { color: colors.muted }]}
            numberOfLines={2}
          >
            {item.description}
          </Text>
        </View>

        {/* Gold accent line */}
        <View
          style={[
            HomeScreenStyles.cardAccent,
            { backgroundColor: colors.gold },
          ]}
        />

        {/* Quantity row */}
        <View style={HomeScreenStyles.quantityRow}>
          <Pressable
            onPress={() => setQuantity((q) => Math.max(1, q - 1))}
            style={[
              HomeScreenStyles.quantityBtn,
              { backgroundColor: colors.surface, borderColor: colors.border },
            ]}
          >
            <Text
              style={[HomeScreenStyles.quantityBtnText, { color: colors.gold }]}
            >
              −
            </Text>
          </Pressable>

          <Text style={[HomeScreenStyles.quantityText, { color: colors.text }]}>
            {quantity} db
          </Text>

          <Pressable
            onPress={() => setQuantity((q) => Math.min(99, q + 1))}
            style={[
              HomeScreenStyles.quantityBtn,
              { backgroundColor: colors.surface, borderColor: colors.border },
            ]}
          >
            <Text
              style={[HomeScreenStyles.quantityBtnText, { color: colors.gold }]}
            >
              +
            </Text>
          </Pressable>
        </View>

        <Pressable
          onPress={() => {
            addToGuestCart(item as Meal, quantity);
            onAddToCart(item.name, quantity);
            setQuantity(1);
          }}
          style={({ pressed }) => [
            HomeScreenStyles.cartBtn,
            { backgroundColor: colors.gold },
            pressed && { opacity: 0.8, transform: [{ scale: 0.97 }] },
          ]}
        >
          <Text style={HomeScreenStyles.cartBtnText}>+ Kosárba</Text>
        </Pressable>
      </Pressable>
    </Animated.View>
  );
}

const normalizeMeal = (meal: HomeMeal): HomeMeal => ({
  ...meal,
  id: String(meal.id),
  imageUrl: meal.imageUrl ?? meal.image_url ?? "placeholder.jpg",
});

export default function HomeScreen() {
  const { meals, loading } = useMeals();
  const { isLoggedIn } = useGlobalAuth();
  const { colors } = useTheme();

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
  }, [headerAnim, logoAnim]);

  const displayData = (meals?.length ? meals : fallbackData).map(normalizeMeal);

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

  const showToast = (itemName: string, quantity: number) => {
    Toast.show({
      type: "success",
      text1: "Siker!",
      text2: `${quantity} db ${itemName} sikeresen a kosárba rakva!`,
    });
  };

  return (
    <View style={[HomeScreenStyles.root, { backgroundColor: colors.bg }]}>
      <StatusBar
        barStyle={colors.text === "#f5f0e8" ? "light-content" : "dark-content"}
        backgroundColor={colors.bg}
      />

      {/* Top bar */}
      <View style={HomeScreenStyles.topBar}>
        <Animated.View
          style={{ opacity: headerAnim, transform: [{ translateY: logoAnim }] }}
        >
          <Image
            source={require("../../assets/mine/icons/royal-delivery-logo.png")}
            style={HomeScreenStyles.crown}
          />
        </Animated.View>
        <View style={HomeScreenStyles.topActions}>
          <Cart style={HomeScreenStyles.iconBtn} />
          <ProfileIconButton style={HomeScreenStyles.iconBtn} />
          <SettingsIconButton style={HomeScreenStyles.iconBtn} />
        </View>
      </View>

      {/* Hero section */}
      <Animated.View
        style={[
          HomeScreenStyles.hero,
          {
            opacity: headerAnim,
            transform: [{ translateY: logoAnim }],
          },
        ]}
      >
        <Text style={[HomeScreenStyles.heroEyebrow, { color: colors.gold }]}>
          🚀 Gyors kiszállítás
        </Text>
        <Text style={[HomeScreenStyles.heroTitle, { color: colors.text }]}>
          Royal{"\n"}Delivery
        </Text>
        <Text style={[HomeScreenStyles.heroSubtitle, { color: colors.muted }]}>
          Kiszállítás olcsón és egyszerűen — egyenesen az ajtódhoz.
        </Text>

        <Pressable
          onPress={() => router.push("/MealsScreen")}
          style={({ pressed }) => [
            HomeScreenStyles.heroCta,
            { backgroundColor: colors.gold },
            pressed && { opacity: 0.85, transform: [{ scale: 0.97 }] },
          ]}
        >
          <Text style={HomeScreenStyles.heroCtaText}>Ételek böngészése →</Text>
        </Pressable>
      </Animated.View>

      {/* Section header */}
      <View style={HomeScreenStyles.sectionHeader}>
        <View
          style={[
            HomeScreenStyles.sectionDot,
            { backgroundColor: colors.gold },
          ]}
        />
        <Text style={[HomeScreenStyles.sectionTitle, { color: colors.muted }]}>
          Ajánlott ételek
        </Text>
        <View
          style={[
            HomeScreenStyles.sectionLine,
            { backgroundColor: colors.border },
          ]}
        />
      </View>

      {/* Meal grid — skeleton while loading */}
      {loading ? (
        <FlatList
          data={Array(6).fill(null)}
          keyExtractor={(_, i) => `skeleton-${i}`}
          numColumns={2}
          columnWrapperStyle={{ gap: 12 }}
          contentContainerStyle={{ paddingBottom: 80 }}
          renderItem={({ index }) => <SkeletonMealCard index={index} />}
          scrollEnabled={false}
        />
      ) : (
        <FlatList
          data={displayData}
          numColumns={2}
          keyExtractor={(item) => item.id.toString()}
          scrollEnabled={false}
          contentContainerStyle={HomeScreenStyles.grid}
          columnWrapperStyle={HomeScreenStyles.gridRow}
          ListEmptyComponent={
            <View style={HomeScreenStyles.emptyContainer}>
              <Text style={HomeScreenStyles.emptyIcon}>🍽</Text>
              <Text
                style={[HomeScreenStyles.emptyText, { color: colors.muted }]}
              >
                Nincs étel
              </Text>
            </View>
          }
          renderItem={({ item, index }) => (
            <MealCard item={item} index={index} onAddToCart={showToast} />
          )}
        />
      )}

      {/* Auth buttons */}
      <View style={HomeScreenStyles.authSection}>
        {!isLoggedIn ? (
          <View style={HomeScreenStyles.authRow}>
            <Pressable
              onPress={() => router.push("/LoginScreen")}
              style={({ pressed }) => [
                HomeScreenStyles.authBtn,
                { backgroundColor: colors.blue, borderColor: colors.blue },
                pressed && HomeScreenStyles.btnPressed,
              ]}
            >
              <Text style={[HomeScreenStyles.authBtnText, { color: "#fff" }]}>
                Bejelentkezés
              </Text>
            </Pressable>
            <Pressable
              onPress={() => router.push("/RegisterScreen")}
              style={({ pressed }) => [
                HomeScreenStyles.authBtn,
                { backgroundColor: colors.green, borderColor: colors.green },
                pressed && HomeScreenStyles.btnPressed,
              ]}
            >
              <Text style={[HomeScreenStyles.authBtnText, { color: "#fff" }]}>
                Regisztráció
              </Text>
            </Pressable>
          </View>
        ) : (
          <Pressable
            onPress={logout}
            style={({ pressed }) => [
              HomeScreenStyles.authBtn,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                flex: 0,
              },
              pressed && HomeScreenStyles.btnPressed,
            ]}
          >
            <Text
              style={[HomeScreenStyles.authBtnText, { color: colors.danger }]}
            >
              Kijelentkezés
            </Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

export const HomeScreenStyles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#0f0e0c",
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  crown: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },

  /* Top bar */
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 16,
    paddingBottom: 8,
  },
  topActions: {
    flexDirection: "row",
    gap: 8,
  },
  iconBtn: {
    backgroundColor: "#1c1a16",
    borderRadius: 12,
    padding: 8,
    borderWidth: 1,
    borderColor: "#2e2b22",
  },

  /* Hero */
  hero: {
    paddingTop: 24,
    paddingBottom: 32,
  },
  heroEyebrow: {
    fontSize: 13,
    fontWeight: "600",
    color: "#f0b429",
    letterSpacing: 2,
    textTransform: "uppercase",
    marginBottom: 10,
  },
  heroTitle: {
    fontSize: 52,
    fontWeight: "900",
    color: "#f5f0e8",
    lineHeight: 56,
    letterSpacing: -1,
    marginBottom: 14,
  },
  heroSubtitle: {
    fontSize: 15,
    color: "#9c9178",
    lineHeight: 22,
    marginBottom: 28,
    maxWidth: 280,
  },
  heroCta: {
    backgroundColor: "#f0b429",
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
    backgroundColor: "#f0b429",
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#9c9178",
    letterSpacing: 1.5,
    textTransform: "uppercase",
  },
  sectionLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#2e2b22",
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
    backgroundColor: "#242018",
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#2e2b22",
  },
  cardImageBox: {
    height: 260,
    maxHeight: 600,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.surface,
  },

  priceBadge: {
    position: "absolute",
    bottom: 8,
    right: 8,
    backgroundColor: "#f0b429",
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
    color: "#f5f0e8",
    marginBottom: 4,
  },
  cardDesc: {
    fontSize: 12,
    color: "#9c9178",
    lineHeight: 17,
  },
  cardAccent: {
    height: 3,
    backgroundColor: "#f0b429",
    marginHorizontal: 12,
    marginBottom: 12,
    borderRadius: 2,
    opacity: 0.5,
  },

  /* Loading / empty */

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
    color: "#9c9178",
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
    borderColor: "#2e2b22",
  },

  authBtnText: {
    color: "#f5f0e8",
    fontSize: 15,
    fontWeight: "700",
  },
  btnPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.97 }],
  },
  cartBtn: {
    marginHorizontal: 12,
    marginBottom: 12,
    padding: 10,
    backgroundColor: "#f0b429",
    borderRadius: 10,
    alignItems: "center",
  },

  cartBtnText: {
    color: "#0f0e0c",
    fontWeight: "800",
  },
  quantityRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginHorizontal: 12,
    marginBottom: 10,
  },

  quantityBtn: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#1c1a16",
    borderWidth: 1,
    borderColor: "#2e2b22",
    alignItems: "center",
    justifyContent: "center",
  },

  quantityBtnText: {
    color: "#f0b429",
    fontSize: 18,
    fontWeight: "900",
  },

  quantityText: {
    color: "#f5f0e8",
    fontSize: 13,
    fontWeight: "700",
    minWidth: 42,
    textAlign: "center",
  },
  mealImage: {
    width: "100%",
    height: "100%",
    maxHeight: 600,
    resizeMode: "cover",
  },
});
