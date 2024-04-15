import {favoriteOffersSlice} from './favoriteOffers.slice';
import {getMockOffer} from '../../utils/mock-utils';
import {getFavoriteOffersAction, updateFavoriteOfferAction} from '../api-actions';

describe('FavoriteOffers slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = {type: ''};
    const expectedState = {
      favoriteOffers: [],
      isLoading: false,
    };
    const result = favoriteOffersSlice.reducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action', () => {
    const emptyAction = {type: ''};
    const expectedState = {
      favoriteOffers: [],
      isLoading: false,
    };
    const result = favoriteOffersSlice.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should set "isLoading" to "true" with "getFavoriteOffersAction.pending"', () => {
    const expectedState = {
      favoriteOffers: [],
      isLoading: true,
    };
    const result = favoriteOffersSlice.reducer(undefined, getFavoriteOffersAction.pending);
    expect(result).toEqual(expectedState);
  });

  it('should set "favoriteOffers" to array with favorite offers, "isLoading" to "false" with "getFavoriteOffersAction.fulfilled"', () => {
    const favoriteOffers = Array.from({length: 3}, getMockOffer);
    const expectedState = {
      favoriteOffers,
      isLoading: false,
    };
    const result = favoriteOffersSlice.reducer(undefined, getFavoriteOffersAction.fulfilled(favoriteOffers, '', undefined));
    expect(result).toEqual(expectedState);
  });

  it('should set "isLoading" to "false" with "getFavoriteOffersAction.rejected"', () => {
    const expectedState = {
      favoriteOffers: [],
      isLoading: false,
    };
    const result = favoriteOffersSlice.reducer(undefined, getFavoriteOffersAction.rejected);
    expect(result).toEqual(expectedState);
  });

  it('should set "isLoading" to "true" with "updateFavoriteOfferAction.pending"', () => {
    const expectedState = {
      favoriteOffers: [],
      isLoading: true,
    };
    const result = favoriteOffersSlice.reducer(undefined, updateFavoriteOfferAction.pending);
    expect(result).toEqual(expectedState);
  });

  it('should add to "favoriteOffers" offer, "isLoading" to "false" with "updateFavoriteOfferAction.fulfilled"', () => {
    const favoriteOffer = getMockOffer(true);
    const data = {
      id: '',
      status: 1
    };
    const expectedState = {
      favoriteOffers: [favoriteOffer],
      isLoading: false,
    };
    const result = favoriteOffersSlice.reducer(undefined, updateFavoriteOfferAction.fulfilled(favoriteOffer, '', data));
    expect(result).toEqual(expectedState);
  });

  it('should remove to "favoriteOffers" offer, "isLoading" to "false" with "updateFavoriteOfferAction.fulfilled"', () => {
    const favoriteOffer = getMockOffer(false);
    const data = {
      id: '',
      status: 0
    };
    const initialState = {
      favoriteOffers: [{...favoriteOffer, isFavorite: true}],
      isLoading: false,
    };
    const expectedState = {
      favoriteOffers: [],
      isLoading: false,
    };
    const result = favoriteOffersSlice.reducer(initialState, updateFavoriteOfferAction.fulfilled(favoriteOffer, '', data));
    expect(result).toEqual(expectedState);
  });

  it('should set "isLoading" to "false" with "updateFavoriteOfferAction.rejected"', () => {
    const expectedState = {
      favoriteOffers: [],
      isLoading: false,
    };
    const result = favoriteOffersSlice.reducer(undefined, updateFavoriteOfferAction.rejected);
    expect(result).toEqual(expectedState);
  });
});
