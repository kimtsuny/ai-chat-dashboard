import { MessageCircleDashed, MoreVertical, Trash2 } from 'lucide-react'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog"

import { cn } from "@/lib/utils"
import { useChat } from "@/context/ChatContext"
import { useEffect, useState } from "react"

export function ConversationList() {
  const {
    conversations,
    fetchConversations,
    currentConversationId,
    setCurrentConversationId,
    deleteConversation
  } = useChat()

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      await fetchConversations()
      setLoading(false)
    }

    load()
  }, [])

  return (
    <div className="flex flex-1 flex-col min-h-0">
      <ScrollArea className="flex-1">
        <div className="flex flex-col gap-1">

          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-3 px-3 py-2"
              >
                <Skeleton className="h-4 w-4 rounded-full bg-[#1e1e24]" />
                <Skeleton className="h-4 w-[70%] bg-[#1e1e24]" />
              </div>
            ))
          ) : (
            conversations.map((conv) => {
              const isActive = currentConversationId === conv.id

              return (
                <div
                  key={conv.id}
                  className={cn(
                    "group flex items-center w-full rounded-lg px-2",
                    "transition-all duration-200",
                    !isActive && "hover:bg-[#1e1e24]/60",
                    isActive && "bg-[#1e1e24] text-[#f3f4f6]"
                  )}
                >
                  {/* Conversation button */}
                  <button
                    onClick={() => setCurrentConversationId(conv.id)}
                    className="flex flex-1 items-center gap-3 py-2 min-w-0 text-left text-sm font-medium"
                  >
                    <MessageCircleDashed
                      className={cn(
                        "h-4 w-4 shrink-0",
                        isActive ? "text-[#8b5cf6]" : "text-[#9ca3af]"
                      )}
                    />

                    <div className="min-w-0 flex-1">
                      <p className={cn(
                        "truncate leading-snug",
                        isActive ? "text-[#f3f4f6]" : "text-[#9ca3af]"
                      )}>
                        {conv.title}
                      </p>
                    </div>
                  </button>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button
                        className={cn(
                          "p-2 rounded-lg text-[#9ca3af] hover:text-[#f3f4f6]",
                          " md:opacity-0 group-hover:opacity-100",
                          "transition-all duration-200"
                        )}
                      >
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end" className="w-12 bg-[#1e1e24] border-[#2e2e36]">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <DropdownMenuItem
                            className={cn(
                              "flex items-center gap-2 cursor-pointer",
                              "text-red-400",
                              "focus:bg-[#24242b] focus:text-red-400",
                              "hover:text-red-400"
                            )}
                            onSelect={(e) => e.preventDefault()}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span>Delete</span>
                          </DropdownMenuItem>
                        </AlertDialogTrigger>

                        <AlertDialogContent className="bg-[#1e1e24] text-[#f3f4f6] border-[#2e2e36] shadow-2xl">
                          <AlertDialogHeader>
                            <AlertDialogTitle className="text-[#f3f4f6]">
                              Delete this conversation?
                            </AlertDialogTitle>

                            <AlertDialogDescription className="text-[#9ca3af]">
                              This will permanently delete this chat and its messages.
                            </AlertDialogDescription>
                          </AlertDialogHeader>

                          <AlertDialogFooter>
                            <AlertDialogCancel className="bg-[#24242b] text-[#f3f4f6] border-[#2e2e36] hover:bg-[#2e2e36] hover:text-[#f3f4f6]">
                              Cancel
                            </AlertDialogCancel>

                            <AlertDialogAction
                              onClick={() => deleteConversation(conv.id)}
                              className="bg-red-500/90 hover:bg-red-600 text-white"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )
            })
          )}

        </div>
      </ScrollArea>
    </div>
  )
}