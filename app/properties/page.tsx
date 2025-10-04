"use client"

import { useState, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import { PropertyCard } from "@/components/property-card"
import { properties, type PropertyType } from "@/lib/properties"
import { SearchBar } from "@/components/search-bar"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Filter, X } from "lucide-react"

export default function PropertiesPage() {
  const searchParams = useSearchParams()
  const typeParam = searchParams.get("type") as PropertyType | null
  const queryParam = searchParams.get("q") || ""

  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("newest")
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  
  // Advanced filters
  const [city, setCity] = useState<string>("")
  const [district, setDistrict] = useState<string>("")
  const [minArea, setMinArea] = useState<string>("")
  const [maxArea, setMaxArea] = useState<string>("")
  const [minBathrooms, setMinBathrooms] = useState<string>("")
  const [maxBathrooms, setMaxBathrooms] = useState<string>("")
  const [minPrice, setMinPrice] = useState<string>("")
  const [maxPrice, setMaxPrice] = useState<string>("")

  const filteredProperties = useMemo(() => {
    let filtered = [...properties]

    // Filter by type from URL
    if (typeParam) {
      filtered = filtered.filter((p) => p.type === typeParam)
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((p) => p.category === selectedCategory)
    }

    // Filter by search query
    if (queryParam) {
      const query = queryParam.toLowerCase()
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.location.toLowerCase().includes(query) ||
          p.city.toLowerCase().includes(query),
      )
    }

    // Advanced filters
    if (city) {
      filtered = filtered.filter((p) => p.city.toLowerCase().includes(city.toLowerCase()))
    }
    
    if (district) {
      filtered = filtered.filter((p) => p.location.toLowerCase().includes(district.toLowerCase()))
    }
    
    if (minArea) {
      filtered = filtered.filter((p) => p.area >= parseInt(minArea))
    }
    
    if (maxArea) {
      filtered = filtered.filter((p) => p.area <= parseInt(maxArea))
    }
    
    if (minBathrooms) {
      filtered = filtered.filter((p) => p.bathrooms >= parseInt(minBathrooms))
    }
    
    if (maxBathrooms) {
      filtered = filtered.filter((p) => p.bathrooms <= parseInt(maxBathrooms))
    }
    
    if (minPrice) {
      filtered = filtered.filter((p) => p.price >= parseInt(minPrice))
    }
    
    if (maxPrice) {
      filtered = filtered.filter((p) => p.price <= parseInt(maxPrice))
    }

    // Sort
    if (sortBy === "price-asc") {
      filtered.sort((a, b) => a.price - b.price)
    } else if (sortBy === "price-desc") {
      filtered.sort((a, b) => b.price - a.price)
    } else if (sortBy === "area-desc") {
      filtered.sort((a, b) => b.area - a.area)
    }

    return filtered
  }, [typeParam, selectedCategory, queryParam, sortBy, city, district, minArea, maxArea, minBathrooms, maxBathrooms, minPrice, maxPrice])

  const typeLabels: Record<string, string> = {
    sale: "Satılık",
    rent: "Kiralık",
    project: "Proje",
  }

  const clearFilters = () => {
    setCity("")
    setDistrict("")
    setMinArea("")
    setMaxArea("")
    setMinBathrooms("")
    setMaxBathrooms("")
    setMinPrice("")
    setMaxPrice("")
  }

  const hasActiveFilters = city || district || minArea || maxArea || minBathrooms || maxBathrooms || minPrice || maxPrice

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          {typeParam ? `${typeLabels[typeParam]} İlanlar` : "Tüm İlanlar"}
        </h1>
        <SearchBar />
      </div>

      {/* Filter and Sort Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filtrele
              {hasActiveFilters && (
                <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                  {[city, district, minArea, maxArea, minBathrooms, maxBathrooms, minPrice, maxPrice].filter(Boolean).length}
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[400px] sm:w-[540px] p-0 flex flex-col">
            <SheetHeader className="p-6 pb-4 border-b">
              <SheetTitle>Filtreleme Seçenekleri</SheetTitle>
            </SheetHeader>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              {/* Location Filters */}
              <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
                <h3 className="font-semibold text-lg">Konum</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="city" className="text-sm font-medium">İl</Label>
                    <Input
                      id="city"
                      placeholder="İl adı girin"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="district" className="text-sm font-medium">İlçe</Label>
                    <Input
                      id="district"
                      placeholder="İlçe adı girin"
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>

              {/* Area Filters */}
              <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
                <h3 className="font-semibold text-lg">Metrekare</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="minArea" className="text-sm font-medium">Min (m²)</Label>
                    <Input
                      id="minArea"
                      type="number"
                      placeholder="0"
                      value={minArea}
                      onChange={(e) => setMinArea(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="maxArea" className="text-sm font-medium">Max (m²)</Label>
                    <Input
                      id="maxArea"
                      type="number"
                      placeholder="∞"
                      value={maxArea}
                      onChange={(e) => setMaxArea(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>

              {/* Bathroom Filters */}
              <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
                <h3 className="font-semibold text-lg">Banyo Sayısı</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="minBathrooms" className="text-sm font-medium">Min</Label>
                    <Input
                      id="minBathrooms"
                      type="number"
                      placeholder="0"
                      value={minBathrooms}
                      onChange={(e) => setMinBathrooms(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="maxBathrooms" className="text-sm font-medium">Max</Label>
                    <Input
                      id="maxBathrooms"
                      type="number"
                      placeholder="∞"
                      value={maxBathrooms}
                      onChange={(e) => setMaxBathrooms(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>

              {/* Price Filters */}
              <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
                <h3 className="font-semibold text-lg">Fiyat (TL)</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="minPrice" className="text-sm font-medium">Min</Label>
                    <Input
                      id="minPrice"
                      type="number"
                      placeholder="0"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="maxPrice" className="text-sm font-medium">Max</Label>
                    <Input
                      id="maxPrice"
                      type="number"
                      placeholder="∞"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>

              {/* Category Filter */}
              <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
                <h3 className="font-semibold text-lg">Kategori</h3>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tümü</SelectItem>
                    <SelectItem value="apartment">Daire</SelectItem>
                    <SelectItem value="villa">Villa</SelectItem>
                    <SelectItem value="office">Ofis</SelectItem>
                    <SelectItem value="land">Arsa</SelectItem>
                  </SelectContent>
                </Select>
              </div>

            </div>
            
            {/* Fixed Action Buttons */}
            <div className="p-6 pt-4 border-t bg-background">
              <div className="flex gap-4">
                <Button onClick={clearFilters} variant="outline" className="flex-1 py-3">
                  <X className="h-4 w-4 mr-2" />
                  Temizle
                </Button>
                <Button onClick={() => setIsFilterOpen(false)} className="flex-1 py-3">
                  Uygula
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        <div className="flex-1">
          <Label className="text-sm mb-2 block">Sıralama</Label>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">En Yeni</SelectItem>
              <SelectItem value="price-asc">Fiyat (Düşük - Yüksek)</SelectItem>
              <SelectItem value="price-desc">Fiyat (Yüksek - Düşük)</SelectItem>
              <SelectItem value="area-desc">Alan (Büyük - Küçük)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results */}
      <div className="mb-4 text-sm text-muted-foreground">{filteredProperties.length} ilan bulundu</div>

      {filteredProperties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-lg text-muted-foreground">Aradığınız kriterlere uygun ilan bulunamadı.</p>
        </div>
      )}
    </div>
  )
}
