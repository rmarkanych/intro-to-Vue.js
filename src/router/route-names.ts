import { contactRouteNames } from '@/views/contacts/contacts.routes'
import { authRoutesNames } from '@/views/auth/auth.routes'

export const routeNames = {
  ...authRoutesNames,
  ...contactRouteNames
}
