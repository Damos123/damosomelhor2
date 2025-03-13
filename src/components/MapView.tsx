
import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Property } from '@/lib/types';
import { formatPrice } from '@/lib/data';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Badge } from '@/components/ui/badge';
import { Home, MapPin, Bed, Bath, Square, X, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Mock the mapboxgl library since we can't actually load it without an API key
// In a real implementation, you would install and import mapboxgl properly
const mockMapboxgl = {
  Map: function() {
    return {
      addControl: () => {},
      on: () => {},
      remove: () => {},
      easeTo: () => {},
      getCenter: () => ({ lng: 0 }),
    };
  },
  NavigationControl: function() {},
  Marker: function() {
    return {
      setLngLat: function() { return this; },
      addTo: function() { return this; },
      setPopup: function() { return this; },
      getElement: () => document.createElement('div'),
    };
  },
  Popup: function() {
    return {
      setLngLat: function() { return this; },
      setHTML: function() { return this; },
      addTo: function() { return this; },
    };
  },
};

interface MapViewProps {
  properties: Property[];
  standalone?: boolean;
}

const MapView = ({ properties, standalone = false }: MapViewProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any | null>(null);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const markers = useRef<any[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const showingAll = location.pathname === '/map';
  
  // This would be replaced with actual mapbox implementation
  useEffect(() => {
    if (!mapContainer.current) return;

    const initMap = async () => {
      // Simulate loading delay for demonstration
      await new Promise(resolve => setTimeout(resolve, 600));
      
      const map = new mockMapboxgl.Map();
      
      setMap(map);
      
      // Add markers for properties
      properties.forEach(property => {
        const marker = new mockMapboxgl.Marker()
          .setLngLat([property.location.lng, property.location.lat])
          .addTo(map);
          
        // Setup click event for marker
        const el = marker.getElement();
        el.addEventListener('click', () => {
          setSelectedProperty(property);
        });
        
        markers.current.push(marker);
      });
    };

    if (!map) {
      initMap();
    }

    return () => {
      if (map) map.remove();
      markers.current = [];
    };
  }, [properties]);

  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden">
      {!standalone && showingAll && (
        <Button
          variant="secondary"
          size="sm"
          className="absolute top-4 left-4 z-30 bg-white shadow-md"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={16} className="mr-1" />
          Back
        </Button>
      )}
      
      {/* Map Container */}
      <div
        ref={mapContainer}
        className="w-full h-full bg-estate-100"
      >
        {/* Placeholder for the map - would be replaced by actual mapbox */}
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-estate-100 to-estate-200">
          <div className="text-center text-estate-400">
            <MapPin size={40} className="mx-auto mb-2 text-estate-300" />
            <p className="text-sm">
              {standalone ? 
                'Interactive map would be displayed here with property markers.' :
                'Select a property to see details on the map.'}
            </p>
          </div>
        </div>
      </div>
      
      {/* Property Info Panel */}
      {selectedProperty && (
        <div className="absolute bottom-4 left-4 right-4 md:right-auto md:w-96 bg-white rounded-xl shadow-lg overflow-hidden animate-slide-up">
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 z-10 rounded-full bg-white/80 backdrop-blur-sm"
              onClick={() => setSelectedProperty(null)}
            >
              <X size={18} />
            </Button>
            
            <AspectRatio ratio={16 / 9} className="bg-estate-100">
              {!isImageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-estate-100">
                  <div className="w-6 h-6 border-3 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                </div>
              )}
              <img
                src={selectedProperty.images[0]}
                alt={selectedProperty.title}
                className={`object-cover w-full h-full transition-opacity duration-300 ${
                  isImageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => setIsImageLoaded(true)}
              />
            </AspectRatio>
            
            <div className="absolute top-3 left-3">
              <Badge 
                variant="secondary" 
                className={`${
                  selectedProperty.listingType === 'Sale'
                    ? 'bg-primary/10 text-primary hover:bg-primary/20'
                    : 'bg-estate-500/10 text-estate-600 hover:bg-estate-500/20'
                }`}
              >
                For {selectedProperty.listingType}
              </Badge>
            </div>
          </div>
          
          <div className="p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-semibold text-estate-900 line-clamp-1">
                {selectedProperty.title}
              </h3>
              <span className="font-semibold text-estate-900">
                {formatPrice(selectedProperty.price, selectedProperty.listingType)}
              </span>
            </div>
            
            <div className="flex items-center text-estate-500 text-sm mb-3">
              <MapPin size={14} className="inline mr-1" />
              <span className="line-clamp-1">
                {selectedProperty.address}, {selectedProperty.city}
              </span>
            </div>
            
            <div className="flex items-center justify-between border-t border-estate-100 pt-3 text-estate-600">
              <div className="flex items-center gap-1">
                <Bed size={16} className="text-estate-400" />
                <span className="text-sm">{selectedProperty.bedrooms} bd</span>
              </div>
              
              <div className="flex items-center gap-1">
                <Bath size={16} className="text-estate-400" />
                <span className="text-sm">{selectedProperty.bathrooms} ba</span>
              </div>
              
              <div className="flex items-center gap-1">
                <Square size={16} className="text-estate-400" />
                <span className="text-sm">{selectedProperty.squareFeet.toLocaleString()} sf</span>
              </div>
            </div>
            
            <Button 
              className="w-full mt-4 rounded-full"
              onClick={() => navigate(`/property/${selectedProperty.id}`)}
            >
              View Details
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapView;
