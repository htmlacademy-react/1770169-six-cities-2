import * as dayjs from 'dayjs';

import {sortTypes} from '../const';
import {Comment} from '../types/comment-type';
import {Offer} from '../types/offer-type';


const sortCommentsByDate = (a: Comment, b: Comment): number => dayjs(a.date).isBefore(dayjs(b.date)) ? 1 : -1;

const sortOffersByAscendingPrice = (a: Offer, b: Offer): number => a.price - b.price;

const sortOffersByDescendingPrice = (a: Offer, b: Offer): number => b.price - a.price;

const sortOffersByRating = (a: Offer, b: Offer): number => b.rating - a.rating;

const sort = {
  [sortTypes[0].name]: (offers: Offer[]) => offers,
  [sortTypes[1].name]: (offers: Offer[]) => [...offers].sort(sortOffersByAscendingPrice),
  [sortTypes[2].name]: (offers: Offer[]) => [...offers].sort(sortOffersByDescendingPrice),
  [sortTypes[3].name]: (offers: Offer[]) => [...offers].sort(sortOffersByRating),
};

export {sortCommentsByDate, sort};
