import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@/context/AuthContext"
import { deleteMyAccount, deleteAllUsers } from "../services/settingsService"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Trash2, AlertTriangle, Users } from "lucide-react"

/**
 * ⚠️ SECURITY NOTE:
 *
 * The role checks below are UI-level only — they control what buttons
 * are rendered, NOT what actions a user is authorized to perform.
 *
 * True authorization must be enforced server-side via:
 *   - Supabase Row Level Security (RLS) policies
 *   - Supabase Edge Functions for sensitive operations
 *
 * Never rely on client-side role checks for security.
 */

export default function DangerZone() {
    const { user, setUser } = useAuth()
    const navigate = useNavigate()
    const [isDeleting, setIsDeleting] = useState(false)
    const [isDeletingAll, setIsDeletingAll] = useState(false)

    const isAdmin = user?.role === "admin"

    /** Delete the current user's account, sign out, and redirect */
    async function handleDeleteMyAccount() {
        if (!user) return

        setIsDeleting(true)

        try {
            const result = await deleteMyAccount(user.id)

            if (result.success) {
                setUser(null)
                navigate("/login", { replace: true })
            } else {
                console.error("Delete account failed:", result.error)
            }
        } finally {
            setIsDeleting(false)
        }
    }

    /** Delete all non-admin users (admin only) */
    async function handleDeleteAllUsers() {
        if (!user || !isAdmin) return

        setIsDeletingAll(true)

        try {
            const result = await deleteAllUsers()

            if (!result.success) {
                console.error("Delete all users failed:", result.error)
            }
        } finally {
            setIsDeletingAll(false)
        }
    }

    return (
        <Card className="border-red-500/20 bg-red-500/5">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-400">
                    <AlertTriangle className="h-5 w-5" />
                    Danger Zone
                </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
                {/* ── Delete My Account ── */}
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between rounded-lg border border-red-500/20 p-4">
                    <div>
                        <p className="text-sm font-medium text-[#f3f4f6]">
                            Delete My Account
                        </p>
                        <p className="text-xs text-[#9ca3af]">
                            Permanently delete your account and all associated data. This
                            action cannot be undone.
                        </p>
                    </div>

                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button
                                variant="destructive"
                                size="sm"
                                disabled={isDeleting}
                                className="shrink-0"
                            >
                                <Trash2 className="mr-2 h-4 w-4" />
                                {isDeleting ? "Deleting..." : "Delete Account"}
                            </Button>
                        </AlertDialogTrigger>

                        <AlertDialogContent className="border-[#2a2a32] bg-[#1a1a22]">
                            <AlertDialogHeader>
                                <AlertDialogTitle className="text-[#f3f4f6]">
                                    Are you absolutely sure?
                                </AlertDialogTitle>
                                <AlertDialogDescription className="text-[#9ca3af]">
                                    This will permanently delete your account and remove all your
                                    data. This action cannot be reversed.
                                </AlertDialogDescription>
                            </AlertDialogHeader>

                            <AlertDialogFooter>
                                <AlertDialogCancel className="border-[#2a2a32] bg-transparent text-[#9ca3af] hover:bg-[#2a2a32] hover:text-[#f3f4f6]">
                                    Cancel
                                </AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={handleDeleteMyAccount}
                                    className="bg-red-600 text-white hover:bg-red-700"
                                >
                                    Yes, delete my account
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>

                {/* ── Delete All Users (admin only) ── */}
                {isAdmin && (
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between rounded-lg border border-red-500/20 p-4">
                        <div>
                            <p className="text-sm font-medium text-[#f3f4f6]">
                                Delete All Users
                            </p>
                            <p className="text-xs text-[#9ca3af]">
                                Remove all non-admin user accounts and their data. This action
                                cannot be undone.
                            </p>
                        </div>

                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    disabled={isDeletingAll}
                                    className="shrink-0"
                                >
                                    <Users className="mr-2 h-4 w-4" />
                                    {isDeletingAll ? "Deleting..." : "Delete All Users"}
                                </Button>
                            </AlertDialogTrigger>

                            <AlertDialogContent className="border-[#2a2a32] bg-[#1a1a22]">
                                <AlertDialogHeader>
                                    <AlertDialogTitle className="text-[#f3f4f6]">
                                        Delete all user accounts?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription className="text-[#9ca3af]">
                                        This will permanently delete every non-admin user account and
                                        all associated data. This action cannot be reversed.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>

                                <AlertDialogFooter>
                                    <AlertDialogCancel className="border-[#2a2a32] bg-transparent text-[#9ca3af] hover:bg-[#2a2a32] hover:text-[#f3f4f6]">
                                        Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                        onClick={handleDeleteAllUsers}
                                        className="bg-red-600 text-white hover:bg-red-700"
                                    >
                                        Yes, delete all users
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
