<script setup>
import { RouterView } from 'vue-router'
import TopBar from './views/Topbar.vue'
import Modal from './components/Modal.vue'
import Notification from './components/Notification.vue'

</script>

<template>
  <Notification />
  <Modal />
  <TopBar />
  <RouterView />
</template>