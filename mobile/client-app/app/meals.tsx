import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import { Text, View } from "react-native";
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
  <>
    {meals.map((meal: Meal) => (
      <View key={meal.id}>
        <Text>{meal.name}</Text>
        <Text>{meal.description}</Text>
        <Text>{meal.price}</Text>
        <Text>{meal.imageUrl}</Text>
        <Text>{meal.restaurant_id}</Text>
      </View>
    ))}    
  </>
);
}