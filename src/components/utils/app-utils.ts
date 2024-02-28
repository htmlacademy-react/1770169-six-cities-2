import {rating} from '../../const';
import {ExtendedOffer, Offers} from '../../types/offer-type';

const getFilteredOffers = (offers: Offers, name: string): Offers => offers.filter((offer) => offer.city.name === name);

const getRatingPercent = (value: number): string => {
  const [ratingValue, ratingPercent] = rating;

  return `${Math.round(value) * ratingPercent / ratingValue}%`;
};

const getOfferById = (offers: Offers, id: string): ExtendedOffer | undefined => offers.find((offer) => offer.id === id);

export {getFilteredOffers, getRatingPercent, getOfferById};
