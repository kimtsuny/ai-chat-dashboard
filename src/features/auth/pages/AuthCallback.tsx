import { useEffect } from "react"
import { supabase } from "@/lib/supabase"

export default function AuthCallback() {

  useEffect(() => {

    const handleAuth = async () => {

      console.log("URL:", window.location.href)

      const { data, error } = await supabase.auth.exchangeCodeForSession(
        window.location.href
      )

      console.log("SESSION:", data)
      console.log("ERROR:", error)

      // أوقف التحويل مؤقتاً
      // window.location.replace("/chat")

    }

    handleAuth()

  }, [])

  return (
    <div className="flex items-center justify-center h-screen bg-[#0f0f13]">
      <p className="text-white">Checking login...</p>
    </div>
  )
}
