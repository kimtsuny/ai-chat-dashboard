import { useEffect } from "react"
import { supabase } from "@/lib/supabase"

export default function AuthCallback() {

  useEffect(() => {

    const handleAuth = async () => {

      const hash = window.location.hash
      const params = new URLSearchParams(hash.substring(1))

      const access_token = params.get("access_token")
      const refresh_token = params.get("refresh_token")

      if (access_token && refresh_token) {

        await supabase.auth.setSession({
          access_token,
          refresh_token
        })

      }

      window.location.replace("/chat")

    }

    handleAuth()

  }, [])

  return (
    <div className="flex items-center justify-center h-screen bg-[#0f0f13]">
      <div className="flex flex-col items-center gap-6">
        <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-sm text-[#9ca3af]">
          Signing you in...
        </p>
      </div>
    </div>
  )
}
