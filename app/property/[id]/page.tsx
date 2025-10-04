"use client"

import { useState } from "react"
import { notFound } from "next/navigation"
import Image from "next/image"
import { getPropertyById } from "@/lib/properties"
import { Bed, Bath, Maximize, MapPin, Phone, Mail, Share2, Heart, MessageCircle, Star, ThumbsUp, ThumbsDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { ImageCarousel } from "@/components/image-carousel"

interface Comment {
  id: string
  author: string
  content: string
  rating?: number
  createdAt: string
  likes: number
}

export default function PropertyDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const property = getPropertyById(params.id)

  if (!property) {
    notFound()
  }

  // State for interactions
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(42)
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      author: "Ahmet Yılmaz",
      content: "Çok güzel bir ev! Konumu harika, iç tasarımı da çok modern. Kesinlikle tavsiye ederim.",
      rating: 5,
      createdAt: "2024-01-15",
      likes: 8
    },
    {
      id: "2", 
      author: "Fatma Demir",
      content: "Fiyat performans açısından çok iyi. Bu bölgede bu fiyata bu kalitede ev bulmak zor.",
      rating: 4,
      createdAt: "2024-01-20",
      likes: 5
    },
    {
      id: "3",
      author: "Mehmet Kaya", 
      content: "Proje çok güzel görünüyor. İnşaat kalitesi nasıl acaba?",
      rating: 4,
      createdAt: "2024-01-25",
      likes: 3
    }
  ])
  const [newComment, setNewComment] = useState("")
  const [newCommentAuthor, setNewCommentAuthor] = useState("")
  const [newCommentRating, setNewCommentRating] = useState(5)

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1)
  }

  const handleAddComment = () => {
    if (!newComment.trim() || !newCommentAuthor.trim()) return

    const comment: Comment = {
      id: (comments.length + 1).toString(),
      author: newCommentAuthor,
      content: newComment,
      rating: newCommentRating,
      createdAt: new Date().toISOString().split('T')[0],
      likes: 0
    }

    setComments(prev => [comment, ...prev])
    setNewComment("")
    setNewCommentAuthor("")
    setNewCommentRating(5)
  }

  const handleCommentLike = (commentId: string) => {
    setComments(prev => 
      prev.map(comment => 
        comment.id === commentId 
          ? { ...comment, likes: comment.likes + 1 }
          : comment
      )
    )
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
      {/* Image Carousel */}
      <div className="mb-8">
        <ImageCarousel 
          images={property.images} 
          title={property.title}
          className="w-full"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <div className="flex items-center justify-between mb-3">
              <Badge>{typeLabels[property.type]}</Badge>
              <div className="flex items-center gap-4">
                <Button
                  variant={isLiked ? "default" : "outline"}
                  size="sm"
                  onClick={handleLike}
                  className="gap-2"
                >
                  <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
                  {likeCount} Beğeni
                </Button>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MessageCircle className="h-4 w-4" />
                  {comments.length} Yorum
                </div>
              </div>
            </div>
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

          {/* Comments and Reviews */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Yorumlar ve Değerlendirmeler</h2>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {comments.reduce((acc, comment) => acc + (comment.rating || 0), 0) / comments.length || 0}/5
                </span>
              </div>
            </div>

            {/* Add Comment Form */}
            <Card>
              <CardHeader>
                <CardTitle>Yorumunuzu Paylaşın</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="author">Adınız</Label>
                    <Input
                      id="author"
                      placeholder="Adınızı girin"
                      value={newCommentAuthor}
                      onChange={(e) => setNewCommentAuthor(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="rating">Değerlendirme</Label>
                    <div className="flex items-center gap-2 mt-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => setNewCommentRating(star)}
                          className="transition-colors"
                        >
                          <Star 
                            className={`h-5 w-5 ${
                              star <= newCommentRating 
                                ? 'fill-yellow-400 text-yellow-400' 
                                : 'text-gray-300'
                            }`} 
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div>
                  <Label htmlFor="comment">Yorumunuz</Label>
                  <Textarea
                    id="comment"
                    placeholder="Bu ilan hakkında düşüncelerinizi paylaşın..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    rows={4}
                  />
                </div>
                <Button onClick={handleAddComment} className="gap-2">
                  <MessageCircle className="h-4 w-4" />
                  Yorum Paylaş
                </Button>
              </CardContent>
            </Card>

            {/* Comments List */}
            <div className="space-y-4">
              {comments.map((comment) => (
                <Card key={comment.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>
                            {comment.author.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-semibold">{comment.author}</h4>
                          <div className="flex items-center gap-2">
                            {comment.rating && (
                              <div className="flex items-center gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star 
                                    key={star}
                                    className={`h-3 w-3 ${
                                      star <= comment.rating! 
                                        ? 'fill-yellow-400 text-yellow-400' 
                                        : 'text-gray-300'
                                    }`} 
                                  />
                                ))}
                              </div>
                            )}
                            <span className="text-xs text-muted-foreground">
                              {comment.createdAt}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCommentLike(comment.id)}
                        className="gap-1"
                      >
                        <ThumbsUp className="h-3 w-3" />
                        {comment.likes}
                      </Button>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {comment.content}
                    </p>
                  </CardContent>
                </Card>
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
