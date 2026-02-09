<script setup lang="ts">
import { useAuthStore } from '../stores/auth'
const auth = useAuthStore()

// hozzáadjuk a pizzát a localStorage-hoz
const localStorageItems = [...Object.keys(localStorage).map(key => ({ key, value: localStorage.getItem(key) }))];
console.log('Local Storage Items:', localStorageItems);

</script>

<template>
  <nav class="navbar">
    <ul>
        <!-- rendes routerlinkek -->
        <li>
          <RouterLink to="/auth">
            {{ auth.isLoggedIn
              ? 'Fiók 👤'
              : auth.currentView === 'login'
                ? 'Bejelentkezés 🔐🤰'
                : 'Regisztráció👨‍👨‍👦‍👦'
            }}
          </RouterLink>
        </li>
        <li><RouterLink to="/cart">🛒</RouterLink></li>
        <li><RouterLink to="/meals">Ételek .|.</RouterLink></li>
        <li><RouterLink to="/restaurants">Éttermek °|°</RouterLink></li>
      <li><RouterLink to="/">🍕</RouterLink></li>
    </ul>
  </nav>
</template>
