import React, { useState } from "react"
import { Mail, Lock, Eye, EyeOff } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import logo from "@/assets/logo.png"
import { login, loginWithGoogle } from "@/features/auth/services/supabase"
import { useAuth } from "@/context/AuthContext"
import { useNavigate } from "react-router-dom"

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  )
}

export function AuthCard() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const { setUser } = useAuth()
  const navigate = useNavigate()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()

    const { user, error } = await login(email, password)

    if (error) {
      console.log(error.message)
      return
    }

    setUser(user)
    navigate("/chat")
  }

  return (
    <Card className="w-full max-w-md mx-auto rounded-2xl border-white/30 bg-white/60 shadow-[0_8px_40px_rgba(0,0,0,0.04)] backdrop-blur-2xl">
      <CardContent className="px-8 py-10">

        {/* Logo */}
        <div className="mb-6 flex justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-gray-100 bg-white shadow-sm">
            <img src={logo} alt="Universe" className="h-14 w-14 object-contain" />
          </div>
        </div>

        {/* Title */}
        <h2 className="mb-2 text-center text-lg font-semibold text-gray-900">
          Sign in to your account
        </h2>

        <p className="mb-6 text-center text-sm text-muted-foreground">
          Welcome to Universe AI
        </p>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-3">

          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"/>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-10 w-full rounded-xl border border-gray-200 bg-white pl-10 pr-4 text-sm outline-none focus:ring-1 focus:ring-gray-300"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"/>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-10 w-full rounded-xl border border-gray-200 bg-white pl-10 pr-10 text-sm outline-none focus:ring-1 focus:ring-gray-300"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showPassword ? <Eye className="h-4 w-4"/> : <EyeOff className="h-4 w-4"/>}
            </button>
          </div>

          {/* Login Button */}
          <Button className="h-10 w-full rounded-xl bg-black text-white hover:bg-gray-800">
            Login
          </Button>

        </form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-3">
          <div className="flex-1 border-t border-gray-200"/>
          <span className="text-xs text-gray-400">or</span>
          <div className="flex-1 border-t border-gray-200"/>
        </div>

        {/* Google Button */}
        <Button
          onClick={loginWithGoogle}
          className="flex h-11 w-full items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white text-sm text-gray-700 hover:bg-gray-50"
        >
          <GoogleIcon className="h-5 w-5"/>
          Login with Google
        </Button>

      </CardContent>
    </Card>
  )
}