import { defineStore } from 'pinia'

export interface CartItem {
  name: string
  price: number
}

const items: CartItem[] = []

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [

    ] as CartItem[]
  }),
  actions: {
    add(item: CartItem) {
      this.items.push(item)
    }
  }
})
