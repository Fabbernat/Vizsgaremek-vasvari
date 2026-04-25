<script setup>
import { RouterLink, RouterView } from 'vue-router'
import TopBar from './views/Topbar.vue'
import axios from 'axios';
</script>

<template>
  <TopBar />
  <RouterView />
</template>