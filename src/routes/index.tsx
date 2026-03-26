import LoginPage from '@/features/login/view/LoginPage'
import ProductsPage from '@/features/tablas/ProductsPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: ProductsPage,
})

