<script setup lang="ts">
import { useCartStore } from '../stores/cart'
const cart = useCartStore()
</script>

<template>
  <h3>Ez a kosár</h3>
  <div class="card">

    <div v-if="cart.items.length === 0">
      <p>A kosár üres.</p>
    </div>
    <div v-if="cart.items.length > 0" class="cart">
      <p v-for="item in cart.items" :key="item.name">
        {{ item.name }} <br> {{ item.price }} Ft
      </p>
      <p>Összesen: {{ cart.totalPrice }} Ft</p>
    </div>
  </div>
  <RouterLink to="/order">Megrendelés</RouterLink>
</template>
