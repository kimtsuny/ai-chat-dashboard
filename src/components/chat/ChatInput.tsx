import type { FormEvent, SetStateAction } from "react"
import { useState } from "react"
import { Paperclip, SendHorizontal, ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

interface ChatInputProps {
  onSend?: (message: string) => void
}

export function ChatInput({ onSend }: ChatInputProps) {
  const [message, setMessage] = useState("")

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    const trimmedMessage = message.trim()
    if (!trimmedMessage) {
      return
    }

    onSend?.(trimmedMessage)
    setMessage("")
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-10 w-full max-w-3xl px-3 pb-8 sm:px-4 md:px-0"
    >
      <div className="rounded-3xl bg-muted/60 p-3 shadow-[0_18px_60px_rgba(15,23,42,0.10)] sm:p-4">
        <div className="flex items-start gap-2 sm:gap-3">
          <Textarea
            value={message}
            onChange={(event: { target: { value: SetStateAction<string> } }) => setMessage(event.target.value)}
            placeholder="Ask about flights..."
            className="min-h-[72px] min-w-0 flex-1 resize-y bg-background/60 text-sm sm:text-base"
          />

          <Button
            type="button"
            variant="outline"
            className="flex-shrink-0 w-32 whitespace-nowrap rounded-full bg-background/80 px-3 py-2 text-[11px] font-medium text-muted-foreground shadow-sm hover:bg-background sm:w-36 sm:px-4 sm:text-xs"
          >
            <span className="mr-1">Select source</span>
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
