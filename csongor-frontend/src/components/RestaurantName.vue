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
    <h1>{{ restaurant.name }}</h1>
</template>