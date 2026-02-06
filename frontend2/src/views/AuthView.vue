<script setup lang="ts">
import { useAuthStore } from '../stores/auth'
const auth = useAuthStore()
</script>

<template>
  <div v-if="auth.isLoggedIn">
    <h3>Ez a profil oldal</h3>
    <button @click="auth.logout()">Kijelentkezés</button>
  </div>

  <div v-else-if="auth.currentView === 'login'">
    <h3>Ez a bejelentkezés oldal</h3>

    <form @submit.prevent="auth.login()">
      <input placeholder="Felhasználónév" />
      <input type="password" placeholder="Jelszó" />
      <button>Bejelentkezés</button>
    </form>

    <p>
      Még nincs fiókod?
      <a href="#" @click.prevent="auth.switchToRegister()">Regisztráció</a>
    </p>
  </div>

  <div v-else>
    <h3>Ez a regisztráció oldal</h3>

    <form>
      <input placeholder="Felhasználónév" />
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Jelszó" />
      <button>Regisztráció</button>
    </form>

    <p>
      Már van fiókod?
      <a href="#" @click.prevent="auth.switchToLogin()">Bejelentkezés</a>
    </p>
  </div>
</template>
