import { SidebarContent } from "@/components/layout/Sidebar/SidebarContent"
import { Sheet, SheetContent } from "@/components/ui/sheet"

interface SideBarProps{
    open: boolean
onOpenChange: (open: boolean) => void
desktopOpen: boolean
}


export function Sidebar({open, onOpenChange, desktopOpen}: SideBarProps){
    return (
    <>
       <div className="md:hidden">
         <Sheet  open={open} onOpenChange={onOpenChange}  >
            <SheetContent side="left" className="w-64 p-4">
                <SidebarContent/>
            </SheetContent>
        </Sheet>
       </div>

       <aside className={`hidden md:flex transition-all duration-200 overflow-hidden bg-slate-400 
       ${desktopOpen ? 'w-72 p-4 h-full' : 'w-0 p-0'}
        `}>
            <div>
                
            </div>
        <SidebarContent/>
       </aside>
       </>
    )
}