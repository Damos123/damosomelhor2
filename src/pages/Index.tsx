
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { properties } from '@/lib/data';
import { Button } from '@/components/ui/button';
import PropertyCard from '@/components/PropertyCard';
import Navbar from '@/components/Navbar';
import { Home, MapPin, Search, MapIcon, ArrowRight } from 'lucide-react';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const featuredProperties = properties.filter(p => p.featured);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-28 md:pt-40 pb-16 md:pb-24 px-4 md:px-8">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-in">
            Discover Your Perfect Home
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-estate-950 tracking-tight mb-6 animate-slide-in">
            Find Your Dream Property <br className="hidden sm:block" /> with EstateVue
          </h1>
          <p className="text-lg md:text-xl text-estate-600 max-w-3xl mx-auto mb-10 animate-slide-in" style={{ animationDelay: '100ms' }}>
            Explore our curated selection of premier properties. Whether you're looking to buy, 
            rent, or invest, we have the perfect option for you.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-slide-in" style={{ animationDelay: '200ms' }}>
            <Button 
              size="lg" 
              className="rounded-full px-8 text-base"
              asChild
            >
              <Link to="/search">
                <Search size={18} className="mr-2" />
                Search Properties
              </Link>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="rounded-full px-8 text-base"
              asChild
            >
              <Link to="/map">
                <MapIcon size={18} className="mr-2" />
                View Map
              </Link>
            </Button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { value: "200+", label: "Properties", delay: "300ms" },
              { value: "150+", label: "Happy Clients", delay: "400ms" },
              { value: "15+", label: "Cities", delay: "500ms" },
              { value: "10+", label: "Years Experience", delay: "600ms" }
            ].map((stat, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl p-4 shadow-sm border border-estate-100 animate-scale-in"
                style={{ animationDelay: stat.delay }}
              >
                <div className="text-2xl font-bold text-estate-900">{stat.value}</div>
                <div className="text-estate-500 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Properties Section */}
      <section className="py-16 bg-estate-50">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <div className="flex justify-between items-center mb-10">
            <div>
              <div className="text-sm font-medium text-primary mb-2">Hand-Picked For You</div>
              <h2 className="text-3xl font-bold text-estate-900">Featured Properties</h2>
            </div>
            <Button 
              variant="outline" 
              className="rounded-full hidden md:flex"
              asChild
            >
              <Link to="/search">
                View All
                <ArrowRight size={16} className="ml-2" />
              </Link>
            </Button>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-[400px] rounded-2xl bg-estate-100 animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProperties.slice(0, 3).map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}
          
          <div className="mt-10 text-center md:hidden">
            <Button 
              variant="outline" 
              className="rounded-full"
              asChild
            >
              <Link to="/search">
                View All Properties
                <ArrowRight size={16} className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/90 to-primary text-white">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Find Your Dream Home?</h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto mb-10">
            Start your journey with EstateVue today and discover the perfect property that meets all your needs.
          </p>
          <Button 
            size="lg" 
            variant="secondary" 
            className="rounded-full px-8 text-primary"
            asChild
          >
            <Link to="/search">
              Get Started
              <ArrowRight size={18} className="ml-2" />
            </Link>
          </Button>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-estate-950 text-estate-200 py-12">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center justify-center md:justify-between mb-8">
            <div className="flex items-center gap-2 text-2xl font-semibold text-white">
              <Home size={28} className="text-primary" />
              <span>EstateVue</span>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <Link to="/search" className="hover:text-white transition-colors">Properties</Link>
              <Link to="/map" className="hover:text-white transition-colors">Map</Link>
            </nav>
          </div>
          <div className="border-t border-estate-800 pt-8">
            <p className="text-center text-estate-400 text-sm">
              © {new Date().getFullYear()} EstateVue. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
