<template>
  <div
    class="root"
    role="alert"
  >
    <p class="title">
      {{ title }}
    </p>
    <p
      v-if="message"
      class="message"
    >
      {{ message }}
    </p>
    <button
      v-if="actionText"
      type="button"
      class="button"
      @click="$emit('action')"
    >
      {{ actionText }}
    </button>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  title?: string;
  message?: string | null;
  actionText?: string;
}>(), {
  title: 'Oops...',
  message: null,
  actionText: '',
});

defineEmits<{ (e: 'action'): void }>();
</script>

<style scoped lang="scss">
.root {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
  background: rgb(239, 68, 68, 0.08);
  border: 1px solid rgb(239, 68, 68, 0.25);
  border-radius: 16px;
}

.title {
  font-weight: 700;
}

.message {
  color: rgb(17, 24, 39, 0.75);
}

.button {
  align-self: flex-start;
  padding: 10px 14px;
  background: #FFFFFF;
  border: 1px solid rgb(17, 24, 39, 0.15);
  border-radius: 12px;
  transition: transform 0.12s ease, box-shadow 0.12s ease;
  cursor: pointer;
}

.button:hover {
  box-shadow: 0 8px 18px rgb(17, 24, 39, 0.12);
  transform: translateY(-1px);
}
</style>
