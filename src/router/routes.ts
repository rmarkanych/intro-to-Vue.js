import type { RouteRecordRaw } from 'vue-router'

import { contactRouteNames, contactsRoutes } from '@/views/contacts/contacts.routes'
import { jobOpeningsRoutes } from '@/views/job-opening/job-opening.routes'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: { name: contactRouteNames.contacts }
  },

  ...contactsRoutes,
  ...jobOpeningsRoutes
]
