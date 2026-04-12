import { View, Text, Pressable, FlatList, StyleSheet } from "react-native";
import { router } from "expo-router";
import Meals from "./meals";
import { supabase } from "@/supabase";

const fallbackData = [
  { id: "1", name: "Étel 1", description: "Leírás 1", price: 1590 },
  { id: "2", name: "Étel 2", description: "Leírás 2", price: 1990 },
  { id: "3", name: "Étel 3", description: "Leírás 3", price: 2990 },
  { id: "4", name: "Étel 4", description: "Leírás 4", price: 3990 },
  { id: "5", name: "Étel 5", description: "Leírás 5", price: 3490 },
  { id: "6", name: "Étel 6", description: "Leírás 6", price: 2490 },
];

export default function HomeScreen() {
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
          <FlatList
            data={
              /* supabase.tables.meals || */
               fallbackData}
            numColumns={3} // 👈 3 columns
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Text>{item.name}</Text>
                <Text>{item.description}</Text>
                <Text>{item.price} Ft</Text>
              </View>
            )}
          />
        </View>

        {/* Ételek */}
        <Pressable
          onPress={() => router.push("/meals")}
          style={{
            backgroundColor: "#178b42",
            paddingVertical: 14,
            paddingHorizontal: 24,
            borderRadius: 12,
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
          marginBottom: 12,
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
          marginBottom: 12,
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
});