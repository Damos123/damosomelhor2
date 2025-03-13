
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { properties, getFilteredProperties } from '@/lib/data';
import { PropertyFilter } from '@/lib/types';
import PropertyCard from '@/components/PropertyCard';
import PropertyFilters from '@/components/PropertyFilters';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { MapIcon, Grid, ListFilter, ArrowLeft } from 'lucide-react';

const SearchPage = () => {
  const [filteredProperties, setFilteredProperties] = useState(properties);
  const [filters, setFilters] = useState<PropertyFilter>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isFilterVisible, setIsFilterVisible] = useState(true);

  const handleFilterChange = (newFilters: PropertyFilter) => {
    setFilters(newFilters);
    const filtered = getFilteredProperties(newFilters);
    setFilteredProperties(filtered);
  };

  const toggleFilterVisibility = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 700);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-estate-50">
      <Navbar />
      
      <div className="pt-24 pb-16 container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <Link 
              to="/" 
              className="inline-flex items-center text-estate-600 hover:text-estate-900 mb-4 transition-colors"
            >
              <ArrowLeft size={16} className="mr-1" />
              Back to Home
            </Link>
            <h1 className="text-3xl font-bold text-estate-900">Browse Properties</h1>
          </div>
          
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              size="sm" 
              className="hidden md:flex items-center gap-2"
              onClick={toggleFilterVisibility}
            >
              <ListFilter size={16} />
              {isFilterVisible ? 'Hide Filters' : 'Show Filters'}
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-2"
              asChild
            >
              <Link to="/map">
                <MapIcon size={16} />
                <span className="hidden sm:inline">View Map</span>
              </Link>
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters */}
          <div className={`lg:col-span-1 ${isFilterVisible ? 'block' : 'hidden md:block'}`}>
            <PropertyFilters onFilterChange={handleFilterChange} />
          </div>
          
          {/* Property Listings */}
          <div className={`${isFilterVisible ? 'lg:col-span-3' : 'lg:col-span-4'}`}>
            <div className="bg-white p-3 sm:p-4 rounded-xl shadow-sm border border-estate-100 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <p className="text-estate-600">
                  Found <span className="font-semibold text-estate-900">{filteredProperties.length}</span> properties
                </p>
                
                <div className="flex items-center gap-2">
                  <span className="text-sm text-estate-500">Sort by:</span>
                  <select className="bg-estate-50 border border-estate-200 rounded-md px-3 py-1 text-sm">
                    <option>Latest</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                  </select>
                </div>
              </div>
            </div>
            
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="h-[350px] rounded-2xl bg-estate-100 animate-pulse"></div>
                ))}
              </div>
            ) : filteredProperties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl p-8 text-center border border-estate-100">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-estate-100 mb-4">
                  <Grid size={24} className="text-estate-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No properties found</h3>
                <p className="text-estate-600 mb-6">
                  Try adjusting your filters to find properties that match your criteria.
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => handleFilterChange({})}
                >
                  Reset All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
