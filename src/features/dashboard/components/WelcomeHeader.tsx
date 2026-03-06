import { Card } from "@/components/ui/card"
import { useAuth } from "@/context/AuthContext"
import { Sparkles } from "lucide-react"

export default function WelcomeHeader() {
    const { user } = useAuth()
    const username = user?.email?.split("@")[0] ?? "Guest"

    return (
        <Card className="relative overflow-hidden border-[#2e2e36]/60 bg-gradient-to-br from-[#1e1e24] via-[#1a1a22] to-[#24242b] p-6 md:p-8">
            {/* Decorative glow */}
            <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#8b5cf6]/10 blur-3xl" />
            <div className="pointer-events-none absolute -right-8 bottom-0 h-32 w-32 rounded-full bg-purple-500/5 blur-2xl" />

            <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                {/* Text */}
                <div className="space-y-2">
                    <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                        <span className="text-[#f3f4f6]">Hi, </span>
                        <span className="bg-gradient-to-r from-[#8b5cf6] to-purple-400 bg-clip-text text-transparent">
                            {username}
                        </span>
                    </h1>
                    <p className="text-sm text-[#9ca3af] md:text-base">
                        Ready to start your day? Here's your overview.
                    </p>
                </div>

                {/* Illustration placeholder */}
                <div className="hidden md:flex items-center justify-center rounded-2xl bg-[#8b5cf6]/10 p-4">
                    <Sparkles className="h-10 w-10 text-[#8b5cf6] animate-pulse" />
                </div>
            </div>
        </Card>
    )
}
