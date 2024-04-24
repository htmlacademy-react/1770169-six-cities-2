import {combineReducers} from '@reduxjs/toolkit';

import {commentsSlice} from './comments/comments.slice';
import {favoriteOffersSlice} from './favorite-offers/favorite-offers.slice';
import {nearbyOffersSlice} from './nearby-offers/nearby-offers.slice';
import {offerSlice} from './offer/offer.slice';
import {offersSlice} from './offers/offers.slice';
import {userSlice} from './user/user.slice';
import {NameSpace} from '../const';

export const rootReducer = combineReducers(
  {
    [NameSpace.Offers]: offersSlice.reducer,
    [NameSpace.Offer]: offerSlice.reducer,
    [NameSpace.FavoriteOffers]: favoriteOffersSlice.reducer,
    [NameSpace.NearbyOffers]: nearbyOffersSlice.reducer,
    [NameSpace.Comments]: commentsSlice.reducer,
    [NameSpace.User]: userSlice.reducer
  }
);
