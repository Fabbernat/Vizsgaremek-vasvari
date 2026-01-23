<script setup>
import { computed } from 'vue'

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
          <td colspan="3" class="total-label">Összesen</td>
          <td class="right total">{{ formatFt(total) }}</td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<style scoped>
.cart-view {
  max-width: 720px;
  margin: 2rem auto;
  padding: 2rem;
  background: #000000;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.08);
}

h1 {
  margin-bottom: 1rem;
}

.empty {
  text-align: center;
  color: #777;
}

.cart-table {
  width: 100%;
  border-collapse: collapse;
}

.cart-table th {
  background: #270303;
  font-weight: 600;
  padding: 12px;
}

.cart-table td {
  padding: 12px;
  border-bottom: 1px solid #031335;
}

.cart-table tr:last-child td {
  border-bottom: none;
}

.right {
  text-align: right;
}

tfoot td {
  padding-top: 16px;
}

.total-label {
  font-weight: 600;
}

.total {
  font-size: 1.2rem;
  font-weight: 700;
}
</style>
