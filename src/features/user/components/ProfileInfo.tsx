import { useAuth } from "@/context/AuthContext";
import { User, Mail, Calendar, Shield } from "lucide-react";

interface ProfileInfoProps {
    username?: string;
    email?: string;
    memberSince?: string;
    role?: string;
}

interface InfoRowProps {
    icon: React.ReactNode;
    label: string;
    value: string;
}

function InfoRow({ icon, label, value }: InfoRowProps) {
    return (
        <div className="flex items-center gap-3 rounded-lg bg-[#16161b] px-4 py-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#24242b] text-[#9ca3af]">
                {icon}
            </div>
            <div className="flex flex-col min-w-0">
                <span className="text-xs text-[#9ca3af]">{label}</span>
                <span className="text-sm font-medium text-[#f3f4f6] truncate">
                    {value}
                </span>
            </div>
        </div>
    );
}

export function ProfileInfo({
    memberSince,
    role,
}: ProfileInfoProps) {

    return (
        <div className="space-y-2 px-1">
            <h3 className="px-3 text-xs font-semibold uppercase tracking-wider text-[#9ca3af]">
                Account Info
            </h3>
            <div className="grid gap-2">
               
                <InfoRow
                    icon={<Calendar className="h-4 w-4" />}
                    label="Member Since"
                    value={memberSince}
                />
                <InfoRow
                    icon={<Shield className="h-4 w-4" />}
                    label="Role"
                    value={role}
                />
            </div>
        </div>
    );
}
