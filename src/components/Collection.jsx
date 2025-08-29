import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search, Filter, Eye, RotateCw } from 'lucide-react'
import ItemViewer360 from './ItemViewer360'

// Import images for different categories
import furnitureImage1 from '../assets/Mt8UIYp8PTe2.jpg'
import furnitureImage2 from '../assets/w7pz82Ruagn0.jpg'
import furnitureImage3 from '../assets/3QAvanu56aUE.jpg'
import porcelainImage1 from '../assets/3Ve7fIDsNkcE.jpg'
import porcelainImage2 from '../assets/7vfQiYvTpxe7.jpg'
import porcelainImage3 from '../assets/AOXOUD7a41Pu.jpg'
import silverImage1 from '../assets/CUzmGlTD6XgC.jpg'
import silverImage2 from '../assets/nwv9j9FK4ih3.jpg'
import silverImage3 from '../assets/wMisKx9aOxtX.jpg'
import printsImage1 from '../assets/gSXtuMGRIxnv.jpg'
import printsImage2 from '../assets/Z31aNeNDuGal.jpg'
import printsImage3 from '../assets/OHNjl9MMA3zE.jpg'
import sculptureImage1 from '../assets/IC2twac2TJSu.jpg'
import sculptureImage2 from '../assets/9FMV67VjRztJ.jpg'
import sculptureImage3 from '../assets/Unr6lpdoQf9y.jpg'
import decorativeImage1 from '../assets/T1Iq0trCBhRF.jpg'
import decorativeImage2 from '../assets/CcGpx6xQiJqw.jpg'
import decorativeImage3 from '../assets/t2w5tmjgermH.jpg'

const Collection = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedPeriod, setSelectedPeriod] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedItem, setSelectedItem] = useState(null)

  // Sample collection data with multiple images for 360 view
  const collectionItems = [
    {
      id: 1,
      title: 'Georgian Mahogany Chest of Drawers',
      category: 'furniture',
      period: 'georgian',
      price: '£2,850',
      description: 'Fine Georgian mahogany chest of drawers, circa 1780. Excellent condition with original brass handles.',
      images: [furnitureImage1, '/src/assets/tTImFRDPoRDj.jpeg', '/src/assets/sfeOCW3PpbdO.jpg', '/src/assets/tiu3erQLS4iG.jpg'],
      featured: true
    },
    {
      id: 2,
      title: 'Worcester Porcelain Tea Service',
      category: 'porcelain',
      period: 'georgian',
      price: '£1,650',
      description: 'Complete Worcester porcelain tea service with hand-painted floral decoration, circa 1770.',
      images: ['/src/assets/3Ve7fIDsNkcE.jpg', '/src/assets/p6GYsWrjGQ0e.jpg', '/src/assets/ytfV1HOvkAPe.jpg', '/src/assets/SVOvjw1Lbrk6.jpg'],
      featured: true
    },
    {
      id: 3,
      title: 'Georgian Silver Teapot',
      category: 'silver',
      period: 'georgian',
      price: '£3,200',
      description: 'Elegant Georgian silver teapot with engraved family crest, hallmarked London 1799.',
      images: [silverImage1, silverImage2, silverImage3],
      featured: false
    },
    {
      id: 4,
      title: 'Antique Map of Great Britain',
      category: 'prints',
      period: 'victorian',
      price: '£450',
      description: 'Hand-colored antique map of Great Britain, published circa 1850. Excellent condition.',
      images: [printsImage1, printsImage2, printsImage3],
      featured: false
    },
    {
      id: 5,
      title: 'Regency Bronze Sphinx',
      category: 'sculpture',
      period: 'regency',
      price: '£4,500',
      description: 'Magnificent Regency bronze sphinx on marble base, Grand Tour souvenir circa 1820.',
      images: [sculptureImage1, sculptureImage2, sculptureImage3],
      featured: true
    },
    {
      id: 6,
      title: 'Victorian Decorative Box',
      category: 'decorative',
      period: 'victorian',
      price: '£680',
      description: 'Ornate Victorian decorative box with intricate metalwork and enamel details.',
      images: [decorativeImage1, decorativeImage2, decorativeImage3],
      featured: false
    }
  ]

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'furniture', label: 'Period Furniture' },
    { value: 'porcelain', label: 'Ceramics & Porcelain' },
    { value: 'silver', label: 'Silver & Sheffield Plate' },
    { value: 'prints', label: 'Antique Prints' },
    { value: 'sculpture', label: 'Sculpture & Bronzes' },
    { value: 'decorative', label: 'Decorative Arts' }
  ]

  const periods = [
    { value: 'all', label: 'All Periods' },
    { value: 'georgian', label: 'Georgian (1714-1830)' },
    { value: 'regency', label: 'Regency (1811-1820)' },
    { value: 'victorian', label: 'Victorian (1837-1901)' },
    { value: 'edwardian', label: 'Edwardian (1901-1910)' }
  ]

  // Filter items based on selected criteria
  const filteredItems = collectionItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory
    const matchesPeriod = selectedPeriod === 'all' || item.period === selectedPeriod
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    return matchesCategory && matchesPeriod && matchesSearch
  })

  const openViewer = (item) => {
    setSelectedItem(item)
  }

  const closeViewer = () => {
    setSelectedItem(null)
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold heading-serif mb-6">Our Collection</h1>
            <p className="text-xl max-w-3xl mx-auto opacity-90">
              Discover our carefully curated selection of fine English antiques, each piece authenticated and documented with detailed provenance.
            </p>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search collection..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full sm:w-64"
                />
              </div>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Period" />
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

            <div className="text-sm text-muted-foreground">
              {filteredItems.length} item{filteredItems.length !== 1 ? 's' : ''} found
            </div>
          </div>
        </div>
      </section>

      {/* Collection Grid */}
      <section className="py-12 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <Card key={item.id} className="overflow-hidden card-hover group">
                <div className="relative h-64 image-overlay">
                  <img 
                    src={item.images[0]} 
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {item.featured && (
                    <Badge className="absolute top-3 left-3 bg-secondary text-secondary-foreground">
                      Featured
                    </Badge>
                  )}
                  <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-xs flex items-center space-x-1">
                    <RotateCw className="h-3 w-3" />
                    <span>360°</span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold heading-serif">{item.title}</h3>
                    <span className="text-lg font-bold text-primary">{item.price}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{item.description}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-2">
                      <Badge variant="outline" className="text-xs">
                        {categories.find(c => c.value === item.category)?.label}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {periods.find(p => p.value === item.period)?.label}
                      </Badge>
                    </div>
                    <Button 
                      size="sm" 
                      onClick={() => openViewer(item)}
                      className="flex items-center space-x-1"
                    >
                      <Eye className="h-4 w-4" />
                      <span>360° View</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <Filter className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No items found</h3>
              <p className="text-muted-foreground">Try adjusting your search criteria or browse all categories.</p>
            </div>
          )}
        </div>
      </section>

      {/* 360 Viewer Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl w-full">
            <Button
              variant="outline"
              size="sm"
              onClick={closeViewer}
              className="absolute -top-12 right-0 bg-white text-black hover:bg-gray-100"
            >
              Close
            </Button>
            <ItemViewer360
              images={selectedItem.images}
              title={selectedItem.title}
              description={selectedItem.description}
            />
            <div className="mt-4 text-center">
              <div className="bg-white rounded-lg p-4 inline-block">
                <div className="flex items-center justify-between space-x-8">
                  <div>
                    <h4 className="font-semibold text-lg">{selectedItem.title}</h4>
                    <p className="text-muted-foreground">{selectedItem.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">{selectedItem.price}</div>
                    <Button className="mt-2">Enquire Now</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Collection

