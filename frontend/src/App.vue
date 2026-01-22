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


const cartCount = ref(0)
function addToCart() {
  cartCount.value++
}
function openCart() {
  alert('Kosár megnyitása (később fejleszthető)')
}
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
        <div class="cart-container">
          <!-- Bevásárlókocsi ikon + piros badge -->
          <div class="cart-icon" @click="openCart">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24" height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M7 18c-1.104 0-2 .896-2 2s.896 2 2 2 2-.896 2-2-.896-2-2-2zm10 0c-1.104 0-2 .896-2 2s.896 2 2 2 2-.896 2-2-.896-2-2-2zm-12.826-3l1.602-6h12.353l1.163 4.908a.999.999 0 0 1-.962 1.182h-13.156z"/>
            </svg>
            <span v-if="cartCount > 0" class="cart-badge">{{ cartCount }}</span>
            <svg src="./assets/shopping-cart.webp"></svg>
          </div>
        <span>Profil</span>
      </div>
      </div>
    </nav>

    <header class="hero">
      <h1>Mit ennél ma?</h1>
      <p>Rendelj gyorsan és egyszerűen kedvenc ételeid közül</p>
    </header>

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
      <button @click="addToCart">Kosárba teszem</button>
    </div>
      </div>
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

<style scoped>
.cart-container {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.cart-icon {
  position: relative;
  cursor: pointer;
  color: #333;
}

.cart-badge {
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: red;
  color: white;
  font-size: 12px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
}
</style>