<script setup>
  const props = defineProps({
  restaurant: {
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
  <RouterLink class="container text-decoration-none text-dark bg-light rounded p-2 pt-2" :to="`/restaurants/${restaurant.id}`">
    <div class="restaurantcard rounded border h-100">
      <div class="imgdiv">
        <img
          class="col-12 rounded"
          :src="`/restaurants/${restaurant.id ?? 'default'}.jpg`"
          @error="e => e.target.src = '/default.jpg'"
          alt=""
        />
      </div>
      <div class="p-1">
        <h5>{{ restaurant.name }}</h5>
        <p class="m-0">{{ restaurant.description }}</p>
      </div>
    </div>
  </RouterLink>
</template>

<style scoped>
.imgdiv {
  height: 180px;
  width: 100%;
  overflow: hidden;
}

img {
  transition: transform 0.2s;
}

.restaurantcard:hover img {
  transform: scale(1.2);
}
</style>