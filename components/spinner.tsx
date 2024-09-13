import { cn } from "@/lib/utils/cn"
import { Loader2 } from "lucide-react"

type SizeClasses = "small" | "default" | "large"

const sizeClasses: Record<SizeClasses, string> = {
  small: "w-4 h-4",
  default: "w-8 h-8",
  large: "w-12 h-12"
}

type SpinnerProps = {
  size?: SizeClasses
  className?: string
}

export function Spinner({ size = "default", className = "" }: SpinnerProps) {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <Loader2 className={`animate-spin text-primary ${sizeClasses[size]}`} />
    </div>
  )
}
