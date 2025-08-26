import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/HelloWorld.vue';
import About from '../components/About.vue';
import About_option from '../components/About_option.vue';
import ApiAxios from '../components/ApiAxios.vue';
import GridForm from '../components/GridForm.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/about_option',
    name: 'About_Option',
    component: About_option
  },
  {
    path: '/api',
    name: 'ApiAxios',
    component: ApiAxios
  },
  {
    path: '/gridform',
    name: 'GridForm',
    component: GridForm
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;