"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  Building2, 
  Home, 
  Users, 
  BarChart3, 
  Settings, 
  LogOut,
  Menu,
  X,
  Eye,
  EyeOff
} from "lucide-react"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const pathname = usePathname()

  const handleLogin = () => {
    if (password === "admin123") {
      setIsAuthenticated(true)
    } else {
      alert("Yanlış şifre!")
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setPassword("")
  }

  const sidebarItems = [
    {
      title: "Dashboard",
      href: "/admin",
      icon: BarChart3,
      description: "Genel istatistikler"
    },
    {
      title: "Evleri Yönet",
      href: "/admin/properties",
      icon: Home,
      description: "İlan yönetimi"
    },
    {
      title: "Müşteriler",
      href: "/admin/customers",
      icon: Users,
      description: "Müşteri yönetimi"
    },
    {
      title: "Ayarlar",
      href: "/admin/settings",
      icon: Settings,
      description: "Sistem ayarları"
    }
  ]

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/20 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <div className="p-6">
            <div className="text-center mb-6">
              <Building2 className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h1 className="text-2xl font-bold">Admin Paneli</h1>
              <p className="text-muted-foreground">Devam etmek için şifrenizi girin</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="password">Şifre</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Şifrenizi girin"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                />
              </div>
              <Button onClick={handleLogin} className="w-full">
                Giriş Yap
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                Demo şifre: admin123
              </p>
            </div>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <div className="lg:hidden bg-background border-b px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Building2 className="h-6 w-6 text-primary" />
          <span className="font-bold">Korkmaz İnşaat Admin</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-64 bg-background border-r transition-transform duration-200 ease-in-out`}>
          <div className="flex flex-col h-full">
            {/* Sidebar Header */}
            <div className="p-6 border-b">
              <div className="flex items-center gap-2 mb-4">
                <Building2 className="h-8 w-8 text-primary" />
                <div>
                  <h2 className="font-bold text-lg">Korkmaz İnşaat</h2>
                  <p className="text-sm text-muted-foreground">Admin Paneli</p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2">
              {sidebarItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                      isActive 
                        ? 'bg-primary text-primary-foreground' 
                        : 'hover:bg-muted'
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <Icon className="h-4 w-4" />
                    <div className="flex-1">
                      <div className="font-medium">{item.title}</div>
                      <div className="text-xs opacity-70">{item.description}</div>
                    </div>
                  </Link>
                )
              })}
            </nav>

            {/* Sidebar Footer */}
            <div className="p-4 border-t">
              <Button
                variant="ghost"
                onClick={handleLogout}
                className="w-full justify-start gap-2"
              >
                <LogOut className="h-4 w-4" />
                Çıkış Yap
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 lg:ml-0">
          {/* Desktop Header */}
          <div className="hidden lg:block bg-background border-b px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold">
                  {sidebarItems.find(item => item.href === pathname)?.title || 'Dashboard'}
                </h1>
                <p className="text-muted-foreground">
                  {sidebarItems.find(item => item.href === pathname)?.description || 'Admin paneli'}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Çevrimiçi
                </div>
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Çıkış
                </Button>
              </div>
            </div>
          </div>

          {/* Page Content */}
          <div className="p-6">
            {children}
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}
