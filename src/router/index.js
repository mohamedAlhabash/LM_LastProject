import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';
import CartView from '../views/CartView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'Home Page'
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginView,
      meta: {
        title: 'Login Page'
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: RegisterView,
      meta: {
        title: 'Shop Page'
      }
    },
    {
      path: '/cart',
      name: 'Cart',
      component: CartView
    },
  ]
})
let defaultTitle = "Final Project";
router.afterEach((to) => {
  document.title = to.meta.title || defaultTitle
})

export default router

