import { createRootRoute, Outlet } from '@tanstack/react-router'
import NotFound from '../Layouts/NotFound';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';


/**
 * Configuracion de enrutador.
 */
export const rootRoute = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
  notFoundComponent: NotFound,
})