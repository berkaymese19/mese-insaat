"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface ImageCarouselProps {
  images: string[]
  title: string
  className?: string
}

export function ImageCarousel({ images, title, className }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const goToImage = (index: number) => {
    setCurrentIndex(index)
  }

  const openFullscreen = () => {
    setIsFullscreen(true)
  }

  const closeFullscreen = () => {
    setIsFullscreen(false)
  }

  if (images.length === 0) {
    return (
      <div className={cn("relative h-96 bg-muted rounded-lg flex items-center justify-center", className)}>
        <p className="text-muted-foreground">Resim bulunamadı</p>
      </div>
    )
  }

  return (
    <>
      {/* Main Carousel */}
      <div className={cn("relative group", className)}>
        {/* Main Image */}
        <div className="relative h-96 md:h-[500px] lg:h-[600px] rounded-lg overflow-hidden bg-muted">
          <Image
            src={images[currentIndex] || "/placeholder.svg"}
            alt={`${title} - ${currentIndex + 1}`}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
            priority={currentIndex === 0}
          />
          
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          
          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </>
          )}
          
          {/* Image Counter */}
          <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
            {currentIndex + 1} / {images.length}
          </div>
          
          {/* Fullscreen Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={openFullscreen}
            className="absolute bottom-4 right-4 bg-black/50 hover:bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Maximize2 className="h-5 w-5" />
          </Button>
        </div>

        {/* Thumbnail Navigation */}
        {images.length > 1 && (
          <div className="mt-4">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => goToImage(index)}
                  className={cn(
                    "relative flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all",
                    currentIndex === index
                      ? "border-primary ring-2 ring-primary/20"
                      : "border-transparent hover:border-muted-foreground/50"
                  )}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${title} thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center p-4">
            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={closeFullscreen}
              className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white"
            >
              <X className="h-6 w-6" />
            </Button>
            
            {/* Fullscreen Image */}
            <div className="relative max-w-7xl max-h-full">
              <Image
                src={images[currentIndex] || "/placeholder.svg"}
                alt={`${title} - ${currentIndex + 1}`}
                width={1200}
                height={800}
                className="object-contain max-h-[90vh]"
              />
            </div>
            
            {/* Fullscreen Navigation */}
            {images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
                >
                  <ChevronLeft className="h-8 w-8" />
                </Button>
                
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
                >
                  <ChevronRight className="h-8 w-8" />
                </Button>
              </>
            )}
            
            {/* Fullscreen Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-lg">
              {currentIndex + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
