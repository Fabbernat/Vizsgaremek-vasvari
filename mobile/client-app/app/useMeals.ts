{/* Triple data fetching for the same meals table.
Your app makes three independent Supabase queries for the same data:
 useMeals() (in homeContent.tsx), the local fetchMeals (in homeContent.tsx,
  never shown), and the separate Meals component (in homeContent.tsx, 
  also fetching independently). Consolidate all meal fetching
 into useMeals and pass data down via props or a shared context/store. */}

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