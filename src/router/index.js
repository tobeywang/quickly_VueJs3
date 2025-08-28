import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/HelloWorld.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
      // 使用動態載入，只有在訪問此頁面時才會載入檔案
    component:()=>import('../views/About.vue') 
  },
  {
    path: '/about_option',
    name: 'About_Option',
    component:()=>import('../views/About_option.vue') 
  },
  {
    path: '/api',
    name: 'ApiAxios',
    component:()=>import('../views/ApiAxios.vue') 
  },
  {
    path: '/gridform',
    name: 'GridForm',
    component:()=>import('../views/GridForm.vue') 
  },
  {
    path: '/basics',
    name: 'Basics',
    component:()=>import('../views/BasicsPage.vue') 
  },
  {
    path: '/todo',
    name: 'TodoPage',
    component:()=>import('../views/TodoPage.vue')  
  },
  {
    path: '/component-comm',
    name: 'component-comm',
    component:()=>import('../components/TodoPage.vue') 
  },
  {
    path: '/apiDataPage',
    name: 'apiDataPage',
    component:()=>import('../views/ApiDataPage.vue') 
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;