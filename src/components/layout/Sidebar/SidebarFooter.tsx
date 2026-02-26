import { Button } from "@/components/ui/button"

export function SidebarFooter() {
  return (
    <div className="px-3 pb-">
      <Button
        className="
          w-full
          rounded-full
          bg-black
          text-white
          font-semibold
          hover:bg-neutral-800
          transition-colors
        "
      >
        Upgrade to Pro
      </Button>
    </div>
  )
}
