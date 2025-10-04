import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Korkmaz İnşaat - Emlak ve Gayrimenkul",
  description: "Satılık, kiralık ve proje evleri. Hayalinizdeki evi Korkmaz İnşaat ile bulun.",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" className={inter.variable}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <Header />
        <main>{children}</main>
        <footer className="border-t py-8 mt-16">
          <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 Korkmaz İnşaat. Tüm hakları saklıdır.</p>
          </div>
        </footer>
      </body>
    </html>
  )
}
