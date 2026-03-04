import { Button } from "@/components/ui/button"

export function SidebarFooter() {
  return (
    <div className="px-3 pb-2">
      <Button
        className="
          w-full
          rounded-full
          bg-[#1e1e24]
          text-[#f3f4f6]
          font-semibold
          border border-[#2e2e36]
          hover:bg-[#24242b]
          hover:border-[#8b5cf6]/50
          transition-all duration-200
        "
      >
        Upgrade to Pro
      </Button>
    </div>
  )
}
