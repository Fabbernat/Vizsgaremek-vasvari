<script setup lang="ts">
import { useCartStore } from '../stores/cart'
const cart = useCartStore()

const meals = [
  { name: 'Pizza', description: 'Sajt', price: 2500 }
]
</script>

<template>
  <h3>Ez az ételek oldal</h3>

  <ul>
    <li v-for="m in meals" :key="m.name">
      {{ m.name }} – {{ m.description }}
      <button @click="cart.add({ name: m.name, price: m.price })">
        Kosárba tesz
      </button>
    </li>
  </ul>
</template>
