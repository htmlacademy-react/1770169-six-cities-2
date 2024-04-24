import dayjs from 'dayjs';

import {SORT_TYPES} from '../const';
import {Comment} from '../types/comment-type';
import {Offer} from '../types/offer-type';


const sortCommentsByDate = (a: Comment, b: Comment): number => dayjs(a.date).isBefore(dayjs(b.date)) ? 1 : -1;

const sortOffersByAscendingPrice = (a: Offer, b: Offer): number => a.price - b.price;

const sortOffersByDescendingPrice = (a: Offer, b: Offer): number => b.price - a.price;

const sortOffersByRating = (a: Offer, b: Offer): number => b.rating - a.rating;

const sort = {
  [SORT_TYPES[0].name]: (offers: Offer[]) => offers,
  [SORT_TYPES[1].name]: (offers: Offer[]) => [...offers].sort(sortOffersByAscendingPrice),
  [SORT_TYPES[2].name]: (offers: Offer[]) => [...offers].sort(sortOffersByDescendingPrice),
  [SORT_TYPES[3].name]: (offers: Offer[]) => [...offers].sort(sortOffersByRating),
};

export {sortCommentsByDate, sort};
