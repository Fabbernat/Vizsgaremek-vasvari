<script setup>
import FoodCard from '@/components/FoodCard.vue';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';
import RestaurantName from '@/components/RestaurantName.vue';

const meals = ref([]);
const selectedRestaurant = ref(null)
const route = useRoute();

onMounted(async () => {
  const restaurantId = route.params.id;

  const res = await fetch(`http://localhost:3000/restaurants/${restaurantId}/meals`);
  meals.value = await res.json();
});



const restaurants = ref([])
onMounted(async () => {
   const restaurantId = route.params.id;

   const res = await fetch("http://localhost:3000/restaurants");
   restaurants.value = await res.json();

   selectedRestaurant.value = restaurants.value.find(
     r => r.id == restaurantId
   );
});

</script>

<template>

  <div id="con" class="container">
        <h1 class="text-center text-light">{{ selectedRestaurant?.name }}
        </h1>
      <div class="row">
        <FoodCard v-for="meal in meals" :key="meal.id" :meal="meal" class=" col-sm-12 col-lg-6"/>
      </div>
    </div>
</template>

<style>
  #con{
    margin: 0 auto;
    width: 80vw;
    justify-content: space-evenly;
    background: rgb(24, 39, 61);
    @media screen and (max-width: 762px) {
      
      width: 100vw;
    }
  }
  nav{
    width: 50%;
  }
h1{
  margin-top: 60px;
}
body{
  background-color: rgb(14, 23, 36);
}
</style>
