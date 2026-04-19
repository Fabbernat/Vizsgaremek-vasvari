import { Meal } from "./models/meal";

export let guestCart: Meal[] = [];

export function addToGuestCart(meal: Meal) {
  guestCart.push(meal);
}

export function getGuestCart() {
  return guestCart;
}

export function clearGuestCart() {
  guestCart = [];
}