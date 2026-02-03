import { Sheet, SheetContent } from "@/components/ui/sheet"

interface SidebarProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function Sidebar({ open, onOpenChange }: SidebarProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-64 p-4">
        <h2 className="font-semibold text-lg mb-4">
          Universe
        </h2>

        <nav className="space-y-2">
          <div className="p-2 rounded hover:bg-muted cursor-pointer">
            Chat
          </div>

          <div className="p-2 rounded hover:bg-muted cursor-pointer">
            Dashboard
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
