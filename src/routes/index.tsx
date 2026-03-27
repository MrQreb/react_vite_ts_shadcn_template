import ProductsPage from '@/features/examples/ProductsPage'
import UsersPage from '@/features/examples/UsersPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: UsersPage,
})

