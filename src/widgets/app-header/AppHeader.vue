<template>
  <header class="header">
    <AppContainer>
      <div class="inner">
        <RouterLink
          class="brand"
          :to="{ name: 'news-list' }"
        >
          <img
            class="logo"
            src="/images/logo.svg"
            alt="Test logo"
          >
        </RouterLink>

        <div class="user">
          <p class="name">
            Ronnie Radke
          </p>

          <img
            class="avatar"
            src="/images/avatar.jpg"
            alt="User avatar"
          >
        </div>
      </div>
    </AppContainer>
  </header>
</template>

<script setup lang="ts">
import { AppContainer } from '@/shared/ui/container';
</script>

<style scoped lang="scss">
.header {
  background: var(--color-surface);
  box-shadow: 0 4px 10px 0 rgb(0, 0, 0, 0.07);
}

.inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 0;
}

.brand {
  display: inline-flex;
  align-items: center;
  text-decoration: none;
}

.logo {
  display: block;
  width: auto;
  height: 22px;
}

.user {
  display: flex;
  align-items: center;
  gap: 12px;
}

.avatar {
  width: 32px;
  height: 32px;
  border: 0;
  border-radius: 999px;
  object-fit: cover;
}

.name {
  margin: 0;
  font-size: 14px;
  font-weight: 400;
}

@media (max-width: 520px) {
  .name {
    display: none;
  }
}
</style>
