// client-app/app/cartStore.ts
import { useState } from "react";
import { Meal } from "./models/meal";

export let guestCart: Meal[] = [];
let listeners: ((guestCart: Meal[]) => void)[] = [];
let quantity = 0;
function notify() {
  listeners.forEach((l) => l(guestCart));
}

export function addToGuestCart(meal: Meal) {
  const existing = guestCart.find((i) => i.id === meal.id);

  if (existing) {
    quantity += 1;
  } else {
    guestCart.push({ ...meal });
    quantity = 1;
  }

  notify();
}

export function useCart() {
  const [state, setState] = useState<Meal[]>(guestCart);

  if (!listeners.includes(setState)) {
    listeners.push(setState);
  }

  return state;
}

export function removeFromCart(id: string) {
  guestCart = guestCart.filter((i) => i.id !== id);
  notify();
}

export function getGuestCart() {
  return guestCart;
}

export function clearGuestCart() {
  guestCart = [];
  notify();
}
