// client-app\(app)\app\(app)\homeScreen.tsx
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
import { useRef, useEffect, useState } from "react";
import { useMeals } from "./useMeals";
import Cart from "./cartIconButton";
import { Meal } from "../models/meal";
import ProfileIconButton from "./profileIconButton";
import { useGlobalAuth , setGlobalIsLoggedIn } from "./authStore";
import { addToGuestCart } from "./cartStore";

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
  { id: "1", name: "Margherita Pizza", description: "Friss paradicsom, mozzarella és bazsalikom", price: 1500, imageUrl: "placeholder.jpg" },
  { id: "2", name: "Caesar Saláta", description: "Ropogós saláta csirkével és krutonnal", price: 1200, imageUrl: "placeholder.jpg" },
  { id: "3", name: "Spaghetti Carbonara", description: "Klasszikus olasz tészta szalonnával és tojással", price: 1300, imageUrl: "placeholder.jpg" },
  { id: "4", name: "Pepperoni Pizza", description: "Szaftos pepperoni és olvadt sajt", price: 1600, imageUrl: "placeholder.jpg" },
  { id: "5", name: "Hawaii Pizza", description: "Ananász és sonka egy különleges kombinációban", price: 1700, imageUrl: "placeholder.jpg" },
  { id: "6", name: "Vegetáriánus Pizza", description: "Friss zöldségek és sajt egy egészséges választás", price: 1400, imageUrl: "placeholder.jpg" },
];

// Animated meal card
export function MealCard({
  item,
  index,
  onAddToCart,
}: {
  item: any;
  index: number;
  onAddToCart: (name: string, quantity: number) => void;
}) {
  const [quantity, setQuantity] = useState(1);

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
        style={HomeScreenStyles.card}
      >
        {/* Image area */}
        <View style={HomeScreenStyles.cardImageBox}>
          {item.imageUrl ? (
            <Image
              source={{ uri: item.imageUrl }}
              style={HomeScreenStyles.cardImage}
              accessibilityLabel={`Egy kép erről: ${item.name}`}
            />
          ) : (
            <View style={HomeScreenStyles.cardImagePlaceholder}>
              <Text style={HomeScreenStyles.cardImageEmoji}>🍽️</Text>
            </View>
          )}
          {/* Price badge */}
          <View style={HomeScreenStyles.priceBadge}>
            <Text style={HomeScreenStyles.priceText}>{item.price} Ft</Text>
          </View>
        </View>

        {/* Card body */}
        <View style={HomeScreenStyles.cardBody}>
          <Text style={HomeScreenStyles.cardName} numberOfLines={1}>{item.name}</Text>
          <Text style={HomeScreenStyles.cardDesc} numberOfLines={2}>{item.description}</Text>
        </View>

        {/* Gold accent line */}
        <View style={HomeScreenStyles.cardAccent} />
        <View style={HomeScreenStyles.quantityRow}>
  <Pressable
    onPress={() => setQuantity((q) => Math.max(1, q - 1))}
    style={HomeScreenStyles.quantityBtn}
  >
    <Text style={HomeScreenStyles.quantityBtnText}>−</Text>
  </Pressable>

  <Text style={HomeScreenStyles.quantityText}>{quantity} db</Text>

  <Pressable
    onPress={() => setQuantity((q) => Math.min(99, q + 1))}
    style={HomeScreenStyles.quantityBtn}
  >
    <Text style={HomeScreenStyles.quantityBtnText}>+</Text>
  </Pressable>
</View>
        <Pressable
  onPress={() => {
    addToGuestCart(item, quantity);
    onAddToCart(item.name, quantity);
    setQuantity(1);
  }}
  style={({ pressed }) => [
    HomeScreenStyles.cartBtn,
    pressed && { opacity: 0.8, transform: [{ scale: 0.97 }] },
  ]}
>
  <Text style={HomeScreenStyles.cartBtnText}>+ Kosárba</Text>
</Pressable>
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
  }, [headerAnim, logoAnim]);

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

  const showToast = (itemName: string, quantity: number) => {
  Toast.show({
    type: "success",
    text1: "Siker!",
    text2: `${quantity} db ${itemName} sikeresen a kosárba rakva!`,
  });
};

  return (
    <View style={HomeScreenStyles.root}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.bg} />

      {/* Top bar */}
      <View style={HomeScreenStyles.topBar}>
        <Animated.View style={{ opacity: headerAnim, transform: [{ translateY: logoAnim }] }}>
                  <Image source={require("../../assets/mine/icons/rd-logo.png")} style={HomeScreenStyles.crown}  />

        </Animated.View>
        <View style={HomeScreenStyles.topActions}>
          <Cart style={HomeScreenStyles.iconBtn} />
          <ProfileIconButton style={HomeScreenStyles.iconBtn} />
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
        <Text style={HomeScreenStyles.heroEyebrow}>🚀 Gyors kiszállítás</Text>
        <Text style={HomeScreenStyles.heroTitle}>Royal{"\n"}Delivery</Text>
        <Text style={HomeScreenStyles.heroSubtitle}>
          Kiszállítás olcsón és egyszerűen — egyenesen az ajtódhoz.
        </Text>

        <Pressable
          onPress={() => router.push("/mealsScreen")}
          style={({ pressed }) => [
            HomeScreenStyles.heroCta,
            pressed && { opacity: 0.85, transform: [{ scale: 0.97 }] },
          ]}
        >
          <Text style={HomeScreenStyles.heroCtaText}>Ételek böngészése →</Text>
        </Pressable>
      </Animated.View>

      {/* Section header */}
      <View style={HomeScreenStyles.sectionHeader}>
        <View style={HomeScreenStyles.sectionDot} />
        <Text style={HomeScreenStyles.sectionTitle}>Ajánlott ételek</Text>
        <View style={HomeScreenStyles.sectionLine} />
      </View>

      {/* Meal grid */}
      {loading ? (
        <View style={HomeScreenStyles.loadingBox}>
          <Text style={HomeScreenStyles.loadingText}>⏳ Ételek betöltése...</Text>
        </View>
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
              <Text style={HomeScreenStyles.emptyText}>Nincs étel</Text>
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
              onPress={() => router.push("/loginScreen")}
              style={({ pressed }) => [HomeScreenStyles.authBtn, HomeScreenStyles.loginBtn, pressed && HomeScreenStyles.btnPressed]}
            >
              <Text style={HomeScreenStyles.authBtnText}>Bejelentkezés</Text>
            </Pressable>
            <Pressable
              onPress={() => router.push("/registerScreen")}
              style={({ pressed }) => [HomeScreenStyles.authBtn, HomeScreenStyles.registerBtn, pressed && HomeScreenStyles.btnPressed]}
            >
              <Text style={HomeScreenStyles.authBtnText}>Regisztráció</Text>
            </Pressable>
          </View>
        ) : (
          <Pressable
            onPress={logout}
            style={({ pressed }) => [HomeScreenStyles.authBtn, HomeScreenStyles.logoutBtn, pressed && HomeScreenStyles.btnPressed]}
          >
            <Text style={[HomeScreenStyles.authBtnText, { color: COLORS.danger }]}>Kijelentkezés</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

export const HomeScreenStyles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.bg,
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
   container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
        gap: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    section: {
        marginBottom: 20,
    },
    formGroup: {
        marginBottom: 10,
    },
    formLabel: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        fontSize: 14,
    },
    button: {
        backgroundColor: '#007aff',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    cartBtn: {
  marginHorizontal: 12,
  marginBottom: 12,
  padding: 10,
  backgroundColor: COLORS.gold,
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
});