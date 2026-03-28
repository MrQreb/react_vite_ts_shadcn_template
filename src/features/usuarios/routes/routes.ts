import SidebarLayout from "@/app/Layouts/SideBarLayout";
import { rootRoute } from "@/app/router/__root";
import UsersPage from "@/examples/UsersPage";
import { createRoute } from "@tanstack/react-router";

//Ruta padre para el sidebar
export const usuarioLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/usuarios',
  component: SidebarLayout, 
});

export const tablaRoute = createRoute({
  getParentRoute: () => usuarioLayoutRoute, // usa el layout como padre para renderizar el sidebar
  path: 'tabla',                            // ruta final: /usuarios/tabla
  component: UsersPage, 
});


//Rutas que se mandaran al enrutador principal
export const usuariosRoutes = usuarioLayoutRoute.addChildren([
  tablaRoute,
])

