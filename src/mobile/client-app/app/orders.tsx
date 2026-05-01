// client-app\app\orders.tsx
import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { supabase } from "@/supabase";
import { OrderItem } from "./models/orderItem";
export default function Orders() {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);

  useEffect(() => {
    const fetchOrderItems = async () => {
      const { data, error } = await supabase.from("order_items").select("*");

      if (error) {
        console.error(error);
      } else {
        setOrderItems(data ?? []);
      }
    };

    fetchOrderItems();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
        backgroundColor: "#ffffff",
      }}
    >
      <Text
        style={{
          fontSize: 28,
          fontWeight: "bold",
          marginBottom: 12,
        }}
      >
        Rendelési tételek
      </Text>
      {orderItems.map((item) => (
        <View key={item.id}>
          <Text>Order ID: {item.order_id}</Text>
          <Text>Meal ID: {item.meal_id}</Text>
          <Text>Restaurant ID: {item.restaurant_id}</Text>
          <Text>Quantity: {item.quantity}</Text>
          <Text>Unit Price: {item.unit_price}</Text>
        </View>
      ))}
    </View>
  );
}
