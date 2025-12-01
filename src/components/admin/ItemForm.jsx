import React, { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { useCollection } from '@/context/CollectionContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { ArrowLeft, Save } from 'lucide-react'
import { toast } from 'sonner'

const ItemForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addItem, updateItem, getItem } = useCollection()
  const isEditMode = !!id

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    period: '',
    price: '',
    description: '',
    images: ['', '', '', ''],
    featured: false
  })

  useEffect(() => {
    if (isEditMode) {
      const item = getItem(Number(id))
      if (item) {
        setFormData({
          title: item.title,
          category: item.category,
          period: item.period,
          price: item.price,
          description: item.description,
          images: [...item.images, '', '', '', ''].slice(0, 4),
          featured: item.featured
        })
      }
    }
  }, [id, isEditMode, getItem])

  const categories = [
    { value: 'furniture', label: 'Period Furniture' },
    { value: 'porcelain', label: 'Ceramics & Porcelain' },
    { value: 'silver', label: 'Silver & Sheffield Plate' },
    { value: 'prints', label: 'Antique Prints' },
    { value: 'sculpture', label: 'Sculpture & Bronzes' },
    { value: 'decorative', label: 'Decorative Arts' }
  ]

  const periods = [
    { value: 'georgian', label: 'Georgian (1714-1830)' },
    { value: 'regency', label: 'Regency (1811-1820)' },
    { value: 'victorian', label: 'Victorian (1837-1901)' },
    { value: 'edwardian', label: 'Edwardian (1901-1910)' }
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (index, value) => {
    const newImages = [...formData.images]
    newImages[index] = value
    setFormData(prev => ({ ...prev, images: newImages }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Filter out empty image URLs
    const filteredImages = formData.images.filter(img => img.trim() !== '')
    
    if (filteredImages.length === 0) {
      toast.error('Please add at least one image URL')
      return
    }

    const itemData = {
      ...formData,
      images: filteredImages
    }

    if (isEditMode) {
      updateItem(Number(id), itemData)
      toast.success('Item updated successfully')
    } else {
      addItem(itemData)
      toast.success('Item added successfully')
    }

    navigate('/admin/collection')
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4">
            <Link to="/admin/collection">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">
              {isEditMode ? 'Edit Item' : 'Add New Item'}
            </h1>
          </div>
        </div>
      </header>

      {/* Form */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Item Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g., Georgian Mahogany Chest of Drawers"
                  required
                />
              </div>

              {/* Category and Period */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select 
                    value={formData.category} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(cat => (
                        <SelectItem key={cat.value} value={cat.value}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="period">Period *</Label>
                  <Select 
                    value={formData.period} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, period: value }))}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                      {periods.map(period => (
                        <SelectItem key={period.value} value={period.value}>
                          {period.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Price */}
              <div className="space-y-2">
                <Label htmlFor="price">Price *</Label>
                <Input
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="e.g., £2,850"
                  required
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Detailed description of the item..."
                  rows={4}
                  required
                />
              </div>

              {/* Images */}
              <div className="space-y-4">
                <Label>Images (at least 1 required)</Label>
                {formData.images.map((image, index) => (
                  <div key={index} className="space-y-2">
                    <Label htmlFor={`image-${index}`} className="text-sm text-muted-foreground">
                      Image URL {index + 1} {index === 0 && '*'}
                    </Label>
                    <Input
                      id={`image-${index}`}
                      value={image}
                      onChange={(e) => handleImageChange(index, e.target.value)}
                      placeholder="https://example.com/image.jpg or /src/assets/image.jpg"
                      required={index === 0}
                    />
                  </div>
                ))}
                <p className="text-xs text-muted-foreground">
                  Enter full URLs or relative paths to existing images
                </p>
              </div>

              {/* Featured Toggle */}
              <div className="flex items-center space-x-2">
                <Switch
                  id="featured"
                  checked={formData.featured}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, featured: checked }))}
                />
                <Label htmlFor="featured" className="cursor-pointer">
                  Featured Item
                </Label>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end space-x-2">
                <Link to="/admin/collection">
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </Link>
                <Button type="submit">
                  <Save className="h-4 w-4 mr-2" />
                  {isEditMode ? 'Update Item' : 'Add Item'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

export default ItemForm
