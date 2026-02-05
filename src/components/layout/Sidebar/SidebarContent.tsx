import { SidebarItem } from "@/components/layout/Sidebar/SidebarItem";

export function SidebarContent(){
    return(
        <div className="md:hidden">
        <div>
            <h1 className="font-semibold text-lg">
                    Universe
                </h1>
        </div>
        <div className="flex flex-col gap-1">
<SidebarItem to='chat' label='chat'/>
<SidebarItem to='chat' label='chat'/>
<SidebarItem to='chat' label='chat'/>
<SidebarItem to='chat' label='chat'/>
<SidebarItem to='chat' label='chat'/>
        </div>
        </div>
    )
}