// client-app\app\(app)\UseMeals.ts
import { useEffect, useState } from "react";
import { supabase } from "@/supabase";
import { Meal } from "../../models/meal";


export function useMeals() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMeals = async () => {
      const { data, error } = await supabase.from("meals").select("*");
      if (error) {
        setError(error.message);
      } else {
        setMeals(data ?? []);
      }
      setLoading(false);
    };
    fetchMeals();
  }, []);

  return { meals, loading, error };
}