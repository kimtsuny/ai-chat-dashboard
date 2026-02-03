import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"


import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu"

interface TopbarProps {
  onMenuClick: () => void
}


export function Topbar({ onMenuClick }: TopbarProps) {
    return (
        <header className="flex items-center justify-between h-14 px-4 border-b bg-background">

            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={onMenuClick}>
                    <Menu className="w-5 h-5" />
                </Button>

                <h1 className="font-semibold text-lg">
                    Universe
                </h1>
            </div>


            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </header>
    )
}