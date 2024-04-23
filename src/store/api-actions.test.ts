import {configureMockStore} from '@jedmao/redux-mock-store';
import {Action, ThunkDispatch} from '@reduxjs/toolkit';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';

import {
  checkAuthAction,
  createCommentAction,
  getCommentsAction,
  getFavoriteOffersAction,
  getNearbyOffersAction,
  getOfferAction, getOffersAction,
  updateFavoriteOfferAction
} from './api-actions';
import {ApiRoute} from '../const';
import {createAPI} from '../services/api';
import {Store} from '../types/store-type';
import {
  extractActionsTypes,
  getMockComment,
  getMockExtendedOffer,
  getMockOffer,
  getMockStore,
  getMockUser
} from '../utils/mock-utils';

describe('Async actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<
    Store,
    Action<string>,
    ThunkDispatch<
      Store,
      ReturnType<typeof createAPI>,
      Action
    >
  >(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator(getMockStore());
  });

  describe('getOffersAction', () => {
    const offers = Array.from({length: 3}, getMockOffer);

    it('should dispatch "getOffersAction.pending" and "getOffersAction.fulfilled" when server response 200', async () => {
      mockAxiosAdapter.onGet(ApiRoute.Offers).reply(200, offers);
      await store.dispatch(getOffersAction());
      const actions = store.getActions();
      const actionsType = actions.map((action) => action.type);
      const getOffersActionFulfilled = actions.at(1) as ReturnType<typeof getOffersAction.fulfilled>;

      expect(actionsType).toEqual([
        getOffersAction.pending.type,
        getOffersAction.fulfilled.type
      ]);

      expect(getOffersActionFulfilled.payload).toMatchObject(offers);
    });

    it('should dispatch "getOffersAction.pending" and "getOffersAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(ApiRoute.Offers).reply(400);
      await store.dispatch(getOffersAction());
      const actionsType = store.getActions().map((action) => action.type);

      expect(actionsType).toEqual([
        getOffersAction.pending.type,
        getOffersAction.rejected.type
      ]);
    });
  });

  describe('getOfferAction', () => {
    const offer = getMockExtendedOffer();

    it('should dispatch "getOfferAction.pending" and "getOfferAction.fulfilled" when server response 200', async () => {
      mockAxiosAdapter.onGet(`${ApiRoute.Offers}/${offer.id}`).reply(200, offer);
      await store.dispatch(getOfferAction(offer.id));
      const actions = store.getActions();
      const actionsType = actions.map((action) => action.type);
      const getOfferActionFulfilled = actions.at(1) as ReturnType<typeof getOfferAction.fulfilled>;

      expect(actionsType).toEqual([
        getOfferAction.pending.type,
        getOfferAction.fulfilled.type
      ]);

      expect(getOfferActionFulfilled.payload).toMatchObject(offer);
    });

    it('should dispatch "getOfferAction.pending" and "getOfferAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(`${ApiRoute.Offers}/${offer.id}`).reply(400);
      await store.dispatch(getOfferAction(offer.id));
      const actionsType = store.getActions().map((action) => action.type);

      expect(actionsType).toEqual([
        getOfferAction.pending.type,
        getOfferAction.rejected.type
      ]);
    });
  });

  describe('getNearbyOffersAction', () => {
    const nearbyOffers = Array.from({length: 3}, getMockOffer);
    const offer = getMockExtendedOffer();

    it('should dispatch "getNearbyOffersAction.pending" and "getNearbyOffersAction.fulfilled" when server response 200', async () => {
      mockAxiosAdapter.onGet(`${ApiRoute.Offers}/${offer.id}${ApiRoute.Nearby}`).reply(200, nearbyOffers);
      await store.dispatch(getNearbyOffersAction(offer.id));
      const actions = store.getActions();
      const actionsType = extractActionsTypes(actions);
      const getNearbyOffersActionFulfilled = actions.at(1) as ReturnType<typeof getNearbyOffersAction.fulfilled>;

      expect(actionsType).toEqual([
        getNearbyOffersAction.pending.type,
        getNearbyOffersAction.fulfilled.type
      ]);

      expect(getNearbyOffersActionFulfilled.payload).toMatchObject(nearbyOffers);
    });

    it('should dispatch "getNearbyOffersAction.pending" and "getNearbyOffersAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(`${ApiRoute.Offers}/${offer.id}${ApiRoute.Nearby}`).reply(400);
      await store.dispatch(getNearbyOffersAction(offer.id));
      const actionsType = extractActionsTypes(store.getActions());

      expect(actionsType).toEqual([
        getNearbyOffersAction.pending.type,
        getNearbyOffersAction.rejected.type
      ]);
    });
  });

  describe('getFavoriteOffersAction', () => {
    const offers = Array.from({length: 3}, getMockOffer);

    it('should dispatch "getFavoriteOffersAction.pending" and "getFavoriteOffersAction.fulfilled" when server response 200', async () => {
      mockAxiosAdapter.onGet(ApiRoute.Favorite).reply(200, offers);
      await store.dispatch(getFavoriteOffersAction());
      const actions = store.getActions();
      const actionsType = extractActionsTypes(actions);
      const getFavoriteOffersActionFulfilled = actions.at(1) as ReturnType<typeof getFavoriteOffersAction.fulfilled>;

      expect(actionsType).toEqual([
        getFavoriteOffersAction.pending.type,
        getFavoriteOffersAction.fulfilled.type
      ]);

      expect(getFavoriteOffersActionFulfilled.payload).toMatchObject(offers);
    });

    it('should dispatch "getFavoriteOffersAction.pending" and "getFavoriteOffersAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(ApiRoute.Favorite).reply(400);
      await store.dispatch(getFavoriteOffersAction());
      const actionsType = extractActionsTypes(store.getActions());

      expect(actionsType).toEqual([
        getFavoriteOffersAction.pending.type,
        getFavoriteOffersAction.rejected.type
      ]);
    });
  });

  describe('updateFavoriteOfferAction', () => {
    const offer = getMockExtendedOffer();
    const data = {
      id: offer.id,
      status: 1
    };

    it('should dispatch "updateFavoriteOfferAction.pending" and "updateFavoriteOfferAction.fulfilled" when server response 200', async () => {
      mockAxiosAdapter.onPost(`${ApiRoute.Favorite}/${data.id}/${data.status}`).reply(200, offer);
      await store.dispatch(updateFavoriteOfferAction(data));
      const actions = store.getActions();
      const actionsType = extractActionsTypes(actions);
      const updateFavoriteOfferActionFulfilled = actions.at(1) as ReturnType<typeof updateFavoriteOfferAction.fulfilled>;

      expect(actionsType).toEqual([
        updateFavoriteOfferAction.pending.type,
        updateFavoriteOfferAction.fulfilled.type
      ]);

      expect(updateFavoriteOfferActionFulfilled.payload).toMatchObject(offer);
    });

    it('should dispatch "updateFavoriteOfferAction.pending" and "updateFavoriteOfferAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onPost(`${ApiRoute.Favorite}/${data.id}/${data.status}`).reply(400);
      await store.dispatch(updateFavoriteOfferAction(data));
      const actionsType = extractActionsTypes(store.getActions());

      expect(actionsType).toEqual([
        updateFavoriteOfferAction.pending.type,
        updateFavoriteOfferAction.rejected.type
      ]);
    });
  });

  describe('getCommentsAction', () => {
    const comments = Array.from({length: 3}, getMockComment);
    const offer = getMockExtendedOffer();

    it('should dispatch "getCommentsAction.pending" and "getCommentsAction.fulfilled" when server response 200', async () => {
      mockAxiosAdapter.onGet(`${ApiRoute.Comments}/${offer.id}`).reply(200, comments);
      await store.dispatch(getCommentsAction(offer.id));
      const actions = store.getActions();
      const actionsType = extractActionsTypes(actions);
      const getCommentsActionFulfilled = actions.at(1) as ReturnType<typeof getCommentsAction.fulfilled>;

      expect(actionsType).toEqual([
        getCommentsAction.pending.type,
        getCommentsAction.fulfilled.type
      ]);

      expect(getCommentsActionFulfilled.payload).toMatchObject(comments);
    });

    it('should dispatch "getCommentsAction.pending" and "getCommentsAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(`${ApiRoute.Comments}/${offer.id}`).reply(400);
      await store.dispatch(getCommentsAction(offer.id));
      const actionsType = extractActionsTypes(store.getActions());

      expect(actionsType).toEqual([
        getCommentsAction.pending.type,
        getCommentsAction.rejected.type
      ]);
    });
  });

  describe('createCommentAction', () => {
    const comments = Array.from({length: 3}, getMockComment);
    const offer = getMockExtendedOffer();
    const data = {
      comment: '',
      offerId: offer.id,
      rating: 5
    };

    it('should dispatch "createCommentAction.pending" and "createCommentAction.fulfilled" when server response 200', async () => {
      mockAxiosAdapter.onPost(`${ApiRoute.Comments}/${offer.id}`).reply(200, comments);
      await store.dispatch(createCommentAction(data));
      const actions = store.getActions();
      const actionsType = extractActionsTypes(actions);
      const createCommentActionFulfilled = actions.at(1) as ReturnType<typeof createCommentAction.fulfilled>;

      expect(actionsType).toEqual([
        createCommentAction.pending.type,
        createCommentAction.fulfilled.type
      ]);

      expect(createCommentActionFulfilled.payload).toMatchObject(comments);
    });

    it('should dispatch "createCommentAction.pending" and "createCommentAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onPost(`${ApiRoute.Comments}/${offer.id}`).reply(400);
      await store.dispatch(createCommentAction(data));
      const actionsType = extractActionsTypes(store.getActions());

      expect(actionsType).toEqual([
        createCommentAction.pending.type,
        createCommentAction.rejected.type
      ]);
    });
  });

  describe('checkAuthAction', () => {
    const user = getMockUser();

    it('should dispatch "checkAuthAction.pending" and "checkAuthAction.fulfilled" when server response 200', async () => {
      mockAxiosAdapter.onGet(ApiRoute.Login).reply(200, user);
      await store.dispatch(checkAuthAction());
      const actions = store.getActions();
      const actionsType = extractActionsTypes(actions);
      const checkAuthActionFulfilled = actions.at(1) as ReturnType<typeof checkAuthAction.fulfilled>;

      expect(actionsType).toEqual([
        checkAuthAction.pending.type,
        checkAuthAction.fulfilled.type
      ]);

      expect(checkAuthActionFulfilled.payload).toMatchObject(user);
    });

    it('should dispatch "checkAuthAction.pending" and "checkAuthAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(ApiRoute.Login).reply(400);
      await store.dispatch(checkAuthAction());
      const actionsType = extractActionsTypes(store.getActions());

      expect(actionsType).toEqual([
        checkAuthAction.pending.type,
        checkAuthAction.rejected.type
      ]);
    });
  });

});
