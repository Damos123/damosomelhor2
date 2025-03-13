
import { Property } from './types';

export const properties: Property[] = [
  {
    id: '1',
    title: 'Modern Luxury Villa',
    description: 'Exquisite modern villa with panoramic ocean views. This stunning property features an open concept design with floor-to-ceiling windows, a gourmet kitchen with premium appliances, and a resort-style outdoor space with infinity pool. Perfect for those seeking luxury living in a prime location.',
    price: 1250000,
    address: '123 Oceanview Drive',
    city: 'Malibu',
    state: 'CA',
    zipCode: '90210',
    location: {
      lat: 34.0259,
      lng: -118.7798
    },
    bedrooms: 5,
    bathrooms: 4.5,
    squareFeet: 4200,
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2075&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2053&q=80',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    ],
    featured: true,
    amenities: ['Pool', 'Ocean View', 'Garage', 'Garden', 'Smart Home', 'Wine Cellar'],
    yearBuilt: 2021,
    propertyType: 'House',
    listingType: 'Sale'
  },
  {
    id: '2',
    title: 'Downtown Penthouse',
    description: 'Stunning penthouse apartment in the heart of downtown with panoramic city views. This luxury residence features high ceilings, premium finishes, a chef\'s kitchen, and a private roof terrace perfect for entertaining.',
    price: 875000,
    address: '789 Highrise Avenue',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94105',
    location: {
      lat: 37.7899,
      lng: -122.3969
    },
    bedrooms: 3,
    bathrooms: 2.5,
    squareFeet: 2100,
    images: [
      'https://images.unsplash.com/photo-1606046604972-77cc76aee944?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80',
      'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
      'https://images.unsplash.com/photo-1562438668-bcf0ca6578f0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2060&q=80'
    ],
    featured: true,
    amenities: ['Doorman', 'Gym', 'Rooftop', 'Concierge', 'City View', 'Parking'],
    yearBuilt: 2019,
    propertyType: 'Apartment',
    listingType: 'Sale'
  },
  {
    id: '3',
    title: 'Charming Cottage',
    description: 'Delightful cottage nestled in a picturesque neighborhood. This charming home features beautiful hardwood floors, a cozy fireplace, updated kitchen, and a lovely backyard garden. Perfect for those seeking character and comfort.',
    price: 4200,
    address: '456 Maple Lane',
    city: 'Portland',
    state: 'OR',
    zipCode: '97205',
    location: {
      lat: 45.5231,
      lng: -122.6765
    },
    bedrooms: 2,
    bathrooms: 1.5,
    squareFeet: 1200,
    images: [
      'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      'https://images.unsplash.com/photo-1600210492493-0946911123ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
      'https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    ],
    featured: false,
    amenities: ['Fireplace', 'Garden', 'Hardwood Floors', 'Patio'],
    yearBuilt: 1945,
    propertyType: 'House',
    listingType: 'Rent'
  },
  {
    id: '4',
    title: 'Luxury Waterfront Condo',
    description: 'Spectacular waterfront condo with unobstructed views and premium amenities. This luxury unit features an open floor plan, gourmet kitchen, floor-to-ceiling windows, and a spacious balcony perfect for enjoying the stunning scenery.',
    price: 930000,
    address: '222 Lakeside Drive',
    city: 'Seattle',
    state: 'WA',
    zipCode: '98101',
    location: {
      lat: 47.6062,
      lng: -122.3321
    },
    bedrooms: 2,
    bathrooms: 2,
    squareFeet: 1800,
    images: [
      'https://images.unsplash.com/photo-1613553507747-5f8d62ad5904?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      'https://images.unsplash.com/photo-1501183638710-841dd1904471?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    ],
    featured: true,
    amenities: ['Doorman', 'Gym', 'Pool', 'Waterfront', 'Parking', 'Balcony'],
    yearBuilt: 2018,
    propertyType: 'Condo',
    listingType: 'Sale'
  },
  {
    id: '5',
    title: 'Urban Townhouse',
    description: 'Stylish townhouse in an urban setting with modern amenities. This contemporary residence offers a thoughtfully designed floor plan, high-end finishes, a private patio, and a rooftop deck with city views.',
    price: 3800,
    address: '555 Urban Trail',
    city: 'Chicago',
    state: 'IL',
    zipCode: '60607',
    location: {
      lat: 41.8781,
      lng: -87.6298
    },
    bedrooms: 3,
    bathrooms: 2.5,
    squareFeet: 1950,
    images: [
      'https://images.unsplash.com/photo-1580216643062-cf460548a66a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    ],
    featured: false,
    amenities: ['Rooftop Deck', 'Garage', 'City View', 'Smart Home', 'Fireplace'],
    yearBuilt: 2017,
    propertyType: 'Townhouse',
    listingType: 'Rent'
  },
  {
    id: '6',
    title: 'Suburban Family Home',
    description: 'Spacious family home in a desirable suburban neighborhood. This welcoming residence features an open concept layout, updated kitchen, large backyard, and plenty of space for the whole family to enjoy.',
    price: 750000,
    address: '333 Family Circle',
    city: 'Austin',
    state: 'TX',
    zipCode: '78704',
    location: {
      lat: 30.2672,
      lng: -97.7431
    },
    bedrooms: 4,
    bathrooms: 3,
    squareFeet: 2800,
    images: [
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      'https://images.unsplash.com/photo-1575517111839-3a3843ee7f5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      'https://images.unsplash.com/photo-1608058204446-1cf0394e93e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    ],
    featured: false,
    amenities: ['Backyard', 'Garage', 'Garden', 'Patio', 'Fireplace', 'Family Room'],
    yearBuilt: 2010,
    propertyType: 'House',
    listingType: 'Sale'
  }
];

export const propertyAmenities = [
  'Pool',
  'Gym',
  'Doorman',
  'Elevator',
  'Parking',
  'Garage',
  'Balcony',
  'Garden',
  'Patio',
  'Rooftop',
  'Fireplace',
  'Ocean View',
  'City View',
  'Waterfront',
  'Smart Home',
  'Wine Cellar',
  'Family Room',
  'Hardwood Floors',
  'Concierge'
];

export const propertyTypes = [
  'House',
  'Apartment',
  'Condo',
  'Townhouse'
];

export function formatPrice(price: number, listingType: 'Sale' | 'Rent'): string {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  if (listingType === 'Rent') {
    return `${formatter.format(price)}/mo`;
  }
  
  return formatter.format(price);
}

export function getFilteredProperties(filters: {
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  propertyType?: string[];
  amenities?: string[];
  listingType?: 'Sale' | 'Rent' | 'All';
}) {
  return properties.filter(property => {
    // Filter by price range
    if (filters.minPrice && property.price < filters.minPrice) return false;
    if (filters.maxPrice && property.price > filters.maxPrice) return false;
    
    // Filter by bedrooms
    if (filters.bedrooms && property.bedrooms < filters.bedrooms) return false;
    
    // Filter by bathrooms
    if (filters.bathrooms && property.bathrooms < filters.bathrooms) return false;
    
    // Filter by property type
    if (filters.propertyType && filters.propertyType.length > 0 && 
        !filters.propertyType.includes(property.propertyType)) return false;
    
    // Filter by amenities
    if (filters.amenities && filters.amenities.length > 0) {
      const hasAllAmenities = filters.amenities.every(amenity => 
        property.amenities.includes(amenity)
      );
      if (!hasAllAmenities) return false;
    }
    
    // Filter by listing type
    if (filters.listingType && 
        filters.listingType !== 'All' && 
        property.listingType !== filters.listingType) return false;
    
    return true;
  });
}
