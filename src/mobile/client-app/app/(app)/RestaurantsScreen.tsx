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



type MealItem = {
  name: string;
  price: number;
  description: string;
  imageId: number;
};

type RestaurantGroup = {
  id: string;
  name: string;
  description: string;
  imageId: number;
  meals: MealItem[];
};

const imageUri = (folder: "meals" | "restaurants", id: number) => {
  return Platform.OS === "web"
    ? `/${folder}/${id}.jpg`
    : `../../public/${folder}/${id}.jpg`;
};

const withImageIds = (
  startImageId: number,
  meals: Omit<MealItem, "imageId">[]
): MealItem[] =>
  meals.map((meal, index) => ({
    ...meal,
    imageId: startImageId + index,
  }));

const restaurants: RestaurantGroup[] = [
  {
    id: "mcdonalds",
    name: "McDonald's",
    description:
      "A világ legismertebb gyorsétterme, ikonikus Big Mac, hamburger és sült krumpli.",
    imageId: 21,
    meals: withImageIds(33, [
      {
        name: "Big Mac",
        price: 1890,
        description:
          "Két marhahús pogácsa, speciális szósz, sajt, saláta, uborka és hagyma",
      },
      {
        name: "Cheeseburger",
        price: 1190,
        description:
          "Marhahús pogácsa, cheddar sajt, mustár, ketchup, hagyma és savanyú uborka",
      },
      {
        name: "McChicken",
        price: 1490,
        description: "Ropogós csirkefilé, saláta és majonéz",
      },
      {
        name: "McNuggets 9 db",
        price: 1590,
        description: "Aranybarna ropogós csirkehús falatkák",
      },
      {
        name: "Nagy sült krumpli",
        price: 890,
        description: "Frissen sütött, sós burgonyahasábok",
      },
      {
        name: "Coca-Cola 0,5l",
        price: 690,
        description: "Klasszikus Coca-Cola",
      },
      {
        name: "Filet-O-Fish",
        price: 1690,
        description: "Hal filé, sajt és tartár szósz",
      },
      {
        name: "Double Cheeseburger",
        price: 1790,
        description: "Két marhahús pogácsa dupla sajttal",
      },
      {
        name: "McRoyal",
        price: 1990,
        description: "Marhahús, bacon, sajt, saláta és speciális szósz",
      },
      {
        name: "Apple Pie",
        price: 890,
        description: "Meleg almás pite vaníliás öntettel",
      },
    ]),
  },
  {
    id: "kfc",
    name: "KFC",
    description:
      "Ropogós, fűszeres sült csirke specialistája, az eredeti recepttel.",
    imageId: 22,
    meals: withImageIds(43, [
      {
        name: "Original Recipe Csirke (3 db)",
        price: 2290,
        description:
          "A híres 11 fűszeres titkos recept szerint panírozott csirke",
      },
      {
        name: "Zinger Burger",
        price: 1890,
        description: "Fűszeres ropogós csirkefilé, saláta és mayo",
      },
      {
        name: "Twister",
        price: 1690,
        description: "Csíkokra vágott csirke, zöldségek és szósz wrapben",
      },
      {
        name: "Hot Wings 6 db",
        price: 1590,
        description: "Fűszeres csirkeszárnyak",
      },
      {
        name: "Csirkefalatok 8 db",
        price: 1490,
        description: "Ropogós csirke nuggets",
      },
      {
        name: "Kentucky Burger",
        price: 2190,
        description: "Nagyobb méretű Original csirke filé burger",
      },
      {
        name: "Coleslaw",
        price: 690,
        description: "Káposztasaláta majonézes öntettel",
      },
      {
        name: "Nagy sült krumpli",
        price: 890,
        description: "KFC stílusú hasábkrumpli",
      },
      {
        name: "Csokoládés muffin",
        price: 790,
        description: "Puha csokoládés muffin",
      },
      {
        name: "Pepsi 0,5l",
        price: 690,
        description: "Frissítő Pepsi",
      },
    ]),
  },
  {
    id: "burger-king",
    name: "Burger King",
    description: "A Whopper burgereiről híres, lángon sült húsos gyorsétterem.",
    imageId: 23,
    meals: withImageIds(53, [
      {
        name: "Whopper",
        price: 2190,
        description:
          "Lángon sütött marhahús, saláta, paradicsom, hagyma, savanyú uborka és mayo",
      },
      {
        name: "Cheese Whopper",
        price: 2390,
        description: "Whopper extra cheddar sajttal",
      },
      {
        name: "Chicken Royale",
        price: 1890,
        description: "Ropogós csirkefilé, saláta és mayo",
      },
      {
        name: "Double Whopper",
        price: 2790,
        description: "Dupla marhahús pogácsa",
      },
      {
        name: "BK Nuggets 9 db",
        price: 1490,
        description: "Ropogós csirke nuggets",
      },
      {
        name: "Steakhouse Burger",
        price: 2490,
        description: "Lángon sütött hús, bacon és BBQ szósz",
      },
      {
        name: "Nagy sült krumpli",
        price: 890,
        description: "Sós, ropogós hasábkrumpli",
      },
      {
        name: "Onion Rings",
        price: 990,
        description: "Ropogós hagymakarikák",
      },
      {
        name: "King Shake Vanília",
        price: 1090,
        description: "Krémesség shake vanília ízben",
      },
      {
        name: "Coca-Cola 0,5l",
        price: 690,
        description: "Klasszikus üdítő",
      },
    ]),
  },
  {
    id: "subway",
    name: "Subway",
    description: "Friss szendvicsek és wrapek, saját összeállítással.",
    imageId: 24,
    meals: withImageIds(63, [
      {
        name: "Italian B.M.T.",
        price: 2190,
        description: "Pepperoni, szalámi, sonka, sajt, zöldségek",
      },
      {
        name: "Chicken Teriyaki",
        price: 2290,
        description: "Édes teriyaki mártásos csirke, zöldségek",
      },
      {
        name: "Tuna",
        price: 1990,
        description: "Tonhal saláta, sajt és zöldségek",
      },
      {
        name: "Veggie Delite",
        price: 1690,
        description: "Friss zöldségek és sajt",
      },
      {
        name: "Steak & Cheese",
        price: 2390,
        description: "Marhasült, olvasztott sajt és zöldségek",
      },
      {
        name: "Chicken Classic",
        price: 2090,
        description: "Grillezett csirke filé",
      },
      {
        name: "Cookies 3 db",
        price: 790,
        description: "Csokis keksz",
      },
      {
        name: "Chips",
        price: 590,
        description: "Klasszikus krumplichips",
      },
      {
        name: "Coca-Cola 0,5l",
        price: 690,
        description: "Üdítőital",
      },
      {
        name: "6 inch Szendvics menü",
        price: 2690,
        description: "Bármely 6 inch szendvics + ital + chips",
      },
    ]),
  },
  {
    id: "pizza-hut",
    name: "Pizza Hut",
    description:
      "Vastag és vékony tésztás pizzák, klasszikus családi pizzaélmény.",
    imageId: 25,
    meals: withImageIds(73, [
      {
        name: "Margherita Pizza (közepes)",
        price: 2490,
        description: "Paradicsomszósz, mozzarella és bazsalikom",
      },
      {
        name: "Pepperoni Pizza (közepes)",
        price: 2890,
        description: "Bőséges pepperoni és mozzarella",
      },
      {
        name: "Hawaii Pizza (közepes)",
        price: 2790,
        description: "Sonka, ananász és sajt",
      },
      {
        name: "Meat Lovers (közepes)",
        price: 3190,
        description: "Négyféle hús és extra sajt",
      },
      {
        name: "Csirke BBQ Pizza (közepes)",
        price: 2990,
        description: "BBQ szósz, grillezett csirke és vöröshagyma",
      },
      {
        name: "Garlic Breadsticks",
        price: 1190,
        description: "Fokhagymás kenyér rudak",
      },
      {
        name: "Caesar Saláta",
        price: 1490,
        description: "Ropogós saláta, parmezán és kruton",
      },
      {
        name: "Tiramisu",
        price: 890,
        description: "Klasszikus olasz desszert",
      },
      {
        name: "Cola 0,5l",
        price: 690,
        description: "Üdítő",
      },
      {
        name: "Cheese Sticks",
        price: 1390,
        description: "Ropogós sajtos rudak",
      },
    ]),
  },
  {
    id: "dominos",
    name: "Domino's Pizza",
    description: "Gyors házhozszállításra specializált pizzalánc.",
    imageId: 26,
    meals: withImageIds(83, [
      {
        name: "Extravaganzza",
        price: 3290,
        description: "Pepperoni, kolbász, sonka, gomba, paprika, hagyma",
      },
      {
        name: "Magyaros",
        price: 2990,
        description: "Kolbász, szalonna, hagyma, paprika és sajt",
      },
      {
        name: "Hawaii",
        price: 2790,
        description: "Sonka és ananász",
      },
      {
        name: "BBQ Csirke",
        price: 3090,
        description: "BBQ szósz, grillezett csirke és vöröshagyma",
      },
      {
        name: "Quattro Formaggi",
        price: 2890,
        description: "Négyféle sajt",
      },
      {
        name: "Fűszeres Csirke",
        price: 2990,
        description: "Csirke, jalapeño, hagyma és csípős szósz",
      },
      {
        name: "Garlic Dip",
        price: 490,
        description: "Fokhagymás mártogatós",
      },
      {
        name: "Coca-Cola 0,5l",
        price: 690,
        description: "Üdítő",
      },
      {
        name: "Csokis Brownie",
        price: 990,
        description: "Meleg csokis süti",
      },
      {
        name: "Cheesy Bread",
        price: 1490,
        description: "Sajtos kenyér",
      },
    ]),
  },
  {
    id: "starbucks",
    name: "Starbucks",
    description: "Kávézólánc szendvicsekkel, péksüteményekkel és italokkal.",
    imageId: 27,
    meals: withImageIds(93, [
      {
        name: "Grilled Chicken & Avocado Wrap",
        price: 1890,
        description: "Grillezett csirke, avocado és zöldségek",
      },
      {
        name: "Turkey & Cheese Croissant",
        price: 1590,
        description: "Pulyka és sajt croissantban",
      },
      {
        name: "Egg & Cheese Sandwich",
        price: 1390,
        description: "Rántotta és sajt szendvics",
      },
      {
        name: "Blueberry Muffin",
        price: 890,
        description: "Áfonyás muffin",
      },
      {
        name: "Chocolate Chip Cookie",
        price: 790,
        description: "Csokis keksz",
      },
      {
        name: "Greek Yogurt Parfait",
        price: 1290,
        description: "Görög joghurt, granola és gyümölcs",
      },
      {
        name: "Ham & Cheese Panini",
        price: 1690,
        description: "Sonka és sajt panini",
      },
      {
        name: "Caesar Salad",
        price: 1790,
        description: "Caesar saláta grillezett csirkével",
      },
      {
        name: "Banana Bread",
        price: 990,
        description: "Banános kenyér",
      },
      {
        name: "Matcha Cake Pop",
        price: 690,
        description: "Matcha ízű mini torta",
      },
    ]),
  },
  {
    id: "taco-bell",
    name: "Taco Bell",
    description: "Mexikói ihletésű tacos, burritók és quesadillák.",
    imageId: 28,
    meals: withImageIds(103, [
      {
        name: "Crunchy Taco",
        price: 890,
        description: "Ropogós taco marhahússal, sajttal és salátával",
      },
      {
        name: "Burrito Supreme",
        price: 1590,
        description: "Nagy burrito babbal, hússal, sajttal és szószokkal",
      },
      {
        name: "Quesadilla",
        price: 1390,
        description: "Grillezett tortilla sajttal és csirkével",
      },
      {
        name: "Nachos BellGrande",
        price: 1690,
        description: "Nagy adag nachos sajttal, babbal és jalapeñoval",
      },
      {
        name: "Cheesy Gordita Crunch",
        price: 1490,
        description: "Puha és ropogós tortilla extra sajttal",
      },
      {
        name: "7-Layer Burrito",
        price: 1390,
        description: "Hét rétegű vegetáriánus burrito",
      },
      {
        name: "Cinnamon Twists",
        price: 690,
        description: "Fahéjas édes csavart csíkok",
      },
      {
        name: "Chips & Guacamole",
        price: 890,
        description: "Nachos guacamoléval",
      },
      {
        name: "Mountain Dew 0,5l",
        price: 690,
        description: "Üdítő",
      },
      {
        name: "Crunchwrap Supreme",
        price: 1690,
        description: "Tortilla wrap ropogós réteggel",
      },
    ]),
  },
  {
    id: "wendys",
    name: "Wendy's",
    description: "Friss, négyzet alakú hamburgerek és csirkés szendvicsek.",
    imageId: 29,
    meals: withImageIds(113, [
      {
        name: "Dave's Single",
        price: 2190,
        description:
          "Négyzet alakú marhahús, sajt, saláta, paradicsom és mayo",
      },
      {
        name: "Spicy Chicken Sandwich",
        price: 1990,
        description: "Fűszeres ropogós csirke szendvics",
      },
      {
        name: "Baconator",
        price: 2790,
        description: "Dupla hús, sok bacon és sajt",
      },
      {
        name: "Chicken Nuggets 10 db",
        price: 1590,
        description: "Ropogós csirke nuggets",
      },
      {
        name: "Chili",
        price: 1490,
        description: "Húsos babos chili",
      },
      {
        name: "French Fries",
        price: 890,
        description: "Sós hasábkrumpli",
      },
      {
        name: "Baked Potato",
        price: 1290,
        description: "Sült krumpli tejföllel és sajttal",
      },
      {
        name: "Frosty Vanília",
        price: 1090,
        description: "Krémfagyi shake",
      },
      {
        name: "Apple Bites",
        price: 690,
        description: "Almafalatkák",
      },
      {
        name: "Caesar Salad",
        price: 1790,
        description: "Caesar saláta grillezett csirkével",
      },
    ]),
  },
  {
    id: "chick-fil-a",
    name: "Chick-fil-A",
    description: "Csirkés szendvicsek specialistája, főleg az USA-ban népszerű.",
    imageId: 30,
    meals: withImageIds(123, [
      {
        name: "Chicken Sandwich",
        price: 1890,
        description:
          "Ropogós csirkefilé, savanyú uborka és speciális szósz",
      },
      {
        name: "Spicy Chicken Sandwich",
        price: 1990,
        description: "Fűszeres változat a klasszikus szendvicsből",
      },
      {
        name: "Chicken Nuggets 8 db",
        price: 1590,
        description: "Extra ropogós csirke falatkák",
      },
      {
        name: "Chicken Deluxe Sandwich",
        price: 2190,
        description: "Csirke szendvics salátával, paradicsommal és sajttal",
      },
      {
        name: "Waffle Fries",
        price: 990,
        description: "Rácsos formájú sült krumpli",
      },
      {
        name: "Grilled Chicken Sandwich",
        price: 1990,
        description: "Grillezett csirkefilé szendvics",
      },
      {
        name: "Chicken Biscuit",
        price: 1490,
        description: "Csirke reggeli kekszben",
      },
      {
        name: "Mac & Cheese",
        price: 1290,
        description: "Krémés sajtos tészta",
      },
      {
        name: "Lemonade",
        price: 790,
        description: "Friss házi limonádé",
      },
      {
        name: "Chocolate Chunk Cookie",
        price: 890,
        description: "Nagy csokidarabos keksz",
      },
    ]),
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
                {restaurant.meals.length} meals available
              </Text>
            </View>
          </View>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{restaurant.name} menu</Text>
            <Text style={styles.sectionMeta}>
              {restaurant.meals.length} items
            </Text>
          </View>

          <View style={styles.mealGrid}>
            {restaurant.meals.map((meal) => (
  <View key={meal.imageId} style={styles.mealCard}>
    <Image
      source={{ uri: imageUri("meals", meal.imageId) }}
      style={styles.mealImage}
    />

    <View style={styles.mealCardBody}>
      <Text style={styles.mealName} numberOfLines={1}>
        {meal.name}
      </Text>

      <Text style={styles.mealDescription} numberOfLines={2}>
        {meal.description}
      </Text>

      <Text style={styles.mealPrice}>{meal.price} Ft</Text>
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
  height: 700,
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
  width: "32%",
  backgroundColor: COLORS.card,
  borderRadius: 16,
  overflow: "hidden",
  borderWidth: 1,
  borderColor: COLORS.border,
},

mealImage: {
  width: "100%",
  height: 700,
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
mealDescription: {
  color: COLORS.muted,
  fontSize: 11,
  lineHeight: 15,
  marginTop: 4,
},

mealPrice: {
  color: COLORS.gold,
  fontSize: 13,
  fontWeight: "900",
  marginTop: 8,
},
});
