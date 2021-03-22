import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  { // 前台巢狀路由
    path: '/',
    component: () => import('../views/frontend/Layout.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('../views/frontend/Home.vue'),
      },
      {
        path: '/about',
        name: 'about',
        component: () => import('../views/frontend/About.vue'),
      },
      {
        path: '/products',
        name: 'products',
        component: () => import('../views/frontend/Products.vue'),
      },
      {
        path: '/cart',
        name: 'cart',
        component: () => import('../views/frontend/Cart.vue'),
      },
      {
        path: '/checkout',
        name: 'checkout',
        component: () => import('../views/frontend/Checkout.vue'),
      },
      { // 動態路由
        path: '/checkoutsuccess/:orderId',
        name: 'checkoutsuccess',
        component: () => import('../views/frontend/CheckoutSuccess.vue'),
      },
      { // 動態路由
        path: '/product/:id',
        name: 'product',
        component: () => import('../views/frontend/Product.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/frontend/Login.vue'),
  },
  { // 後台巢狀路由
    path: '/admin',
    name: 'backend ',
    component: () => import('../views/backend/Dashboard.vue'),
    children: [
      {
        path: 'products',
        component: () => import('../views/backend/Products.vue'),
      },
      {
        path: 'coupon',
        component: () => import('../views/backend/Coupon.vue'),
      },
      {
        path: 'order',
        component: () => import('../views/backend/Order.vue'),
      },
      {
        path: 'picture',
        component: () => import('../views/backend/Picture.vue'),
      },
    ],
  },
  { // 無此頁面導向首頁
    path: '*',
    redirect: '/',
  },
];

const router = new VueRouter({
  routes,
});

export default router;
