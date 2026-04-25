<script setup>
import { RouterView } from 'vue-router'
import TopBar from './views/Topbar.vue'
import Modal from './components/Modal.vue'

</script>

<template>
  <Modal />
  <TopBar />
  <RouterView />
</template>