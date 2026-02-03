import { useState } from "react"
import { Topbar } from "./Topbar"
import { Sidebar } from "./Sidebar"

export function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex flex-col h-screen">
      <Topbar onMenuClick={() => setSidebarOpen(true)} />

      <main className="flex-1 p-4">
        
      </main>

      <Sidebar
        open={sidebarOpen}
        onOpenChange={setSidebarOpen}
      />
    </div>
  )
}
