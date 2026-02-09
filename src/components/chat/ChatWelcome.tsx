import React from 'react'

const ChatWelcome = () => {
  return (
   <section className='text-center'>
<h1 className='text-2xl font-semibold tracking-tight text-foreground'>
Welcome to{" "}
        <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
          Universe
        </span>
</h1>
<p className='text-sm mt-3'>
            Your personal AI copilot for every conversation.

</p>
   </section>
  )
}

export default ChatWelcome
