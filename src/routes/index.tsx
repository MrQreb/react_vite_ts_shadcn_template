import LoginPage from '@/features/login/view/LoginPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: LoginPage,
})

