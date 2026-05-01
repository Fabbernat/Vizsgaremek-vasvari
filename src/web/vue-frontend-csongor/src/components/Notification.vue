<script setup>
import { useNotificationStore } from "@/stores/notification"

const notification = useNotificationStore()
</script>

<template>
  <div v-if="notification.show"
       class="notification"
       :class="notification.type">
       
    {{ notification.message }}

  </div>
</template>

<style scoped>
.notification {
  position: fixed;
  top: 20px;
  right: 20px;

  padding: 12px 20px;
  border-radius: 8px;
  color: white;

  font-weight: 500;

  z-index: 3000;

  box-shadow: 0 5px 15px rgba(0,0,0,0.2);

  animation: slideIn 0.3s ease;
}

/* típusok */
.success {
  background: #28a745;
}

.error {
  background: #dc3545;
}

.warning {
  background: #ffc107;
  color: black;
}

/* animáció */
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>