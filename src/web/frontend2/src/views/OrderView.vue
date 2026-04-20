<script setup lang="ts">
import { useRouter } from 'vue-router'
import { RouterLink } from 'vue-router'

const router = useRouter()
</script>

<template>
  <h3>Ez a megrendelés oldal</h3>

  <button @click="router.back()">Vissza</button>
  <button @click="router.forward()">Előre</button>
  <div class="order">
    <form action="#" method="POST">
      <h4>Számlázási adatok</h4>
      <input type="text" name="fullname" placeholder="Gipsz Jakab" required><br><br>
      <input type="email" name="email" placeholder="gipszjakab@gmail.com" required><br><br>
      <input type="tel" name="phone" placeholder="+36 30 1234567"><br><br>

      <legend>
        <h5>Cím</h5>
        <label for="postcode">Irányítószám:</label><br>
        <input type="text" name="postcode" placeholder="Irányítószám" required><br><br>
        <label for="settlement ">Település:</label><br>
        <input type="text" name="settlement" placeholder="Szeged" required><br><br>
        <label for="name-of-place">Közterület neve:</label><br>
        <input type="text" name="name-of-place" placeholder="Rákóczi" required><br><br>
        <label for="type-of-place">Közterület jellege:</label><br>
        <input type="text" name="type-of-place" placeholder="utca" required><br><br>
        <label for="house-number">Házszám:</label><br>
        <input type="text" name="house-number" placeholder="453." required><br><br>
        <label for="additional-info">Emelet, lakás, ajtó, stb.:</label><br>
        <input type="text" name="additional-info" placeholder="1. emelet, 2. ajtó"><br><br>
      </legend>

      <legend>
        <h5>Bankkártya adatok</h5>
        <label for="card-number">Kártyaszám:</label><br>
        <input type="text" name="card-number" placeholder="1234 5678 9012 3456" required><br><br>
        <label for="expiry-date">Lejárati dátum:</label><br>
        <input type="text" name="expiry-date" placeholder="MM/YY" required><br><br>
        <label for="cvv">CVV/CVC:</label><br>
        <input type="text" name="cvv" placeholder="123" required><br><br>
      </legend>
    </form>
  </div>

  <RouterLink to="/checkout">Tovább a fizetéshez</RouterLink>
</template>
