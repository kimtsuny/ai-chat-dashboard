import { Card } from "@/components/ui/card"
import { MessageSquare, LogIn, Users, Clock } from "lucide-react"

const stats = [
    {
        label: "Messages Sent",
        value: "42",
        icon: MessageSquare,
        color: "from-[#8b5cf6] to-purple-400",
        iconBg: "bg-[#8b5cf6]/15",
        iconColor: "text-[#8b5cf6]",
    },
    {
        label: "Login Count",
        value: "18",
        icon: LogIn,
        color: "from-emerald-500 to-emerald-400",
        iconBg: "bg-emerald-500/15",
        iconColor: "text-emerald-400",
    },
    {
        label: "Chats Joined",
        value: "5",
        icon: Users,
        color: "from-sky-500 to-sky-400",
        iconBg: "bg-sky-500/15",
        iconColor: "text-sky-400",
    },
    {
        label: "Last Active",
        value: "2h ago",
        icon: Clock,
        color: "from-amber-500 to-amber-400",
        iconBg: "bg-amber-500/15",
        iconColor: "text-amber-400",
    },
]

export default function StatsCards() {
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => {
                const Icon = stat.icon
                return (
                    <Card
                        key={stat.label}
                        className="group relative overflow-hidden border-[#2e2e36]/60 bg-[#1e1e24] p-5 transition-all duration-300 hover:border-[#8b5cf6]/30 hover:shadow-lg hover:shadow-[#8b5cf6]/5"
                    >
                        {/* Subtle top accent stripe */}
                        <div
                            className={`absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r ${stat.color} opacity-60 transition-opacity group-hover:opacity-100`}
                        />

                        <div className="flex items-center gap-4">
                            <div
                                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${stat.iconBg}`}
                            >
                                <Icon className={`h-5 w-5 ${stat.iconColor}`} />
                            </div>

                            <div className="min-w-0">
                                <p className="text-2xl font-bold text-[#f3f4f6]">{stat.value}</p>
                                <p className="truncate text-xs text-[#9ca3af]">{stat.label}</p>
                            </div>
                        </div>
                    </Card>
                )
            })}
        </div>
    )
}
