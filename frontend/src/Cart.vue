<script setup>
import { computed } from 'vue'

const props = defineProps({
  cart: Array
})

const total = computed(() =>
  props.cart.reduce((sum, p) => sum + p.price * p.qty, 0)
)
</script>

<template>
  <div class="cart-view">
    <h1>Kosár tartalma</h1>

    <p v-if="cart.length === 0">A kosár üres.</p>

    <ul v-else>
      <li v-for="item in cart" :key="item.name">
        {{ item.name }} – {{ item.qty }} db – {{ item.price * item.qty }} Ft
      </li>
    </ul>

    <h3 v-if="cart.length">Összesen: {{ total }} Ft</h3>
  </div>
</template>

<style scoped>
.cart-view {
  padding: 2rem;
  max-width: 600px;
  margin: auto;
}
</style>
