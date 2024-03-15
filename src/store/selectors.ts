/*import {createSelector} from '@reduxjs/toolkit';

import {getFilteredOffers} from '../utils/app-utils';
import {sort} from '../utils/sort-utils';
import {Store} from '../types/store-type';

export const selectLocation = (state: Store) => state.location;
export const selectSortTypes = (state: Store) => state.sortType;
export const selectRawOffers = (state: Store) => state.offers;
export const selectSelectedOffer = (state: Store) => state.selectedOffer;
export const selectFavoriteOffers = (state: Store) => state.favoriteOffers;
export const selectNearbyOffers = (state: Store) => state.nearbyOffers;
export const selectComments = (state: Store) => state.comments;
export const selectAuthorizationStatus = (state: Store) => state.authorizationStatus;
export const selectUser = (state: Store) => state.user;
export const selectIsLoading = (state: Store) => state.isLoading;

export const selectOffers = createSelector(
  selectLocation,
  selectSortTypes,
  selectRawOffers,
  (location, sortType, offers) => sort[sortType](getFilteredOffers(offers, location))
);*/
