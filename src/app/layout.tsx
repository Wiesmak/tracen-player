import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import localFont from "next/font/local"
import "./globals.css"
import type React from "react"
import Providers from "@/store/components/Providers"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

const kakugoLarge = localFont({
  src: "./fonts/FOT-UDKakugo_LargePr6N-DB.woff2",
  variable: "--font-kakugo-large",
  weight: "600"
})

export const metadata: Metadata = {
  title: "Tracen Player",
  description: "Tracen Academy quiz player",
  appleWebApp: {
    title: "Tracen Player",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${kakugoLarge.variable} ${kakugoLarge.variable} h-full antialiased`}
    >
    <Providers>
      <body className="min-h-full flex flex-col">{children}</body>
    </Providers>
    </html>
  )
}
