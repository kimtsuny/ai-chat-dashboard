import { Separator } from "@/components/ui/separator";

interface StatItemProps {
    value: number | string;
    label: string;
}

function StatItem({ value, label }: StatItemProps) {
    return (
        <div className="flex flex-col items-center gap-1 px-6 py-2">
            <span className="text-xl font-bold text-[#f3f4f6]">{value}</span>
            <span className="text-xs text-[#9ca3af] uppercase tracking-wider">
                {label}
            </span>
        </div>
    );
}

interface ProfileStatsProps {
    messages?: number;
    conversations?: number;
}

export function ProfileStats({
    messages = 1284,
    conversations = 47,
}: ProfileStatsProps) {
    return (
        <div className="flex items-center justify-center py-4">
            <StatItem value={messages.toLocaleString()} label="Messages" />
            <Separator
                orientation="vertical"
                className="h-10 bg-[#2e2e36]"
            />
            <StatItem value={conversations} label="Conversations" />
        </div>
    );
}
