import ChatCards from '@/features/chat/compoents/ChatCards'
import ChatInput from '../compoents/ChatInput'
import ChatWelcome from '@/features/chat/compoents/ChatWelcome'
import MessageList from '@/features/chat/compoents/MessageList'
import ChatSkeleton from '@/features/chat/compoents/ChatSkeleton'

import { useChat } from '@/context/ChatContext'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/context/AuthContext'

import React, { useEffect, useState } from 'react'

const Chat = () => {
  const [messages, setMessages] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const { user } = useAuth()
  const { currentConversationId, setCurrentConversationId } = useChat()

  // 🔥 fetch messages
  useEffect(() => {
    async function fetchMessages() {
      if (!currentConversationId) {
        setMessages([])
        setLoading(false)
        return
      }

      setLoading(true)

      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .eq("conversation_id", currentConversationId)
        .order("created_at", { ascending: true })

      if (!error && data) {
        setMessages((prev) => {
          const typingMsgs = prev.filter((msg) => msg.isTyping)
          return typingMsgs.length > 0 ? [...data, ...typingMsgs] : data
        })
      }

      setLoading(false)
    }

    fetchMessages()
  }, [currentConversationId])

  async function handleSend(text: string) {
    if (!user) return
  
    let conversationId = currentConversationId
  
    // 🧠 create conversation
    if (!conversationId) {
      const { data, error } = await supabase
        .from("conversations")
        .insert([
          {
            title: text.slice(0, 20),
            user_id: user.id,
          },
        ])
        .select()
        .single()
  
      if (error) return
  
      conversationId = data.id
      setCurrentConversationId(conversationId)
    }
  
    // 🟢 user message
    const userMsg = {
      id: Date.now().toString(),
      content: text,
      role: "user",
    }
  
    setMessages((prev) => [...prev, userMsg])
  
    await supabase.from("messages").insert([
      {
        content: text,
        role: "user",
        conversation_id: conversationId,
      },
    ])
  
    // 🔵 loading message
    const tempAiMsg = {
      id: "loading-" + Date.now(),
      content: "",
      role: "ai",
      isTyping: true
    }
  
    setMessages((prev) => [...prev, tempAiMsg])
  
   
    const res = await fetch(
      "https://eodtylujqrywxflylqin.supabase.co/functions/v1/chat",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: text }),
      }
    )
  
    const data = await res.json()
    const reply = data.reply
  
    // 🔁 replace loading message
    setMessages((prev) => {
      const updated = [...prev]
      const index = updated.findIndex(msg => msg.id === tempAiMsg.id)
  
      if (index !== -1) {
        updated[index] = {
          id: Date.now().toString(),
          content: reply,
          role: "ai",
          isTyping: false
        }
      }
  
      return updated
    })
  
    // 💾 save AI message
    await supabase.from("messages").insert([
      {
        content: reply,
        role: "ai",
        conversation_id: conversationId,
      },
    ])
  }

  return (
    <div className="flex flex-1 flex-col min-h-0 w-full bg-gradient-to-b from-muted/40 via-background to-background">

      {messages.length === 0 ? (
        <div className="flex flex-col flex-1 min-h-0 mx-auto w-full max-w-5xl">
          <div className="flex flex-col flex-1 items-center justify-center min-h-0">
            <ChatWelcome />
            <ChatCards />
            <ChatInput onSend={handleSend} />
          </div>
        </div>
      ) : (
        <>
          <div className="flex-1 w-full overflow-y-auto min-h-0">
            {loading ? <ChatSkeleton /> : <MessageList messages={messages} />}
          </div>

          <div className="shrink-0 mx-auto w-full max-w-5xl">
            <ChatInput onSend={handleSend} />
          </div>
        </>
      )}

    </div>
  )
}

export default Chat