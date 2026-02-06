<script setup lang="ts">
import { useCartStore } from '../stores/cart'
const cart = useCartStore()

const meals = [
  { name: 'Pizza', description: 'Sajt', price: 2500, image: 'img.png' },
  { name: 'Hamburger', description: 'Hús', price: 3000, image: 'img.png' },
  { name: 'Sushi', description: 'Hal', price: 4000, image: 'img.png' },
  { name: 'Kóla', description: 'Szénsavas üdítő', price: 500, image: 'img.png' }
]
</script>

<template>
  <h3>Ez az ételek oldal</h3>

  <ul>
    <li v-for="meal in meals" :key="meal.name">
    <li>{{ meal.name }}</li>
    <li>{{ meal.description }}</li>
    <li>{{ meal.image }}</li>
    <button @click="cart.add({ name: meal.name, price: meal.price })">
      Kosárba tesz
    </button>
    </li>
  </ul>
</template>
