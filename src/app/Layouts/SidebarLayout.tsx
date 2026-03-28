import { Outlet } from '@tanstack/react-router'
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { CustoomSidebar } from '@/features/sidebar/CustomSidebar'

export default function SidebarLayout() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        
        <CustoomSidebar />

        <SidebarInset className="p-4">
          <div className="mb-4 flex items-center gap-2 relative">
            <SidebarTrigger className='size-8' />
            <span className="text-sm font-medium">Menú</span>
          </div>

          {/* Renderizar componentes hijos */}
          <Outlet />
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}