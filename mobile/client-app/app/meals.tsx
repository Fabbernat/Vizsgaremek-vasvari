import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import { ScrollView, Text, View } from "react-native";
import { Meal } from "./models/meal";

export async function getMeals() {
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

{/* The Meals component in homeContent.tsx is rendered but completely invisible to the user.
      The <Meals /> component renders raw text nodes for name, description, price, imageUrl, and restaurant_id —
      no styles, no container, no nothing — and it sits above the main content area but below the buttons, 
      making it confusing to debug. It fetches its own data independently (see performance issues below) 
      and renders as unstyled plain text. */}
export default function Meals() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [error, setError] = useState<string | null>(null);

 useEffect(() => {
    fetchMeals();
  }, []);

  const fetchMeals = async () => {
    const { data, error } = await supabase
      .from("meals")
      .select("*");

    if (error) {
      console.error(error);
      setError(error.message);
      return;
    }

    setMeals(data ?? []);
  };

  if (error) {
    return <Text>Hiba: {error}</Text>;
  }

  return (
  <ScrollView 
  style={{
     padding: 16,
      backgroundColor: "#f9c9c9",
        borderRadius: 12,
        margin: 16,
      }}>
    {meals.map((meal: Meal) => (
      <View key={meal.id}>
        <Text>{meal.imageUrl}</Text>
        <Text>{meal.name}</Text>
        <Text>{meal.price} Ft</Text>
        <Text>{meal.description}</Text>
        <Text>{meal.restaurant_id}</Text>
      </View>
    ))}    
  </ScrollView>
);
}