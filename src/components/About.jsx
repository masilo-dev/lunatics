import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock, Award, Globe, Users, Shield, Heart } from 'lucide-react'

// Import images
import showroomImage from '../assets/hz7nNDCSPi4K.jpg'
import expertiseImage from '../assets/w7pz82Ruagn0.jpg'

const About = () => {
  const values = [
    {
      icon: Heart,
      title: 'Passion for History',
      description: 'Our love for history and craftsmanship drives us to seek out exceptional pieces that tell the story of England\'s rich cultural heritage.'
    },
    {
      icon: Shield,
      title: 'Authenticity First',
      description: 'Every item in our collection is thoroughly researched and authenticated, with detailed provenance when available.'
    },
    {
      icon: Award,
      title: 'Quality Assurance',
      description: 'We maintain the highest standards in our selection process, ensuring each piece meets our exacting criteria for quality and historical significance.'
    },
    {
      icon: Users,
      title: 'Personal Service',
      description: 'We believe in building lasting relationships with our clients, providing personalized attention and expert guidance.'
    }
  ]

  const expertise = [
    'Georgian Period (1714-1830)',
    'Regency Period (1811-1820)',
    'Victorian Era (1837-1901)',
    'Edwardian Period (1901-1910)',
    'English Porcelain Manufactories',
    'Silver & Sheffield Plate',
    'Period Furniture Authentication',
    'Decorative Arts Valuation'
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold heading-serif mb-6">About Lunar Antiques</h1>
            <p className="text-xl max-w-3xl mx-auto opacity-90">
              A trusted name in English antiques for over three decades, dedicated to preserving and sharing the finest examples of British craftsmanship and design.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold heading-serif text-primary mb-6">Our Story</h2>
              <div className="space-y-6 text-lg text-muted-foreground">
                <p>
                  Established in 1995, Lunar Antiques has grown from a passion project into one of the UK's most respected dealers in fine English antiques and decorative arts. Our journey began with a simple belief: that every antique piece has a story to tell, and it's our privilege to preserve and share these stories with future generations.
                </p>
                <p>
                  With over 35 years of combined experience in the antiques trade, our team has developed an unparalleled expertise in identifying, authenticating, and curating exceptional pieces from the 17th through early 20th centuries. We've built our reputation on trust, authenticity, and an unwavering commitment to quality.
                </p>
                <p>
                  Today, we serve discerning collectors, interior designers, and antique enthusiasts from around the world, all united by their appreciation for the timeless beauty and craftsmanship of English decorative arts.
                </p>
              </div>
            </div>
            <div className="relative">
              <img 
                src={showroomImage} 
                alt="Lunar Antiques Showroom"
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
              <div className="absolute -bottom-6 -left-6 bg-secondary text-secondary-foreground p-6 rounded-lg shadow-lg">
                <div className="flex items-center space-x-2">
                  <Clock className="h-6 w-6" />
                  <div>
                    <div className="font-bold text-lg">35+</div>
                    <div className="text-sm">Years of Expertise</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold heading-serif text-primary mb-6">Our Values</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              These core principles guide everything we do, from sourcing exceptional pieces to serving our valued clients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center card-hover">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-3">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img 
                src={expertiseImage} 
                alt="Antique Expertise"
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
            </div>
            <div>
              <h2 className="text-4xl font-bold heading-serif text-primary mb-6">Our Expertise</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Our deep knowledge spans four centuries of English decorative arts, with particular expertise in the following areas:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {expertise.map((area, index) => (
                  <Badge key={index} variant="secondary" className="justify-start p-3 text-sm">
                    {area}
                  </Badge>
                ))}
              </div>
              <div className="mt-8 p-6 bg-muted/50 rounded-lg">
                <h3 className="text-lg font-semibold mb-3">Professional Credentials</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Member of the British Antique Dealers' Association (BADA)</li>
                  <li>• Certified by the Society of Fine Art Auctioneers</li>
                  <li>• Regular contributor to antiques publications</li>
                  <li>• Consultant to museums and private collections</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quality Guarantee */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold heading-serif mb-6">Our Quality Guarantee</h2>
          <p className="text-xl mb-8 opacity-90">
            Every item we sell comes with our comprehensive quality assurance, ensuring your complete confidence in your purchase.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <Shield className="h-12 w-12 mx-auto mb-3 text-secondary" />
              <h3 className="font-semibold mb-2">Detailed Condition Reports</h3>
              <p className="text-sm opacity-80">Comprehensive documentation of each piece's condition</p>
            </div>
            <div className="text-center">
              <Award className="h-12 w-12 mx-auto mb-3 text-secondary" />
              <h3 className="font-semibold mb-2">Provenance Information</h3>
              <p className="text-sm opacity-80">Historical ownership and authenticity documentation</p>
            </div>
            <div className="text-center">
              <Globe className="h-12 w-12 mx-auto mb-3 text-secondary" />
              <h3 className="font-semibold mb-2">Certificate of Authenticity</h3>
              <p className="text-sm opacity-80">Professional authentication when applicable</p>
            </div>
            <div className="text-center">
              <Users className="h-12 w-12 mx-auto mb-3 text-secondary" />
              <h3 className="font-semibold mb-2">Professional Photography</h3>
              <p className="text-sm opacity-80">High-quality images showing all significant details</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About

