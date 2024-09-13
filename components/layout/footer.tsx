import Link from "next/link"

import type { HTMLProps } from "react"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils/cn"
import { DonateButton } from "../donate-button"

type Props = HTMLProps<HTMLDivElement>

export function Footer({ className, ...props }: Props) {
  return (
    <footer className={cn("w-full py-4", className)} {...props}>
      <div className="container flex flex-col flex-wrap items-center justify-between gap-1 sm:flex-row">
        <div className="flex flex-row items-center">
          <div className="gap-2 text-sm text-muted-foreground hover:text-foreground">
            Built by{" "}
            <Link className="underline" href={siteConfig.links.linkedin}>
              {siteConfig.author.name}
            </Link>
          </div>
        </div>

        <nav className="flex flex-row items-center justify-between space-x-2">
          <DonateButton />
        </nav>
      </div>
    </footer>
  )
}
