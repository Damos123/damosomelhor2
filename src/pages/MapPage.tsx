
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Property, PropertyFilter } from '@/lib/types';
import MapView from '@/components/MapView';
import Navbar from '@/components/Navbar';
import { PropertyList } from '@/components/PropertyList';
import { Button } from '@/components/ui/button';
import PropertyFilters from '@/components/PropertyFilters';
import { DialogContent, DialogDescription, DialogHeader, DialogTitle, Dialog, DialogTrigger } from '@/components/ui/dialog';
import { FilterIcon, MapIcon, List } from 'lucide-react';

const MapPage = () => {
  const location = useLocation();
  const [properties, setProperties] = useState<Property[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [filters, setFilters] = useState<PropertyFilter>({});
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'map' | 'list'>('map');
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    // Em uma aplicação real, este seria um fetch de dados reais
    // Aqui, simplesmente simulamos um atraso de carregamento
    const timer = setTimeout(() => {
      // Simulação de dados
      const mockProperties: Property[] = Array.from({ length: 20 }, (_, i) => ({
        id: `prop-${i + 1}`,
        title: `Propriedade incrível ${i + 1}`,
        description: `Uma bela propriedade com vista para a cidade. Local tranquilo e seguro, perfeito para famílias.`,
        price: 500000 + (i * 100000),
        address: `Rua das Flores, ${100 + i}`,
        city: 'São Paulo',
        state: 'SP',
        zipCode: `0123${i}-000`,
        location: {
          lat: -23.55 + (Math.random() * 0.1),
          lng: -46.63 + (Math.random() * 0.1)
        },
        bedrooms: 2 + (i % 3),
        bathrooms: 1 + (i % 3),
        squareFeet: 75 + (i * 25),
        images: [
          'https://images.unsplash.com/photo-1568605114967-8130f3a36994',
          'https://images.unsplash.com/photo-1599427303058-f04cbcf4756f',
          'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6'
        ],
        featured: i < 3,
        amenities: ['Ar Condicionado', 'Piscina', 'Garagem', 'Segurança 24h'],
        yearBuilt: 2010 + (i % 10),
        propertyType: i % 2 === 0 ? 'House' : (i % 3 === 0 ? 'Apartment' : 'Condo'),
        listingType: i % 2 === 0 ? 'Sale' : 'Rent'
      }));

      setProperties(mockProperties);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleViewToggle = () => {
    setView(view === 'map' ? 'list' : 'map');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-16 lg:pt-20 pb-16">
        <div className="container mx-auto max-w-screen-2xl px-4">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Encontre seu imóvel perfeito</h1>
            
            <div className="flex items-center gap-2">
              <Dialog open={filtersOpen} onOpenChange={setFiltersOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <FilterIcon size={16} />
                    <span>Filtros</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-lg">
                  <DialogHeader>
                    <DialogTitle>Filtros</DialogTitle>
                    <DialogDescription>
                      Refine sua busca para encontrar o imóvel perfeito
                    </DialogDescription>
                  </DialogHeader>
                  <PropertyFilters 
                    onFilterChange={(newFilters) => {
                      setFilters(newFilters);
                      setFiltersOpen(false);
                    }}
                  />
                </DialogContent>
              </Dialog>
              
              <Button 
                variant="outline" 
                size="icon"
                onClick={handleViewToggle}
              >
                {view === 'map' ? <List size={18} /> : <MapIcon size={18} />}
              </Button>
            </div>
          </div>
          
          {loading ? (
            <div className="animate-pulse space-y-4">
              <div className="h-[400px] bg-gray-200 rounded-lg"></div>
            </div>
          ) : (
            <>
              <div className={view === 'map' ? 'block' : 'hidden'}>
                <MapView 
                  properties={properties}
                  selectedProperty={selectedProperty || undefined}
                  onPropertySelect={(p) => setSelectedProperty(p)}
                />
              </div>
              
              <div className={view === 'list' ? 'block' : 'hidden'}>
                <PropertyList properties={properties} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MapPage;
