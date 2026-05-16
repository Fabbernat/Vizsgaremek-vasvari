import { create } from "zustand";
import { supabase } from "@/supabase";
import { Courier } from "./deliveryOrder";

interface CourierAuthStore {
  courier: Courier | null;
  loading: boolean;
  isLoggedIn: boolean;

  // Actions
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  setOnlineStatus: (status: "online" | "offline") => Promise<void>;
  updateProfile: (updates: Partial<Courier>) => Promise<void>;
  fetchCourierProfile: () => Promise<void>;
}

export const useCourierAuth = create<CourierAuthStore>((set, get) => ({
  courier: null,
  loading: false,
  isLoggedIn: false,

  login: async (email: string, password: string) => {
    set({ loading: true });
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Fetch courier profile from database
      const { data: courierData, error: courierError } = await supabase
        .from("couriers")
        .select("*")
        .eq("email", email)
        .single();

      if (courierError) throw courierError;

      set({ 
        courier: courierData, 
        isLoggedIn: true, 
        loading: false 
      });
    } catch (error) {
      console.error("Login error:", error);
      set({ loading: false });
      throw error;
    }
  },

  logout: async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      set({ courier: null, isLoggedIn: false });
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  },

  setOnlineStatus: async (status: "online" | "offline") => {
    const { courier } = get();
    if (!courier) return;

    try {
      const { error } = await supabase
        .from("couriers")
        .update({ status })
        .eq("id", courier.id);

      if (error) throw error;

      set({ courier: { ...courier, status } });
    } catch (error) {
      console.error("Status update error:", error);
      throw error;
    }
  },

  updateProfile: async (updates: Partial<Courier>) => {
    const { courier } = get();
    if (!courier) return;

    try {
      const { error } = await supabase
        .from("couriers")
        .update(updates)
        .eq("id", courier.id);

      if (error) throw error;

      set({ courier: { ...courier, ...updates } });
    } catch (error) {
      console.error("Profile update error:", error);
      throw error;
    }
  },

  fetchCourierProfile: async () => {
    set({ loading: true });
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData.session) throw new Error("No session");

      const { data: courierData, error } = await supabase
        .from("couriers")
        .select("*")
        .eq("email", sessionData.session.user.email)
        .single();

      if (error) throw error;

      set({ courier: courierData, isLoggedIn: true, loading: false });
    } catch (error) {
      console.error("Fetch profile error:", error);
      set({ loading: false });
    }
  },
}));
