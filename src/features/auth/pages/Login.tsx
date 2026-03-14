import { AuthCard } from "@/features/auth/components/AuthCard"

export default function Login() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-sky-200 via-sky-100 to-white p-4">

      {/* Logo */}
      <div className="absolute left-6 top-6 z-20">
        <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent text-2xl font-semibold tracking-wide">
          Universe
        </span>
      </div>

      {/* Soft light behind card */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[500px] w-[500px] rounded-full bg-sky-300/30 blur-[120px]" />
      </div>

      {/* Decorative circle */}
      <div
        className="
        pointer-events-none
        absolute
        left-1/2
        top-1/2
        h-[520px]
        w-[520px]
        -translate-x-1/2
        -translate-y-1/2
        rounded-full
        border
        border-sky-200/40
        "
      />

      {/* Clouds */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0">
        <div className="h-[200px] bg-gradient-to-t from-white to-transparent" />

        <div className="absolute -bottom-12 left-[10%] h-[150px] w-[40%] rounded-full bg-white/70 blur-3xl" />

        <div className="absolute -bottom-12 right-[10%] h-[180px] w-[45%] rounded-full bg-white/80 blur-3xl" />
      </div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-[360px]">
        <AuthCard />
      </div>

    </div>
  )
}