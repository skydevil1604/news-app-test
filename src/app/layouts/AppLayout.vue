<template>
  <div class="app">
    <AppHeader />

    <main class="main">
      <RouterView />
    </main>

    <AppFooter />

    <AppLoader v-if="isLoading" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { useNewsStore } from '@/entities/news';
import { AppLoader } from '@/shared/ui/loader';
import { AppFooter } from '@/widgets/app-footer';
import { AppHeader } from '@/widgets/app-header';

const newsStore = useNewsStore();

const isLoading = computed(() => newsStore.isLoading || newsStore.isLoadingSelected);
</script>

<style scoped lang="scss">
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main {
  flex: 1;
  padding: 22px 0 28px;
}
</style>
