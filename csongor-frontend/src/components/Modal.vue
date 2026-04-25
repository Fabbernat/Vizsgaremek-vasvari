<script setup>
import { useModalStore } from "@/stores/modal"

const modal = useModalStore()
</script>

<template>
  <div
    v-if="modal.isOpen"
    class="modal-backdrop"
    @click="modal.close()"
  >
    <div class="modal-box" @click.stop>

      <component
        :is="modal.component"
        v-bind="modal.props"
      />

      <button
        class="btn btn-secondary mt-3 w-100"
        @click="modal.close()"
      >
        Bezárás
      </button>

    </div>
  </div>
</template>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  background: rgba(0, 0, 0, 0.4); /* 40% fekete */

  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 2000;
}

.modal-box {
  background: white;
  border-radius: 12px;
  padding: 20px;

  width: 50vw;
  max-width: 600px;

  max-height: 50vh;
  overflow-y: auto;

  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);

  display: flex;
  flex-direction: column;

  animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>