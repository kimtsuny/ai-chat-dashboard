import { CircleFadingPlus } from 'lucide-react';
import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/AuthContext"
import { supabase } from '@/lib/supabase';
import { useChat } from "@/context/ChatContext"

export function NewChatButton() {
  const { user } = useAuth()


  const { fetchConversations, setCurrentConversationId } = useChat()

  return (
    <Button
      className="w-full flex justify-center items-center gap-2 rounded-full bg-gradient-to-r from-[#8b5cf6] to-purple-500 text-white font-semibold hover:from-[#7c3aed] hover:to-purple-600 border-none shadow-lg shadow-purple-500/20 h-10 transition-all duration-200"
      onClick={async () => {
        if (!user) return

        const { data, error } = await supabase
          .from("conversations")
          .insert([
            {
              user_id: user.id,
              title: "New Chat",
            },
          ])
          .select()

        if (!error && data) {
          const newConversation = data[0]


          setCurrentConversationId(newConversation.id)

          await fetchConversations()
        }

        console.log(data, error)
      }}
    >
      <CircleFadingPlus className="h-4 w-4" />
      New chat
    </Button>
  )
}