import { createRouter, createWebHistory } from 'vue-router'
import Restaurants from '../views/Restaurants.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Restaurants,
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('../views/RestaurantView.vue'),
    },
    {
    path: '/restaurants/:id',
    name: 'restaurant',
    component: () => import('../views/RestaurantView.vue'),
  },
  ],
})

export default router
