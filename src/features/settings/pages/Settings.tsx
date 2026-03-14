import { Settings as SettingsIcon } from "lucide-react"
import AccountSettings from "../components/AccountSettings"
import DangerZone from "../components/DangerZone"

export default function Settings() {
    return (
        <div className="flex flex-1 flex-col min-h-0 w-full bg-gradient-to-b from-[#121217] via-[#0f0f11] to-[#0f0f11]">
            <div className="flex-1 overflow-y-auto">
                <div className="mx-auto w-full max-w-3xl space-y-6 p-4 md:p-6 lg:p-8">
                    {/* Page header */}
                    <div className="flex items-center gap-3">
                        <SettingsIcon className="h-6 w-6 text-indigo-400" />
                        <h1 className="text-2xl font-semibold text-[#f3f4f6]">Settings</h1>
                    </div>

                    {/* Sections */}
                    <AccountSettings />
                    <DangerZone />
                </div>
            </div>
        </div>
    )
}
