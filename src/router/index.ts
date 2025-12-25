import { createRouter, createWebHistory } from 'vue-router';

import NewsDetailsPage from '@/pages/news-details/NewsDetailsPage.vue';
import NewsListPage from '@/pages/news-list/NewsListPage.vue';
import NotFoundPage from '@/pages/not-found/NotFoundPage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'news-list',
      component: NewsListPage,
    },
    {
      path: '/news/:id',
      name: 'news-details',
      component: NewsDetailsPage,
      props: false,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundPage,
    },
  ],
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
