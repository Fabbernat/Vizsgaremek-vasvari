// client-app/app/RestaurantsScreen.tsx
import { router } from "expo-router";
import { useState } from "react";
import {
  Image,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

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



type RestaurantGroup = {
  id: string;
  name: string;
  description: string;
  imageId: number;
  mealImageIds: number[];
};

const imageUri = (folder: "meals" | "restaurants", id: number) => {
  return Platform.OS === "web"
    ? `/${folder}/${id}.jpg`
    : `../../public/${folder}/${id}.jpg`;
};

const createMealRange = (start: number, end: number) =>
  Array.from({ length: end - start + 1 }, (_, i) => start + i);

const restaurants: RestaurantGroup[] = [
  {
    id: "mcdonalds",
    name: "McDonald's",
    description:
      "A világ legismertebb gyorsétterme, ikonikus Big Mac, hamburger és sült krumpli.",
    imageId: 21,
    mealImageIds: createMealRange(33, 42),
  },
  {
    id: "kfc",
    name: "KFC",
    description:
      "Ropogós, fűszeres sült csirke specialistája, az eredeti recepttel.",
    imageId: 22,
    mealImageIds: createMealRange(43, 52),
  },
  {
    id: "burger-king",
    name: "Burger King",
    description:
      "A Whopper burgereiről híres, lángon sült húsos gyorsétterem.",
    imageId: 23,
    mealImageIds: createMealRange(53, 62),
  },
  {
    id: "subway",
    name: "Subway",
    description:
      "Friss szendvicsek és wrapek, saját összeállítással.",
    imageId: 24,
    mealImageIds: createMealRange(63, 72),
  },
  {
    id: "pizza-hut",
    name: "Pizza Hut",
    description:
      "Vastag és vékony tésztás pizzák, klasszikus családi pizzaélmény.",
    imageId: 25,
    mealImageIds: createMealRange(73, 82),
  },
  {
    id: "dominos",
    name: "Domino's Pizza",
    description:
      "Gyors házhozszállításra specializált pizzalánc.",
    imageId: 26,
    mealImageIds: createMealRange(83, 92),
  },
  {
    id: "starbucks",
    name: "Starbucks",
    description:
      "Kávézólánc szendvicsekkel, péksüteményekkel és italokkal.",
    imageId: 27,
    mealImageIds: createMealRange(93, 102),
  },
  {
    id: "taco-bell",
    name: "Taco Bell",
    description:
      "Mexikói ihletésű tacos, burritók és quesadillák.",
    imageId: 28,
    mealImageIds: createMealRange(103, 112),
  },
  {
    id: "wendys",
    name: "Wendy's",
    description:
      "Friss, négyzet alakú hamburgerek és csirkés szendvicsek.",
    imageId: 29,
    mealImageIds: createMealRange(113, 122),
  },
  {
    id: "chick-fil-a",
    name: "Chick-fil-A",
    description:
      "Csirkés szendvicsek specialistája, főleg az USA-ban népszerű.",
    imageId: 30,
    mealImageIds: createMealRange(123, 132),
  },
];




export default function RestaurantsScreen() {
  const [searchQuery, setSearchQuery] = useState("");
const [selectedRestaurantId, setSelectedRestaurantId] = useState<string | null>(
  null
);

const filteredRestaurants = restaurants.filter((restaurant) => {
  const matchesSearch =
    restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    restaurant.description.toLowerCase().includes(searchQuery.toLowerCase());

  const matchesSelected =
    !selectedRestaurantId || restaurant.id === selectedRestaurantId;

  return matchesSearch && matchesSelected;
});





  return (
    <View style={styles.root}>
    <StatusBar barStyle="light-content" backgroundColor={COLORS.bg} />

    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.content}
    >
      <Pressable onPress={() => router.back()} style={styles.backBtn}>
        <Text style={styles.backText}>← Back</Text>
      </Pressable>

      <View style={styles.hero}>
        <Text style={styles.eyebrow}>Restaurants</Text>
        <Text style={styles.heading}>Choose a restaurant</Text>
        <Text style={styles.subheading}>
          Browse meals grouped by restaurant. Tap a restaurant filter to focus
          on one menu.
        </Text>
      </View>

      <TextInput
        placeholder="Search restaurants..."
        placeholderTextColor={COLORS.muted}
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.searchInput}
      />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.restaurantNav}
      >
        <Pressable
          onPress={() => setSelectedRestaurantId(null)}
          style={[
            styles.navChip,
            selectedRestaurantId === null && styles.navChipActive,
          ]}
        >
          <Text
            style={[
              styles.navChipText,
              selectedRestaurantId === null && styles.navChipTextActive,
            ]}
          >
            All
          </Text>
        </Pressable>

        {restaurants.map((restaurant) => (
          <Pressable
            key={restaurant.id}
            onPress={() => setSelectedRestaurantId(restaurant.id)}
            style={[
              styles.navChip,
              selectedRestaurantId === restaurant.id && styles.navChipActive,
            ]}
          >
            <Text
              style={[
                styles.navChipText,
                selectedRestaurantId === restaurant.id &&
                  styles.navChipTextActive,
              ]}
            >
              {restaurant.name}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      <Text style={styles.resultText}>
        Showing {filteredRestaurants.length} restaurant
        {filteredRestaurants.length === 1 ? "" : "s"}
      </Text>

      {filteredRestaurants.map((restaurant) => (
        <View key={restaurant.id} style={styles.restaurantSection}>
          <View style={styles.restaurantHeaderCard}>
            <Image
              source={{ uri: imageUri("restaurants", restaurant.imageId) }}
              style={styles.restaurantCover}
            />

            <View style={styles.restaurantHeaderOverlay}>
              <Text style={styles.restaurantTitle}>{restaurant.name}</Text>
              <Text style={styles.restaurantDescription} numberOfLines={3}>
                {restaurant.description}
              </Text>
              <Text style={styles.restaurantCount}>
                {restaurant.mealImageIds.length} meals available
              </Text>
            </View>
          </View>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{restaurant.name} menu</Text>
            <Text style={styles.sectionMeta}>
              {restaurant.mealImageIds.length} items
            </Text>
          </View>

          <View style={styles.mealGrid}>
            {restaurant.mealImageIds.map((imageId, index) => (
              <View key={imageId} style={styles.mealCard}>
                <Image
                  source={{ uri: imageUri("meals", imageId) }}
                  style={styles.mealImage}
                />

                <View style={styles.mealCardBody}>
                  <Text style={styles.mealName} numberOfLines={1}>
                    {restaurant.name} meal #{index + 1}
                  </Text>
                  <Text style={styles.mealMeta}>Image ID: {imageId}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      ))}
    </ScrollView>
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
  restaurantList: {
  paddingBottom: 32,
},

restaurantSection: {
  marginBottom: 32,
},

restaurantHeaderCard: {
  height: 190,
  borderRadius: 20,
  overflow: "hidden",
  backgroundColor: COLORS.card,
  borderWidth: 1,
  borderColor: COLORS.border,
  marginBottom: 14,
},

restaurantCover: {
  width: "100%",
  height: "100%",
  resizeMode: "cover",
},

restaurantHeaderOverlay: {
  position: "absolute",
  left: 0,
  right: 0,
  bottom: 0,
  padding: 16,
  backgroundColor: "rgba(0,0,0,0.68)",
},

restaurantTitle: {
  color: COLORS.text,
  fontSize: 24,
  fontWeight: "900",
  marginBottom: 5,
},

restaurantDescription: {
  color: COLORS.text,
  opacity: 0.86,
  fontSize: 13,
  lineHeight: 18,
},

mealGrid: {
  flexDirection: "row",
  flexWrap: "wrap",
  gap: 12,
},

mealCard: {
  width: "48%",
  backgroundColor: COLORS.card,
  borderRadius: 16,
  overflow: "hidden",
  borderWidth: 1,
  borderColor: COLORS.border,
},

mealImage: {
  width: "100%",
  height: 1000,
  resizeMode: "cover",
  backgroundColor: COLORS.surface,
},

mealCardBody: {
  padding: 10,
},

mealName: {
  color: COLORS.text,
  fontSize: 13,
  fontWeight: "800",
},

mealMeta: {
  color: COLORS.muted,
  fontSize: 11,
  marginTop: 3,
},

content: {
  paddingHorizontal: 20,
  paddingTop: 24,
  paddingBottom: 40,
},

hero: {
  marginBottom: 18,
},

eyebrow: {
  color: COLORS.gold,
  fontSize: 13,
  fontWeight: "800",
  letterSpacing: 1.5,
  textTransform: "uppercase",
  marginBottom: 8,
},

heading: {
  fontSize: 34,
  fontWeight: "900",
  color: COLORS.text,
  marginBottom: 8,
},

subheading: {
  color: COLORS.muted,
  fontSize: 15,
  lineHeight: 22,
},

restaurantNav: {
  gap: 8,
  paddingBottom: 14,
},

navChip: {
  paddingHorizontal: 14,
  paddingVertical: 9,
  borderRadius: 999,
  backgroundColor: COLORS.surface,
  borderWidth: 1,
  borderColor: COLORS.border,
},

navChipActive: {
  backgroundColor: COLORS.gold,
  borderColor: COLORS.gold,
},

navChipText: {
  color: COLORS.text,
  fontSize: 13,
  fontWeight: "700",
},

navChipTextActive: {
  color: COLORS.bg,
},

resultText: {
  color: COLORS.muted,
  fontSize: 13,
  marginBottom: 16,
},

sectionHeader: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 10,
},

sectionTitle: {
  color: COLORS.text,
  fontSize: 18,
  fontWeight: "900",
},

sectionMeta: {
  color: COLORS.gold,
  fontSize: 12,
  fontWeight: "800",
},

restaurantCount: {
  color: COLORS.gold,
  fontSize: 12,
  fontWeight: "800",
  marginTop: 8,
},
});
