import { ChevronRight, type LucideIcon } from "lucide-react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type NavItem = {
  title: string
  url: string
  icon?: LucideIcon
  isActive?: boolean
  items?: {
    title: string
    url: string
  }[]
}

export function NavMain({ items }: { items: NavItem[] }) {
  const { setOpen, state } = useSidebar()

  const isCollapsed = state === "collapsed"

  const handleClick = () => {
    setOpen(true)
  }

  return (
    <SidebarGroup>
      {!isCollapsed && (
        <SidebarGroupLabel className="px-3 mb-3 text-sm font-semibold text-muted-foreground">
          Navegación
        </SidebarGroupLabel>
      )}

      <SidebarMenu className="space-y-2">
        {items.map((item) => (
          <Collapsible
            key={item.title}
            defaultOpen={item.isActive}
            className="group"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <Button
                  onClick={handleClick}
                  variant="ghost"
                  className={cn(
                    baseItemClass,
                    isCollapsed && collapsedItemClass,
                    item.isActive && activeItemClass
                  )}
                >
                  {item.icon && (
                    <item.icon
                      className={cn(
                        "w-6 h-6",
                        !isCollapsed && "opacity-90"
                      )}
                    />
                  )}

                  {!isCollapsed && (
                    <span className="flex-1 text-left truncate">
                      {item.title}
                    </span>
                  )}

                  {!isCollapsed && item.items && (
                    <ChevronRight className="chevronClass" />
                  )}
                </Button>
              </CollapsibleTrigger>

              {/* SUBMENU */}
              {item.items && !isCollapsed && (
                <CollapsibleContent>
                  <SidebarMenuSub className="subMenuClass">
                    {item.items.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <Button
                          asChild
                          variant="ghost"
                          onClick={handleClick}
                          className="subItemClass"
                        >
                          <a href={subItem.url}>
                            {subItem.title}
                          </a>
                        </Button>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              )}
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}

const baseItemClass = `
  w-full justify-start gap-4
  h-12 px-4
  text-base font-medium
  rounded-xl
  transition-all duration-200

  hover:bg-muted/70
  dark:hover:bg-muted/40
`

const collapsedItemClass = `
  justify-center
  px-0
  w-12 h-12

  hover:bg-muted/70
  dark:hover:bg-muted/40
`

const activeItemClass = `
  bg-primary/10 text-primary
  hover:bg-primary/15
`

