<script setup lang="ts">
import NavBar from './components/NavBar.vue'
</script>

<template>
  <NavBar />

  <header>
    <h1 class="horizontally-centered">Royal Delivery</h1>
  </header>

  <main>
    <RouterView />
  </main>

  <footer id="contact">
    <h2>Kapcsolat</h2>
    <p>Email: <a href="mailto:info@royaldelivery.com">info@royaldelivery.com</a></p>
    <p>Telefon: +36 123 4567</p>
    <p>Cím: 1234 Budapest, Király utca 1.</p>
  </footer>
</template>

<style>
@import "@/assets/style.css";
</style>
