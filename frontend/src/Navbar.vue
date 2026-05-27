<script setup>
import royalDeliveryLogo from './assets/royal-delivery-logo.png'
import profileUserAccount from './assets/profile-user-account.svg'
import shoppingCartIcon from './assets/white-cart.png'

defineProps({
  cartCount: Number
})

const emit = defineEmits(['open-cart'])
</script>

<template>
  <nav class="navbar">
    <a href="#/" class="brand">
      <img :src="royalDeliveryLogo" alt="Royal Delivery" />
      <span>Royal Delivery</span>
    </a>

    <div class="nav-links">
      <a href="#/">Étlap</a>
      <a href="#/about">Rólunk</a>

      <img class="profile-icon" :src="profileUserAccount" alt="Profil" />

      <button class="cart-button" @click="emit('open-cart')">
        <img :src="shoppingCartIcon" alt="Kosár" />
        <span v-if="cartCount > 0" class="cart-badge">
          {{ cartCount }}
        </span>
      </button>
    </div>
  </nav>
</template>