import {
  Image,
  View,
  Text,
  Pressable,
  FlatList,
  StyleSheet,
} from "react-native";
import { router } from "expo-router";
import Meals from "./meals";
import { supabase } from "@/supabase";
import { useState } from "react";
import { useMeals } from "./useMeals";
import Cart from "./cartIconButton";
import { Meal } from "./models/meal";
import Profile from "./profileIconButton";
import ProfileIconButton from "./profileIconButton";

const fallbackData = [
  {
    id: "1",
    name: "Étel 1",
    description: "Leírás 1",
    price: 1590,
    imageUrl: "placeholder.jpg",
  },
  {
    id: "2",
    name: "Étel 2",
    description: "Leírás 2",
    price: 1990,
    imageUrl: "placeholder.jpg",
  },
  {
    id: "3",
    name: "Étel 3",
    description: "Leírás 3",
    price: 2990,
    imageUrl: "placeholder.jpg",
  },
  {
    id: "4",
    name: "Étel 4",
    description: "Leírás 4",
    price: 3990,
    imageUrl: "placeholder.jpg",
  },
  {
    id: "5",
    name: "Étel 5",
    description: "Leírás 5",
    price: 3490,
    imageUrl: "placeholder.jpg",
  },
  {
    id: "6",
    name: "Étel 6",
    description: "Leírás 6",
    price: 2490,
    imageUrl: "placeholder.jpg",
  },
];

export default function HomeScreen() {
  const { meals, loading } = useMeals();
  const [isLoading, setLoading] = useState(true);

  async function fetchMeals() {
    const { data, error } = await supabase
      .from("meals")
      .select("*")
      .order("id", { ascending: true })
      .limit(1);
    if (error) {
      console.error(error);
    }

    return data;
  }

  const dataToShow = (meals ?? []).map((meal: Meal) => ({
    ...meal,
    id: meal.id.toString(),
  }));

  async function displayMeals() {
    const data = await fetchMeals();
    if (data) {
      const result = await data;
    }
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
        backgroundColor: "#ffffff",
      }}
    >
     
     
     {/* Kosár és profil */}
      <Cart style={{ position: "absolute", top: 10, right: 50 }} />
      <ProfileIconButton style={{ position: "absolute", top: 10, right: 10 }} />
     
      <Meals />
      {/* Cím */}
      <Text
        style={{
          fontSize: 28,
          fontWeight: "bold",
          marginBottom: 12,
        }}
      >
        Royal Delivery
      </Text>

      {/* Leírás */}
      <Text
        style={{
          fontSize: 16,
          color: "#555",
          marginBottom: 40,
          textAlign: "center",
        }}
      >
        Kiszállítás olcsón és egyszerűen.
      </Text>

      <View id="meals">
        <View id="featured">
          <View>
            {loading ? (
              <Text>Ételek betöltése...⏳⌛</Text>
            ) : dataToShow.length === 0 ? (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>Nincs étel</Text>
              </View>
            ) : (
              <FlatList
                data={dataToShow.length > 0 ? dataToShow : fallbackData}
                numColumns={3}
                keyExtractor={(item) => item.id.toString()}
                ListEmptyComponent={
                  !loading ? (
                    <View style={styles.emptyContainer}>
                      <Text style={styles.emptyText}>Nincs étel</Text>
                    </View>
                  ) : null
                }
                renderItem={({ item }) => (
                  <View style={styles.card}>
                    <Text>{item.name}</Text>
                    <Text>{item.description}</Text>
                    <Text>{item.price} Ft</Text>
                    <Image
                      source={{ uri: item.imageUrl }}
                      style={{ width: 200, height: 20 }}
                      accessibilityLabel={`Egy kép erről: ${item.name}`}
                    />
                  </View>
                )}
              />
            )}
          </View>
        </View>

        {/* Ételek */}
        <Pressable
          onPress={() => router.push("/meals")}
          style={{
            backgroundColor: "#178b42",
            paddingVertical: 14,
            paddingHorizontal: 24,
            borderRadius: 12,
            marginTop: 30,
            marginBottom: 12,
            minWidth: 200,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontSize: 16, fontWeight: "600" }}>
            Ételek böngészése
          </Text>
        </Pressable>
      </View>

      {/* Login gomb */}
      <Pressable
        onPress={() => router.push("/login")}
        style={{
          backgroundColor: "#2563eb",
          paddingVertical: 14,
          paddingHorizontal: 24,
          borderRadius: 12,
          marginTop: 40,
          marginBottom: 12,
          minHeight: 50,
          minWidth: 200,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white", fontSize: 16, fontWeight: "600" }}>
          Bejelentkezés
        </Text>
      </Pressable>

      {/* Register gomb */}
      <Pressable
        onPress={() => router.push("/register")}
        style={{
          backgroundColor: "#16a34a",
          paddingVertical: 14,
          paddingHorizontal: 24,
          borderRadius: 12,
          marginTop: 12,
          marginBottom: 12,
                    minHeight: 50,
          minWidth: 200,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white", fontSize: 16, fontWeight: "600" }}>
          Regisztráció
        </Text>
      </Pressable>

      
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#eee",
    borderRadius: 10,
    padding: 16,
    margin: 8,
    alignItems: "center",
    flex: 1,
    height: 120,
    justifyContent: "center",
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
  },

  emptyText: {
    fontSize: 18,
    color: "#888",
  },
});
