<template>
  <AppContainer>
    <section class="section">
      <header class="sectionHeader">
        <h1 class="h1">
          Last news
        </h1>
      </header>

      <ErrorState
        v-if="newsStore.error"
        title="Failed to load news"
        :message="newsStore.error"
        action-text="Retry"
        @action="retry"
      />

      <div
        v-else
        class="list"
        aria-label="News list"
      >
        <NewsCard
          v-for="item in newsStore.sortedItems"
          :key="item.id"
          :item="item"
        />
      </div>
    </section>
  </AppContainer>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

import { NewsCard, useNewsStore } from '@/entities/news';
import { AppContainer } from '@/shared/ui/container';
import { ErrorState } from '@/shared/ui/error-state';

const newsStore = useNewsStore();

async function retry() {
  await newsStore.fetchAll();
}

onMounted(async () => {
  await newsStore.fetchAll();
});
</script>

<style scoped lang="scss">
.section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.sectionHeader {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.h1 {
  margin: 0;
  font-size: 28px;
  letter-spacing: -0.02em;
}

.list {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 22px 24px;
}

@media (max-width: 980px) {
  .list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 20px;
  }
}

@media (max-width: 640px) {
  .list {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 720px) {
  .h1 {
    font-size: 22px;
  }
}
</style>
