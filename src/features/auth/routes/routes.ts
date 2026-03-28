import { createRoute } from '@tanstack/react-router'
import LoginPage from '../login/pages/LoginPage'
import { rootRoute } from '@/app/router/__root'

/** Routa del login */
export const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: LoginPage, 
})