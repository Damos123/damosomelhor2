
import React, { useEffect, useRef } from 'react';
import { Property } from '@/lib/types';

interface MapViewProps {
  properties: Property[];
  selectedProperty?: Property;
  onPropertySelect?: (property: Property) => void;
}

const MapView: React.FC<MapViewProps> = ({ 
  properties, 
  selectedProperty, 
  onPropertySelect 
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<any[]>([]);

  useEffect(() => {
    // Simulação de mapa - Em uma aplicação real, aqui seria inicializado 
    // o Google Maps, Mapbox ou outra biblioteca de mapas
    if (mapRef.current) {
      console.log('Inicializando mapa com', properties.length, 'propriedades');
      
      // Limpar marcadores existentes em caso de re-renderização
      markersRef.current.forEach(marker => {
        // Aqui seria algo como marker.setMap(null) no Google Maps
        console.log('Removendo marcador existente');
      });
      markersRef.current = [];
      
      // Criar novos marcadores
      properties.forEach(property => {
        console.log(`Adicionando marcador para propriedade ${property.id} em ${property.location.lat}, ${property.location.lng}`);
        // Aqui seria criado um marcador real, ex: new google.maps.Marker({ ... })
        
        // Em vez de usar 'new', que causa o erro, simularemos a criação de marcadores
        const marker = {
          id: property.id,
          position: { lat: property.location.lat, lng: property.location.lng },
          title: property.title,
          // Este método simula a adição de um listener de evento
          addListener: (event: string, callback: () => void) => {
            console.log(`Adicionado listener ${event} ao marcador de ${property.title}`);
            return { remove: () => console.log('Listener removido') };
          }
        };
        
        // Adicionar evento de clique ao marcador
        marker.addListener('click', () => {
          if (onPropertySelect) {
            console.log('Marcador clicado:', property.title);
            onPropertySelect(property);
          }
        });
        
        // Destacar o marcador selecionado
        if (selectedProperty && selectedProperty.id === property.id) {
          console.log('Destacando marcador selecionado:', property.title);
          // Aqui seria algo como marker.setIcon('highlighted-marker.png')
        }
        
        markersRef.current.push(marker);
      });
    }
    
    // Limpar ao desmontar o componente
    return () => {
      markersRef.current.forEach(marker => {
        // Aqui seria algo como marker.setMap(null) no Google Maps
        console.log('Limpando marcador ao desmontar');
      });
      markersRef.current = [];
    };
  }, [properties, selectedProperty, onPropertySelect]);

  return (
    <div className="relative w-full h-full bg-gray-200 rounded-lg overflow-hidden">
      <div 
        ref={mapRef} 
        className="w-full h-full" 
        style={{ minHeight: '400px' }}
      >
        <div className="flex items-center justify-center h-full text-gray-500">
          <p>Visualização de mapa seria carregada aqui</p>
        </div>
      </div>
    </div>
  );
};

export default MapView;
