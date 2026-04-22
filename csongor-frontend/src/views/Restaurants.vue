<script setup>
  import RestaurantCard from '@/components/RestaurantCard.vue';
  import { ref, onMounted } from 'vue';
  const restaurants = ref([]);

 onMounted(async () => {
   const res = await fetch("http://localhost:3000/restaurants");
   restaurants.value = await res.json();
 });
</script>

<template class="">
  <div id="container" class="container row  bg-light p-3">
    <h1 class="text-center mt-0 m-5">Éttermek</h1>
    <RestaurantCard v-for="restaurant in restaurants" :key="restaurant.id" :restaurant="restaurant" class="col-3" />
  </div>

  
</template>
<style>
  #container{
    width: 80vw;
    margin: 0 auto;
    justify-content: space-evenly;
  }
</style>
