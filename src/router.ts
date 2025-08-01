import { createRouter, createWebHistory } from 'vue-router';
import Home from './components/Home.vue';
import Location from './components/Location.vue';
import Selection from './components/Selection.vue';
import User from './components/User.vue';
import Main from './components/Main.vue';

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
  {
    path: '/main',
    name: 'Main',
    component: Main,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
