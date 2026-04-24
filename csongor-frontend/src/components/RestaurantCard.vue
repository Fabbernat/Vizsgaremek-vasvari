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
  <RouterLink class="container text-decoration-none text-dark m-1 bg-light border rounded pt-2" :to="`/restaurants/${restaurant.id}`">
    <div class="restaurantcard rounded">
      <div class="imgdiv">
        <img
          class="col-12 rounded"
          src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/8f/cf/a3/alabardos-bar-etterem.jpg"
          alt=""
        />
      </div>
      <h5>{{ restaurant.name }}</h5>
      <p class="m-0">{{ restaurant.description }}</p>
      <p class="m-0">Elhelyezkedés</p>
      <p class="m-0">Ár intervallum</p>
      <p class="m-0">Kiszállítás</p>
    </div>
  </RouterLink>
</template>

<style scoped>
.imgdiv {
  overflow: hidden;
}

img {
  transition: transform 0.2s;
}

.restaurantcard:hover img {
  transform: scale(1.2);
}
</style>