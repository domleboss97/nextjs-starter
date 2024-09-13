import type { Metadata, Viewport } from "next"

import { Inter } from "next/font/google"
import "./globals.css"
import { TailwindIndicator } from "@/components/layout/tailwind-indicator"
import { ThemeProvider } from "next-themes"
import { siteConfig } from "@/config/site"
import { Toaster } from "sonner"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  keywords: siteConfig.keywords
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "var(--background)" },
    { media: "(prefers-color-scheme: dark)", color: "var(--background)" }
  ]
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <Toaster />
          <TailwindIndicator />
        </ThemeProvider>
      </body>
    </html>
  )
}
