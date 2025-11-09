export interface OpeningHours {
  day: string;
  hours: string;
}

export interface Salon {
  id: string;
  name: string;
  address: string;
  rating: number;
  reviewCount: number;
  priceRange: string;
  phone: string;
  website?: string;
  image: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  openingHours: OpeningHours[];
  isOpen: boolean;
  specialties: string[];
}
