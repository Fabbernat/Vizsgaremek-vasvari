// import { ref, computed } from 'vue'
// import { defineStore } from 'pinia'

// export const useDeliveryStore = defineStore('delivery', () => {
//   const cart = ref([])

//   const addToCart = (id) =>{
//     let p = cart.value.find((p) => id == p.id)
//     if(p != undefined){
//       p.q+=1
//     }
//     else{
//       cart.value.push({
//         id: id,
//         q: 1 
//       })
//     }
//     console.log(cart.value);
    
//   }

//   return { addToCart }
// })
import { defineStore } from 'pinia'

export const useDeliveryStore = defineStore('delivery', {
  state: () => ({
    cart: []
  }),

  getters: {
    cartCount: (state) =>
      state.cart.reduce((sum, item) => sum + item.quantity, 0),

    totalPrice: (state) =>
      state.cart.reduce((sum, item) =>
        sum + Number(item.price) * item.quantity, 0)
  },

  actions: {
    addToCart(meal) {
      const existing = this.cart.find(item => item.id === meal.id)

      if (existing) {
        existing.quantity = existing.quantity + 1
      } else {
        this.cart.push({
          ...meal,
          price: Number(meal.price), // 🔥 fontos
          quantity: 1
        })
      }
    },

    increase(id) {
      const item = this.cart.find(i => i.id === id)
      if (item) {
        item.quantity = item.quantity + 1
      }
    },

    decrease(id) {
      const item = this.cart.find(i => i.id === id)
      if (!item) return

      if (item.quantity > 1) {
        item.quantity = item.quantity - 1
      } else {
        this.removeItem(id)
      }
    },

    removeItem(id) {
      const index = this.cart.findIndex(item => item.id === id)
      if (index !== -1) {
        this.cart.splice(index, 1) // 🔥 EZ A FIX
      }
    }
  }
})