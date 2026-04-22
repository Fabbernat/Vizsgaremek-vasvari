import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useDeliveryStore = defineStore('delivery', () => {
  const cart = ref([])

  const addToCart = (id) =>{
    let p = cart.value.find((p) => id == p.id)
    if(p != undefined){
      p.q+=1
    }
    else{
      cart.value.push({
        id: id,
        q: 1 
      })
    }
    console.log(cart.value);
    
  }

  return { addToCart }
})
