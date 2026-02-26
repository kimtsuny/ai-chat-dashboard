import { createContext, useContext, useEffect, useState, ReactNode } from "react"
import { supabase } from "@/lib/supabase"
import { useAuth } from "./AuthContext"

type Conversation = {
    id:string,
    title: string
}

type ChatContextType = {
  conversations: Conversation[]
  fetchConversations: () => void
  currentConversationId: string | null
  setCurrentConversationId: (id: string | null) => void
}

const ChatContext = createContext<ChatContextType | undefined>(undefined)

export function ChatProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null)

  const fetchConversations = async () => {
    if (!user) return

    const { data, error } = await supabase
      .from("conversations")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })

    if (error) {
      console.log("Error:", error)
    } else {
      setConversations(data || [])
    }
  }


  useEffect(() => {
    fetchConversations()
  }, [user])

  return (
    <ChatContext.Provider value={{ conversations, fetchConversations, currentConversationId, setCurrentConversationId }}>
      {children}
    </ChatContext.Provider>
  )
}

export function useChat() {
  const context = useContext(ChatContext)
  if (!context) throw new Error("useChat must be used inside ChatProvider")
  return context
}   