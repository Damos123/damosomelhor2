
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { properties } from '@/lib/data';
import PropertyDetails from '@/components/PropertyDetails';
import PropertyCard from '@/components/PropertyCard';
import MapView from '@/components/MapView';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MapPin } from 'lucide-react';

const PropertyPage = () => {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState(properties.find(p => p.id === id));
  const [isLoading, setIsLoading] = useState(true);
  const [similarProperties, setSimilarProperties] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!property) {
      navigate('/404');
      return;
    }

    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    // Find similar properties (same property type or city)
    const similar = properties
      .filter(p => 
        p.id !== property.id && 
        (p.propertyType === property.propertyType || p.city === property.city)
      )
      .slice(0, 3);
    
    setSimilarProperties(similar);

    return () => clearTimeout(timer);
  }, [property, navigate]);

  if (!property) return null;

  return (
    <div className="min-h-screen bg-estate-50">
      <Navbar />
      
      <div className="pt-24 pb-16 container mx-auto px-4 md:px-6 max-w-6xl">
        <Link 
          to="/search" 
          className="inline-flex items-center text-estate-600 hover:text-estate-900 mb-6 transition-colors"
        >
          <ArrowLeft size={16} className="mr-1" />
          Back to Search Results
        </Link>
        
        {isLoading ? (
          <div className="animate-pulse">
            <div className="h-[400px] bg-estate-100 rounded-xl mb-8"></div>
            <div className="h-12 bg-estate-100 rounded mb-4 w-3/4"></div>
            <div className="h-6 bg-estate-100 rounded mb-8 w-1/2"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="h-8 bg-estate-100 rounded mb-4 w-1/3"></div>
                <div className="h-24 bg-estate-100 rounded mb-6"></div>
                <div className="h-8 bg-estate-100 rounded mb-4 w-1/4"></div>
                <div className="grid grid-cols-2 gap-4">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="h-8 bg-estate-100 rounded"></div>
                  ))}
                </div>
              </div>
              <div className="lg:col-span-1">
                <div className="h-[300px] bg-estate-100 rounded-xl"></div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <PropertyDetails property={property} />
            
            {/* Map Section */}
            <div className="mt-12 mb-16">
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <MapPin size={20} className="mr-2 text-primary" />
                Location
              </h2>
              <div className="h-[400px] bg-estate-100 rounded-xl overflow-hidden">
                <MapView properties={[property]} />
              </div>
            </div>
            
            {/* Similar Properties */}
            {similarProperties.length > 0 && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Similar Properties</h2>
                  <Button 
                    variant="outline" 
                    size="sm"
                    asChild
                  >
                    <Link to="/search">View More</Link>
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {similarProperties.map(property => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PropertyPage;
