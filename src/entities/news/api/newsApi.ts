import type { NewsId, NewsItem } from '../model/types';
import rawNews from './mock/news.json';

const delay = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

function normalize(data: unknown): NewsItem[] {
  if (!Array.isArray(data)) {return [];}

  return data as NewsItem[];
}

const newsData = normalize(rawNews as unknown);

export const newsApi = {
  async getAll(): Promise<NewsItem[]> {
    await delay(450);

    return [...newsData];
  },

  async getById(id: NewsId): Promise<NewsItem | null> {
    await delay(300);

    return newsData.find((n) => n.id === id) ?? null;
  },
};
