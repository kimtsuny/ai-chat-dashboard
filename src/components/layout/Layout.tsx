import { useState } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import { Topbar } from "./Topbar"
import { Sidebar } from "./Sidebar/Sidebar"
import Chat from "@/features/chat/pages/Chat"
import Dashboard from "@/features/dashboard/pages/Dashboard"

export function Layout() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const [desktopOpen, setDesktopOpen] = useState(true)

  function handleSidebarOpen() {
    if (window.innerWidth >= 768) {
      setDesktopOpen(!desktopOpen)
    } else {
      setMobileSidebarOpen(!mobileSidebarOpen)
    }
  }

  return (
    <div className="flex h-[100dvh] overflow-hidden">
      <Sidebar
        open={mobileSidebarOpen}
        onOpenChange={setMobileSidebarOpen}
        desktopOpen={desktopOpen}
        setDesktopOpen={setDesktopOpen}
      />

      <div className="flex flex-1 flex-col bg-gradient-to-b from-[#121217] via-[#0f0f11] to-[#0f0f11]">
        <Topbar onMenuClick={handleSidebarOpen} />

        <main className="flex flex-1 flex-col min-h-0">
          <Routes>
            <Route path="/chat" element={<Chat />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<Navigate to="/chat" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}
