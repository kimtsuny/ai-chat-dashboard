import { supabase } from "@/lib/supabase"
import { createContext, useState, ReactNode, useContext, useEffect } from "react"

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
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {

  const [user, setUserState] = useState<User>(null)
  const [loading, setLoading] = useState(true)

  const setUser = (user: User) => {
    setUserState(user)

    if (user) {
      localStorage.setItem("user", JSON.stringify(user))
    } else {
      localStorage.removeItem("user")
    }
  }

  const fetchUserProfile = async (user: any) => {

    try {

      const { data } = await supabase
        .from("profiles")
        .select("role, avatar_url, cover_url, created_at")
        .eq("id", user.id)
        .maybeSingle()

      setUser({
        id: user.id,
        email: user.email!,
        role: data?.role ?? "user",
        avatar_url: data?.avatar_url ?? null,
        cover_url: data?.cover_url ?? null,
        created_at: data?.created_at ?? null
      })

    } catch (err) {
      console.error("Profile fetch error:", err)
    } finally {
      setLoading(false)
    }

  }

  useEffect(() => {

    const initSession = async () => {

      try {

        const { data: { user } } = await supabase.auth.getUser()

        if (user) {
          await fetchUserProfile(user)
        } else {
          setUser(null)
          setLoading(false)
        }

      } catch (err) {
        console.error("Session error:", err)
        setLoading(false)
      }

    }

    initSession()

    const { data: { subscription } } =
      supabase.auth.onAuthStateChange(async (_event, session) => {

        if (session?.user) {
          await fetchUserProfile(session.user)
        } else {
          setUser(null)
          setLoading(false)
        }

      })

    return () => {
      subscription.unsubscribe()
    }

  }, [])

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
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