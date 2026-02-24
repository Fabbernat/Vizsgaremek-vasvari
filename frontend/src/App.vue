<script>
  import "./styles/app.css"
</script>

<script setup>
import { ref, computed, onMounted } from 'vue'

// Képek
import pizza from './assets/pizza-margherita.jpg'
import hamburger from './assets/hamburger.jpg'
import salad from './assets/caesar-salad.jpg'
import shoppingCartIcon from './assets/white-cart.png'
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
  '/cart': Cart,
  '/*': NotFound
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
          <span>Profil</span>
        <div class="cart-icon" @click="openCart">
        <img :src="shoppingCartIcon" alt="Shopping Cart" width="24" height="24" />
        <span v-if="cartCount > 0" class="cart-badge">{{ cartCount }}</span>
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
          @click="() => addToCart(product)"
        >
          Kosárba teszem
        </div>
      </div>
    </main>
  </div>
</template>
