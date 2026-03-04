import React from 'react'

const ChatWelcome = () => {
  return (
    <section className='text-center'>
      <h1 className='text-3xl font-bold tracking-tight text-[#f3f4f6] sm:text-4xl md:text-5xl'>
        Welcome to{" "}
        <span className="bg-gradient-to-r from-[#8b5cf6] to-purple-400 bg-clip-text text-transparent tracking-wide">
          Universe
        </span>
      </h1>
      <p className='text-sm mt-4 text-[#9ca3af] sm:text-base leading-relaxed'>
        Your personal AI copilot for every conversation.

      </p>
    </section>
  )
}

export default ChatWelcome
