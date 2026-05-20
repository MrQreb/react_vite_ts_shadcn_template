import { rootRoute } from "@/app/router/__root";
import { createRoute } from "@tanstack/react-router";
import { ChatPage } from "../chat/pages/ChatPage";

export const chatRoutes = createRoute({
  getParentRoute: () => rootRoute,
  path: '/chat',
  component: ChatPage, 
})