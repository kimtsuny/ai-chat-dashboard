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

  // 🔥 handler موحد لكل الحالات
  const handleAuthChange = useCallback(async (supabaseUser: any) => {

    if (!supabaseUser) {
      console.log("[Auth] No user")
      setUser(null)
      setLoading(false)
      setInitialized(true)
      return
    }

    // ✅ 1. حط user مباشرة (بدون انتظار)
    const basicUser = {
      id: supabaseUser.id,
      email: supabaseUser.email ?? "",
      role: "user",
      avatar_url: null,
      cover_url: null,
      created_at: null,
    }

    setUser(basicUser)
    setLoading(false)
    setInitialized(true)

    console.log("[Auth] User set immediately:", supabaseUser.email)

    // ✅ 2. تحميل profile بالخلفية (اختياري)
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("role, avatar_url, cover_url, created_at")
        .eq("id", supabaseUser.id)
        .maybeSingle()

      if (error) {
        console.error("[Auth] Profile error:", error)
        return
      }

      if (data) {
        setUser({
          id: supabaseUser.id,
          email: supabaseUser.email ?? "",
          role: data.role ?? "user",
          avatar_url: data.avatar_url ?? null,
          cover_url: data.cover_url ?? null,
          created_at: data.created_at ?? null,
        })

        console.log("[Auth] Profile enriched")
      }

    } catch (err) {
      console.error("[Auth] Profile fetch failed:", err)
    }

  }, [])

  useEffect(() => {
    let isMounted = true

    // 🔥 1. أهم خطوة: جلب session فورًا بعد refresh
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      console.log("[Auth] getSession:", session?.user?.email ?? "no session")

      if (!isMounted) return

      await handleAuthChange(session?.user ?? null)
    })

    // 🔥 2. listener للتغييرات (login / logout)
    const { data: { subscription } } =
      supabase.auth.onAuthStateChange(async (event, session) => {
        console.log("[Auth] onAuthStateChange:", event)

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