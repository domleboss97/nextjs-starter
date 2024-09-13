import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Thanks() {
  return (
    <div className="flex size-full flex-col items-center justify-center gap-4">
      <h1 className="text-xl font-bold">❤️ THANKS LAD ❤️</h1>
      <div>
        <Button asChild>
          <Link href="/">Back</Link>
        </Button>
      </div>
    </div>
  )
}
