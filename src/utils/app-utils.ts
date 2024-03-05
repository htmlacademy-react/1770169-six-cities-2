import {rating} from '../const';
import {Offers} from '../types/offer-type';

const getFilteredOffers = (offers: Offers, name: string): Offers => offers.filter((offer) => offer.city.name === name);

const getRatingPercent = (value: number): string => {
  const [ratingValue, ratingPercent] = rating;

  return `${Math.round(value) * ratingPercent / ratingValue}%`;
};

const getRandomElement = <T>(elements: T[]): T => elements[Math.floor(Math.random() * elements.length)];

export {getFilteredOffers, getRatingPercent, getRandomElement};
