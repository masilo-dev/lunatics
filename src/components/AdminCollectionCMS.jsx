import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Plus, Trash2, Edit3, ArrowLeft, Loader2 } from 'lucide-react'
import { supabase } from '@/lib/supabaseClient'

const categories = [
  { value: 'furniture', label: 'Period Furniture' },
  { value: 'porcelain', label: 'Ceramics & Porcelain' },
  { value: 'silver', label: 'Silver & Sheffield Plate' },
  { value: 'prints', label: 'Antique Prints' },
  { value: 'sculpture', label: 'Sculpture & Bronzes' },
  { value: 'decorative', label: 'Decorative Arts' },
]

const periods = [
  { value: 'georgian', label: 'Georgian (1714-1830)' },
  { value: 'regency', label: 'Regency (1811-1820)' },
  { value: 'victorian', label: 'Victorian (1837-1901)' },
  { value: 'edwardian', label: 'Edwardian (1901-1910)' },
]

const emptyForm = {
  id: null,
  title: '',
  category: 'furniture',
  period: 'georgian',
  price: '',
  description: '',
  imageUrls: '',
  featured: false,
}

const AdminCollectionCMS = () => {
  const [items, setItems] = useState([])
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  // Fetch items from Supabase
  useEffect(() => {
    fetchItems()
  }, [])

  const fetchItems = async () => {
    setLoading(true)
    try {
      // Fetch collection items
      const { data: itemsData, error: itemsError } = await supabase
        .from('cms_collection_items')
        .select('*')
        .order('created_at', { ascending: false })

      if (itemsError) throw itemsError

      // Fetch images for each item
      const itemsWithImages = await Promise.all(
        (itemsData || []).map(async (item) => {
          const { data: imagesData, error: imagesError } = await supabase
            .from('cms_collection_images')
            .select('*')
            .eq('collection_item_id', item.id)
            .order('display_order', { ascending: true })

          if (imagesError) {
            console.error('Error fetching images:', imagesError)
            return { ...item, images: [] }
          }

          return {
            ...item,
            images: (imagesData || []).map((img) => img.image_url),
          }
        })
      )

      setItems(itemsWithImages)
    } catch (error) {
      console.error('Error fetching collection items:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const startEdit = (item) => {
    setEditingId(item.id)
    setForm({
      id: item.id,
      title: item.title,
      category: item.category,
      period: item.period,
      price: item.price || '',
      description: item.description || '',
      imageUrls: (item.images || []).join('\n'),
      featured: Boolean(item.featured),
    })
  }

  const resetForm = () => {
    setEditingId(null)
    setForm(emptyForm)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)

    try {
      const imageUrls = form.imageUrls
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean)

      if (editingId) {
        // Update existing item
        const { error: updateError } = await supabase
          .from('cms_collection_items')
          .update({
            title: form.title,
            category: form.category,
            period: form.period,
            price: form.price,
            description: form.description,
            featured: form.featured,
          })
          .eq('id', editingId)

        if (updateError) throw updateError

        // Delete old images
        await supabase
          .from('cms_collection_images')
          .delete()
          .eq('collection_item_id', editingId)

        // Insert new images
        if (imageUrls.length > 0) {
          const imagesToInsert = imageUrls.map((url, index) => ({
            collection_item_id: editingId,
            image_url: url,
            display_order: index,
          }))

          const { error: imagesError } = await supabase
            .from('cms_collection_images')
            .insert(imagesToInsert)

          if (imagesError) throw imagesError
        }
      } else {
        // Create new item
        const { data: newItem, error: insertError } = await supabase
          .from('cms_collection_items')
          .insert({
            title: form.title,
            category: form.category,
            period: form.period,
            price: form.price,
            description: form.description,
            featured: form.featured,
          })
          .select()
          .single()

        if (insertError) throw insertError

        // Insert images
        if (imageUrls.length > 0 && newItem) {
          const imagesToInsert = imageUrls.map((url, index) => ({
            collection_item_id: newItem.id,
            image_url: url,
            display_order: index,
          }))

          const { error: imagesError } = await supabase
            .from('cms_collection_images')
            .insert(imagesToInsert)

          if (imagesError) throw imagesError
        }
      }

      await fetchItems()
      resetForm()
    } catch (error) {
      console.error('Error saving collection item:', error)
      alert('Error saving item. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this item?')) return

    try {
      // Delete images first (cascade should handle this, but being explicit)
      await supabase
        .from('cms_collection_images')
        .delete()
        .eq('collection_item_id', id)

      // Delete item
      const { error } = await supabase
        .from('cms_collection_items')
        .delete()
        .eq('id', id)

      if (error) throw error

      await fetchItems()
      if (editingId === id) {
        resetForm()
      }
    } catch (error) {
      console.error('Error deleting item:', error)
      alert('Error deleting item. Please try again.')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-muted flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-medium-contrast">Loading collection items...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-muted">
      <header className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link to="/admin" className="inline-flex items-center text-sm">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Admin
            </Link>
            <h1 className="text-xl lg:text-2xl font-bold heading-serif text-primary">
              Collection CMS
            </h1>
          </div>
          <p className="text-xs text-medium-contrast">
            Manage items shown on the public Collection page.
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form */}
        <Card className="h-full">
          <CardContent className="p-6 space-y-4">
            <h2 className="text-lg font-semibold heading-serif text-high-contrast mb-2">
              {editingId ? 'Edit Collection Item' : 'Add New Collection Item'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title" className="form-label">
                  Title
                </Label>
                <Input
                  id="title"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  required
                  className="form-input mt-1"
                  disabled={saving}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category" className="form-label">
                    Category
                  </Label>
                  <select
                    id="category"
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="form-input mt-1"
                    disabled={saving}
                  >
                    {categories.map((c) => (
                      <option key={c.value} value={c.value}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label htmlFor="period" className="form-label">
                    Period
                  </Label>
                  <select
                    id="period"
                    name="period"
                    value={form.period}
                    onChange={handleChange}
                    className="form-input mt-1"
                    disabled={saving}
                  >
                    {periods.map((p) => (
                      <option key={p.value} value={p.value}>
                        {p.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <Label htmlFor="price" className="form-label">
                  Price
                </Label>
                <Input
                  id="price"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="£0"
                  className="form-input mt-1"
                  disabled={saving}
                />
              </div>

              <div>
                <Label htmlFor="description" className="form-label">
                  Description
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  rows={4}
                  value={form.description}
                  onChange={handleChange}
                  className="form-input mt-1"
                  disabled={saving}
                />
              </div>

              <div>
                <Label htmlFor="imageUrls" className="form-label">
                  Image URLs (one per line)
                </Label>
                <Textarea
                  id="imageUrls"
                  name="imageUrls"
                  rows={4}
                  value={form.imageUrls}
                  onChange={handleChange}
                  placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
                  className="form-input mt-1"
                  disabled={saving}
                />
                <p className="text-[11px] text-light-contrast mt-1">
                  You can add many pictures for each item. The first image will
                  be used as the main thumbnail.
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  id="featured"
                  name="featured"
                  type="checkbox"
                  checked={form.featured}
                  onChange={handleChange}
                  className="h-4 w-4"
                  disabled={saving}
                />
                <Label htmlFor="featured" className="form-label">
                  Mark as featured
                </Label>
              </div>

              <div className="flex space-x-3 pt-2">
                <Button
                  type="submit"
                  className="btn-primary flex items-center"
                  disabled={saving}
                >
                  {saving ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4 mr-1" />
                      {editingId ? 'Save Changes' : 'Add Item'}
                    </>
                  )}
                </Button>
                {editingId && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={resetForm}
                    className="flex items-center"
                    disabled={saving}
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Existing items */}
        <Card className="h-full">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold heading-serif text-high-contrast">
                Current Collection Items
              </h2>
              <Badge variant="outline" className="text-xs">
                {items.length} item{items.length !== 1 ? 's' : ''}
              </Badge>
            </div>

            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="border border-border rounded-lg p-3 bg-white/80 flex flex-col space-y-1"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-semibold text-high-contrast">
                        {item.title}
                      </p>
                      <p className="text-xs text-medium-contrast">
                        {categories.find((c) => c.value === item.category)
                          ?.label || item.category}
                        {' • '}
                        {periods.find((p) => p.value === item.period)?.label ||
                          item.period}
                      </p>
                      {item.price && (
                        <p className="text-xs text-primary font-semibold mt-1">
                          {item.price}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      {item.featured && (
                        <Badge
                          variant="secondary"
                          className="text-[10px] uppercase"
                        >
                          Featured
                        </Badge>
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-light-contrast line-clamp-2 mt-1">
                    {item.description}
                  </p>
                  <p className="text-[11px] text-light-contrast mt-1">
                    {item.images?.length || 0} image
                    {(item.images?.length || 0) !== 1 ? 's' : ''}
                  </p>
                  <div className="flex justify-end space-x-2 mt-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-7 px-2 text-xs flex items-center"
                      onClick={() => startEdit(item)}
                    >
                      <Edit3 className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-7 px-2 text-xs flex items-center text-red-600 border-red-200"
                      onClick={() => handleDelete(item.id)}
                    >
                      <Trash2 className="h-3 w-3 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              ))}

              {items.length === 0 && (
                <p className="text-sm text-light-contrast">
                  No items yet. Use the form to add your first collection piece.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

export default AdminCollectionCMS
