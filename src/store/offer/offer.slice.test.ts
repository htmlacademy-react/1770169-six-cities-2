import {offerSlice} from './offer.slice';
import {getMockExtendedOffer} from '../../utils/mock-utils';
import {getOfferAction, updateFavoriteOfferAction} from '../api-actions';

describe('Offer slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = {type: ''};
    const expectedState = {
      offer: null,
      isLoading: false,
    };
    const result = offerSlice.reducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action', () => {
    const emptyAction = {type: ''};
    const expectedState = {
      offer: null,
      isLoading: false,
    };
    const result = offerSlice.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should set "isLoading" to "true" with "getOfferAction.pending"', () => {
    const expectedState = {
      offer: null,
      isLoading: true,
    };
    const result = offerSlice.reducer(undefined, getOfferAction.pending);
    expect(result).toEqual(expectedState);
  });

  it('should set "offer" to offer, "isLoading" to "false" with "getOfferAction.fulfilled"', () => {
    const offer = getMockExtendedOffer();
    const expectedState = {
      offer,
      isLoading: false,
    };
    const result = offerSlice.reducer(undefined, getOfferAction.fulfilled(offer, '', ''));
    expect(result).toEqual(expectedState);
  });

  it('should set "isLoading" to "false" with "getOfferAction.rejected"', () => {
    const expectedState = {
      offer: null,
      isLoading: false,
    };
    const result = offerSlice.reducer(undefined, getOfferAction.rejected);
    expect(result).toEqual(expectedState);
  });

  it('should update "offer", "isLoading" to "false" with "updateFavoriteOfferAction.fulfilled"', () => {
    const offer = getMockExtendedOffer(true);
    const {id, title, type, price, city, location, isFavorite, isPremium, rating} = offer;
    const data = {
      id: '',
      status: 0
    };
    const initialState = {
      offer: {...offer, isFavorite: false},
      isLoading: false,
    };
    const expectedState = {
      offer,
      isLoading: false,
    };
    const result = offerSlice.reducer(initialState, updateFavoriteOfferAction.fulfilled({
      id,
      title,
      type,
      price,
      city,
      location,
      isFavorite,
      isPremium,
      rating,
      previewImage: ''
    }, '', data));
    expect(result).toEqual(expectedState);
  });
});
