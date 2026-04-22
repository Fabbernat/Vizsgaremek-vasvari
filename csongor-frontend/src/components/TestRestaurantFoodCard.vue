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
<div id="testfoodcon" class="m-2 p-0" >
    <div class="card flex-row">
      <div class="card-body">
        <h5 class="card-title">{{ meal.name }}</h5>
        <p class="card-text">Ár: {{ meal.price }}</p>
        <p>Leírás: {{ meal.description }}</p>
        <button class="btn btn-primary" @click="delivery.addToCart(meal.id)">Kosárba</button>
      </div>

      <div class="card-img-right row col-4" >
        <img src="https://realgreekrecipes.com/wp-content/uploads/2018/07/Easy-Chicken-Gyro-Wraps.jpg"alt="Food" class="img-fluid h-100 col-12 rounded" style="object-fit: cover;">
      </div>
    </div>
  </div>
</template>

<style>
.card.flex-row {
  display: flex;
  flex-direction: row;
}

.card-img-right{
    overflow: hidden;
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
