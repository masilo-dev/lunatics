import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Shield, 
  Globe, 
  Search, 
  TrendingUp, 
  Wrench, 
  Users, 
  CheckCircle,
  Clock,
  Award,
  Phone
} from 'lucide-react'

const Services = () => {
  const services = [
    {
      icon: Shield,
      title: 'Authentication & Expertise',
      description: 'Each piece in our collection is thoroughly researched and authenticated, with detailed provenance when available.',
      features: [
        'Professional authentication certificates',
        'Detailed condition reports',
        'Historical research and documentation',
        'Provenance verification',
        'Expert opinion letters'
      ],
      pricing: 'From £150'
    },
    {
      icon: Globe,
      title: 'UK & Worldwide Shipping',
      description: 'Based in Newark, UK, we offer comprehensive shipping throughout the UK and internationally, with white-glove delivery for special pieces.',
      features: [
        'FREE UK shipping on orders over £500',
        'Next-day UK delivery available',
        'Professional packing and crating',
        'Fully insured international shipping',
        'White-glove delivery service',
        'Customs documentation assistance',
        'Tracking and delivery confirmation'
      ],
      pricing: 'UK: From £25 | International: Calculated by destination'
    },
    {
      icon: Users,
      title: 'Interior Design Consultation',
      description: 'Professional guidance for collectors and designers seeking period-appropriate pieces.',
      features: [
        'Period-appropriate piece selection',
        'Room design consultation',
        'Color and style coordination',
        'Historical context guidance',
        'Custom sourcing recommendations'
      ],
      pricing: 'From £200 per consultation'
    },
    {
      icon: TrendingUp,
      title: 'Valuations',
      description: 'Expert appraisals for insurance, probate, or sale purposes.',
      features: [
        'Insurance valuations',
        'Probate appraisals',
        'Market value assessments',
        'Written valuation reports',
        'Court-accepted documentation'
      ],
      pricing: 'From £100 per item'
    },
    {
      icon: Wrench,
      title: 'Restoration Recommendations',
      description: 'Trusted network of specialist conservators and restorers.',
      features: [
        'Specialist conservator referrals',
        'Restoration project management',
        'Quality assurance oversight',
        'Historical accuracy guidance',
        'Progress monitoring'
      ],
      pricing: 'Consultation included'
    },
    {
      icon: Search,
      title: 'Commission Searches',
      description: 'We can source specific pieces to meet your particular requirements.',
      features: [
        'Bespoke piece sourcing',
        'Estate and auction monitoring',
        'Private collection access',
        'Specific period expertise',
        'Worldwide dealer network'
      ],
      pricing: 'No fee unless successful'
    }
  ]

  const tradeServices = [
    'Special trade pricing and terms',
    'Bulk purchase discounts',
    'Extended payment terms',
    'Priority access to new acquisitions',
    'Exclusive trade-only pieces',
    'Professional trade references'
  ]

  const qualityGuarantees = [
    {
      icon: CheckCircle,
      title: 'Detailed Condition Reports',
      description: 'Comprehensive documentation of each piece\'s condition'
    },
    {
      icon: Award,
      title: 'Provenance Information',
      description: 'Historical ownership and authenticity documentation where available'
    },
    {
      icon: Shield,
      title: 'Certificate of Authenticity',
      description: 'Professional authentication when applicable'
    },
    {
      icon: Clock,
      title: 'Professional Photography',
      description: 'High-quality images showing all significant details'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold heading-serif mb-6">Our Services</h1>
            <p className="text-xl max-w-3xl mx-auto opacity-90">
              Comprehensive expertise and support for collectors, designers, and antique enthusiasts worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold heading-serif text-primary mb-6">Professional Services</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our comprehensive range of services ensures that every aspect of your antique collecting journey is supported by expert knowledge and professional care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="card-hover h-full">
                <CardContent className="p-6 h-full flex flex-col">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <service.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold heading-serif mb-3">{service.title}</h3>
                  <p className="text-muted-foreground mb-4 flex-grow">{service.description}</p>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2">Includes:</h4>
                    <ul className="space-y-1">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground flex items-start">
                          <CheckCircle className="h-3 w-3 text-primary mt-1 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-auto">
                    <div className="flex justify-between items-center mb-3">
                      <Badge variant="secondary">{service.pricing}</Badge>
                    </div>
                    <Button className="w-full">
                      Learn More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Guarantee */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold heading-serif text-primary mb-6">Our Quality Guarantee</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Every item we sell comes with our comprehensive quality assurance, ensuring your complete confidence in your purchase.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {qualityGuarantees.map((guarantee, index) => (
              <Card key={index} className="text-center card-hover">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <guarantee.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{guarantee.title}</h3>
                  <p className="text-sm text-muted-foreground">{guarantee.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trade Professionals */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold heading-serif text-primary mb-6">For Trade Professionals</h2>
              <p className="text-lg text-muted-foreground mb-8">
                We offer special consideration and exclusive services for interior designers, decorators, established antique dealers, museum curators, and serious collectors.
              </p>
              
              <div className="space-y-4 mb-8">
                {tradeServices.map((service, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{service}</span>
                  </div>
                ))}
              </div>

              <div className="bg-muted/50 p-6 rounded-lg">
                <h3 className="font-semibold mb-3">Trade Account Requirements</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Valid business registration or professional credentials</li>
                  <li>• Trade references from established suppliers</li>
                  <li>• Minimum annual purchase commitment</li>
                  <li>• Completed trade application form</li>
                </ul>
              </div>
            </div>

            <div className="bg-primary text-primary-foreground p-8 rounded-lg">
              <h3 className="text-2xl font-bold heading-serif mb-4">Apply for Trade Account</h3>
              <p className="mb-6 opacity-90">
                Join our network of professional partners and gain access to exclusive trade benefits, special pricing, and priority service.
              </p>
              <div className="space-y-4">
                <Button variant="secondary" size="lg" className="w-full">
                  Download Application
                </Button>
                <div className="text-center">
                  <p className="text-sm opacity-80 mb-2">Questions about trade accounts?</p>
                  <div className="flex items-center justify-center space-x-2">
                    <Phone className="h-4 w-4" />
                    <span>07435 965901</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold heading-serif mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90">
            Contact us today to discuss your specific requirements and discover how our expertise can serve your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              Schedule Consultation
            </Button>
            <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Services

