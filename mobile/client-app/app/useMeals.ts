import { useEffect, useState } from "react";
import { supabase } from "@/supabase";
import { Meal } from "./models/meal";

export function useMeals() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMeals = async () => {
      const { data, error } = await supabase.from("meals").select("*");

      if (!error) setMeals(data ?? []);
      setLoading(false);
    };

    fetchMeals();
  }, []);

  return { meals, loading };
}