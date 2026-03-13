import ChatCards from '@/features/chat/compoents/ChatCards'
import ChatInput from '../compoents/ChatInput'
import ChatWelcome from '@/features/chat/compoents/ChatWelcome'
import MessageList from '@/features/chat/compoents/MessageList'
import ChatSkeleton from '@/features/chat/compoents/ChatSkeleton'

import { useChat } from '@/context/ChatContext'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/context/AuthContext'

import React, { useEffect, useRef, useState } from 'react'

const Chat = () => {
  const [messages, setMessages] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const isSendingRef = useRef(false)

  const { user } = useAuth()
  const { currentConversationId, setCurrentConversationId, fetchConversations } = useChat()

  // Reset chat state when user changes (login/logout)
  useEffect(() => {
    setCurrentConversationId(null)
    setMessages([])
  }, [user])

  useEffect(() => {
    if (currentConversationId) {
      setLoading(true)
    }
  }, [currentConversationId])

  // 🔥 fetch messages — guarded by isSendingRef to avoid overwriting mid-send
  useEffect(() => {
    async function fetchMessages() {
      if (isSendingRef.current) return
      if (!currentConversationId) {
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
    isSendingRef.current = true

    // 🟢 1. user message (UI only)
    const userMsg = {
      id: Date.now().toString(),
      content: text,
      role: "user",
    }

    // 🔵 2. loading message
    const tempAiMsg = {
      id: "loading-" + Date.now(),
      content: "",
      role: "ai",
      isTyping: true
    }

    setMessages((prev) => [...prev, userMsg, tempAiMsg])

    // 🧠 3. call AI
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

    // 🔁 4. replace loading with real reply
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

    // 💾 5. persist to DB (if logged in) — ALL inserts BEFORE setCurrentConversationId
    if (user) {
      let conversationId = currentConversationId

      // Create conversation if needed
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

        if (error) {
          isSendingRef.current = false
          return
        }

        conversationId = data.id
      }

      // Save user message
      await supabase.from("messages").insert([
        {
          content: text,
          role: "user",
          conversation_id: conversationId,
        },
      ])

      // Save AI reply
      await supabase.from("messages").insert([
        {
          content: reply,
          role: "ai",
          conversation_id: conversationId,
        },
      ])

      // ✅ 6. NOW safe to set conversation ID — data is already in DB
      isSendingRef.current = false

      if (!currentConversationId) {
        setCurrentConversationId(conversationId)
        fetchConversations()
      }
    } else {
      isSendingRef.current = false
    }
  }

  return (
    <div className="flex flex-1 flex-col min-h-0 w-full bg-gradient-to-b from-[#121217] via-[#0f0f11] to-[#0f0f11]">

      {loading && currentConversationId ? (
        <>
          <div className="flex-1 w-full overflow-y-auto min-h-0">
            <ChatSkeleton />
          </div>
          <div className="shrink-0 mx-auto w-full max-w-5xl">
            <ChatInput onSend={handleSend} />
          </div>
        </>
      ) : !currentConversationId ? (
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
            <MessageList messages={messages} />
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