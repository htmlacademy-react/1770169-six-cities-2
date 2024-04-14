import {nearbyOffersSlice} from './nearbyOffers.slice';
import {getMockOffer} from '../../utils/mock-utils';
import {getNearbyOffersAction, updateFavoriteOfferAction} from '../api-actions';

describe('NearbyOffers slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = {type: ''};
    const expectedState = {
      nearbyOffers: [],
      isLoading: false,
    };
    const result = nearbyOffersSlice.reducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action', () => {
    const emptyAction = {type: ''};
    const expectedState = {
      nearbyOffers: [],
      isLoading: false,
    };
    const result = nearbyOffersSlice.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should set "isLoading" to "true" with "getNearbyOffersAction.pending"', () => {
    const expectedState = {
      nearbyOffers: [],
      isLoading: true,
    };
    const result = nearbyOffersSlice.reducer(undefined, getNearbyOffersAction.pending);
    expect(result).toEqual(expectedState);
  });

  it('should set "nearbyOffers" to array with nearby offers, "isLoading" to "false" with "getNearbyOffersAction.fulfilled"', () => {
    const nearbyOffers = Array.from({length: 3}, getMockOffer);
    const expectedState = {
      nearbyOffers,
      isLoading: false,
    };
    const result = nearbyOffersSlice.reducer(undefined, getNearbyOffersAction.fulfilled(nearbyOffers, '', ''));
    expect(result).toEqual(expectedState);
  });

  it('should set "isLoading" to "false" with "getNearbyOffersAction.rejected"', () => {
    const expectedState = {
      nearbyOffers: [],
      isLoading: false,
    };
    const result = nearbyOffersSlice.reducer(undefined, getNearbyOffersAction.rejected);
    expect(result).toEqual(expectedState);
  });

  it('should update "nearbyOffers", "isLoading" to "false" with "updateFavoriteOfferAction.fulfilled"', () => {
    const nearbyOffer = getMockOffer();
    const data = {
      id: '',
      status: 0
    };
    const initialState = {
      nearbyOffers: [{...nearbyOffer, isFavorite: !nearbyOffer.isFavorite}],
      isLoading: false,
    };
    const expectedState = {
      nearbyOffers: [nearbyOffer],
      isLoading: false,
    };
    const result = nearbyOffersSlice.reducer(initialState, updateFavoriteOfferAction.fulfilled(nearbyOffer, '', data));
    expect(result).toEqual(expectedState);
  });
});
