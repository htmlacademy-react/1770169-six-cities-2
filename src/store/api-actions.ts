import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';

import {AppDispatch, Store} from './../types/store-type';
import {ApiRoute, AppRoute} from '../const';
import {getToken, removeToken, setToken} from '../services/token';
import {redirectToRoute} from '../store/action';
import {Comment, CreateComment} from '../types/comment-type';
import {ExtendedOffer, Offer} from '../types/offer-type';
import {AuthCredentials, FullUser} from '../types/user-type';
import {clearOffers} from './offers/offers.slice';
import {clearFavoriteOffers} from './favorite-offers/favorite-offers.slice';

export const getOffersAction = createAsyncThunk<Offer[], undefined, {
  dispatch: AppDispatch;
  state: Store;
  extra: AxiosInstance;
}>('offer/getOffers', async (_, {extra: api}) => {
  const {data} = await api.get<Offer[]>(ApiRoute.Offers);
  return data;
});

export const getOfferAction = createAsyncThunk<ExtendedOffer, string, {
  dispatch: AppDispatch;
  state: Store;
  extra: AxiosInstance;
}>('offer/getOffer', async (id, {extra: api}) => {
  const {data} = await api.get<ExtendedOffer>(`${ApiRoute.Offers}/${id}`);
  return data;
});

export const getNearbyOffersAction = createAsyncThunk<Offer[], string, {
  dispatch: AppDispatch;
  state: Store;
  extra: AxiosInstance;
}>('offer/getNearbyOffers', async (id, {extra: api}) => {
  const {data} = await api.get<Offer[]>(`${ApiRoute.Offers}/${id}${ApiRoute.Nearby}`);
  return data;
});

export const getFavoriteOffersAction = createAsyncThunk<Offer[], undefined, {
  dispatch: AppDispatch;
  state: Store;
  extra: AxiosInstance;
}>('offer/getFavoriteOffers', async (_, {extra: api}) => {
  const {data} = await api.get<Offer[]>(ApiRoute.Favorite);
  return data;
});

export const updateFavoriteOfferAction = createAsyncThunk<Offer, {
  id: string;
  status: number;
}, {
  dispatch: AppDispatch;
  state: Store;
  extra: AxiosInstance;
}>('offer/updateFavoriteOffer', async ({id, status}, {extra: api}) => {
  const {data} = await api.post<Offer>(`${ApiRoute.Favorite}/${id}/${status}`);
  return data;
});

export const getCommentsAction = createAsyncThunk<Comment[], string, {
  dispatch: AppDispatch;
  state: Store;
  extra: AxiosInstance;
}>('comment/getComments', async (id, {extra: api}) => {
  const {data} = await api.get<Comment[]>(`${ApiRoute.Comments}/${id}`);
  return data;
});

export const createCommentAction = createAsyncThunk<Comment, CreateComment, {
  dispatch: AppDispatch;
  state: Store;
  extra: AxiosInstance;
}>('comment/createComment', async ({offerId, ...comment}, {extra: api}) => {
  const {data} = await api.post<Comment>(`${ApiRoute.Comments}/${offerId}`, comment);
  return data;
});

export const checkAuthAction = createAsyncThunk<FullUser, undefined, {
  dispatch: AppDispatch;
  extra: AxiosInstance;
}>('user/checkAuth', async (_, {extra: api}) => {
  if (!getToken()) {
    throw new Error();
  }
  const {data} = await api.get<FullUser>(ApiRoute.Login);
  return data;
});

export const authAction = createAsyncThunk<FullUser, AuthCredentials, {
  dispatch: AppDispatch;
  extra: AxiosInstance;
}>('user/auth', async (authData, {dispatch, extra: api}) => {
  const {data} = await api.post<FullUser>(ApiRoute.Login, authData);
  setToken(data.token);
  dispatch(redirectToRoute(AppRoute.Home));
  return data;
});

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  extra: AxiosInstance;
}>('user/logout', async (_, {dispatch, extra: api}) => {
  await api.delete(ApiRoute.Logout);
  removeToken();
  dispatch(clearOffers());
  dispatch(clearFavoriteOffers());
  dispatch(getOffersAction());
});
