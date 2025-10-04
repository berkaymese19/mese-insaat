"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Home, 
  Users, 
  TrendingUp, 
  Eye, 
  Plus,
  Building2,
  DollarSign,
  MapPin
} from "lucide-react"
import { properties } from "@/lib/properties"

export default function AdminDashboard() {
  // Calculate statistics
  const totalProperties = properties.length
  const activeProperties = properties.filter(p => p.active).length
  const featuredProperties = properties.filter(p => p.featured).length
  const totalValue = properties.reduce((sum, p) => sum + p.price, 0)
  
  const propertiesByType = {
    sale: properties.filter(p => p.type === 'sale').length,
    rent: properties.filter(p => p.type === 'rent').length,
    project: properties.filter(p => p.type === 'project').length
  }

  const recentProperties = properties.slice(-3)

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-6 rounded-lg">
        <h1 className="text-3xl font-bold mb-2">Hoş Geldiniz!</h1>
        <p className="text-muted-foreground">
          Korkmaz İnşaat admin paneline hoş geldiniz. İşte güncel istatistikleriniz.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam İlan</CardTitle>
            <Home className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProperties}</div>
            <p className="text-xs text-muted-foreground">
              {activeProperties} aktif ilan
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Değer</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(totalValue / 1000000).toFixed(1)}M ₺
            </div>
            <p className="text-xs text-muted-foreground">
              Tüm ilanların toplam değeri
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Öne Çıkan</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{featuredProperties}</div>
            <p className="text-xs text-muted-foreground">
              Öne çıkan ilan sayısı
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Görüntülenme</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">
              Bu ay toplam görüntülenme
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Property Types */}
        <Card>
          <CardHeader>
            <CardTitle>İlan Türleri</CardTitle>
            <CardDescription>İlanların türlere göre dağılımı</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-green-600" />
                  <span>Satılık</span>
                </div>
                <Badge variant="outline">{propertiesByType.sale}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-blue-600" />
                  <span>Kiralık</span>
                </div>
                <Badge variant="outline">{propertiesByType.rent}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-purple-600" />
                  <span>Proje</span>
                </div>
                <Badge variant="outline">{propertiesByType.project}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Properties */}
        <Card>
          <CardHeader>
            <CardTitle>Son Eklenen İlanlar</CardTitle>
            <CardDescription>En son eklenen 3 ilan</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentProperties.map((property) => (
                <div key={property.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                      <Home className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">{property.title}</h4>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        {property.city}, {property.location}
                      </div>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {property.type === 'sale' ? 'Satılık' : property.type === 'rent' ? 'Kiralık' : 'Proje'}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Hızlı İşlemler</CardTitle>
          <CardDescription>En sık kullanılan işlemler</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="h-20 flex flex-col gap-2">
              <Plus className="h-6 w-6" />
              <span>Yeni İlan Ekle</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <Home className="h-6 w-6" />
              <span>İlanları Yönet</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <Users className="h-6 w-6" />
              <span>Müşterileri Görüntüle</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
