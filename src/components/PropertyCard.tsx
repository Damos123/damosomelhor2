
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Badge } from '@/components/ui/badge';
import { Property } from '@/lib/types';
import { Bed, Bath, Square, MapPin, Heart } from 'lucide-react';

// Função para formatar preço
const formatPrice = (price: number, listingType: 'Sale' | 'Rent') => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0
  }).format(price) + (listingType === 'Rent' ? '/mês' : '');
};

interface PropertyCardProps {
  property: Property;
  featured?: boolean;
}

const PropertyCard = ({ property, featured = false }: PropertyCardProps) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    <Link 
      to={`/property/${property.id}`}
      className={`property-card block rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md border border-estate-100 transition-all duration-300 ${
        featured ? 'md:col-span-2' : ''
      }`}
    >
      <div className="relative">
        <AspectRatio ratio={16 / 9} className="bg-estate-100">
          {!isImageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-estate-100">
              <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
            </div>
          )}
          <img
            src={property.images[0]}
            alt={property.title}
            className={`object-cover w-full h-full transition-opacity duration-500 ${
              isImageLoaded ? 'opacity-100' : 'opacity-0'
            } image-fade-in`}
            onLoad={() => setIsImageLoaded(true)}
          />
        </AspectRatio>
        
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          <Badge 
            variant="secondary" 
            className={`${
              property.listingType === 'Sale'
                ? 'bg-primary/10 text-primary hover:bg-primary/20'
                : 'bg-estate-500/10 text-estate-600 hover:bg-estate-500/20'
            }`}
          >
            {property.listingType === 'Sale' ? 'À Venda' : 'Para Alugar'}
          </Badge>
          {property.featured && (
            <Badge className="bg-amber-500/90 hover:bg-amber-500 text-white">
              Destaque
            </Badge>
          )}
        </div>
        
        <button
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm border border-estate-100 transition-all duration-300 hover:bg-white"
          aria-label={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
        >
          <Heart
            size={18}
            className={`transition-colors duration-300 ${
              isFavorite ? 'fill-red-500 text-red-500' : 'text-estate-400'
            }`}
          />
        </button>
        
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <div className="text-white font-semibold">
            {formatPrice(property.price, property.listingType)}
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-estate-900 line-clamp-1">
          {property.title}
        </h3>
        
        <div className="flex items-center text-estate-500 text-sm mt-1 mb-3">
          <MapPin size={14} className="inline mr-1" />
          <span className="line-clamp-1">
            {property.address}, {property.city}, {property.state}
          </span>
        </div>
        
        <div className="flex items-center justify-between border-t border-estate-100 pt-3 text-estate-600">
          <div className="flex items-center gap-1">
            <Bed size={16} className="text-estate-400" />
            <span className="text-sm">{property.bedrooms} qtos</span>
          </div>
          
          <div className="flex items-center gap-1">
            <Bath size={16} className="text-estate-400" />
            <span className="text-sm">{property.bathrooms} ban</span>
          </div>
          
          <div className="flex items-center gap-1">
            <Square size={16} className="text-estate-400" />
            <span className="text-sm">{property.squareFeet.toLocaleString()} m²</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
