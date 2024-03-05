import {createAction} from '@reduxjs/toolkit';

import {ExtendedOffer, Offers} from './../types/offer-type';
import {AuthStatus, LocationName, Route, SortTypeName} from '../types/app-type';
import {Comments} from '../types/comment-type';

export const changeLocation = createAction<LocationName>('offer/changeLocation');

export const changeSortType = createAction<SortTypeName>('offer/changeSortType');

export const loadOffers = createAction<Offers>('offer/loadOffers');

export const loadOffer = createAction<ExtendedOffer>('offer/loadOffer');

export const loadFavoriteOffers = createAction<Offers>('offer/loadFavoriteOffers');

export const loadNearbyOffers = createAction<Offers>('offer/loadNearbyOffers');

export const loadComments = createAction<Comments>('offer/loadComments');

export const requireAuth = createAction<AuthStatus>('user/requireAuth');

export const setLoadingStatus = createAction<boolean>('app/setLoadingStatus');

export const redirectToRoute = createAction<Route>('app/redirectToRoute');
