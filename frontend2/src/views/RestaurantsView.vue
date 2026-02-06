<script setup lang="ts">
const restaurants = [
  { name: 'Király Pizza', description: 'Finom', image: 'img.png' }
]
</script>

<template>
  <h3>Ez az Éttermek oldal</h3>

  <ul>
    <li v-for="r in restaurants" :key="r.name">
      <strong>{{ r.name }}</strong><br />
      {{ r.description }}<br />
      {{ r.image }}<br />
      <button>Kiválasztás</button>
    </li>
  </ul>
</template>
