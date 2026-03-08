import { supabase } from "@/lib/supabase"
import { createContext, useState, ReactNode, useContext, useEffect } from "react"

type User = {
  id: string
  email: string,
  role: string
} | null

type AuthContextType = {
  user: User
  setUser: (user: User) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<User>(() => {
    const storedUser = localStorage.getItem("user")
    return storedUser ? JSON.parse(storedUser) : null
  })


  const setUser = (user: User) => {
    setUserState(user)

    if (user) {
      localStorage.setItem("user", JSON.stringify(user))
    } else {
      localStorage.removeItem("user")
    }
  }

 useEffect(() => {
  const { data: listener } = supabase.auth.onAuthStateChange(
    async (event, session) => {

      if (session?.user) {

        const { data } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", session.user.id)
          .single()

        setUser({
          id: session.user.id,
          email: session.user.email!,
          role: data?.role ?? "user",
        })

      } else {
        setUser(null)
      }
    }
  )

  return () => {
    listener.subscription.unsubscribe()
  }

}, [])

  return (
    <AuthContext.Provider value={{ user, setUser }}>
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