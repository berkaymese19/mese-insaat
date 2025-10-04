"use client"

import Link from "next/link"
import { Building2, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"

export function Header() {
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-xl text-primary hover:text-accent transition-colors"
        >
          <Building2 className="h-6 w-6" />
          <span>Korkmaz İnşaat</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive("/") ? "text-primary" : "text-foreground/80"
            }`}
          >
            Ana Sayfa
          </Link>
          <Link
            href="/properties"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive("/properties") ? "text-primary" : "text-foreground/80"
            }`}
          >
            Tüm İlanlar
          </Link>
          <Link
            href="/properties/sale"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive("/properties/sale") ? "text-primary" : "text-foreground/80"
            }`}
          >
            Satılık
          </Link>
          <Link
            href="/properties/rent"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive("/properties/rent") ? "text-primary" : "text-foreground/80"
            }`}
          >
            Kiralık
          </Link>
          <Link
            href="/properties/project"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive("/properties/project") ? "text-primary" : "text-foreground/80"
            }`}
          >
            Projeler
          </Link>
          <Link
            href="/admin"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive("/admin") ? "text-primary" : "text-foreground/80"
            }`}
          >
            Admin
          </Link>
        </nav>

        <Button asChild className="gap-2">
          <a href="tel:+905321234567">
            <Phone className="h-4 w-4" />
            <span className="hidden sm:inline">İletişim</span>
          </a>
        </Button>
      </div>
    </header>
  )
}
