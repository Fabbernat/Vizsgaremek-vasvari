<script setup>
import { computed } from 'vue'
import "./styles/cart.css"

const props = defineProps({
  cart: {
    type: Array,
    required: true
  }
})

const total = computed(() =>
  props.cart.reduce((sum, p) => sum + p.price * p.qty, 0)
)

const formatFt = (value) =>
  value.toLocaleString('hu-HU') + ' Ft'
</script>

<template>
  <div class="cart-view">
    <h1>Kosár tartalma</h1>

    <p v-if="cart.length === 0" class="empty">
      🛒 A kosár üres.
    </p>

    <table v-else class="cart-table">
      <thead>
        <tr>
          <th>Termék</th>
          <th>Mennyiség</th>
          <th class="right">Egységár</th>
          <th class="right">Részösszeg</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="item in cart" :key="item.name">
          <td>{{ item.name }}</td>
          <td>{{ item.qty }} db</td>
          <td class="right">{{ formatFt(item.price) }}</td>
          <td class="right">{{ formatFt(item.price * item.qty) }}</td>
        </tr>
      </tbody>

      <tfoot>
        <tr>
          <td colspan="3" class="total-label">Összesen:</td>
          <td class="right total">{{ formatFt(total) }}</td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>
