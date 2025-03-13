
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { properties, getFilteredProperties } from '@/lib/data';
import { PropertyFilter } from '@/lib/types';
import MapView from '@/components/MapView';
import PropertyFilters from '@/components/PropertyFilters';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Grid, ArrowLeft, ListFilter } from 'lucide-react';

const MapPage = () => {
  const [filteredProperties, setFilteredProperties] = useState(properties);
  const [isLoading, setIsLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const navigate = useNavigate();

  const handleFilterChange = (filters: PropertyFilter) => {
    const filtered = getFilteredProperties(filters);
    setFilteredProperties(filtered);
  };

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-estate-50">
      <Navbar />
      
      <div className="pt-24 pb-8 container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <Link 
              to="/search" 
              className="inline-flex items-center text-estate-600 hover:text-estate-900 mb-4 transition-colors"
            >
              <ArrowLeft size={16} className="mr-1" />
              Back to Properties
            </Link>
            <h1 className="text-3xl font-bold text-estate-900">Property Map</h1>
          </div>
          
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-2"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <ListFilter size={16} />
              {isFilterOpen ? 'Hide Filters' : 'Filters'}
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-2"
              asChild
            >
              <Link to="/search">
                <Grid size={16} />
                <span className="hidden sm:inline">List View</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
      
      <div className="relative container mx-auto px-4 md:px-6 max-w-7xl pb-16">
        {isFilterOpen && (
          <div className="absolute top-0 left-0 right-0 md:left-4 md:right-auto md:w-80 z-30 md:h-[calc(100vh-180px)] md:overflow-auto bg-white rounded-xl shadow-lg border border-estate-100 animate-slide-in">
            <PropertyFilters onFilterChange={handleFilterChange} />
          </div>
        )}
        
        <div className="h-[calc(100vh-180px)] rounded-xl overflow-hidden">
          {isLoading ? (
            <div className="w-full h-full bg-estate-100 flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
            </div>
          ) : (
            <MapView properties={filteredProperties} standalone={true} />
          )}
        </div>
      </div>
    </div>
  );
};

export default MapPage;
