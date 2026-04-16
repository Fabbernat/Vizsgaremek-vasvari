import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { supabase } from "@/supabase";

export default function DebugDashboard() {
  const [meals, setMeals] = useState<any[]>([]);
  const [logs, setLogs] = useState<string[]>([]);
  const [error, setError] = useState<any>(null);

  const log = (msg: string) => {
    console.log(msg);
    setLogs((prev) => [...prev, msg]);
  };

  useEffect(() => {
    const runChecks = async () => {
      log("🚀 App started");

      // ENV CHECK
      log("ENV CHECK:");
      log(`SUPABASE_URL: ${process.env.EXPO_PUBLIC_SUPABASE_URL}`);
      log(`API_BASE_URL: ${process.env.EXPO_PUBLIC_API_BASE_URL}`);

      try {
        // SUPABASE TEST
        log("🔌 Trying Supabase connection...");

        const { data, error } = await supabase
          .from("meals")
          .select("*")
          .limit(1);

        if (error) {
          log("❌ Supabase error:");
          log(JSON.stringify(error));
          setError(error);
        } else {
          log("✅ Supabase OK");
          setMeals(data || []);
        }
      } catch (e: any) {
        log("💥 Exception during Supabase call");
        log(e.message);
        setError(e);
      }

      // BACKEND PING (optional)
      try {
        log("🌐 Pinging backend...");

        const res = await fetch(
          `${process.env.EXPO_PUBLIC_API_BASE_URL}/health`
        );

        log(`Backend status: ${res.status}`);
      } catch (e: any) {
        log("❌ Backend unreachable");
        log(e.message);
      }
    };

    runChecks();
  }, []);

  return (
    <ScrollView>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10 }}>
        🛠 Debug Dashboard
      </Text>

      {/* ERROR */}
      {error && (
        <View style={{ marginBottom: 20 }}>
          <Text style={{ color: "red", fontWeight: "bold" }}>
            ❌ ERROR:
          </Text>
          <Text>{JSON.stringify(error, null, 2)}</Text>
        </View>
      )}

      {/* MEALS */}
      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontWeight: "bold" }}>
          🍽 Meals count: {meals.length}
        </Text>
      </View>

      {/* LOGS */}
      <View>
        <Text style={{ fontWeight: "bold", marginBottom: 10 }}>
          📜 Logs:
        </Text>
        {logs.map((l, i) => (
          <Text key={i} style={{ fontSize: 12 }}>
            {l}
          </Text>
        ))}
      </View>
    </ScrollView>
  );
}