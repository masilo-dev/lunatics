import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Shield, Globe, Award, Clock } from 'lucide-react'

// Import images
import heroImage from '../assets/KacWffrdQmMb.jpg'
import furnitureImage from '../assets/Mt8UIYp8PTe2.jpg'
import porcelainImage from '../assets/3Ve7fIDsNkcE.jpg'
import silverImage from '../assets/CUzmGlTD6XgC.jpg'
import printsImage from '../assets/gSXtuMGRIxnv.jpg'
import sculptureImage from '../assets/IC2twac2TJSu.jpg'
import decorativeImage from '../assets/T1Iq0trCBhRF.jpg'

const Home = () => {
  const categories = [
    {
      title: 'Period Furniture',
      description: 'Elegant Georgian mahogany to refined Regency pieces',
      image: furnitureImage,
      link: '/contact'
    },
    {
      title: 'Ceramics & Porcelain',
      description: 'Worcester, Derby, and Chelsea manufactories',
      image: porcelainImage,
      link: '/contact'
    },
    {
      title: 'Silver & Sheffield Plate',
      description: 'Georgian and Victorian pieces, tea services to decorative items',
      image: silverImage,
      link: '/contact'
    },
    {
      title: 'Antique Prints',
      description: 'Historical maps, botanical prints, architectural drawings',
      image: printsImage,
      link: '/contact'
    },
    {
      title: 'Sculpture & Bronzes',
      description: 'Classical and contemporary works in bronze and marble',
      image: sculptureImage,
      link: '/contact'
    },
    {
      title: 'Decorative Arts',
      description: 'Quality pieces spanning four centuries of English design',
      image: decorativeImage,
      link: '/contact'
    }
  ]

  const features = [
    {
      icon: Shield,
      title: 'Authentication Guaranteed',
      description: 'Every piece thoroughly researched and authenticated with detailed provenance'
    },
    {
      icon: Globe,
      title: 'Worldwide Shipping',
      description: 'Secure, insured shipping globally with white-glove delivery for special pieces'
    },
    {
      icon: Award,
      title: 'Expert Curation',
      description: 'Carefully sourced from estates, country houses, and specialist dealers throughout the UK'
    },
    {
      icon: Clock,
      title: '35+ Years Experience',
      description: 'Established expertise in the antiques and decorative arts trade since 1995'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 hero-gradient" />
        <div className="relative z-10 text-center text-white max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="responsive-hero-heading font-bold heading-serif mb-6">
            Lunar Antiques
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl mb-8 text-accent-serif max-w-4xl mx-auto leading-relaxed">
            Specialising in fine English antiques and decorative pieces from the 17th, 18th, 19th and early 20th centuries
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" className="btn-secondary text-lg px-8 py-3 w-full sm:w-auto">
              <Link to="/collection">
                Explore Collection <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="btn-story text-lg px-8 py-3 w-full sm:w-auto font-semibold">
              <Link to="/about">
                Our Story
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="responsive-heading font-bold heading-serif text-primary mb-6">
              A Legacy of Excellence
            </h2>
            <p className="responsive-text text-medium-contrast max-w-4xl mx-auto">
              With over 35 years of experience in the antiques and decorative arts trade, Lunar Antiques has established itself as a trusted source for discerning collectors, interior designers, and antique enthusiasts worldwide.
            </p>
          </div>

          <div className="responsive-grid">
            {features.map((feature, index) => (
              <Card key={index} className="text-center card-hover h-full">
                <CardContent className="p-6 lg:p-8 h-full flex flex-col">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg lg:text-xl font-semibold mb-4 text-high-contrast">{feature.title}</h3>
                  <p className="responsive-text text-medium-contrast flex-grow">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Collection Categories */}
      <section className="py-16 lg:py-24 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="responsive-heading font-bold heading-serif text-primary mb-6">
              Our Collection
            </h2>
            <p className="responsive-text text-medium-contrast max-w-4xl mx-auto">
              Discover our curated selection of exceptional pieces, each with its own story and provenance, carefully sourced from the finest estates and collections across the UK.
            </p>
          </div>

          <div className="responsive-grid">
            {categories.map((category, index) => (
              <Card key={index} className="overflow-hidden card-hover group h-full">
                <div className="relative h-64 lg:h-72 image-overlay">
                  <img 
                    src={category.image} 
                    alt={category.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <CardContent className="p-6 lg:p-8 flex flex-col h-full">
                  <h3 className="text-xl lg:text-2xl font-semibold heading-serif mb-3 text-high-contrast">{category.title}</h3>
                  <p className="responsive-text text-medium-contrast mb-6 flex-grow">{category.description}</p>
                  <Button asChild variant="outline" size="sm" className="btn-primary w-full sm:w-auto">
                    <Link to={category.link}>
                      View Collection <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 lg:py-24 bg-primary text-primary-foreground">
        <div className="max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="responsive-heading font-bold heading-serif mb-6">
            Ready to Discover Your Perfect Piece?
          </h2>
          <p className="text-lg lg:text-xl mb-8 opacity-95 max-w-3xl mx-auto leading-relaxed">
            Whether you're a seasoned collector or just beginning your journey into antiques, our expert team is here to guide you to the perfect piece for your collection or home.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-3 w-full sm:w-auto font-semibold">
              <Link to="/contact">
                Visit Our Showroom
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary text-lg px-8 py-3 w-full sm:w-auto font-semibold">
              <Link to="/services">
                Our Services
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home

