import React from 'react'
import type { FormEvent, SetStateAction } from "react"
import { useState } from "react"
import { Paperclip, SendHorizontal, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

const ChatInput = ({ onSend }) => {
  const [text, setText] = useState('')

  function handleSubmit(e: any) {
    e.preventDefault()
    if (!text.trim()) return;
    onSend(text)
    setText("")
  }
  return (
    <form className='mx-auto max-w-3xl w-full p-3 md:p-1 sm:mb-2'
      onSubmit={handleSubmit}
    >
      <div className='rounded-2xl p-3 bg-[#1e1e24] border border-[#2e2e36] transition-all duration-300 focus-within:border-[#8b5cf6]/50 focus-within:shadow-[0_0_20px_rgba(139,92,246,0.15)]'>
        <div className="flex items-start gap-2 sm:gap-3">
          <Textarea
            value={text}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
            onChange={(e) => setText(e.target.value)}
            onSubmit={handleSubmit}
            placeholder="Ask anything..."
            className="min-h-[72px] 
    min-w-0 
    flex-1 
    resize-none
    border-0
    shadow-none
    focus-visible:ring-0
    bg-transparent
    text-[#f3f4f6]
    placeholder:text-[#9ca3af]/50
    text-sm sm:text-base"
          />

          <Button
            type="button"
            variant="outline"
            className="
    flex items-center justify-center gap-1
    flex-shrink-0
    w-17 sm:w-26
    h-8 sm:h-9
    rounded-full
    bg-[#24242b]
    border-[#2e2e36]
    px-2
    text-[10px] sm:text-xs
    font-medium
    text-[#9ca3af]
    shadow-none
    hover:bg-[#2e2e36]
    hover:text-[#f3f4f6]
    transition-colors duration-200
  "
          >
            <span>GPT-5.2</span>
            <ChevronDown className="h-3 w-3" />
          </Button>

        </div>

        <div className="mt-3 flex items-center justify-between text-xs text-[#9ca3af] sm:text-[13px]">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="px-0 text-xs text-[#9ca3af] hover:bg-transparent hover:text-[#f3f4f6] transition-colors duration-200"
          >
            <Paperclip className="mr-1.5 h-3.5 w-3.5" />
            Attach file
          </Button>

          <Button
            type="submit"
            size="icon"
            className="h-9 w-9 rounded-full bg-[#8b5cf6] text-white shadow-md shadow-purple-500/25 hover:bg-[#7c3aed] transition-all duration-200 sm:h-10 sm:w-10"
          >
            <SendHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </form>
  )
}

export default ChatInput
