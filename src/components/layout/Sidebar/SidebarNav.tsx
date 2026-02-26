import { LayoutDashboard, MessageSquare, Clock, Settings } from "lucide-react"
import { SidebarNavItem } from "./SidebarNavItem"

const navItems = [
  { icon: MessageSquare, label: "Chat", to: "/chat"  },
  { icon: LayoutDashboard, label: "Dashboard", to: "/dashboard" },
  { icon: Clock, label: "History", to: "/history" },
  { icon: Settings, label: "Settings", to: "/settings" },
] as const

export function SidebarNav() {
  return (
    <nav className="flex flex-col gap-2">
      {navItems.map((item) => (
        <SidebarNavItem
          key={item.to}
          icon={item.icon}
          label={item.label}
          to={item.to}
        />
      ))}
    </nav>
  )
}
