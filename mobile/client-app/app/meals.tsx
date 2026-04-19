import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import {
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { Meal } from "./models/meal";
import { addToGuestCart } from "./cartStore";

export default function Meals() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [error, setError] = useState<string | null>(null);

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