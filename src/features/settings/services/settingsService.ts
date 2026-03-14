import { supabase } from "@/lib/supabase"
import type { ServiceResult } from "../types/settings.types"

/**
 * ⚠️ SECURITY NOTE:
 *
 * The role-based checks in the UI (e.g. showing/hiding buttons for admins)
 * are for UX purposes ONLY — they do NOT provide real security.
 *
 * A malicious user could still call these functions directly.
 *
 * Real protection MUST be implemented server-side using:
 *   1. Supabase Row Level Security (RLS) policies on all affected tables
 *   2. Supabase Edge Functions for sensitive operations (like deleting auth users)
 *
 * Never trust the client alone for authorization.
 */

/**
 * Delete the current user's account.
 *
 * This deletes the user's row from the `profiles` table.
 *
 * ⚠️ Important: We do NOT call `supabase.auth.admin.deleteUser()` here
 * because that requires the service_role key, which must NEVER be exposed
 * on the client side.
 *
 * To fully remove the user from auth.users, use one of these approaches:
 *   - Option A (recommended): Create a Supabase Edge Function that uses
 *     the service_role key to call `auth.admin.deleteUser(userId)`.
 *     Then call that function from here via `supabase.functions.invoke()`.
 *   - Option B (temporary): Only delete from the profiles table (current
 *     implementation). The orphaned auth user will remain but won't be able
 *     to access data if RLS policies are correctly set.
 */
export async function deleteMyAccount(userId: string): Promise<ServiceResult> {
    try {

        const { data, error } = await supabase.functions.invoke("delete-user", {
            body: { userId }
        })

        if (error) {
            console.error("Delete user failed:", error)
            return { success: false, error: error.message }
        }

        await supabase.auth.signOut()

        return { success: true }

    } catch (err) {
        console.error("Unexpected error deleting account:", err)
        return {
            success: false,
            error: err instanceof Error ? err.message : "Unexpected error"
        }
    }
}

/**
 * Delete all non-admin users (admin-only operation).
 *
 * This deletes all rows from the `profiles` table where role != 'admin'.
 *
 * ⚠️ This only removes profiles — the corresponding auth.users entries
 * remain. For full cleanup, use a Supabase Edge Function (see note above).
 *
 * ⚠️ SECURITY: This function MUST be protected by:
 *   - RLS policies that restrict DELETE on `profiles` to admin users only
 *   - Ideally, an Edge Function that verifies the caller's role server-side
 */
export async function deleteAllUsers(userId: string): Promise<ServiceResult> {

  const { error } = await supabase.functions.invoke("delete-user", {
    body: {
      deleteAll: true,
      userId: userId
    }
  })

  if (error) {
    return { success: false, error: error.message }
  }

  return { success: true }
}