
import { useState, useEffect } from 'react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Property, formatPrice } from '@/lib/data';
import { 
  Bed, 
  Bath, 
  Square, 
  MapPin, 
  Calendar, 
  Home as HomeIcon, 
  ChevronLeft, 
  ChevronRight,
  Heart
} from 'lucide-react';

interface PropertyDetailsProps {
  property: Property;
}

const PropertyDetails = ({ property }: PropertyDetailsProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const nextImage = () => {
    setIsImageLoaded(false);
    setCurrentImageIndex((prev) => 
      prev === property.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setIsImageLoaded(false);
    setCurrentImageIndex((prev) => 
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    // Preload the next image
    const nextIndex = currentImageIndex === property.images.length - 1 ? 0 : currentImageIndex + 1;
    const img = new Image();
    img.src = property.images[nextIndex];
  }, [currentImageIndex, property.images]);

  return (
    <div className="animate-fade-in">
      <div className="relative">
        <AspectRatio ratio={21 / 9} className="bg-estate-100 rounded-2xl overflow-hidden">
          {!isImageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-estate-100">
              <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
            </div>
          )}
          <img
            src={property.images[currentImageIndex]}
            alt={`${property.title} - Image ${currentImageIndex + 1}`}
            className={`object-cover w-full h-full transition-opacity duration-500 ${
              isImageLoaded ? 'opacity-100' : 'opacity-0'
            } image-fade-in`}
            onLoad={() => setIsImageLoaded(true)}
          />
          
          {/* Image Navigation */}
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-sm hover:bg-white transition-all duration-300"
            onClick={prevImage}
            aria-label="Previous image"
          >
            <ChevronLeft size={24} className="text-estate-900" />
          </button>
          
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-sm hover:bg-white transition-all duration-300"
            onClick={nextImage}
            aria-label="Next image"
          >
            <ChevronRight size={24} className="text-estate-900" />
          </button>
          
          {/* Image counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm text-white text-sm">
            {currentImageIndex + 1} / {property.images.length}
          </div>
        </AspectRatio>
        
        {/* Property type badge */}
        <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-2">
          <Badge 
            variant="secondary" 
            className={`${
              property.listingType === 'Sale'
                ? 'bg-primary/10 text-primary hover:bg-primary/20'
                : 'bg-estate-500/10 text-estate-600 hover:bg-estate-500/20'
            }`}
          >
            For {property.listingType}
          </Badge>
          
          <Badge 
            variant="secondary"
            className="bg-estate-100 text-estate-600 hover:bg-estate-200"
          >
            <HomeIcon size={14} className="mr-1" />
            {property.propertyType}
          </Badge>
        </div>
      </div>
      
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-estate-900">{property.title}</h1>
              <div className="flex items-center text-estate-600 mt-2">
                <MapPin size={18} className="inline mr-1" />
                <span>
                  {property.address}, {property.city}, {property.state} {property.zipCode}
                </span>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-3xl font-bold text-estate-900">
                {formatPrice(property.price, property.listingType)}
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-8 py-4 border-y border-estate-100 my-6">
            <div className="flex items-center gap-2">
              <Bed size={20} className="text-estate-400" />
              <div>
                <div className="font-semibold">{property.bedrooms}</div>
                <div className="text-sm text-estate-500">Bedrooms</div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Bath size={20} className="text-estate-400" />
              <div>
                <div className="font-semibold">{property.bathrooms}</div>
                <div className="text-sm text-estate-500">Bathrooms</div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Square size={20} className="text-estate-400" />
              <div>
                <div className="font-semibold">{property.squareFeet.toLocaleString()}</div>
                <div className="text-sm text-estate-500">Sq. Feet</div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Calendar size={20} className="text-estate-400" />
              <div>
                <div className="font-semibold">{property.yearBuilt}</div>
                <div className="text-sm text-estate-500">Year Built</div>
              </div>
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Description</h2>
            <p className="text-estate-600 leading-relaxed whitespace-pre-line">
              {property.description}
            </p>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Amenities</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-3">
              {property.amenities.map((amenity) => (
                <div key={amenity} className="flex items-center">
                  <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <div className="sticky top-28 rounded-xl border border-estate-200 p-6 bg-white shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Interested in this property?</h2>
            </div>
            
            <Button className="w-full mb-3 py-6 rounded-full text-base">
              Schedule a Tour
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full py-6 rounded-full text-base flex items-center justify-center gap-2"
              onClick={() => setIsFavorite(!isFavorite)}
            >
              <Heart 
                size={18} 
                className={isFavorite ? 'fill-red-500 text-red-500' : ''} 
              />
              {isFavorite ? 'Saved to Favorites' : 'Save to Favorites'}
            </Button>
            
            <Separator className="my-6" />
            
            <div className="text-center text-estate-600 text-sm">
              <p>Listing ID: {property.id}</p>
              <p className="mt-1">Updated: {new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
