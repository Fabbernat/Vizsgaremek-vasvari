<script setup lang="ts">
import { useRestaurantsStore } from '../stores/restaurants'

const store = useRestaurantsStore()
</script>

<template>
  <h3>Ez az Éttermek oldal</h3>

  <ul>
    <li v-for="restaurant in store.restaurants" :key="restaurant.name">
      <strong>{{ restaurant.name }}</strong><br />
      {{ restaurant.description }}<br />
      {{ restaurant.image }}<br />
      <button v-on:click="store.showRestaurant(restaurant)">Kiválasztás</button>
    </li>
  </ul>
</template>
