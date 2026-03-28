import { createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree';


//Crea enturador
export const router = createRouter({ routeTree })

//Tipa las rutas
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
