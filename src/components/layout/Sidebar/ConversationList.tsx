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
        <div className="flex flex-col gap-2">

          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-3 px-3 py-2"
              >
                <Skeleton className="h-4 w-4 rounded-full" />
                <Skeleton className="h-4 w-[70%]" />
              </div>
            ))
          ) : (
            conversations.map((conv) => {
              const isActive = currentConversationId === conv.id

              return (
                <div
                  key={conv.id}
                  className={cn(
                    "group flex items-center w-full rounded-xl px-2",
                    "transition-all duration-200",
                    !isActive && "hover:bg-black/10",
                    isActive && "bg-black text-white"
                  )}
                >
                  {/* 🔥 زر المحادثة */}
                  <button
                    onClick={() => setCurrentConversationId(conv.id)}
                    className="flex flex-1 items-center gap-3 py-2 min-w-0 text-left text-sm font-semibold"
                  >
                    <MessageCircleDashed
                      className={cn(
                        "h-4 w-4 shrink-0",
                        isActive ? "text-white" : "text-black"
                      )}
                    />

                    <div className="min-w-0 flex-1">
                      <p className="truncate leading-snug">
                        {conv.title}
                      </p>
                    </div>
                  </button>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button
                        className={cn(
                          "p-2 rounded-xl",
                          " md:opacity-0 group-hover:opacity-100",

                        )}
                      >
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end" className="w-12">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <DropdownMenuItem
                            className={cn(
                              "flex items-center gap-2 cursor-pointer",
                              "text-red-500",
                              "focus:bg-transparent focus:text-red-500",
                              "hover:text-red-500"
                            )}
                            onSelect={(e) => e.preventDefault()} // 🔥 مهم
                          >
                            <Trash2 className="h-4 w-4" />
                            <span>Delete</span>
                          </DropdownMenuItem>
                        </AlertDialogTrigger>

                        <AlertDialogContent className="bg-black text-white border-none shadow-2xl">
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Delete this conversation?
                            </AlertDialogTitle>

                            <AlertDialogDescription>
                              This will permanently delete this chat and its messages.
                            </AlertDialogDescription>
                          </AlertDialogHeader>

                          <AlertDialogFooter>
                            <AlertDialogCancel className="bg-white text-black hover:bg-gray-200">
                              Cancel
                            </AlertDialogCancel>

                            <AlertDialogAction
                              onClick={() => deleteConversation(conv.id)}
                              className="bg-red-500 hover:bg-red-600"
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