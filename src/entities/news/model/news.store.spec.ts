import { createPinia, setActivePinia } from 'pinia';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useNewsStore } from './news.store';
import type { NewsItem } from './types';

vi.mock('../api/newsApi', () => {
  return {
    newsApi: {
      getAll: vi.fn(),
      getById: vi.fn(),
    },
  };
});

import { newsApi } from '../api/newsApi';

describe('useNewsStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.resetAllMocks();
  });

  it('fetchAll() loads all news items into store', async () => {
    const mockData: NewsItem[] = [
      {
        id: '1',
        title: 'Test title',
        description: 'Test description',
        text: 'Test text',
        author: 'Author',
        publishedAt: '2025-12-01T10:00:00.000Z',
        image: '/images/news-1.svg',
      },
    ];

    const getAllMock = newsApi.getAll as unknown as { mockResolvedValue: (value: NewsItem[]) => void };

    getAllMock.mockResolvedValue(mockData);

    const store = useNewsStore();

    await store.fetchAll();

    expect(store.error).toBeNull();
    expect(store.items).toHaveLength(1);
    expect(store.items[0]?.id).toBe('1');
  });
});
