import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import { Text, View } from "react-native";

export interface Meal {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string | undefined;
  restaurant_id: number;
}

export function Meals() {
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