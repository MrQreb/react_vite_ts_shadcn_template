import ProductsPage from '@/features/examples/ProductsPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: ProductsPage,
})

