import Vue from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import Home from './home.vue';
import About from './about.vue';
import Search from './search.vue';
import Product from './product.vue';
import Products from './products.vue';
import Checkout from './checkout.vue';
import Support from './support.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/search', component: Search },
  { path: '/product/:id', component: Product },
  { path: '/products', component: Products },
  { path: '/products/:category', component: Products },
  { path: '/products/:category/:subCategory', component: Products },
  { path: '/checkout', component: Checkout },
  { path: '/support', component: Support }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;