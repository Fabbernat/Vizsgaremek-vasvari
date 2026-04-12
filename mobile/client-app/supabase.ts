// import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from "@supabase/supabase-js";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";
import "react-native-url-polyfill/auto";

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_KEY!;

const isWeb = Platform.OS === "web";
const isBrowser = typeof window !== "undefined";

const ExpoSecureStoreAdapter = {
  getItem: (key: string) => SecureStore.getItemAsync(key),
  setItem: (key: string, value: string) => SecureStore.setItemAsync(key, value),
  removeItem: (key: string) => SecureStore.deleteItemAsync(key),
};

const WebStorageAdapter = {
  getItem: async (key: string) => {
    if (typeof window === "undefined") return null;
    return window.localStorage.getItem(key);
  },

  setItem: async (key: string, value: string) => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(key, value);
  },

  removeItem: async (key: string) => {
    if (typeof window === "undefined") return;
    window.localStorage.removeItem(key);
  },
};

const storage = Platform.OS === 'web'
  ? WebStorageAdapter
  : ExpoSecureStoreAdapter;

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storage: isWeb ? WebStorageAdapter : ExpoSecureStoreAdapter,
    autoRefreshToken: isBrowser,
    persistSession: isBrowser,
    detectSessionInUrl: isWeb,
  },
});
