import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    AreaChart,
    Area,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts"

const messagesData = [
    { day: "Mon", messages: 12 },
    { day: "Tue", messages: 8 },
    { day: "Wed", messages: 15 },
    { day: "Thu", messages: 6 },
    { day: "Fri", messages: 20 },
    { day: "Sat", messages: 10 },
    { day: "Sun", messages: 5 },
]

const loginsData = [
    { week: "Week 1", logins: 5 },
    { week: "Week 2", logins: 3 },
    { week: "Week 3", logins: 7 },
    { week: "Week 4", logins: 4 },
]

const chartTooltipStyle = {
    backgroundColor: "#1e1e24",
    border: "1px solid #2e2e36",
    borderRadius: "8px",
    color: "#f3f4f6",
    fontSize: "12px",
}

export default function ActivityCharts() {
    return (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {/* Messages Activity */}
            <Card className="border-[#2e2e36]/60 bg-[#1e1e24]">
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-[#9ca3af]">
                        Messages Activity
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-[240px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={messagesData}>
                                <defs>
                                    <linearGradient id="msgFill" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.3} />
                                        <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    stroke="#2e2e36"
                                    vertical={false}
                                />
                                <XAxis
                                    dataKey="day"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: "#9ca3af", fontSize: 12 }}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: "#9ca3af", fontSize: 12 }}
                                    width={30}
                                />
                                <Tooltip contentStyle={chartTooltipStyle} />
                                <Area
                                    type="monotone"
                                    dataKey="messages"
                                    stroke="#8b5cf6"
                                    strokeWidth={2}
                                    fill="url(#msgFill)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

            {/* Login Activity */}
            <Card className="border-[#2e2e36]/60 bg-[#1e1e24]">
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-[#9ca3af]">
                        Login Activity
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-[240px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={loginsData}>
                                <defs>
                                    <linearGradient id="loginFill" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.8} />
                                        <stop offset="100%" stopColor="#6d28d9" stopOpacity={0.6} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    stroke="#2e2e36"
                                    vertical={false}
                                />
                                <XAxis
                                    dataKey="week"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: "#9ca3af", fontSize: 12 }}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: "#9ca3af", fontSize: 12 }}
                                    width={30}
                                />
                                <Tooltip contentStyle={chartTooltipStyle} />
                                <Bar
                                    dataKey="logins"
                                    fill="url(#loginFill)"
                                    radius={[6, 6, 0, 0]}
                                    maxBarSize={40}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
