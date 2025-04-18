import type { RouteRecordRaw } from 'vue-router';
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import CategoryView from '../views/CategoryView.vue';
import SkinProblemView from '../views/SkinProblemView.vue';
import SearchView from '../views/SearchView.vue';
import AdminView from '../views/AdminView.vue';
import ProductListView from '../views/ProductListView.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/category/:name',
    name: 'Category',
    component: CategoryView,
    props: true,
  },
  {
    path: '/problem/:tag',
    name: 'SkinProblem',
    component: SkinProblemView,
    props: true,
  },
  {
    path: '/search',
    name: 'Search',
    component: SearchView,
  },
  {
    path: '/admin',
    name: 'Admin',
    component: AdminView,
  },
  {
    path: '/products',
    name: 'Products',
    component: ProductListView,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL || '/'),
  routes,
});

export default router;
