import { NavLink } from "react-router-dom"
import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface SidebarNavItemProps {
  icon: LucideIcon
  label: string
  to: string
  active?: boolean
}

export function SidebarNavItem({ icon: Icon, label, to, active }: SidebarNavItemProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
          "hover:bg-accent hover:text-accent-foreground",
          (active ?? isActive)
            ? "bg-accent text-accent-foreground"
            : "text-muted-foreground"
        )
      }
    >
      <Icon className="h-4 w-4 shrink-0" />
      {label}
    </NavLink>
  )
}
