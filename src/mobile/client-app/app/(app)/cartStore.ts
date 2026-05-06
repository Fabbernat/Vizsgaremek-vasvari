// client-app/app/CartStore.ts
import { create } from "zustand";
import { Meal } from "../../models/meal";

// ── Types ─────────────────────────────────────────────────────────────────────

// CartItem extends Meal so mealsScreen can pass a Meal directly
export type CartItem = Meal & { quantity: number };

// ── Zustand store ─────────────────────────────────────────────────────────────

type CartStore = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartStore>((set) => ({
  items: [],

  addItem: (item) =>
  set((state) => {
    const quantityToAdd = item.quantity ?? 1;
    const existing = state.items.find((i) => i.id === item.id);

    if (existing) {
      return {
        items: state.items.map((i) =>
          i.id === item.id
            ? { ...i, quantity: i.quantity + quantityToAdd }
            : i
        ),
      };
    }

    return {
      items: [...state.items, { ...item, quantity: quantityToAdd }],
    };
  }),

  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((i) => i.id !== id),
    })),

  clearCart: () => set({ items: [] }),
}));

// ── Plain-function API (for use outside React components) ─────────────────────
// mealsScreen.tsx imports addToGuestCart directly — it can't use hooks.
// useCartStore.getState() gives us store actions without needing a component.

export function addToGuestCart(meal: Meal, quantity = 1) {
  useCartStore.getState().addItem({ ...meal, quantity });
}

export function removeFromCart(id: string) {
  useCartStore.getState().removeItem(id);
}

export function clearGuestCart() {
  useCartStore.getState().clearCart();
}

// Aliases kept for any existing call sites
export const remove = removeFromCart;

// ── Hook (convenience selector) ───────────────────────────────────────────────

export const useCart = () => useCartStore((state) => state.items);
