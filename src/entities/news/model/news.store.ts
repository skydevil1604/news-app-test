import { defineStore } from 'pinia';

import { newsApi } from '../api';
import type { NewsId, NewsItem } from './types';

function toErrorMessage(e: unknown): string {
  if (e instanceof Error) {return e.message;}

  return 'Something went wrong.';
}

export const useNewsStore = defineStore('news', {
  state: () => ({
    items: [] as NewsItem[],
    isLoading: false,
    error: null as string | null,
    selected: null as NewsItem | null,
    isLoadingSelected: false,
    selectedError: null as string | null,
  }),

  getters: {
    sortedItems: (state): NewsItem[] => {
      return [...state.items].sort((a, b) => {
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
      });
    },

    byId: (state) => {
      return (id: NewsId): NewsItem | undefined => state.items.find((n) => n.id === id);
    },
  },

  actions: {
    async fetchAll(): Promise<void> {
      if (this.isLoading) {return;}

      this.isLoading = true;
      this.error = null;

      try {
        const data = await newsApi.getAll();

        this.items = data;
      } catch (e) {
        this.error = toErrorMessage(e);
      } finally {
        this.isLoading = false;
      }
    },

    async fetchById(id: NewsId): Promise<NewsItem | null> {
      const cached = this.byId(id);

      if (cached) {
        this.selected = cached;
        this.selectedError = null;

        return cached;
      }

      if (this.isLoadingSelected) {return this.selected;}

      this.isLoadingSelected = true;
      this.selectedError = null;

      try {
        const data = await newsApi.getById(id);

        if (!data) {
          this.selectedError = 'News item not found.';
          this.selected = null;

          return null;
        }

        // Keep list cache warm.
        const exists = this.items.some((n) => n.id === data.id);

        if (!exists) {this.items = [...this.items, data];}

        this.selected = data;

        return data;
      } catch (e) {
        this.selectedError = toErrorMessage(e);
        this.selected = null;

        return null;
      } finally {
        this.isLoadingSelected = false;
      }
    },
  },
});
