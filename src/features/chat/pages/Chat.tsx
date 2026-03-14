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
  const [typing, setTyping] = useState(false)

  const { user } = useAuth()
  const { currentConversationId, setCurrentConversationId, fetchConversations } = useChat()

  // reset عند تغيير المستخدم
  useEffect(() => {
    setCurrentConversationId(null)
    setMessages([])
  }, [user])

  // تحميل الرسائل
  useEffect(() => {

    async function fetchMessages() {

      if (!currentConversationId) {
        setLoading(false)
        return
      }

      setLoading(true)

      const { data } = await supabase
        .from("messages")
        .select("*")
        .eq("conversation_id", currentConversationId)
        .order("created_at", { ascending: true })

      if (data) setMessages(data)

      setLoading(false)

    }

    fetchMessages()

  }, [currentConversationId])

  // realtime
  useEffect(() => {

    if (!currentConversationId) return

    const channel = supabase
      .channel("messages-realtime")
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

            const exists = prev.find(
              (m) =>
                m.role === payload.new.role &&
                m.content === payload.new.content
            )

            if (exists) return prev

            return [...prev, payload.new]

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

    // إظهار رسالة المستخدم فورًا
    setMessages(prev => [
      ...prev,
      {
        id: Date.now(),
        role: "user",
        content: text
      }
    ])

    // إنشاء محادثة إذا كان المستخدم مسجل
    if (user && !conversationId) {

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

    // حفظ رسالة المستخدم إذا كان مسجل
    if (user && conversationId) {

      await supabase.from("messages").insert([
        {
          content: text,
          role: "user",
          conversation_id: conversationId,
        },
      ])

    }

    // typing
    setTyping(true)

    const { data, error } = await supabase.functions.invoke("chat", {
      body: { message: text }
    })

    setTyping(false)

    if (error) {
      console.error(error)
      return
    }

    const reply = data?.reply

    if (!reply) return

    // إظهار الرد فورًا
    setMessages(prev => [
      ...prev,
      {
        id: Date.now(),
        role: "ai",
        content: reply
      }
    ])

    // حفظ الرد إذا كان المستخدم مسجل
    if (user && conversationId) {

      await supabase.from("messages").insert([
        {
          content: reply,
          role: "ai",
          conversation_id: conversationId,
        },
      ])

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
              <div className="flex justify-start px-4 py-3 max-w-3xl mx-auto w-full mb-8">
                <div className="px-4 py-3">

                  <span className="typing-dot" />

                  <style>
                    {`
                    .typing-dot {
                      width: 10px;
                      height: 10px;
                      background-color: #a855f7;
                      border-radius: 9999px;
                      display: inline-block;
                      animation: pulseDot 2s ease-in-out infinite;
                    }

                    @keyframes pulseDot {
                      0%,100% {
                        transform: scale(1.1);
                        opacity: .5;
                      }
                      50% {
                        transform: scale(1.4);
                        opacity: 1;
                      }
                    }
                    `}
                  </style>

                </div>
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