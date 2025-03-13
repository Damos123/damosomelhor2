
export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  location: {
    lat: number;
    lng: number;
  };
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  images: string[];
  featured?: boolean;
  amenities: string[];
  yearBuilt: number;
  propertyType: 'House' | 'Apartment' | 'Condo' | 'Townhouse';
  listingType: 'Sale' | 'Rent';
}

export type PropertyFilter = {
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  propertyType?: string[];
  amenities?: string[];
  listingType?: 'Sale' | 'Rent' | 'All';
};
