<script setup>
  import RestaurantCard from '@/components/RestaurantCard.vue';
</script>

<template class="">
  <div id="container" class="container row  bg-light p-3">
    <h1 class="text-center mt-0 m-5">Éttermek</h1>
    <RestaurantCard class="col-3"/>
    <RestaurantCard class="col-3"/>
    <RestaurantCard class="col-3"/>
  </div>
  
</template>
<style>
  #container{
    width: 80vw;
    margin: 0 auto;
    justify-content: space-evenly;
  }
</style>
