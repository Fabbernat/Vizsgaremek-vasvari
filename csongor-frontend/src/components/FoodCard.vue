<script setup>
  import { useDeliveryStore } from "@/stores/delivery";
  const delivery = useDeliveryStore()
  
  const props = defineProps({
  meal: {
    type: Object,
    required: true
  },
  dis: {
    type: Boolean,
    default: false
  }
})


</script>

<template>
<div id="testfoodcon" class=" p-2" >
    <div class="card" style="display: flex; flex-direction: row; justify-content: space-between;">
      <div style="position: relative; overflow: hidden; padding-bottom: 50px; padding-left: 5px; padding-right: 20px;">
        <h5 class="card-title">{{ meal.name }}</h5>
        <p class="card-text">Ár: {{ meal.price }} Ft</p>
        <p class="" style="margin-bottom: 50px;">Leírás: {{ meal.description }}</p>
        <button 
        style="position: absolute; left: 5px; bottom: 5px;"
        class="btn btn-primary" @click="delivery.addToCart(meal)">Kosárba</button>
      </div>
      <div class="card-img-right row col-4 p-0" >
        <img :src="`/meals/${meal.id ?? 'default'}.jpg`"alt="Food" class="p-0 h-100 col-12" style="object-fit: cover;">
      </div>
    </div>
  </div>
</template>

<style>
.card {
  height: 300px;
  background: #ffffff96;
  @media screen and (max-width: 762px) {
    min-height: 200px;
    max-height: 250px;
  }
}
.card.flex-row {
  display: flex;
  flex-direction: row;
}

.card-img-right{
    overflow: hidden;
    height: 100%;
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
    margin-right: 0px;
  }

.card-img-right img {
  display: block;
  transition: transform 0.2s;
}
#testfoodcon:hover img{
    transform: scale(1.2);
}

#testfoodcon{
    overflow: hidden;
    
}

</style>
