import { supabase } from "@/lib/supabase"
import { createContext, useState, ReactNode, useContext, useEffect, useCallback } from "react"

type User = {
  id: string
  email: string
  role: string
  avatar_url: string | null
  cover_url: string | null
  created_at: string | null
} | null

type AuthContextType = {
  user: User
  setUser: (user: User) => void
  loading: boolean
  initialized: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {

  const [user, setUser] = useState<User>(null)
  const [loading, setLoading] = useState(true)
  const [initialized, setInitialized] = useState(false)

  const handleAuthChange = useCallback(async (supabaseUser: { id: string; email?: string } | null) => {
    if (!supabaseUser) {
      console.log("[Auth] No user, clearing state")
      setUser(null)
      setLoading(false)
      setInitialized(true)
      return
    }

    // Step 1: Set user IMMEDIATELY from session data (no network required)
    // This ensures ChatContext can start fetching conversations right away
    const basicUser = {
      id: supabaseUser.id,
      email: supabaseUser.email ?? "",
      role: "user",
      avatar_url: null as string | null,
      cover_url: null as string | null,
      created_at: null as string | null,
    }

    setUser(basicUser)
    setLoading(false)
    setInitialized(true)

    console.log("[Auth] User set immediately:", supabaseUser.email)

    // Step 2: Enrich with profile data in background (non-blocking)
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("role, avatar_url, cover_url, created_at")
        .eq("id", supabaseUser.id)
        .maybeSingle()

      if (error) {
        console.error("[Auth] Profile query error:", error)
        return
      }

      if (data) {
        console.log("[Auth] Profile enriched, role:", data.role)
        setUser({
          id: supabaseUser.id,
          email: supabaseUser.email ?? "",
          role: data.role ?? "user",
          avatar_url: data.avatar_url ?? null,
          cover_url: data.cover_url ?? null,
          created_at: data.created_at ?? null,
        })
      }
    } catch (err) {
      console.error("[Auth] Profile fetch failed:", err)
      // User is already set from step 1, so app still works
    }
  }, [])

  useEffect(() => {
    let isMounted = true

    const { data: { subscription } } =
      supabase.auth.onAuthStateChange(async (event, session) => {
        console.log("[Auth] onAuthStateChange:", event, session?.user?.email ?? "no user")

        if (!isMounted) return

        await handleAuthChange(session?.user ?? null)
      })

    return () => {
      isMounted = false
      subscription.unsubscribe()
    }
  }, [handleAuthChange])

  return (
    <AuthContext.Provider value={{ user, setUser, loading, initialized }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider")
  }

  return context
}