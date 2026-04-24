import { useState, useEffect } from "react";
import { Meal } from "./models/meal";

export type CartItem = Meal & { quantity: number };

let guestCart: CartItem[] = [];
let listeners: ((cart: CartItem[]) => void)[] = [];

function notify() {
  listeners.forEach((l) => l([...guestCart]));
}

//  ADD
export function addToGuestCart(meal: Meal) {
  const existing = guestCart.find((i) => i.id === meal.id);

  if (existing) {
    existing.quantity += 1;
  } else {
    guestCart.push({ ...meal, quantity: 1 });
  }

  notify();
}

//  REMOVE
export function removeFromCart(id: string) {
  guestCart = guestCart.filter((i) => i.id !== id);
  notify();
}

//  CLEAR
export function clearGuestCart() {
  guestCart = [];
  notify();
}

//  HOOK
export function useCart() {
  const [state, setState] = useState<CartItem[]>(guestCart);

  useEffect(() => {
    if (!listeners.includes(setState)) {
  listeners.push(setState);
}
    return () => {
      listeners = listeners.filter((l) => l !== setState);
    };
  }, []);

  return state;
}

export function remove(id: string) {
  removeFromCart(id);
}
