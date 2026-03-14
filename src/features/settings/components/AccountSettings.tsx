import { useAuth } from "@/context/AuthContext"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Mail, Shield, CalendarDays } from "lucide-react"

export default function AccountSettings() {
    const { user } = useAuth()

    const details = [
        {
            icon: Mail,
            label: "Email",
            value: user?.email ?? "—",
        },
        {
            icon: Shield,
            label: "Role",
            value: user?.role ?? "—",
        },
        {
            icon: CalendarDays,
            label: "Member since",
            value: user?.created_at
                ? new Date(user.created_at).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                })
                : "—",
        },
    ]

    return (
        <Card className="border-[#2a2a32] bg-[#1a1a22]/60">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#f3f4f6]">
                    <User className="h-5 w-5 text-indigo-400" />
                    Account
                </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
                {details.map(({ icon: Icon, label, value }) => (
                    <div
                        key={label}
                        className="flex items-center gap-3 rounded-lg border border-[#2a2a32] p-3"
                    >
                        <Icon className="h-4 w-4 text-[#9ca3af]" />
                        <div>
                            <p className="text-xs text-[#9ca3af]">{label}</p>
                            <p className="text-sm font-medium capitalize text-[#f3f4f6]">
                                {value}
                            </p>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}
