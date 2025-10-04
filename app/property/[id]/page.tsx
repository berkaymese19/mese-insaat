import { notFound } from "next/navigation"
import Image from "next/image"
import { getPropertyById } from "@/lib/properties"
import { Bed, Bath, Maximize, MapPin, Phone, Mail, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

export default function PropertyDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const property = getPropertyById(params.id)

  if (!property) {
    notFound()
  }

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
    <div className="container mx-auto px-4 py-8">
      {/* Image Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="relative h-96 md:h-[600px] rounded-lg overflow-hidden">
          <Image
            src={property.images[0] || "/placeholder.svg"}
            alt={property.title}
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          {property.images.slice(1).map((image, index) => (
            <div key={index} className="relative h-44 md:h-[290px] rounded-lg overflow-hidden">
              <Image
                src={image || "/placeholder.svg"}
                alt={`${property.title} - ${index + 2}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <Badge className="mb-3">{typeLabels[property.type]}</Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{property.title}</h1>
            <div className="flex items-center gap-2 text-muted-foreground mb-4">
              <MapPin className="h-5 w-5" />
              <span className="text-lg">
                {property.location}, {property.city}
              </span>
            </div>
            <div className="text-3xl md:text-4xl font-bold text-primary">
              {formatPrice(property.price, property.type)}
            </div>
          </div>

          {/* Property Stats */}
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {property.bedrooms && (
                  <div className="text-center">
                    <Bed className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <div className="font-semibold">{property.bedrooms}</div>
                    <div className="text-sm text-muted-foreground">Yatak Odası</div>
                  </div>
                )}
                {property.bathrooms && (
                  <div className="text-center">
                    <Bath className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <div className="font-semibold">{property.bathrooms}</div>
                    <div className="text-sm text-muted-foreground">Banyo</div>
                  </div>
                )}
                <div className="text-center">
                  <Maximize className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <div className="font-semibold">{property.area} m²</div>
                  <div className="text-sm text-muted-foreground">Alan</div>
                </div>
                <div className="text-center">
                  <MapPin className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <div className="font-semibold">{property.city}</div>
                  <div className="text-sm text-muted-foreground">Şehir</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Description */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Açıklama</h2>
            <p className="text-muted-foreground leading-relaxed">{property.description}</p>
          </div>

          {/* Features */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Özellikler</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {property.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Card */}
        <div className="lg:col-span-1">
          <Card className="sticky top-20">
            <CardContent className="p-6 space-y-4">
              <h3 className="text-xl font-bold">İletişime Geçin</h3>
              <p className="text-sm text-muted-foreground">
                Bu ilan hakkında detaylı bilgi almak için bizimle iletişime geçin.
              </p>

              <div className="space-y-3">
                <Button asChild className="w-full gap-2" size="lg">
                  <a href={`tel:${property.phone}`}>
                    <Phone className="h-5 w-5" />
                    Hemen Ara
                  </a>
                </Button>

                <Button asChild variant="outline" className="w-full gap-2 bg-transparent" size="lg">
                  <a href={`mailto:info@meseinsaat.com?subject=${encodeURIComponent(property.title)}`}>
                    <Mail className="h-5 w-5" />
                    E-posta Gönder
                  </a>
                </Button>

                <Button variant="outline" className="w-full gap-2 bg-transparent" size="lg">
                  <Share2 className="h-5 w-5" />
                  Paylaş
                </Button>
              </div>

              <div className="pt-4 border-t space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">İlan No:</span>
                  <span className="font-medium">{property.id}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Kategori:</span>
                  <span className="font-medium capitalize">{property.category}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
