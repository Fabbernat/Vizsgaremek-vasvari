<script setup>
import TestRestaurantFoodCard from '@/components/TestRestaurantFoodCard.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';


</script>

<template>
  <nav class="nav"> 
    <RouterLink class="link text-decoration-none text-dark m-3 rounded" to="/">
        <h4 class="m-1  ">⬅ Vissza az éttermekhez</h4>
    </RouterLink>
    <RouterLink class="link text-decoration-none text-dark m-3 rounded" style="float: right;" to="/kosar">
        <h4 class="m-1">Kosár</h4>
    </RouterLink>
  </nav>
  <div id="testcon" class="container row bg-light">
      <h1 class="text-center">Test Restaurnat</h1>
      <TestRestaurantFoodCard class="col-5"/>
      <TestRestaurantFoodCard class="col-5"/>
      <TestRestaurantFoodCard class="col-5"/>
      <TestRestaurantFoodCard class="col-5"/>
    </div>
</template>

<style>
  #testcon{
    margin: 0 auto;
    width: 80vw;
    justify-content: space-evenly;
  }
  nav{
    width: 50%;
  }
.link{
  background-color: lightgray;
}
</style>
