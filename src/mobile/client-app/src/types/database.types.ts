export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      meals: {
        Row: {
          description: string
          id: number
          image_url: string | null
          name: string
          price: number
          producer_id: number
        }
        Insert: {
          description?: string
          id?: number
          image_url?: string | null
          name?: string
          price?: number
          producer_id: number
        }
        Update: {
          description?: string
          id?: number
          image_url?: string | null
          name?: string
          price?: number
          producer_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "meals_producer_id_fkey"
            columns: ["producer_id"]
            isOneToOne: false
            referencedRelation: "producer_details"
            referencedColumns: ["producer_id"]
          },
          {
            foreignKeyName: "meals_producer_id_fkey"
            columns: ["producer_id"]
            isOneToOne: false
            referencedRelation: "producers"
            referencedColumns: ["id"]
          },
        ]
      }
      order_items: {
        Row: {
          id: number
          meal_id: number
          order_id: number
          producer_id: number
          quantity: number
          unit_price: number
        }
        Insert: {
          id?: number
          meal_id: number
          order_id: number
          producer_id: number
          quantity?: number
          unit_price: number
        }
        Update: {
          id?: number
          meal_id?: number
          order_id?: number
          producer_id?: number
          quantity?: number
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_items_meal_id_fkey"
            columns: ["meal_id"]
            isOneToOne: false
            referencedRelation: "meals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_producer_id_fkey"
            columns: ["producer_id"]
            isOneToOne: false
            referencedRelation: "producer_details"
            referencedColumns: ["producer_id"]
          },
          {
            foreignKeyName: "order_items_producer_id_fkey"
            columns: ["producer_id"]
            isOneToOne: false
            referencedRelation: "producers"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          delivered: boolean
          id: number
          ordered_at: string
          producer_id: number
          status: string
          user_id: number
        }
        Insert: {
          delivered?: boolean
          id?: number
          ordered_at?: string
          producer_id: number
          status?: string
          user_id: number
        }
        Update: {
          delivered?: boolean
          id?: number
          ordered_at?: string
          producer_id?: number
          status?: string
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "orders_producer_id_new_fkey"
            columns: ["producer_id"]
            isOneToOne: false
            referencedRelation: "producer_details"
            referencedColumns: ["producer_id"]
          },
          {
            foreignKeyName: "orders_producer_id_new_fkey"
            columns: ["producer_id"]
            isOneToOne: false
            referencedRelation: "producers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      producers: {
        Row: {
          id: number
          restaurant_id: number | null
          shop_id: number | null
          type: Database["public"]["Enums"]["producer_type"]
        }
        Insert: {
          id?: never
          restaurant_id?: number | null
          shop_id?: number | null
          type: Database["public"]["Enums"]["producer_type"]
        }
        Update: {
          id?: never
          restaurant_id?: number | null
          shop_id?: number | null
          type?: Database["public"]["Enums"]["producer_type"]
        }
        Relationships: [
          {
            foreignKeyName: "producers_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: true
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "producers_shop_id_fkey"
            columns: ["shop_id"]
            isOneToOne: true
            referencedRelation: "shops"
            referencedColumns: ["id"]
          },
        ]
      }
      restaurants: {
        Row: {
          id: number
          name: string
          owner_id: number
        }
        Insert: {
          id?: number
          name?: string
          owner_id: number
        }
        Update: {
          id?: number
          name?: string
          owner_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "restaurants_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      shops: {
        Row: {
          id: number
          name: string
          owner_id: number
        }
        Insert: {
          id?: number
          name?: string
          owner_id: number
        }
        Update: {
          id?: number
          name?: string
          owner_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "shops_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          address: string
          email: string
          first_name: string
          id: number
          last_name: string
          password_hash: string
          role: string
          username: string
        }
        Insert: {
          address?: string
          email: string
          first_name?: string
          id?: number
          last_name?: string
          password_hash: string
          role?: string
          username: string
        }
        Update: {
          address?: string
          email?: string
          first_name?: string
          id?: number
          last_name?: string
          password_hash?: string
          role?: string
          username?: string
        }
        Relationships: []
      }
    }
    Views: {
      producer_details: {
        Row: {
          name: string | null
          owner_id: number | null
          producer_id: number | null
          restaurant_id: number | null
          shop_id: number | null
          type: Database["public"]["Enums"]["producer_type"] | null
        }
        Relationships: [
          {
            foreignKeyName: "producers_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: true
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "producers_shop_id_fkey"
            columns: ["shop_id"]
            isOneToOne: true
            referencedRelation: "shops"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      f: { Args: never; Returns: undefined }
    }
    Enums: {
      producer_type: "restaurant" | "shop"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      producer_type: ["restaurant", "shop"],
    },
  },
} as const
