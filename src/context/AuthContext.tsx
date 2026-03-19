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

  const fetchUserProfile = useCallback(async (supabaseUser: { id: string; email?: string }) => {
    try {
      const { data } = await supabase
        .from("profiles")
        .select("role, avatar_url, cover_url, created_at")
        .eq("id", supabaseUser.id)
        .maybeSingle()

      setUser({
        id: supabaseUser.id,
        email: supabaseUser.email!,
        role: data?.role ?? "user",
        avatar_url: data?.avatar_url ?? null,
        cover_url: data?.cover_url ?? null,
        created_at: data?.created_at ?? null,
      })
    } catch (err) {
      console.error("Profile fetch error:", err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    let isMounted = true

    // 1️⃣ Force fresh session from Supabase on every mount/refresh
    const initSession = async () => {
      try {
        const { data: { user: supabaseUser } } = await supabase.auth.getUser()

        if (!isMounted) return

        if (supabaseUser) {
          await fetchUserProfile(supabaseUser)
        } else {
          setUser(null)
          setLoading(false)
        }
      } catch (err) {
        console.error("Session init error:", err)
        if (isMounted) {
          setUser(null)
          setLoading(false)
        }
      } finally {
        if (isMounted) {
          setInitialized(true)
        }
      }
    }

    initSession()

    // 2️⃣ Listen for future auth changes (login, logout, token refresh)
    const { data: { subscription } } =
      supabase.auth.onAuthStateChange(async (event, session) => {
        if (!isMounted) return

        // Skip INITIAL_SESSION — we already handle it above with getUser()
        if (event === "INITIAL_SESSION") return

        if (session?.user) {
          await fetchUserProfile(session.user)
        } else {
          setUser(null)
          setLoading(false)
        }
      })

    return () => {
      isMounted = false
      subscription.unsubscribe()
    }
  }, [fetchUserProfile])

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