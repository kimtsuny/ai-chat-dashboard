import React from "react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Orbit } from "lucide-react"

type ChatCard = {
  title: string
  description: string
}

const cards: ChatCard[] = [
  {
    title: "Where to next?",
    description: "Ask for ideas, trip plans, or hidden gems to explore.",
  },
  {
    title: "Flight updates",
    description: "Check delays, gates, baggage rules, or airline policies.",
  },
  {
    title: "Ask about your trip",
    description: "Change bookings, compare options, or get travel help.",
  },
]

const ChatCards = () => {
  return (
    <section
      aria-label="Suggestions"
      className="mt-10 flex w-full flex-col items-center px-3 md:pb-2 "
    >
      <div className="grid w-full max-w-3xl grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
        {cards.map((card, index) => (
          <Card
            key={card.title}
            className={`group cursor-pointer rounded-2xl border border-[#2e2e36] bg-[#1e1e24] transition-all duration-300
            hover:scale-[1.02] hover:border-[#8b5cf6]/40 hover:shadow-lg hover:shadow-purple-500/10
            ${index === 2 ? "hidden md:flex" : "flex"}`}
          >
            <CardHeader className="flex flex-col items-start gap-3 p-3 md:p-4">
              
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-[#8b5cf6] to-purple-500 shadow-md shadow-purple-500/20 md:h-10 md:w-10">
                <Orbit className="h-3.5 w-3.5 text-white md:h-4 md:w-4" />
              </div>

              <div className="space-y-1.5">
                <CardTitle className="text-sm text-[#f3f4f6] md:text-base">
                  {card.title}
                </CardTitle>

                <CardDescription className="hidden pt-1 text-[13px] leading-relaxed text-[#9ca3af] sm:block">
                  {card.description}
                </CardDescription>
              </div>

            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  )
}

export default ChatCards