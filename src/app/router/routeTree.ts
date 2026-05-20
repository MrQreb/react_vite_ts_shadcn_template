import { loginRoute } from "@/features/auth/routes/routes";
import { rootRoute } from "./__root";
import { usuariosRoutes } from "@/features/usuarios/routes/routes";
import { chatRoutes } from "@/features/chatbot/routes/routes";


/**
 * Arreglo de rutas donde se importan todas las rutas de la aplicacion
 */
export const routeTree = rootRoute.addChildren([
  loginRoute,
  usuariosRoutes,
  chatRoutes

])