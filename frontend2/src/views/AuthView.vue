<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'

const auth = useAuthStore()
const username = ref('')
const email = ref('')
const password = ref('')
</script>

<template>
  <div v-if="auth.isLoggedIn">
    <h3>Üdvözlünk {{ auth.username }}!</h3>
    <button @click="auth.logout()">Kijelentkezés</button>
  </div>

  <div v-else-if="auth.currentView === 'login'">
    <h3>Ez a bejelentkezés oldal</h3>

    <form @submit.prevent="auth.login(username)">
      <label for="username">Felhasználónév:</label>
      <input id="username" v-model="username" placeholder="Felhasználónév" required title="A felhasználónév megadása kötelező"/>
      <label for="password">Jelszó:</label>
      <input id="password" v-model="password" type="password" placeholder="Jelszó" required title="A jelszó megadása kötelező"/>
      <input type="submit" value="Bejelentkezés" />
    </form>
    <div>
      <p>
        Még nincs fiókod?
        <a href="#" @click.prevent="auth.switchToRegister()">Regisztráció</a>
      </p>
    </div>
  </div>

  <div v-else>
    <h3>Ez a regisztráció oldal</h3>

    <form @submit.prevent="auth.register(username, email)">
      <label for="username">Felhasználónév:</label>
      <input id="username" v-model="username" placeholder="Felhasználónév" required title="A felhasználónév megadása kötelező"/>
      <label for="email">Email:</label>
      <input id="email" v-model="email" type="email" placeholder="Email" required title="Az email megadása kötelező"/>
      <label for="password">Jelszó:</label>
      <input id="password" v-model="password" type="password" placeholder="Jelszó" required title="A jelszó megadása kötelező"/>
      <input type="submit" value="Regisztráció" />
    </form>
    <div>
      <p>
        Már van fiókod?
        <a href="#" @click.prevent="auth.switchToLogin()">Bejelentkezés</a>
      </p>
    </div>
  </div>
</template>
