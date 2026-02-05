import { useState } from "react"
import { Topbar } from "./Topbar"
import { Sidebar } from "./Sidebar/Sidebar"

export function Layout() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const [desktopOpen, setDesktopOpen] = useState(true)

function handleSidebarOpen() {
  if (window.innerWidth >= 768){
    setDesktopOpen(!desktopOpen)
  }else{
    setMobileSidebarOpen(!mobileSidebarOpen)
  }
}

  return (
<div className="flex h-screen overflow-hidden">
  <Sidebar
        open={mobileSidebarOpen}
        onOpenChange={setMobileSidebarOpen}
        desktopOpen={desktopOpen}
        setDesktopOpen={setDesktopOpen}
      />

    <div className="flex flex-1 flex-col ">
      <Topbar onMenuClick={handleSidebarOpen} />

      
    </div>
    </div>
  )
}
