import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Edit3, Plus, Trash2, Loader2 } from 'lucide-react'
import { supabase } from '@/lib/supabaseClient'

const emptyForm = {
  id: null,
  title: '',
  description: '',
  featuresText: '',
  pricing: '',
}

const AdminServicesCMS = () => {
  const [services, setServices] = useState([])
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    setLoading(true)
    try {
      // Fetch services
      const { data: servicesData, error: servicesError } = await supabase
        .from('cms_services')
        .select('*')
        .order('display_order', { ascending: true })

      if (servicesError) throw servicesError

      // Fetch features for each service
      const servicesWithFeatures = await Promise.all(
        (servicesData || []).map(async (service) => {
          const { data: featuresData, error: featuresError } = await supabase
            .from('cms_service_features')
            .select('*')
            .eq('service_id', service.id)
            .order('display_order', { ascending: true })

          if (featuresError) {
            console.error('Error fetching features:', featuresError)
            return { ...service, features: [] }
          }

          return {
            ...service,
            features: (featuresData || []).map((f) => f.feature_text),
          }
        })
      )

      setServices(servicesWithFeatures)
    } catch (error) {
      console.error('Error fetching services:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const startEdit = (service) => {
    setEditingId(service.id)
    setForm({
      id: service.id,
      title: service.title,
      description: service.description || '',
      featuresText: (service.features || []).join('\n'),
      pricing: service.pricing || '',
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
      const features = form.featuresText
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean)

      if (editingId) {
        // Update existing service
        const { error: updateError } = await supabase
          .from('cms_services')
          .update({
            title: form.title,
            description: form.description,
            pricing: form.pricing,
          })
          .eq('id', editingId)

        if (updateError) throw updateError

        // Delete old features
        await supabase
          .from('cms_service_features')
          .delete()
          .eq('service_id', editingId)

        // Insert new features
        if (features.length > 0) {
          const featuresToInsert = features.map((featureText, index) => ({
            service_id: editingId,
            feature_text: featureText,
            display_order: index,
          }))

          const { error: featuresError } = await supabase
            .from('cms_service_features')
            .insert(featuresToInsert)

          if (featuresError) throw featuresError
        }
      } else {
        // Create new service
        const maxOrder = services.length > 0
          ? Math.max(...services.map((s) => s.display_order || 0))
          : -1

        const { data: newService, error: insertError } = await supabase
          .from('cms_services')
          .insert({
            title: form.title,
            description: form.description,
            pricing: form.pricing,
            display_order: maxOrder + 1,
          })
          .select()
          .single()

        if (insertError) throw insertError

        // Insert features
        if (features.length > 0 && newService) {
          const featuresToInsert = features.map((featureText, index) => ({
            service_id: newService.id,
            feature_text: featureText,
            display_order: index,
          }))

          const { error: featuresError } = await supabase
            .from('cms_service_features')
            .insert(featuresToInsert)

          if (featuresError) throw featuresError
        }
      }

      await fetchServices()
      resetForm()
    } catch (error) {
      console.error('Error saving service:', error)
      alert('Error saving service. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this service?')) return

    try {
      // Delete features first
      await supabase
        .from('cms_service_features')
        .delete()
        .eq('service_id', id)

      // Delete service
      const { error } = await supabase
        .from('cms_services')
        .delete()
        .eq('id', id)

      if (error) throw error

      await fetchServices()
      if (editingId === id) {
        resetForm()
      }
    } catch (error) {
      console.error('Error deleting service:', error)
      alert('Error deleting service. Please try again.')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-muted flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-medium-contrast">Loading services...</p>
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
              Services CMS
            </h1>
          </div>
          <p className="text-xs text-medium-contrast">
            Manage services shown on the public Services page.
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form */}
        <Card>
          <CardContent className="p-6 space-y-4">
            <h2 className="text-lg font-semibold heading-serif text-high-contrast mb-2">
              {editingId ? 'Edit Service' : 'Add New Service'}
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
                <Label htmlFor="featuresText" className="form-label">
                  Bullet Points (one per line)
                </Label>
                <Textarea
                  id="featuresText"
                  name="featuresText"
                  rows={4}
                  value={form.featuresText}
                  onChange={handleChange}
                  className="form-input mt-1"
                  placeholder="Professional authentication certificates&#10;Detailed condition reports"
                  disabled={saving}
                />
              </div>

              <div>
                <Label htmlFor="pricing" className="form-label">
                  Pricing
                </Label>
                <Input
                  id="pricing"
                  name="pricing"
                  value={form.pricing}
                  onChange={handleChange}
                  className="form-input mt-1"
                  placeholder="From £100"
                  disabled={saving}
                />
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
                      {editingId ? 'Save Changes' : 'Add Service'}
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

        {/* Existing services */}
        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold heading-serif text-high-contrast">
                Current Services
              </h2>
              <Badge variant="outline" className="text-xs">
                {services.length} service{services.length !== 1 ? 's' : ''}
              </Badge>
            </div>

            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="border border-border rounded-lg p-3 bg-white/80"
                >
                  <p className="text-sm font-semibold text-high-contrast">
                    {service.title}
                  </p>
                  <p className="text-xs text-medium-contrast mt-1 line-clamp-2">
                    {service.description}
                  </p>
                  <p className="text-xs text-primary font-semibold mt-1">
                    {service.pricing}
                  </p>
                  <p className="text-[11px] text-light-contrast mt-1">
                    {service.features?.length || 0} bullet
                    {(service.features?.length || 0) !== 1 ? 's' : ''}
                  </p>
                  <div className="flex justify-end space-x-2 mt-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-7 px-2 text-xs flex items-center"
                      onClick={() => startEdit(service)}
                    >
                      <Edit3 className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-7 px-2 text-xs flex items-center text-red-600 border-red-200"
                      onClick={() => handleDelete(service.id)}
                    >
                      <Trash2 className="h-3 w-3 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              ))}

              {services.length === 0 && (
                <p className="text-sm text-light-contrast">
                  No services yet. Use the form to add your first service.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

export default AdminServicesCMS
