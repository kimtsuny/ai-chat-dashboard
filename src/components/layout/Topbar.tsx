import { Menu, ChevronDown, User, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

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

interface TopbarProps {
  onMenuClick: () => void;
}

export function Topbar({ onMenuClick }: TopbarProps) {
  return (
    <header className="flex items-center justify-between h-14 px-2 pt-3 bg-muted/40">
      {/* Left side */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={onMenuClick}>
          <Menu className="w-5 h-5" />
        </Button>

        <h1 className="font-semibold text-lg md:hidden">Universe</h1>
      </div>

      {/* User dropdown */}
      <div className="md:mt-4 md:mr-2">
        <DropdownMenu >
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-4 rounded-full hover:bg-accent px-2 py-1 transition">
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>

            <ChevronDown className="w-4 h-4 opacity-60" />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-52">
          <DropdownMenuLabel>
            <div className="flex flex-col">
              <span className="text-sm font-medium">Username</span>
              <span className="text-xs text-muted-foreground">
                user@email.com
              </span>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            Profile
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem className="text-red-500">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      </div>
    </header>
  );
}
