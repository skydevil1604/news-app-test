<template>
  <article class="card">
    <component
      :is="hasId ? 'RouterLink' : 'div'"
      class="link"
      v-bind="linkProps"
    >
      <div class="media">
        <img
          v-if="imageSrc"
          class="image"
          :src="imageSrc"
          :alt="imageAlt"
          loading="lazy"
        >
        <div
          v-else
          class="imageFallback"
        >
          No data
        </div>
      </div>

      <div class="content">
        <h3 class="title">
          {{ title }}
        </h3>

        <p class="description">
          {{ description }}
        </p>

        <div class="meta">
          <CalendarIcon class="calendar" />

          <time
            class="date"
            :datetime="dateTime"
          >{{ formattedDate }}</time>

          <span
            class="dot"
            aria-hidden="true"
          >|</span>

          <span class="author">written by {{ author }}</span>
        </div>
      </div>
    </component>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import type { NewsItem } from '@/entities/news';
import { formatDate } from '@/shared/lib/date';
import { CalendarIcon } from '@/shared/ui/icons';

const props = defineProps<{ item: NewsItem }>();

const title = computed(() => props.item.title || 'No data');
const description = computed(() => props.item.description || 'No data');
const author = computed(() => props.item.author || 'No data');

const newsId = computed(() => props.item.id || '');
const hasId = computed(() => Boolean(newsId.value));

const linkProps = computed(() => {
  if (!hasId.value) {return {};}

  return {
    to: { name: 'news-details', params: { id: newsId.value } },
  };
});

const imageSrc = computed(() => props.item.image || '');
const imageAlt = computed(() => title.value);

const formattedDate = computed(() => {
  return props.item.publishedAt ? formatDate(props.item.publishedAt) : 'No data';
});

const dateTime = computed(() => props.item.publishedAt || undefined);
</script>

<style scoped lang="scss">
.card {
  background: transparent;
  border: 0;
}

.link {
  display: flex;
  flex-direction: column;
  height: 100%;
  color: inherit;
  text-decoration: none;
}

.link:hover .image,
.link:focus-visible .image {
  transform: scale(1.02);
}

.media {
  height: 168px;
  overflow: hidden;
  background: #111111;
  border-radius: var(--radius-md);
}

.image {
  display: block;
  width: 100%;
  height: 100%;
  transition: transform 0.18s ease;
  transform: scale(1);
  object-fit: cover;
}

.imageFallback {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font-size: 13px;
  color: var(--color-muted);
  background: rgb(17, 17, 17, 0.08);
}

.content {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 10px 2px 0;
}

.title {
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  line-height: 1.3;
  color: var(--color-primary);
  text-decoration: underline;
  text-decoration-thickness: 2px;
  text-underline-offset: 3px;
}

.description {
  margin: 0;
  font-size: 14px;
  line-height: 1.45;
  color: var(--color-text);
}

.meta {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: auto;
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
  opacity: 0.7;
}

@media (max-width: 520px) {
  .media {
    height: 200px;
  }
}
</style>
