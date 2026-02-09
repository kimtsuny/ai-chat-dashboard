import ChatCards from '@/components/chat/ChatCards'
import { ChatInput } from '@/components/chat/ChatInput'
import ChatWelcome from '@/components/chat/ChatWelcome'
import React from 'react'

const Chat = () => {
    return (
        <div className='flex flex-col w-full bg-gradient-to-b from-muted/40 via-background to-background'>
            <main className='flex flex-1 items-center justify-center'>
                <div className='flex mx-auto items-center max-w-5xl flex-col'>
                    <ChatWelcome />
                    <ChatCards/>
                    <ChatInput/>
                </div>
            </main>
        </div>
    )
}

export default Chat
