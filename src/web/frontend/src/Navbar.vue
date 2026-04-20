<script>
import royalDeliveryLogo from './assets/royal-delivery-logo.png'
</script>

<template>
  <nav class="navbar">
    <img :src="royalDeliveryLogo" />
    <span>Étlap</span>
    <span>Profil</span>

    <div class="cart-icon" @click="$emit('open-cart')">
      🛒 {{ cartCount }}
    </div>
  </nav>
</template>
