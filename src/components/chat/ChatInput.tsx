import React from 'react'
import type { FormEvent, SetStateAction } from "react"
import { useState } from "react"
import { Paperclip, SendHorizontal, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

const ChatInput = () => {
  return (
   <form className='mx-auto mt-3 md:mt-10 max-w-3xl w-full p-3 md:p-1'>
<div className='rounded-3xl p-3 shadow-[0_18px_60px_rgba(15,23,42,0.10)]'>
<div className="flex items-start gap-2 sm:gap-3">
          <Textarea
            
            placeholder="Ask about shit..."
            className="min-h-[72px] 
    min-w-0 
    flex-1 
    resize-none
    border-0
    shadow-none
    focus-visible:ring-0
    bg-transparent
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
    bg-background/80
    px-2
    text-[10px] sm:text-xs
    font-medium
    text-muted-foreground
    shadow-sm
    hover:bg-background
  "
>
  <span>GPT-5.2</span>
  <ChevronDown className="h-3 w-3" />
</Button>

        </div>

        <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground sm:text-[13px]">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="px-0 text-xs text-muted-foreground hover:bg-transparent hover:text-foreground"
          >
            <Paperclip className="mr-1.5 h-3.5 w-3.5" />
            Attach file
          </Button>

          <Button
            type="submit"
            size="icon"
            className="h-9 w-9 rounded-full bg-foreground text-background shadow-md shadow-foreground/25 sm:h-10 sm:w-10"
          >
            <SendHorizontal className="h-4 w-4" />
          </Button>
        </div>
</div>
   </form>
  )
}

export default ChatInput
