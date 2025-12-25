<template>
  <AppContainer>
    <div class="root">
      <h1 class="title">
        Page not found
      </h1>
      <RouterLink
        class="link"
        :to="{ name: 'news-list' }"
      >
        Go to news
      </RouterLink>
    </div>
  </AppContainer>
</template>

<script setup lang="ts">
import { AppContainer } from '@/shared/ui/container';
</script>

<style scoped lang="scss">
.root {
  padding: 24px;
  background: #FFFFFF;
  border: 1px solid rgb(17, 24, 39, 0.08);
  border-radius: 22px;
}

.title {
  margin: 0 0 10px;
  font-size: 26px;
  letter-spacing: -0.02em;
}

.link {
  font-weight: 700;
  color: rgb(37, 99, 235, 1);
  text-decoration: none;
}

.link:hover {
  text-decoration: underline;
}
</style>
