import { Card } from "@/components/ui/card"
import { MessageSquare, Users, Clock } from "lucide-react"

export default function StatsCards({ stats }: { stats: any }) {

    const statsData = [
        {
            label: "Messages Sent",
            value: stats.messagesCount,
            icon: MessageSquare,
            color: "from-[#8b5cf6] to-purple-400",
            iconBg: "bg-[#8b5cf6]/15",
            iconColor: "text-[#8b5cf6]",
        },
        {
            label: "Chats Joined",
            value: stats.conversationsCount,
            icon: Users,
            color: "from-sky-500 to-sky-400",
            iconBg: "bg-sky-500/15",
            iconColor: "text-sky-400",
        },
        {
            label: "Last Active",
            value: stats.lastActive,
            icon: Clock,
            color: "from-amber-500 to-amber-400",
            iconBg: "bg-amber-500/15",
            iconColor: "text-amber-400",
        },
    ]
    

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {statsData.map((stat) => {
                const Icon = stat.icon
                return (
                    <Card
                        key={stat.label}
                        className="group relative overflow-hidden border-[#2e2e36]/60 bg-[#1e1e24] p-5 transition-all duration-300 hover:border-[#8b5cf6]/30 hover:shadow-lg hover:shadow-[#8b5cf6]/5"
                    >
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