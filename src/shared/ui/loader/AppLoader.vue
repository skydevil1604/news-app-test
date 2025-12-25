<template>
  <div
    class="overlay"
    role="status"
    aria-live="polite"
    aria-label="Loading"
  >
    <div class="spinner"></div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 50;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgb(17, 24, 39, 0.35);
  backdrop-filter: blur(2px);
}

.spinner {
  width: 42px;
  height: 42px;
  border: 4px solid rgb(255, 255, 255, 0.35);
  border-top-color: rgb(255, 255, 255, 0.95);
  border-radius: 9999px;
  animation: spin 0.9s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
