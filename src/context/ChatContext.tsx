import { createContext, useContext, useEffect, useState, ReactNode, useCallback, useMemo } from "react"
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

  const { user, initialized } = useAuth()

  const [conversations, setConversations] = useState<Conversation[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null)

  // 🔥 fetch conversations — always hits Supabase
  const fetchConversations = useCallback(async () => {
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
  }, [user])

  // 🔥 fetch when auth is initialized and user is available
  useEffect(() => {
    if (!initialized || !user) return
    fetchConversations()
  }, [initialized, user, fetchConversations])

  // 🔥 delete conversation
  const deleteConversation = useCallback(async (id: string) => {
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

      setCurrentConversationId((prev) =>
        prev === id ? null : prev
      )
    } catch (err) {
      console.error("Unexpected delete error:", err)
    }
  }, [])

  // 🔥 memoized context value
  const value = useMemo(() => ({
    conversations,
    fetchConversations,
    currentConversationId,
    setCurrentConversationId,
    deleteConversation,
    searchQuery,
    setSearchQuery,
  }), [
    conversations,
    fetchConversations,
    currentConversationId,
    deleteConversation,
    searchQuery,
  ])

  return (
    <ChatContext.Provider value={value}>
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
