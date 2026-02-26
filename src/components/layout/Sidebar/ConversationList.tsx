import { MessageCircleDashed } from 'lucide-react'
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { useChat } from "@/context/ChatContext"
import { useEffect } from "react"

export function ConversationList() {
  const { 
    conversations, 
    fetchConversations, 
    currentConversationId, 
    setCurrentConversationId 
  } = useChat()

  useEffect(() => {
    fetchConversations()
  }, [])

  return (
    <div className="flex flex-1 flex-col min-h-0">
      <ScrollArea className="flex-1">
        <div className="flex flex-col gap-2">

          {conversations.map((conv) => {
            const isActive = currentConversationId === conv.id

            return (
              <button
                key={conv.id}
                onClick={() => setCurrentConversationId(conv.id)}
                className={cn(
                  "group flex items-center gap-3 px-3 py-2 rounded-xl",
                  "text-left text-sm font-semibold",
                  "transition-all duration-200",
                
                  
                  !isActive && "hover:bg-black/10 hover:text-black",
                
                  
                  isActive && "bg-black text-white"
                )}
              >
                <MessageCircleDashed
                  className={cn(
                    "h-4 w-4 shrink-0",
                    isActive 
                      ? "text-white" 
                      : "text-black"
                  )}
                />

                <div className="min-w-0 flex-1">
                  <p className="truncate leading-snug">
                    {conv.title}
                  </p>
                </div>
              </button>
            )
          })}

        </div>
      </ScrollArea>
    </div>
  )
}