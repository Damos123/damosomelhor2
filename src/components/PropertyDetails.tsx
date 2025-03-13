
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Property } from '@/lib/types';
import { 
  Bed, 
  Bath, 
  Square, 
  MapPin, 
  Heart, 
  Share, 
  Calendar, 
  Home as HomeIcon,
  Ruler, 
  Building,
  Car,
  Trees,
  Wifi,
  Snowflake,
  Wind,
  Sofa,
  UtensilsCrossed,
  Lock
} from 'lucide-react';

// Função para formatar preço
const formatPrice = (price: number, listingType: 'Sale' | 'Rent') => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0
  }).format(price) + (listingType === 'Rent' ? '/mês' : '');
};

interface PropertyDetailsProps {
  property: Property;
}

const PropertyDetails = ({ property }: PropertyDetailsProps) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
  };

  // Em uma aplicação real, isto seria provavelmente uma função real que envia solicitação
  const shareProperty = () => {
    // Lógica para compartilhar propriedade
    alert(`Compartilhando: ${property.title}`);
  };

  return (
    <div className="property-details pb-12">
      {/* Imagens */}
      <div className="mb-8">
        <div className="relative">
          <AspectRatio ratio={16 / 9} className="bg-gray-100 overflow-hidden rounded-lg mb-4">
            <img 
              src={property.images[activeImageIndex]} 
              alt={property.title} 
              className="object-cover w-full h-full"
            />
          </AspectRatio>
          
          <div className="flex justify-between">
            {property.images.slice(0, 5).map((image, index) => (
              <div 
                key={index}
                className={`w-1/5 px-1 cursor-pointer transition-all duration-200 ${
                  activeImageIndex === index ? 'opacity-100 ring-2 ring-primary' : 'opacity-70 hover:opacity-100'
                }`}
                onClick={() => setActiveImageIndex(index)}
              >
                <AspectRatio ratio={16 / 9} className="bg-gray-100 overflow-hidden rounded">
                  <img 
                    src={image} 
                    alt={`${property.title} - Imagem ${index + 1}`} 
                    className="object-cover w-full h-full"
                  />
                </AspectRatio>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Título e Ações */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <div className="flex flex-wrap gap-2 mb-3">
            <Badge 
              variant="secondary" 
              className={`${
                property.listingType === 'Sale'
                  ? 'bg-primary/10 text-primary'
                  : 'bg-purple-500/10 text-purple-600'
              }`}
            >
              {property.listingType === 'Sale' ? 'À Venda' : 'Para Alugar'}
            </Badge>
            <Badge variant="outline" className="border-gray-200">
              {property.propertyType}
            </Badge>
            {property.featured && (
              <Badge className="bg-amber-500 text-white">
                Destaque
              </Badge>
            )}
          </div>
          
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>
          
          <div className="flex items-center text-gray-500 text-sm">
            <MapPin size={16} className="mr-1" />
            {property.address}, {property.city}, {property.state} {property.zipCode}
          </div>
        </div>
        
        <div className="flex gap-3 mt-4 md:mt-0">
          <Button 
            variant="outline" 
            size="icon"
            className={`rounded-full ${isFavorite ? 'text-red-500 border-red-200' : ''}`}
            onClick={handleFavoriteClick}
          >
            <Heart 
              size={20} 
              className={isFavorite ? 'fill-red-500' : ''} 
            />
          </Button>
          
          <Button 
            variant="outline" 
            size="icon"
            className="rounded-full"
            onClick={shareProperty}
          >
            <Share size={20} />
          </Button>
          
          <Button className="rounded-full">
            Agendar Visita
          </Button>
        </div>
      </div>
      
      {/* Preço e Detalhes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="md:col-span-2">
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {formatPrice(property.price, property.listingType)}
              {property.listingType === 'Rent' && <span className="text-sm font-normal text-gray-500"> /mês</span>}
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <Bed size={20} className="mx-auto mb-1 text-gray-600" />
                <div className="text-sm text-gray-600">Quartos</div>
                <div className="font-semibold text-gray-900">{property.bedrooms}</div>
              </div>
              
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <Bath size={20} className="mx-auto mb-1 text-gray-600" />
                <div className="text-sm text-gray-600">Banheiros</div>
                <div className="font-semibold text-gray-900">{property.bathrooms}</div>
              </div>
              
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <Square size={20} className="mx-auto mb-1 text-gray-600" />
                <div className="text-sm text-gray-600">Área</div>
                <div className="font-semibold text-gray-900">{property.squareFeet.toLocaleString()} m²</div>
              </div>
              
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <Calendar size={20} className="mx-auto mb-1 text-gray-600" />
                <div className="text-sm text-gray-600">Ano</div>
                <div className="font-semibold text-gray-900">{property.yearBuilt}</div>
              </div>
            </div>
            
            <div className="border-t border-gray-100 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Descrição</h3>
              <p className="text-gray-600 mb-4 whitespace-pre-line">{property.description}</p>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Comodidades</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4">
              {property.amenities.map((amenity, index) => (
                <div key={index} className="flex items-center gap-2">
                  {getAmenityIcon(amenity)}
                  <span className="text-gray-600">{amenity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div>
          {/* Formulário de Contato */}
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm sticky top-20">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Contato</h3>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                  <HomeIcon size={20} className="text-gray-500" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Imobiliária</div>
                  <div className="font-medium text-gray-900">ImoCasaDBC</div>
                </div>
              </div>
              
              <Button className="w-full">
                (11) 99123-4567
              </Button>
              
              <Button variant="outline" className="w-full">
                Enviar mensagem
              </Button>
            </div>
            
            <div className="text-center text-sm text-gray-500">
              <p>Código do imóvel: {property.id}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Função auxiliar para obter o ícone adequado para cada comodidade
const getAmenityIcon = (amenity: string) => {
  const iconSize = 18;
  const iconClass = "text-gray-500";
  
  switch (amenity.toLowerCase()) {
    case 'garagem':
    case 'estacionamento':
      return <Car size={iconSize} className={iconClass} />;
    case 'ar condicionado':
      return <Snowflake size={iconSize} className={iconClass} />;
    case 'piscina':
      return <Ruler size={iconSize} className={iconClass} />;
    case 'jardim':
      return <Trees size={iconSize} className={iconClass} />;
    case 'wifi':
    case 'internet':
      return <Wifi size={iconSize} className={iconClass} />;
    case 'móveis':
    case 'mobiliado':
      return <Sofa size={iconSize} className={iconClass} />;
    case 'cozinha equipada':
      return <UtensilsCrossed size={iconSize} className={iconClass} />;
    case 'segurança':
    case 'porteiro':
      return <Lock size={iconSize} className={iconClass} />;
    case 'ventilação':
      return <Wind size={iconSize} className={iconClass} />;
    default:
      return <Building size={iconSize} className={iconClass} />;
  }
};

export default PropertyDetails;
