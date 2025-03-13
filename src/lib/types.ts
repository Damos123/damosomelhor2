
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

// Educational site types
export interface Course {
  id: string;
  title: string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  author: string;
  duration: string;
  lessons: number;
  image: string;
  featured?: boolean;
  tags: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  bio?: string;
  role: 'Student' | 'Instructor' | 'Admin';
  joined: string;
}

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  description: string;
  content: string;
  duration: string;
  order: number;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  author: User;
  date: string;
  tags: string[];
  likes: number;
  comments: number;
}
