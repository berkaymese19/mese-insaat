import Link from "next/link"
import { ArrowRight, Building2, Key, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SearchBar } from "@/components/search-bar"
import { PropertyCard } from "@/components/property-card"
import { getFeaturedProperties } from "@/lib/properties"

export default function HomePage() {
  const featuredProperties = getFeaturedProperties()

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        {/* Background Image with Blur */}
        <div className="absolute inset-0 z-0">
          <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url(/modern-residential-complex.png)',
              filter: 'blur(2px)',
              transform: 'scale(1.1)'
            }}
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold text-balance text-white drop-shadow-lg">
              Hayalinizdeki Evi <span className="text-white">Korkmaz İnşaat</span> ile Bulun
            </h1>
            <p className="text-lg md:text-xl text-white/90 text-pretty drop-shadow-md">
            <span className="text-red-500">Satılık, kiralık ve proje evleri</span> arasından size en uygun olanı keşfedin
            </p>

            <div className="pt-6">
              <SearchBar />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-b bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center space-y-2">
              <div className="flex justify-center">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Building2 className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div className="text-3xl font-bold text-primary">500+</div>
              <div className="text-sm text-muted-foreground">Tamamlanan Proje</div>
            </div>

            <div className="text-center space-y-2">
              <div className="flex justify-center">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Key className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div className="text-3xl font-bold text-primary">1000+</div>
              <div className="text-sm text-muted-foreground">Mutlu Müşteri</div>
            </div>

            <div className="text-center space-y-2">
              <div className="flex justify-center">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Home className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div className="text-3xl font-bold text-primary">25+</div>
              <div className="text-sm text-muted-foreground">Yıllık Deneyim</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-red-500">bircan</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">Öne Çıkan İlanlar</h2>
              <p className="text-muted-foreground">En popüler ve yeni eklenen gayrimenkuller</p>
            </div>
            <Button asChild variant="outline" className="gap-2 bg-transparent">
              <Link href="/properties">
                Tümünü Gör
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Kategoriler</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Link
              href="/properties/sale"
              className="group relative overflow-hidden rounded-lg bg-card border p-8 text-center hover:shadow-lg transition-all"
            >
              <div className="space-y-4">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto group-hover:bg-primary/20 transition-colors">
                  <Building2 className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Satılık Evler</h3>
                <p className="text-sm text-muted-foreground">Hayalinizdeki evi satın alın</p>
                <ArrowRight className="h-5 w-5 mx-auto text-primary group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link
              href="/properties/rent"
              className="group relative overflow-hidden rounded-lg bg-card border p-8 text-center hover:shadow-lg transition-all"
            >
              <div className="space-y-4">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto group-hover:bg-primary/20 transition-colors">
                  <Key className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Kiralık Evler</h3>
                <p className="text-sm text-muted-foreground">Uygun fiyatlı kiralık seçenekler</p>
                <ArrowRight className="h-5 w-5 mx-auto text-primary group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link
              href="/properties/project"
              className="group relative overflow-hidden rounded-lg bg-card border p-8 text-center hover:shadow-lg transition-all"
            >
              <div className="space-y-4">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto group-hover:bg-primary/20 transition-colors">
                  <Home className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Proje Evleri</h3>
                <p className="text-sm text-muted-foreground">Yeni inşa edilen projeler</p>
                <ArrowRight className="h-5 w-5 mx-auto text-primary group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
