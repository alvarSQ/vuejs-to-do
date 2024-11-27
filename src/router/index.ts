import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth';
import HomeView from '@/views/HomeView.vue'
import UserInfo from '@/views/UserInfo.vue'
import Login from '@/views/Login.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        auth: true
      }
    },
    {
      path: '/user',
      name: 'user',
      component: UserInfo,
      meta: {
        auth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        auth: false
      }
    },
  ],
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (to.meta.auth && !authStore.accessToken) {
    next('/login')
  } else if (!to.meta.auth && authStore.accessToken) {
    next('/user')
  } else next()
})

export default router
