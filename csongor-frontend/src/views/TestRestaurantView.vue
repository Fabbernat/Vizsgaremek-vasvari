<script setup>
import TestRestaurantFoodCard from '@/components/TestRestaurantFoodCard.vue';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';
// import data from '../../../backend/data/meals.json'

const meals = ref([]);

const route = useRoute();

onMounted(async () => {
  const restaurantId = route.params.id;

  const res = await fetch(`http://localhost:3000/restaurants/${restaurantId}/meals`);
  meals.value = await res.json();


});


</script>

<template>
  <nav class="nav"> 
    
    <RouterLink class="link text-decoration-none text-dark m-3 rounded" style="float: right;" to="/kosar">
        <h4 class="m-1">Kosár</h4>
    </RouterLink>
  </nav>
  <div id="testcon" class="container  bg-light">
      <h1 class="text-center">Test Restaurnat</h1>
      <div class="row">
        <TestRestaurantFoodCard v-for="meal in meals" :key="meal.id" :meal="meal" class=" col-sm-12 col-lg-6"/>
      </div>
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
