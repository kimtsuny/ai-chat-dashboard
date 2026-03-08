import WelcomeHeader from "../components/WelcomeHeader"
import StatsCards from "../components/StatsCards"
import ActivityCharts from "../components/ActivityCharts"
import { useEffect, useState } from "react"
import { useAuth } from "@/context/AuthContext"
import { getLastActive, getMessagesActivity, getMessagesCount } from "../services/dashboardService"
import { getConversationsCount } from "../services/dashboardService"

export default function Dashboard() {
    
    const { user } = useAuth()
    const [messagesCount, setMessagesCount] = useState(0)
const [conversationsCount, setConversationsCount] = useState(0)
const [lastActive, setLastActive] = useState("")
const [messagesActivity, setMessagesActivity] = useState<any>([])
    useEffect(() => {
        if (!user) return

        getMessagesCount(user.id, user.role).then((count) => {
            setMessagesCount(count)
        })

        getConversationsCount(user.id, user.role).then((count) => {
            setConversationsCount(count)
        })

        getLastActive(user.id).then((lastActive) => {
            setLastActive(lastActive)
        })

        getMessagesActivity(user.id, user.role).then((activity) => {
            setMessagesActivity(activity)
        })
    }, [user])

    const stats = {
  messagesCount: messagesCount,
  conversationsCount: conversationsCount,
  lastActive: lastActive,
}
    return (
        <div className="flex flex-1 flex-col min-h-0 w-full bg-gradient-to-b from-[#121217] via-[#0f0f11] to-[#0f0f11]">
            <div className="flex-1 overflow-y-auto">
                <div className="mx-auto w-full max-w-6xl space-y-6 p-4 md:p-6 lg:p-8">
                    <WelcomeHeader />
                    <StatsCards stats={stats} />
                    <ActivityCharts messagesActivity={messagesActivity}/>
                </div>
            </div>
        </div>
    )
}
