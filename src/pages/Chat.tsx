import ChatCards from '@/components/chat/ChatCards'
import ChatInput from '@/components/chat/ChatInput'
import ChatWelcome from '@/components/chat/ChatWelcome'
import MessageList from '@/components/chat/MessageList'
import { sendMessage } from '@/services/chatService'
import React, { useState } from 'react'

const Chat = () => {
    const [messages, setMessages] = useState<any[]>([])

    async function handleSend(text:string) {
      
      const userMsg = {
        id: Date.now().toString(),
        content: text,
        role: 'user',
      }
      setMessages((prev) => [...prev, userMsg])

      const res = await sendMessage(text)

      const aiMsg = {
        id: Date.now().toString() + "-ai",
        content: res.reply,
        role: 'ai',
      }
      setMessages((prev) => [...prev, aiMsg])
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
