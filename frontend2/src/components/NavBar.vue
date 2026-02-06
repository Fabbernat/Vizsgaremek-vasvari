<script setup lang="ts">
import { useAuthStore } from '../stores/auth'
const auth = useAuthStore()
</script>

<template>
  <nav class="navbar">
    <ul>
        
        <!-- dummy router amíg a rendes nem működik -->
        <li><a href="index.html">Főoldal</a></li>
        <li><a href="restaurants.html">Éttermek</a></li>
        <li><a href="meals.html">Ételek</a></li>
        <li><a href="cart.html">Kosár</a></li>
        <li><a href="auth.html">{{ auth.isLoggedIn ? "Fiók" : "Bejelentkezés" }}</a></li>

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
