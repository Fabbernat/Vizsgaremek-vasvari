import { defineStore } from 'pinia'

export interface CartItem {
  name: string
  price: number
}

const items: CartItem[] = []

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [

    ] as CartItem[],
    totalPrice: items.reduce((total, item) => total + item.price, 0)
  }),
  actions: {
    add(item: CartItem) {
      this.items.push(item)
    }
  }
})
