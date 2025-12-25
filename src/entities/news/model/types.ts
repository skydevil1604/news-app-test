export type NewsId = string;

export interface NewsItem {
  id: NewsId;
  title: string;
  description: string;
  text: string;
  author: string;
  publishedAt: string; // ISO string
  image: string; // public URL
}
