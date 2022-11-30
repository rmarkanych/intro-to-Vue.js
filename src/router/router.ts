import { createRouter, createWebHistory } from 'vue-router'
import Contacts from '@/views/Contacts.vue'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/contacts',
      name: 'contact',
      components: Contacts
    }
  ]
})
