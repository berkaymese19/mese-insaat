"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { 
  Settings, 
  Building2, 
  Mail, 
  Phone, 
  Globe, 
  Bell, 
  Shield,
  Save,
  RefreshCw
} from "lucide-react"

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    // Company Settings
    companyName: "Korkmaz İnşaat",
    companyDescription: "Satılık, kiralık ve proje evleri. Hayalinizdeki evi Korkmaz İnşaat ile bulun.",
    companyPhone: "+90 532 123 4567",
    companyEmail: "info@korkmazinsaat.com",
    companyWebsite: "www.korkmazinsaat.com",
    companyAddress: "Çorum Merzifon, Türkiye",
    
    // Notification Settings
    emailNotifications: true,
    smsNotifications: false,
    newPropertyAlerts: true,
    customerAlerts: true,
    
    // Display Settings
    propertiesPerPage: "12",
    featuredPropertiesCount: "6",
    enableComments: true,
    enableReviews: true,
    
    // Security Settings
    requireLogin: true,
    sessionTimeout: "30",
    enableTwoFactor: false
  })

  const handleInputChange = (field: string, value: string | boolean) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSave = () => {
    // In a real app, you would save these to a database
    console.log("Ayarlar kaydedildi:", settings)
    alert("Ayarlar başarıyla kaydedildi!")
  }

  const handleReset = () => {
    if (confirm("Tüm ayarları varsayılan değerlere sıfırlamak istediğinizden emin misiniz?")) {
      // Reset to default values
      setSettings({
        companyName: "Korkmaz İnşaat",
        companyDescription: "Satılık, kiralık ve proje evleri. Hayalinizdeki evi Korkmaz İnşaat ile bulun.",
        companyPhone: "+90 532 123 4567",
        companyEmail: "info@korkmazinsaat.com",
        companyWebsite: "www.korkmazinsaat.com",
        companyAddress: "Çorum Merzifon, Türkiye",
        emailNotifications: true,
        smsNotifications: false,
        newPropertyAlerts: true,
        customerAlerts: true,
        propertiesPerPage: "12",
        featuredPropertiesCount: "6",
        enableComments: true,
        enableReviews: true,
        requireLogin: true,
        sessionTimeout: "30",
        enableTwoFactor: false
      })
      alert("Ayarlar varsayılan değerlere sıfırlandı!")
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Sistem Ayarları</h1>
        <p className="text-muted-foreground">Sistem ve şirket ayarlarını yönetin</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Company Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Şirket Bilgileri
            </CardTitle>
            <CardDescription>Şirket bilgilerini düzenleyin</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="companyName">Şirket Adı</Label>
              <Input
                id="companyName"
                value={settings.companyName}
                onChange={(e) => handleInputChange("companyName", e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="companyDescription">Şirket Açıklaması</Label>
              <Textarea
                id="companyDescription"
                value={settings.companyDescription}
                onChange={(e) => handleInputChange("companyDescription", e.target.value)}
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="companyPhone">Telefon</Label>
                <Input
                  id="companyPhone"
                  value={settings.companyPhone}
                  onChange={(e) => handleInputChange("companyPhone", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="companyEmail">E-posta</Label>
                <Input
                  id="companyEmail"
                  type="email"
                  value={settings.companyEmail}
                  onChange={(e) => handleInputChange("companyEmail", e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="companyWebsite">Website</Label>
              <Input
                id="companyWebsite"
                value={settings.companyWebsite}
                onChange={(e) => handleInputChange("companyWebsite", e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="companyAddress">Adres</Label>
              <Input
                id="companyAddress"
                value={settings.companyAddress}
                onChange={(e) => handleInputChange("companyAddress", e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Bildirim Ayarları
            </CardTitle>
            <CardDescription>Bildirim tercihlerinizi ayarlayın</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="emailNotifications">E-posta Bildirimleri</Label>
                <p className="text-sm text-muted-foreground">E-posta ile bildirim al</p>
              </div>
              <Switch
                id="emailNotifications"
                checked={settings.emailNotifications}
                onCheckedChange={(checked) => handleInputChange("emailNotifications", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="smsNotifications">SMS Bildirimleri</Label>
                <p className="text-sm text-muted-foreground">SMS ile bildirim al</p>
              </div>
              <Switch
                id="smsNotifications"
                checked={settings.smsNotifications}
                onCheckedChange={(checked) => handleInputChange("smsNotifications", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="newPropertyAlerts">Yeni İlan Uyarıları</Label>
                <p className="text-sm text-muted-foreground">Yeni ilanlar için uyarı al</p>
              </div>
              <Switch
                id="newPropertyAlerts"
                checked={settings.newPropertyAlerts}
                onCheckedChange={(checked) => handleInputChange("newPropertyAlerts", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="customerAlerts">Müşteri Uyarıları</Label>
                <p className="text-sm text-muted-foreground">Müşteri aktiviteleri için uyarı al</p>
              </div>
              <Switch
                id="customerAlerts"
                checked={settings.customerAlerts}
                onCheckedChange={(checked) => handleInputChange("customerAlerts", checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Display Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Görüntüleme Ayarları
            </CardTitle>
            <CardDescription>Site görünümünü ayarlayın</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="propertiesPerPage">Sayfa Başına İlan</Label>
              <Select value={settings.propertiesPerPage} onValueChange={(value) => handleInputChange("propertiesPerPage", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="6">6</SelectItem>
                  <SelectItem value="12">12</SelectItem>
                  <SelectItem value="24">24</SelectItem>
                  <SelectItem value="48">48</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="featuredPropertiesCount">Öne Çıkan İlan Sayısı</Label>
              <Select value={settings.featuredPropertiesCount} onValueChange={(value) => handleInputChange("featuredPropertiesCount", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="6">6</SelectItem>
                  <SelectItem value="9">9</SelectItem>
                  <SelectItem value="12">12</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="enableComments">Yorumlar</Label>
                <p className="text-sm text-muted-foreground">İlanlarda yorum özelliğini etkinleştir</p>
              </div>
              <Switch
                id="enableComments"
                checked={settings.enableComments}
                onCheckedChange={(checked) => handleInputChange("enableComments", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="enableReviews">Değerlendirmeler</Label>
                <p className="text-sm text-muted-foreground">Müşteri değerlendirmelerini etkinleştir</p>
              </div>
              <Switch
                id="enableReviews"
                checked={settings.enableReviews}
                onCheckedChange={(checked) => handleInputChange("enableReviews", checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Güvenlik Ayarları
            </CardTitle>
            <CardDescription>Güvenlik tercihlerinizi ayarlayın</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="requireLogin">Giriş Zorunlu</Label>
                <p className="text-sm text-muted-foreground">Admin paneline giriş zorunlu olsun</p>
              </div>
              <Switch
                id="requireLogin"
                checked={settings.requireLogin}
                onCheckedChange={(checked) => handleInputChange("requireLogin", checked)}
              />
            </div>

            <div>
              <Label htmlFor="sessionTimeout">Oturum Süresi (dakika)</Label>
              <Select value={settings.sessionTimeout} onValueChange={(value) => handleInputChange("sessionTimeout", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 dakika</SelectItem>
                  <SelectItem value="30">30 dakika</SelectItem>
                  <SelectItem value="60">1 saat</SelectItem>
                  <SelectItem value="120">2 saat</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="enableTwoFactor">İki Faktörlü Doğrulama</Label>
                <p className="text-sm text-muted-foreground">Ek güvenlik için 2FA etkinleştir</p>
              </div>
              <Switch
                id="enableTwoFactor"
                checked={settings.enableTwoFactor}
                onCheckedChange={(checked) => handleInputChange("enableTwoFactor", checked)}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <Button onClick={handleSave} className="gap-2">
              <Save className="h-4 w-4" />
              Ayarları Kaydet
            </Button>
            <Button variant="outline" onClick={handleReset} className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Varsayılana Sıfırla
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
