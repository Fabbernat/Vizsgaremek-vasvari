<script setup lang="ts">
import { useRouter } from 'vue-router'
import { RouterLink } from 'vue-router'

const router = useRouter()
</script>

<template>
  <h3>Ez a megrendelés oldal</h3>

  <button @click="router.back()">Vissza</button>
  <button @click="router.forward()">Előre</button>

  <form>
    <h4>Számlázási adatok</h4>
    <input placeholder="Gipsz Jakab" />
    <input placeholder="Email" />
    <input placeholder="Telefon" />
  </form>

  <RouterLink to="/checkout">Tovább a fizetéshez</RouterLink>
</template>
