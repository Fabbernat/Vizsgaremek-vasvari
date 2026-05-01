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
  <div id="container" class="container p-3 m-0 mt-5 mx-auto">
    <div class="row justify-content-center">
      <h1 class="text-center mt-3 m-5 text-light">Éttermek</h1>
    </div>
    <div class="row mx-auto justify-content-center">
      <RestaurantCard v-for="restaurant in restaurants" :key="restaurant.id" :restaurant="restaurant" class="col-md-4 col-xl-3" />
    </div>
  </div>
</template>
<style>
  #container{
    width: 80vw;
    margin: 0 auto;
    justify-content: space-evenly;
    background: rgb(24, 39, 61);
  }
  
  body{
    background-color: rgb(14, 23, 36);
    
  }
</style>
