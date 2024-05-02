import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'tableCom',
    component: () => import('./components/tableCom.vue')
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;