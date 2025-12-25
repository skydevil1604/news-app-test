<template>
  <AppContainer>
    <section class="section">
      <nav
        class="breadcrumbs"
        aria-label="Breadcrumb"
      >
        <RouterLink
          class="crumb"
          :to="{ name: 'news-list' }"
        >
          Last news
        </RouterLink>
        <span
          class="sep"
          aria-hidden="true"
        >/</span>
        <span class="current">News details</span>
      </nav>

      <ErrorState
        v-if="newsStore.selectedError"
        title="Cannot open news"
        :message="newsStore.selectedError"
        action-text="Go to list"
        @action="goHome"
      />

      <article
        v-else-if="news"
        class="article"
      >
        <div class="hero">
          <img
            class="image"
            :src="news.image"
            :alt="news.title"
          >
        </div>

        <div class="body">
          <h1 class="title">
            {{ news.title }}
          </h1>

          <div class="meta">
            <CalendarIcon class="calendar" />

            <time
              class="date"
              :datetime="news.publishedAt"
            >{{ formatDate(news.publishedAt) }}</time>

            <span
              class="dot"
              aria-hidden="true"
            >|</span>

            <span class="author">written by {{ news.author }}</span>
          </div>

          <div class="text">
            <p
              v-for="(p, idx) in paragraphs"
              :key="idx"
              class="p"
            >
              {{ p }}
            </p>
          </div>
        </div>
      </article>

      <div
        v-else
        class="placeholder"
        aria-label="Loading placeholder"
      >
        <div class="bar"></div>
        <div class="bar short"></div>
        <div class="box"></div>
      </div>
    </section>
  </AppContainer>
</template>

<script setup lang="ts">
import { computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { useNewsStore } from '@/entities/news';
import { formatDate } from '@/shared/lib/date';
import { AppContainer } from '@/shared/ui/container';
import { ErrorState } from '@/shared/ui/error-state';
import { CalendarIcon } from '@/shared/ui/icons';

const route = useRoute();
const router = useRouter();
const newsStore = useNewsStore();

const newsId = computed(() => String(route.params.id ?? ''));
const news = computed(() => {
  return newsStore.selected?.id === newsId.value ? newsStore.selected : null;
});

const paragraphs = computed(() => {
  const raw = news.value?.text ?? '';

  return raw
    .split('\n\n')
    .map((p) => p.trim())
    .filter(Boolean);
});

async function load() {
  if (!newsId.value) {return;}
  await newsStore.fetchById(newsId.value);
}

async function goHome() {
  await router.push({ name: 'news-list' });
}

watch(newsId, async () => {
  await load();
});

onMounted(async () => {
  await load();
});
</script>

<style scoped lang="scss">
.section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.breadcrumbs {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: var(--color-muted);
}

.crumb {
  color: var(--color-primary);
  text-decoration: none;
}

.crumb:hover {
  text-decoration: underline;
}

.sep {
  opacity: 0.75;
}

.current {
  color: var(--color-muted);
}

.article {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.body {
  width: 100%;
  max-width: 820px;
  margin: 0 auto;
}

.hero {
  overflow: hidden;
  background: #111111;
  border-radius: var(--radius-md);
}

.image {
  display: block;
  width: 100%;
  height: 240px;
  object-fit: cover;
}

.title {
  margin: 14px 0 10px;
  font-size: 26px;
  line-height: 1.22;
  letter-spacing: -0.015em;
}

.meta {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: var(--color-muted);
}

.calendar {
  flex: 0 0 auto;
  opacity: 0.9;
}

.author {
  font-weight: 600;
}

.dot {
  opacity: 0.65;
}

.text {
  margin: 14px 0 0;
  line-height: 1.65;
  color: var(--color-text);
}

.p {
  margin: 0 0 14px;
}

.p:last-child {
  margin-bottom: 0;
}

.placeholder {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 820px;
  margin: 0 auto;
  padding: 0;
  background: transparent;
  border: 0;
  border-radius: 0;
}

.bar {
  height: 14px;
  background: rgb(17, 17, 17, 0.08);
  border-radius: 999px;
}

.bar.short {
  width: 65%;
}

.box {
  height: 240px;
  background: rgb(17, 17, 17, 0.08);
  border-radius: var(--radius-md);
}

@media (max-width: 720px) {
  .title {
    font-size: 22px;
  }

  .image {
    height: 180px;
  }

  .box {
    height: 180px;
  }
}
</style>
