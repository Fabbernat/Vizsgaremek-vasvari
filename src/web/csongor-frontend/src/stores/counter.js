import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const cart = ref([])

  const addToCart = () =>{
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

  }

  return { count, doubleCount, increment }
})
