import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import AuthView from '../views/AuthView.vue'
import RestaurantsView from '../views/RestaurantsView.vue'
import MealsView from '../views/MealsView.vue'
import CartView from '../views/CartView.vue'
import OrderView from '../views/OrderView.vue'
import CheckoutView from '../views/CheckoutView.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomeView },
    { path: '/auth', component: AuthView },
    { path: '/restaurants', component: RestaurantsView },
    { path: '/meals', component: MealsView },
    { path: '/cart', component: CartView },
    { path: '/order', component: OrderView },
    { path: '/checkout', component: CheckoutView }
  ]
})
