import React from 'react'

const ChatWelcome = () => {
  return (
   <section className='text-center'>
<h1 className='text-2xl font-semibold tracking-tight text-foreground sm:text-3xl md:text-4xl'>
Welcome to{" "}
        <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent  tracking-wide">
          Universe
        </span>
</h1>
<p className='text-sm mt-3 text-muted-foreground sm:text-base'>
            Your personal AI copilot for every conversation.

</p>
   </section>
  )
}

export default ChatWelcome
