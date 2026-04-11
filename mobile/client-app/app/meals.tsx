import { useEffect, useState } from "react";
import { supabase } from "../supabase";

interface Meal {
  id: number;
  name: string;
  description: string;
  price: number;
  restaurant_id: number;
}

export default function Meals() {
  const [meals, setMeals] = useState<Meal[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {data, error} = await supabase
          .from("meals")
          .select("*");
        if (!error) setMeals(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {meals.map((meal: any) => (
        <div key={meal.id}>{meal.name}</div>
      ))}
    </>
  );
}