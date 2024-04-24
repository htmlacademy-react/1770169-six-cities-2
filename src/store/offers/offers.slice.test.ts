import {changeLocation, changeSortType, offersSlice} from './offers.slice';
import {CITIES, SORT_TYPES} from '../../const';
import {getMockOffer} from '../../utils/mock-utils';
import {getOffersAction, updateFavoriteOfferAction} from '../api-actions';

describe('Offers slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = {type: ''};
    const expectedState = {
      location: CITIES[0].name,
      sortType: SORT_TYPES[0].name,
      offers: [],
      isLoading: false,
    };
    const result = offersSlice.reducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action', () => {
    const emptyAction = {type: ''};
    const expectedState = {
      location: CITIES[0].name,
      sortType: SORT_TYPES[0].name,
      offers: [],
      isLoading: false,
    };
    const result = offersSlice.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should change location with "changeLocation" action', () => {
    const expectedState = {
      location: CITIES[1].name,
      sortType: SORT_TYPES[0].name,
      offers: [],
      isLoading: false,
    };
    const result = offersSlice.reducer(undefined, changeLocation(CITIES[1].name));
    expect(result).toEqual(expectedState);
  });

  it('should change sortType with "changeSortType" action', () => {
    const expectedState = {
      location: CITIES[0].name,
      sortType: SORT_TYPES[1].name,
      offers: [],
      isLoading: false,
    };
    const result = offersSlice.reducer(undefined, changeSortType(SORT_TYPES[1].name));
    expect(result).toEqual(expectedState);
  });

  it('should set "isLoading" to "true" with "getOffersAction.pending"', () => {
    const expectedState = {
      location: CITIES[0].name,
      sortType: SORT_TYPES[0].name,
      offers: [],
      isLoading: true,
    };
    const result = offersSlice.reducer(undefined, getOffersAction.pending);
    expect(result).toEqual(expectedState);
  });

  it('should set "offers" to array with offers, "isLoading" to "false" with "getOffersAction.fulfilled"', () => {
    const offers = Array.from({length: 3}, getMockOffer);
    const expectedState = {
      location: CITIES[0].name,
      sortType: SORT_TYPES[0].name,
      offers,
      isLoading: false,
    };
    const result = offersSlice.reducer(undefined, getOffersAction.fulfilled(offers, '', undefined));
    expect(result).toEqual(expectedState);
  });

  it('should set "isLoading" to "false" with "getOffersAction.rejected"', () => {
    const expectedState = {
      location: CITIES[0].name,
      sortType: SORT_TYPES[0].name,
      offers: [],
      isLoading: false,
    };
    const result = offersSlice.reducer(undefined, getOffersAction.rejected);
    expect(result).toEqual(expectedState);
  });

  it('should update "offers", "isLoading" to "false" with "updateFavoriteOfferAction.fulfilled"', () => {
    const offer = getMockOffer();
    const data = {
      id: '',
      status: 0
    };
    const initialState = {
      location: CITIES[0].name,
      sortType: SORT_TYPES[0].name,
      offers: [{...offer, isFavorite: !offer.isFavorite}],
      isLoading: false,
    };
    const expectedState = {
      location: CITIES[0].name,
      sortType: SORT_TYPES[0].name,
      offers: [offer],
      isLoading: false,
    };
    const result = offersSlice.reducer(initialState, updateFavoriteOfferAction.fulfilled(offer, '', data));
    expect(result).toEqual(expectedState);
  });
});
