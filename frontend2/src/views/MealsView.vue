<script setup lang="ts">
import { useCartStore } from '../stores/cart'
import { useMealsStore } from '../stores/meals'
const cart = useCartStore()
const store = useMealsStore()
</script>

<template>
  <h3>Ez az ételek oldal</h3>

  <ul>
    <li v-for="meal in store.meals" :key="meal.name">
    <li>{{ meal.name }}</li>
    <li>{{ meal.description }}</li>
    <li>{{ meal.price }} Ft</li>
    <button @click="cart.add({ name: meal.name, price: meal.price })">
      Kosárba tesz
    </button>
    </li>
  </ul>
</template>
