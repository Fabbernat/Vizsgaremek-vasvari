<script setup lang="ts">
const restaurants = [
  { name: 'Király Risztró', description: 'Finom és friss ételek várnak minden látogatot!', image: '/src/assets/royal-delivery-logo.png' }
]
</script>

<template>
  <h3>Ez az Éttermek oldal</h3>

  <ul>
    <li v-for="restaurant in restaurants" :key="restaurant.name">
      <strong>{{ restaurant.name }}</strong><br />
      {{ restaurant.description }}<br />
      {{ restaurant.image }}<br />
      <button>Kiválasztás</button>
    </li>
  </ul>
</template>
