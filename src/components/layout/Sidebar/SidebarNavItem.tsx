import { NavLink } from "react-router-dom"
import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface SidebarNavItemProps {
  icon: LucideIcon
  label: string
  to: string
}

export function SidebarNavItem({ icon: Icon, label, to }: SidebarNavItemProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-3 px-3 py-2 rounded-xl",
          isActive
            ? "bg-black text-accent-foreground text-white font-semibold transition-colors"
            : "text-black-foreground font-semibold transition-colors"
        )
      }
    >
      <Icon className="h-4 w-4" />
      {label}
    </NavLink>
  )
}
