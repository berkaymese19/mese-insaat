"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function SearchBar() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [propertyType, setPropertyType] = useState<string>("all")

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (searchQuery) params.set("q", searchQuery)
    if (propertyType !== "all") params.set("type", propertyType)

    router.push(`/properties?${params.toString()}`)
  }

  return (
    <div className="flex flex-col sm:flex-row gap-3 w-full max-w-4xl mx-auto">
      <Input
        placeholder="Konum, şehir veya özellik ara..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        className="flex-1"
      />

      <Select value={propertyType} onValueChange={setPropertyType}>
        <SelectTrigger className="w-full sm:w-48">
          <SelectValue placeholder="Tür seçin" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tümü</SelectItem>
          <SelectItem value="sale">Satılık</SelectItem>
          <SelectItem value="rent">Kiralık</SelectItem>
          <SelectItem value="project">Projeler</SelectItem>
        </SelectContent>
      </Select>

      <Button onClick={handleSearch} className="gap-2">
        <Search className="h-4 w-4" />
        Ara
      </Button>
    </div>
  )
}
