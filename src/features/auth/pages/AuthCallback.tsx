import { useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { useNavigate } from "react-router-dom"

export default function AuthCallback() {

  const navigate = useNavigate()

  useEffect(() => {

    const handleAuth = async () => {

      const { data } = await supabase.auth.getSession()

      if (data.session) {
        navigate("/chat")
      } else {
        navigate("/login")
      }

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