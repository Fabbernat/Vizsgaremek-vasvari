import React, { useEffect, useState } from "react";
import { supabase } from "../supabase";
import {
  FlatList,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { Meal } from "./models/meal";
import { addToGuestCart } from "./cartStore";
import { HomeScreenStyles, MealCard } from "./homeScreen";
import { useMeals } from "./useMeals";

export default function Meals() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [error, setError] = useState<string | null>(null);
    const { loading } = useMeals();
  

  useEffect(() => {
    fetchMeals();
  }, []);

  const fetchMeals = async () => {
    const { data, error } = await supabase.from("meals").select("*");

    if (error) {
      setError(error.message);
      return;
    }

    setMeals(data ?? []);
  };

  const dataToShow = (meals ?? []).map((meal: Meal) => ({
      ...meal,
      id: meal.id.toString(),
    }));
    const displayData = dataToShow;
  

  if (error) {
    return <Text>Hiba: {error}</Text>;
  }

  const addToCart = (meal: Meal) => {
    addToGuestCart(meal);

    console.log("Kosár:", meal.name);
  };

  return (
    <ScrollView
      style={{
        padding: 16,
      }}
    >
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
                  <MealCard item={item} index={index} />
                )}
              />
            )}
      {meals.map((meal: Meal) => (
        <View
          key={meal.id}
          style={{
            backgroundColor: "#f9c9c9",
            borderRadius: 12,
            marginBottom: 16,
            padding: 12,
          }}
        >
          <Text>{meal.name}</Text>
          <Text>{meal.price} Ft</Text>

          <Pressable
            onPress={() => addToCart(meal)}
            style={{
              backgroundColor: "#16a34a",
              padding: 10,
              borderRadius: 8,
              marginTop: 10,
            }}
          >
            <Text style={{ color: "white" }}>Kosárba tesz</Text>
          </Pressable>
        </View>
      ))}
    </ScrollView>
  );
}
