
import { AuthCard } from "@/components/auth/AuthCard"

export default function Login() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-sky-300/70 via-sky-100/40 to-white p-4">
      {/* Top-left logo */}
      <div className="absolute left-5 top-5 z-20 flex items-center gap-2 sm:left-7 sm:top-7">
      <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent text-2xl font-semibold tracking-wider">Universe</span>
      </div>

      {/* Soft ambient light behind card */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[40%] h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/50 blur-[100px]" />
      </div>

      {/* Cloud layer at bottom */}
      <div aria-hidden className="pointer-events-none absolute bottom-0 left-0 right-0">
        <div className="h-[220px] bg-gradient-to-t from-white via-white/90 to-transparent" />
        <div className="absolute -bottom-16 left-[10%] h-[180px] w-[45%] rounded-full bg-white/70 blur-3xl" />
        <div className="absolute -bottom-16 right-[5%] h-[200px] w-[50%] rounded-full bg-white/80 blur-3xl" />
        <div className="absolute -bottom-8 left-[30%] h-[120px] w-[40%] rounded-full bg-white/60 blur-2xl" />
      </div>

      {/* Decorative arc behind card */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[52%] h-[460px] w-[460px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-sky-200/30 sm:h-[520px] sm:w-[520px]"
      />

      <div className="relative z-10 w-full max-w-[350px]">
        <AuthCard />
      </div>
    </div>
  )
}
