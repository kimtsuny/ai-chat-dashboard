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
  const [loading, setLoading] = useState(false)
  const [typing, setTyping] = useState(false)

  const { user, initialized } = useAuth()
  const { currentConversationId, setCurrentConversationId, fetchConversations } = useChat()

  const creatingConversationRef = useRef(false)

  // ⭐ جلب المحادثات عند دخول الصفحة
  useEffect(() => {

    if (!initialized || !user) return

    fetchConversations()

  }, [initialized, user])


  // reset عند تغيير المستخدم
  useEffect(() => {
    setCurrentConversationId(null)
    setMessages([])
  }, [user])


  // مسح الرسائل عند تغيير المحادثة
  useEffect(() => {
    if (!currentConversationId) return

    if (creatingConversationRef.current) {
      creatingConversationRef.current = false
      return
    }

    let isActive = true

    const loadMessages = async () => {
      setMessages([])
      setLoading(true)

      const { data } = await supabase
        .from("messages")
        .select("*")
        .eq("conversation_id", currentConversationId)
        .order("created_at", { ascending: true })

      if (!isActive) return

      if (data) setMessages(data)

      setLoading(false)
    }

    loadMessages()

    return () => {
      isActive = false
    }

  }, [currentConversationId])


  // realtime
  useEffect(() => {
    if (!currentConversationId) return

    const channel = supabase
      .channel(`messages-${currentConversationId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `conversation_id=eq.${currentConversationId}`,
        },
        (payload) => {
          setMessages((prev) => {
            const exists = prev.some(
              (m) => m.id === payload.new.id
            )

            if (exists) return prev

            const updated = [...prev, payload.new]

            return updated.sort(
              (a, b) =>
                new Date(a.created_at) - new Date(b.created_at)
            )
          })
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [currentConversationId])


 async function handleSend(text: string) {
  let conversationId = currentConversationId

  // 🟢 1. عرض رسالة المستخدم فورًا
  const tempUserId = "temp-user-" + Date.now()

  setMessages(prev => [
    ...prev,
    {
      id: tempUserId,
      role: "user",
      content: text,
      created_at: new Date().toISOString()
    }
  ])

  // 🟢 2. إنشاء محادثة إذا ماكو
  if (user && !conversationId) {
    creatingConversationRef.current = true

    const { data: conv } = await supabase
      .from("conversations")
      .insert([
        {
          title: text.slice(0, 20),
          user_id: user.id,
        },
      ])
      .select()
      .single()

    conversationId = conv.id
    setCurrentConversationId(conversationId)
    fetchConversations()
  }

  // 🟢 3. حفظ رسالة المستخدم
  if (user && conversationId) {
    const { data: inserted } = await supabase
      .from("messages")
      .insert([
        {
          content: text,
          role: "user",
          conversation_id: conversationId,
        },
      ])
      .select()
      .single()

    // استبدال المؤقت بالحقيقي
    setMessages(prev =>
      prev.map(msg =>
        msg.id === tempUserId ? inserted : msg
      )
    )
  }

  // 🟡 4. typing indicator
  setTyping(true)

  const { data, error } = await supabase.functions.invoke("chat", {
    body: { message: text }
  })

  setTyping(false)

  if (error) return

  const reply = data?.reply
  if (!reply) return

  // 🔥 5. عرض رد AI فورًا (الحل الأساسي)
  const tempAiId = "temp-ai-" + Date.now()

  setMessages(prev => [
    ...prev,
    {
      id: tempAiId,
      role: "ai",
      content: reply,
      created_at: new Date().toISOString()
    }
  ])

  // 🔵 6. حفظ رد AI بالـ DB
  if (user && conversationId) {
    const { data: insertedAI } = await supabase
      .from("messages")
      .insert([
        {
          content: reply,
          role: "ai",
          conversation_id: conversationId,
        },
      ])
      .select()
      .single()

    // استبدال المؤقت بالحقيقي
    setMessages(prev =>
      prev.map(msg =>
        msg.id === tempAiId ? insertedAI : msg
      )
    )
  }
}

  return (
    <div className="flex flex-1 flex-col min-h-0 w-full bg-gradient-to-b from-[#121217] via-[#0f0f11] to-[#0f0f11]">

      {loading && messages.length === 0 ? (

        <>
          <div className="flex-1 w-full overflow-y-auto min-h-0">
            <ChatSkeleton />
          </div>

          <div className="shrink-0 mx-auto w-full max-w-5xl">
            <ChatInput onSend={handleSend} />
          </div>
        </>

      ) : messages.length === 0 ? (

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

            {typing && (
              <div className="flex justify-start px-4 py-3 max-w-3xl mx-auto w-full">
                <span className="typing-dot" />
                    <style>
{`
  .typing-dot {
    width: 10px;
    height: 10px;
  background-color: #a855f7;
    border-radius: 9999px;
    animation: pulseDot 2s ease-in-out infinite;
    
  }

  @keyframes pulseDot {
    0%, 100% {
      transform: scale(1.1);
      opacity: 0.5;
    }
    50% {
      transform: scale(1.4);
      opacity: 1;
    }
  }
`}
</style>
              </div>
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