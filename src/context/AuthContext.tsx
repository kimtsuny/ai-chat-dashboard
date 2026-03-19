import { supabase } from "@/lib/supabase"
import {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
  useCallback
} from "react"

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

  // 🔥 handler موحد
  const handleAuthChange = useCallback(async (supabaseUser: any) => {

    if (!supabaseUser) {
      setUser(null)
      setLoading(false)
      setInitialized(true)
      return
    }

    // ✅ 1. set user مباشرة
    setUser({
      id: supabaseUser.id,
      email: supabaseUser.email ?? "",
      role: "user",
      avatar_url: null,
      cover_url: null,
      created_at: null,
    })

    setLoading(false)
    setInitialized(true)

    // ✅ 2. جلب profile خارج callback (آمن)
    try {
      const { data } = await supabase
        .from("profiles")
        .select("role, avatar_url, cover_url, created_at")
        .eq("id", supabaseUser.id)
        .maybeSingle()

      if (data) {
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
      console.error("Profile error:", err)
    }

  }, [])

  useEffect(() => {
    let isMounted = true

    // 🔥 1. أهم خطوة: getSession بالبداية
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("[Auth] getSession:", session?.user?.email ?? "no user")

      if (!isMounted) return

      handleAuthChange(session?.user ?? null)
    })

    // 🔥 2. listener بدون async (مهم جدًا)
    const { data: { subscription } } =
      supabase.auth.onAuthStateChange((event, session) => {
        console.log("[Auth] onAuthStateChange:", event)

        if (!isMounted) return

        // ❗ مهم: نخليها خارج callback
        setTimeout(() => {
          handleAuthChange(session?.user ?? null)
        }, 0)
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