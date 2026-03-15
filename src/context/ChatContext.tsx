import { createContext, useContext, useEffect, useState, ReactNode } from "react"
import { supabase } from "@/lib/supabase"
import { useAuth } from "./AuthContext"

type Conversation = {
  id: string
  title: string
}

type ChatContextType = {
  conversations: Conversation[]
  fetchConversations: () => Promise<void>
  currentConversationId: string | null
  setCurrentConversationId: (id: string | null) => void
  deleteConversation: (id: string) => Promise<void>
  searchQuery: string
  setSearchQuery: (query: string) => void
}

const ChatContext = createContext<ChatContextType | undefined>(undefined)

export function ChatProvider({ children }: { children: ReactNode }) {

  const { user } = useAuth()

  const [conversations, setConversations] = useState<Conversation[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null)

  const fetchConversations = async () => {

    if (!user) return

    try {

      const { data, error } = await supabase
        .from("conversations")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })

      if (error) {
        console.error("Fetch conversations error:", error)
        return
      }

      setConversations(data || [])

    } catch (err) {
      console.error("Unexpected fetch error:", err)
    }

  }

  useEffect(() => {

    if (!user) return

    fetchConversations()

  }, [user])

  const deleteConversation = async (id: string) => {

    try {

      const { error } = await supabase
        .from("conversations")
        .delete()
        .eq("id", id)

      if (error) {
        console.error("Delete error:", error)
        return
      }

      setConversations((prev) =>
        prev.filter((conv) => conv.id !== id)
      )

      if (currentConversationId === id) {
        setCurrentConversationId(null)
      }

    } catch (err) {
      console.error("Unexpected delete error:", err)
    }

  }

  return (
    <ChatContext.Provider
      value={{
        conversations,
        fetchConversations,
        currentConversationId,
        setCurrentConversationId,
        deleteConversation,
        searchQuery,
        setSearchQuery
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}

export function useChat() {

  const context = useContext(ChatContext)

  if (!context) {
    throw new Error("useChat must be used inside ChatProvider")
  }

  return context
}