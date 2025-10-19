import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import MainLayout from '@/layouts/MainLayout.vue'
import HomeDashboard from '@/views/HomeDashboard.vue'
import BorrowPage from '@/views/BorrowPage.vue'
import ReturnPage from '@/views/ReturnPage.vue'
import HistoryPage from '@/views/HistoryPage.vue'
import LoginPage from '@/views/LoginPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: LoginPage,
    },
    {
      path: '/',
      component: MainLayout,
      children: [
        { path: '', name: 'Home', component: HomeDashboard },
        { path: 'borrow', name: 'Borrow', component: BorrowPage },
        { path: 'return', name: 'Return', component: ReturnPage },
        { path: 'history', name: 'History', component: HistoryPage },
      ],
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  await authStore.checkUser()

  if (to.name !== 'Login' && !authStore.user) {
    next({ name: 'Login' })
  } else if (to.name === 'Login' && authStore.user) {
    next({ name: 'Home' })
  } else {
    next()
  }
})

export default router
