import { RouterProvider } from '@tanstack/react-router'
import { Toaster } from 'sonner'
import { AuthProvider } from './providers/AuthProvider'
import { QueryProvider } from './providers/QueryProvider'
import { ThemeProvider } from './providers/ThemeProvider'
import { router } from './router/router'
import { TooltipProvider } from '@/components/ui/tooltip';

function App() {
  return (
    <TooltipProvider>
      <QueryProvider>
        <ThemeProvider defaultTheme='dark'>
          <AuthProvider>
            <RouterProvider router={router} />
          </AuthProvider>
        </ThemeProvider>
        <Toaster theme='dark' position='top-right' richColors={true} />
      </QueryProvider>
    </TooltipProvider>
  )
}

export default App
