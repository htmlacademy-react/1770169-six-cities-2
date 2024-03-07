import * as dayjs from 'dayjs';

import {Comment} from '../types/comment-type';
import {Offer} from '../types/offer-type';


const sortCommentsByDate = (a: Comment, b: Comment): number => dayjs(b.date).diff(dayjs(a.date));

const sortOffersByAscendingPrice = (a: Offer, b: Offer): number => b.price - a.price;

const sortOffersByDescendingPrice = (a: Offer, b: Offer): number => a.price - b.price;

const sortOffersByRating = (a: Offer, b: Offer): number => b.rating - a.rating;

export {
  sortCommentsByDate,
  sortOffersByAscendingPrice,
  sortOffersByDescendingPrice,
  sortOffersByRating
};
