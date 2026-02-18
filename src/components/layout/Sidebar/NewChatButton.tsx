import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

export function NewChatButton() {
  return (
    <Button variant="outline" className="w-full justify-start gap-2">
      <Plus className="h-4 w-4" />
      New Chat
    </Button>
  )
}
