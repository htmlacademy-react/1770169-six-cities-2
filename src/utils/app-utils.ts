import {rating} from '../const';
import {Offer} from '../types/offer-type';

const getFilteredOffers = (offers: Offer[], name: string): Offer[] => offers.filter((offer) => offer.city.name === name);

const getRatingPercent = (value: number): string => {
  const [ratingValue, ratingPercent] = rating;

  return `${Math.round(value) * ratingPercent / ratingValue}%`;
};

const getRandomElement = <T>(elements: T[]): T => elements[Math.floor(Math.random() * elements.length)];

export {getFilteredOffers, getRatingPercent, getRandomElement};
