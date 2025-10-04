export type PropertyType = "sale" | "rent" | "project"
export type PropertyCategory = "apartment" | "villa" | "office" | "land"

export interface Property {
  id: string
  title: string
  description: string
  type: PropertyType
  category: PropertyCategory
  price: number
  location: string
  city: string
  bedrooms?: number
  bathrooms?: number
  area: number
  images: string[]
  features: string[]
  phone: string
  featured?: boolean
  active?: boolean
}

export const properties: Property[] = [
  {
    id: "1",
    title: "Çorum Merkez Lüks Villa",
    description:
      "Çorum şehir merkezinde, modern mimariye sahip lüks villa. Geniş bahçe, özel havuz ve akıllı ev sistemleri ile donatılmıştır.",
    type: "sale",
    category: "villa",
    price: 2800000,
    location: "Çorum Merzifon",
    city: "Çorum",
    bedrooms: 5,
    bathrooms: 4,
    area: 450,
    images: ["/luxury-villa-sea-view-modern-architecture.jpg", "/villa-interior-luxury-living-room.jpg", "/villa-pool-garden-outdoor.jpg"],
    features: ["Geniş Bahçe", "Özel Havuz", "Akıllı Ev", "Kapalı Otopark", "Güvenlik"],
    phone: "+90 532 123 4567",
    featured: true,
    active: true,
  },
  {
    id: "2",
    title: "Merzifon Merkezi Modern Daire",
    description:
      "Merzifon şehir merkezinde, hastane ve okullara yakın, yeni yapılmış modern daire. Tüm ihtiyaçlarınıza yakın konumda.",
    type: "rent",
    category: "apartment",
    price: 8500,
    location: "Merzifon, Cumhuriyet Mahallesi",
    city: "Çorum",
    bedrooms: 3,
    bathrooms: 2,
    area: 140,
    images: ["/modern-apartment-living-room-city-view.jpg", "/modern-kitchen-white-cabinets.jpg", "/modern-bedroom-minimalist.jpg"],
    features: ["Asansör", "Otopark", "Balkon", "Doğalgaz", "Güvenlik"],
    phone: "+90 532 123 4567",
    featured: true,
    active: true,
  },
  {
    id: "3",
    title: "Mese Residence Çorum Projesi",
    description:
      "Mese İnşaat'ın Çorum'daki yeni projesi. Modern yaşam alanları, sosyal tesisler ve güvenlikli site içerisinde konforlu yaşam.",
    type: "project",
    category: "apartment",
    price: 1200000,
    location: "Çorum, Yenidoğan Mahallesi",
    city: "Çorum",
    bedrooms: 3,
    bathrooms: 2,
    area: 125,
    images: ["/modern-residential-complex.png", "/residential-complex-pool-facilities.jpg", "/modern-apartment-interior-new-construction.jpg"],
    features: ["Yüzme Havuzu", "Spor Salonu", "Çocuk Parkı", "Güvenlik", "Otopark"],
    phone: "+90 532 123 4567",
    featured: true,
    active: true,
  },
  {
    id: "4",
    title: "Merzifon İş Merkezi Ofis",
    description:
      "Merzifon iş merkezinde, prestijli plaza içerisinde kiralık ofis. Toplantı odaları ve modern altyapı ile donatılmış.",
    type: "rent",
    category: "office",
    price: 12000,
    location: "Merzifon, İstiklal Caddesi",
    city: "Çorum",
    area: 200,
    images: ["/modern-office-space-glass-windows.jpg", "/office-meeting-room-modern.jpg", "/office-workspace-desks.jpg"],
    features: ["7/24 Güvenlik", "Otopark", "Jeneratör", "Klima", "Asansör"],
    phone: "+90 532 123 4567",
    active: true,
  },
  {
    id: "5",
    title: "Çorum Yatırımlık Arsa",
    description: "Çorum-Ankara karayolu üzerinde, imar planlı arsa. Yatırım için ideal konum.",
    type: "sale",
    category: "land",
    price: 1800000,
    location: "Çorum, Çamlıca Mahallesi",
    city: "Çorum",
    area: 1000,
    images: ["/empty-land-plot-investment.jpg", "/land-aerial-view.jpg", "/land-plot-road-access.jpg"],
    features: ["İmar Planlı", "Ana Yol Cepheli", "Elektrik", "Su"],
    phone: "+90 532 123 4567",
    active: true,
  },
  {
    id: "6",
    title: "Merzifon Bahçeli Müstakil Ev",
    description: "Merzifon'un sakin bir mahallesinde, geniş bahçeli müstakil ev. Aile yaşamı için ideal.",
    type: "sale",
    category: "villa",
    price: 1950000,
    location: "Merzifon, Gülveren Mahallesi",
    city: "Çorum",
    bedrooms: 4,
    bathrooms: 3,
    area: 280,
    images: ["/detached-house-garden-family-home.jpg", "/house-interior-cozy-living-room.jpg", "/house-backyard-garden.jpg"],
    features: ["Bahçe", "Otopark", "Şömine", "Teras", "Güvenlik"],
    phone: "+90 532 123 4567",
    active: true,
  },
  {
    id: "7",
    title: "Çorum Üniversite Yakını Stüdyo",
    description: "Çorum Hitit Üniversitesi'ne yakın, eşyalı stüdyo daire. Öğrenciler için uygun fiyatlı.",
    type: "rent",
    category: "apartment",
    price: 4500,
    location: "Çorum, Üniversite Mahallesi",
    city: "Çorum",
    bedrooms: 1,
    bathrooms: 1,
    area: 45,
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    features: ["Eşyalı", "İnternet", "Doğalgaz", "Asansör"],
    phone: "+90 532 123 4567",
    active: true,
  },
  {
    id: "8",
    title: "Mese Park Merzifon Evleri",
    description: "Merzifon'da yeşil alanlarla çevrili, modern villa konseptli proje. Doğayla iç içe yaşam.",
    type: "project",
    category: "villa",
    price: 2200000,
    location: "Merzifon, Yeşiltepe Mahallesi",
    city: "Çorum",
    bedrooms: 4,
    bathrooms: 3,
    area: 320,
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    features: ["Yeşil Alan", "Güvenlik", "Sosyal Tesis", "Otopark", "Çocuk Parkı"],
    phone: "+90 532 123 4567",
    active: true,
  },
]

export function getPropertyById(id: string): Property | undefined {
  return properties.find((p) => p.id === id)
}

export function getPropertiesByType(type?: PropertyType): Property[] {
  if (!type) return properties
  return properties.filter((p) => p.type === type)
}

export function getFeaturedProperties(): Property[] {
  return properties.filter((p) => p.featured)
}
