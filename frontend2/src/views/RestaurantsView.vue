<script setup lang="ts">
const restaurants = [
  { name: 'Király Risztró', description: 'Finom és friss ételek várnak minden látogatót!', image: 'src/assets/pizza-margherita.jpg' },
  { name: 'Pizza Mester', description: 'A legjobb pizzák a városban, friss alapanyagokból!', image: 'src/assets/hamburger.jpg' },
  { name: 'Sushi Szamuráj', description: 'Autentikus japán sushi, amit imádni fogsz!', image: 'src/assets/caesar-salad.jpg' }
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
