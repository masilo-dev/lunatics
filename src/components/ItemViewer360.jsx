import React, { useState, useRef, useEffect } from 'react'
import { RotateCw, RotateCcw, ZoomIn, ZoomOut, RotateCcw as Reset } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const ItemViewer360 = ({ images, title, description }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isRotating, setIsRotating] = useState(false)
  const [rotationSpeed, setRotationSpeed] = useState(100)
  const [zoom, setZoom] = useState(1)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [rotation, setRotation] = useState(0)
  const intervalRef = useRef(null)
  const containerRef = useRef(null)

  // Auto-rotation effect
  useEffect(() => {
    if (isRotating) {
      intervalRef.current = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length)
      }, rotationSpeed)
    } else {
      clearInterval(intervalRef.current)
    }

    return () => clearInterval(intervalRef.current)
  }, [isRotating, rotationSpeed, images.length])

  // Handle manual rotation with mouse drag
  const handleMouseDown = (e) => {
    setIsDragging(true)
    setDragStart({ x: e.clientX, y: e.clientY })
    setIsRotating(false)
  }

  const handleMouseMove = (e) => {
    if (!isDragging) return

    const deltaX = e.clientX - dragStart.x
    const sensitivity = 2
    const imageChange = Math.floor(Math.abs(deltaX) / sensitivity)

    if (imageChange > 0) {
      if (deltaX > 0) {
        setCurrentImageIndex((prev) => (prev + imageChange) % images.length)
      } else {
        setCurrentImageIndex((prev) => (prev - imageChange + images.length) % images.length)
      }
      setDragStart({ x: e.clientX, y: e.clientY })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  // Touch events for mobile
  const handleTouchStart = (e) => {
    const touch = e.touches[0]
    setIsDragging(true)
    setDragStart({ x: touch.clientX, y: touch.clientY })
    setIsRotating(false)
  }

  const handleTouchMove = (e) => {
    if (!isDragging) return
    e.preventDefault()

    const touch = e.touches[0]
    const deltaX = touch.clientX - dragStart.x
    const sensitivity = 3
    const imageChange = Math.floor(Math.abs(deltaX) / sensitivity)

    if (imageChange > 0) {
      if (deltaX > 0) {
        setCurrentImageIndex((prev) => (prev + imageChange) % images.length)
      } else {
        setCurrentImageIndex((prev) => (prev - imageChange + images.length) % images.length)
      }
      setDragStart({ x: touch.clientX, y: touch.clientY })
    }
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  const toggleAutoRotation = () => {
    setIsRotating(!isRotating)
  }

  const rotateLeft = () => {
    setIsRotating(false)
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const rotateRight = () => {
    setIsRotating(false)
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.2, 3))
  }

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.2, 0.5))
  }

  const resetView = () => {
    setZoom(1)
    setRotation(0)
    setCurrentImageIndex(0)
    setIsRotating(false)
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent className="p-6">
        <div className="text-center mb-4">
          <h3 className="text-xl font-semibold heading-serif">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>

        {/* 360 Viewer Container */}
        <div 
          ref={containerRef}
          className="relative bg-gray-50 rounded-lg overflow-hidden mb-4 cursor-grab active:cursor-grabbing"
          style={{ height: '400px' }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <img
            src={images[currentImageIndex]}
            alt={`${title} - View ${currentImageIndex + 1}`}
            className="w-full h-full object-contain transition-transform duration-200"
            style={{ 
              transform: `scale(${zoom}) rotate(${rotation}deg)`,
              userSelect: 'none',
              pointerEvents: 'none'
            }}
            draggable={false}
          />
          
          {/* Rotation indicator */}
          <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
            {currentImageIndex + 1} / {images.length}
          </div>

          {/* Auto-rotation indicator */}
          {isRotating && (
            <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm flex items-center space-x-1">
              <RotateCw className="h-3 w-3 animate-spin" />
              <span>Auto</span>
            </div>
          )}

          {/* Zoom indicator */}
          {zoom !== 1 && (
            <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
              {Math.round(zoom * 100)}%
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="flex flex-wrap justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={rotateLeft}
            className="flex items-center space-x-1"
          >
            <RotateCcw className="h-4 w-4" />
            <span className="hidden sm:inline">Left</span>
          </Button>

          <Button
            variant={isRotating ? "default" : "outline"}
            size="sm"
            onClick={toggleAutoRotation}
            className="flex items-center space-x-1"
          >
            <RotateCw className={`h-4 w-4 ${isRotating ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">{isRotating ? 'Stop' : 'Auto'}</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={rotateRight}
            className="flex items-center space-x-1"
          >
            <RotateCw className="h-4 w-4" />
            <span className="hidden sm:inline">Right</span>
          </Button>

          <div className="w-px bg-border mx-1"></div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleZoomOut}
            disabled={zoom <= 0.5}
          >
            <ZoomOut className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleZoomIn}
            disabled={zoom >= 3}
          >
            <ZoomIn className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={resetView}
          >
            <Reset className="h-4 w-4" />
          </Button>
        </div>

        {/* Speed Control for Auto-rotation */}
        {isRotating && (
          <div className="mt-4 text-center">
            <label className="text-sm text-muted-foreground mb-2 block">Rotation Speed</label>
            <input
              type="range"
              min="50"
              max="500"
              step="50"
              value={rotationSpeed}
              onChange={(e) => setRotationSpeed(Number(e.target.value))}
              className="w-32"
            />
            <div className="text-xs text-muted-foreground mt-1">
              {rotationSpeed}ms
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="mt-4 text-center text-sm text-muted-foreground">
          <p>Drag to rotate manually • Use controls for auto-rotation and zoom</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default ItemViewer360

