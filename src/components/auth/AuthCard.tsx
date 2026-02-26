import React, { useState } from "react"
import { Mail, Lock, LogIn, Eye, EyeOff } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import logo from "@/assets/logo.png"
import { login } from "@/services/supabase"
import { useAuth } from "@/context/AuthContext"
import { useNavigate } from "react-router-dom"
function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  )
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="#1877F2">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}

function AppleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
    </svg>
  )
}

export function AuthCard() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
const {setUser} = useAuth()
const navigate = useNavigate()
  async function handleLogin(e:React.FormEvent){
    e.preventDefault()
    const {user, error} = await login(email, password)

  if (error) {
    console.log("Error:", error.message)
  } else {
setUser(user)
navigate("/chat")
  }
  }  return (
    <Card className="w-full rounded-2xl border-white/30 bg-white/60 shadow-[0_8px_40px_rgba(0,0,0,0.04)] backdrop-blur-2xl">
      <CardContent className="px-6 pb-7 pt-8 sm:px-8">
        {/* Icon */}
        <div className="mb-4 flex justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-gray-100 bg-white shadow-sm">
          <img src={logo} alt="Universe" className="h-14 w-14 object-contain" />
          </div>
        </div>

        {/* Title & description */}
        <h2 className="mb-1.5 text-center text-lg font-semibold text-gray-900">
          Sign in to your account
        </h2>
        <p className="mx-auto mb-6 max-w-[260px] text-center text-[13px] leading-relaxed text-muted-foreground">
          Welcome back! Please enter your details.
        </p>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-2.5">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-10 w-full rounded-xl border border-gray-200/70 bg-white/70 pl-10 pr-4 text-sm text-gray-800 outline-none transition-colors placeholder:text-gray-400 focus:border-gray-300 focus:ring-1 focus:ring-gray-200/80"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-10 w-full rounded-xl border border-gray-200/70 bg-white/70 pl-10 pr-10 text-sm text-gray-800 outline-none transition-colors placeholder:text-gray-400 focus:border-gray-300 focus:ring-1 focus:ring-gray-200/80"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors hover:text-gray-600"
              tabIndex={-1}
            >
              {showPassword ? (
                <Eye className="h-4 w-4" />
              ) : (
                <EyeOff className="h-4 w-4" />
              )}
            </button>
          </div>

          <div className="flex justify-end py-0.5">
            <a
              href="#"
              className="text-xs text-muted-foreground transition-colors hover:text-gray-700"
            >
              Forgot password?
            </a>
          </div>

          <Button
            type="submit"
            className="h-10 w-full rounded-xl bg-gradient-to-r from-gray-900 to-gray-700 text-sm font-medium text-white shadow-sm transition-all hover:from-gray-800 hover:to-gray-600"
          >
            Get Started
          </Button>
        </form>

        {/* Dashed divider */}
        <div className="my-5 flex items-center gap-3">
          <div className="flex-1 border-t border-dashed border-gray-300/60" />
          <span className="text-[11px] text-gray-400">Or sign in with</span>
          <div className="flex-1 border-t border-dashed border-gray-300/60" />
        </div>

        {/* Social */}
        <div className="grid grid-cols-3 gap-2.5">
          <Button
            variant="outline"
            className="h-10 rounded-xl border-gray-200/70 bg-white/50 shadow-none hover:bg-white/80"
          >
            <GoogleIcon className="h-[18px] w-[18px]" />
          </Button>
          <Button
            variant="outline"
            className="h-10 rounded-xl border-gray-200/70 bg-white/50 shadow-none hover:bg-white/80"
          >
            <FacebookIcon className="h-[18px] w-[18px]" />
          </Button>
          <Button
            variant="outline"
            className="h-10 rounded-xl border-gray-200/70 bg-white/50 shadow-none hover:bg-white/80"
          >
            <AppleIcon className="h-[18px] w-[18px]" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
