import type { RouteRecordRaw } from 'vue-router'
import Login from './Login.vue'

export const authRoutesNames = {
  login: 'login'
}

export const authRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: authRoutesNames.login,
    component: Login
  }
]
