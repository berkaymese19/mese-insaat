import Link from "next/link"
import Image from "next/image"
import type { Property } from "@/lib/properties"
import { Bed, Bath, Maximize, MapPin, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface PropertyCardProps {
  property: Property
}

export function PropertyCard({ property }: PropertyCardProps) {
  const typeLabels = {
    sale: "Satılık",
    rent: "Kiralık",
    project: "Proje",
  }

  const formatPrice = (price: number, type: string) => {
    if (type === "rent") {
      return `${price.toLocaleString("tr-TR")} ₺/ay`
    }
    return `${price.toLocaleString("tr-TR")} ₺`
  }

  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg">
      <Link href={`/property/${property.id}`}>
        <div className="relative h-64 overflow-hidden">
          <Image
            src={property.images[0] || "/placeholder.svg"}
            alt={property.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
            {typeLabels[property.type]}
          </Badge>
        </div>
      </Link>

      <CardContent className="p-4">
        <Link href={`/property/${property.id}`}>
          <h3 className="font-semibold text-lg mb-2 line-clamp-1 group-hover:text-primary transition-colors">
            {property.title}
          </h3>
        </Link>

        <div className="flex items-center gap-1 text-muted-foreground text-sm mb-3">
          <MapPin className="h-4 w-4" />
          <span>{property.location}</span>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{property.description}</p>

        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          {property.bedrooms && (
            <div className="flex items-center gap-1">
              <Bed className="h-4 w-4" />
              <span>{property.bedrooms}</span>
            </div>
          )}
          {property.bathrooms && (
            <div className="flex items-center gap-1">
              <Bath className="h-4 w-4" />
              <span>{property.bathrooms}</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <Maximize className="h-4 w-4" />
            <span>{property.area} m²</span>
          </div>
        </div>

        <div className="text-2xl font-bold text-primary">{formatPrice(property.price, property.type)}</div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button asChild variant="outline" className="w-full gap-2 bg-transparent">
          <a href={`tel:${property.phone}`}>
            <Phone className="h-4 w-4" />
            Ara
          </a>
        </Button>
      </CardFooter>
    </Card>
  )
}
