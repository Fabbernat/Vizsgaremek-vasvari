<script setup lang="ts">
import { useAuthStore } from '../stores/auth'
const auth = useAuthStore()
</script>

<template>
  <nav class="navbar">
    <ul>
        <!-- rendes routerlinkek -->
      <li><RouterLink to="/">Főoldal</RouterLink></li>
      <li><RouterLink to="/restaurants">Éttermek</RouterLink></li>
      <li><RouterLink to="/meals">Ételek</RouterLink></li>
      <li><RouterLink to="/cart">Kosár</RouterLink></li>
      <li>
        <RouterLink to="/auth">
          {{ auth.isLoggedIn
            ? 'Fiók'
            : auth.currentView === 'login'
              ? 'Bejelentkezés'
              : 'Regisztráció'
          }}
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>
