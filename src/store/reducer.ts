import {createReducer} from '@reduxjs/toolkit';

import {FullUser} from './../types/user-type';
import {
  changeLocation,
  changeSortType,
  loadComments,
  loadFavoriteOffers,
  loadNearbyOffers,
  loadOffer,
  loadOffers,
  requireAuth,
  setLoadingStatus
} from './action';
import {AuthorizationStatus, MAX_REVIEWS_VIEW, cities, sortTypes} from '../const';
import {Authorization, LocationName, SortTypeName} from '../types/app-type';
import {Comments} from '../types/comment-type';
import {ExtendedOffer, Offers} from '../types/offer-type';
import {sortCommentsByDate} from '../utils/sort-utils';

type InitialState = {
  location: LocationName;
  sortType: SortTypeName;
  offers: Offers;
  offer: ExtendedOffer | null;
  favoriteOffers: Offers;
  nearbyOffers: Offers;
  comments: Comments;
  authorizationStatus: Authorization;
  isLoading: boolean;
  user: FullUser | null;
};

const initialState: InitialState = {
  location: cities[0].name,
  sortType: sortTypes[0].name,
  offers: [],
  offer: null,
  favoriteOffers: [],
  nearbyOffers: [],
  comments: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  isLoading: false,
  user: null,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeLocation, (state, action) => {
      state.location = action.payload;
    })
    .addCase(changeSortType, (state, action) => {
      state.sortType = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(loadOffer, (state, action) => {
      state.offer = action.payload;
    })
    .addCase(loadFavoriteOffers, (state, action) => {
      state.favoriteOffers = action.payload;
    })
    .addCase(loadNearbyOffers, (state, action) => {
      state.nearbyOffers = action.payload;
    })
    .addCase(loadComments, (state, action) => {
      state.comments = action.payload
        .sort(sortCommentsByDate)
        .slice(0, MAX_REVIEWS_VIEW);
    })
    .addCase(requireAuth, (state, action) => {
      state.authorizationStatus = action.payload.status;
      state.user = action.payload.user;
    })
    .addCase(setLoadingStatus, (state, action) => {
      state.isLoading = action.payload;
    });
});
