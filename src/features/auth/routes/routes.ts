import { createRoute } from '@tanstack/react-router'
import { rootRoute } from '@/app/router/__root'
import { ChatPage } from '@/features/chatbot/chat/pages/ChatPage';

/** Routa del login */
export const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: ChatPage, 
})