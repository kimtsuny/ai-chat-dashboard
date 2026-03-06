import WelcomeHeader from "../components/WelcomeHeader"
import StatsCards from "../components/StatsCards"
import ActivityCharts from "../components/ActivityCharts"

export default function Dashboard() {
    return (
        <div className="flex flex-1 flex-col min-h-0 w-full bg-gradient-to-b from-[#121217] via-[#0f0f11] to-[#0f0f11]">
            <div className="flex-1 overflow-y-auto">
                <div className="mx-auto w-full max-w-6xl space-y-6 p-4 md:p-6 lg:p-8">
                    <WelcomeHeader />
                    <StatsCards />
                    <ActivityCharts />
                </div>
            </div>
        </div>
    )
}
