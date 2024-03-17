import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';

import {AppDispatch, Store} from './../types/store-type';
import {ApiRoute, AppRoute} from '../const';
import {removeToken, setToken} from '../services/token';
import {redirectToRoute} from '../store/action';
import {Comment, CreateComment} from '../types/comment-type';
import {ExtendedOffer, Offer} from '../types/offer-type';
import {AuthCredentials, FullUser} from '../types/user-type';

export const getOffersAction = createAsyncThunk<Offer[], undefined, {
  dispatch: AppDispatch;
  state: Store;
  extra: AxiosInstance;
}>('offer/getOffers', async (_, {extra: api}) => {
  const {data} = await api.get<Offer[]>(ApiRoute.OFFERS);
  return data;
});

export const getOfferAction = createAsyncThunk<ExtendedOffer, string, {
  dispatch: AppDispatch;
  state: Store;
  extra: AxiosInstance;
}>('offer/getOffer', async (id, {extra: api}) => {
  const {data} = await api.get<ExtendedOffer>(`${ApiRoute.OFFERS}/${id}`);
  return data;
});

export const getNearbyOffersAction = createAsyncThunk<Offer[], string, {
  dispatch: AppDispatch;
  state: Store;
  extra: AxiosInstance;
}>('offer/getNearbyOffers', async (id, {extra: api}) => {
  const {data} = await api.get<Offer[]>(`${ApiRoute.OFFERS}/${id}${ApiRoute.NEARBY}`);
  return data;
});

export const getFavoriteOffersAction = createAsyncThunk<Offer[], undefined, {
  dispatch: AppDispatch;
  state: Store;
  extra: AxiosInstance;
}>('offer/getFavoriteOffers', async (_, {extra: api}) => {
  const {data} = await api.get<Offer[]>(ApiRoute.FAVORITE);
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
  const {data} = await api.post<Offer>(`${ApiRoute.FAVORITE}/${id}/${status}`);
  return data;
});

export const getCommentsAction = createAsyncThunk<Comment[], string, {
  dispatch: AppDispatch;
  state: Store;
  extra: AxiosInstance;
}>('offer/getComments', async (id, {extra: api}) => {
  const {data} = await api.get<Comment[]>(`${ApiRoute.COMMENTS}/${id}`);
  return data;
});

export const createCommentAction = createAsyncThunk<void, CreateComment, {
  dispatch: AppDispatch;
  state: Store;
  extra: AxiosInstance;
}>('offer/createComment', async (data, {extra: api}) => {
  const {offerId, ...comment} = data;
  await api.post(`${ApiRoute.COMMENTS}/${offerId}`, comment);
});

export const checkAuthAction = createAsyncThunk<FullUser, undefined, {
  dispatch: AppDispatch;
  extra: AxiosInstance;
}>('user/checkAuth', async (_, {extra: api}) => {
  const {data} = await api.get<FullUser>(ApiRoute.LOGIN);
  return data;
});

export const authAction = createAsyncThunk<FullUser, AuthCredentials, {
  dispatch: AppDispatch;
  extra: AxiosInstance;
}>('user/auth', async (authData, {dispatch, extra: api}) => {
  const {data} = await api.post<FullUser>(ApiRoute.LOGIN, authData);
  setToken(data.token);
  dispatch(redirectToRoute(AppRoute.HOME));
  return data;
});

export const logoutAction = createAsyncThunk<void, undefined, {
  extra: AxiosInstance;
}>('user/logout', async (_, {extra: api}) => {
  await api.delete(ApiRoute.LOGOUT);
  removeToken();
});
