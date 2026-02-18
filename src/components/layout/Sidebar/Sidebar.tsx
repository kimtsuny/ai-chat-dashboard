import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { SidebarHeader } from "./SidebarHeader"
import { SidebarNav } from "./SidebarNav"
import { NewChatButton } from "./NewChatButton"
import { ConversationList } from "./ConversationList"
import { SidebarFooter } from "./SidebarFooter"

interface SidebarProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  desktopOpen: boolean
  setDesktopOpen?: (open: boolean) => void
}

function SidebarBody() {
  return (
    <div className="flex h-full flex-col gap-4 py-4">
      <SidebarHeader />
      <div className="px-2">
        <NewChatButton />
      </div>
      <div className="px-2">
        <SidebarNav />
      </div>
      <Separator />
      <ConversationList />
      <SidebarFooter />
    </div>
  )
}

export function Sidebar({ open, onOpenChange, desktopOpen }: SidebarProps) {
  return (
    <>
      {/* Mobile: slide-over sheet */}
      <div className="md:hidden">
        <Sheet open={open} onOpenChange={onOpenChange}>
          <SheetContent side="left" className="w-[260px] p-0 px-2">
            <SidebarBody />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop: collapsible aside */}
      <aside
        className={`
          hidden md:flex flex-col border-r bg-background
          transition-all duration-200 overflow-hidden
          ${desktopOpen ? "w-[260px] px-2" : "w-0 px-0"}
        `}
      >
        {desktopOpen && <SidebarBody />}
      </aside>
    </>
  )
}
