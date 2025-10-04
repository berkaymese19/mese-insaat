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
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Plus, Users, Phone, Mail, MapPin, Trash2, Edit, UserPlus } from "lucide-react"

interface Customer {
  id: string
  name: string
  email: string
  phone: string
  city: string
  interestedIn: string[]
  budget: string
  notes: string
  createdAt: string
  status: "active" | "potential" | "closed"
}

export default function AdminCustomersPage() {
  const [activeTab, setActiveTab] = useState("manage")
  const [customersList, setCustomersList] = useState<Customer[]>([
    {
      id: "1",
      name: "Ahmet Yılmaz",
      email: "ahmet@email.com",
      phone: "+90 532 123 4567",
      city: "İstanbul",
      interestedIn: ["apartment", "villa"],
      budget: "1.500.000 - 2.500.000",
      notes: "3+1 daire arıyor, Kadıköy bölgesi tercih ediyor",
      createdAt: "2024-01-15",
      status: "active"
    },
    {
      id: "2",
      name: "Fatma Demir",
      email: "fatma@email.com",
      phone: "+90 533 987 6543",
      city: "Ankara",
      interestedIn: ["office"],
      budget: "800.000 - 1.200.000",
      notes: "Ofis kiralama için görüşüyor",
      createdAt: "2024-01-20",
      status: "potential"
    },
    {
      id: "3",
      name: "Mehmet Kaya",
      email: "mehmet@email.com",
      phone: "+90 534 555 7777",
      city: "İzmir",
      interestedIn: ["land"],
      budget: "500.000 - 800.000",
      notes: "Arsa yatırımı için ilgileniyor",
      createdAt: "2024-01-25",
      status: "closed"
    }
  ])

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    interestedIn: [] as string[],
    budget: "",
    notes: "",
    status: "potential" as "active" | "potential" | "closed"
  })

  const handleInputChange = (field: string, value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Generate new ID
    const newId = (customersList.length + 1).toString()
    
    // Create new customer object
    const newCustomer: Customer = {
      id: newId,
      ...formData,
      createdAt: new Date().toISOString().split('T')[0]
    }

    // Add to customers list
    setCustomersList(prev => [...prev, newCustomer])
    console.log("Yeni müşteri eklendi:", newCustomer)
    alert("Müşteri başarıyla eklendi!")
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      city: "",
      interestedIn: [],
      budget: "",
      notes: "",
      status: "potential"
    })
  }

  const handleDeleteCustomer = (id: string) => {
    setCustomersList(prev => prev.filter(customer => customer.id !== id))
    alert("Müşteri başarıyla silindi!")
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="default">Aktif</Badge>
      case "potential":
        return <Badge variant="secondary">Potansiyel</Badge>
      case "closed":
        return <Badge variant="outline">Kapatıldı</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Müşteri Yönetimi</h1>
        <p className="text-muted-foreground">Müşteri bilgilerini ekleyin, düzenleyin ve takip edin</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="manage" className="gap-2">
            <Users className="h-4 w-4" />
            Müşterileri Yönet
          </TabsTrigger>
          <TabsTrigger value="add" className="gap-2">
            <UserPlus className="h-4 w-4" />
            Yeni Müşteri Ekle
          </TabsTrigger>
        </TabsList>

        <TabsContent value="manage" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Mevcut Müşteriler</CardTitle>
              <CardDescription>Toplam {customersList.length} müşteri</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {customersList.map((customer) => (
                  <div key={customer.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <Users className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{customer.name}</h3>
                          {getStatusBadge(customer.status)}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                          <div className="flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {customer.email}
                          </div>
                          <div className="flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {customer.phone}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {customer.city}
                          </div>
                        </div>
                        <div className="mt-2">
                          <p className="text-sm">{customer.notes}</p>
                          <div className="flex gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              Bütçe: {customer.budget} ₺
                            </Badge>
                            {customer.interestedIn.map((interest) => (
                              <Badge key={interest} variant="secondary" className="text-xs">
                                {interest === 'apartment' ? 'Daire' : 
                                 interest === 'villa' ? 'Villa' : 
                                 interest === 'office' ? 'Ofis' : 'Arsa'}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
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
                            <AlertDialogTitle>Müşteriyi Sil</AlertDialogTitle>
                            <AlertDialogDescription>
                              "{customer.name}" müşterisini silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>İptal</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeleteCustomer(customer.id)}
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
              <CardTitle>Yeni Müşteri Ekle</CardTitle>
              <CardDescription>Yeni müşteri bilgilerini ekleyin</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Ad Soyad</Label>
                      <Input
                        id="name"
                        placeholder="Örn: Ahmet Yılmaz"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="email">E-posta</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Örn: ahmet@email.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone">Telefon</Label>
                      <Input
                        id="phone"
                        placeholder="Örn: +90 532 123 4567"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        required
                      />
                    </div>

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
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="status">Durum</Label>
                      <Select value={formData.status} onValueChange={(value: "active" | "potential" | "closed") => handleInputChange("status", value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Aktif</SelectItem>
                          <SelectItem value="potential">Potansiyel</SelectItem>
                          <SelectItem value="closed">Kapatıldı</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="budget">Bütçe Aralığı</Label>
                      <Input
                        id="budget"
                        placeholder="Örn: 1.500.000 - 2.500.000"
                        value={formData.budget}
                        onChange={(e) => handleInputChange("budget", e.target.value)}
                      />
                    </div>

                    <div>
                      <Label>İlgilendiği Türler</Label>
                      <div className="space-y-2 mt-2">
                        {[
                          { value: "apartment", label: "Daire" },
                          { value: "villa", label: "Villa" },
                          { value: "office", label: "Ofis" },
                          { value: "land", label: "Arsa" }
                        ].map((type) => (
                          <div key={type.value} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id={type.value}
                              checked={formData.interestedIn.includes(type.value)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  handleInputChange("interestedIn", [...formData.interestedIn, type.value])
                                } else {
                                  handleInputChange("interestedIn", formData.interestedIn.filter(item => item !== type.value))
                                }
                              }}
                              className="rounded"
                            />
                            <Label htmlFor={type.value} className="text-sm">{type.label}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="notes">Notlar</Label>
                  <Textarea
                    id="notes"
                    placeholder="Müşteri hakkında önemli notlar..."
                    value={formData.notes}
                    onChange={(e) => handleInputChange("notes", e.target.value)}
                    rows={4}
                  />
                </div>

                <Button type="submit" className="w-full gap-2">
                  <UserPlus className="h-4 w-4" />
                  Müşteri Ekle
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
