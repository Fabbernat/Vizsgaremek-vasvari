<template>
  <header class="topbar">
    <div class="left">
      
       <RouterLink id="lorem" class="link text-decoration-none text-dark m-3 rounded" to="/">
        <img src="/logo.jpg" alt="Logo" class="logo" />
      </RouterLink> 
    </div>

    <div class="right">
      <!-- Kosár ikon -->
      <div class="cart" @click="toggleCart">
        🛒
        <span v-if="delivery.cartCount > 0" class="badge">
            {{ delivery.cartCount }}
        </span>
      </div>

      <!-- Login / Logout -->
      <div class="button-container">
      <!--  <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#loginModal">Login</button> -->

        <button @click="openModal">Megnyit</button>
        <!-- <button class="btn btn-light" v-if="!isLoggedIn" @click="login">Login</button> -->
        <!-- <button class="btn btn-light" v-else @click="logout">Logout</button> -->
      </div>
    </div>

    <!-- Kosár panel -->
    <div v-if="showCart" class="cart-panel">

  <div v-if="delivery.cart.length === 0">
    Üres a kosár
  </div>

  <div v-else>
    <div
      v-for="item in delivery.cart"
      :key="item.id"
      class="cart-item"
    >
      <strong>{{ item.name }}</strong>

      <div>
        {{ item.price }} Ft × {{ item.quantity }}
      </div>

      <!-- SUBTOTAL -->
      <div>
        <strong>{{ item.price * item.quantity }} Ft</strong>
      </div>

      <!-- GOMBOK -->
      <div class="controls">
        <button @click="delivery.decrease(item.id)">-</button>
        <button @click="delivery.increase(item.id)">+</button>
        <button @click="delivery.removeItem(item.id)">🗑</button>
      </div>
    </div>

    <hr>

    <!-- TOTAL -->
    <div class="total">
      Összesen: <strong>{{ delivery.totalPrice }} Ft</strong>
    </div>
    <button class="btn btn-success w-100 mt-2" :disabled="delivery.cart.length === 0" @click="placeOrder">Rendelés leadása</button>
  </div>

</div>
  </header>
</template>

<script setup>
import { ref } from "vue"
import { useDeliveryStore } from "@/stores/delivery"
import LoginForm from "@/components/LoginForm.vue"
import RegisterForm from "@/components/RegisterForm.vue"



const delivery = useDeliveryStore()
const showCart = ref(false)
const isLoggedIn = ref(false)


const toggleCart = () => {
  showCart.value = !showCart.value
}

const placeOrder = () => {
  const token = sessionStorage.getItem("token")

  if (!token) {
    openModal()
  } else {
    console.log("RENDELÉS:", delivery.cart)

    // ide később API hívás jön

    alert("Rendelés leadva!")

    delivery.cart = [] // kosár ürítése
    showCart.value = false
  }
}


// --------------modal--------------
import { useModalStore } from "@/stores/modal"
const modal = useModalStore()

const openModal = () => {
  modal.isOpen = true
  modal.open(LoginForm)
}


const login = () => {
  isLoggedIn.value = true
}

const logout = () => {
  isLoggedIn.value = false
}

</script>

<style scoped>

.topbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px;
  padding-left: 10px;
  padding-right: 10px;
  background-image: linear-gradient(176deg, #fff 30%, #eeeeee 40%, #333333 100%);
  color: white;
  border-bottom: 1px solid black;

  z-index: 1000;
}

.left .logo {
  height: 60px;
}

.right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.cart {
  cursor: pointer;
  position: relative;
  font-size: 20px;
}

.badge {
  position: absolute;
  top: -8px;
  right: -10px;
  background: red;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 12px;
}

.cart-panel {
  position: absolute;
  right: 16px;
  top: 70px;
  background: white;
  color: black;
  padding: 16px;
  border-radius: 8px;
  width: 250px;
}
.button-container {
    width: 100px;
   
    display: flex;
    justify-content: flex-end;
}
.cart-item {
  border-bottom: 1px solid #ddd;
  padding: 8px 0;
}

.controls {
  display: flex;
  gap: 6px;
  margin-top: 5px;
}

.controls button {
  padding: 2px 6px;
  cursor: pointer;
}

.total {
  margin-top: 10px;
  font-size: 16px;
}
</style>