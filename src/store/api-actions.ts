import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';

import {AppDispatch, Store} from './../types/store-type';
import {ApiRoute, AppRoute, AuthorizationStatus} from '../const';
import {removeToken, setToken} from '../services/token';
import {loadComments, loadFavoriteOffers, loadNearbyOffers, loadOffer, loadOffers, redirectToRoute, requireAuth, setLoadingStatus} from '../store/action';
import {Comments, CreateComment} from '../types/comment-type';
import {ExtendedOffer, Offers} from '../types/offer-type';
import {AuthUser, FullUser} from '../types/user-type';

export const getOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: Store;
  extra: AxiosInstance;
}>('offer/getOffers', async (_, {dispatch, extra: api}) => {
  dispatch(setLoadingStatus(true));
  const {data} = await api.get<Offers>(ApiRoute.OFFERS);
  dispatch(loadOffers(data));
  dispatch(setLoadingStatus(false));
});

export const getOfferAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: Store;
  extra: AxiosInstance;
}>('offer/getOffer', async (id, {dispatch, extra: api}) => {
  const {data} = await api.get<ExtendedOffer>(`${ApiRoute.OFFERS}/${id}`);
  dispatch(loadOffer(data));
});

export const getNearbyOffersAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: Store;
  extra: AxiosInstance;
}>('offer/getNearbyOffers', async (id, {dispatch, extra: api}) => {
  const {data} = await api.get<Offers>(`${ApiRoute.OFFERS}/${id}${ApiRoute.NEARBY}`);
  dispatch(loadNearbyOffers(data));
});

export const getFavoriteOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: Store;
  extra: AxiosInstance;
}>('offer/getFavoriteOffers', async (_, {dispatch, extra: api}) => {
  const {data} = await api.get<Offers>(ApiRoute.FAVORITE);
  dispatch(loadFavoriteOffers(data));
});

export const updateFavoriteOfferAction = createAsyncThunk<void, {
  id: string;
  status: string;
}, {
  dispatch: AppDispatch;
  state: Store;
  extra: AxiosInstance;
}>('offer/updateFavoriteOffer', async ({id, status}, {extra: api}) => {
  await api.post(`${ApiRoute.FAVORITE}/${id}/${status}`);
});

export const getCommentsAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: Store;
  extra: AxiosInstance;
}>('offer/getComments', async (id, {dispatch, extra: api}) => {
  const {data} = await api.get<Comments>(`${ApiRoute.COMMENTS}/${id}`);
  dispatch(loadComments(data));
});

export const createCommentAction = createAsyncThunk<void, CreateComment, {
  dispatch: AppDispatch;
  state: Store;
  extra: AxiosInstance;
}>('offer/createComment', async (data, {extra: api}) => {
  const {id, ...comment} = data;
  await api.post(`${ApiRoute.COMMENTS}/${id}`, comment);
});

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  extra: AxiosInstance;
}>('user/checkAuth', async (_, {dispatch, extra: api}) => {
  try {
    const {data} = await api.get<FullUser>(ApiRoute.LOGIN);
    dispatch(requireAuth({
      status: AuthorizationStatus.Auth,
      user: data
    }));
  } catch {
    dispatch(requireAuth({
      status: AuthorizationStatus.NoAuth,
      user: null
    }));
  }
});

export const authAction = createAsyncThunk<void, AuthUser, {
  dispatch: AppDispatch;
  extra: AxiosInstance;
}>('user/auth', async (authData, {dispatch, extra: api}) => {
  const {data} = await api.post<FullUser>(ApiRoute.LOGIN, authData);
  setToken(data.token);
  dispatch(requireAuth(
    {
      status: AuthorizationStatus.Auth,
      user: data
    }
  ));
  dispatch(redirectToRoute(AppRoute.HOME));
});

export const logoutAction = createAsyncThunk<void, undefined, {
  extra: AxiosInstance;
}>('user/logout', async (_, {dispatch, extra: api}) => {
  await api.delete(ApiRoute.LOGOUT);
  removeToken();
  dispatch(requireAuth(
    {
      status: AuthorizationStatus.NoAuth,
      user: null
    }
  ));
});
