"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Plus, Home, Building2, Trash2, Edit, Eye, EyeOff } from "lucide-react"
import { properties, type Property } from "@/lib/properties"

export default function AdminPropertiesPage() {
  const [activeTab, setActiveTab] = useState("manage")
  const [propertiesList, setPropertiesList] = useState<Property[]>(properties)

  // Form states
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    area: "",
    bedrooms: "",
    bathrooms: "",
    city: "",
    location: "",
    type: "sale",
    category: "apartment",
    image: "",
    featured: false
  })

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Generate new ID
    const newId = (propertiesList.length + 1).toString()
    
    // Create new property object
    const newProperty: Property = {
      id: newId,
      ...formData,
      price: parseInt(formData.price),
      area: parseInt(formData.area),
      bedrooms: parseInt(formData.bedrooms),
      bathrooms: parseInt(formData.bathrooms),
      images: formData.image ? [formData.image] : ["/placeholder.svg"],
      features: [],
      phone: "+90 532 123 4567",
      active: true,
      createdAt: new Date().toISOString()
    }

    // Add to properties list
    setPropertiesList(prev => [...prev, newProperty])
    console.log("Yeni ev eklendi:", newProperty)
    alert("Ev başarıyla eklendi!")
    
    // Reset form
    setFormData({
      title: "",
      description: "",
      price: "",
      area: "",
      bedrooms: "",
      bathrooms: "",
      city: "",
      location: "",
      type: "sale",
      category: "apartment",
      image: "",
      featured: false
    })
  }

  const handleDeleteProperty = (id: string) => {
    setPropertiesList(prev => prev.filter(property => property.id !== id))
    alert("İlan başarıyla silindi!")
  }

  const handleToggleActive = (id: string) => {
    setPropertiesList(prev => 
      prev.map(property => 
        property.id === id 
          ? { ...property, active: !property.active }
          : property
      )
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">İlan Yönetimi</h1>
        <p className="text-muted-foreground">Ev ilanlarını ekleyin, düzenleyin ve yönetin</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="manage" className="gap-2">
            <Building2 className="h-4 w-4" />
            İlanları Yönet
          </TabsTrigger>
          <TabsTrigger value="add" className="gap-2">
            <Plus className="h-4 w-4" />
            Yeni İlan Ekle
          </TabsTrigger>
        </TabsList>

        <TabsContent value="manage" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Mevcut İlanlar</CardTitle>
              <CardDescription>Toplam {propertiesList.length} ilan</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {propertiesList.map((property) => (
                  <div key={property.id} className={`flex items-center justify-between p-4 border rounded-lg ${!property.active ? 'opacity-60 bg-muted/30' : ''}`}>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                        <Home className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{property.title}</h3>
                          {property.active ? (
                            <Badge variant="default" className="text-xs">Aktif</Badge>
                          ) : (
                            <Badge variant="secondary" className="text-xs">Pasif</Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{property.city}, {property.location}</p>
                        <div className="flex gap-2 mt-1">
                          <Badge variant="outline">{property.type === 'sale' ? 'Satılık' : property.type === 'rent' ? 'Kiralık' : 'Proje'}</Badge>
                          <Badge variant="secondary">{property.category}</Badge>
                          {property.featured && <Badge variant="destructive">Öne Çıkan</Badge>}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <Label htmlFor={`toggle-${property.id}`} className="text-sm">
                          {property.active ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                        </Label>
                        <Switch
                          id={`toggle-${property.id}`}
                          checked={property.active}
                          onCheckedChange={() => handleToggleActive(property.id)}
                        />
                      </div>
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button size="sm" variant="destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>İlanı Sil</AlertDialogTitle>
                            <AlertDialogDescription>
                              "{property.title}" ilanını silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>İptal</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeleteProperty(property.id)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Sil
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="add" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Yeni Ev Ekle</CardTitle>
              <CardDescription>Satılık, kiralık veya proje evi ekleyin</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="title">Ev Başlığı</Label>
                      <Input
                        id="title"
                        placeholder="Örn: Modern 3+1 Daire"
                        value={formData.title}
                        onChange={(e) => handleInputChange("title", e.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="type">İlan Türü</Label>
                      <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sale">Satılık</SelectItem>
                          <SelectItem value="rent">Kiralık</SelectItem>
                          <SelectItem value="project">Proje</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="category">Kategori</Label>
                      <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="apartment">Daire</SelectItem>
                          <SelectItem value="villa">Villa</SelectItem>
                          <SelectItem value="office">Ofis</SelectItem>
                          <SelectItem value="land">Arsa</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="price">Fiyat (TL)</Label>
                      <Input
                        id="price"
                        type="number"
                        placeholder="Örn: 1500000"
                        value={formData.price}
                        onChange={(e) => handleInputChange("price", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="area">Metrekare</Label>
                      <Input
                        id="area"
                        type="number"
                        placeholder="Örn: 120"
                        value={formData.area}
                        onChange={(e) => handleInputChange("area", e.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="bedrooms">Yatak Odası</Label>
                      <Input
                        id="bedrooms"
                        type="number"
                        placeholder="Örn: 3"
                        value={formData.bedrooms}
                        onChange={(e) => handleInputChange("bedrooms", e.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="bathrooms">Banyo</Label>
                      <Input
                        id="bathrooms"
                        type="number"
                        placeholder="Örn: 2"
                        value={formData.bathrooms}
                        onChange={(e) => handleInputChange("bathrooms", e.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="image">Resim URL</Label>
                      <Input
                        id="image"
                        placeholder="Resim linkini girin"
                        value={formData.image}
                        onChange={(e) => handleInputChange("image", e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="city">Şehir</Label>
                    <Input
                      id="city"
                      placeholder="Örn: İstanbul"
                      value={formData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="location">Konum/İlçe</Label>
                    <Input
                      id="location"
                      placeholder="Örn: Kadıköy, Moda"
                      value={formData.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Açıklama</Label>
                    <Textarea
                      id="description"
                      placeholder="Ev hakkında detaylı bilgi yazın..."
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      rows={4}
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured}
                    onChange={(e) => handleInputChange("featured", e.target.checked)}
                    className="rounded"
                  />
                  <Label htmlFor="featured">Öne çıkan ilan olarak işaretle</Label>
                </div>

                <Button type="submit" className="w-full gap-2">
                  <Plus className="h-4 w-4" />
                  Ev Ekle
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
