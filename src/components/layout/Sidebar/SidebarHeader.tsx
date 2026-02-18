import { Sparkles } from "lucide-react"
import logo from "@/assets/logo.png"

export function SidebarHeader() {
  return (
    <div className="flex items-center gap-1  py-1">
      
        <img src={logo} alt="Universe" className="h-14 w-14 object-contain" />
      
      <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent text-2xl font-semibold tracking-wide">Universe</span>
    </div>
  )
}
