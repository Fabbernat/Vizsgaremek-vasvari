<script setup lang="ts">
import { useCartStore } from '../stores/cart'
const cart = useCartStore()
</script>

<template>
  <h3>Ez a kosár</h3>

  <div class="cart">
    <p v-for="item in cart.items" :key="item.name">
      {{ item.name }} – {{ item.price }} Ft
    </p>
  </div>

  <RouterLink to="/order">Megrendelés</RouterLink>
</template>
