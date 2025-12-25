import { mount } from '@vue/test-utils';
import { createPinia } from 'pinia';
import { describe, expect, it, vi } from 'vitest';
import { createMemoryHistory, createRouter } from 'vue-router';

import type { NewsItem } from '@/entities/news';

import NewsDetailsPage from './NewsDetailsPage.vue';

vi.mock('@/entities/news/api/newsApi', () => {
  return {
    newsApi: {
      getAll: vi.fn(),
      getById: vi.fn(),
    },
  };
});

import { newsApi } from '@/entities/news/api/newsApi';

const flushPromises = () => new Promise<void>((resolve) => setTimeout(resolve, 0));

describe('NewsDetailsPage', () => {
  it('renders title of a fetched news item', async () => {
    const item: NewsItem = {
      id: '1',
      title: 'Details title',
      description: 'Desc',
      text: 'Full text',
      author: 'Author',
      publishedAt: '2025-12-01T10:00:00.000Z',
      image: '/images/news-1.svg',
    };

    const getByIdMock = newsApi.getById as unknown as { mockResolvedValue: (value: NewsItem | null) => void };

    getByIdMock.mockResolvedValue(item);

    const router = createRouter({
      history: createMemoryHistory(),
      routes: [
        { path: '/news/:id', name: 'news-details', component: NewsDetailsPage },
        { path: '/', name: 'news-list', component: { template: '<div />' } },
      ],
    });

    await router.push('/news/1');
    await router.isReady();

    const wrapper = mount(NewsDetailsPage, {
      global: {
        plugins: [router, createPinia()],
      },
    });

    await flushPromises();
    await flushPromises();

    expect(wrapper.text()).toContain('Details title');
  });
});
