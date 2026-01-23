<script>
  import "./styles/app.css"
</script>

<script setup>
import { ref, computed, onMounted } from 'vue'

// Képek
import pizza from './assets/pizza-margherita.jpg'
import hamburger from './assets/hamburger.jpg'
import salad from './assets/caesar-salad.jpg'
import shoppingCartIcon from './assets/shopping-cart.webp'
import royalDeliveryLogo from './assets/royal-delivery-logo.png'

// Oldal komponensek
import Home from './Home.vue'
import About from './About.vue'
import NotFound from './NotFound.vue'
import Cart from './Cart.vue'

const cartCount = ref(0)
const cart = ref([])

function addToCart(product) {
  const existing = cart.value.find(p => p.name === product.name)

  if (existing) {
    existing.qty++
  } else {
    cart.value.push({
      name: product.name,
      price: product.price,
      qty: 1
    })
  }

  cartCount.value++
}

function openCart() {
  window.location.hash = '#/cart'
}

const products = [
  { name: 'Pizza Margherita', price: 2490, img: pizza, description: 'Paradicsomszósz, mozzarella, bazsalikom', isSecondary: false },
  { name: 'Hamburger', price: 2990, img: hamburger, description: 'Marhahús, sajt, saláta, szósz', isSecondary: false },
  { name: 'Caesar saláta', price: 2290, img: salad, description: 'Csirkemell, parmezán, öntet', isSecondary: true }
]

const routes = {
  '/': Home, 
  '/about': About, 
  '/cart': Cart
}

const currentPath = ref(window.location.hash || '#/')

function updatePath() {
  currentPath.value = window.location.hash || '#/'
}
window.addEventListener('hashchange', updatePath)

// Current view komponens
const currentView = computed(() => {
  const path = currentPath.value.slice(1)
  return routes[path] || NotFound
})

// Csak home oldalon jelenik meg a menü
const isHome = computed(() => (currentPath.value.slice(1) || '/') === '/')
</script>

<template  style="color: white;">
  <!-- Aktuális oldal komponense -->
  <component style="color: white;"
  :is="currentView"
  :cart="cart"
/>

  <!-- HOME tartalom -->
    <div v-if="isHome" class="app bg-white text-black">
    <img :src="royalDeliveryLogo" alt="Royal Delivery Logo" width="120" style="display: block; margin: 1rem auto;" />
    <nav class="navbar bg-white text-black">
      <div class="logo-text flex items-center text-black font-semibold">Royal Delivery</div>
      <div class="nav-items">
        <span>Étlap</span>
        <div class="cart-container">
          <div class="cart-icon" @click="openCart">

            <!-- Prebuilt SVG icon -->
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path d="M7 18c-1.104 0-2 .896-2 2s.896 2 2 2 2-.896 2-2-.896-2-2-2zm10 0c-1.104 0-2 .896-2 2s.896 2 2 2 2-.896 2-2-.896-2-2-2zm-12.826-3l1.602-6h12.353l1.163 4.908a.999.999 0 0 1-.962 1.182h-13.156z"/>
            </svg>
            
              <!-- Cart image -->
            <img :src="shoppingCartIcon" alt="Shopping Cart" width="24" height="24" />
            <span v-if="cartCount > 0" class="cart-badge">{{ cartCount }}</span>
          </div>
          <span>Profil</span>
        </div>
      </div>
    </nav>

    <header class="hero">
      <h1>Mit ennél ma?</h1>
      <h2>Rendelj gyorsan és egyszerűen kedvenc ételeid közül</h2>
    </header>

    <main class="menu">
      <div class="card" v-for="product in products" :key="product.name">
        <img :src="product.img" :alt="product.name" width="220" />
        <div class="card-header">
          <h2>{{ product.name }}</h2>
          <span class="price">{{ product.price.toLocaleString('hu-HU') }} Ft</span>
        </div>
        <p>{{ product.description }}</p>
        <div
          class="action"
          :class="{ secondary: product.isSecondary }"
          @click="() => addToCart(product)"
        >
          Kosárba teszem
        </div>
      </div>
    </main>
  </div>

  <!-- Állandó navigáció -->
  <nav class="nav-bar nav-links">
    <a href="#/">Főoldal</a> |
    <a href="#/cart">Kosár</a> |
    <a href="#/about">Rólunk</a>
  </nav>
</template>
