import ChatCards from '@/components/chat/ChatCards'
import ChatInput from '@/components/chat/ChatInput'
import ChatWelcome from '@/components/chat/ChatWelcome'
import MessageList from '@/components/chat/MessageList'
import ChatSkeleton from '@/components/chat/ChatSkeleton'

import { sendMessage } from '@/services/chatService'
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
        
            if (typingMsgs.length > 0) {
              return [...data, ...typingMsgs]
            }
        
            return data
          })
        }

      setLoading(false)
    }

    fetchMessages()
  }, [currentConversationId])

  // 🔥 send message
  async function handleSend(text: string) {
    if (!user) return
  
    let conversationId = currentConversationId
  
    // 🧠 إذا ماكو محادثة → أنشئ وحدة
    if (!conversationId) {
      const { data, error } = await supabase
        .from("conversations")
        .insert([
          {
            title: text.slice(0, 30),
            user_id: user.id,
          },
        ])
        .select()
        .single()
  
      if (error) {
        console.error(error)
        return
      }
  
      conversationId = data.id
      setCurrentConversationId(conversationId)
    }
  
    // 🟢 1. رسالة المستخدم
    const userMsg = {
      id: Date.now().toString(),
      content: text,
      role: "user",
    }
  
    setMessages((prev) => [...prev, userMsg])
  
    // 💾 خزّنها
    await supabase.from("messages").insert([
      {
        content: text,
        role: "user",
        conversation_id: conversationId,
      },
    ])
  
    // 🔵 2. رسالة وهمية (AI typing)
    const tempAiMsg = {
      id: "typing-" + Date.now(),
      content: "",
      role: "ai",
      isTyping: true,
    }
  
    setMessages((prev) => [...prev, tempAiMsg])
  
    // 🤖 3. ننتظر رد AI
    const res = await sendMessage(text)
  
    // 🔥 4. نحذف "..." ونضيف الرد الحقيقي
    setMessages((prev) => [
      ...prev.filter((msg) => !msg.isTyping),
      {
        id: Date.now().toString(),
        content: res.reply,
        role: "ai",
      },
    ])
  
    // 💾 نخزن رد AI
    await supabase.from("messages").insert([
      {
        content: res.reply,
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

            {loading ? (
              <ChatSkeleton />
            ) : (
              <MessageList messages={messages} />
            )}

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