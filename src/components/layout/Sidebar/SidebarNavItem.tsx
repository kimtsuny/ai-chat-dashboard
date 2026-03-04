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
          "flex items-center gap-3 px-3 py-2 rounded-lg text-sm",
          "transition-all duration-200",
          isActive
            ? "bg-[#1e1e24] text-[#f3f4f6] font-semibold border-l-2 border-[#8b5cf6]"
            : "text-[#9ca3af] font-medium hover:bg-[#1e1e24] hover:text-[#f3f4f6]"
        )
      }
    >
      <Icon className="h-4 w-4" />
      {label}
    </NavLink>
  )
}
