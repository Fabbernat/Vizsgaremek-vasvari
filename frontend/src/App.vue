<script setup>
  // Kepek
import pizza from './assets/pizza-margherita.jpg'
import hamburger from './assets/hamburger.jpg'
import salad from './assets/caesar-salad.jpg'

  // Routing
import { ref, computed } from 'vue'
import Home from './Home.vue'
import About from './About.vue'
import NotFound from './NotFound.vue'

const routes = {
  '/': Home,
  '/about': About
}

const currentPath = ref(window.location.hash)

window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash
})

const currentView = computed(() => {
  return routes[currentPath.value.slice(1) || '/'] || NotFound
})

// A Home-hoz tartozó UI-t feltételesen rendereljük csak akkor, ha az aktuális útvonal `/`.
const isHome = computed(() => {
  return (currentPath.value.slice(1) || '/') === '/'
})
</script>

<template>
    <!-- NAVBAR + LINKEK MINDIG -->
  <nav class="nav-bar nav-links" style="text-align: center; margin: 1rem 0;">
  <a href="#/">Home</a> |
  <a href="#/about">About</a> |
  <a href="#/non-existent-path">Broken Link</a>
  </nav>

   <!-- Aktuális oldal (Home / About / 404 szöveg) -->
  <component :is="currentView" />

  <!-- HOME CONTENT CSAK HOME ESETÉN -->
    <div v-if="isHome" class="app">
    <nav class="navbar">
      <div class="logo">Royal Delivery</div>
      <div class="nav-items">
        <span>Étlap</span>
        <span>Kosár</span>
        <span>Profil</span>
      </div>
    </nav>

    <header class="hero">
      <h1>Mit ennél ma?</h1>
      <p>Rendelj gyorsan és egyszerűen kedvenc ételeid közül</p>
    </header>

    <main class="menu">
      <div class="card">
        <img :src="pizza" alt="Pizza Margherita" width="220px"/>
        <div class="card-header">
          <h2>Pizza Margherita</h2>
          <span class="price">2 490 Ft</span>
        </div>
        <p>Paradicsomszósz, mozzarella, bazsalikom</p>
        <div class="action">Kosárba teszem</div>
      </div>

      <div class="card">
        <img :src="hamburger" alt="Hamburger" width="220px"/>
        <div class="card-header">
          <h2>Hamburger</h2>
          <span class="price">2 990 Ft</span>
        </div>
        <p>Marhahús, sajt, saláta, szósz</p>
        <div class="action">Kosárba teszem</div>
      </div>

      <div class="card">
        <img :src="salad" alt="Caesar saláta" width="220px"/>
        <div class="card-header">
          <h2>Caesar saláta</h2>
          <span class="price">2 290 Ft</span>
        </div>
        <p>Csirkemell, parmezán, öntet</p>
        <div class="action secondary">Kosárba teszem</div>
      </div>
    </main>
  </div>
</template>

<style>
body {
  margin: 0;
  font-family: "Segoe UI", system-ui, sans-serif;
  background-color: #f4f6f8;
}

.app {
  min-height: 100vh;
}

/* NAVBAR */
.navbar {
  background-color: #ffffff;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 6px rgba(0,0,0,0.08);
}

.logo {
  font-size: 1.4rem;
  font-weight: 700;
  color: #ff9800;
}

.nav-items span {
  margin-left: 1.5rem;
  cursor: pointer;
  color: #333;
}

/* HERO */
.hero {
  padding: 3rem 2rem;
  text-align: center;
}

.hero h1 {
  margin-bottom: 0.5rem;
  font-size: 2.2rem;
}

/* MENU GRID */
.menu {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  padding: 2rem;
  max-width: 1200px;
  margin: auto;
}

/* CARD */
.card {
  background-color: #ffffff;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  display: flex;
  flex-direction: column;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.price {
  font-weight: bold;
  color: #444;
}

.card p {
  margin: 1rem 0;
  color: #555;
}

/* ACTION */
.action {
  margin-top: auto;
  padding: 0.75rem;
  text-align: center;
  border-radius: 8px;
  background-color: #ff9800;
  color: white;
  cursor: pointer;
  font-weight: 600;
}

.action:hover {
  background-color: #e68900;
}

.action.secondary {
  background-color: #4caf50;
}

.action.secondary:hover {
  background-color: #449d48;
}
</style>
