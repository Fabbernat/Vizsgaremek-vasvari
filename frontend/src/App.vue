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

const products = [
  {
    name: 'Pizza Margherita',
    price: 2490,
    img: pizza,
    description: 'Paradicsomszósz, mozzarella, bazsalikom',
    isSecondary: false
  },
  {
    name: 'Hamburger',
    price: 2990,
    img: hamburger,
    description: 'Marhahús, sajt, saláta, szósz',
    isSecondary: false
  },
  {
    name: 'Caesar saláta',
    price: 2290,
    img: salad,
    description: 'Csirkemell, parmezán, öntet',
    isSecondary: true
  }
]

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

function addToCart(product) {
  alert(`Kosárba tettél egy ${product.name}-t!`)
}

</script>

<template>
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
      <main class="menu">
  <div class="card" v-for="product in products" :key="product.name">
    <img :src="product.img" :alt="product.name" width="220px" />
    <div class="card-header">
      <h2>{{ product.name }}</h2>
      <span class="price">{{ product.price.toLocaleString('hu-HU') }} Ft</span>
    </div>
    <p>{{ product.description }}</p>
    <div
      class="action"
      :class="{ secondary: product.isSecondary }"
      @click="addToCart(product)"
    >
      Kosárba teszem
    </div>
  </div>
</main>

    </main>
  </div>

  <!-- NAVBAR + LINKEK MINDIG -->
  <nav class="nav-bar nav-links">
    <a href="#/">Főoldal</a> |
    <a href="#/about">Rólunk</a>
  </nav>
</template>

<style>
body {
  margin: 0;
  font-family: "Segoe UI", system-ui, sans-serif;
  background-color: #f4f6f8;
  padding-bottom: 60px;
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
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
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

/* NAV-BAR */
.nav-bar {
  position: sticky;
  top: 0;
  z-index: 1000;

  background-color: #ffffff;
  padding: 0.75rem 1rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);

  z-index: 1000;
  text-align: center;
}

.nav-bar a {
  color: #333;
  text-decoration: none;
  font-weight: 600;
  margin: 0 0.5rem;
}

.nav-bar a:hover {
  color: #ff9800;
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
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
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
