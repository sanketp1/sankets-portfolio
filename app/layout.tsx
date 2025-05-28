import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "John Doe - Full Stack Developer Portfolio",
  description:
    "Professional portfolio showcasing full-stack development projects, skills, and experience. Specializing in React, Node.js, and modern web technologies.",
  keywords: ["full stack developer", "react", "node.js", "web development", "portfolio"],
  authors: [{ name: "John Doe" }],
  openGraph: {
    title: "John Doe - Full Stack Developer Portfolio",
    description: "Professional portfolio showcasing full-stack development projects and skills",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "John Doe - Full Stack Developer Portfolio",
    description: "Professional portfolio showcasing full-stack development projects and skills",
  },
  robots: {
    index: true,
    follow: true,
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
