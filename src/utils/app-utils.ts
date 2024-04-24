import {RatingPercent} from '../const';
import {Offer} from '../types/offer-type';

const getFilteredOffers = (offers: Offer[], name: string): Offer[] => offers.filter((offer) => offer.city.name === name);

const getRatingPercent = (value: number): string => `${Math.round(value) * RatingPercent.Percent / RatingPercent.Value}%`;

const getRandomElement = <T>(elements: readonly T[]): T => elements[Math.floor(Math.random() * elements.length)];

export {getFilteredOffers, getRatingPercent, getRandomElement};
