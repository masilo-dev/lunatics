import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Instagram, 
  Facebook, 
  Send,
  CheckCircle,
  AlertCircle,
  Loader2
} from 'lucide-react'
import { supabase } from '@/lib/supabaseClient'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    inquiryType: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (error) setError('')
  }

  const handleSelectChange = (value, name) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    if (error) setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      if (supabase) {
        const { error: insertError } = await supabase
          .from('crm_contacts')
          .insert({
            name: formData.name,
            email: formData.email,
            phone: formData.phone || null,
            subject: formData.subject,
            message: formData.message,
            inquiry_type: formData.inquiryType || null,
          })

        if (insertError) {
          setError(insertError.message)
          setIsLoading(false)
          return
        }
      }

      setIsSubmitted(true)
      // Reset form after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false)
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
          inquiryType: ''
        })
      }, 5000)
    } catch (err) {
      setError('Unexpected error while sending your message.')
    } finally {
      setIsLoading(false)
    }
  }

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Visit Our Showroom',
      details: [
        'Castlegate Antiques',
        '1-3 Castlegate Newark',
        'NG24 1AZ',
        'United Kingdom'
      ]
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: [
        '07435 965901',
        'Available during showroom hours',
        'Emergency appointments available'
      ]
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: [
        'info@lunarantiques.co.uk',
        'We respond within 24 hours',
        'Detailed inquiries welcome'
      ]
    },
    {
      icon: Clock,
      title: 'Opening Hours',
      details: [
        'Monday - Friday: 9:00 AM - 6:00 PM',
        'Saturday: 10:00 AM - 5:00 PM',
        'Sunday: By appointment only',
        'Bank holidays: Closed'
      ]
    }
  ]

  const inquiryTypes = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'purchase', label: 'Purchase Inquiry' },
    { value: 'valuation', label: 'Valuation Request' },
    { value: 'authentication', label: 'Authentication Service' },
    { value: 'consultation', label: 'Design Consultation' },
    { value: 'commission', label: 'Commission Search' },
    { value: 'trade', label: 'Trade Account' },
    { value: 'restoration', label: 'Restoration Inquiry' }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="responsive-hero-heading font-bold heading-serif mb-6">Contact Us</h1>
            <p className="text-lg lg:text-xl max-w-4xl mx-auto opacity-95 leading-relaxed">
              We welcome inquiries about specific pieces, general collecting advice, or commission requests. Our expertise spans four centuries of English decorative arts.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="responsive-grid mb-16">
            {contactInfo.map((info, index) => (
              <Card key={index} className="text-center card-hover h-full">
                <CardContent className="p-6 lg:p-8 h-full flex flex-col">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <info.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg lg:text-xl font-semibold mb-4 text-high-contrast">{info.title}</h3>
                  <div className="space-y-2 flex-grow">
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="responsive-text text-medium-contrast">{detail}</p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form and Map */}
      <section className="py-16 lg:py-24 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="h-fit">
              <CardContent className="p-6 lg:p-8">
                <h2 className="text-2xl lg:text-3xl font-bold heading-serif text-primary mb-6">Send Us a Message</h2>
                
                {isSubmitted ? (
                  <div className="text-center py-8">
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2 text-high-contrast">Message Sent Successfully!</h3>
                    <p className="responsive-text text-medium-contrast">
                      Thank you for your inquiry. We'll respond within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                      <div className="flex items-center space-x-2 p-4 bg-red-50 border border-red-200 rounded-lg">
                        <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                        <p className="text-red-700 text-sm">{error}</p>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="name" className="form-label">Full Name *</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="form-input mt-2"
                          disabled={isLoading}
                        />
                      </div>
                      <div>
                        <Label htmlFor="email" className="form-label">Email Address *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="form-input mt-2"
                          disabled={isLoading}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="phone" className="form-label">Phone Number</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="form-input mt-2"
                          disabled={isLoading}
                        />
                      </div>
                      <div>
                        <Label htmlFor="inquiryType" className="form-label">Inquiry Type</Label>
                        <Select 
                          value={formData.inquiryType} 
                          onValueChange={(value) => handleSelectChange(value, 'inquiryType')}
                          disabled={isLoading}
                        >
                          <SelectTrigger className="form-input mt-2">
                            <SelectValue placeholder="Select inquiry type" />
                          </SelectTrigger>
                          <SelectContent>
                            {inquiryTypes.map(type => (
                              <SelectItem key={type.value} value={type.value}>
                                {type.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="subject" className="form-label">Subject *</Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="form-input mt-2"
                        disabled={isLoading}
                      />
                    </div>

                    <div>
                      <Label htmlFor="message" className="form-label">Message *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={6}
                        className="form-input mt-2 resize-none"
                        placeholder="Please provide details about your inquiry, including any specific pieces you're interested in or services you require..."
                        disabled={isLoading}
                      />
                    </div>

                    <Button 
                      type="submit" 
                      size="lg" 
                      className="btn-primary w-full text-lg py-3"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="h-5 w-5 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>

                    <p className="text-sm text-medium-contrast text-center">
                      * Required fields. We respect your privacy and will never share your information.
                    </p>
                  </form>
                )}
              </CardContent>
            </Card>

            {/* Map and Additional Info */}
            <div className="space-y-8">
              {/* Map Placeholder */}
              <Card>
                <CardContent className="p-0">
                  <div className="h-64 lg:h-80 bg-muted rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                      <p className="text-medium-contrast font-semibold">Interactive Map</p>
                      <p className="text-sm text-light-contrast">Castlegate Antiques, Newark</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Visit Information */}
              <Card>
                <CardContent className="p-6 lg:p-8">
                  <h3 className="text-xl lg:text-2xl font-semibold heading-serif mb-4 text-high-contrast">Visit Our Showroom</h3>
                  <p className="responsive-text text-medium-contrast mb-6">
                    Our physical showroom offers the opportunity to examine pieces firsthand and discover treasures not yet listed online. We welcome visitors by appointment to ensure personalized attention and expert guidance.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Clock className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="responsive-text text-medium-contrast">Appointments recommended for best service</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="responsive-text text-medium-contrast">Call ahead for evening or weekend visits</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="responsive-text text-medium-contrast">Free parking available nearby</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Social Media */}
              <Card>
                <CardContent className="p-6 lg:p-8">
                  <h3 className="text-xl lg:text-2xl font-semibold heading-serif mb-4 text-high-contrast">Follow Our Journey</h3>
                  <p className="responsive-text text-medium-contrast mb-6">
                    Stay updated with our latest finds and learn the fascinating stories behind our pieces.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button variant="outline" size="sm" className="flex items-center space-x-2 justify-center">
                      <Instagram className="h-4 w-4" />
                      <span>@lunarantiques</span>
                    </Button>
                    <Button variant="outline" size="sm" className="flex items-center space-x-2 justify-center">
                      <Facebook className="h-4 w-4" />
                      <span>Lunar Antiques</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold heading-serif text-primary mb-4">Frequently Asked Questions</h2>
            <p className="responsive-text text-medium-contrast">Quick answers to common inquiries</p>
          </div>

          <div className="responsive-grid">
            <div>
              <h3 className="font-semibold mb-3 text-high-contrast">Do you offer authentication services?</h3>
              <p className="responsive-text text-medium-contrast">
                Yes, we provide professional authentication and valuation services for antiques and decorative arts.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-high-contrast">Can you help find specific pieces?</h3>
              <p className="responsive-text text-medium-contrast">
                Absolutely! Our commission search service can help locate specific items through our extensive network.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-high-contrast">Do you ship internationally?</h3>
              <p className="responsive-text text-medium-contrast">
                Yes, we arrange secure, insured shipping worldwide with professional packing and documentation.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-high-contrast">What are your payment terms?</h3>
              <p className="responsive-text text-medium-contrast">
                We accept various payment methods and offer flexible terms for trade customers and larger purchases.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact

