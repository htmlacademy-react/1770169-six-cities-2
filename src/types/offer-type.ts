import {User} from './user-type';

type City = {
  name: string;
  location: Location;
}

type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
}

export type Offer = {
  id: string;
  title: string;
  type: string;
  price: number;
  previewImage: string;
  city: City;
  location: Location;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  description: string;
  bedrooms: number;
  goods: string[];
  host: User;
  images: string[];
  maxAdults: number;
}

export type OfferPreview = Omit<Offer, 'description' | 'bedrooms' | 'goods' | 'host' | 'images' | 'maxAdults'>;

export type Offers = OfferPreview[];
