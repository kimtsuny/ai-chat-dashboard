import React from 'react'

import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card"

import { Orbit } from 'lucide-react';

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
            className='mt-8 flex flex-col w-full items-center p-3 md:p-2'>
            <div className='grid grid-cols-3 gap-4 md:gap-6 max-w-3xl w-full '>
                {cards.map((card) => (
                    <Card
                        key={card.title}
                        className="group flex cursor-pointer flex-col justify-between rounded-2xl border border-[#2e2e36] bg-[#1e1e24] shadow-none transition-all duration-300 hover:scale-[1.02] hover:border-[#8b5cf6]/40 hover:shadow-lg hover:shadow-purple-500/10"
                    >

                        <CardHeader className="flex flex-col items-start gap-2 p-3 md:p-4 ">
                            <div className="flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#8b5cf6] to-purple-500 shadow-md shadow-purple-500/20">
                                <Orbit className="h-3.5 w-3.5 md:h-4 md:w-4 text-white" />
                            </div>

                            <div className="space-y-1.5">
                                <CardTitle className='text-sm md:text-base text-[#f3f4f6]'>{card.title}</CardTitle>
                                <CardDescription className="hidden pt-2 text-[13px] text-[#9ca3af] leading-relaxed sm:block">
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
