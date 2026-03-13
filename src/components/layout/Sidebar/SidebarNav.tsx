import { LayoutDashboard, MessageSquare, Settings, Search } from "lucide-react"
import { SidebarNavItem } from "./SidebarNavItem"
import { useState, useRef, useEffect } from "react"
import { useChat } from "@/context/ChatContext"

const navItems = [
  { icon: MessageSquare, label: "Chat", to: "/chat" },
  { icon: LayoutDashboard, label: "Dashboard", to: "/dashboard" },
  { icon: Settings, label: "Settings", to: "/settings" },
  { icon: Search, label: "Search Chats", action: "search" },
] as const

export function SidebarNav() {
  const [isSearching, setIsSearching] = useState(false)
  const { searchQuery, setSearchQuery } = useChat()

  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsSearching(false)
        
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <nav className="flex flex-col gap-2">
      {navItems.map((item, index) => {

        if ("action" in item) {
          return (
            <div
              key={index}
              ref={searchRef}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-[#9ca3af] hover:bg-[#1e1e24] hover:text-[#f3f4f6]"
              onClick={() => !isSearching && setIsSearching(true)}
            >
              <item.icon className="h-4 w-4" />

              {isSearching ? (
                <input
                  placeholder="Search chats..."
                  className="bg-transparent outline-none text-sm w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
              ) : (
                item.label
              )}
            </div>
          )
        }

        return (
          <SidebarNavItem
            key={item.to}
            icon={item.icon}
            label={item.label}
            to={item.to}
          />
        )
      })}
    </nav>
  )
}