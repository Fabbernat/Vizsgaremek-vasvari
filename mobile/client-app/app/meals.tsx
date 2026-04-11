import { useEffect, useState } from "react";
import { supabase } from "../supabase";

interface Meal {
  // define the properties of a meal object here
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