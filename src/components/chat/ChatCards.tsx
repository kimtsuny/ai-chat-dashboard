import React from 'react'

import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card"
import { Plus, Zap } from 'lucide-react'

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
            className='mt-8 flex flex-col w-full items-center'>
            <div className='grid grid-cols-3 gap-4 max-w-3xl w-full'>
                {cards.map((card) => (
                    <Card
                        key={card.title}
                        className=" group flex cursor-pointer flex-col justify-between rounded-2xl border-none bg-card shadow-[0_18px_55px_rgba(15,23,42,0.06)] transition-all hover:-translate-y-[2px] hover:shadow-[0_22px_70px_rgba(15,23,42,0.12)]"
                    >
                        <CardHeader className="flex flex-col items-start gap-2 p-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-black/85  shadow-sm">
                                <Zap className="h-4 w-4 text-white" />
                            </div>

                            <div className="space-y-1">
                                <CardTitle>{card.title}</CardTitle>
                                <CardDescription className="hidden pt-3 text-[11px] text-muted-foreground sm:block">
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
