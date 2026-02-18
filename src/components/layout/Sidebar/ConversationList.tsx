import { MessageSquare } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Conversation {
  id: string
  title: string
  date: string
}

const mockConversations: Conversation[] = [
  { id: "1", title: "React component architecture", date: "Today" },
  { id: "2", title: "Tailwind layout debugging", date: "Today" },
  { id: "3", title: "TypeScript generics guide", date: "Yesterday" },
  { id: "4", title: "Supabase auth setup", date: "Yesterday" },
  { id: "5", title: "Vite config optimization", date: "3 days ago" },
  { id: "6", title: "API route best practices", date: "1 week ago" },
  { id: "7", title: "Database schema design", date: "1 week ago" },
  { id: "8", title: "Deployment strategies", date: "2 weeks ago" },
]

export function ConversationList() {
  return (
    <div className="flex flex-1 flex-col min-h-0">
      <p className="px-3 pb-2 text-xs font-medium text-muted-foreground">
        Recent conversations
      </p>
      <ScrollArea className="flex-1">
        <div className="flex flex-col gap-0.5">
          {mockConversations.map((conv) => (
            <button
              key={conv.id}
              className="flex items-start gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-accent"
            >
              <MessageSquare className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium leading-snug">{conv.title}</p>
                <p className="text-xs text-muted-foreground">{conv.date}</p>
              </div>
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
