import { createRouter, createWebHistory } from 'vue-router';
import Home from './components/Home.vue';
import Location from './components/Location.vue';
import Selection from './components/Selection.vue';
import User from './components/User.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/location',
    name: 'Location',
    component: Location,
  },
  {
    path: '/selection',
    name: 'Selection',
    component: Selection,
  },
  {
    path: '/user',
    name: 'User',
    component: User,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
