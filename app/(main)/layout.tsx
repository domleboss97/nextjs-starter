import { Footer } from "@/components/layout/footer"
import { Header } from "@/components/layout/header"

import type { PropsWithChildren } from "react"

export default function MainLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className="flex w-full flex-1 grow flex-col items-center justify-center gap-8">
        <main className="container flex size-full flex-1 flex-col items-center gap-8 sm:items-start">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  )
}
