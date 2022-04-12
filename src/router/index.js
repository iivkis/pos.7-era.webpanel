import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store';

import AuthView from '../views/Auth.vue'
import ReportView from '../views/Report.vue'

const routes = [
  {
    path: '/',
    name: 'auth',
    component: AuthView,
  },

  {
    path: '/report',
    name: 'report',
    component: ReportView,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to,) => {
  if (to.fullPath != "/" && store.state.emplJWT === "") {
    return router.push({ name: "auth" })
  }
  // return next()
})

export default router
