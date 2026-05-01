<template>
  <header class="topbar">
    <div class="left">
      
       <RouterLink id="lorem" class="link text-decoration-none text-dark m-3 rounded" to="/">
        <img src="/logo.jpg" alt="Logo" class="logo" />
      </RouterLink> 
    </div>

    <div class="right">

      <div class="cart" @click="toggleCart">
        🛒
        <span v-if="delivery.cartCount > 0" class="badge">
            {{ delivery.cartCount }}
        </span>
      </div>

      <div class="button-container">

        <button class="btn btn-primary" v-if="!isLoggedIn" @click="openModal">Megnyit</button>

         <button class="btn btn-light" v-else @click="logout">Logout</button> 
      </div>
    </div>


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


      <div>
        <strong>{{ item.price * item.quantity }} Ft</strong>
      </div>


      <div class="controls">
        <button @click="delivery.decrease(item.id)">-</button>
        <button @click="delivery.increase(item.id)">+</button>
        <button @click="delivery.removeItem(item.id)">🗑</button>
      </div>
    </div>

    <hr>


    <div class="total">
      Összesen: <strong>{{ delivery.totalPrice }} Ft</strong>
    </div>
    <button class="btn btn-success w-100 mt-2" :disabled="delivery.cart.length === 0" @click="placeOrder">Rendelés leadása</button>
  </div>

</div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted} from "vue"
import { useDeliveryStore } from "@/stores/delivery"
import LoginForm from "@/components/LoginForm.vue"
import RegisterForm from "@/components/RegisterForm.vue"
import { useNotificationStore } from "@/stores/notification"

const delivery = useDeliveryStore()
const showCart = ref(false)
const notify = useNotificationStore()


const isLoggedIn = ref(!!sessionStorage.getItem("token"))
const updateLoginState = () => {
  isLoggedIn.value = !!sessionStorage.getItem("token")
}
onMounted(() => {
  window.addEventListener("login-success", updateLoginState)
})

onUnmounted(() => {
  window.removeEventListener("login-success", updateLoginState)
})
const logout = () => {
  sessionStorage.removeItem("token")
  isLoggedIn.value = false  
}
const login = () => {
  isLoggedIn.value = true
}

const toggleCart = () => {
  showCart.value = !showCart.value
}

const placeOrder = async () => {
  const token = sessionStorage.getItem("token")

  if (!token) {
    openModal()
  } else {
    console.log("RENDELÉS:", delivery.cart)
    const user_id = sessionStorage.getItem("user_id")
    const mealList = []
    delivery.cart.map((data) => {
      console.log('data', data);    
        for (let i = 0; i < data.quantity; i++) {
          mealList.push(data.id)
        }
    })

    const payload = {
      userid: user_id,
      restaurantid: delivery.cart[0].restaurantid, 
      date: new Date(Date.now()),
      orderedmeal: mealList, 
      payment: delivery.totalPrice,
    }
    console.log(payload);
    
    try {
    const submitData = await fetch("http://localhost:3000/add-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    })

    if (submitData?.status === 201) {
      const resp = await submitData.json()

      sessionStorage.setItem("token", resp.token)

      notify.notify("Sikeres rendelés leadás!", "success")

      modal.close()
    } else {
      const resp = await submitData.json()
      notify.notify(resp.message ?? "Hiba történt!", "error")
    }
  } catch (err) {
    notify.notify("Hálózati hiba!", "error")
  }

    delivery.cart = [] 
    showCart.value = false
  }
}

import { useModalStore } from "@/stores/modal"
const modal = useModalStore()

const openModal = () => {
  modal.isOpen = true
  modal.open(LoginForm)
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
  background: rgb(24, 39, 61);
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