import { createRouter, createWebHistory } from 'vue-router'
import HomeDashboard from '../views/HomeDashboard.vue.vue'
import BorrowPage from '../views/BorrowPage.vue'
import ReturnPage from '../views/ReturnPage.vue'
import HistoryPage from '../views/HistoryPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeDashboard,
    },
    {
      path: '/borrow',
      name: 'Borrow',
      component: BorrowPage,
    },
    {
      path: '/return',
      name: 'Return',
      component: ReturnPage,
    },
    {
      path: '/history',
      name: 'History',
      component: HistoryPage,
    },
  ],
})

export default router
