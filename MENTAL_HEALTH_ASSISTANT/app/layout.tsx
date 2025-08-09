import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MindfulAssess - Mental Health Assessment for Students",
  description:
    "AI-powered mental health assessment tool designed specifically for students. Understand your stress and anxiety levels with personalized recommendations.",
  keywords: "mental health, assessment, students, stress, anxiety, wellbeing",
  authors: [{ name: "Rahul Pradhan" }],
  creator: "Rahul Pradhan",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
