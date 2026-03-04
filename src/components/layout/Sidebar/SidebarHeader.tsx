import { Sparkles } from "lucide-react"
import logo from "@/assets/logo.png"

export function SidebarHeader() {
  return (
    <div className="flex justify-center items-center pr-5 md:pr-4  py-1">

      <img src={logo} alt="Universe" className="h-12 w-12 object-contain" />

      <span className="bg-gradient-to-r from-[#8b5cf6] to-purple-400 bg-clip-text text-transparent text-2xl font-semibold tracking-wide">Universe</span>
    </div>
  )
}
