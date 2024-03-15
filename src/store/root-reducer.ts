import {nearbyOffersSlice} from './nearbyOffers/nearbyOffers.slice';
import {combineReducers} from '@reduxjs/toolkit';
import {offerSlice} from './offer/offer.slice';
import {offersSlice} from './offers/offers.slice';
import {favoriteOffersSlice} from './favoriteOffers/favoriteOffers.slice';
import {commentsSlice} from './comments/comments.slice';
import {userSlice} from './user/user.slice';
import {NameSpace} from '../const';

export const rootReducer = combineReducers(
  {
    [NameSpace.OFFERS]: offersSlice.reducer,
    [NameSpace.OFFER]: offerSlice.reducer,
    [NameSpace.FAVORITE_OFFERS]: favoriteOffersSlice.reducer,
    [NameSpace.NEARBY_OFFERS]: nearbyOffersSlice.reducer,
    [NameSpace.COMMENTS]: commentsSlice.reducer,
    [NameSpace.USER]: userSlice.reducer
  }
);
