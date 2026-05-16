import { create } from "zustand";
import { supabase } from "@/supabase";
import { DeliveryOrder, DeliveryStatus } from "../models/deliveryOrder";

interface OrderStore {
  availableOrders: DeliveryOrder[];
  myOrders: DeliveryOrder[];
  loading: boolean;
  error: string | null;

  // Actions
  fetchAvailableOrders: () => Promise<void>;
  fetchMyOrders: (courierId: string) => Promise<void>;
  acceptOrder: (orderId: string, courierId: string) => Promise<void>;
  updateOrderStatus: (orderId: string, status: DeliveryStatus) => Promise<void>;
  cancelOrder: (orderId: string) => Promise<void>;
  subscribeToOrders: () => () => void;
}

export const useCourierOrderStore = create<OrderStore>((set, get) => ({
  availableOrders: [],
  myOrders: [],
  loading: false,
  error: null,

  fetchAvailableOrders: async () => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase
        .from("delivery_orders")
        .select("*")
        .eq("status", "új")
        .order("created_at", { ascending: false });

      if (error) throw error;

      set({ availableOrders: data || [], loading: false });
    } catch (error) {
      console.error("Fetch available orders error:", error);
      set({ 
        error: error instanceof Error ? error.message : "Hiba az rendelések lekéréséhez",
        loading: false 
      });
    }
  },

  fetchMyOrders: async (courierId: string) => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase
        .from("delivery_orders")
        .select("*")
        .eq("accepted_by_courier_id", courierId)
        .in("status", ["készül", "átadva_futárnak", "kézbesítve"])
        .order("created_at", { ascending: false });

      if (error) throw error;

      set({ myOrders: data || [], loading: false });
    } catch (error) {
      console.error("Fetch my orders error:", error);
      set({ 
        error: error instanceof Error ? error.message : "Hiba az rendelések lekéréséhez",
        loading: false 
      });
    }
  },

  acceptOrder: async (orderId: string, courierId: string) => {
    try {
      const { error } = await supabase
        .from("delivery_orders")
        .update({
          accepted_by_courier_id: courierId,
          status: "készül",
        })
        .eq("id", orderId);

      if (error) throw error;

      // Update local state
      const { availableOrders, myOrders } = get();
      const acceptedOrder = availableOrders.find((o) => o.id === orderId);

      if (acceptedOrder) {
        set({
          availableOrders: availableOrders.filter((o) => o.id !== orderId),
          myOrders: [
            { ...acceptedOrder, accepted_by_courier_id: courierId, status: "készül" },
            ...myOrders,
          ],
        });
      }
    } catch (error) {
      console.error("Accept order error:", error);
      throw error;
    }
  },

  updateOrderStatus: async (orderId: string, status: DeliveryStatus) => {
    try {
      const { error } = await supabase
        .from("delivery_orders")
        .update({ status })
        .eq("id", orderId);

      if (error) throw error;

      // Update local state
      set((state) => ({
        myOrders: state.myOrders.map((order) =>
          order.id === orderId ? { ...order, status } : order
        ),
      }));
    } catch (error) {
      console.error("Update order status error:", error);
      throw error;
    }
  },

  cancelOrder: async (orderId: string) => {
    try {
      const { error } = await supabase
        .from("delivery_orders")
        .update({ 
          status: "mégsem",
          accepted_by_courier_id: null 
        })
        .eq("id", orderId);

      if (error) throw error;

      // Update local state
      set((state) => ({
        myOrders: state.myOrders.filter((order) => order.id !== orderId),
        availableOrders: [
          ...state.availableOrders,
          ...state.myOrders.filter((order) => order.id === orderId),
        ],
      }));
    } catch (error) {
      console.error("Cancel order error:", error);
      throw error;
    }
  },

  subscribeToOrders: () => {
    const subscription = supabase
      .channel("delivery_orders")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "delivery_orders" },
        (payload) => {
          set((state) => ({
            availableOrders: [payload.new, ...state.availableOrders],
          }));
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  },
}));
