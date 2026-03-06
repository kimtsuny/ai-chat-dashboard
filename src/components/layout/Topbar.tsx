import { Menu, ChevronDown, User, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useChat } from "@/context/ChatContext"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { logout } from "@/features/auth/services/supabase";

interface TopbarProps {
  onMenuClick: () => void;
}

export function Topbar({ onMenuClick }: TopbarProps) {
  const navigate = useNavigate();
  const { user, setUser } = useAuth()
  const { setCurrentConversationId } = useChat()

  return (
    <header className="flex items-center justify-between h-14 px-2 pt-3 pb-2">
      {/* Left side */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={onMenuClick} className="text-[#9ca3af] hover:text-[#f3f4f6] hover:bg-[#1e1e24] transition-colors">
          <Menu className="w-5 h-5" />
        </Button>

        <h1 className="font-semibold text-lg md:hidden bg-gradient-to-r from-[#8b5cf6] to-purple-400 bg-clip-text text-transparent">Universe</h1>
      </div>
      {/* User dropdown */}
      <div className="md:mt-[5px] md:mr-2">
        {user ? (<DropdownMenu >
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-4 rounded-full hover:bg-[#1e1e24] px-2 py-1 transition-all duration-200">
              <Avatar className="h-8 w-8 ring-2 ring-[#2e2e36]">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback className="bg-[#24242b] text-[#f3f4f6]">U</AvatarFallback>
              </Avatar>
              <ChevronDown className="w-4 h-4 text-[#9ca3af]" />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-52 bg-[#1e1e24] border-[#2e2e36]">
            <DropdownMenuLabel>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-[#f3f4f6]">
                  {user?.email.split("@")[0]}
                </span>
                <span className="text-xs text-[#9ca3af]">
                  {user?.email}
                </span>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator className="bg-[#2e2e36]" />

            <DropdownMenuItem className="text-[#9ca3af] hover:text-[#f3f4f6] focus:bg-[#24242b] focus:text-[#f3f4f6] cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>

            <DropdownMenuItem className="text-[#9ca3af] hover:text-[#f3f4f6] focus:bg-[#24242b] focus:text-[#f3f4f6] cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>

            <DropdownMenuSeparator className="bg-[#2e2e36]" />

            <DropdownMenuItem className="text-red-400 focus:bg-[#24242b] focus:text-red-400 cursor-pointer" onClick={async () => {
              await logout()
              setUser(null)
              setCurrentConversationId(null)
              navigate("/login")
            }}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>) : (
          <button
            onClick={() => navigate("/login")}
            className="rounded-xl px-4 h-10 text-sm font-medium text-white
             bg-gradient-to-r from-[#8b5cf6] to-purple-500 
             hover:from-[#7c3aed] hover:to-purple-600
             shadow-lg shadow-purple-500/20
             transition-all duration-200"
          >
            Sign Up
          </button>
        )}




      </div>
    </header>
  );
}
