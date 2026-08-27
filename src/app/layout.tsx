import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"
import type React from "react"
import polish from "@/i18n/dictionaries/pl"
import Providers from "@/store/components/Providers"

const kakugoLarge = localFont({
  src: "./fonts/FOT-UDKakugo_LargePr6N-DB.woff2",
  variable: "--font-kakugo-large",
  weight: "600",
})

export const metadata: Metadata = {
  title: "Tracen Player",
  description: polish.metadata.description,
  appleWebApp: {
    title: "Tracen Player",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
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
