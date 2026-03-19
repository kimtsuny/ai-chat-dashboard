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
  initialized: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {

  const [user, setUserState] = useState<User>(null)
  const [loading, setLoading] = useState(true)
const [initialized, setInitialized] = useState(false)
  const setUser = (user: User) => {

    setUserState(user)

    if (user) {
      localStorage.setItem("user", JSON.stringify(user))
    } else {
      localStorage.removeItem("user")
    }

  }

  const fetchUserProfile = async (supabaseUser: any) => {

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
        created_at: data?.created_at ?? null
      })

    } catch (err) {

      console.error("Profile fetch error:", err)

    } finally {

      setLoading(false)

    }

  }

useEffect(() => {

  //  الاستماع (المصدر الرئيسي)
  const { data: { subscription } } =
    supabase.auth.onAuthStateChange(async (_event, session) => {

      if (session?.user) {
        await fetchUserProfile(session.user)
      } else {
        setUser(null)
        setLoading(false)
      }

      setInitialized(true) //  أهم سطر
    })

  //  قراءة سريعة من localStorage
  supabase.auth.getSession().then(({ data: { session } }) => {
    if (!session) {
      setUser(null)
      setLoading(false)
      setInitialized(true)
    }
  })

  return () => {
    subscription.unsubscribe()
  }

}, [])

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