import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function SidebarFooter() {
  return (
    <div className="flex items-center gap-3 rounded-lg px-2 py-1">
      <Avatar className="h-8 w-8">
        <AvatarImage src="" alt="User" />
        <AvatarFallback className="text-xs">UN</AvatarFallback>
      </Avatar>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium leading-snug">User Name</p>
        <p className="truncate text-xs text-muted-foreground">user@example.com</p>
      </div>
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
              <LogOut className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">Sign out</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}
