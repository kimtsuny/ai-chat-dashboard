import ChatCards from '@/components/chat/ChatCards'
import ChatInput from '@/components/chat/ChatInput'
import ChatWelcome from '@/components/chat/ChatWelcome'
import MessageList from '@/components/chat/MessageList'
import React, { useState } from 'react'

const Chat = () => {
    const [messages, setMessages] = useState<any[]>([])

    function handleSend(text: string) {
        const newMsg = {
            id: Date.now().toString(),
            content: text
        }
        setMessages((prev) => [...prev, newMsg])
    }
    return (
       <div className="flex h-screen flex-col w-full bg-gradient-to-b from-muted/40 via-background to-background">
  <main className="flex flex-col flex-1">
    <div className="flex flex-col flex-1 mx-auto w-full max-w-5xl">

      {messages.length === 0 ? (
        <div className="flex flex-col flex-1 items-center justify-center">
          <ChatWelcome />
          <ChatCards />
          <ChatInput onSend={handleSend} />
        </div>
      ) : (
        <>
          {/* منطقة السكرول */}
          <div className="flex-1 overflow-y-auto min-h-0">
            <MessageList messages={messages} />
          </div>

          {/* input ثابت */}
          <ChatInput onSend={handleSend} />
        </>
      )}

    </div>
  </main>
</div>


    )
}

export default Chat
